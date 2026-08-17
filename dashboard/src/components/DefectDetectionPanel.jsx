import React from 'react';
import { AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function DefectDetectionPanel({ data }) {
  if (!data) return null;

  const defectsCount = data.defects ?? 0;
  const confidencePct = Math.round((data.confidence ?? 0) * 100);
  const isTrustworthy = data.is_trustworthy !== false && (data.reliability ?? 100) >= 50;

  const resultImg = data.image_urls?.annotated || data.image_urls?.calibrated;

  return (
    <div className="panel visual-defect-panel">
      <div className="panel-micro-title">AI DETECTION</div>

      {/* Low reliability alert priority */}
      {!isTrustworthy ? (
        <div className="inconclusive-banner">
          <ShieldAlert size={18} className="text-amber" />
          <span>⚠ INSPECTION INCONCLUSIVE</span>
        </div>
      ) : defectsCount > 0 ? (
        <div className="defect-detected-header">
          <div className="defect-count-row text-ruby">
            <span className="dot-ruby">●</span>
            <span className="defect-count-text">{defectsCount} DEFECT DETECTED</span>
          </div>

          <div className="confidence-compact-row">
            <span className="conf-label">Confidence</span>
            <span className="conf-val font-mono">{confidencePct}%</span>
          </div>
        </div>
      ) : (
        <div className="no-defect-header text-emerald">
          <CheckCircle2 size={18} />
          <span>✓ NO TARGET DEFECT DETECTED</span>
        </div>
      )}

      {/* Annotated Result Image Frame */}
      {resultImg && (
        <div className="defect-annotated-frame">
          <img src={resultImg} alt="AI Defect Detection Output" />
        </div>
      )}
    </div>
  );
}

