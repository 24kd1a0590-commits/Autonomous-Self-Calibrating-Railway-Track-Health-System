import React from 'react';
import { Play, History, Radio } from 'lucide-react';

export default function Header({ activeMode, onSwitchMode, backendOnline }) {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-titles">
          <h1 className="brand-name">AUTONOMOUS SELF-CALIBRATING</h1>
          <span className="brand-sub">RAILWAY TRACK HEALTH INTELLIGENCE</span>
          <p className="brand-tagline">
            AI-powered railway inspection with adaptive image calibration, defect detection and health assessment.
          </p>
        </div>
      </div>

      <div className="topbar-right">
        <div className={`system-status ${backendOnline ? 'online' : 'offline'}`}>
          <Radio size={14} className={backendOnline ? 'pulse-icon text-cyan' : 'text-muted'} />
          <span className="status-dot"></span>
          <span className="status-text">{backendOnline ? 'SYSTEM ONLINE' : 'SYSTEM OFFLINE'}</span>
        </div>

        <div className="mode-switcher-container">
          <button 
            className={`mode-tab-btn ${activeMode === 'LIVE' ? 'active' : ''}`}
            onClick={() => onSwitchMode('LIVE')}
          >
            <Play size={13} /> LIVE INSPECTION
          </button>
          <button 
            className={`mode-tab-btn ${activeMode === 'HISTORY' ? 'active' : ''}`}
            onClick={() => onSwitchMode('HISTORY')}
          >
            <History size={13} /> HISTORY
          </button>
        </div>
      </div>
    </header>
  );
}
