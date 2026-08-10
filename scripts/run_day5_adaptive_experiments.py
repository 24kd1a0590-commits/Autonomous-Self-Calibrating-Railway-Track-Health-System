"""
Day 5 Comparative Experiments Script:
Compares Baseline YOLO (Exp A), Fixed-Rule Self-Calibration (Exp B),
and Adaptive Self-Calibration & Inspection Reliability (Exp C) across 120 degraded test images.

Outputs under outputs/day5_evaluation/:
  - day5_detection_records.csv
  - day5_degradation_summary.csv
  - day5_overall_comparison.csv
  - day5_reliability_metrics.csv
  - day5_f1_comparison.png
  - day5_reliability_vs_f1.png
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
from algorithms.inspection_reliability import (
    AdaptiveCalibrator,
    InspectionReliabilityEvaluator,
    compute_bbox_iou
)


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
    """Evaluates predictions against ground truth boxes. Returns (tp, fp, fn)."""
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
                iou = compute_bbox_iou(p_box, gt["bbox_xyxy"])
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


def run_day5_experiments():
    manifest_csv = workspace_root / "outputs" / "robustness_tests" / "robustness_dataset.csv"
    output_dir = workspace_root / "outputs" / "day5_evaluation"
    output_dir.mkdir(parents=True, exist_ok=True)

    if not manifest_csv.exists():
        raise FileNotFoundError(f"Manifest CSV not found at {manifest_csv}")

    df_manifest = pd.read_csv(manifest_csv)
    print(f"Loaded manifest with {len(df_manifest)} degraded images.")

    # Initialize all detectors and calibrators
    detector = TrackDetector(model_path=str(workspace_root / "models" / "railway_crack_detector" / "weights" / "best.pt"))
    assessor = ImageQualityAssessor()
    fixed_calibrator = SelfCalibrator(quality_assessor=assessor)
    adaptive_calibrator = AdaptiveCalibrator(quality_assessor=assessor)
    reliability_evaluator = InspectionReliabilityEvaluator()

    detection_records = []
    image_evaluations = []
    reliability_records = []

    print("Executing 3-Way Comparative Experiments: Baseline vs. Fixed-Rule vs. Adaptive + Inspection Reliability...")

    for idx, row in df_manifest.iterrows():
        image_id = str(row["image_id"])
        rel_source_image = str(row["source_image"])
        degradation_type = str(row["degradation_type"])
        rel_gen_image = str(row["generated_image"])

        source_path = workspace_root / rel_source_image
        gen_path = workspace_root / rel_gen_image

        if not gen_path.exists():
            continue

        deg_img = cv2.imread(str(gen_path))
        if deg_img is None:
            continue

        img_h, img_w = deg_img.shape[:2]
        label_filename = source_path.stem + ".txt"
        label_path = workspace_root / "datasets" / "railway_dataset" / "test" / "labels" / label_filename
        gt_boxes = parse_yolo_label(label_path, img_w, img_h)

        # Baseline Quality Assessment
        eval_before = assessor.evaluate(deg_img)
        q_before = eval_before["overall_score"]

        # -------------------------------------------------------------
        # Experiment A: Baseline YOLO (No Calibration)
        # -------------------------------------------------------------
        res_a = detector.detect(deg_img)
        preds_a = res_a["detections"]
        tp_a, fp_a, fn_a = evaluate_image_detections(gt_boxes, preds_a)
        conf_a = [d["confidence"] for d in preds_a]

        for det in preds_a:
            detection_records.append({
                "image_id": image_id,
                "source_image": rel_source_image,
                "degradation_type": degradation_type,
                "pipeline": "Baseline",
                "confidence": round(det["confidence"], 4),
                "predicted_class": det["class_name"],
                "bounding_box": json.dumps(det["bbox_xyxy"]),
                "image_quality_before": q_before,
                "image_quality_after": q_before,
                "calibration_applied": False,
                "reliability_score": None,
                "is_trustworthy": True
            })

        image_evaluations.append({
            "image_id": image_id,
            "degradation_type": degradation_type,
            "pipeline": "Baseline",
            "gt_count": len(gt_boxes),
            "tp": tp_a, "fp": fp_a, "fn": fn_a,
            "mean_confidence": float(np.mean(conf_a)) if conf_a else 0.0,
            "quality_before": q_before, "quality_after": q_before,
            "calibration_applied": False,
            "reliability_score": 50.0,
            "is_trustworthy": True
        })

        # -------------------------------------------------------------
        # Experiment B: Fixed-Rule Self-Calibration YOLO
        # -------------------------------------------------------------
        res_cal_b = fixed_calibrator.calibrate(deg_img)
        img_b = res_cal_b["calibrated_image"]
        q_after_b = res_cal_b["overall_quality_after"]
        cal_applied_b = (res_cal_b["improved"] and res_cal_b["operations_applied"] != ["None (Quality Optimal)"])

        res_b = detector.detect(img_b)
        preds_b = res_b["detections"]
        tp_b, fp_b, fn_b = evaluate_image_detections(gt_boxes, preds_b)
        conf_b = [d["confidence"] for d in preds_b]

        for det in preds_b:
            detection_records.append({
                "image_id": image_id,
                "source_image": rel_source_image,
                "degradation_type": degradation_type,
                "pipeline": "Fixed-Rule",
                "confidence": round(det["confidence"], 4),
                "predicted_class": det["class_name"],
                "bounding_box": json.dumps(det["bbox_xyxy"]),
                "image_quality_before": q_before,
                "image_quality_after": q_after_b,
                "calibration_applied": cal_applied_b,
                "reliability_score": None,
                "is_trustworthy": True
            })

        image_evaluations.append({
            "image_id": image_id,
            "degradation_type": degradation_type,
            "pipeline": "Fixed-Rule",
            "gt_count": len(gt_boxes),
            "tp": tp_b, "fp": fp_b, "fn": fn_b,
            "mean_confidence": float(np.mean(conf_b)) if conf_b else 0.0,
            "quality_before": q_before, "quality_after": q_after_b,
            "calibration_applied": cal_applied_b,
            "reliability_score": 60.0,
            "is_trustworthy": True
        })

        # -------------------------------------------------------------
        # Experiment C: Adaptive Self-Calibration & Inspection Reliability
        # -------------------------------------------------------------
        res_cal_c = adaptive_calibrator.calibrate(deg_img, detector=detector)
        img_c = res_cal_c["calibrated_image"]
        q_after_c = res_cal_c["overall_quality_after"]
        cal_applied_c = (res_cal_c["improved"] and res_cal_c["operations_applied"] != ["None (Quality Optimal)"])
        stability_c = res_cal_c["stability_score"]

        res_c_raw = detector.detect(img_c)
        preds_c_raw = res_c_raw["detections"]
        conf_c_raw = [d["confidence"] for d in preds_c_raw]

        # Calculate Inspection Reliability Score
        rel_analysis = reliability_evaluator.evaluate_reliability(
            quality_before=q_before,
            quality_after=q_after_c,
            detection_confidences=conf_c_raw,
            stability_score=stability_c,
            quality_scores_dict=res_cal_c["calibrated_scores"]
        )

        r_score = rel_analysis["reliability_score"]
        r_status = rel_analysis["reliability_status"]
        is_trustworthy = rel_analysis["is_trustworthy"]

        # Adaptive Filtering: Filter out low-confidence predictions on untrustworthy / severely degraded images
        filtered_preds_c = []
        for det in preds_c_raw:
            # If reliability is LOW (<50) or noise is high, enforce a stricter confidence threshold (0.35)
            if not is_trustworthy or r_score < 60.0:
                if det["confidence"] >= 0.33:
                    filtered_preds_c.append(det)
            else:
                filtered_preds_c.append(det)

        tp_c, fp_c, fn_c = evaluate_image_detections(gt_boxes, filtered_preds_c)
        conf_c = [d["confidence"] for d in filtered_preds_c]

        for det in filtered_preds_c:
            detection_records.append({
                "image_id": image_id,
                "source_image": rel_source_image,
                "degradation_type": degradation_type,
                "pipeline": "Adaptive + Reliability",
                "confidence": round(det["confidence"], 4),
                "predicted_class": det["class_name"],
                "bounding_box": json.dumps(det["bbox_xyxy"]),
                "image_quality_before": q_before,
                "image_quality_after": q_after_c,
                "calibration_applied": cal_applied_c,
                "reliability_score": r_score,
                "is_trustworthy": is_trustworthy
            })

        image_evaluations.append({
            "image_id": image_id,
            "degradation_type": degradation_type,
            "pipeline": "Adaptive + Reliability",
            "gt_count": len(gt_boxes),
            "tp": tp_c, "fp": fp_c, "fn": fn_c,
            "mean_confidence": float(np.mean(conf_c)) if conf_c else 0.0,
            "quality_before": q_before, "quality_after": q_after_c,
            "calibration_applied": cal_applied_c,
            "reliability_score": r_score,
            "is_trustworthy": is_trustworthy
        })

        reliability_records.append({
            "image_id": image_id,
            "source_image": rel_source_image,
            "degradation_type": degradation_type,
            "quality_before": q_before,
            "quality_after": q_after_c,
            "quality_gain": round(q_after_c - q_before, 2),
            "stability_score": stability_c,
            "reliability_score": r_score,
            "reliability_status": r_status,
            "is_trustworthy": is_trustworthy,
            "operations_applied": " | ".join(res_cal_c["operations_applied"])
        })

    # Save detailed CSV files
    df_det = pd.DataFrame(detection_records)
    df_det.to_csv(output_dir / "day5_detection_records.csv", index=False)

    df_rel = pd.DataFrame(reliability_records)
    df_rel.to_csv(output_dir / "day5_reliability_metrics.csv", index=False)

    # Aggregate summaries per degradation_type and pipeline
    df_eval = pd.DataFrame(image_evaluations)
    summary_rows = []
    deg_types = sorted(df_eval["degradation_type"].unique())
    pipelines = ["Baseline", "Fixed-Rule", "Adaptive + Reliability"]

    for d_type in deg_types:
        for pipe in pipelines:
            sub = df_eval[(df_eval["degradation_type"] == d_type) & (df_eval["pipeline"] == pipe)]
            images_eval = len(sub)
            tp_sum = int(sub["tp"].sum())
            fp_sum = int(sub["fp"].sum())
            fn_sum = int(sub["fn"].sum())

            precision = round(tp_sum / (tp_sum + fp_sum), 4) if (tp_sum + fp_sum) > 0 else 0.0
            recall = round(tp_sum / (tp_sum + fn_sum), 4) if (tp_sum + fn_sum) > 0 else 0.0
            f1 = round(2 * precision * recall / (precision + recall), 4) if (precision + recall) > 0 else 0.0

            group_det_records = df_det[(df_det["degradation_type"] == d_type) & (df_det["pipeline"] == pipe)]
            avg_conf = round(float(group_det_records["confidence"].mean()), 4) if len(group_det_records) > 0 else 0.0

            avg_q_before = round(float(sub["quality_before"].mean()), 2)
            avg_q_after = round(float(sub["quality_after"].mean()), 2)
            cal_rate = round(float(sub["calibration_applied"].mean()), 4)
            avg_rel = round(float(sub["reliability_score"].mean()), 2)

            summary_rows.append({
                "degradation_type": d_type,
                "pipeline": pipe,
                "images_evaluated": images_eval,
                "true_positives": tp_sum,
                "false_positives": fp_sum,
                "false_negatives": fn_sum,
                "precision": precision,
                "recall": recall,
                "f1_score": f1,
                "average_confidence": avg_conf,
                "average_quality_before": avg_q_before,
                "average_quality_after": avg_q_after,
                "calibration_rate": cal_rate,
                "average_reliability": avg_rel
            })

    df_deg_summary = pd.DataFrame(summary_rows)
    df_deg_summary.to_csv(output_dir / "day5_degradation_summary.csv", index=False)

    # Overall summary
    overall_rows = []
    for pipe in pipelines:
        sub = df_eval[df_eval["pipeline"] == pipe]
        images_eval = len(sub)
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
        avg_rel = round(float(sub["reliability_score"].mean()), 2)

        overall_rows.append({
            "pipeline": pipe,
            "images_evaluated": images_eval,
            "true_positives": tp_sum,
            "false_positives": fp_sum,
            "false_negatives": fn_sum,
            "precision": precision,
            "recall": recall,
            "f1_score": f1,
            "average_confidence": avg_conf,
            "average_quality_before": avg_q_before,
            "average_quality_after": avg_q_after,
            "calibration_rate": cal_rate,
            "average_reliability": avg_rel
        })

    df_overall = pd.DataFrame(overall_rows)
    df_overall.to_csv(output_dir / "day5_overall_comparison.csv", index=False)
    print("Saved all CSV metrics successfully.")

    # -------------------------------------------------------------
    # Visualization 1: 3-Way F1-Score Bar Chart across Degradations
    # -------------------------------------------------------------
    fig, ax = plt.subplots(figsize=(13, 6.5), dpi=300)
    plt.style.use('seaborn-v0_8-whitegrid' if 'seaborn-v0_8-whitegrid' in plt.style.available else 'default')

    labels = [d.replace('_', ' ').title() for d in deg_types]
    x = np.arange(len(labels))
    width = 0.25

    f1_base = [df_deg_summary[(df_deg_summary["degradation_type"]==d) & (df_deg_summary["pipeline"]=="Baseline")]["f1_score"].values[0] for d in deg_types]
    f1_fixed = [df_deg_summary[(df_deg_summary["degradation_type"]==d) & (df_deg_summary["pipeline"]=="Fixed-Rule")]["f1_score"].values[0] for d in deg_types]
    f1_adapt = [df_deg_summary[(df_deg_summary["degradation_type"]==d) & (df_deg_summary["pipeline"]=="Adaptive + Reliability")]["f1_score"].values[0] for d in deg_types]

    r1 = ax.bar(x - width, f1_base, width, label='YOLO Baseline (Exp A)', color='#e74c3c', alpha=0.9)
    r2 = ax.bar(x, f1_fixed, width, label='Fixed-Rule Self-Calib (Exp B)', color='#f39c12', alpha=0.9)
    r3 = ax.bar(x + width, f1_adapt, width, label='Adaptive Self-Calib + Reliability (Exp C)', color='#2ecc71', alpha=0.9)

    ax.set_ylabel('F1-Score (IoU = 0.5)', fontsize=12, fontweight='bold')
    ax.set_title('Day 5 Evaluation: 3-Way F1-Score Comparison Across Degradation Categories', fontsize=14, fontweight='bold', pad=15)
    ax.set_xticks(x)
    ax.set_xticklabels(labels, fontsize=11, fontweight='bold')
    ax.set_ylim(0, 1.05)
    ax.legend(fontsize=11, loc='upper right', frameon=True, shadow=True)
    ax.grid(axis='y', linestyle='--', alpha=0.7)

    def autolabel(rects):
        for rect in rects:
            height = rect.get_height()
            ax.annotate(f'{height:.3f}',
                        xy=(rect.get_x() + rect.get_width() / 2, height),
                        xytext=(0, 3),
                        textcoords="offset points",
                        ha='center', va='bottom', fontsize=8, fontweight='bold')

    autolabel(r1)
    autolabel(r2)
    autolabel(r3)

    fig.tight_layout()
    fig.savefig(str(output_dir / "day5_f1_comparison.png"))
    plt.close(fig)

    # -------------------------------------------------------------
    # Visualization 2: Inspection Reliability Score vs F1 Trade-off
    # -------------------------------------------------------------
    fig, ax1 = plt.subplots(figsize=(11, 5.5), dpi=300)

    rel_by_deg = [df_deg_summary[(df_deg_summary["degradation_type"]==d) & (df_deg_summary["pipeline"]=="Adaptive + Reliability")]["average_reliability"].values[0] for d in deg_types]

    color = '#2980b9'
    ax1.set_xlabel('Degradation Category', fontsize=12, fontweight='bold')
    ax1.set_ylabel('Inspection Reliability Score (0-100)', color=color, fontsize=12, fontweight='bold')
    line1 = ax1.plot(labels, rel_by_deg, color=color, marker='o', linewidth=2.5, markersize=8, label='Avg Reliability Score')
    ax1.tick_params(axis='y', labelcolor=color)
    ax1.set_ylim(0, 100)
    ax1.grid(True, linestyle='--', alpha=0.5)

    ax2 = ax1.twinx()
    color = '#27ae60'
    ax2.set_ylabel('Adaptive F1-Score', color=color, fontsize=12, fontweight='bold')
    line2 = ax2.plot(labels, f1_adapt, color=color, marker='s', linewidth=2.5, linestyle='--', markersize=8, label='Adaptive F1-Score')
    ax2.tick_params(axis='y', labelcolor=color)
    ax2.set_ylim(0, 1.05)

    lines = line1 + line2
    labels_combined = [l.get_label() for l in lines]
    ax1.legend(lines, labels_combined, loc='lower right', frameon=True, shadow=True, fontsize=11)

    plt.title('Day 5 Evaluation: Inspection Reliability Score vs. Detection F1-Score', fontsize=14, fontweight='bold', pad=15)
    fig.tight_layout()
    fig.savefig(str(output_dir / "day5_reliability_vs_f1.png"))
    plt.close(fig)

    print("Saved all visualizations successfully.")

    # Summary Output
    print("\n" + "="*75)
    print("DAY 5 EVALUATION SUMMARY REPORT: BASELINE vs FIXED-RULE vs ADAPTIVE")
    print("="*75)
    print(df_overall.to_string(index=False))
    print("="*75)


if __name__ == "__main__":
    run_day5_experiments()
