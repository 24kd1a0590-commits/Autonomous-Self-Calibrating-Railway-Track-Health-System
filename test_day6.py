from algorithms.health_assessor import TrackHealthAssessor
from algorithms.decision_support import DecisionSupportSystem


def main():

    # Simulated YOLO detection.
    # This is only a module test, not an experimental result.
    detections = [
        {
            "class_id": 0,
            "class_name": "railway-gap",
            "confidence": 0.82,
            "bbox_xyxy": [400, 300, 650, 450]
        }
    ]

    image_width = 1280
    image_height = 720

    image_quality = 84.0
    reliability_score = 86.0

    # ---------------------------------------
    # Health Assessment
    # ---------------------------------------

    assessor = TrackHealthAssessor()

    health = assessor.calculate_track_health_index(
        detections=detections,
        image_quality=image_quality,
        reliability_score=reliability_score,
        image_width=image_width,
        image_height=image_height
    )

    print("\n" + "=" * 60)
    print("DAY 6 HEALTH ASSESSMENT TEST")
    print("=" * 60)

    print(f"Track Health Index : {health['thi']}")
    print(f"Condition           : {health['condition']}")
    print(f"Risk Level          : {health['risk_level']}")
    print(f"Defect Count        : {health['defect_count']}")
    print(
        f"Mean Severity       : "
        f"{health['mean_defect_severity']}"
    )
    print(
        f"Maximum Severity    : "
        f"{health['maximum_defect_severity']}"
    )

    # ---------------------------------------
    # Decision Support
    # ---------------------------------------

    decision_system = DecisionSupportSystem()

    decision = decision_system.generate_recommendation(
        thi=health["thi"],
        condition=health["condition"],
        risk_level=health["risk_level"],
        reliability_score=reliability_score,
        defect_count=health["defect_count"],
        maximum_severity=health["maximum_defect_severity"]
    )

    print("\n" + "=" * 60)
    print("DECISION SUPPORT")
    print("=" * 60)

    print(
        f"Recommendation : "
        f"{decision['recommendation']}"
    )

    print(
        f"Priority       : "
        f"{decision['priority']}"
    )

    print(
        f"Reason         : "
        f"{decision['reason']}"
    )

    print(
        f"Severity Note  : "
        f"{decision['severity_note']}"
    )

    print("=" * 60)


if __name__ == "__main__":
    main()