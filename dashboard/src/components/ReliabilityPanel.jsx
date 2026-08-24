import React from 'react';
import Tooltip from './Tooltip';
import { getReliabilityScore, getReliabilityStatus, getQualityAfter, getQualityGain, getDefectCount, getConfidence } from '../utils/formatters';

function HorizontalBar({ label, value, color = "cyan" }) {
  const clampedVal = Math.min(100, Math.max(0, value));
  return (
    <div className="compact-bar-row">
      <span className="bar-label">{label}</span>
      <div className="bar-track">
        <div 
          className={`bar-fill bar-${color}`}
          style={{ width: `${clampedVal}%` }}
        ></div>
      </div>
      <span className="bar-num font-mono">{clampedVal.toFixed(0)}</span>
    </div>
  );
}

export default function ReliabilityPanel({ data }) {
  if (!data) return null;

  const relNum = getReliabilityScore(data);
  const reliabilityScore = relNum.toFixed(2);
  const statusText = getReliabilityStatus(data);

  const qAfter = getQualityAfter(data);
  const qGain = getQualityGain(data);
  const defects = getDefectCount(data);
  const conf = getConfidence(data);

  const comps = data.components || {
    quality_component: qAfter || 80,
    quality_gain_component: Math.min(100, Math.max(0, 50 + qGain * 4)),
    stability_component: data.stability_pct ?? 90,
    confidence_component: defects > 0 ? conf * 100 : 80,
    degradation_penalty: 0
  };

  const trustTagColor = relNum >= 75 ? 'badge-good' : relNum >= 50 ? 'badge-warning' : 'badge-critical';

  return (
    <div className="panel visual-reliability-panel">
      <div className="panel-micro-title flex-between">
        <span className="flex-center-gap">
          INSPECTION RELIABILITY
          <Tooltip text="Measures trustworthiness of inspection results based on frame quality, calibration stability, detection confidence, and penalties." />
        </span>
        <div className={`rel-status-badge ${trustTagColor}`}>
          {statusText.includes('TRUST') ? statusText : `${statusText} TRUST`}
        </div>
      </div>

      <div className="reliability-main-score-card">
        <div className="rel-score-large-wrap">
          <span className="rel-score-num text-white font-mono">{reliabilityScore}</span>
          <span className="rel-score-denom font-mono">/ 100</span>
        </div>
        <div className="rel-progress-bar-large">
          <div 
            className={`rel-progress-fill ${relNum >= 75 ? 'bg-emerald' : relNum >= 50 ? 'bg-amber' : 'bg-ruby'}`}
            style={{ width: `${Math.min(100, Math.max(0, relNum))}%` }}
          ></div>
        </div>
      </div>

      <div className="compact-breakdown-list">
        <HorizontalBar label="QUALITY" value={comps.quality_component ?? 0} color="cyan" />
        <HorizontalBar label="GAIN" value={comps.quality_gain_component ?? 0} color="blue" />
        <HorizontalBar label="STABILITY" value={comps.stability_component ?? 0} color="emerald" />
        <HorizontalBar label="CONFIDENCE" value={comps.confidence_component ?? 0} color="purple" />
        <HorizontalBar label="PENALTY" value={comps.degradation_penalty ?? 0} color="ruby" />
      </div>
    </div>
  );
}

