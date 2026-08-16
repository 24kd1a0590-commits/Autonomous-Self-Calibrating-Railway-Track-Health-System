import React from 'react';
import { 
  Activity, 
  Sparkles, 
  Scan, 
  Layers, 
  ShieldCheck, 
  Gauge, 
  ShieldAlert, 
  Wrench, 
  Camera, 
  Loader2, 
  CheckCircle2 
} from 'lucide-react';

export default function PipelineProgressModal({ isOpen, activeStageIndex }) {
  if (!isOpen) return null;

  const stages = [
    { id: "01", name: "Image Quality Assessment", icon: Camera },
    { id: "02", name: "Adaptive Self-Calibration", icon: Sparkles },
    { id: "03", name: "AI Defect Detection", icon: Scan },
    { id: "04", name: "Detection Stability", icon: Layers },
    { id: "05", name: "Inspection Reliability", icon: ShieldCheck },
    { id: "06", name: "Defect Analysis", icon: Activity },
    { id: "07", name: "Track Health Index", icon: Gauge },
    { id: "08", name: "Risk Assessment", icon: ShieldAlert },
    { id: "09", name: "Decision Support", icon: Wrench }
  ];

  return (
    <div className="pipeline-modal-backdrop">
      <div className="pipeline-modal-box">
        <div className="modal-header">
          <div className="modal-title-wrap">
            <Loader2 size={24} className="spin-icon text-cyan" />
            <div>
              <h3>EXECUTING AUTONOMOUS INSPECTION PIPELINE</h3>
              <p>Self-validating computer vision assessment in progress...</p>
            </div>
          </div>
        </div>

        <div className="pipeline-modal-steps-list">
          {stages.map((stage, idx) => {
            const IconComp = stage.icon;
            const isDone = idx < activeStageIndex;
            const isCurrent = idx === activeStageIndex;
            const isWaiting = idx > activeStageIndex;

            return (
              <div 
                key={stage.id} 
                className={`modal-stage-row ${isDone ? 'done' : isCurrent ? 'current' : 'waiting'}`}
              >
                <div className="stage-row-left">
                  <span className="stage-row-num">{stage.id}</span>
                  <IconComp size={16} className="stage-row-icon" />
                  <span className="stage-row-name">{stage.name}</span>
                </div>

                <div className="stage-row-right">
                  {isDone && (
                    <span className="stage-status-badge badge-done">
                      <CheckCircle2 size={13} /> COMPLETED
                    </span>
                  )}
                  {isCurrent && (
                    <span className="stage-status-badge badge-processing">
                      <Loader2 size={13} className="spin-icon" /> PROCESSING...
                    </span>
                  )}
                  {isWaiting && (
                    <span className="stage-status-badge badge-waiting">
                      WAITING
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
