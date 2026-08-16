// Auto-generated data module from day7_integration outputs and test dataset
export const summaryStats = {
  totalInspections: 84,
  defectsDetectedCount: 39,
  defectFreeCount: 45,
  avgTHI: 65.93,
  avgReliability: 72.79,
  avgQualityBefore: 85.57,
  avgQualityAfter: 88.69,
  avgQualityGain: 3.12,
  riskCounts: {"HIGH": 35, "MEDIUM": 5, "LOW": 44, "CRITICAL": 0},
  conditionCounts: {"CRITICAL": 3, "POOR": 36, "FAIR": 0, "MODERATE": 1, "GOOD": 44, "EXCELLENT": 0}
};

export const thiBins = [
  {
    "range": "0 - 40 (Critical)",
    "count": 3
  },
  {
    "range": "40 - 60 (Poor)",
    "count": 36
  },
  {
    "range": "60 - 75 (Moderate)",
    "count": 1
  },
  {
    "range": "75 - 90 (Good)",
    "count": 44
  },
  {
    "range": "90 - 100 (Excellent)",
    "count": 0
  }
];

export const riskDistribution = [
  { name: "HIGH RISK", value: 35, color: "#ef4444" },
  { name: "MEDIUM RISK", value: 5, color: "#f59e0b" },
  { name: "LOW RISK", value: 44, color: "#10b981" },
  { name: "CRITICAL RISK", value: 0, color: "#dc2626" }
].filter(d => d.value > 0);

export const conditionDistribution = [
  { name: "GOOD", value: 44, color: "#10b981" },
  { name: "POOR", value: 36, color: "#f59e0b" },
  { name: "CRITICAL", value: 3, color: "#ef4444" },
  { name: "MODERATE", value: 1, color: "#3b82f6" }
].filter(d => d.value > 0);

export const qualityGainSamples = [
  {
    "name": "370130530_85",
    "before": 78.66,
    "after": 84.15,
    "gain": 5.49
  },
  {
    "name": "387463605_38",
    "before": 90.55,
    "after": 90.55,
    "gain": 0.0
  },
  {
    "name": "398024305_88",
    "before": 84.03,
    "after": 88.03,
    "gain": 4.0
  },
  {
    "name": "398319920_10",
    "before": 76.26,
    "after": 84.1,
    "gain": 7.84
  },
  {
    "name": "403621555_26",
    "before": 76.21,
    "after": 88.33,
    "gain": 12.12
  },
  {
    "name": "404456192_31",
    "before": 92.99,
    "after": 92.99,
    "gain": 0.0
  },
  {
    "name": "405164009_13",
    "before": 82.73,
    "after": 82.73,
    "gain": 0.0
  },
  {
    "name": "Image-072_jp",
    "before": 86.49,
    "after": 88.55,
    "gain": 2.06
  },
  {
    "name": "Image-085_jp",
    "before": 91.34,
    "after": 93.59,
    "gain": 2.25
  },
  {
    "name": "Image-086_jp",
    "before": 84.65,
    "after": 90.52,
    "gain": 5.87
  },
  {
    "name": "Image-089_jp",
    "before": 81.53,
    "after": 85.1,
    "gain": 3.57
  },
  {
    "name": "Image-090_jp",
    "before": 85.42,
    "after": 89.82,
    "gain": 4.4
  }
];

export const defaultSelectedId = "Image-180_jpg.rf.b5a2281308d5b4353035e28742735c5f.jpg";

