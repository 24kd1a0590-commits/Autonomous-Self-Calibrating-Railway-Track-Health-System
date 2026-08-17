import React from 'react';

export default function DecisionSupportPanel({ data }) {
  if (!data) return null;

  const condition = (data.condition || 'POOR').toUpperCase();
  const risk = (data.risk_level || 'HIGH').toUpperCase();
  const action = (data.recommendation || 'PRIORITIZE DETAILED INSPECTION').toUpperCase();

  const condColorClass = condition === 'GOOD' || condition === 'EXCELLENT' ? 'text-emerald' : condition === 'FAIR' || condition === 'MODERATE' ? 'text-cyan' : condition === 'POOR' ? 'text-amber' : 'text-ruby';
  const riskColorClass = risk === 'LOW' ? 'text-emerald' : risk === 'MEDIUM' ? 'text-amber' : 'text-ruby';

  return (
    <div className="panel visual-decision-panel">
      <div className="panel-micro-title">DECISION SUPPORT</div>

      <div className="decision-trio-grid">
        {/* TRACK STATUS */}
        <div className="decision-cell">
          <span className="cell-micro-label">TRACK STATUS</span>
          <span className={`cell-big-val ${condColorClass}`}>{condition}</span>
        </div>

        {/* RISK */}
        <div className="decision-cell">
          <span className="cell-micro-label">RISK</span>
          <span className={`cell-big-val ${riskColorClass}`}>{risk}</span>
        </div>

        {/* ACTION */}
        <div className="decision-cell cell-action-wide">
          <span className="cell-micro-label">ACTION</span>
          <div className="action-recommendation-badge">
            {action}
          </div>
        </div>
      </div>
    </div>
  );
}

