import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Tooltip from './Tooltip';
import { 
  getQualityBefore, 
  getQualityAfter, 
  getQualityGain, 
  getReliabilityScore, 
  getReliabilityStatus, 
  getDefectCount, 
  getTHI 
} from '../utils/formatters';

export default function MetricCards({ data }) {
  if (!data) return null;

  const qBefore = getQualityBefore(data).toFixed(1);
  const qAfter = getQualityAfter(data).toFixed(1);
  const qGain = getQualityGain(data);

  const relNum = getReliabilityScore(data);
  const relScore = relNum.toFixed(2);
  const relStatus = getReliabilityStatus(data);

  const defectsCount = getDefectCount(data);
  const defectStatus = defectsCount > 0 ? (defectsCount > 1 ? 'HIGH PRIORITY' : 'DETECTED') : 'CLEAN';

  const thiNum = getTHI(data);
  const thiScore = thiNum.toFixed(2);
  const condition = (data.condition || 'POOR').toUpperCase();

  const relBadgeClass = relNum >= 75 ? 'badge-good' : relNum >= 50 ? 'badge-warning' : 'badge-critical';
  const defectBadgeClass = defectsCount > 0 ? 'badge-critical' : 'badge-good';
  const thiBadgeClass = thiNum >= 75 ? 'badge-good' : thiNum >= 40 ? 'badge-warning' : 'badge-critical';

  return (
    <section className="four-result-cards-grid">
      {/* 1. THI */}
      <div className="major-result-card">
        <div className="card-top-header">
          <span className="card-micro-label">THI</span>
          <Tooltip text="Track Health Index: overall track condition score (0-100)." />
        </div>
        <div className={`card-main-number ${thiNum >= 75 ? 'text-emerald' : thiNum >= 40 ? 'text-amber' : 'text-ruby'}`}>
          {thiScore}
        </div>
        <div className={`card-status-tag ${thiBadgeClass}`}>
          {condition}
        </div>
      </div>

      {/* 2. RELIABILITY */}
      <div className="major-result-card">
        <div className="card-top-header">
          <span className="card-micro-label">RELIABILITY</span>
          <Tooltip text="Inspection Reliability score (0-100) based on stability, quality gain, and confidence." />
        </div>
        <div className="card-main-number text-white">{relScore}</div>
        <div className={`card-status-tag ${relBadgeClass}`}>
          {relStatus.includes('TRUST') ? relStatus : `${relStatus} TRUST`}
        </div>
      </div>

      {/* 3. DEFECTS */}
      <div className="major-result-card">
        <div className="card-top-header">
          <span className="card-micro-label">DEFECTS</span>
          <Tooltip text="Total AI-detected track defects in current frame." />
        </div>
        <div className={`card-main-number ${defectsCount > 0 ? 'text-ruby' : 'text-emerald'}`}>
          {defectsCount}
        </div>
        <div className={`card-status-tag ${defectBadgeClass}`}>
          {defectStatus}
        </div>
      </div>

      {/* 4. IMAGE QUALITY */}
      <div className="major-result-card">
        <div className="card-top-header">
          <span className="card-micro-label">IMAGE QUALITY</span>
          <Tooltip text="BRISQUE image quality assessment before and after self-calibration." />
        </div>
        <div className="card-transition-number text-cyan">
          <span className="num-before">{qBefore}</span>
          <span className="transition-arrow">→</span>
          <span className="num-after">{qAfter}</span>
        </div>
        <div className="card-indicator-pill pill-cyan">
          <ArrowUpRight size={13} />
          <span>{qGain > 0 ? `+${qGain.toFixed(1)}` : '0.0'}</span>
        </div>
      </div>
    </section>
  );
}

