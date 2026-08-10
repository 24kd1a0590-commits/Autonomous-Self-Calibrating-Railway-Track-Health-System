"""
Final Railway Track Inspection Pipeline.

Connects:
Image Quality Assessment
        ↓
Adaptive Self-Calibration
        ↓
YOLO Crack Detection
        ↓
Inspection Reliability
        ↓
Track Condition Index
        ↓
Maintenance Recommendation
"""

import cv2
import numpy as np
from pathlib import Path

from algorithms.track_detector import TrackDetector
from algorithms.image_quality import ImageQualityAssessor
from algorithms.inspection_reliability import (
    AdaptiveCalibrator,
    InspectionReliabilityEvaluator
)
from algorithms.track_condition import TrackConditionEvaluator


class RailwayInspectionPipeline:

    def __init__(self, model_path: str):

        self.detector = TrackDetector(
            model_path=model_path
        )

        self.assessor = ImageQualityAssessor()

        self.calibrator = AdaptiveCalibrator(
            quality_assessor=self.assessor
        )

        self.reliability_evaluator = (
            InspectionReliabilityEvaluator()
        )

        self.condition_evaluator = (
            TrackConditionEvaluator()
        )

    def inspect(self, image_path: str):

        image_path = Path(image_path)

        if not image_path.exists():
            raise FileNotFoundError(
                f"Image not found: {image_path}"
            )

        image = cv2.imread(str(image_path))

        if image is None:
            raise ValueError(
                f"Unable to read image: {image_path}"
            )

        # --------------------------------------------------
        # 1. Initial image quality
        # --------------------------------------------------

        initial_quality = self.assessor.evaluate(image)

        quality_before = initial_quality["overall_score"]

        # --------------------------------------------------
        # 2. Adaptive self-calibration
        # --------------------------------------------------

        calibration_result = self.calibrator.calibrate(
            image,
            detector=self.detector
        )

        calibrated_image = calibration_result[
            "calibrated_image"
        ]

        quality_after = calibration_result[
            "overall_quality_after"
        ]

        stability_score = calibration_result[
            "stability_score"
        ]

        # --------------------------------------------------
        # 3. Final YOLO detection
        # --------------------------------------------------

        detection_result = self.detector.detect(
            calibrated_image
        )

        detections = detection_result["detections"]

        confidences = [
            float(det["confidence"])
            for det in detections
        ]

        # --------------------------------------------------
        # 4. Inspection reliability
        # --------------------------------------------------

        reliability_result = (
            self.reliability_evaluator.evaluate_reliability(
                quality_before=quality_before,
                quality_after=quality_after,
                detection_confidences=confidences,
                stability_score=stability_score,
                quality_scores_dict=
                    calibration_result["calibrated_scores"]
            )
        )

        reliability_score = reliability_result[
            "reliability_score"
        ]

        # --------------------------------------------------
        # 5. Track Condition Index
        # --------------------------------------------------

        condition_result = (
            self.condition_evaluator.evaluate(
                detections=detections,
                image_quality=quality_after,
                reliability_score=reliability_score
            )
        )

        # --------------------------------------------------
        # 6. Return complete inspection report
        # --------------------------------------------------

        return {
            "image_path": str(image_path),

            "original_image": image,

            "calibrated_image": calibrated_image,

            "quality_before": round(
                quality_before, 2
            ),

            "quality_after": round(
                quality_after, 2
            ),

            "quality_gain": round(
                quality_after - quality_before, 2
            ),

            "calibration_operations":
                calibration_result[
                    "operations_applied"
                ],

            "stability_score": round(
                stability_score, 4
            ),

            "detections": detections,

            "detection_count": len(detections),

            "mean_confidence": round(
                float(np.mean(confidences))
                if confidences else 0.0,
                4
            ),

            "reliability": reliability_result,

            "condition": condition_result
        }