"""
Day 4 Evaluation Script: Baseline vs. Self-Calibrated Railway Track Defect Detection.
Compares YOLO Baseline vs. Self-Calibrated YOLO across controlled image degradations.
Outputs:
  - outputs/day4_evaluation/detection_results.csv
  - outputs/day4_evaluation/degradation_summary.csv
  - outputs/day4_evaluation/overall_comparison.csv
  - outputs/day4_evaluation/baseline_vs_calibrated.png
"""

import os
import sys
import json
import csv
import cv2
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from pathlib import Path

# Ensure workspace root is in Python path
workspace_root = Path(__file__).resolve().parent.parent
if str(workspace_root) not in sys.path:
    sys.path.insert(0, str(workspace_root))

from algorithms.track_detector import TrackDetector
from algorithms.image_quality import ImageQualityAssessor
from algorithms.self_calibration import SelfCalibrator


def compute_iou(box1: list, box2: list) -> float:
    """Computes Intersection over Union (IoU) between two bounding boxes [x1, y1, x2, y2]."""
    inter_x1 = max(box1[0], box2[0])
    inter_y1 = max(box1[1], box2[1])
    inter_x2 = min(box1[2], box2[2])
    inter_y2 = min(box1[3], box2[3])

    inter_w = max(0.0, inter_x2 - inter_x1)
    inter_h = max(0.0, inter_y2 - inter_y1)
    inter_area = inter_w * inter_h

    area1 = (box1[2] - box1[0]) * (box1[3] - box1[1])
    area2 = (box2[2] - box2[0]) * (box2[3] - box2[1])
    union_area = area1 + area2 - inter_area

    if union_area <= 0:
        return 0.0
    return float(inter_area / union_area)


def parse_yolo_label(label_path: Path, img_w: int, img_h: int) -> list:
    """Reads YOLO normalized label file and converts to pixel bounding boxes [x1, y1, x2, y2]."""
    gt_boxes = []
    if not label_path.exists():
        return gt_boxes

    with open(label_path, "r", encoding="utf-8") as f:
        for line in f:
            line_str = line.strip()
            if not line_str:
                continue
            parts = line_str.split()
            if len(parts) >= 5:
                cls_id = int(parts[0])
                xc, yc, w, h = map(float, parts[1:5])
                x1 = max(0.0, (xc - w / 2.0) * img_w)
                y1 = max(0.0, (yc - h / 2.0) * img_h)
                x2 = min(float(img_w), (xc + w / 2.0) * img_w)
                y2 = min(float(img_h), (yc + h / 2.0) * img_h)
                gt_boxes.append({
                    "class_id": cls_id,
                    "bbox_xyxy": [round(x1, 2), round(y1, 2), round(x2, 2), round(y2, 2)]
                })
    return gt_boxes


def evaluate_image_detections(gt_boxes: list, pred_detections: list, iou_thresh: float = 0.5):
    """
    Evaluates predictions against ground truth boxes for a single image.
    Returns (true_positives, false_positives, false_negatives).
    """
    sorted_preds = sorted(pred_detections, key=lambda x: x["confidence"], reverse=True)
    matched_gt = set()
    tp = 0
    fp = 0

    for pred in sorted_preds:
        p_box = pred["bbox_xyxy"]
        best_iou = 0.0
        best_gt_idx = -1

        for idx, gt in enumerate(gt_boxes):
            if idx in matched_gt:
                continue
            if gt["class_id"] == pred["class_id"]:
                iou = compute_iou(p_box, gt["bbox_xyxy"])
                if iou > best_iou:
                    best_iou = iou
                    best_gt_idx = idx

        if best_iou >= iou_thresh and best_gt_idx != -1:
            tp += 1
            matched_gt.add(best_gt_idx)
        else:
            fp += 1

    fn = len(gt_boxes) - len(matched_gt)
    return tp, fp, fn


