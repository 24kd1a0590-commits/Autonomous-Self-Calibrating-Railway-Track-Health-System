import React from 'react';

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

  const reliabilityScore = Math.round(data.reliability ?? 0);
  const statusText = (data.reliability_status || (reliabilityScore >= 75 ? 'HIGH TRUST' : reliabilityScore >= 50 ? 'MODERATE' : 'LOW TRUST')).toUpperCase();

  const comps = data.components || {
    quality_component: data.quality_after ?? 80,
    quality_gain_component: Math.min(100, Math.max(0, 50 + (data.quality_gain ?? 0) * 4)),
    stability_component: data.stability_pct ?? 90,
    confidence_component: data.defects > 0 ? (data.confidence ?? 0.85) * 100 : 80,
    degradation_penalty: 0
  };

  const trustTagColor = reliabilityScore >= 75 ? 'badge-good' : reliabilityScore >= 50 ? 'badge-warning' : 'badge-critical';

  return (
    <div className="panel visual-reliability-panel">
      <div className="panel-micro-title">INSPECTION RELIABILITY</div>

      <div className="reliability-score-header">
        <div className="rel-score-large-wrap">
          <span className="rel-score-num text-white">{reliabilityScore}</span>
          <span className="rel-score-denom">/ 100</span>
        </div>
        <div className={`rel-status-badge ${trustTagColor}`}>
          {statusText.includes('TRUST') ? statusText : `${statusText} TRUST`}
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

