import React from 'react';
import { 
  Camera, 
  Activity, 
  Sliders, 
  Scan, 
  Layers, 
  ShieldCheck, 
  Gauge, 
  ShieldAlert, 
  Wrench,
  Check,
  ChevronRight
} from 'lucide-react';

export default function CompletePipeline({ data, isInspecting, activeStageIndex = 8 }) {
  if (!data) return null;

  const thi = data.thi ?? 0;
  const risk = (data.risk_level || 'LOW').toUpperCase();

  const stages = [
    { id: "01", label: "INPUT", icon: Camera, status: "good" },
    { id: "02", label: "QUALITY", icon: Activity, status: "good" },
    { id: "03", label: "CALIBRATION", icon: Sliders, status: data.quality_gain > 0 ? "cyan" : "good" },
    { id: "04", label: "DETECTION", icon: Scan, status: data.defects > 0 ? "warning" : "good" },
    { id: "05", label: "STABILITY", icon: Layers, status: data.stability_pct >= 80 ? "good" : "warning" },
    { id: "06", label: "RELIABILITY", icon: ShieldCheck, status: data.reliability >= 75 ? "good" : data.reliability >= 50 ? "warning" : "critical" },
    { id: "07", label: "THI", icon: Gauge, status: thi >= 75 ? "good" : thi >= 40 ? "warning" : "critical" },
    { id: "08", label: "RISK", icon: ShieldAlert, status: risk === 'LOW' ? "good" : risk === 'MEDIUM' ? "warning" : "critical" },
    { id: "09", label: "ACTION", icon: Wrench, status: risk === 'LOW' ? "good" : risk === 'MEDIUM' ? "warning" : "critical" }
  ];

  return (
    <div className="panel visual-pipeline-panel">
      <div className="pipeline-header-bar">
        <span className="pipeline-label">AUTONOMOUS 9-STAGE PIPELINE ARCHITECTURE</span>
      </div>

      <div className="pipeline-horizontal-nodes">
        {stages.map((stage, idx) => {
          const IconComp = stage.icon;
          const isDone = !isInspecting || idx <= activeStageIndex;
          const isCurrent = isInspecting && idx === activeStageIndex;

          let statusClass = "node-good";
          if (stage.status === "warning") statusClass = "node-warning";
          if (stage.status === "critical") statusClass = "node-critical";
          if (stage.status === "cyan") statusClass = "node-cyan";

          return (
            <React.Fragment key={stage.id}>
              <div className={`pipeline-node-item ${isCurrent ? 'node-active-pulse' : ''} ${statusClass}`}>
                <div className="node-circle-icon">
                  {isDone && !isCurrent ? (
                    <Check size={14} className="check-icon" />
                  ) : (
                    <IconComp size={15} />
                  )}
                </div>
                <div className="node-label-wrap">
                  <span className="node-id">{stage.id}</span>
                  <span className="node-name">{stage.label}</span>
                </div>
              </div>

              {idx < stages.length - 1 && (
                <div className="pipeline-node-connector">
                  <ChevronRight size={14} className="connector-arrow" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

