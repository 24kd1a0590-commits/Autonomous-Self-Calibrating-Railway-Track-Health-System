"""
Adaptive Self-Calibration and Inspection Reliability Module.
Provides dynamic enhancement parameter selection, detection stability assessment,
and objective Inspection Reliability scoring for railway track defect inspection.
"""

import cv2
import numpy as np
from pathlib import Path
from typing import Dict, Any, List, Tuple, Union, Optional
from PIL import Image

from .image_quality import ImageQualityAssessor
from .image_enhancement import ImageEnhancer


def compute_bbox_iou(box1: list, box2: list) -> float:
    """Computes IoU between two boxes [x1, y1, x2, y2]."""
    inter_x1 = max(box1[0], box2[0])
    inter_y1 = max(box1[1], box2[1])
    inter_x2 = min(box1[2], box2[2])
    inter_y2 = min(box1[3], box2[3])

    inter_w = max(0.0, inter_x2 - inter_x1)
    inter_h = max(0.0, inter_y2 - inter_y1)
    inter_area = inter_w * inter_h

    area1 = (box1[2] - box1[0]) * (box1[3] - box1[1])
    area2 = (box2[2] - box2[0]) * (box2[3] - box2[1])
    union_area = area1 + area2 - inter_area

    if union_area <= 0:
        return 0.0
    return float(inter_area / union_area)


class AdaptiveCalibrator:
    """
    Adaptive Self-Calibration Engine:
    Dynamically computes image enhancement parameters based on continuous quality deficits
    and validates detection stability across raw and calibrated frames.
    """

    def __init__(self,
                 quality_assessor: Optional[ImageQualityAssessor] = None,
                 enhancer: Optional[ImageEnhancer] = None):
        self.assessor = quality_assessor if quality_assessor is not None else ImageQualityAssessor()
        self.enhancer = enhancer if enhancer is not None else ImageEnhancer()

    def calibrate(self, image_input, detector=None) -> dict:
        """
        Applies dynamic, continuous quality-guided enhancements and verifies detection stability.

        Args:
            image_input (str | Path | Image.Image | np.ndarray): Input image.
            detector (TrackDetector, optional): Detector instance to measure detection stability.

        Returns:
            dict: Structured calibration results including before/after metrics, operations applied,
                  stability score, and calibrated image array.
        """
        # Load image array
        if isinstance(image_input, (str, Path)):
            img = cv2.imread(str(image_input))
            if img is None:
                raise ValueError(f"Could not read image from {image_input}")
        elif isinstance(image_input, Image.Image):
            img_rgb = np.array(image_input.convert("RGB"))
            img = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2BGR)
        elif isinstance(image_input, np.ndarray):
            img = image_input.copy()
        else:
            raise TypeError("Input image must be a file path, PIL Image, or numpy array.")

        # 1. Initial Quality Assessment
        initial_eval = self.assessor.evaluate(img)
        scores = initial_eval["scores"]
        raw_metrics = initial_eval["raw_metrics"]

        current_img = img.copy()
        operations_applied = []

        # 2. Dynamic, Continuous Parameter Selection

        # Dynamic Brightness Correction
        if scores["brightness_score"] < 70.0:
            target_mean = 128.0
            current_img = self.enhancer.adjust_brightness_contrast(current_img, target_mean=target_mean)
            operations_applied.append(f"Adaptive Brightness Correction (mean={raw_metrics['brightness_mean']}->{target_mean})")

        # Dynamic Contrast Enhancement (CLAHE)
        if scores["contrast_score"] < 70.0:
            contrast_deficit = 70.0 - scores["contrast_score"]
            clip_limit = float(np.clip(1.5 + (contrast_deficit / 25.0), 1.2, 3.5))
            current_img = self.enhancer.apply_clahe(current_img, clip_limit=clip_limit)
            operations_applied.append(f"Adaptive CLAHE (clip_limit={round(clip_limit, 2)})")

        # Dynamic Denoising
        if scores["noise_score"] < 65.0:
            d_param = 5 if scores["noise_score"] > 45.0 else 7
            sigma_color = float(np.clip(35.0 + (65.0 - scores["noise_score"]) * 1.2, 35.0, 80.0))
            current_img = cv2.bilateralFilter(current_img, d=d_param, sigmaColor=sigma_color, sigmaSpace=sigma_color)
            operations_applied.append(f"Adaptive Denoising (d={d_param}, sigma={round(sigma_color, 1)})")

        # Adaptive Noise-Inhibited Sharpening
        # Only sharpen if sharpness score < 70 AND noise level is low (noise_score >= 50) to prevent FP explosion
        if scores["sharpness_score"] < 70.0 and scores["noise_score"] >= 50.0:
            sharpen_amount = float(np.clip(0.3 + (70.0 - scores["sharpness_score"]) / 100.0, 0.2, 0.7))
            current_img = self.enhancer.apply_sharpening(current_img, amount=sharpen_amount)
            operations_applied.append(f"Adaptive Sharpening (amount={round(sharpen_amount, 2)})")

        if not operations_applied:
            operations_applied.append("None (Quality Optimal)")

        # 3. Post-Calibration Quality Assessment
        final_eval = self.assessor.evaluate(current_img)

        # 4. Measure Detection Stability if detector is available
        stability_score = 1.0
        if detector is not None:
            raw_dets = detector.detect(img)["detections"]
            cal_dets = detector.detect(current_img)["detections"]
            stability_score = self.compute_detection_stability(raw_dets, cal_dets)

        # Check if overall score improved
        improved = final_eval["overall_score"] > initial_eval["overall_score"]

        # Revert if score degraded or if calibration severely destabilized detections (stability < 0.2)
        if not improved or (detector is not None and stability_score < 0.2):
            final_calibrated_img = img
            final_eval = initial_eval
            operations_applied.append("Reverted to Original (Score/Stability Insufficient)")
            improved = False
        else:
            final_calibrated_img = current_img

        return {
            "original_metrics": initial_eval["raw_metrics"],
            "original_scores": initial_eval["scores"],
            "overall_quality_before": initial_eval["overall_score"],
            "quality_status_before": initial_eval["quality_status"],
            "calibrated_metrics": final_eval["raw_metrics"],
            "calibrated_scores": final_eval["scores"],
            "overall_quality_after": final_eval["overall_score"],
            "quality_status_after": final_eval["quality_status"],
            "operations_applied": operations_applied,
            "improved": improved,
            "stability_score": round(stability_score, 4),
            "calibrated_image": final_calibrated_img
        }

    @staticmethod
    def compute_detection_stability(raw_detections: list, calibrated_detections: list) -> float:
        """
        Computes detection stability score (0.0 to 1.0) based on bounding box IoU consistency
        between raw and calibrated predictions.
        """
        if not raw_detections and not calibrated_detections:
            return 1.0  # Consistently no detections
        if not raw_detections or not calibrated_detections:
            return 0.5  # One had detections, the other didn't

        ious = []
        for r_det in raw_detections:
            r_box = r_det["bbox_xyxy"]
            best_iou = 0.0
            for c_det in calibrated_detections:
                if r_det["class_id"] == c_det["class_id"]:
                    iou = compute_bbox_iou(r_box, c_det["bbox_xyxy"])
                    if iou > best_iou:
                        best_iou = iou
            ious.append(best_iou)

        return float(np.mean(ious)) if ious else 0.0


