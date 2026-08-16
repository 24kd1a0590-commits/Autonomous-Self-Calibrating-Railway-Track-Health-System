import React from 'react';
import { 
  Camera, 
  Activity, 
  Sparkles, 
  Scan, 
  Layers, 
  ShieldCheck, 
  Gauge, 
  ShieldAlert, 
  Wrench 
} from 'lucide-react';

export default function CompletePipeline({ data }) {
  if (!data) return null;

  const steps = [
    {
      id: "01",
      icon: Camera,
      title: "IMAGE INPUT",
      desc: "Raw railway track image ingestion",
      metric: data.shortName,
      status: "COMPLETED"
    },
    {
      id: "02",
      icon: Activity,
      title: "IMAGE QUALITY ASSESSMENT",
      desc: "Evaluates sharpness, noise & contrast",
      metric: `Q-Before: ${data.quality_before.toFixed(1)}`,
      status: "COMPLETED"
    },
    {
      id: "03",
      icon: Sparkles,
      title: "ADAPTIVE SELF-CALIBRATION",
      desc: "Dynamic enhancement parameter selection",
      metric: data.quality_gain > 0 ? `+${data.quality_gain.toFixed(2)} Gain` : "Optimal",
      status: "COMPLETED"
    },
    {
      id: "04",
      icon: Scan,
      title: "AI DEFECT DETECTION",
      desc: "YOLO crack & gap inference",
      metric: `${data.defects} Defect(s)`,
      status: "COMPLETED"
    },
    {
      id: "05",
      icon: Layers,
      title: "DETECTION STABILITY",
      desc: "Raw vs calibrated IoU consistency",
      metric: `${data.stability_pct}% IoU`,
      status: "COMPLETED"
    },
    {
      id: "06",
      icon: ShieldCheck,
      title: "INSPECTION RELIABILITY",
      desc: "Multi-factor objective trust score",
      metric: `${data.reliability.toFixed(1)} / 100`,
      status: "COMPLETED"
    },
    {
      id: "07",
      icon: Gauge,
      title: "TRACK HEALTH INDEX",
      desc: "Integrated track condition scoring",
      metric: `THI: ${data.thi.toFixed(1)} (${data.condition})`,
      status: "COMPLETED"
    },
    {
      id: "08",
      icon: ShieldAlert,
      title: "RISK ASSESSMENT",
      desc: "Severity & risk level classification",
      metric: `${data.risk_level} RISK`,
      status: "COMPLETED"
    },
    {
      id: "09",
      icon: Wrench,
      title: "DECISION SUPPORT",
      desc: "Actionable maintenance recommendation",
      metric: data.priority,
      status: "COMPLETED"
    }
  ];

  return (
    <div className="panel pipeline-full-panel">
      <div className="panel-header">
        <div>
          <span className="panel-label">END-TO-END SYSTEM ARCHITECTURE</span>
          <h3>COMPLETE INSPECTION & DECISION PIPELINE</h3>
        </div>
        <div className="status-pill cyan">
          <span>9-STAGE PIPELINE ACTIVE</span>
        </div>
      </div>

      <div className="pipeline-steps-grid">
        {steps.map((step, idx) => {
          const IconComp = step.icon;
          return (
            <React.Fragment key={step.id}>
              <div className="pipeline-card-step">
                <div className="step-top-row">
                  <span className="step-num">{step.id}</span>
                  <div className="step-icon-bg">
                    <IconComp size={18} />
                  </div>
                </div>

                <div className="step-content">
                  <h4 className="step-title">{step.title}</h4>
                  <p className="step-desc">{step.desc}</p>
                  <div className="step-metric-badge">
                    {step.metric}
                  </div>
                </div>
              </div>

              {idx < steps.length - 1 && (
                <div className="pipeline-connector">
                  <div className="connector-line"></div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
