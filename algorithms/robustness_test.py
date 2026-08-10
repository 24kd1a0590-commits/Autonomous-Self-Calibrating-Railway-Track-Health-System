"""
Robustness Test Module for Railway Track Health Assessment System.
Generates controlled degraded versions of railway track test images
to evaluate detector and self-calibration algorithm performance under adverse conditions.
"""

import json
import cv2
import numpy as np
from pathlib import Path
from typing import Dict, Any, List, Tuple, Union
from PIL import Image


class RobustnessTester:
    """
    Generates reproducible, controlled image degradations for robustness testing.
    Supports Gaussian Blur, Low Brightness, High Brightness, Low Contrast,
    Gaussian Noise, and Combined degradation modes.
    """

    def __init__(self, seed: int = 42):
        """
        Initialize RobustnessTester with a fixed random seed for reproducibility.

        Args:
            seed (int): Fixed random seed for noise generation. Default is 42.
        """
        self.seed = seed
        self.degradation_configs = {
            "gaussian_blur": {
                "kernel_size": [15, 15],
                "sigma": 3.0
            },
            "low_brightness": {
                "factor": 0.4
            },
            "high_brightness": {
                "factor": 1.6,
                "offset": 30.0
            },
            "low_contrast": {
                "contrast_factor": 0.35
            },
            "gaussian_noise": {
                "mean": 0.0,
                "std": 25.0,
                "seed": self.seed
            },
            "combined": {
                "blur_kernel_size": [11, 11],
                "blur_sigma": 2.5,
                "brightness_factor": 0.5,
                "noise_mean": 0.0,
                "noise_std": 20.0,
                "seed": self.seed
            }
        }

    def _load_image(self, image_input: Union[str, Path, Image.Image, np.ndarray]) -> np.ndarray:
        """
        Helper method to load or convert input image into a BGR numpy array.
        """
        if isinstance(image_input, (str, Path)):
            img = cv2.imread(str(image_input))
            if img is None:
                raise ValueError(f"Could not read image from file path: {image_input}")
            return img
        elif isinstance(image_input, Image.Image):
            img_rgb = np.array(image_input.convert("RGB"))
            return cv2.cvtColor(img_rgb, cv2.COLOR_RGB2BGR)
        elif isinstance(image_input, np.ndarray):
            return image_input.copy()
        else:
            raise TypeError("Input image must be a file path, PIL Image, or numpy array.")

    def apply_gaussian_blur(self, image: np.ndarray, params: dict = None) -> np.ndarray:
        """Applies Gaussian Blur degradation."""
        if params is None:
            params = self.degradation_configs["gaussian_blur"]
        ksize = tuple(params.get("kernel_size", [15, 15]))
        sigma = float(params.get("sigma", 3.0))
        return cv2.GaussianBlur(image, ksize, sigma)

    def apply_low_brightness(self, image: np.ndarray, params: dict = None) -> np.ndarray:
        """Applies Low Brightness degradation."""
        if params is None:
            params = self.degradation_configs["low_brightness"]
        factor = float(params.get("factor", 0.4))
        degraded = image.astype(np.float32) * factor
        return np.clip(degraded, 0, 255).astype(np.uint8)

    def apply_high_brightness(self, image: np.ndarray, params: dict = None) -> np.ndarray:
        """Applies High Brightness degradation."""
        if params is None:
            params = self.degradation_configs["high_brightness"]
        factor = float(params.get("factor", 1.6))
        offset = float(params.get("offset", 30.0))
        degraded = image.astype(np.float32) * factor + offset
        return np.clip(degraded, 0, 255).astype(np.uint8)

    def apply_low_contrast(self, image: np.ndarray, params: dict = None) -> np.ndarray:
        """Applies Low Contrast degradation."""
        if params is None:
            params = self.degradation_configs["low_contrast"]
        contrast_factor = float(params.get("contrast_factor", 0.35))
        mean_intensity = np.mean(image, axis=(0, 1), keepdims=True)
        degraded = mean_intensity + contrast_factor * (image.astype(np.float32) - mean_intensity)
        return np.clip(degraded, 0, 255).astype(np.uint8)

    def apply_gaussian_noise(self, image: np.ndarray, params: dict = None) -> np.ndarray:
        """Applies Gaussian Noise degradation using reproducible random seed."""
        if params is None:
            params = self.degradation_configs["gaussian_noise"]
        mean = float(params.get("mean", 0.0))
        std = float(params.get("std", 25.0))
        seed_val = params.get("seed", self.seed)

        rng = np.random.default_rng(seed_val)
        noise = rng.normal(mean, std, image.shape)
        degraded = image.astype(np.float32) + noise
        return np.clip(degraded, 0, 255).astype(np.uint8)

    def apply_combined(self, image: np.ndarray, params: dict = None) -> np.ndarray:
        """Applies Combined degradation: Blur + Low Brightness + Gaussian Noise."""
        if params is None:
            params = self.degradation_configs["combined"]

        # 1. Blur
        ksize = tuple(params.get("blur_kernel_size", [11, 11]))
        sigma = float(params.get("blur_sigma", 2.5))
        blurred = cv2.GaussianBlur(image, ksize, sigma)

        # 2. Low Brightness
        b_factor = float(params.get("brightness_factor", 0.5))
        darkened = blurred.astype(np.float32) * b_factor

        # 3. Noise
        mean = float(params.get("noise_mean", 0.0))
        std = float(params.get("noise_std", 20.0))
        seed_val = params.get("seed", self.seed)

        rng = np.random.default_rng(seed_val)
        noise = rng.normal(mean, std, image.shape)

        combined = darkened + noise
        return np.clip(combined, 0, 255).astype(np.uint8)

    def apply_degradation(self, 
                          image_input: Union[str, Path, Image.Image, np.ndarray], 
                          degradation_type: str, 
                          custom_params: dict = None) -> Tuple[np.ndarray, dict]:
        """
        Applies a specified degradation type to an input image.

        Args:
            image_input (Union[str, Path, Image.Image, np.ndarray]): Input image.
            degradation_type (str): Type of degradation. Choices:
                - 'gaussian_blur'
                - 'low_brightness'
                - 'high_brightness'
                - 'low_contrast'
                - 'gaussian_noise'
                - 'combined'
            custom_params (dict, optional): Custom parameters overriding defaults.

        Returns:
            Tuple[np.ndarray, dict]: Degraded BGR image array and the parameters dictionary used.
        """
        if degradation_type not in self.degradation_configs:
            valid_keys = list(self.degradation_configs.keys())
            raise ValueError(f"Unknown degradation_type '{degradation_type}'. Supported choices: {valid_keys}")

        image = self._load_image(image_input)
        params = self.degradation_configs[degradation_type].copy()
        if custom_params:
            params.update(custom_params)

        if degradation_type == "gaussian_blur":
            degraded_img = self.apply_gaussian_blur(image, params)
        elif degradation_type == "low_brightness":
            degraded_img = self.apply_low_brightness(image, params)
        elif degradation_type == "high_brightness":
            degraded_img = self.apply_high_brightness(image, params)
        elif degradation_type == "low_contrast":
            degraded_img = self.apply_low_contrast(image, params)
        elif degradation_type == "gaussian_noise":
            degraded_img = self.apply_gaussian_noise(image, params)
        elif degradation_type == "combined":
            degraded_img = self.apply_combined(image, params)
        else:
            raise ValueError(f"Unsupported degradation type: {degradation_type}")

        return degraded_img, params
