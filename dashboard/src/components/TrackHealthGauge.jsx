import React from 'react';
import { Gauge, Activity, AlertTriangle, ShieldAlert } from 'lucide-react';

export default function TrackHealthGauge({ data }) {
  if (!data) return null;

  const thi = data.thi;
  const condition = data.condition;
  const risk = data.risk_level;

  // Calculate gauge angle (180 deg semi-circle or full circular arc)
  const percentage = Math.min(100, Math.max(0, thi));
  const strokeDashoffset = 283 - (283 * percentage) / 100;

  const gaugeColor = thi >= 75 ? "#10b981" : 
                     thi >= 60 ? "#3b82f6" : 
                     thi >= 40 ? "#f59e0b" : "#ef4444";

  return (
    <div className="panel gauge-panel">
      <div className="panel-header">
        <div>
          <span className="panel-label">INTEGRATED CONDITION INDEX</span>
          <h3>TRACK HEALTH INDEX (THI)</h3>
        </div>
        <div className={`status-pill ${thi >= 75 ? 'emerald' : thi >= 60 ? 'blue' : thi >= 40 ? 'amber' : 'ruby'}`}>
          <Gauge size={14} /> CONDITION: {condition}
        </div>
      </div>

      <div className="gauge-display-wrapper">
        <div className="radial-gauge-container">
          <svg className="gauge-svg" viewBox="0 0 100 100">
            <circle 
              className="gauge-bg" 
              cx="50" 
              cy="50" 
              r="45" 
            />
            <circle 
              className="gauge-progress" 
              cx="50" 
              cy="50" 
              r="45" 
              style={{
                strokeDasharray: 283,
                strokeDashoffset: strokeDashoffset,
                stroke: gaugeColor
              }}
            />
          </svg>

          <div className="gauge-center-content">
            <span className="gauge-score-value">{thi.toFixed(2)}</span>
            <span className="gauge-score-denom">/ 100</span>
            <span className={`gauge-condition-badge badge-${condition.toLowerCase()}`}>
              {condition}
            </span>
          </div>
        </div>

        <div className="gauge-meta-info">
          <div className="meta-item">
            <span className="meta-label">Risk Classification</span>
            <strong className={`risk-badge risk-${risk.toLowerCase()}`}>
              <ShieldAlert size={14} /> {risk} RISK
            </strong>
          </div>

          <div className="meta-item">
            <span className="meta-label">Maintenance Priority</span>
            <strong>{data.priority || (risk === 'HIGH' ? 'HIGH' : 'LOW')}</strong>
          </div>
        </div>
      </div>

      <div className="thi-scale-container">
        <div className="scale-bar-track">
          <div 
            className="scale-indicator-pin" 
            style={{ left: `${percentage}%` }}
          ></div>
        </div>
        <div className="scale-ticks">
          <span className="tick">0<br/><small>CRITICAL</small></span>
          <span className="tick">40<br/><small>POOR</small></span>
          <span className="tick">60<br/><small>MODERATE</small></span>
          <span className="tick">75<br/><small>GOOD</small></span>
          <span className="tick">100<br/><small>EXCELLENT</small></span>
        </div>
      </div>
    </div>
  );
}
