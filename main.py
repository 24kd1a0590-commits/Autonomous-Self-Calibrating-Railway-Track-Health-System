"""
Day 7 - End-to-End Railway Track Health Assessment Pipeline

Pipeline:
Image
  -> Image Quality Assessment
  -> Adaptive Self-Calibration
  -> YOLO Defect Detection
  -> Inspection Reliability
  -> Defect Severity
  -> Track Health Index
  -> Decision Support
"""

import argparse
import json
from pathlib import Path

import cv2
import numpy as np

from algorithms.track_detector import TrackDetector
from algorithms.image_quality import ImageQualityAssessor
from algorithms.inspection_reliability import (
    AdaptiveCalibrator,
    InspectionReliabilityEvaluator,
)
from algorithms.health_assessor import TrackHealthAssessor
from algorithms.decision_support import DecisionSupportSystem


# ---------------------------------------------------------
# PROJECT PATHS
# ---------------------------------------------------------

ROOT = Path(__file__).resolve().parent

DEFAULT_MODEL = (
    ROOT
    / "models"
    / "railway_crack_detector"
    / "weights"
    / "best.pt"
)

DEFAULT_OUTPUT = ROOT / "outputs" / "day7_integration"


# ---------------------------------------------------------
# IMAGE LOADING
# ---------------------------------------------------------

def load_image(image_path):
    image_path = Path(image_path)

    if not image_path.exists():
        raise FileNotFoundError(
            f"Input image not found: {image_path}"
        )

    image = cv2.imread(str(image_path))
    

    if image is None:
        raise ValueError(
            f"Could not read image: {image_path}"
        )

    return image


# ---------------------------------------------------------
# MAIN PIPELINE
# ---------------------------------------------------------

