import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import MetricCards from "./components/MetricCards";
import LiveUploadPanel from "./components/LiveUploadPanel";
import PipelineProgressModal from "./components/PipelineProgressModal";
import MainInspectionView from "./components/MainInspectionView";
import SelfCalibrationPanel from "./components/SelfCalibrationPanel";
import ReliabilityPanel from "./components/ReliabilityPanel";
import TrackHealthGauge from "./components/TrackHealthGauge";
import DefectDetectionPanel from "./components/DefectDetectionPanel";
import DecisionSupportPanel from "./components/DecisionSupportPanel";
import CompletePipeline from "./components/CompletePipeline";
import WhySelfCalibration from "./components/WhySelfCalibration";
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
  const [activeStageIndex, setActiveStageIndex] = useState(0);
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

    // Animate stage progress while request completes
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

      // Brief delay to finish showing 9th stage completion animation
      setTimeout(() => {
        setIsInspecting(false);
        setSelectedInspection(liveResult);
      }, 500);

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
        <HeroSection activeInspection={selectedInspection} />

        {/* Live Upload Panel visible in LIVE mode */}
        {activeMode === "LIVE" && (
          <LiveUploadPanel
            backendOnline={backendOnline}
            isInspecting={isInspecting}
            onRunInspection={handleRunLiveInspection}
            uploadError={uploadError}
          />
        )}

        <MetricCards data={selectedInspection} />

        <section className="dashboard-grid grid-2col">
          <MainInspectionView data={selectedInspection} />
          <SelfCalibrationPanel data={selectedInspection} />
        </section>

        <section className="dashboard-grid grid-2col">
          <ReliabilityPanel data={selectedInspection} />
          <TrackHealthGauge data={selectedInspection} />
        </section>

        <section className="dashboard-grid grid-2col">
          <DefectDetectionPanel data={selectedInspection} />
          <DecisionSupportPanel data={selectedInspection} />
        </section>

        <CompletePipeline data={selectedInspection} />

        <WhySelfCalibration />

        {/* Batch Overview & Inspection History Table in HISTORY mode */}
        {activeMode === "HISTORY" ? (
          <>
            <BatchOverview />
            <InspectionHistoryTable
              activeId={selectedInspection?.id}
              onSelectInspection={setSelectedInspection}
            />
          </>
        ) : (
          <section className="history-preview-bar">
            <div className="history-preview-card">
              <span>EXPLORE TEST DATASET</span>
              <p>Switch to <strong>INSPECTION HISTORY</strong> mode to view batch statistics and all 85 processed test dataset images.</p>
              <button className="btn-switch-history" onClick={() => setActiveMode("HISTORY")}>
                View 85-Image Dataset History
              </button>
            </div>
          </section>
        )}
      </main>

      <Footer />

      {/* Animated 9-stage pipeline progress modal */}
      <PipelineProgressModal 
        isOpen={isInspecting} 
        activeStageIndex={activeStageIndex} 
      />
    </div>
  );
}

export default App;