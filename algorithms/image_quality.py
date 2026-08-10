"""
Image Quality Assessment Module for Railway Track Health Assessment System.
Evaluates sharpness, brightness, contrast, and noise levels.
"""

import cv2
import numpy as np
from PIL import Image
from pathlib import Path

class ImageQualityAssessor:
    """
    Computes objective, measurable image quality metrics and normalized scores (0-100).
    Note: These quality scores are heuristic engineering metrics tailored for track inspection analysis
    and do not represent a universal industry standard.
    """

    def __init__(self, 
                 ideal_brightness: float = 128.0,
                 ideal_contrast_std: float = 55.0,
                 sharpness_target_var: float = 250.0):
        self.ideal_brightness = ideal_brightness
        self.ideal_contrast_std = ideal_contrast_std
        self.sharpness_target_var = sharpness_target_var

    def evaluate(self, image_input) -> dict:
        """
        Evaluates input image and computes raw metrics, normalized 0-100 scores, and overall status.

        Args:
            image_input (str | Path | Image.Image | np.ndarray): Input image.

        Returns:
            dict: Quality metrics, normalized scores, overall score, and quality status.
        """
        # Load / convert image to BGR numpy array
        if isinstance(image_input, (str, Path)):
            img = cv2.imread(str(image_input))
            if img is None:
                raise ValueError(f"Could not read image from {image_input}")
        elif isinstance(image_input, Image.Image):
            img_rgb = np.array(image_input.convert("RGB"))
            img = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2BGR)
        elif isinstance(image_input, np.ndarray):
            img = image_input
        else:
            raise TypeError("Input image must be a file path, PIL Image, or numpy array.")

        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        # 1. Sharpness / Blur via Laplacian Variance
        lap_var = float(cv2.Laplacian(gray, cv2.CV_64F).var())
        sharpness_score = float(np.clip((lap_var / self.sharpness_target_var) * 100.0, 0.0, 100.0))

        # 2. Brightness via Grayscale Mean
        brightness_mean = float(np.mean(gray))
        brightness_dev = abs(brightness_mean - self.ideal_brightness)
        brightness_score = float(np.clip(100.0 - (brightness_dev / 128.0) * 100.0, 0.0, 100.0))

        # 3. Contrast via Grayscale Standard Deviation
        contrast_std = float(np.std(gray))
        contrast_score = float(np.clip((contrast_std / self.ideal_contrast_std) * 100.0, 0.0, 100.0))

        # 4. Noise Estimation via High-Frequency Residual Standard Deviation
        blurred = cv2.medianBlur(gray, 3)
        noise_diff = gray.astype(np.float64) - blurred.astype(np.float64)
        noise_std = float(np.std(noise_diff))
        noise_score = float(np.clip(100.0 - (noise_std / 15.0) * 100.0, 0.0, 100.0))

        # Overall Score: Weighted average of individual metric scores
        # Sharpness: 35%, Contrast: 30%, Brightness: 20%, Noise: 15%
        overall_score = float(
            0.35 * sharpness_score +
            0.30 * contrast_score +
            0.20 * brightness_score +
            0.15 * noise_score
        )
        overall_score = round(overall_score, 2)

        # Quality Status Classification
        if overall_score >= 75.0:
            status = "GOOD"
        elif overall_score >= 50.0:
            status = "ACCEPTABLE"
        else:
            status = "POOR"

        return {
            "raw_metrics": {
                "sharpness_laplacian_var": round(lap_var, 2),
                "brightness_mean": round(brightness_mean, 2),
                "contrast_std": round(contrast_std, 2),
                "noise_std": round(noise_std, 2)
            },
            "scores": {
                "sharpness_score": round(sharpness_score, 2),
                "brightness_score": round(brightness_score, 2),
                "contrast_score": round(contrast_score, 2),
                "noise_score": round(noise_score, 2)
            },
            "overall_score": overall_score,
            "quality_status": status
        }
