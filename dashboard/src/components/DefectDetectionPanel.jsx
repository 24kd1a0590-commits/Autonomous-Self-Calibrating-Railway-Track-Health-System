import React from 'react';
import { AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import Tooltip from './Tooltip';

export default function DefectDetectionPanel({ data }) {
  if (!data) return null;

  const defectsCount = data.defects ?? 0;
  const confidencePct = Math.round((data.confidence ?? 0) * 100);
  const isTrustworthy = data.is_trustworthy !== false && (data.reliability ?? 100) >= 50;

  const resultImg = data.image_urls?.annotated || data.image_urls?.calibrated;

  return (
    <div className="panel visual-defect-panel">
      <div className="panel-micro-title flex-between">
        <span className="flex-center-gap">
          AI DETECTION
          <Tooltip text="Real-time YOLO object detection identifying surface defects, cracks, missing fasteners, and alignment anomalies." />
        </span>
        <span className={`status-pill-small ${defectsCount > 0 ? 'badge-critical' : 'badge-good'}`}>
          {defectsCount > 0 ? 'DEFECTS FOUND' : 'CLEAN FRAME'}
        </span>
      </div>

      {!isTrustworthy ? (
        <div className="inconclusive-banner">
          <ShieldAlert size={16} className="text-amber" />
          <span>INSPECTION INCONCLUSIVE (LOW RELIABILITY)</span>
        </div>
      ) : defectsCount > 0 ? (
        <div className="defect-detected-header">
          <div className="defect-count-row text-ruby">
            <span className="dot-ruby">●</span>
            <span className="defect-count-text font-mono">{defectsCount} DEFECT DETECTED</span>
          </div>

          <div className="confidence-compact-row">
            <span className="conf-label">Confidence:</span>
            <span className="conf-val font-mono text-cyan">{confidencePct}%</span>
          </div>
        </div>
      ) : (
        <div className="no-defect-header text-emerald">
          <CheckCircle2 size={16} />
          <span>✓ NO TARGET DEFECT DETECTED</span>
        </div>
      )}

      {resultImg && (
        <div className="defect-annotated-frame">
          <img src={resultImg} alt="AI Defect Detection Output" />
        </div>
      )}
    </div>
  );
}
