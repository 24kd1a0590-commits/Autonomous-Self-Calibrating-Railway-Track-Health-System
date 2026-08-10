"""
Image Enhancement Module for Railway Track Health Assessment System.
Contains atomic OpenCV-based image processing and enhancement techniques.
"""

import cv2
import numpy as np

class ImageEnhancer:
    """
    Collection of targeted image enhancement algorithms:
    - Brightness & Dynamic Range Adjustment
    - CLAHE (Contrast Limited Adaptive Histogram Equalization)
    - Denoising (Bilateral Filter)
    - Controlled Sharpening (Unsharp Masking)
    """

    @staticmethod
    def adjust_brightness_contrast(image: np.ndarray, target_mean: float = 128.0) -> np.ndarray:
        """
        Adjusts brightness and dynamic range of BGR image towards a target grayscale mean.
        """
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        current_mean = float(np.mean(gray))
        if current_mean == 0:
            return image.copy()
            
        # Calculate scaling / shift factor
        ratio = target_mean / current_mean
        # Apply scaling safely with cv2.convertScaleAbs
        enhanced = cv2.convertScaleAbs(image, alpha=min(max(ratio, 0.6), 1.8), beta=0)
        return enhanced

    @staticmethod
    def apply_clahe(image: np.ndarray, clip_limit: float = 2.0, tile_grid_size: tuple = (8, 8)) -> np.ndarray:
        """
        Applies Contrast Limited Adaptive Histogram Equalization (CLAHE) on the L-channel in LAB color space.
        Preserves color balance while enhancing local contrast.
        """
        lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
        l, a, b = cv2.split(lab)
        
        clahe = cv2.createCLAHE(clipLimit=clip_limit, tileGridSize=tile_grid_size)
        cl = clahe.apply(l)
        
        limg = cv2.merge((cl, a, b))
        enhanced = cv2.cvtColor(limg, cv2.COLOR_LAB2BGR)
        return enhanced

    @staticmethod
    def apply_denoising(image: np.ndarray, d: int = 5, sigma_color: float = 25.0, sigma_space: float = 25.0) -> np.ndarray:
        """
        Applies Bilateral Filter to reduce image noise while preserving critical edges.
        """
        enhanced = cv2.bilateralFilter(image, d=d, sigmaColor=sigma_color, sigmaSpace=sigma_space)
        return enhanced

    @staticmethod
    def apply_sharpening(image: np.ndarray, amount: float = 0.8, radius: float = 1.0) -> np.ndarray:
        """
        Applies Controlled Sharpening using Unsharp Masking technique.
        """
        blurred = cv2.GaussianBlur(image, (0, 0), sigmaX=radius, sigmaY=radius)
        sharpened = cv2.addWeighted(image, 1.0 + amount, blurred, -amount, 0)
        return sharpened
