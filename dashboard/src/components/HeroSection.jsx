import React from 'react';

export default function HeroSection({ activeInspection }) {
  if (!activeInspection) return null;

  const thi = activeInspection.thi ?? 0;
  const condition = (activeInspection.condition || 'UNKNOWN').toUpperCase();
  const percentage = Math.min(100, Math.max(0, thi));
  
  // Radial gauge color coding
  const gaugeColor = thi >= 75 ? "#10b981" : 
                     thi >= 60 ? "#3b82f6" : 
                     thi >= 40 ? "#f59e0b" : "#ef4444";

  // Semi-circle SVG gauge calculation (r=50, C=pi*r = 157.08)
  const radius = 45;
  const strokeWidth = 8;
  const circumference = Math.PI * radius; // 141.37
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  return (
    <section className="hero-hero-section">
      <div className="hero-left-text">
        <span className="eyebrow-tag">AUTONOMOUS TRACK INTELLIGENCE</span>
        <p className="hero-single-sentence">
          AI-powered railway inspection with adaptive self-calibration and reliability-aware health assessment.
        </p>
        <div className="active-target-pill">
          <span className="dot-cyan"></span>
          <span>ACTIVE TARGET: <strong className="font-mono text-cyan">{activeInspection.shortName || activeInspection.id}</strong></span>
        </div>
      </div>

      <div className="hero-right-gauge">
        <div className="thi-gauge-card">
          <div className="thi-gauge-header">
            <span className="thi-gauge-title">TRACK HEALTH INDEX</span>
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
                  {thi.toFixed(1)}
                </span>
                <span className="thi-denom">/ 100</span>
              </div>
            </div>

            <div className="thi-status-column">
              <span className={`thi-badge badge-${condition.toLowerCase()}`}>
                {condition}
              </span>
              <span className="thi-scale-hint">0 CRITICAL • 40 POOR • 60 MODERATE • 75 GOOD</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
