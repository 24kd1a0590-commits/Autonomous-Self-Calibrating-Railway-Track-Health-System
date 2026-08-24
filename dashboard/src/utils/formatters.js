/**
 * Safe numeric extractor helper for railway inspection state properties.
 * Handles numbers, numeric strings, and nested backend object response shapes.
 */

export function getNumber(val, fallback = 0) {
  if (val === null || val === undefined) return fallback;
  if (typeof val === 'number') return isNaN(val) ? fallback : val;
  if (typeof val === 'string') {
    const parsed = parseFloat(val);
    return isNaN(parsed) ? fallback : parsed;
  }
  if (typeof val === 'object') {
    if (val.score !== undefined) return getNumber(val.score, fallback);
    if (val.defect_count !== undefined) return getNumber(val.defect_count, fallback);
    if (val.confidence !== undefined) return getNumber(val.confidence, fallback);
    if (val.value !== undefined) return getNumber(val.value, fallback);
  }
  return fallback;
}

export function formatFixed(val, digits = 2, fallback = 0) {
  const num = getNumber(val, fallback);
  return num.toFixed(digits);
}

export function getReliabilityScore(data) {
  if (!data) return 0;
  if (typeof data.reliability === 'object' && data.reliability !== null) {
    return getNumber(data.reliability.score, 0);
  }
  return getNumber(data.reliability, 0);
}

export function getReliabilityStatus(data) {
  if (!data) return 'UNKNOWN';
  if (typeof data.reliability === 'object' && data.reliability?.status) {
    return String(data.reliability.status).toUpperCase();
  }
  if (data.reliability_status) {
    return String(data.reliability_status).toUpperCase();
  }
  const score = getReliabilityScore(data);
  return score >= 75 ? 'HIGH TRUST' : score >= 50 ? 'MODERATE TRUST' : 'LOW TRUST';
}

export function getQualityBefore(data) {
  if (!data) return 0;
  return getNumber(data.quality_before ?? data.image_quality?.score_before, 0);
}

export function getQualityAfter(data) {
  if (!data) return 0;
  return getNumber(data.quality_after ?? data.image_quality?.score, 0);
}

export function getQualityGain(data) {
  if (!data) return 0;
  return getNumber(data.quality_gain ?? data.image_quality?.gain, 0);
}

export function getDefectCount(data) {
  if (!data) return 0;
  return getNumber(data.defects ?? data.detection?.defect_count, 0);
}

export function getConfidence(data) {
  if (!data) return 0;
  return getNumber(data.confidence ?? data.reliability?.confidence, 0);
}

export function getTHI(data) {
  if (!data) return 0;
  return getNumber(data.thi, 0);
}
