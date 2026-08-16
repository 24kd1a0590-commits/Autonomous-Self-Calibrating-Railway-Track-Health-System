import React from 'react';
import { TrainFront, ShieldCheck, Sparkles, BrainCircuit } from 'lucide-react';

export default function Header() {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-icon">
          <TrainFront size={28} />
        </div>

        <div className="brand-titles">
          <h1>RAILWAY TRACK HEALTH INTELLIGENCE</h1>
          <span className="subtitle">AUTONOMOUS SELF-CALIBRATING INSPECTION & DECISION SUPPORT</span>
        </div>
      </div>

      <div className="topbar-right">
        <div className="concept-pills">
          <span className="pill">
            <BrainCircuit size={14} /> AI INSPECTION
          </span>
          <span className="pill pill-glow">
            <Sparkles size={14} /> SELF-CALIBRATION
          </span>
          <span className="pill">
            <ShieldCheck size={14} /> RELIABILITY INTELLIGENCE
          </span>
        </div>

        <div className="system-status">
          <span className="status-dot"></span>
          <span className="status-text">SYSTEM ONLINE</span>
        </div>
      </div>
    </header>
  );
}
