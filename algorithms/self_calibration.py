"""
Self-Calibration Module for Railway Track Health Assessment System.
Selectively applies targeted image enhancements based on measured quality metrics.
"""

import cv2
import numpy as np
from PIL import Image
from pathlib import Path

from .image_quality import ImageQualityAssessor
from .image_enhancement import ImageEnhancer

class SelfCalibrator:
    """
    Self-Calibration Pipeline:
    Input Image
      -> Assess Quality (ImageQualityAssessor)
      -> Identify Sub-optimal Quality Factors
      -> Apply Selective Enhancements (ImageEnhancer)
      -> Reassess Quality
      -> Compare Before & After
    """

    def __init__(self, 
                 quality_assessor: ImageQualityAssessor = None,
                 enhancer: ImageEnhancer = None):
        self.assessor = quality_assessor if quality_assessor is not None else ImageQualityAssessor()
        self.enhancer = enhancer if enhancer is not None else ImageEnhancer()

    def calibrate(self, image_input, save_output_path: str = None) -> dict:
        """
        Performs quality assessment and selective calibration enhancement on input image.

        Args:
            image_input (str | Path | Image.Image | np.ndarray): Input image.
            save_output_path (str, optional): Output path to save calibrated image.

        Returns:
            dict: Structured result containing before/after metrics, overall scores,
                  applied operations, improved boolean, and calibrated image array.
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

        current_img = img.copy()
        operations_applied = []

        # 2. Targeted Selective Enhancement (Selective - Do not apply blindly)

        # Condition A: Brightness Adjustment (if brightness score < 65)
        if scores["brightness_score"] < 65.0:
            current_img = self.enhancer.adjust_brightness_contrast(current_img, target_mean=128.0)
            operations_applied.append("Brightness Correction")

        # Condition B: Contrast Enhancement via CLAHE (if contrast score < 65)
        if scores["contrast_score"] < 65.0:
            current_img = self.enhancer.apply_clahe(current_img, clip_limit=2.0)
            operations_applied.append("CLAHE Contrast Enhancement")

        # Condition C: Denoising (if noise score < 60)
        if scores["noise_score"] < 60.0:
            current_img = self.enhancer.apply_denoising(current_img)
            operations_applied.append("Bilateral Denoising")

        # Condition D: Controlled Sharpening (if sharpness score < 65 AND noise level is manageable >= 40)
        if scores["sharpness_score"] < 65.0 and scores["noise_score"] >= 40.0:
            current_img = self.enhancer.apply_sharpening(current_img, amount=0.7)
            operations_applied.append("Controlled Sharpening")

        if not operations_applied:
            operations_applied.append("None (Quality Optimal)")

        # 3. Post-Calibration Quality Assessment
        final_eval = self.assessor.evaluate(current_img)

        # Check if overall score improved
        improved = final_eval["overall_score"] > initial_eval["overall_score"]

        # If enhancement degraded score, revert to original image
        if not improved and len(operations_applied) > 0 and operations_applied[0] != "None (Quality Optimal)":
            final_calibrated_img = img
            final_eval = initial_eval
            operations_applied.append("Reverted to Original (Score Did Not Improve)")
            improved = False
        else:
            final_calibrated_img = current_img

        # Save output image if path provided
        saved_path = None
        if save_output_path is not None:
            out_p = Path(save_output_path)
            out_p.parent.mkdir(parents=True, exist_ok=True)
            cv2.imwrite(str(out_p), final_calibrated_img)
            saved_path = str(out_p.resolve())

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
            "calibrated_image": final_calibrated_img,
            "saved_output_path": saved_path
        }
