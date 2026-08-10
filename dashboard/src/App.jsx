import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Gauge,
  ShieldCheck,
  ScanLine,
  Settings2,
  TrainFront,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./App.css";

const qualityData = [
  { name: "Before", value: 60.67 },
  { name: "After", value: 83.75 },
];

function MetricCard({ icon: Icon, title, value, subtitle }) {
  return (
    <div className="metric-card">
      <div className="metric-icon">
        <Icon size={22} />
      </div>

      <div>
        <p>{title}</p>
        <h2>{value}</h2>
        <span>{subtitle}</span>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">
            <TrainFront size={27} />
          </div>

          <div>
            <h1>Railway Track Health</h1>
            <span>Autonomous Inspection Intelligence</span>
          </div>
        </div>

        <div className="system-status">
          <span className="status-dot"></span>
          SYSTEM ONLINE
        </div>
      </header>

      <main className="dashboard">
        <section className="hero">
          <div>
            <span className="eyebrow">AI INSPECTION PLATFORM</span>

            <h2>
              Railway Track
              <br />
              <strong>Health Intelligence</strong>
            </h2>

            <p>
              AI-powered inspection combining adaptive image calibration,
              defect detection and inspection reliability analysis.
            </p>
          </div>

          <div className="inspection-badge">
            <ScanLine size={20} />
            INSPECTION COMPLETE
          </div>
        </section>

        <section className="metrics-grid">
          <MetricCard
            icon={Gauge}
            title="Track Condition Index"
            value="68.64"
            subtitle="FAIR CONDITION"
          />

          <MetricCard
            icon={ShieldCheck}
            title="Inspection Reliability"
            value="64.31"
            subtitle="MODERATE"
          />

          <MetricCard
            icon={Activity}
            title="Image Quality"
            value="83.75"
            subtitle="+23.08 IMPROVEMENT"
          />

          <MetricCard
            icon={AlertTriangle}
            title="Defects Detected"
            value="0"
            subtitle="NO DEFECTS FOUND"
          />
        </section>

        <section className="content-grid">
          <div className="panel image-panel">
            <div className="panel-header">
              <div>
                <span className="panel-label">INSPECTED IMAGE</span>
                <h3>Railway Track Analysis</h3>
              </div>

              <div className="live-tag">
                <span></span>
                ANALYZED
              </div>
            </div>

            <div className="image-placeholder">
              <div className="scan-line"></div>

              <div className="track-visual">
                <div className="rail rail-left"></div>
                <div className="rail rail-right"></div>

                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="sleeper"
                    style={{ top: `${12 + i * 11}%` }}
                  ></div>
                ))}
              </div>

              <div className="image-overlay">
                <span>Image-095</span>
                <span>CALIBRATED</span>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div>
                <span className="panel-label">AI ANALYSIS</span>
                <h3>Inspection Results</h3>
              </div>
            </div>

            <div className="analysis-list">
              <div className="analysis-row">
                <span>Detection Status</span>
                <strong className="success">
                  <CheckCircle2 size={17} />
                  No Defects
                </strong>
              </div>

              <div className="analysis-row">
                <span>Mean Confidence</span>
                <strong>0.00%</strong>
              </div>

              <div className="analysis-row">
                <span>Detection Stability</span>
                <strong>100.00%</strong>
              </div>

              <div className="analysis-row">
                <span>Reliability Status</span>
                <strong>MODERATE</strong>
              </div>

              <div className="analysis-row">
                <span>Maintenance Priority</span>
                <strong className="warning">MEDIUM</strong>
              </div>
            </div>

            <div className="recommendation">
              <Settings2 size={19} />

              <div>
                <span>RECOMMENDATION</span>
                <p>Schedule preventive inspection.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="content-grid lower-grid">
          <div className="panel chart-panel">
            <div className="panel-header">
              <div>
                <span className="panel-label">IMAGE CALIBRATION</span>
                <h3>Quality Improvement</h3>
              </div>

              <strong className="improvement">+23.08</strong>
            </div>

            <div className="chart">
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={qualityData}>
                  <defs>
                    <linearGradient
                      id="qualityGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopOpacity={0.35} />
                      <stop offset="100%" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" opacity={0.12} />

                  <XAxis dataKey="name" />

                  <YAxis domain={[0, 100]} />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="value"
                    strokeWidth={3}
                    fill="url(#qualityGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="panel pipeline-panel">
            <div className="panel-header">
              <div>
                <span className="panel-label">PROCESSING PIPELINE</span>
                <h3>Inspection Flow</h3>
              </div>
            </div>

            <div className="pipeline">
              <div className="pipeline-step complete">
                <span>01</span>
                <div>
                  <strong>Image Quality Assessment</strong>
                  <small>60.67 → 83.75</small>
                </div>
              </div>

              <div className="pipeline-line"></div>

              <div className="pipeline-step complete">
                <span>02</span>
                <div>
                  <strong>Adaptive Calibration</strong>
                  <small>Brightness • CLAHE • Denoising</small>
                </div>
              </div>

              <div className="pipeline-line"></div>

              <div className="pipeline-step complete">
                <span>03</span>
                <div>
                  <strong>AI Crack Detection</strong>
                  <small>YOLO inspection model</small>
                </div>
              </div>

              <div className="pipeline-line"></div>

              <div className="pipeline-step complete">
                <span>04</span>
                <div>
                  <strong>Reliability Assessment</strong>
                  <small>64.31 / 100</small>
                </div>
              </div>

              <div className="pipeline-line"></div>

              <div className="pipeline-step complete">
                <span>05</span>
                <div>
                  <strong>Track Condition Index</strong>
                  <small>68.64 / 100 • FAIR</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer>
          <span>Railway Track Health Monitoring System</span>
          <span>AI / ML • Computer Vision • Reliability Intelligence</span>
        </footer>
      </main>
    </div>
  );
}

export default App;