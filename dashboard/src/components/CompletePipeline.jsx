import React from 'react';
import { 
  Activity, 
  Sliders, 
  Scan, 
  Layers, 
  ShieldCheck, 
  AlertTriangle, 
  Gauge, 
  ShieldAlert, 
  Wrench,
  Check,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import Tooltip from './Tooltip';

export default function CompletePipeline({ data, isInspecting, activeStageIndex = 8 }) {
  if (!data) return null;

  const thi = data.thi ?? 0;
  const risk = (data.risk_level || 'LOW').toUpperCase();

  const stages = [
    { id: "01", name: "Image Quality", icon: Activity, status: "completed" },
    { id: "02", name: "Self-Calibration", icon: Sliders, status: "completed" },
    { id: "03", name: "AI Detection", icon: Scan, status: "completed" },
    { id: "04", name: "Detection Stability", icon: Layers, status: "completed" },
    { id: "05", name: "Inspection Reliability", icon: ShieldCheck, status: "completed" },
    { id: "06", name: "Defect Analysis", icon: AlertTriangle, status: "completed" },
    { id: "07", name: "Track Health", icon: Gauge, status: "completed" },
    { id: "08", name: "Risk Assessment", icon: ShieldAlert, status: "completed" },
    { id: "09", name: "Decision Support", icon: Wrench, status: "completed" }
  ];

  return (
    <div className="panel visual-pipeline-panel">
      <div className="panel-micro-title flex-between">
        <span className="flex-center-gap">
          AUTONOMOUS 9-STAGE INSPECTION PIPELINE
          <Tooltip text="9-stage pipeline architecture executing image quality check, self-calibration, AI detection, stability, reliability, THI and decision support." />
        </span>
        <span className="pipeline-mode-tag">
          {isInspecting ? `PROCESSING STAGE ${activeStageIndex + 1}/9` : 'PIPELINE COMPLETE'}
        </span>
      </div>

      <div className="pipeline-horizontal-nodes">
        {stages.map((stage, idx) => {
          const IconComp = stage.icon;
          const isDone = !isInspecting || idx < activeStageIndex;
          const isCurrent = isInspecting && idx === activeStageIndex;
          const isWaiting = isInspecting && idx > activeStageIndex;

          let badgeText = "COMPLETED";
          let badgeClass = "badge-good";

          if (isCurrent) {
            badgeText = "PROCESSING";
            badgeClass = "badge-cyan pulse-badge";
          } else if (isWaiting) {
            badgeText = "WAITING";
            badgeClass = "badge-muted";
          } else if (stage.status === "error") {
            badgeText = "ERROR";
            badgeClass = "badge-critical";
          }

          return (
            <React.Fragment key={stage.id}>
              <div className={`pipeline-node-card ${isCurrent ? 'active-node' : ''} ${isDone ? 'done-node' : ''}`}>
                <div className="node-top-row">
                  <span className="node-num font-mono">{stage.id}</span>
                  <div className="node-icon-wrap">
                    {isCurrent ? (
                      <RefreshCw size={14} className="spin-icon text-cyan" />
                    ) : isDone ? (
                      <Check size={14} className="text-emerald" />
                    ) : (
                      <IconComp size={14} className="text-muted" />
                    )}
                  </div>
                </div>

                <span className="node-title-text">{stage.name}</span>

                <div className="node-status-badge-wrap">
                  <span className={`node-status-badge ${badgeClass}`}>
                    {badgeText === "COMPLETED" ? "✓" : badgeText}
                  </span>
                </div>
              </div>

              {idx < stages.length - 1 && (
                <div className="pipeline-arrow-connector">
                  <ChevronRight size={14} className={isDone ? 'arrow-cyan' : 'arrow-muted'} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