def run_evaluation():
    manifest_csv = workspace_root / "outputs" / "robustness_tests" / "robustness_dataset.csv"
    output_dir = workspace_root / "outputs" / "day4_evaluation"
    output_dir.mkdir(parents=True, exist_ok=True)

    if not manifest_csv.exists():
        raise FileNotFoundError(f"Robustness dataset manifest not found at: {manifest_csv}")

    # Load dataset manifest
    df_manifest = pd.read_csv(manifest_csv)
    print(f"Loaded robustness dataset manifest with {len(df_manifest)} degraded images.")

    # Initialize components
    detector = TrackDetector(model_path=str(workspace_root / "models" / "railway_crack_detector" / "weights" / "best.pt"))
    assessor = ImageQualityAssessor()
    calibrator = SelfCalibrator(quality_assessor=assessor, enhancer=None)

    detection_records = []
    image_evaluations = []  # Per image metrics for summary aggregation

    print("Executing Experiment A (Baseline) and Experiment B (Self-Calibrated)...")

    for idx, row in df_manifest.iterrows():
        image_id = str(row["image_id"])
        rel_source_image = str(row["source_image"])
        degradation_type = str(row["degradation_type"])
        rel_gen_image = str(row["generated_image"])

        source_path = workspace_root / rel_source_image
        gen_path = workspace_root / rel_gen_image

        if not gen_path.exists():
            print(f"Warning: Degraded image file missing at {gen_path}")
            continue

        # Load degraded image
        deg_img = cv2.imread(str(gen_path))
        if deg_img is None:
            print(f"Warning: Could not read image at {gen_path}")
            continue

        img_h, img_w = deg_img.shape[:2]

        # Locate corresponding label file
        label_filename = source_path.stem + ".txt"
        label_path = workspace_root / "datasets" / "railway_dataset" / "test" / "labels" / label_filename
        gt_boxes = parse_yolo_label(label_path, img_w, img_h)

        # -------------------------------------------------------------
        # Experiment A: BASELINE (Degraded Image -> YOLO)
        # -------------------------------------------------------------
        quality_before = assessor.evaluate(deg_img)["overall_score"]
        res_a = detector.detect(deg_img)
        preds_a = res_a["detections"]

        tp_a, fp_a, fn_a = evaluate_image_detections(gt_boxes, preds_a, iou_thresh=0.5)

        for det in preds_a:
            detection_records.append({
                "image_id": image_id,
                "source_image": rel_source_image,
                "degradation_type": degradation_type,
                "pipeline": "Baseline",
                "confidence": round(det["confidence"], 4),
                "predicted_class": det["class_name"],
                "bounding_box": json.dumps(det["bbox_xyxy"]),
                "image_quality_before": quality_before,
                "image_quality_after": quality_before,
                "calibration_applied": False
            })

        conf_a = [det["confidence"] for det in preds_a]
        mean_conf_a = float(np.mean(conf_a)) if conf_a else 0.0

        image_evaluations.append({
            "image_id": image_id,
            "source_image": rel_source_image,
            "degradation_type": degradation_type,
            "pipeline": "Baseline",
            "gt_count": len(gt_boxes),
            "pred_count": len(preds_a),
            "tp": tp_a,
            "fp": fp_a,
            "fn": fn_a,
            "mean_confidence": mean_conf_a,
            "quality_before": quality_before,
            "quality_after": quality_before,
            "calibration_applied": False
        })

        # -------------------------------------------------------------
        # Experiment B: SELF-CALIBRATED (Degraded -> SelfCalibrator -> YOLO)
        # -------------------------------------------------------------
        cal_res = calibrator.calibrate(deg_img)
        calibrated_img = cal_res["calibrated_image"]
        quality_after = cal_res["overall_quality_after"]
        calibration_applied = (cal_res["improved"] and cal_res["operations_applied"] != ["None (Quality Optimal)"])

        res_b = detector.detect(calibrated_img)
        preds_b = res_b["detections"]

        tp_b, fp_b, fn_b = evaluate_image_detections(gt_boxes, preds_b, iou_thresh=0.5)

        for det in preds_b:
            detection_records.append({
                "image_id": image_id,
                "source_image": rel_source_image,
                "degradation_type": degradation_type,
                "pipeline": "Self-Calibrated",
                "confidence": round(det["confidence"], 4),
                "predicted_class": det["class_name"],
                "bounding_box": json.dumps(det["bbox_xyxy"]),
                "image_quality_before": quality_before,
                "image_quality_after": quality_after,
                "calibration_applied": calibration_applied
            })

        conf_b = [det["confidence"] for det in preds_b]
        mean_conf_b = float(np.mean(conf_b)) if conf_b else 0.0

        image_evaluations.append({
            "image_id": image_id,
            "source_image": rel_source_image,
            "degradation_type": degradation_type,
            "pipeline": "Self-Calibrated",
            "gt_count": len(gt_boxes),
            "pred_count": len(preds_b),
            "tp": tp_b,
            "fp": fp_b,
            "fn": fn_b,
            "mean_confidence": mean_conf_b,
            "quality_before": quality_before,
            "quality_after": quality_after,
            "calibration_applied": calibration_applied
        })

    # Save detection_results.csv
    detection_results_csv = output_dir / "detection_results.csv"
    df_det = pd.DataFrame(detection_records)
    df_det.to_csv(detection_results_csv, index=False)
    print(f"Saved detection records to {detection_results_csv} ({len(df_det)} total detections)")

    # Aggregate summaries per degradation_type and pipeline
    df_eval = pd.DataFrame(image_evaluations)

    summary_rows = []
    deg_types = sorted(df_eval["degradation_type"].unique())
    pipelines = ["Baseline", "Self-Calibrated"]

    for d_type in deg_types:
        for pipe in pipelines:
            sub = df_eval[(df_eval["degradation_type"] == d_type) & (df_eval["pipeline"] == pipe)]
            images_evaluated = len(sub)
            tp_sum = int(sub["tp"].sum())
            fp_sum = int(sub["fp"].sum())
            fn_sum = int(sub["fn"].sum())

            precision = round(tp_sum / (tp_sum + fp_sum), 4) if (tp_sum + fp_sum) > 0 else 0.0
            recall = round(tp_sum / (tp_sum + fn_sum), 4) if (tp_sum + fn_sum) > 0 else 0.0
            f1 = round(2 * precision * recall / (precision + recall), 4) if (precision + recall) > 0 else 0.0

            # Average confidence across all detected predictions in this group
            group_det_records = df_det[(df_det["degradation_type"] == d_type) & (df_det["pipeline"] == pipe)]
            avg_conf = round(float(group_det_records["confidence"].mean()), 4) if len(group_det_records) > 0 else 0.0

            avg_q_before = round(float(sub["quality_before"].mean()), 2)
            avg_q_after = round(float(sub["quality_after"].mean()), 2)
            cal_rate = round(float(sub["calibration_applied"].mean()), 4)

            summary_rows.append({
                "degradation_type": d_type,
                "pipeline": pipe,
                "images_evaluated": images_evaluated,
                "true_positives": tp_sum,
                "false_positives": fp_sum,
                "false_negatives": fn_sum,
                "precision": precision,
                "recall": recall,
                "f1_score": f1,
                "average_confidence": avg_conf,
                "average_quality_before": avg_q_before,
                "average_quality_after": avg_q_after,
                "calibration_rate": cal_rate
            })

    degradation_summary_csv = output_dir / "degradation_summary.csv"
    df_deg_summary = pd.DataFrame(summary_rows)
    df_deg_summary.to_csv(degradation_summary_csv, index=False)
    print(f"Saved degradation summary to {degradation_summary_csv}")

    # Overall comparison summary
    overall_rows = []
    for pipe in pipelines:
        sub = df_eval[df_eval["pipeline"] == pipe]
        images_evaluated = len(sub)
        tp_sum = int(sub["tp"].sum())
        fp_sum = int(sub["fp"].sum())
        fn_sum = int(sub["fn"].sum())

        precision = round(tp_sum / (tp_sum + fp_sum), 4) if (tp_sum + fp_sum) > 0 else 0.0
        recall = round(tp_sum / (tp_sum + fn_sum), 4) if (tp_sum + fn_sum) > 0 else 0.0
        f1 = round(2 * precision * recall / (precision + recall), 4) if (precision + recall) > 0 else 0.0

        group_det_records = df_det[df_det["pipeline"] == pipe]
        avg_conf = round(float(group_det_records["confidence"].mean()), 4) if len(group_det_records) > 0 else 0.0

        avg_q_before = round(float(sub["quality_before"].mean()), 2)
        avg_q_after = round(float(sub["quality_after"].mean()), 2)
        cal_rate = round(float(sub["calibration_applied"].mean()), 4)

        overall_rows.append({
            "pipeline": pipe,
            "images_evaluated": images_evaluated,
            "true_positives": tp_sum,
            "false_positives": fp_sum,
            "false_negatives": fn_sum,
            "precision": precision,
            "recall": recall,
            "f1_score": f1,
            "average_confidence": avg_conf,
            "average_quality_before": avg_q_before,
            "average_quality_after": avg_q_after,
            "calibration_rate": cal_rate
        })

    overall_comparison_csv = output_dir / "overall_comparison.csv"
    df_overall = pd.DataFrame(overall_rows)
    df_overall.to_csv(overall_comparison_csv, index=False)
    print(f"Saved overall comparison summary to {overall_comparison_csv}")

    # Generate Visualization Plot
    plot_path = output_dir / "baseline_vs_calibrated.png"
    plt.figure(figsize=(12, 6), dpi=300)
    plt.style.use('seaborn-v0_8-whitegrid' if 'seaborn-v0_8-whitegrid' in plt.style.available else 'default')

    labels = [d.replace('_', ' ').title() for d in deg_types]
    x = np.arange(len(labels))
    width = 0.35

    f1_baseline = [df_deg_summary[(df_deg_summary["degradation_type"]==d) & (df_deg_summary["pipeline"]=="Baseline")]["f1_score"].values[0] for d in deg_types]
    f1_calibrated = [df_deg_summary[(df_deg_summary["degradation_type"]==d) & (df_deg_summary["pipeline"]=="Self-Calibrated")]["f1_score"].values[0] for d in deg_types]

    fig, ax = plt.subplots(figsize=(12, 6.5), dpi=300)
    rects1 = ax.bar(x - width/2, f1_baseline, width, label='YOLO Baseline (Exp A)', color='#e74c3c', alpha=0.9)
    rects2 = ax.bar(x + width/2, f1_calibrated, width, label='Self-Calibrated YOLO (Exp B)', color='#2ecc71', alpha=0.9)

    ax.set_ylabel('F1-Score (IoU = 0.5)', fontsize=12, fontweight='bold')
    ax.set_title('Day 4 Evaluation: Baseline vs. Self-Calibrated Detection F1-Score across Degradations', fontsize=14, fontweight='bold', pad=15)
    ax.set_xticks(x)
    ax.set_xticklabels(labels, fontsize=11, fontweight='bold')
    ax.set_ylim(0, 1.05)
    ax.legend(fontsize=11, loc='upper right', frameon=True, shadow=True)
    ax.grid(axis='y', linestyle='--', alpha=0.7)

    # Attach value labels on bars
    def autolabel(rects):
        for rect in rects:
            height = rect.get_height()
            ax.annotate(f'{height:.3f}',
                        xy=(rect.get_x() + rect.get_width() / 2, height),
                        xytext=(0, 3),  # 3 points vertical offset
                        textcoords="offset points",
                        ha='center', va='bottom', fontsize=9, fontweight='bold')

    autolabel(rects1)
    autolabel(rects2)

    fig.tight_layout()
    plt.savefig(str(plot_path))
    plt.close()
    print(f"Saved comparison visualization to {plot_path}")

    # Display Report Summary to Terminal
    print("\n" + "="*70)
    print("DAY 4 EVALUATION SUMMARY REPORT: BASELINE VS. SELF-CALIBRATED")
    print("="*70)
    print(f"Total Images Evaluated: {len(df_manifest)} (x2 Pipelines = {len(df_eval)} total evaluations)")
    print("-" * 70)
    print("DEGRADATION SUMMARY (BY CATEGORY):")
    print(df_deg_summary[["degradation_type", "pipeline", "true_positives", "false_positives", "false_negatives", "precision", "recall", "f1_score", "calibration_rate"]].to_string(index=False))
    print("-" * 70)
    print("OVERALL COMPARISON:")
    print(df_overall.to_string(index=False))
    print("="*70)


if __name__ == "__main__":
    run_evaluation()
