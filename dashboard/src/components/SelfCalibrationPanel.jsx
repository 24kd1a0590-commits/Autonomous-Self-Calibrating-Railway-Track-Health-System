import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function SelfCalibrationPanel({ data }) {
  if (!data) return null;

  const qBefore = (data.quality_before ?? 0).toFixed(1);
  const qAfter = (data.quality_after ?? 0).toFixed(1);

  // Extract compact technique names from data.calibration_operations (e.g. CLAHE, DENOISING, BRIGHTNESS)
  const rawOps = data.calibration_operations || [];
  let tags = [];

  if (rawOps.length === 0) {
    tags = ['OPTIMAL RAW'];
  } else {
    rawOps.forEach(op => {
      const lower = op.toLowerCase();
      if (lower.includes('clahe')) tags.push('CLAHE');
      if (lower.includes('denois')) tags.push('DENOISING');
      if (lower.includes('bright') || lower.includes('contrast')) tags.push('BRIGHTNESS');
      if (lower.includes('sharp')) tags.push('SHARPENING');
    });
    if (tags.length === 0) tags = ['ADAPTIVE CALIBRATION'];
  }

  // Deduplicate tags
  tags = Array.from(new Set(tags));

  const originalImg = data.image_urls?.original;
  const calibratedImg = data.image_urls?.calibrated || data.image_urls?.original;

  return (
    <div className="panel visual-calibration-panel">
      <div className="panel-micro-title">SELF-CALIBRATION</div>

      <div className="before-after-visual-container">
        {/* BEFORE BOX */}
        <div className="comparison-box">
          <span className="box-badge badge-muted">BEFORE</span>
          <div className="img-frame-thumb">
            {originalImg ? (
              <img src={originalImg} alt="Original Raw Track" />
            ) : (
              <div className="thumb-placeholder">RAW</div>
            )}
          </div>
        </div>

        <div className="arrow-connector-middle">
          <ArrowRight size={20} className="arrow-icon-cyan" />
        </div>

        {/* AFTER BOX */}
        <div className="comparison-box">
          <span className="box-badge badge-cyan">AFTER</span>
          <div className="img-frame-thumb glow-border-cyan">
            {calibratedImg ? (
              <img src={calibratedImg} alt="Calibrated Track" />
            ) : (
              <div className="thumb-placeholder">CALIBRATED</div>
            )}
          </div>
        </div>
      </div>

      <div className="quality-transition-row">
        <span className="q-label">Quality:</span>
        <span className="q-before-num">{qBefore}</span>
        <ArrowRight size={14} className="q-arrow" />
        <span className="q-after-num text-cyan">{qAfter}</span>
      </div>

      <div className="calibration-tech-tags">
        {tags.map((tag, idx) => (
          <span key={idx} className="tech-tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

