import sys
from pathlib import Path

# Project root
workspace_root = Path(__file__).resolve().parents[1]

if str(workspace_root) not in sys.path:
    sys.path.insert(0, str(workspace_root))

from app.inspection_pipeline import RailwayInspectionPipeline


def main():

    model_path = (
        workspace_root
        / "models"
        / "railway_crack_detector"
        / "weights"
        / "best.pt"
    )

    # Use one of your actual degraded test images
    image_path = (
        workspace_root
        / "outputs"
        / "robustness_tests"
        / "Image-095_jpg.rf.f9c494e2370881f28ed497aed2af96a3_combined.jpg"
    )

    print("\n" + "=" * 70)
    print("RAILWAY TRACK HEALTH - FINAL INSPECTION TEST")
    print("=" * 70)

    print(f"\nImage : {image_path.name}")
    print(f"Model : {model_path.name}")

    pipeline = RailwayInspectionPipeline(
        model_path=str(model_path)
    )

    result = pipeline.inspect(
        str(image_path)
    )

    print("\n" + "-" * 70)
    print("IMAGE QUALITY")
    print("-" * 70)

    print(
        f"Quality Before     : "
        f"{result['quality_before']:.2f}/100"
    )

    print(
        f"Quality After      : "
        f"{result['quality_after']:.2f}/100"
    )

    print(
        f"Quality Improvement: "
        f"{result['quality_gain']:+.2f}"
    )

    print("\nCalibration Operations:")

    for operation in result["calibration_operations"]:
        print(f"  • {operation}")

    print("\n" + "-" * 70)
    print("DETECTION")
    print("-" * 70)

    print(
        f"Defects Detected   : "
        f"{result['detection_count']}"
    )

    print(
        f"Mean Confidence    : "
        f"{result['mean_confidence'] * 100:.2f}%"
    )

    print(
        f"Detection Stability: "
        f"{result['stability_score'] * 100:.2f}%"
    )

    if result["detections"]:

        for i, det in enumerate(
            result["detections"], start=1
        ):

            print(
                f"\n  Defect #{i}"
            )

            print(
                f"    Class      : "
                f"{det['class_name']}"
            )

            print(
                f"    Confidence: "
                f"{det['confidence'] * 100:.2f}%"
            )

            print(
                f"    Bounding Box: "
                f"{det['bbox_xyxy']}"
            )

    else:

        print("\n  No defects detected.")

    print("\n" + "-" * 70)
    print("INSPECTION RELIABILITY")
    print("-" * 70)

    reliability = result["reliability"]

    print(
        f"Reliability Score : "
        f"{reliability['reliability_score']:.2f}/100"
    )

    print(
        f"Reliability Status : "
        f"{reliability['reliability_status']}"
    )

    print(
        f"Trustworthy        : "
        f"{reliability['is_trustworthy']}"
    )

    print("\n" + "-" * 70)
    print("TRACK CONDITION")
    print("-" * 70)

    condition = result["condition"]

    print(
        f"Track Condition Index : "
        f"{condition['track_condition_index']:.2f}/100"
    )

    print(
        f"Condition             : "
        f"{condition['condition']}"
    )

    print(
        f"Maintenance Priority  : "
        f"{condition['maintenance_priority']}"
    )

    print(
        f"Recommendation        : "
        f"{condition['recommendation']}"
    )

    print("\n" + "=" * 70)
    print("FINAL INSPECTION COMPLETED")
    print("=" * 70)


if __name__ == "__main__":
    main()