def run_pipeline(image_path, model_path, output_dir):

    output_dir.mkdir(parents=True, exist_ok=True)

    print("\n" + "=" * 65)
    print("AUTONOMOUS SELF-CALIBRATING RAILWAY TRACK")
    print("HEALTH ASSESSMENT & DECISION SUPPORT SYSTEM")
    print("=" * 65)

    print(f"\nInput Image : {image_path}")
    print(f"Model       : {model_path}")

    # -----------------------------------------------------
    # 1. LOAD IMAGE
    # -----------------------------------------------------

    image = load_image(image_path)

    print("\n[1/7] Image loaded successfully")
    print(f"       Resolution: {image.shape[1]} x {image.shape[0]}")

    # -----------------------------------------------------
    # 2. IMAGE QUALITY ASSESSMENT
    # -----------------------------------------------------

    assessor = ImageQualityAssessor()

    quality_before = assessor.evaluate(image)

    print("\n[2/7] Image Quality Assessment")
    print(
        f"       Quality Score : "
        f"{quality_before['overall_score']:.2f}"
    )
    print(
        f"       Status        : "
        f"{quality_before['quality_status']}"
    )

    # -----------------------------------------------------
    # 3. ADAPTIVE SELF-CALIBRATION
    # -----------------------------------------------------

    detector = TrackDetector(
        model_path=str(model_path)
    )

    calibrator = AdaptiveCalibrator(
        quality_assessor=assessor
    )

    calibration_result = calibrator.calibrate(
        image,
        detector=detector
    )

    calibrated_image = calibration_result[
        "calibrated_image"
    ]

    print("\n[3/7] Adaptive Self-Calibration")
    print(
        f"       Quality Before : "
        f"{calibration_result['overall_quality_before']:.2f}"
    )
    print(
        f"       Quality After  : "
        f"{calibration_result['overall_quality_after']:.2f}"
    )
    print(
        f"       Stability      : "
        f"{calibration_result['stability_score']:.3f}"
    )

    print("       Operations:")

    for operation in calibration_result[
        "operations_applied"
    ]:
        print(f"         - {operation}")

    # -----------------------------------------------------
    # SAVE CALIBRATED IMAGE
    # -----------------------------------------------------

    calibrated_path = (
        output_dir / "calibrated_image.jpg"
    )

    cv2.imwrite(
        str(calibrated_path),
        calibrated_image
    )

    # -----------------------------------------------------
    # 4. YOLO DEFECT DETECTION
    # -----------------------------------------------------

    detection_result = detector.detect(
        calibrated_image
    )

    detections = detection_result["detections"]

    print("\n[4/7] Defect Detection")
    print(
        f"       Defects Detected : "
        f"{len(detections)}"
    )

    for i, detection in enumerate(
        detections,
        start=1
    ):
        print(
            f"       Defect {i}: "
            f"{detection['class_name']} | "
            f"Confidence = "
            f"{detection['confidence']:.3f}"
        )

    # -----------------------------------------------------
    # 5. INSPECTION RELIABILITY
    # -----------------------------------------------------

    reliability_evaluator = (
        InspectionReliabilityEvaluator()
    )

    confidences = [
        d["confidence"]
        for d in detections
    ]

    reliability = (
        reliability_evaluator.evaluate_reliability(
            quality_before=calibration_result[
                "overall_quality_before"
            ],
            quality_after=calibration_result[
                "overall_quality_after"
            ],
            detection_confidences=confidences,
            stability_score=calibration_result[
                "stability_score"
            ],
            quality_scores_dict=calibration_result[
                "calibrated_scores"
            ],
        )
    )

    print("\n[5/7] Inspection Reliability")
    print(
        f"       Reliability Score : "
        f"{reliability['reliability_score']:.2f}"
    )
    print(
        f"       Status             : "
        f"{reliability['reliability_status']}"
    )
    print(
        f"       Trustworthy        : "
        f"{reliability['is_trustworthy']}"
    )

        # -----------------------------------------------------
    # 6. TRACK HEALTH ASSESSMENT
    # -----------------------------------------------------

    health_assessor = TrackHealthAssessor()

    health_result = health_assessor.assess(
        detections=detections,
        image_quality=calibration_result["overall_quality_after"],
        reliability_score=reliability["reliability_score"],
        image_width=image.shape[1],
        image_height=image.shape[0]
    )

    print("\n[6/7] Track Health Assessment")

    print(
        f"       Track Health Index : "
        f"{health_result['thi']:.2f}"
    )

    print(
        f"       Condition          : "
        f"{health_result['condition']}"
    )

    print(
        f"       Risk Level         : "
        f"{health_result['risk_level']}"
    )

    print(
        f"       Defect Count       : "
        f"{health_result['defect_count']}"
    )
    # -----------------------------------------------------
    # 7. DECISION SUPPORT
    # -----------------------------------------------------
    decision_system = DecisionSupportSystem()

    decision = decision_system.generate_recommendation(
        thi=health_result["thi"],
        condition=health_result["condition"],
        risk_level=health_result["risk_level"],
        reliability_score=reliability["reliability_score"],
        defect_count=health_result["defect_count"],
        maximum_severity=health_result["maximum_defect_severity"]
    )

    print("\n[7/7] Decision Support")
    print(
        f"       Recommendation : "
        f"{decision['recommendation']}"
    )
    print(
        f"       Priority       : "
        f"{decision['priority']}"
    )
    print(
        f"       Reason         : "
        f"{decision['reason']}"
    )

    # -----------------------------------------------------
    # ANNOTATED OUTPUT
    # -----------------------------------------------------

    annotated = image.copy()

    for detection in detections:

        x1, y1, x2, y2 = map(
            int,
            detection["bbox_xyxy"]
        )

        confidence = detection[
            "confidence"
        ]

        label = (
            f"{detection['class_name']} "
            f"{confidence:.2f}"
        )

        cv2.rectangle(
            annotated,
            (x1, y1),
            (x2, y2),
            (0, 0, 255),
            3
        )

        cv2.putText(
            annotated,
            label,
            (x1, max(25, y1 - 10)),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (0, 0, 255),
            2,
        )

    annotated_path = (
        output_dir / "final_inspection_result.jpg"
    )

    cv2.imwrite(
        str(annotated_path),
        annotated
    )

    # -----------------------------------------------------
    # FINAL JSON REPORT
    # -----------------------------------------------------

    report = {
        "input_image": str(image_path),

        "image_quality": {
            "before": calibration_result[
                "overall_quality_before"
            ],
            "after": calibration_result[
                "overall_quality_after"
            ],
            "status": calibration_result[
                "quality_status_after"
            ],
        },

        "calibration": {
            "operations": calibration_result[
                "operations_applied"
            ],
            "stability_score": calibration_result[
                "stability_score"
            ],
            "improved": calibration_result[
                "improved"
            ],
        },

        "detections": detections,

        "inspection_reliability": reliability,

        "health_assessment": health_result,

        "decision_support": decision,

        "outputs": {
            "calibrated_image": str(
                calibrated_path
            ),
            "annotated_image": str(
                annotated_path
            ),
        },
    }

    report_path = (
        output_dir / "inspection_report.json"
    )

    with open(
        report_path,
        "w",
        encoding="utf-8"
    ) as f:
        json.dump(
            report,
            f,
            indent=4,
            default=str
        )

    # -----------------------------------------------------
    # FINAL SUMMARY
    # -----------------------------------------------------

    print("\n" + "=" * 65)
    print("FINAL INSPECTION SUMMARY")
    print("=" * 65)

    print(
        f"Track Health Index : "
        f"{health_result['thi']:.2f}"
    )

    print(
        f"Condition          : "
        f"{health_result['condition']}"
    )

    print(
        f"Risk Level         : "
        f"{health_result['risk_level']}"
    )

    print(
        f"Reliability        : "
        f"{reliability['reliability_score']:.2f}"
    )

    print(
        f"Recommendation     : "
        f"{decision['recommendation']}"
    )

    print("\nGenerated Files:")
    print(f"  - {calibrated_path}")
    print(f"  - {annotated_path}")
    print(f"  - {report_path}")

    print("=" * 65)

    return report


# ---------------------------------------------------------
# COMMAND LINE INTERFACE
# ---------------------------------------------------------

def main():

    parser = argparse.ArgumentParser(
        description=(
            "Autonomous Self-Calibrating "
            "Railway Track Health Assessment Pipeline"
        )
    )

    parser.add_argument(
        "--input",
        required=True,
        help="Path to railway inspection image"
    )

    parser.add_argument(
        "--model",
        default=str(DEFAULT_MODEL),
        help="Path to YOLO model weights"
    )

    parser.add_argument(
        "--output",
        default=str(DEFAULT_OUTPUT),
        help="Output directory"
    )

    args = parser.parse_args()

    run_pipeline(
        image_path=Path(args.input),
        model_path=Path(args.model),
        output_dir=Path(args.output),
    )


if __name__ == "__main__":
    main()