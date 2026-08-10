import os
import cv2
import numpy as np
from pathlib import Path
from PIL import Image
from ultralytics import YOLO

class TrackDetector:
    """
    YOLO Track Defect Detector wrapper for Railway Track Health Assessment System.
    Loads trained YOLO model weights and provides object detection, 
    bounding box extraction, pixel geometric feature calculation, and visualization.
    """
    def __init__(self, model_path: str = "models/railway_crack_detector/weights/best.pt", conf_threshold: float = 0.25):
        self.model_path = Path(model_path)
        if not self.model_path.exists():
            raise FileNotFoundError(f"Trained model weights not found at: {self.model_path.resolve()}")
        
        self.conf_threshold = conf_threshold
        self.model = YOLO(str(self.model_path))

    def detect(self, image_input, conf: float = None, save_annotated_path: str = None) -> dict:
        """
        Runs object detection on input image (file path, PIL Image, or numpy BGR array).

        Args:
            image_input (str | Path | Image.Image | np.ndarray): Path to image file, PIL Image, or OpenCV BGR image array.
            conf (float, optional): Confidence threshold override. Defaults to self.conf_threshold.
            save_annotated_path (str, optional): Destination path to save annotated image.

        Returns:
            dict: Structured result containing image metadata, detection list, geometric features,
                  and annotated image array.
        """
        confidence_cutoff = conf if conf is not None else self.conf_threshold

        # Handle image input
        if isinstance(image_input, (str, Path)):
            img_path_str = str(image_input)
            img = cv2.imread(img_path_str)
            if img is None:
                raise ValueError(f"Could not read image file: {img_path_str}")
        elif isinstance(image_input, Image.Image):
            img_path_str = "<PIL_Image>"
            img_rgb = np.array(image_input.convert("RGB"))
            img = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2BGR)
        elif isinstance(image_input, np.ndarray):
            img_path_str = "<numpy_array>"
            img = image_input
        else:
            raise TypeError("image_input must be a file path (str/Path), PIL Image, or numpy array.")

        img_h, img_w = img.shape[:2]
        img_total_pixels = img_h * img_w

        # Run inference
        results = self.model.predict(img, conf=confidence_cutoff, verbose=False)
        result = results[0]

        detections = []
        boxes = result.boxes

        if boxes is not None and len(boxes) > 0:
            for box in boxes:
                xyxy = box.xyxy[0].cpu().numpy().tolist()  # [x1, y1, x2, y2]
                x1, y1, x2, y2 = [float(v) for v in xyxy]
                confidence = float(box.conf[0].cpu().numpy())
                class_id = int(box.cls[0].cpu().numpy())
                class_name = self.model.names.get(class_id, f"class_{class_id}")

                box_width = max(0.0, x2 - x1)
                box_height = max(0.0, y2 - y1)
                box_area_px = box_width * box_height
                aspect_ratio = (box_width / box_height) if box_height > 0 else 0.0
                area_ratio = box_area_px / float(img_total_pixels) if img_total_pixels > 0 else 0.0

                detections.append({
                    "class_id": class_id,
                    "class_name": class_name,
                    "confidence": confidence,
                    "bbox_xyxy": [round(x1, 2), round(y1, 2), round(x2, 2), round(y2, 2)],
                    "pixel_geometry": {
                        "bbox_width_px": round(box_width, 2),
                        "bbox_height_px": round(box_height, 2),
                        "bbox_area_px": round(box_area_px, 2),
                        "aspect_ratio": round(aspect_ratio, 3),
                        "image_area_ratio": round(area_ratio, 5)
                    }
                })

        # Generate annotated plot image
        annotated_img = result.plot()

        saved_path = None
        if save_annotated_path is not None:
            out_p = Path(save_annotated_path)
            out_p.parent.mkdir(parents=True, exist_ok=True)
            cv2.imwrite(str(out_p), annotated_img)
            saved_path = str(out_p.resolve())

        return {
            "image_source": img_path_str,
            "image_dimensions": {"height": img_h, "width": img_w, "channels": img.shape[2] if len(img.shape) > 2 else 1},
            "detections_count": len(detections),
            "detections": detections,
            "annotated_image": annotated_img,
            "saved_output_path": saved_path
        }
