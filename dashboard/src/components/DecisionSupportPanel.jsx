import React from 'react';
import Tooltip from './Tooltip';

export default function DecisionSupportPanel({ data }) {
  if (!data) return null;

  const condition = (data.condition || 'POOR').toUpperCase();
  const risk = (data.risk_level || 'HIGH').toUpperCase();
  const priority = (data.priority || (risk === 'HIGH' ? 'HIGH' : 'LOW')).toUpperCase();
  const action = (data.recommendation || 'PRIORITIZE DETAILED INSPECTION').toUpperCase();

  const condColorClass = condition === 'GOOD' || condition === 'EXCELLENT' ? 'text-emerald' : condition === 'FAIR' || condition === 'MODERATE' ? 'text-cyan' : condition === 'POOR' ? 'text-amber' : 'text-ruby';
  const riskColorClass = risk === 'LOW' ? 'badge-good' : risk === 'MEDIUM' ? 'badge-warning' : 'badge-critical';
  const priorityBadgeClass = priority === 'HIGH' || priority === 'CRITICAL' ? 'badge-critical' : 'badge-good';

  return (
    <div className="panel visual-decision-panel">
      <div className="panel-micro-title flex-between">
        <span className="flex-center-gap">
          DECISION SUPPORT
          <Tooltip text="Automated maintenance action recommendation generated from THI condition score, defect severity, and inspection reliability." />
        </span>
        <span className={`decision-priority-tag ${priorityBadgeClass}`}>
          {priority} PRIORITY
        </span>
      </div>

      <div className="decision-trio-grid">
        {/* TRACK STATUS */}
        <div className="decision-cell">
          <span className="cell-micro-label">TRACK CONDITION</span>
          <span className={`cell-big-val ${condColorClass}`}>{condition}</span>
        </div>

        {/* RISK */}
        <div className="decision-cell">
          <span className="cell-micro-label">RISK LEVEL</span>
          <span className={`risk-pill-inline ${riskColorClass}`}>{risk} RISK</span>
        </div>

        {/* RECOMMENDED ACTION */}
        <div className="decision-cell cell-action-wide">
          <span className="cell-micro-label">RECOMMENDED ACTION</span>
          <div className="action-recommendation-badge">
            {action}
          </div>
        </div>
      </div>
    </div>
  );
}
