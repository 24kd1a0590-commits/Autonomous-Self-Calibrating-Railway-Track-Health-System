import React from 'react';
import { AlertCircle, CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function WhySelfCalibration() {
  return (
    <div className="panel research-panel">
      <div className="panel-header">
        <div>
          <span className="panel-label">RESEARCH & SYSTEM INNOVATION</span>
          <h3>WHY ADAPTIVE SELF-CALIBRATION MATTERS?</h3>
        </div>
        <div className="status-pill cyan">
          <Zap size={14} /> ADAPTIVE VS STATIC PREPROCESSING
        </div>
      </div>

      <div className="comparison-columns">
        <div className="problem-column">
          <div className="column-title text-ruby">
            <AlertCircle size={18} />
            <span>THE REAL-WORLD PROBLEM</span>
          </div>

          <p className="problem-text">
            Standard railway inspection models fail under degraded environmental conditions because fixed preprocessing filters overflow noise or degrade sharp rail edges.
          </p>

          <ul className="problem-list">
            <li><span>•</span> Extreme lighting & shadow variations</li>
            <li><span>•</span> Motion blur & focal distortions</li>
            <li><span>•</span> Sensor noise & weather artifacts</li>
            <li><span>•</span> Low contrast rail surface regions</li>
          </ul>
        </div>

        <div className="vs-divider">
          <span>VS</span>
        </div>

        <div className="solution-column">
          <div className="column-title text-emerald">
            <CheckCircle2 size={18} />
            <span>OUR SYSTEM RESPONSE</span>
          </div>

          <div className="response-pipeline-pills">
            <span className="res-pill">ASSESS</span>
            <ArrowRight size={14} />
            <span className="res-pill pill-cyan">ADAPT</span>
            <ArrowRight size={14} />
            <span className="res-pill">ENHANCE</span>
            <ArrowRight size={14} />
            <span className="res-pill pill-emerald">VERIFY</span>
          </div>

          <p className="solution-quote">
            "The system adapts preprocessing according to image conditions instead of applying one fixed enhancement to every image."
          </p>
        </div>
      </div>
    </div>
  );
}
