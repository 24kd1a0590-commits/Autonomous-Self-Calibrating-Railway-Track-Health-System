import React, { useState } from 'react';
import { Eye, Layers, CheckCircle2, Image as ImageIcon, Maximize2 } from 'lucide-react';

export default function MainInspectionView({ data }) {
  const [activeTab, setActiveTab] = useState('RESULT'); // 'ORIGINAL', 'CALIBRATED', 'RESULT'
  const [imgError, setImgError] = useState(false);

  if (!data) return null;

  const currentImgUrl = activeTab === 'ORIGINAL' ? data.image_urls.original :
                        activeTab === 'CALIBRATED' ? data.image_urls.calibrated :
                        data.image_urls.annotated;

  return (
    <div className="panel image-panel">
      <div className="panel-header">
        <div>
          <span className="panel-label">INSPECTED IMAGE VISUALIZATION</span>
          <h3>{data.shortName}</h3>
          <span className="image-filename">{data.image}</span>
        </div>

        <div className="header-actions">
          <div className="view-mode-tabs">
            <button 
              className={`tab-btn ${activeTab === 'ORIGINAL' ? 'active' : ''}`}
              onClick={() => { setActiveTab('ORIGINAL'); setImgError(false); }}
            >
              ORIGINAL
            </button>
            <button 
              className={`tab-btn ${activeTab === 'CALIBRATED' ? 'active' : ''}`}
              onClick={() => { setActiveTab('CALIBRATED'); setImgError(false); }}
            >
              CALIBRATED
            </button>
            <button 
              className={`tab-btn ${activeTab === 'RESULT' ? 'active' : ''}`}
              onClick={() => { setActiveTab('RESULT'); setImgError(false); }}
            >
              RESULT
            </button>
          </div>

          <div className="live-tag">
            <span className="pulse-dot"></span>
            {activeTab === 'ORIGINAL' ? 'RAW FRAME' : activeTab === 'CALIBRATED' ? 'CALIBRATED' : 'ANALYZED'}
          </div>
        </div>
      </div>

      <div className="image-display-container">
        {!imgError ? (
          <img 
            src={currentImgUrl} 
            alt={`Railway Track ${activeTab}`} 
            className="inspection-img"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="image-placeholder">
            <div className="scan-line"></div>
            <div className="track-visual">
              <div className="rail rail-left"></div>
              <div className="rail rail-right"></div>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="sleeper" style={{ top: `${12 + i * 11}%` }}></div>
              ))}
            </div>
            <div className="fallback-notice">
              <ImageIcon size={32} />
              <span>Simulated Visual Inspection View</span>
              <small>{data.shortName} • Mode: {activeTab}</small>
            </div>
          </div>
        )}

        <div className="image-overlay-info">
          <div className="overlay-badge">
            <Eye size={13} /> MODE: {activeTab}
          </div>
          <div className="overlay-badge">
            <Layers size={13} /> DEFECTS: {data.defects}
          </div>
          <div className="overlay-badge status-good">
            <CheckCircle2 size={13} /> STABILITY: {data.stability_pct}%
          </div>
        </div>
      </div>
    </div>
  );
}
