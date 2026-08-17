import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import LiveUploadPanel from "./components/LiveUploadPanel";
import CompletePipeline from "./components/CompletePipeline";
import MetricCards from "./components/MetricCards";
import SelfCalibrationPanel from "./components/SelfCalibrationPanel";
import ReliabilityPanel from "./components/ReliabilityPanel";
import DefectDetectionPanel from "./components/DefectDetectionPanel";
import DecisionSupportPanel from "./components/DecisionSupportPanel";
import BatchOverview from "./components/BatchOverview";
import InspectionHistoryTable from "./components/InspectionHistoryTable";
import Footer from "./components/Footer";

import { allInspections, defaultSelectedId } from "./data/inspectionData";
import "./App.css";

const API_BASE = "http://127.0.0.1:8000";

function App() {
  const [activeMode, setActiveMode] = useState("LIVE"); // 'LIVE' | 'HISTORY'
  const [selectedInspection, setSelectedInspection] = useState(() => {
    return allInspections.find((i) => i.id === defaultSelectedId) || allInspections[0];
  });

  const [backendOnline, setBackendOnline] = useState(false);
  const [isInspecting, setIsInspecting] = useState(false);
  const [activeStageIndex, setActiveStageIndex] = useState(8);
  const [uploadError, setUploadError] = useState(null);

  // Check backend health on mount and periodically
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/health`);
        if (res.ok) {
          setBackendOnline(true);
        } else {
          setBackendOnline(false);
        }
      } catch (err) {
        setBackendOnline(false);
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 5000);
    return () => clearInterval(interval);
  }, []);

  // Live Inspection Handler
  const handleRunLiveInspection = async (file) => {
    if (!file) return;

    setUploadError(null);
    setIsInspecting(true);
    setActiveStageIndex(0);

    // Animate 9-stage node progress while request executes
    const stageTimer = setInterval(() => {
      setActiveStageIndex((prev) => (prev < 8 ? prev + 1 : prev));
    }, 450);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_BASE}/api/inspect`, {
        method: "POST",
        body: formData,
      });

      clearInterval(stageTimer);
      setActiveStageIndex(8);

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({ detail: "Inspection failed." }));
        throw new Error(errJson.detail || "Pipeline inspection failed.");
      }

      const liveResult = await response.json();

      setTimeout(() => {
        setIsInspecting(false);
        setSelectedInspection(liveResult);
      }, 300);

    } catch (err) {
      clearInterval(stageTimer);
      setIsInspecting(false);
      setUploadError(err.message || "Failed to connect to Python inspection backend.");
    }
  };

  return (
    <div className="app-container">
      <Header 
        activeMode={activeMode} 
        onSwitchMode={setActiveMode} 
        backendOnline={backendOnline} 
      />

      <main className="dashboard-body">
        {/* Top Hero with THI Radial Gauge */}
        <HeroSection activeInspection={selectedInspection} />

        {activeMode === "LIVE" ? (
          <>
            {/* 1. Main Action: Image Upload & View Area */}
            <LiveUploadPanel
              backendOnline={backendOnline}
              isInspecting={isInspecting}
              onRunInspection={handleRunLiveInspection}
              uploadError={uploadError}
              activeInspection={selectedInspection}
            />

            {/* 2. Visual 9-Stage Node Pipeline directly below image */}
            <CompletePipeline 
              data={selectedInspection} 
              isInspecting={isInspecting} 
              activeStageIndex={activeStageIndex} 
            />

            {/* 3. Four Main Result Cards Only */}
            <MetricCards data={selectedInspection} />

            {/* 4. Self-Calibration & Reliability Grid */}
            <section className="control-grid-2col">
              <SelfCalibrationPanel data={selectedInspection} />
              <ReliabilityPanel data={selectedInspection} />
            </section>

            {/* 5. AI Defect Detection & Decision Support Grid */}
            <section className="control-grid-2col">
              <DefectDetectionPanel data={selectedInspection} />
              <DecisionSupportPanel data={selectedInspection} />
            </section>
          </>
        ) : (
          /* HISTORY MODE */
          <>
            <BatchOverview />
            <InspectionHistoryTable
              activeId={selectedInspection?.id}
              onSelectInspection={(item) => {
                setSelectedInspection(item);
                setActiveMode("LIVE");
              }}
            />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;