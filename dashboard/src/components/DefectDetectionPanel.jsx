import React from 'react';
import { AlertTriangle, CheckCircle2, Scan, Eye } from 'lucide-react';

export default function DefectDetectionPanel({ data }) {
  if (!data) return null;

  const hasDefects = data.defects > 0;

  return (
    <div className="panel defect-panel">
      <div className="panel-header">
        <div>
          <span className="panel-label">YOLO COMPUTER VISION</span>
          <h3>AI DEFECT DETECTION</h3>
        </div>
        <div className={`status-pill ${hasDefects ? 'ruby' : 'emerald'}`}>
          {hasDefects ? <AlertTriangle size={14} /> : <CheckCircle2 size={14} />}
          {hasDefects ? `${data.defects} DEFECT(S) DETECTED` : "NO DEFECTS DETECTED"}
        </div>
      </div>

      <div className="defect-summary-rows">
        <div className="defect-row">
          <span className="row-label">Detected Defects</span>
          <strong className={hasDefects ? "text-ruby" : "text-emerald"}>
            {data.defects}
          </strong>
        </div>

        <div className="defect-row">
          <span className="row-label">Defect Type</span>
          <strong className="text-highlight">
            {data.defect_type}
          </strong>
        </div>

        <div className="defect-row">
          <span className="row-label">Detection Confidence</span>
          <strong>
            {hasDefects ? `${(data.confidence * 100).toFixed(1)}%` : "N/A (0.0%)"}
          </strong>
        </div>

        <div className="defect-row">
          <span className="row-label">Detection Stability</span>
          <strong className="text-emerald">
            {data.stability_pct}%
          </strong>
        </div>
      </div>

      {hasDefects ? (
        <div className="defect-list-container">
          <h4 className="defect-list-title">DETECTED REGION BREAKDOWN</h4>
          <div className="defect-card-item">
            <div className="defect-item-head">
              <Scan size={16} className="text-ruby" />
              <span>REGION #1 — {data.defect_type.toUpperCase()}</span>
              <span className="severity-tag tag-high">MEDIUM SEVERITY</span>
            </div>
            <div className="defect-item-details">
              <span>Class ID: 0 (railway-gap)</span>
              <span>Confidence: {(data.confidence * 100).toFixed(1)}%</span>
              <span>IoU Stability: {data.stability_pct}%</span>
              <span>Geometry: 115.2px × 108.9px</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-defect-box">
          <CheckCircle2 size={24} className="text-emerald" />
          <span>Surface structural continuity verified. No structural gaps or cracks detected.</span>
        </div>
      )}
    </div>
  );
}