class InspectionReliabilityEvaluator:
    """
    Computes an objective Inspection Reliability Score (0 to 100) combining:
    - Image quality measurements (sharpness, contrast, brightness, noise)
    - Quality gain from calibration (delta Q)
    - Detection stability (IoU consistency)
    - Detection confidence (mean prediction confidence)
    - Degradation severity penalty
    """

    def __init__(self,
                 weight_quality: float = 0.35,
                 weight_gain: float = 0.20,
                 weight_stability: float = 0.25,
                 weight_confidence: float = 0.20):
        self.w_quality = weight_quality
        self.w_gain = weight_gain
        self.w_stability = weight_stability
        self.w_conf = weight_confidence

    def evaluate_reliability(self,
                             quality_before: float,
                             quality_after: float,
                             detection_confidences: list,
                             stability_score: float,
                             quality_scores_dict: Optional[dict] = None) -> dict:
        """
        Calculates the Inspection Reliability Score and reliability status.

        Args:
            quality_before (float): Initial overall quality score (0-100).
            quality_after (float): Post-calibration overall quality score (0-100).
            detection_confidences (list): List of detection confidence scores.
            stability_score (float): Detection stability score (0.0-1.0).
            quality_scores_dict (dict, optional): Individual metric scores (sharpness, noise, etc.)

        Returns:
            dict: Structured reliability analysis including score, status, and trustworthiness boolean.
        """
        # 1. Quality Component (0-100)
        q_comp = quality_after

        # 2. Quality Gain Component (0-100)
        delta_q = quality_after - quality_before
        gain_comp = float(np.clip(50.0 + delta_q * 2.5, 0.0, 100.0))

        # 3. Stability Component (0-100)
        stab_comp = float(np.clip(stability_score * 100.0, 0.0, 100.0))

        # 4. Confidence Component (0-100)
        if detection_confidences:
            mean_conf = float(np.mean(detection_confidences))
            conf_comp = float(np.clip(mean_conf * 100.0, 0.0, 100.0))
        else:
            mean_conf = 0.0
            conf_comp = 50.0  # Neutral baseline when no detections present

        # Weighted raw score
        raw_reliability = (
            self.w_quality * q_comp +
            self.w_gain * gain_comp +
            self.w_stability * stab_comp +
            self.w_conf * conf_comp
        )

        # 5. Degradation Severity Penalty
        penalty = 0.0
        if quality_scores_dict:
            noise_score = quality_scores_dict.get("noise_score", 100.0)
            sharpness_score = quality_scores_dict.get("sharpness_score", 100.0)

            if noise_score < 40.0:
                penalty += (40.0 - noise_score) * 0.5
            if sharpness_score < 30.0:
                penalty += (30.0 - sharpness_score) * 0.5

        final_reliability = round(float(np.clip(raw_reliability - penalty, 0.0, 100.0)), 2)

        # Reliability Status Classification
        if final_reliability >= 75.0:
            status = "HIGH"
            is_trustworthy = True
        elif final_reliability >= 50.0:
            status = "MODERATE"
            is_trustworthy = True
        else:
            status = "LOW / UNTRUSTWORTHY"
            is_trustworthy = False

        return {
            "reliability_score": final_reliability,
            "reliability_status": status,
            "is_trustworthy": is_trustworthy,
            "components": {
                "quality_component": round(q_comp, 2),
                "quality_gain_component": round(gain_comp, 2),
                "stability_component": round(stab_comp, 2),
                "confidence_component": round(conf_comp, 2),
                "degradation_penalty": round(penalty, 2)
            }
        }
