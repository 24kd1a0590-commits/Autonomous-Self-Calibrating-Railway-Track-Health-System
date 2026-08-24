import React from 'react';
import Tooltip from './Tooltip';

export default function HeroSection({ activeInspection }) {
  if (!activeInspection) return null;

  const thi = activeInspection.thi ?? 0;
  const condition = (activeInspection.condition || 'UNKNOWN').toUpperCase();
  const risk = (activeInspection.risk_level || 'LOW').toUpperCase();
  const percentage = Math.min(100, Math.max(0, thi));
  
  // Radial gauge color coding
  const gaugeColor = thi >= 75 ? "#10b981" : 
                     thi >= 60 ? "#38bdf8" : 
                     thi >= 40 ? "#f59e0b" : "#ef4444";

  // Semi-circle SVG gauge calculation (r=45, C=pi*r = 141.37)
  const radius = 45;
  const strokeWidth = 8;
  const circumference = Math.PI * radius; // 141.37
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  const riskBadgeClass = risk === 'LOW' ? 'badge-good' : risk === 'MEDIUM' ? 'badge-warning' : 'badge-critical';

  return (
    <div className="thi-radial-gauge-container panel">
      <div className="panel-micro-title flex-between">
        <span className="flex-center-gap">
          TRACK HEALTH INDEX (THI)
          <Tooltip text="Track Health Index: integrated track condition score (0-100) combining quality, calibration, stability, and defects." />
        </span>
        <span className="active-target-tag">
          TARGET: <strong className="font-mono text-cyan">{activeInspection.shortName || activeInspection.id}</strong>
        </span>
      </div>

      <div className="thi-gauge-visual-body">
        <div className="radial-svg-container">
          <svg className="radial-svg" viewBox="0 0 120 70">
            <path 
              className="gauge-bg-arc"
              d="M 15 60 A 45 45 0 0 1 105 60" 
              fill="none" 
              stroke="#1a2234" 
              strokeWidth={strokeWidth} 
              strokeLinecap="round"
            />
            <path 
              className="gauge-fg-arc"
              d="M 15 60 A 45 45 0 0 1 105 60" 
              fill="none" 
              stroke={gaugeColor} 
              strokeWidth={strokeWidth} 
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: 'stroke-dashoffset 0.8s ease-in-out' }}
            />
          </svg>
          <div className="gauge-overlay-center">
            <span className="thi-num-big" style={{ color: gaugeColor }}>
              {thi.toFixed(2)}
            </span>
            <span className="thi-denom">/ 100</span>
          </div>
        </div>

        <div className="thi-status-column">
          <span className={`thi-badge badge-${condition.toLowerCase()}`}>
            {condition}
          </span>
          <div className="thi-risk-row">
            <span className="risk-label">RISK LEVEL:</span>
            <span className={`risk-pill ${riskBadgeClass}`}>{risk}</span>
          </div>
          <span className="thi-scale-hint">0 CRITICAL • 40 POOR • 60 MODERATE • 75 GOOD</span>
        </div>
      </div>
    </div>
  );
}
