import React from 'react';
import { Gauge, ShieldCheck, Activity, AlertTriangle, TrendingUp } from 'lucide-react';

function MetricCard({ icon: Icon, title, value, badgeText, badgeColor, subtext, highlight }) {
  return (
    <div className={`metric-card ${highlight ? 'highlight-border' : ''}`}>
      <div className="metric-header">
        <div className="metric-icon-wrap">
          <Icon size={20} />
        </div>
        {badgeText && (
          <span className={`metric-badge badge-${badgeColor || 'neutral'}`}>
            {badgeText}
          </span>
        )}
      </div>

      <div className="metric-body">
        <span className="metric-title">{title}</span>
        <div className="metric-value">{value}</div>
        {subtext && <div className="metric-subtext">{subtext}</div>}
      </div>
    </div>
  );
}

export default function MetricCards({ data }) {
  if (!data) return null;

  const thiColor = data.condition === 'CRITICAL' ? 'red' : 
                   data.condition === 'POOR' ? 'amber' : 
                   data.condition === 'GOOD' ? 'green' : 'blue';

  const relColor = data.reliability >= 75 ? 'cyan' : data.reliability >= 50 ? 'amber' : 'red';
  const defectColor = data.defects > 0 ? 'red' : 'green';

  return (
    <section className="metrics-grid">
      <MetricCard
        icon={Gauge}
        title="TRACK HEALTH INDEX"
        value={`${data.thi.toFixed(2)} / 100`}
        badgeText={data.condition}
        badgeColor={thiColor}
        subtext={`Risk Level: ${data.risk_level}`}
        highlight={true}
      />

      <MetricCard
        icon={ShieldCheck}
        title="INSPECTION RELIABILITY"
        value={`${data.reliability.toFixed(2)} / 100`}
        badgeText={data.reliability_status}
        badgeColor={relColor}
        subtext={data.is_trustworthy ? "● Trustworthy Assessment" : "▲ Review Required"}
      />

      <MetricCard
        icon={Activity}
        title="IMAGE QUALITY"
        value={`${data.quality_before.toFixed(2)} → ${data.quality_after.toFixed(2)}`}
        badgeText={data.quality_gain > 0 ? `+${data.quality_gain.toFixed(2)}` : "Optimal"}
        badgeColor={data.quality_gain > 0 ? "cyan" : "neutral"}
        subtext={data.quality_gain > 0 ? `+${data.quality_gain.toFixed(2)} quality improvement` : "No calibration needed"}
      />

      <MetricCard
        icon={AlertTriangle}
        title="DEFECTS DETECTED"
        value={data.defects}
        badgeText={data.defects > 0 ? data.defect_type.toUpperCase() : "NO DEFECTS"}
        badgeColor={defectColor}
        subtext={data.defects > 0 ? `Confidence: ${(data.confidence * 100).toFixed(1)}%` : "Track surface clear"}
      />
    </section>
  );
}
