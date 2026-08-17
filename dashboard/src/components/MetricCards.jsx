import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function MetricCards({ data }) {
  if (!data) return null;

  const qualityAfter = (data.quality_after ?? 0).toFixed(1);
  const qualityGain = data.quality_gain ?? 0;

  const relScore = (data.reliability ?? 0).toFixed(1);
  const relStatus = (data.reliability_status || 'HIGH').toUpperCase();

  const defectsCount = data.defects ?? 0;

  const thiScore = (data.thi ?? 0).toFixed(1);
  const condition = (data.condition || 'POOR').toUpperCase();

  const relBadgeClass = data.reliability >= 75 ? 'badge-good' : data.reliability >= 50 ? 'badge-warning' : 'badge-critical';
  const defectBadgeClass = defectsCount > 0 ? 'badge-critical' : 'badge-good';
  const thiBadgeClass = data.thi >= 75 ? 'badge-good' : data.thi >= 40 ? 'badge-warning' : 'badge-critical';

  return (
    <section className="four-result-cards-grid">
      {/* 1. IMAGE QUALITY */}
      <div className="major-result-card">
        <span className="card-micro-label">IMAGE QUALITY</span>
        <div className="card-main-number text-cyan">{qualityAfter}</div>
        <div className="card-indicator-pill pill-cyan">
          <ArrowUpRight size={13} />
          <span>{qualityGain > 0 ? `+${qualityGain.toFixed(1)}` : '0.0'}</span>
        </div>
      </div>

      {/* 2. RELIABILITY */}
      <div className="major-result-card">
        <span className="card-micro-label">RELIABILITY</span>
        <div className="card-main-number text-white">{relScore}</div>
        <div className={`card-status-tag ${relBadgeClass}`}>
          {relStatus}
        </div>
      </div>

      {/* 3. DEFECTS */}
      <div className="major-result-card">
        <span className="card-micro-label">DEFECTS</span>
        <div className={`card-main-number ${defectsCount > 0 ? 'text-ruby' : 'text-emerald'}`}>
          {defectsCount}
        </div>
        <div className={`card-status-tag ${defectBadgeClass}`}>
          {defectsCount > 0 ? 'DETECTED' : 'CLEAN'}
        </div>
      </div>

      {/* 4. TRACK HEALTH */}
      <div className="major-result-card">
        <span className="card-micro-label">TRACK HEALTH</span>
        <div className={`card-main-number ${data.thi >= 75 ? 'text-emerald' : data.thi >= 40 ? 'text-amber' : 'text-ruby'}`}>
          {thiScore}
        </div>
        <div className={`card-status-tag ${thiBadgeClass}`}>
          {condition}
        </div>
      </div>
    </section>
  );
}

