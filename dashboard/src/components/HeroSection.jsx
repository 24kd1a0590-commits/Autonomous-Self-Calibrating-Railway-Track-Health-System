import React from 'react';
import { ScanLine, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function HeroSection({ activeInspection }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="eyebrow">
          <ScanLine size={16} /> AUTONOMOUS COMPUTER VISION PLATFORM
        </span>

        <h2>
          Autonomous Railway Track<br />
          <strong>Health Intelligence</strong>
        </h2>

        <p className="hero-subtitle">
          Self-validating computer vision for reliable railway track inspection.
        </p>

        <p className="hero-desc">
          The system evaluates image quality, automatically applies adaptive calibration when required,
          verifies detection stability, estimates inspection reliability, and converts the result into
          a Track Health Index and maintenance decision.
        </p>
      </div>

      <div className="hero-right">
        <div className="core-message-box">
          <div className="message-header">
            <ShieldCheck size={20} className="icon-glow" />
            <span>CORE SYSTEM INNOVATION</span>
          </div>
          <p className="message-body">
            "THIS SYSTEM DOES NOT JUST DETECT DEFECTS. IT FIRST CHECKS WHETHER THE INSPECTION IS RELIABLE, 
            SELF-CALIBRATES THE IMAGE WHEN REQUIRED, THEN MAKES A HEALTH AND MAINTENANCE DECISION."
          </p>
          <div className="active-target-badge">
            <CheckCircle2 size={15} />
            <span>ACTIVE INSPECTION: <strong>{activeInspection?.shortName || "Image-180"}</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
}
