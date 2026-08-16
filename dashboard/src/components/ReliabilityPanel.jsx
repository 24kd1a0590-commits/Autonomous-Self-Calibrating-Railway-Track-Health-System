import React from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle, Info } from 'lucide-react';

function ComponentBar({ label, value, max = 100, color = "blue", suffix = "" }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="comp-bar-item">
      <div className="comp-bar-labels">
        <span className="comp-name">{label}</span>
        <span className="comp-val">{value.toFixed(1)}{suffix}</span>
      </div>
      <div className="comp-track">
        <div 
          className={`comp-fill fill-${color}`} 
          style={{ width: `${pct}%` }}
        ></div>
      </div>
    </div>
  );
}

export default function ReliabilityPanel({ data }) {
  if (!data) return null;

  const comps = data.components || {
    quality_component: data.quality_after,
    quality_gain_component: Math.min(100, Math.max(0, 50 + data.quality_gain * 2.5)),
    stability_component: data.stability_pct,
    confidence_component: data.defects > 0 ? data.confidence * 100 : 50,
    degradation_penalty: 0
  };

  const statusColor = data.reliability >= 75 ? 'emerald' : data.reliability >= 50 ? 'amber' : 'ruby';

  return (
    <div className="panel reliability-panel">
      <div className="panel-header">
        <div>
          <span className="panel-label">MULTI-FACTOR TRUST ASSESSMENT</span>
          <h3>INSPECTION RELIABILITY INTELLIGENCE</h3>
        </div>
        <div className={`status-pill ${statusColor}`}>
          <ShieldCheck size={14} /> RELIABILITY: {data.reliability_status}
        </div>
      </div>

      <div className="reliability-top-summary">
        <div className="score-ring-box">
          <div className="big-score-display">
            <span className="score-num">{data.reliability.toFixed(2)}</span>
            <span className="score-denom">/ 100</span>
          </div>
          <span className="score-caption">RELIABILITY SCORE</span>
        </div>

        <div className="trust-indicator-box">
          <div className="trust-status-row">
            <span className="trust-label">System Trustworthiness:</span>
            <strong className={data.is_trustworthy ? "text-emerald" : "text-ruby"}>
              {data.is_trustworthy ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              {data.is_trustworthy ? "TRUSTWORTHY (TRUE)" : "UNTRUSTWORTHY (FALSE)"}
            </strong>
          </div>
          <p className="trust-explanation">
            Calculated by weighing post-calibration image quality, calibration gain, bounding box IoU stability across frames, and defect confidence.
          </p>
        </div>
      </div>

      <div className="reliability-components">
        <h4 className="comp-title">INSPECTION RELIABILITY COMPONENTS</h4>

        <div className="comp-grid">
          <ComponentBar 
            label="Image Quality Component" 
            value={comps.quality_component} 
            color="cyan" 
          />
          <ComponentBar 
            label="Quality Gain Component" 
            value={comps.quality_gain_component} 
            color="blue" 
          />
          <ComponentBar 
            label="Detection Stability" 
            value={comps.stability_component} 
            color="emerald" 
            suffix="%"
          />
          <ComponentBar 
            label="Model Confidence" 
            value={comps.confidence_component} 
            color="purple" 
            suffix="%"
          />
          <ComponentBar 
            label="Degradation Penalty" 
            value={comps.degradation_penalty} 
            color="ruby" 
          />
        </div>
      </div>

      <div className="research-disclaimer-box">
        <Info size={14} />
        <span>Prototype engineering reliability score — not an official railway safety limit.</span>
      </div>
    </div>
  );
}
