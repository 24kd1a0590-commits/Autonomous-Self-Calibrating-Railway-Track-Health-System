import React from 'react';
import { Settings2, AlertTriangle, ShieldCheck, Wrench, ArrowRight } from 'lucide-react';

export default function DecisionSupportPanel({ data }) {
  if (!data) return null;

  const isHighRisk = data.risk_level === 'HIGH' || data.risk_level === 'CRITICAL';

  return (
    <div className={`panel decision-panel ${isHighRisk ? 'border-ruby-glow' : 'border-emerald-glow'}`}>
      <div className="panel-header">
        <div>
          <span className="panel-label">AUTOMATED DECISION SUPPORT ENGINE</span>
          <h3>MAINTENANCE RECOMMENDATION</h3>
        </div>
        <div className={`status-pill ${isHighRisk ? 'ruby' : 'emerald'}`}>
          <Wrench size={14} /> ACTION REQUIRED
        </div>
      </div>

      <div className="decision-banner">
        <div className="decision-icon-wrap">
          {isHighRisk ? (
            <AlertTriangle size={28} className="text-ruby" />
          ) : (
            <ShieldCheck size={28} className="text-emerald" />
          )}
        </div>

        <div className="decision-text-content">
          <span className="recommendation-eyebrow">ACTIONABLE RECOMMENDATION</span>
          <h2 className="recommendation-heading">{data.recommendation}</h2>
          <p className="recommendation-reason">
            <strong>Reasoning:</strong> {data.reason || "The estimated track condition indicates elevated risk and requires engineering assessment."}
          </p>
        </div>
      </div>

      <div className="decision-grid-summary">
        <div className="summary-card">
          <span className="card-label">RISK LEVEL</span>
          <strong className={`card-val ${isHighRisk ? 'text-ruby' : 'text-emerald'}`}>
            {data.risk_level}
          </strong>
        </div>

        <div className="summary-card">
          <span className="card-label">MAINTENANCE PRIORITY</span>
          <strong className={`card-val ${isHighRisk ? 'text-amber' : 'text-blue'}`}>
            {data.priority}
          </strong>
        </div>

        <div className="summary-card">
          <span className="card-label">INSPECTION TRUST</span>
          <strong className={data.is_trustworthy ? "text-emerald" : "text-amber"}>
            {data.is_trustworthy ? "VERIFIED RELIABLE" : "UNTRUSTWORTHY"}
          </strong>
        </div>
      </div>
    </div>
  );
}
