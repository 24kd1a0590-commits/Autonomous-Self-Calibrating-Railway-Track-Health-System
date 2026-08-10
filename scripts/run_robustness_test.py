"""
Execution script for Day 3 Robustness Experimentation.
Loads test images, generates controlled degraded variants, saves them,
builds the CSV manifest, and verifies image integrity.
"""

import os
import sys
import json
import cv2
import csv
from pathlib import Path
from PIL import Image

# Ensure workspace root is in Python path
workspace_root = Path(__file__).resolve().parent.parent
if str(workspace_root) not in sys.path:
    sys.path.insert(0, str(workspace_root))

from algorithms.robustness_test import RobustnessTester


def run_robustness_experiment():
    test_dir = workspace_root / "datasets" / "railway_dataset" / "test" / "images"
    output_dir = workspace_root / "outputs" / "robustness_tests"
    csv_path = output_dir / "robustness_dataset.csv"

    output_dir.mkdir(parents=True, exist_ok=True)

    if not test_dir.exists():
        raise FileNotFoundError(f"Test directory not found at {test_dir}")

    # Gather test images (prefer ~20 images)
    all_image_paths = sorted([p for p in test_dir.iterdir() if p.suffix.lower() in ('.jpg', '.jpeg', '.png')])
    
    if len(all_image_paths) >= 20:
        selected_images = all_image_paths[:20]
    else:
        selected_images = all_image_paths

    num_source_images = len(selected_images)
    print(f"Selected {num_source_images} source images from {test_dir}")

    tester = RobustnessTester(seed=42)
    degradation_types = [
        "gaussian_blur",
        "low_brightness",
        "high_brightness",
        "low_contrast",
        "gaussian_noise",
        "combined"
    ]

    csv_rows = []
    example_filenames = []
    generated_count = 0

    print("Generating degraded image variants...")

    for src_path in selected_images:
        rel_source_path = src_path.relative_to(workspace_root).as_posix()
        stem = src_path.stem
        ext = src_path.suffix

        for deg_type in degradation_types:
            degraded_img, params = tester.apply_degradation(src_path, deg_type)
            
            gen_filename = f"{stem}_{deg_type}{ext}"
            gen_file_path = output_dir / gen_filename
            rel_gen_path = gen_file_path.relative_to(workspace_root).as_posix()

            # Save generated image using OpenCV
            success = cv2.imwrite(str(gen_file_path), degraded_img)
            if not success:
                print(f"Warning: Failed to save image {gen_file_path}")

            image_id = f"{stem}_{deg_type}"
            params_json = json.dumps(params)

            csv_rows.append({
                "image_id": image_id,
                "source_image": rel_source_path,
                "degradation_type": deg_type,
                "degradation_parameters": params_json,
                "generated_image": rel_gen_path
            })

            generated_count += 1
            if len(example_filenames) < 5:
                example_filenames.append(gen_filename)

    # Write CSV manifest
    fieldnames = ["image_id", "source_image", "degradation_type", "degradation_parameters", "generated_image"]
    with open(csv_path, mode="w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(csv_rows)

    print(f"CSV manifest created at {csv_path}")

    # Verify integrity of generated images
    print("Verifying generated image integrity...")
    successful_count = 0
    failed_count = 0

    for row in csv_rows:
        gen_path = workspace_root / row["generated_image"]
        try:
            # Test opening with PIL to ensure valid header & data
            with Image.open(gen_path) as img:
                img.verify()
            
            # Additional check: read with OpenCV to confirm pixel decoding
            cv_img = cv2.imread(str(gen_path))
            if cv_img is not None and cv_img.size > 0:
                successful_count += 1
            else:
                failed_count += 1
                print(f"Verification failed (OpenCV read null): {gen_path}")
        except Exception as e:
            failed_count += 1
            print(f"Verification failed ({e}): {gen_path}")

    # Summary Report
    print("\n" + "="*60)
    print("ROBUSTNESS TEST EXECUTION REPORT")
    print("="*60)
    print(f"Source Images Processed : {num_source_images}")
    print(f"Generated Images        : {generated_count}")
    print(f"Successful Images       : {successful_count}")
    print(f"Failed Images           : {failed_count}")
    print(f"Degradation Types ({len(degradation_types)}):")
    for d_type in degradation_types:
        print(f"  - {d_type}: {json.dumps(tester.degradation_configs[d_type])}")
    print(f"Output Directory        : {output_dir}")
    print(f"CSV Manifest Location   : {csv_path}")
    print("Example Generated Filenames:")
    for ex in example_filenames:
        print(f"  - {ex}")
    print("="*60)


if __name__ == "__main__":
    run_robustness_experiment()
