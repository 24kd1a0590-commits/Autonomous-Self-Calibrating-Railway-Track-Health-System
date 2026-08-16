import React from 'react';
import { Sparkles, ArrowDown, CheckCircle2, Sliders, ShieldCheck } from 'lucide-react';

export default function SelfCalibrationPanel({ data }) {
  if (!data) return null;

  return (
    <div className="panel calibration-panel">
      <div className="panel-header">
        <div>
          <span className="panel-label">DYNAMIC PRE-PROCESSING</span>
          <h3>SELF-CALIBRATION INTELLIGENCE</h3>
        </div>
        <div className="status-pill cyan">
          <Sparkles size={14} /> ADAPTIVE PIPELINE
        </div>
      </div>

      <div className="calibration-flow">
        <div className="flow-step quality-before-step">
          <span className="step-label">QUALITY BEFORE</span>
          <div className="quality-value text-muted">{data.quality_before.toFixed(2)}</div>
          <span className="quality-sub">Initial Assessment</span>
        </div>

        <div className="flow-arrow">
          <ArrowDown size={20} className="arrow-icon" />
        </div>

        <div className="flow-step operations-step">
          <div className="ops-header">
            <Sliders size={15} />
            <span>ADAPTIVE CALIBRATION OPERATIONS</span>
          </div>

          <div className="ops-list">
            {data.calibration_operations && data.calibration_operations.length > 0 ? (
              data.calibration_operations.map((op, idx) => (
                <div key={idx} className="op-tag">
                  <span className="op-bullet"></span>
                  {op}
                </div>
              ))
            ) : (
              <div className="op-tag">None (Quality Optimal)</div>
            )}
          </div>
        </div>

        <div className="flow-arrow">
          <ArrowDown size={20} className="arrow-icon" />
        </div>

        <div className="flow-step quality-after-step">
          <span className="step-label">QUALITY AFTER</span>
          <div className="quality-value text-cyan">{data.quality_after.toFixed(2)}</div>
          <span className="quality-sub">Post-Calibration Score</span>
        </div>
      </div>

      <div className="calibration-metrics-row">
        <div className="cal-metric">
          <span className="cal-metric-label">Quality Improvement</span>
          <strong className={data.quality_gain > 0 ? "text-cyan" : "text-muted"}>
            {data.quality_gain > 0 ? `+${data.quality_gain.toFixed(2)}` : "0.00"}
          </strong>
        </div>

        <div className="cal-metric">
          <span className="cal-metric-label">Detection Stability</span>
          <strong className="text-emerald">{data.stability_pct}%</strong>
        </div>

        <div className="cal-metric">
          <span className="cal-metric-label">Calibration Status</span>
          <strong className="text-blue">
            {data.quality_gain > 0 ? "CALIBRATED & VERIFIED" : "OPTIMAL QUALITY"}
          </strong>
        </div>
      </div>

      <div className="panel-footer-note">
        <ShieldCheck size={14} />
        <span>System dynamically selects enhancement operations based on image quality deficits instead of applying static filters.</span>
      </div>
    </div>
  );
}