export const allInspections = [
  {
    "id": "370130530_852604809689003_4697102894634927590_n_jpg.rf.c866c9ca55745a551fde51903bebd6d9.jpg",
    "image": "370130530_852604809689003_4697102894634927590_n_jpg.rf.c866c9ca55745a551fde51903bebd6d9.jpg",
    "shortName": "370130530_852604809689003_4697102894634927590_n_jpg",
    "quality_before": 78.66,
    "quality_after": 84.15,
    "quality_gain": 5.49,
    "stability": 0.945,
    "stability_pct": 94.5,
    "defects": 2,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 67.55,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 41.31,
    "condition": "POOR",
    "risk_level": "HIGH",
    "recommendation": "PRIORITIZE DETAILED INSPECTION",
    "priority": "HIGH",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=55.6)",
      "Adaptive CLAHE (clip_limit=1.8)"
    ],
    "components": {
      "quality_component": 84.15,
      "quality_gain_component": 63.73,
      "stability_component": 94.5,
      "confidence_component": 41.7,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "387463605_385533223827035_6813258457814046414_n_jpg.rf.2de70c11b3483180974a287d5fec0738.jpg",
    "image": "387463605_385533223827035_6813258457814046414_n_jpg.rf.2de70c11b3483180974a287d5fec0738.jpg",
    "shortName": "387463605_385533223827035_6813258457814046414_n_jpg",
    "quality_before": 90.55,
    "quality_after": 90.55,
    "quality_gain": 0.0,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 1,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 74.37,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 43.05,
    "condition": "POOR",
    "risk_level": "HIGH",
    "recommendation": "PRIORITIZE DETAILED INSPECTION",
    "priority": "HIGH",
    "calibration_operations": [
      "None (Quality Optimal / Reverted)"
    ],
    "components": {
      "quality_component": 90.55,
      "quality_gain_component": 50.0,
      "stability_component": 100.0,
      "confidence_component": 41.7,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "398024305_888098062432239_67075769886786186_n_jpg.rf.1cf6cdeb5d3e51c28bc4f378309cf554.jpg",
    "image": "398024305_888098062432239_67075769886786186_n_jpg.rf.1cf6cdeb5d3e51c28bc4f378309cf554.jpg",
    "shortName": "398024305_888098062432239_67075769886786186_n_jpg",
    "quality_before": 84.03,
    "quality_after": 88.03,
    "quality_gain": 4.0,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 71.18,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 82.97,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 88.03,
      "quality_gain_component": 60.0,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "398319920_1058988998622390_4490991049977589883_n_jpg.rf.9a02dd1d4c44640dc411565f7cfab6ad.jpg",
    "image": "398319920_1058988998622390_4490991049977589883_n_jpg.rf.9a02dd1d4c44640dc411565f7cfab6ad.jpg",
    "shortName": "398319920_1058988998622390_4490991049977589883_n_jpg",
    "quality_before": 76.26,
    "quality_after": 84.1,
    "quality_gain": 7.84,
    "stability": 0.931,
    "stability_pct": 93.1,
    "defects": 1,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 69.6,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 45.47,
    "condition": "POOR",
    "risk_level": "HIGH",
    "recommendation": "PRIORITIZE DETAILED INSPECTION",
    "priority": "HIGH",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=55.6)",
      "Adaptive CLAHE (clip_limit=1.8)"
    ],
    "components": {
      "quality_component": 84.1,
      "quality_gain_component": 69.6,
      "stability_component": 93.1,
      "confidence_component": 41.7,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "403621555_260882870301957_1069990204210876124_n_jpg.rf.7e413786bc9b20f4988fa830befb715d.jpg",
    "image": "403621555_260882870301957_1069990204210876124_n_jpg.rf.7e413786bc9b20f4988fa830befb715d.jpg",
    "shortName": "403621555_260882870301957_1069990204210876124_n_jpg",
    "quality_before": 76.21,
    "quality_after": 88.33,
    "quality_gain": 12.12,
    "stability": 0.993,
    "stability_pct": 99.3,
    "defects": 1,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 77.89,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 44.8,
    "condition": "POOR",
    "risk_level": "HIGH",
    "recommendation": "PRIORITIZE DETAILED INSPECTION",
    "priority": "HIGH",
    "calibration_operations": [
      "Adaptive Denoising (d=7, sigma=80.0)",
      "Adaptive Contrast Enhancement (CLAHE)",
      "Adaptive Brightness Correction"
    ],
    "components": {
      "quality_component": 88.33,
      "quality_gain_component": 80.3,
      "stability_component": 99.3,
      "confidence_component": 41.7,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "404456192_318960201081069_7751541671722173557_n_jpg.rf.c62046e7d697a6b78d5209612e0a3704.jpg",
    "image": "404456192_318960201081069_7751541671722173557_n_jpg.rf.c62046e7d697a6b78d5209612e0a3704.jpg",
    "shortName": "404456192_318960201081069_7751541671722173557_n_jpg",
    "quality_before": 92.99,
    "quality_after": 92.99,
    "quality_gain": 0.0,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 1,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 73.28,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 45.22,
    "condition": "POOR",
    "risk_level": "HIGH",
    "recommendation": "PRIORITIZE DETAILED INSPECTION",
    "priority": "HIGH",
    "calibration_operations": [
      "None (Quality Optimal / Reverted)"
    ],
    "components": {
      "quality_component": 92.99,
      "quality_gain_component": 50.0,
      "stability_component": 100.0,
      "confidence_component": 41.7,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "405164009_1329438514381570_8373604434977927159_n_jpg.rf.c4483fccfcf156bc36f7593c4bf3056e.jpg",
    "image": "405164009_1329438514381570_8373604434977927159_n_jpg.rf.c4483fccfcf156bc36f7593c4bf3056e.jpg",
    "shortName": "405164009_1329438514381570_8373604434977927159_n_jpg",
    "quality_before": 82.73,
    "quality_after": 82.73,
    "quality_gain": 0.0,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 73.96,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 80.1,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "None (Quality Optimal / Reverted)"
    ],
    "components": {
      "quality_component": 82.73,
      "quality_gain_component": 50.0,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-072_jpg.rf.220468c408e3a40c2f2537fd97918dd4.jpg",
    "image": "Image-072_jpg.rf.220468c408e3a40c2f2537fd97918dd4.jpg",
    "shortName": "Image-072_jpg",
    "quality_before": 86.49,
    "quality_after": 88.55,
    "quality_gain": 2.06,
    "stability": 0.988,
    "stability_pct": 98.8,
    "defects": 3,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 72.29,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 52.32,
    "condition": "POOR",
    "risk_level": "MEDIUM",
    "recommendation": "SCHEDULE DETAILED INSPECTION",
    "priority": "MEDIUM",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 88.55,
      "quality_gain_component": 55.15,
      "stability_component": 98.8,
      "confidence_component": 41.7,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-085_jpg.rf.8c115867e8ce3c56ed73ba1ddff072e3.jpg",
    "image": "Image-085_jpg.rf.8c115867e8ce3c56ed73ba1ddff072e3.jpg",
    "shortName": "Image-085_jpg",
    "quality_before": 91.34,
    "quality_after": 93.59,
    "quality_gain": 2.25,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 78.88,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 89.18,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 93.59,
      "quality_gain_component": 55.62,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-086_jpg.rf.fd66a330b1a4609af496098a20b0c248.jpg",
    "image": "Image-086_jpg.rf.fd66a330b1a4609af496098a20b0c248.jpg",
    "shortName": "Image-086_jpg",
    "quality_before": 84.65,
    "quality_after": 90.52,
    "quality_gain": 5.87,
    "stability": 0.5,
    "stability_pct": 50.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 66.71,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 83.38,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=55.6)",
      "Adaptive CLAHE (clip_limit=1.8)"
    ],
    "components": {
      "quality_component": 90.52,
      "quality_gain_component": 64.67,
      "stability_component": 50.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-089_jpg.rf.25aeec35e548e0c50a144727965d29bd.jpg",
    "image": "Image-089_jpg.rf.25aeec35e548e0c50a144727965d29bd.jpg",
    "shortName": "Image-089_jpg",
    "quality_before": 81.53,
    "quality_after": 85.1,
    "quality_gain": 3.57,
    "stability": 0.977,
    "stability_pct": 97.7,
    "defects": 7,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 73.21,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 34.29,
    "condition": "CRITICAL",
    "risk_level": "HIGH",
    "recommendation": "PRIORITIZE DETAILED INSPECTION",
    "priority": "HIGH",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 85.1,
      "quality_gain_component": 58.92,
      "stability_component": 97.7,
      "confidence_component": 41.7,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-090_jpg.rf.bb6e588adfe90c58d06575c79a1a4367.jpg",
    "image": "Image-090_jpg.rf.bb6e588adfe90c58d06575c79a1a4367.jpg",
    "shortName": "Image-090_jpg",
    "quality_before": 85.42,
    "quality_after": 89.82,
    "quality_gain": 4.4,
    "stability": 0.983,
    "stability_pct": 98.3,
    "defects": 1,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 75.7,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 43.26,
    "condition": "POOR",
    "risk_level": "HIGH",
    "recommendation": "PRIORITIZE DETAILED INSPECTION",
    "priority": "HIGH",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 89.82,
      "quality_gain_component": 61.0,
      "stability_component": 98.3,
      "confidence_component": 41.7,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-093_jpg.rf.1971d36cdfb0327078ea5b6c645eacbe.jpg",
    "image": "Image-093_jpg.rf.1971d36cdfb0327078ea5b6c645eacbe.jpg",
    "shortName": "Image-093_jpg",
    "quality_before": 88.59,
    "quality_after": 91.63,
    "quality_gain": 3.04,
    "stability": 0.979,
    "stability_pct": 97.9,
    "defects": 1,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 73.87,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 45.16,
    "condition": "POOR",
    "risk_level": "HIGH",
    "recommendation": "PRIORITIZE DETAILED INSPECTION",
    "priority": "HIGH",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 91.63,
      "quality_gain_component": 57.6,
      "stability_component": 97.9,
      "confidence_component": 41.7,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-094_jpg.rf.73d37c5e0c6edc7ab9ab9ab40bfd16b8.jpg",
    "image": "Image-094_jpg.rf.73d37c5e0c6edc7ab9ab9ab40bfd16b8.jpg",
    "shortName": "Image-094_jpg",
    "quality_before": 89.35,
    "quality_after": 91.8,
    "quality_gain": 2.45,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 78.35,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 87.76,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 91.8,
      "quality_gain_component": 56.13,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-095_jpg.rf.f9c494e2370881f28ed497aed2af96a3.jpg",
    "image": "Image-095_jpg.rf.f9c494e2370881f28ed497aed2af96a3.jpg",
    "shortName": "Image-095_jpg",
    "quality_before": 88.27,
    "quality_after": 90.96,
    "quality_gain": 2.69,
    "stability": 0.968,
    "stability_pct": 96.8,
    "defects": 1,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 76.07,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 41.89,
    "condition": "POOR",
    "risk_level": "HIGH",
    "recommendation": "PRIORITIZE DETAILED INSPECTION",
    "priority": "HIGH",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 90.96,
      "quality_gain_component": 56.72,
      "stability_component": 96.8,
      "confidence_component": 41.7,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-096_jpg.rf.f5be9143109605bec3eef4d6a922cd06.jpg",
    "image": "Image-096_jpg.rf.f5be9143109605bec3eef4d6a922cd06.jpg",
    "shortName": "Image-096_jpg",
    "quality_before": 89.4,
    "quality_after": 90.88,
    "quality_gain": 1.48,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 77.55,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 86.88,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 90.88,
      "quality_gain_component": 53.7,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-098_jpg.rf.8dd7255db145c8bb387bf21b3e79f9bb.jpg",
    "image": "Image-098_jpg.rf.8dd7255db145c8bb387bf21b3e79f9bb.jpg",
    "shortName": "Image-098_jpg",
    "quality_before": 89.99,
    "quality_after": 92.09,
    "quality_gain": 2.1,
    "stability": 0.991,
    "stability_pct": 99.1,
    "defects": 1,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 74.05,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 44.95,
    "condition": "POOR",
    "risk_level": "HIGH",
    "recommendation": "PRIORITIZE DETAILED INSPECTION",
    "priority": "HIGH",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 92.09,
      "quality_gain_component": 55.25,
      "stability_component": 99.1,
      "confidence_component": 41.7,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-100_jpg.rf.6e857b42f689ca541252692576439bea.jpg",
    "image": "Image-100_jpg.rf.6e857b42f689ca541252692576439bea.jpg",
    "shortName": "Image-100_jpg",
    "quality_before": 83.65,
    "quality_after": 86.82,
    "quality_gain": 3.17,
    "stability": 0.975,
    "stability_pct": 97.5,
    "defects": 3,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 73.53,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 38.42,
    "condition": "CRITICAL",
    "risk_level": "HIGH",
    "recommendation": "PRIORITIZE DETAILED INSPECTION",
    "priority": "HIGH",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 86.82,
      "quality_gain_component": 57.92,
      "stability_component": 97.5,
      "confidence_component": 41.7,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-102_jpg.rf.ee63cd0762d49f31972d4618036c4308.jpg",
    "image": "Image-102_jpg.rf.ee63cd0762d49f31972d4618036c4308.jpg",
    "shortName": "Image-102_jpg",
    "quality_before": 84.41,
    "quality_after": 84.42,
    "quality_gain": 0.01,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 54.55,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 75.46,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 84.42,
      "quality_gain_component": 50.03,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-103_jpg.rf.ad0e67e92b986af606f0a21897191f98.jpg",
    "image": "Image-103_jpg.rf.ad0e67e92b986af606f0a21897191f98.jpg",
    "shortName": "Image-103_jpg",
    "quality_before": 86.83,
    "quality_after": 90.44,
    "quality_gain": 3.61,
    "stability": 0.99,
    "stability_pct": 99.0,
    "defects": 1,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 78.68,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 39.84,
    "condition": "CRITICAL",
    "risk_level": "HIGH",
    "recommendation": "PRIORITIZE DETAILED INSPECTION",
    "priority": "HIGH",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 90.44,
      "quality_gain_component": 59.02,
      "stability_component": 99.0,
      "confidence_component": 41.7,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-106_jpg.rf.8c2f8f8a0b9ff478651b713e9abcf63b.jpg",
    "image": "Image-106_jpg.rf.8c2f8f8a0b9ff478651b713e9abcf63b.jpg",
    "shortName": "Image-106_jpg",
    "quality_before": 90.19,
    "quality_after": 92.9,
    "quality_gain": 2.71,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 78.87,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 88.69,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 92.9,
      "quality_gain_component": 56.78,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-107_jpg.rf.f17b3244dc545bf7447bfe48c3fbeb53.jpg",
    "image": "Image-107_jpg.rf.f17b3244dc545bf7447bfe48c3fbeb53.jpg",
    "shortName": "Image-107_jpg",
    "quality_before": 79.24,
    "quality_after": 80.79,
    "quality_gain": 1.55,
    "stability": 0.982,
    "stability_pct": 98.2,
    "defects": 1,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 71.68,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 42.74,
    "condition": "POOR",
    "risk_level": "HIGH",
    "recommendation": "PRIORITIZE DETAILED INSPECTION",
    "priority": "HIGH",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 80.79,
      "quality_gain_component": 53.88,
      "stability_component": 98.2,
      "confidence_component": 41.7,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-110_jpg.rf.a4a08f9e2567268c239f88a92515fd13.jpg",
    "image": "Image-110_jpg.rf.a4a08f9e2567268c239f88a92515fd13.jpg",
    "shortName": "Image-110_jpg",
    "quality_before": 84.55,
    "quality_after": 88.11,
    "quality_gain": 3.56,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 76.83,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 84.73,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 88.11,
      "quality_gain_component": 58.9,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-111_jpg.rf.be4de2852ee98c386cc9a90af9280592.jpg",
    "image": "Image-111_jpg.rf.be4de2852ee98c386cc9a90af9280592.jpg",
    "shortName": "Image-111_jpg",
    "quality_before": 87.55,
    "quality_after": 91.48,
    "quality_gain": 3.93,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 78.98,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 87.73,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 91.48,
      "quality_gain_component": 59.83,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-112_jpg.rf.820818199c8f348d70d49500fa4720d5.jpg",
    "image": "Image-112_jpg.rf.820818199c8f348d70d49500fa4720d5.jpg",
    "shortName": "Image-112_jpg",
    "quality_before": 92.04,
    "quality_after": 93.42,
    "quality_gain": 1.38,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 78.39,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 88.91,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 93.42,
      "quality_gain_component": 53.45,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-115_jpg.rf.517d4a245d6f082744b83b7de7c2297a.jpg",
    "image": "Image-115_jpg.rf.517d4a245d6f082744b83b7de7c2297a.jpg",
    "shortName": "Image-115_jpg",
    "quality_before": 93.92,
    "quality_after": 93.92,
    "quality_gain": 0.0,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 2,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 73.53,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 42.15,
    "condition": "POOR",
    "risk_level": "HIGH",
    "recommendation": "PRIORITIZE DETAILED INSPECTION",
    "priority": "HIGH",
    "calibration_operations": [
      "None (Quality Optimal / Reverted)"
    ],
    "components": {
      "quality_component": 93.92,
      "quality_gain_component": 50.0,
      "stability_component": 100.0,
      "confidence_component": 41.7,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-118_jpg.rf.8cc4ba3aef9c0537e1991e612714fe98.jpg",
    "image": "Image-118_jpg.rf.8cc4ba3aef9c0537e1991e612714fe98.jpg",
    "shortName": "Image-118_jpg",
    "quality_before": 88.12,
    "quality_after": 90.17,
    "quality_gain": 2.05,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 77.58,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 86.39,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 90.17,
      "quality_gain_component": 55.12,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-119_jpg.rf.10c8e1014524efe6aafad89716cbffd4.jpg",
    "image": "Image-119_jpg.rf.10c8e1014524efe6aafad89716cbffd4.jpg",
    "shortName": "Image-119_jpg",
    "quality_before": 87.9,
    "quality_after": 89.37,
    "quality_gain": 1.47,
    "stability": 0.977,
    "stability_pct": 97.7,
    "defects": 1,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 72.37,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 45.05,
    "condition": "POOR",
    "risk_level": "HIGH",
    "recommendation": "PRIORITIZE DETAILED INSPECTION",
    "priority": "HIGH",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 89.37,
      "quality_gain_component": 53.67,
      "stability_component": 97.7,
      "confidence_component": 41.7,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-120_jpg.rf.9b24226ae1d0afd71915ff19b82ffce2.jpg",
    "image": "Image-120_jpg.rf.9b24226ae1d0afd71915ff19b82ffce2.jpg",
    "shortName": "Image-120_jpg",
    "quality_before": 88.48,
    "quality_after": 90.28,
    "quality_gain": 1.8,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 77.5,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 86.45,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 90.28,
      "quality_gain_component": 54.5,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-121_jpg.rf.b0e35abbb22507fa626fa105c2f49b81.jpg",
    "image": "Image-121_jpg.rf.b0e35abbb22507fa626fa105c2f49b81.jpg",
    "shortName": "Image-121_jpg",
    "quality_before": 86.1,
    "quality_after": 89.62,
    "quality_gain": 3.52,
    "stability": 0.948,
    "stability_pct": 94.8,
    "defects": 2,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 72.9,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 47.0,
    "condition": "POOR",
    "risk_level": "HIGH",
    "recommendation": "PRIORITIZE DETAILED INSPECTION",
    "priority": "HIGH",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 89.62,
      "quality_gain_component": 58.8,
      "stability_component": 94.8,
      "confidence_component": 41.7,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-122_jpg.rf.bf9d541e7f9dcc601f1ab7c03948ac4a.jpg",
    "image": "Image-122_jpg.rf.bf9d541e7f9dcc601f1ab7c03948ac4a.jpg",
    "shortName": "Image-122_jpg",
    "quality_before": 84.65,
    "quality_after": 90.52,
    "quality_gain": 5.87,
    "stability": 0.5,
    "stability_pct": 50.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 66.71,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 83.38,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=55.6)",
      "Adaptive CLAHE (clip_limit=1.8)"
    ],
    "components": {
      "quality_component": 90.52,
      "quality_gain_component": 64.67,
      "stability_component": 50.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-123_jpg.rf.c01fe8e1284d58ae21a1139bc333cf9f.jpg",
    "image": "Image-123_jpg.rf.c01fe8e1284d58ae21a1139bc333cf9f.jpg",
    "shortName": "Image-123_jpg",
    "quality_before": 85.55,
    "quality_after": 89.11,
    "quality_gain": 3.56,
    "stability": 0.986,
    "stability_pct": 98.6,
    "defects": 1,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 74.53,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 41.22,
    "condition": "POOR",
    "risk_level": "HIGH",
    "recommendation": "PRIORITIZE DETAILED INSPECTION",
    "priority": "HIGH",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 89.11,
      "quality_gain_component": 58.9,
      "stability_component": 98.6,
      "confidence_component": 41.7,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-127_jpg.rf.0a16c69db7478f1e7dea34523796f41c.jpg",
    "image": "Image-127_jpg.rf.0a16c69db7478f1e7dea34523796f41c.jpg",
    "shortName": "Image-127_jpg",
    "quality_before": 84.28,
    "quality_after": 87.67,
    "quality_gain": 3.39,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 77.38,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 84.58,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 87.67,
      "quality_gain_component": 58.48,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-128_jpg.rf.9796db23540bdf422c3cf06dee2a5707.jpg",
    "image": "Image-128_jpg.rf.9796db23540bdf422c3cf06dee2a5707.jpg",
    "shortName": "Image-128_jpg",
    "quality_before": 86.27,
    "quality_after": 88.6,
    "quality_gain": 2.33,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 77.17,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 85.17,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 88.6,
      "quality_gain_component": 55.82,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-129_jpg.rf.3d573356781872de7d7068b95991bdf0.jpg",
    "image": "Image-129_jpg.rf.3d573356781872de7d7068b95991bdf0.jpg",
    "shortName": "Image-129_jpg",
    "quality_before": 84.68,
    "quality_after": 87.26,
    "quality_gain": 2.58,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 65.43,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 80.71,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 87.26,
      "quality_gain_component": 56.45,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-130_jpg.rf.9401ccdc7893bc5567b93720eeebe7ce.jpg",
    "image": "Image-130_jpg.rf.9401ccdc7893bc5567b93720eeebe7ce.jpg",
    "shortName": "Image-130_jpg",
    "quality_before": 90.73,
    "quality_after": 90.73,
    "quality_gain": 0.0,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 76.76,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 86.54,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "None (Quality Optimal / Reverted)"
    ],
    "components": {
      "quality_component": 90.73,
      "quality_gain_component": 50.0,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-131_jpg.rf.e0e5137090fdce4aa602b8991113a76e.jpg",
    "image": "Image-131_jpg.rf.e0e5137090fdce4aa602b8991113a76e.jpg",
    "shortName": "Image-131_jpg",
    "quality_before": 85.31,
    "quality_after": 86.45,
    "quality_gain": 1.14,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 75.83,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 83.26,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 86.45,
      "quality_gain_component": 52.85,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-132_jpg.rf.dbbc929b9063d869edf1c2f8e52406d3.jpg",
    "image": "Image-132_jpg.rf.dbbc929b9063d869edf1c2f8e52406d3.jpg",
    "shortName": "Image-132_jpg",
    "quality_before": 90.3,
    "quality_after": 90.3,
    "quality_gain": 0.0,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 1,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 71.73,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 45.96,
    "condition": "POOR",
    "risk_level": "HIGH",
    "recommendation": "PRIORITIZE DETAILED INSPECTION",
    "priority": "HIGH",
    "calibration_operations": [
      "None (Quality Optimal / Reverted)"
    ],
    "components": {
      "quality_component": 90.3,
      "quality_gain_component": 50.0,
      "stability_component": 100.0,
      "confidence_component": 41.7,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-133_jpg.rf.2444aab2d07794b709558704dc2145eb.jpg",
    "image": "Image-133_jpg.rf.2444aab2d07794b709558704dc2145eb.jpg",
    "shortName": "Image-133_jpg",
    "quality_before": 75.1,
    "quality_after": 75.1,
    "quality_gain": 0.0,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 51.28,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 67.95,
    "condition": "MODERATE",
    "risk_level": "MEDIUM",
    "recommendation": "SCHEDULE DETAILED INSPECTION",
    "priority": "MEDIUM",
    "calibration_operations": [
      "None (Quality Optimal / Reverted)"
    ],
    "components": {
      "quality_component": 75.1,
      "quality_gain_component": 50.0,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 1.96
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-134_jpg.rf.449588221e0f5a319bda9aca85226741.jpg",
    "image": "Image-134_jpg.rf.449588221e0f5a319bda9aca85226741.jpg",
    "shortName": "Image-134_jpg",
    "quality_before": 77.73,
    "quality_after": 79.54,
    "quality_gain": 1.81,
    "stability": 0.5,
    "stability_pct": 50.0,
    "defects": 1,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 56.32,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 46.34,
    "condition": "POOR",
    "risk_level": "HIGH",
    "recommendation": "PRIORITIZE DETAILED INSPECTION",
    "priority": "HIGH",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 79.54,
      "quality_gain_component": 54.53,
      "stability_component": 50.0,
      "confidence_component": 41.7,
      "degradation_penalty": 0.18
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-135_jpg.rf.1541e80e3cedd047f69380b9b0eb0daa.jpg",
    "image": "Image-135_jpg.rf.1541e80e3cedd047f69380b9b0eb0daa.jpg",
    "shortName": "Image-135_jpg",
    "quality_before": 85.81,
    "quality_after": 89.66,
    "quality_gain": 3.85,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 78.31,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 86.25,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 89.66,
      "quality_gain_component": 59.62,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-137_jpg.rf.c39ef6a6ecac1a9c1b9db6cd4633bb04.jpg",
    "image": "Image-137_jpg.rf.c39ef6a6ecac1a9c1b9db6cd4633bb04.jpg",
    "shortName": "Image-137_jpg",
    "quality_before": 89.34,
    "quality_after": 91.8,
    "quality_gain": 2.46,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 78.36,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 87.77,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 91.8,
      "quality_gain_component": 56.15,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-141_jpg.rf.0ce10daa05aaca2a3e069b069007e4be.jpg",
    "image": "Image-141_jpg.rf.0ce10daa05aaca2a3e069b069007e4be.jpg",
    "shortName": "Image-141_jpg",
    "quality_before": 77.15,
    "quality_after": 79.49,
    "quality_gain": 2.34,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 73.99,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 77.84,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 79.49,
      "quality_gain_component": 55.85,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.2
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-142_jpg.rf.f4b436be1c7041f1cab4cca7cd64c9a6.jpg",
    "image": "Image-142_jpg.rf.f4b436be1c7041f1cab4cca7cd64c9a6.jpg",
    "shortName": "Image-142_jpg",
    "quality_before": 89.99,
    "quality_after": 92.09,
    "quality_gain": 2.1,
    "stability": 0.991,
    "stability_pct": 99.1,
    "defects": 1,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 74.05,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 44.94,
    "condition": "POOR",
    "risk_level": "HIGH",
    "recommendation": "PRIORITIZE DETAILED INSPECTION",
    "priority": "HIGH",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 92.09,
      "quality_gain_component": 55.25,
      "stability_component": 99.1,
      "confidence_component": 41.7,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-144_jpg.rf.112d316fc1e4185ea6480b91d233c838.jpg",
    "image": "Image-144_jpg.rf.112d316fc1e4185ea6480b91d233c838.jpg",
    "shortName": "Image-144_jpg",
    "quality_before": 87.25,
    "quality_after": 90.86,
    "quality_gain": 3.61,
    "stability": 0.5,
    "stability_pct": 50.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 66.11,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 83.44,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 90.86,
      "quality_gain_component": 59.02,
      "stability_component": 50.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-146_jpg.rf.0ac7c681981f347507e318f7ce539427.jpg",
    "image": "Image-146_jpg.rf.0ac7c681981f347507e318f7ce539427.jpg",
    "shortName": "Image-146_jpg",
    "quality_before": 89.7,
    "quality_after": 92.57,
    "quality_gain": 2.87,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 78.83,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 88.45,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 92.57,
      "quality_gain_component": 57.17,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-148_jpg.rf.dc0c38dcc9deb29a36c499df76e83b65.jpg",
    "image": "Image-148_jpg.rf.dc0c38dcc9deb29a36c499df76e83b65.jpg",
    "shortName": "Image-148_jpg",
    "quality_before": 88.38,
    "quality_after": 90.3,
    "quality_gain": 1.92,
    "stability": 0.736,
    "stability_pct": 73.6,
    "defects": 1,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 67.26,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 44.7,
    "condition": "POOR",
    "risk_level": "HIGH",
    "recommendation": "PRIORITIZE DETAILED INSPECTION",
    "priority": "HIGH",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 90.3,
      "quality_gain_component": 54.8,
      "stability_component": 73.6,
      "confidence_component": 41.7,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-149_jpg.rf.717eadac9e861d5fc5e9b578b73b7644.jpg",
    "image": "Image-149_jpg.rf.717eadac9e861d5fc5e9b578b73b7644.jpg",
    "shortName": "Image-149_jpg",
    "quality_before": 81.1,
    "quality_after": 81.1,
    "quality_gain": 0.0,
    "stability": 0.969,
    "stability_pct": 96.9,
    "defects": 1,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 49.85,
    "reliability_status": "LOW",
    "is_trustworthy": false,
    "thi": 43.96,
    "condition": "POOR",
    "risk_level": "HIGH",
    "recommendation": "MANUAL VERIFICATION REQUIRED",
    "priority": "HIGH",
    "calibration_operations": [
      "None (Quality Optimal / Reverted)"
    ],
    "components": {
      "quality_component": 81.1,
      "quality_gain_component": 50.0,
      "stability_component": 96.9,
      "confidence_component": 41.7,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-150_jpg.rf.2e137064940fb7139011fd677717e036.jpg",
    "image": "Image-150_jpg.rf.2e137064940fb7139011fd677717e036.jpg",
    "shortName": "Image-150_jpg",
    "quality_before": 84.09,
    "quality_after": 84.1,
    "quality_gain": 0.01,
    "stability": 0.826,
    "stability_pct": 82.6,
    "defects": 1,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 45.89,
    "reliability_status": "LOW",
    "is_trustworthy": false,
    "thi": 58.93,
    "condition": "POOR",
    "risk_level": "MEDIUM",
    "recommendation": "MANUAL VERIFICATION REQUIRED",
    "priority": "HIGH",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 84.1,
      "quality_gain_component": 50.02,
      "stability_component": 82.6,
      "confidence_component": 41.7,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-151_jpg.rf.67e358abacc341c50643cef2747527b8.jpg",
    "image": "Image-151_jpg.rf.67e358abacc341c50643cef2747527b8.jpg",
    "shortName": "Image-151_jpg",
    "quality_before": 89.78,
    "quality_after": 92.9,
    "quality_gain": 3.12,
    "stability": 0.981,
    "stability_pct": 98.1,
    "defects": 1,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 74.58,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 44.94,
    "condition": "POOR",
    "risk_level": "HIGH",
    "recommendation": "PRIORITIZE DETAILED INSPECTION",
    "priority": "HIGH",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 92.9,
      "quality_gain_component": 57.8,
      "stability_component": 98.1,
      "confidence_component": 41.7,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-152_jpg.rf.08cab1aa72a10b7510ef5417b7af51d7.jpg",
    "image": "Image-152_jpg.rf.08cab1aa72a10b7510ef5417b7af51d7.jpg",
    "shortName": "Image-152_jpg",
    "quality_before": 92.75,
    "quality_after": 92.75,
    "quality_gain": 0.0,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 1,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 75.46,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 42.65,
    "condition": "POOR",
    "risk_level": "HIGH",
    "recommendation": "PRIORITIZE DETAILED INSPECTION",
    "priority": "HIGH",
    "calibration_operations": [
      "None (Quality Optimal / Reverted)"
    ],
    "components": {
      "quality_component": 92.75,
      "quality_gain_component": 50.0,
      "stability_component": 100.0,
      "confidence_component": 41.7,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-153_jpg.rf.90b7b46219c7a2d45612b917c0a21f46.jpg",
    "image": "Image-153_jpg.rf.90b7b46219c7a2d45612b917c0a21f46.jpg",
    "shortName": "Image-153_jpg",
    "quality_before": 82.87,
    "quality_after": 84.9,
    "quality_gain": 2.03,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 62.87,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 78.29,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 84.9,
      "quality_gain_component": 55.08,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-154_jpg.rf.de5f7f7d7e4b3a86fc6f9d789d34aa00.jpg",
    "image": "Image-154_jpg.rf.de5f7f7d7e4b3a86fc6f9d789d34aa00.jpg",
    "shortName": "Image-154_jpg",
    "quality_before": 88.06,
    "quality_after": 90.79,
    "quality_gain": 2.73,
    "stability": 0.99,
    "stability_pct": 99.0,
    "defects": 1,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 73.92,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 44.91,
    "condition": "POOR",
    "risk_level": "HIGH",
    "recommendation": "PRIORITIZE DETAILED INSPECTION",
    "priority": "HIGH",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 90.79,
      "quality_gain_component": 56.83,
      "stability_component": 99.0,
      "confidence_component": 41.7,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-155_jpg.rf.7c34f7f02c4748bd3e1d33ac6ec5fd7a.jpg",
    "image": "Image-155_jpg.rf.7c34f7f02c4748bd3e1d33ac6ec5fd7a.jpg",
    "shortName": "Image-155_jpg",
    "quality_before": 92.59,
    "quality_after": 95.03,
    "quality_gain": 2.44,
    "stability": 0.928,
    "stability_pct": 92.8,
    "defects": 1,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 74.79,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 43.62,
    "condition": "POOR",
    "risk_level": "HIGH",
    "recommendation": "PRIORITIZE DETAILED INSPECTION",
    "priority": "HIGH",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 95.03,
      "quality_gain_component": 56.1,
      "stability_component": 92.8,
      "confidence_component": 41.7,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-156_jpg.rf.4079322e620823f388f2bf90f7f2ccc6.jpg",
    "image": "Image-156_jpg.rf.4079322e620823f388f2bf90f7f2ccc6.jpg",
    "shortName": "Image-156_jpg",
    "quality_before": 84.15,
    "quality_after": 88.53,
    "quality_gain": 4.38,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 77.34,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 85.17,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 88.53,
      "quality_gain_component": 60.95,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-157_jpg.rf.233d530ba6023b914b293ca58d78a53a.jpg",
    "image": "Image-157_jpg.rf.233d530ba6023b914b293ca58d78a53a.jpg",
    "shortName": "Image-157_jpg",
    "quality_before": 87.99,
    "quality_after": 92.21,
    "quality_gain": 4.22,
    "stability": 0.965,
    "stability_pct": 96.5,
    "defects": 1,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 73.8,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 55.13,
    "condition": "POOR",
    "risk_level": "MEDIUM",
    "recommendation": "SCHEDULE DETAILED INSPECTION",
    "priority": "MEDIUM",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 92.21,
      "quality_gain_component": 60.55,
      "stability_component": 96.5,
      "confidence_component": 41.7,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-158_jpg.rf.4713e0d44eccda38894e5b5a925b98ce.jpg",
    "image": "Image-158_jpg.rf.4713e0d44eccda38894e5b5a925b98ce.jpg",
    "shortName": "Image-158_jpg",
    "quality_before": 68.09,
    "quality_after": 76.25,
    "quality_gain": 8.16,
    "stability": 0.998,
    "stability_pct": 99.8,
    "defects": 1,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 72.59,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 44.17,
    "condition": "POOR",
    "risk_level": "HIGH",
    "recommendation": "PRIORITIZE DETAILED INSPECTION",
    "priority": "HIGH",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=55.6)",
      "Adaptive CLAHE (clip_limit=1.8)"
    ],
    "components": {
      "quality_component": 76.25,
      "quality_gain_component": 70.4,
      "stability_component": 99.8,
      "confidence_component": 41.7,
      "degradation_penalty": 1.5
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-159_jpg.rf.6ea7657042c5a0ae39f3d1ef6f3cb26e.jpg",
    "image": "Image-159_jpg.rf.6ea7657042c5a0ae39f3d1ef6f3cb26e.jpg",
    "shortName": "Image-159_jpg",
    "quality_before": 89.81,
    "quality_after": 92.84,
    "quality_gain": 3.03,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 79.01,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 88.69,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 92.84,
      "quality_gain_component": 57.58,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-160_jpg.rf.d319ef13e4339400b1342473e9f910b2.jpg",
    "image": "Image-160_jpg.rf.d319ef13e4339400b1342473e9f910b2.jpg",
    "shortName": "Image-160_jpg",
    "quality_before": 88.76,
    "quality_after": 92.62,
    "quality_gain": 3.86,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 79.35,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 88.64,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 92.62,
      "quality_gain_component": 59.65,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-161_jpg.rf.ec10cd4f40b2bbabb4164c51ac847667.jpg",
    "image": "Image-161_jpg.rf.ec10cd4f40b2bbabb4164c51ac847667.jpg",
    "shortName": "Image-161_jpg",
    "quality_before": 86.42,
    "quality_after": 90.81,
    "quality_gain": 4.39,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 78.98,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 87.26,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 90.81,
      "quality_gain_component": 60.98,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-162_jpg.rf.76b53800bbae2163d9b51a7eb51c13c5.jpg",
    "image": "Image-162_jpg.rf.76b53800bbae2163d9b51a7eb51c13c5.jpg",
    "shortName": "Image-162_jpg",
    "quality_before": 84.13,
    "quality_after": 87.39,
    "quality_gain": 3.26,
    "stability": 0.971,
    "stability_pct": 97.1,
    "defects": 1,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 73.24,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 44.16,
    "condition": "POOR",
    "risk_level": "HIGH",
    "recommendation": "PRIORITIZE DETAILED INSPECTION",
    "priority": "HIGH",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 87.39,
      "quality_gain_component": 58.15,
      "stability_component": 97.1,
      "confidence_component": 41.7,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-163_jpg.rf.a90813943011a6736f7971352510b296.jpg",
    "image": "Image-163_jpg.rf.a90813943011a6736f7971352510b296.jpg",
    "shortName": "Image-163_jpg",
    "quality_before": 84.08,
    "quality_after": 84.09,
    "quality_gain": 0.01,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 54.44,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 75.19,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 84.09,
      "quality_gain_component": 50.03,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-164_jpg.rf.a2f6c13702af953fda3ce57098fc763a.jpg",
    "image": "Image-164_jpg.rf.a2f6c13702af953fda3ce57098fc763a.jpg",
    "shortName": "Image-164_jpg",
    "quality_before": 88.98,
    "quality_after": 90.84,
    "quality_gain": 1.86,
    "stability": 0.862,
    "stability_pct": 86.2,
    "defects": 1,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 69.83,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 45.5,
    "condition": "POOR",
    "risk_level": "HIGH",
    "recommendation": "PRIORITIZE DETAILED INSPECTION",
    "priority": "HIGH",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 90.84,
      "quality_gain_component": 54.65,
      "stability_component": 86.2,
      "confidence_component": 41.7,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-165_jpg.rf.c8a5c2af98ccf8da48d0c6cd73da87e1.jpg",
    "image": "Image-165_jpg.rf.c8a5c2af98ccf8da48d0c6cd73da87e1.jpg",
    "shortName": "Image-165_jpg",
    "quality_before": 84.96,
    "quality_after": 87.72,
    "quality_gain": 2.76,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 76.17,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 84.25,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 87.72,
      "quality_gain_component": 56.9,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-166_jpg.rf.e9ed2cfe420808c411267cb54c3894fe.jpg",
    "image": "Image-166_jpg.rf.e9ed2cfe420808c411267cb54c3894fe.jpg",
    "shortName": "Image-166_jpg",
    "quality_before": 60.15,
    "quality_after": 88.34,
    "quality_gain": 28.19,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 85.92,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 87.61,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=7, sigma=80.0)",
      "Adaptive Contrast Enhancement (CLAHE)",
      "Adaptive Brightness Correction"
    ],
    "components": {
      "quality_component": 88.34,
      "quality_gain_component": 100.0,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-167_jpg.rf.0cb84c1094399851d103f28354c6a21a.jpg",
    "image": "Image-167_jpg.rf.0cb84c1094399851d103f28354c6a21a.jpg",
    "shortName": "Image-167_jpg",
    "quality_before": 84.45,
    "quality_after": 87.37,
    "quality_gain": 2.92,
    "stability": 0.911,
    "stability_pct": 91.1,
    "defects": 2,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 70.73,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 42.74,
    "condition": "POOR",
    "risk_level": "HIGH",
    "recommendation": "PRIORITIZE DETAILED INSPECTION",
    "priority": "HIGH",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 87.37,
      "quality_gain_component": 57.3,
      "stability_component": 91.1,
      "confidence_component": 41.7,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-168_jpg.rf.352fed6f4ddd5539b267be8a1d22f499.jpg",
    "image": "Image-168_jpg.rf.352fed6f4ddd5539b267be8a1d22f499.jpg",
    "shortName": "Image-168_jpg",
    "quality_before": 90.96,
    "quality_after": 93.59,
    "quality_gain": 2.63,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 79.07,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 89.23,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 93.59,
      "quality_gain_component": 56.58,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-169_jpg.rf.ec8fac707f191181d1a272fe3cb42027.jpg",
    "image": "Image-169_jpg.rf.ec8fac707f191181d1a272fe3cb42027.jpg",
    "shortName": "Image-169_jpg",
    "quality_before": 86.06,
    "quality_after": 87.96,
    "quality_gain": 1.9,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 76.74,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 84.59,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 87.96,
      "quality_gain_component": 54.75,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-170_jpg.rf.37992a0e495fc8f89c9e6f95705adf1b.jpg",
    "image": "Image-170_jpg.rf.37992a0e495fc8f89c9e6f95705adf1b.jpg",
    "shortName": "Image-170_jpg",
    "quality_before": 90.02,
    "quality_after": 93.07,
    "quality_gain": 3.05,
    "stability": 0.969,
    "stability_pct": 96.9,
    "defects": 1,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 73.69,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 45.63,
    "condition": "POOR",
    "risk_level": "HIGH",
    "recommendation": "PRIORITIZE DETAILED INSPECTION",
    "priority": "HIGH",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 93.07,
      "quality_gain_component": 57.62,
      "stability_component": 96.9,
      "confidence_component": 41.7,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-171_jpg.rf.5b600bdedfec666ad082d23e4f785dc5.jpg",
    "image": "Image-171_jpg.rf.5b600bdedfec666ad082d23e4f785dc5.jpg",
    "shortName": "Image-171_jpg",
    "quality_before": 84.09,
    "quality_after": 86.73,
    "quality_gain": 2.64,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 76.68,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 83.72,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 86.73,
      "quality_gain_component": 56.6,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-172_jpg.rf.72efdc11ae2042bd3088927069fae7b0.jpg",
    "image": "Image-172_jpg.rf.72efdc11ae2042bd3088927069fae7b0.jpg",
    "shortName": "Image-172_jpg",
    "quality_before": 89.07,
    "quality_after": 90.84,
    "quality_gain": 1.77,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 77.68,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 86.89,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 90.84,
      "quality_gain_component": 54.43,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-173_jpg.rf.aa7fb9eadd6fe5ac3250b0a40c3b5fa5.jpg",
    "image": "Image-173_jpg.rf.aa7fb9eadd6fe5ac3250b0a40c3b5fa5.jpg",
    "shortName": "Image-173_jpg",
    "quality_before": 83.44,
    "quality_after": 84.52,
    "quality_gain": 1.08,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 58.71,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 76.78,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 84.52,
      "quality_gain_component": 52.7,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-174_jpg.rf.9ad9ca57cc1f7bba6766d5f01066f74c.jpg",
    "image": "Image-174_jpg.rf.9ad9ca57cc1f7bba6766d5f01066f74c.jpg",
    "shortName": "Image-174_jpg",
    "quality_before": 83.12,
    "quality_after": 87.39,
    "quality_gain": 4.27,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 71.99,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 82.77,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 87.39,
      "quality_gain_component": 60.67,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-175_jpg.rf.8985f80264175c92611302717876cebd.jpg",
    "image": "Image-175_jpg.rf.8985f80264175c92611302717876cebd.jpg",
    "shortName": "Image-175_jpg",
    "quality_before": 86.61,
    "quality_after": 90.59,
    "quality_gain": 3.98,
    "stability": 0.844,
    "stability_pct": 84.4,
    "defects": 1,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 72.27,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 43.31,
    "condition": "POOR",
    "risk_level": "HIGH",
    "recommendation": "PRIORITIZE DETAILED INSPECTION",
    "priority": "HIGH",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 90.59,
      "quality_gain_component": 59.95,
      "stability_component": 84.4,
      "confidence_component": 41.7,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-176_jpg.rf.aa0e51b09ee00b4f78c38328ea94e7d2.jpg",
    "image": "Image-176_jpg.rf.aa0e51b09ee00b4f78c38328ea94e7d2.jpg",
    "shortName": "Image-176_jpg",
    "quality_before": 85.95,
    "quality_after": 90.7,
    "quality_gain": 4.75,
    "stability": 0.974,
    "stability_pct": 97.4,
    "defects": 1,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 75.68,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 47.96,
    "condition": "POOR",
    "risk_level": "HIGH",
    "recommendation": "PRIORITIZE DETAILED INSPECTION",
    "priority": "HIGH",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 90.7,
      "quality_gain_component": 61.88,
      "stability_component": 97.4,
      "confidence_component": 41.7,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-178_jpg.rf.bf558a19b0a60cc098ec80df533c3651.jpg",
    "image": "Image-178_jpg.rf.bf558a19b0a60cc098ec80df533c3651.jpg",
    "shortName": "Image-178_jpg",
    "quality_before": 81.37,
    "quality_after": 84.13,
    "quality_gain": 2.76,
    "stability": 0.996,
    "stability_pct": 99.6,
    "defects": 1,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 71.22,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 40.3,
    "condition": "POOR",
    "risk_level": "HIGH",
    "recommendation": "PRIORITIZE DETAILED INSPECTION",
    "priority": "HIGH",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 84.13,
      "quality_gain_component": 56.9,
      "stability_component": 99.6,
      "confidence_component": 41.7,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-180_jpg.rf.b5a2281308d5b4353035e28742735c5f.jpg",
    "image": "Image-180_jpg.rf.b5a2281308d5b4353035e28742735c5f.jpg",
    "shortName": "Image-180_jpg",
    "quality_before": 90.8,
    "quality_after": 93.51,
    "quality_gain": 2.71,
    "stability": 0.985,
    "stability_pct": 98.5,
    "defects": 1,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 77.04,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 42.24,
    "condition": "POOR",
    "risk_level": "HIGH",
    "recommendation": "PRIORITIZE DETAILED INSPECTION",
    "priority": "HIGH",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 93.51,
      "quality_gain_component": 56.78,
      "stability_component": 98.5,
      "confidence_component": 41.7,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/Image-180_jpg.rf.b5a2281308d5b4353035e28742735c5f.jpg",
      "calibrated": "/outputs/calibrated_image.jpg",
      "annotated": "/outputs/final_inspection_result.jpg"
    }
  },
  {
    "id": "Image-181_jpg.rf.985b79635981d306c10668d44e13a91f.jpg",
    "image": "Image-181_jpg.rf.985b79635981d306c10668d44e13a91f.jpg",
    "shortName": "Image-181_jpg",
    "quality_before": 85.02,
    "quality_after": 88.18,
    "quality_gain": 3.16,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 77.44,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 84.96,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 88.18,
      "quality_gain_component": 57.9,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/Image-181_jpg.rf.985b79635981d306c10668d44e13a91f.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-182_jpg.rf.9219c4cfa610f56286d7cd7c8cec21dc.jpg",
    "image": "Image-182_jpg.rf.9219c4cfa610f56286d7cd7c8cec21dc.jpg",
    "shortName": "Image-182_jpg",
    "quality_before": 86.02,
    "quality_after": 90.3,
    "quality_gain": 4.28,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 78.75,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 86.83,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 90.3,
      "quality_gain_component": 60.7,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-183_jpg.rf.3eb4aef08e78747412a0f028b89937e9.jpg",
    "image": "Image-183_jpg.rf.3eb4aef08e78747412a0f028b89937e9.jpg",
    "shortName": "Image-183_jpg",
    "quality_before": 84.31,
    "quality_after": 91.14,
    "quality_gain": 6.83,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 80.31,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 87.89,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=55.6)",
      "Adaptive CLAHE (clip_limit=1.8)"
    ],
    "components": {
      "quality_component": 91.14,
      "quality_gain_component": 67.07,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-188_jpg.rf.809496cbcd8cc2f72dd2b871a4030717.jpg",
    "image": "Image-188_jpg.rf.809496cbcd8cc2f72dd2b871a4030717.jpg",
    "shortName": "Image-188_jpg",
    "quality_before": 88.94,
    "quality_after": 91.95,
    "quality_gain": 3.01,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 78.69,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 87.97,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 91.95,
      "quality_gain_component": 57.53,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-217_jpg.rf.de339840af30abe128d151551182d8a5.jpg",
    "image": "Image-217_jpg.rf.de339840af30abe128d151551182d8a5.jpg",
    "shortName": "Image-217_jpg",
    "quality_before": 86.15,
    "quality_after": 90.51,
    "quality_gain": 4.36,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 78.86,
    "reliability_status": "HIGH",
    "is_trustworthy": true,
    "thi": 87.02,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 90.51,
      "quality_gain_component": 60.9,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-219_jpg.rf.67575a1ab3eaaf3bfc1daaf3644e21ba.jpg",
    "image": "Image-219_jpg.rf.67575a1ab3eaaf3bfc1daaf3644e21ba.jpg",
    "shortName": "Image-219_jpg",
    "quality_before": 78.49,
    "quality_after": 80.79,
    "quality_gain": 2.3,
    "stability": 1.0,
    "stability_pct": 100.0,
    "defects": 0,
    "defect_type": "None",
    "confidence": 0.0,
    "reliability": 74.43,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 78.88,
    "condition": "GOOD",
    "risk_level": "LOW",
    "recommendation": "CONTINUE ROUTINE MONITORING",
    "priority": "LOW",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 80.79,
      "quality_gain_component": 55.75,
      "stability_component": 100.0,
      "confidence_component": 50.0,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/test_01_original.jpg",
      "calibrated": "/outputs/test_01_calibrated.jpg",
      "annotated": "/outputs/test_01_calibrated.jpg"
    }
  },
  {
    "id": "Image-226_jpg.rf.4a79ffcd69aeac5744258b58f6270d89.jpg",
    "image": "Image-226_jpg.rf.4a79ffcd69aeac5744258b58f6270d89.jpg",
    "shortName": "Image-226_jpg",
    "quality_before": 82.85,
    "quality_after": 83.9,
    "quality_gain": 1.05,
    "stability": 0.974,
    "stability_pct": 97.4,
    "defects": 2,
    "defect_type": "railway-gap",
    "confidence": 0.417,
    "reliability": 56.13,
    "reliability_status": "MODERATE",
    "is_trustworthy": true,
    "thi": 51.43,
    "condition": "POOR",
    "risk_level": "MEDIUM",
    "recommendation": "SCHEDULE DETAILED INSPECTION",
    "priority": "MEDIUM",
    "calibration_operations": [
      "Adaptive Denoising (d=5, sigma=42.0)"
    ],
    "components": {
      "quality_component": 83.9,
      "quality_gain_component": 52.63,
      "stability_component": 97.4,
      "confidence_component": 41.7,
      "degradation_penalty": 0.0
    },
    "image_urls": {
      "original": "/outputs/Image-226_jpg.rf.4a79ffcd69aeac5744258b58f6270d89.jpg",
      "calibrated": "/outputs/calibrated_image.jpg",
      "annotated": "/outputs/final_inspection_result.jpg"
    }
  }
];
