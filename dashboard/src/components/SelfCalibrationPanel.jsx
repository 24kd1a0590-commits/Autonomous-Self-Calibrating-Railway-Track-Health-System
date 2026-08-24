import React from 'react';
import { ArrowRight } from 'lucide-react';
import Tooltip from './Tooltip';

export default function SelfCalibrationPanel({ data }) {
  if (!data) return null;

  const qBefore = (data.quality_before ?? 0).toFixed(2);
  const qAfter = (data.quality_after ?? 0).toFixed(2);
  const qGain = (data.quality_gain ?? 0).toFixed(2);

  const calibObj = data.calibration || {};
  const rawOps = data.calibration_operations || calibObj.operations || [];
  
  const isNotRequired = calibObj.applied === false || 
    rawOps.length === 0 || 
    rawOps.some(op => op.includes('None') || op.includes('Reverted'));

  let tags = [];

  if (isNotRequired) {
    tags = ['Calibration not required (Quality optimal)'];
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

  tags = Array.from(new Set(tags));

  const originalImg = data.image_urls?.original || data.original_image;
  const calibratedImg = data.image_urls?.calibrated || data.calibrated_image || originalImg;

  return (
    <div className="panel visual-calibration-panel">
      <div className="panel-micro-title flex-between">
        <span className="flex-center-gap">
          SELF-CALIBRATION
          <Tooltip text="Adaptive image enhancement module that dynamically applies CLAHE, denoising, sharpening, or brightness correction based on frame quality." />
        </span>
        <span className={`gain-chip ${parseFloat(qGain) > 0 ? 'pill-cyan' : 'pill-muted'}`}>
          {parseFloat(qGain) > 0 ? `GAIN: +${qGain}` : 'NO GAIN'}
        </span>
      </div>

      <div className="before-after-visual-container">
        {/* BEFORE BOX */}
        <div className="comparison-box">
          <div className="box-header-tag">
            <span className="box-badge badge-muted">BEFORE</span>
            <span className="box-score font-mono">{qBefore}</span>
          </div>
          <div className="img-frame-thumb">
            {originalImg ? (
              <img src={originalImg} alt="Original Raw Track" />
            ) : (
              <div className="thumb-placeholder">RAW IMAGE</div>
            )}
          </div>
        </div>

        <div className="adapt-arrow-wrap">
          <div className="adapt-pill">{isNotRequired ? 'PASS' : 'ADAPT'}</div>
          <ArrowRight size={18} className={isNotRequired ? 'arrow-icon-muted' : 'arrow-icon-cyan'} />
        </div>

        {/* AFTER BOX */}
        <div className="comparison-box">
          <div className="box-header-tag">
            <span className="box-badge badge-cyan">AFTER</span>
            <span className="box-score font-mono text-cyan">{qAfter}</span>
          </div>
          <div className="img-frame-thumb glow-border-cyan">
            {calibratedImg ? (
              <img src={calibratedImg} alt="Calibrated Track" />
            ) : (
              <div className="thumb-placeholder">CALIBRATED</div>
            )}
          </div>
        </div>
      </div>

      <div className="calibration-operations-chips">
        <span className="chips-label">APPLIED OPERATIONS:</span>
        <div className="chips-list">
          {tags.map((tag, idx) => (
            <span key={idx} className={`op-chip ${isNotRequired ? 'chip-muted' : ''}`}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

