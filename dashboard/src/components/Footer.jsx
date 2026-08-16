import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="dashboard-footer">
      <div className="footer-disclaimer">
        <ShieldAlert size={16} className="text-amber" />
        <p>
          <strong>Research Disclaimer:</strong> Prototype research system. Reliability and Track Health Index thresholds are engineering prototype thresholds and are not official railway safety standards.
        </p>
      </div>

      <div className="footer-meta">
        <span>Autonomous Self-Calibrating Railway Track Health Intelligence Platform</span>
        <span>Computer Vision • Adaptive Pre-Processing • Reliability Engineering</span>
      </div>
    </footer>
  );
}
