"""
Track Health Assessment Engine.

Converts defect detections and inspection reliability information
into defect severity, risk level, and a Track Health Index (THI).

IMPORTANT:
The thresholds in this module are prototype engineering thresholds.
They are NOT official railway safety limits.
"""

from typing import List, Dict, Any
import numpy as np


class TrackHealthAssessor:
    """
    Calculates defect severity and overall Track Health Index (THI).
    """

    def __init__(self):
        # Prototype engineering weights.
        self.confidence_weight = 0.30
        self.area_weight = 0.25
        self.aspect_weight = 0.15
        self.quality_weight = 0.15
        self.reliability_weight = 0.15

    def calculate_defect_metrics(
        self,
        detection: Dict[str, Any],
        image_width: int,
        image_height: int
    ) -> Dict[str, float]:
        """
        Calculate normalized geometric metrics for one detected defect.
        """

        x1, y1, x2, y2 = detection["bbox_xyxy"]

        width_px = max(0.0, x2 - x1)
        height_px = max(0.0, y2 - y1)

        area_px = width_px * height_px
        image_area = max(1.0, image_width * image_height)

        area_ratio = area_px / image_area

        aspect_ratio = (
            width_px / height_px
            if height_px > 0
            else 0.0
        )

        confidence = float(
            np.clip(detection.get("confidence", 0.0), 0.0, 1.0)
        )

        return {
            "width_px": round(width_px, 2),
            "height_px": round(height_px, 2),
            "area_px": round(area_px, 2),
            "area_ratio": round(area_ratio, 6),
            "aspect_ratio": round(aspect_ratio, 4),
            "confidence": round(confidence, 4)
        }

    def calculate_severity(
        self,
        metrics: Dict[str, float],
        image_quality: float = 100.0,
        reliability: float = 100.0
    ) -> Dict[str, Any]:
        """
        Calculate a prototype defect severity score from 0 to 100.

        Higher score means greater concern.
        """

        confidence = metrics["confidence"]

        # Convert confidence into a concern contribution.
        confidence_component = confidence * 100.0

        # Larger defect regions increase severity.
        # Scaling is intentionally conservative because pixel area
        # does not represent physical area without spatial calibration.
        area_component = min(
            metrics["area_ratio"] * 10000.0,
            100.0
        )

        # Extremely elongated defects can represent potentially
        # important structural patterns.
        aspect = metrics["aspect_ratio"]

        if aspect >= 4.0 or (aspect > 0 and aspect <= 0.25):
            aspect_component = 100.0
        elif aspect >= 2.5 or (aspect > 0 and aspect <= 0.4):
            aspect_component = 70.0
        else:
            aspect_component = 40.0

        quality_component = float(
            np.clip(image_quality, 0.0, 100.0)
        )

        reliability_component = float(
            np.clip(reliability, 0.0, 100.0)
        )

        severity_score = (
            self.confidence_weight * confidence_component
            + self.area_weight * area_component
            + self.aspect_weight * aspect_component
            + self.quality_weight * quality_component
            + self.reliability_weight * reliability_component
        )

        severity_score = float(
            np.clip(severity_score, 0.0, 100.0)
        )

        if severity_score >= 75:
            severity = "HIGH"
        elif severity_score >= 50:
            severity = "MEDIUM"
        elif severity_score >= 25:
            severity = "LOW"
        else:
            severity = "MINIMAL"

        return {
            "severity_score": round(severity_score, 2),
            "severity": severity,
            "confidence_component": round(confidence_component, 2),
            "area_component": round(area_component, 2),
            "aspect_component": round(aspect_component, 2),
            "quality_component": round(quality_component, 2),
            "reliability_component": round(reliability_component, 2)
        }

    def calculate_track_health_index(
        self,
        detections: List[Dict[str, Any]],
        image_quality: float,
        reliability_score: float,
        image_width: int,
        image_height: int
    ) -> Dict[str, Any]:
        """
        Calculate overall Track Health Index (THI).

        THI ranges from 0 to 100.
        Higher THI indicates better estimated track condition.
        """

        if not detections:
            thi = min(
                100.0,
                0.70 * image_quality +
                0.30 * reliability_score
            )

            return {
                "thi": round(thi, 2),
                "condition": self.classify_condition(thi),
                "risk_level": self.classify_risk(thi),
                "defect_count": 0,
                "defects": []
            }

        defect_results = []

        for detection in detections:
            metrics = self.calculate_defect_metrics(
                detection,
                image_width,
                image_height
            )

            severity = self.calculate_severity(
                metrics,
                image_quality=image_quality,
                reliability=reliability_score
            )

            defect_results.append({
                "class_name": detection.get(
                    "class_name",
                    "unknown"
                ),
                "metrics": metrics,
                "severity": severity
            })

        severity_scores = [
            item["severity"]["severity_score"]
            for item in defect_results
        ]

        mean_severity = float(
            np.mean(severity_scores)
        )

        max_severity = float(
            np.max(severity_scores)
        )

        # Multiple defects increase the overall concern.
        defect_count_penalty = min(
            len(detections) * 3.0,
            20.0
        )

        # Health starts from 100 and decreases with defect severity.
        defect_penalty = (
            0.60 * mean_severity
            + 0.40 * max_severity
        )

        defect_penalty *= 0.75

        quality_factor = np.clip(
            image_quality / 100.0,
            0.0,
            1.0
        )

        reliability_factor = np.clip(
            reliability_score / 100.0,
            0.0,
            1.0
        )

        uncertainty_penalty = (
            (1.0 - quality_factor) * 10.0
            + (1.0 - reliability_factor) * 10.0
        )

        thi = (
            100.0
            - defect_penalty
            - defect_count_penalty
            - uncertainty_penalty
        )

        thi = float(
            np.clip(thi, 0.0, 100.0)
        )

        return {
            "thi": round(thi, 2),
            "condition": self.classify_condition(thi),
            "risk_level": self.classify_risk(thi),
            "defect_count": len(detections),
            "mean_defect_severity": round(mean_severity, 2),
            "maximum_defect_severity": round(max_severity, 2),
            "defects": defect_results
        }

    @staticmethod
    def classify_condition(thi: float) -> str:
        """
        Classify overall track condition.
        """

        if thi >= 90:
            return "EXCELLENT"
        elif thi >= 75:
            return "GOOD"
        elif thi >= 60:
            return "MODERATE"
        elif thi >= 40:
            return "POOR"
        else:
            return "CRITICAL"

    @staticmethod
    def classify_risk(thi: float) -> str:
        if thi >= 75:
            return "LOW"
        elif thi >= 50:
            return "MEDIUM"
        elif thi >= 30:
            return "HIGH"
        else:
            return "CRITICAL"

    def assess(
        self,
        detections: List[Dict[str, Any]],
        image_quality: float,
        reliability_score: float,
        image_width: int,
        image_height: int
    ) -> Dict[str, Any]:
        """
        Public wrapper used by the main pipeline.
        """

        return self.calculate_track_health_index(
            detections=detections,
            image_quality=image_quality,
            reliability_score=reliability_score,
            image_width=image_width,
            image_height=image_height
        )