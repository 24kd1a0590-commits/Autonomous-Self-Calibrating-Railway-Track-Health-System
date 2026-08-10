"""
Track Condition Assessment Module.

Converts crack detection and inspection reliability information
into a Track Condition Index (TCI) and maintenance priority.
"""

from typing import List, Dict, Any


class TrackConditionEvaluator:
    """
    Calculates an overall Track Condition Index (TCI) from
    crack severity, detection confidence, image quality,
    and inspection reliability.
    """

    def __init__(
        self,
        weight_crack: float = 0.40,
        weight_confidence: float = 0.20,
        weight_quality: float = 0.15,
        weight_reliability: float = 0.25
    ):
        self.w_crack = weight_crack
        self.w_confidence = weight_confidence
        self.w_quality = weight_quality
        self.w_reliability = weight_reliability

    def evaluate(
        self,
        detections: List[Dict[str, Any]],
        image_quality: float,
        reliability_score: float
    ) -> Dict[str, Any]:
        """
        Calculate Track Condition Index.

        Higher TCI = healthier track.
        """

        # --------------------------------------------------
        # 1. Crack severity component
        # --------------------------------------------------

        crack_penalty = 0.0

        for det in detections:
            confidence = float(det.get("confidence", 0.0))

            # Use bounding-box area as a simple severity proxy.
            bbox = det.get("bbox_xyxy", [0, 0, 0, 0])

            width = max(0.0, bbox[2] - bbox[0])
            height = max(0.0, bbox[3] - bbox[1])

            area = width * height

            # Normalize approximate image-region impact.
            area_factor = min(area / 100000.0, 1.0)

            crack_penalty += confidence * (0.5 + 0.5 * area_factor)

        # Prevent excessive penalty.
        crack_penalty = min(crack_penalty, 100.0)

        crack_health = max(0.0, 100.0 - crack_penalty)

        # --------------------------------------------------
        # 2. Detection confidence
        # --------------------------------------------------

        if detections:
            mean_confidence = sum(
                float(d.get("confidence", 0.0))
                for d in detections
            ) / len(detections)

            confidence_score = mean_confidence * 100.0
        else:
            mean_confidence = 0.0
            confidence_score = 100.0

        # --------------------------------------------------
        # 3. Image quality
        # --------------------------------------------------

        quality_score = max(0.0, min(float(image_quality), 100.0))

        # --------------------------------------------------
        # 4. Inspection reliability
        # --------------------------------------------------

        reliability_score = max(
            0.0,
            min(float(reliability_score), 100.0)
        )

        # --------------------------------------------------
        # 5. Calculate TCI
        # --------------------------------------------------

        tci = (
            self.w_crack * crack_health +
            self.w_confidence * (100.0 - confidence_score) +
            self.w_quality * quality_score +
            self.w_reliability * reliability_score
        )

        tci = max(0.0, min(tci, 100.0))

        # --------------------------------------------------
        # 6. Condition classification
        # --------------------------------------------------

        if tci >= 80:
            condition = "GOOD"
            priority = "LOW"
        elif tci >= 60:
            condition = "FAIR"
            priority = "MEDIUM"
        elif tci >= 40:
            condition = "POOR"
            priority = "HIGH"
        else:
            condition = "CRITICAL"
            priority = "URGENT"

        # --------------------------------------------------
        # 7. Maintenance recommendation
        # --------------------------------------------------

        recommendations = {
            "GOOD": "Continue routine monitoring.",
            "FAIR": "Schedule preventive inspection.",
            "POOR": "Schedule detailed maintenance inspection.",
            "CRITICAL": "Immediate inspection and maintenance required."
        }

        return {
            "track_condition_index": round(tci, 2),
            "condition": condition,
            "maintenance_priority": priority,
            "recommendation": recommendations[condition],
            "components": {
                "crack_health": round(crack_health, 2),
                "confidence_score": round(confidence_score, 2),
                "image_quality": round(quality_score, 2),
                "inspection_reliability": round(reliability_score, 2)
            },
            "detections_count": len(detections),
            "mean_detection_confidence": round(mean_confidence, 4)
        }