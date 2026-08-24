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

import { fetchHealth, fetchTestImages, inspectImageFile, inspectTestImage } from "./services/api";
import "./App.css";

function App() {
  const [activeMode, setActiveMode] = useState("LIVE"); // 'LIVE' | 'HISTORY'
  const [selectedInspection, setSelectedInspection] = useState(null);
  const [testImages, setTestImages] = useState([]);

  const [backendOnline, setBackendOnline] = useState(false);
  const [isInspecting, setIsInspecting] = useState(false);
  const [activeStageIndex, setActiveStageIndex] = useState(8);
  const [uploadError, setUploadError] = useState(null);

  // Check backend health & fetch test dataset images on mount and periodically
  useEffect(() => {
    let mounted = true;

    const initBackend = async () => {
      const isOnline = await fetchHealth();
      if (!mounted) return;
      setBackendOnline(isOnline);

      if (isOnline) {
        const imagesList = await fetchTestImages();
        if (!mounted) return;
        setTestImages(imagesList);

        // Auto-run inspection on first dataset image if no active inspection exists
        if (imagesList.length > 0 && !selectedInspection) {
          runInspectionForDatasetImage(imagesList[0].filename);
        }
      }
    };

    initBackend();
    const interval = setInterval(async () => {
      const isOnline = await fetchHealth();
      if (mounted) setBackendOnline(isOnline);
    }, 5000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  // Run inspection for uploaded custom image file
  const handleRunLiveInspection = async (file) => {
    if (!file) return;

    setUploadError(null);
    setIsInspecting(true);
    setActiveStageIndex(0);

    const stageTimer = setInterval(() => {
      setActiveStageIndex((prev) => (prev < 8 ? prev + 1 : prev));
    }, 450);

    try {
      const liveResult = await inspectImageFile(file);

      clearInterval(stageTimer);
      setActiveStageIndex(8);

      setTimeout(() => {
        setIsInspecting(false);
        setSelectedInspection(liveResult);
      }, 200);
    } catch (err) {
      clearInterval(stageTimer);
      setIsInspecting(false);
      setUploadError(err.message || "Failed to execute Python inspection pipeline.");
    }
  };

  // Run inspection for dataset image by filename
  const runInspectionForDatasetImage = async (filename) => {
    if (!filename) return;

    setUploadError(null);
    setIsInspecting(true);
    setActiveStageIndex(0);

    const stageTimer = setInterval(() => {
      setActiveStageIndex((prev) => (prev < 8 ? prev + 1 : prev));
    }, 400);

    try {
      const liveResult = await inspectTestImage(filename);

      clearInterval(stageTimer);
      setActiveStageIndex(8);

      setTimeout(() => {
        setIsInspecting(false);
        setSelectedInspection(liveResult);
      }, 200);
    } catch (err) {
      clearInterval(stageTimer);
      setIsInspecting(false);
      setUploadError(err.message || `Failed to process dataset image '${filename}'.`);
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
        {activeMode === "LIVE" ? (
          <>
            {/* 1. Main Action: Dropzone & Dataset Selector & Viewport */}
            <LiveUploadPanel
              backendOnline={backendOnline}
              isInspecting={isInspecting}
              onRunInspection={handleRunLiveInspection}
              onSelectTestImage={runInspectionForDatasetImage}
              testImages={testImages}
              uploadError={uploadError}
              activeInspection={selectedInspection}
            />

            {/* 2. Compact 9-Stage Visual Pipeline */}
            <CompletePipeline 
              data={selectedInspection} 
              isInspecting={isInspecting} 
              activeStageIndex={activeStageIndex} 
            />

            {/* 3. Four Main Dominant Metric Cards */}
            <MetricCards data={selectedInspection} />

            {/* 4. Visual 2-Column Grid Row 1: THI Arc Gauge & Reliability Breakdown */}
            <section className="control-grid-2col">
              <HeroSection activeInspection={selectedInspection} />
              <ReliabilityPanel data={selectedInspection} />
            </section>

            {/* 5. Visual 2-Column Grid Row 2: Self-Calibration & Decision Support */}
            <section className="control-grid-2col">
              <SelfCalibrationPanel data={selectedInspection} />
              <DecisionSupportPanel data={selectedInspection} />
            </section>

            {/* 6. Collapsible Inspection History Section at Bottom */}
            <InspectionHistoryTable
              activeId={selectedInspection?.id}
              testImages={testImages}
              onSelectInspection={(item) => {
                const imgName = item.filename || item.image || item.id;
                runInspectionForDatasetImage(imgName);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              defaultExpanded={false}
            />
          </>
        ) : (
          /* HISTORY MODE */
          <>
            <BatchOverview />
            <InspectionHistoryTable
              activeId={selectedInspection?.id}
              testImages={testImages}
              onSelectInspection={(item) => {
                const imgName = item.filename || item.image || item.id;
                runInspectionForDatasetImage(imgName);
                setActiveMode("LIVE");
              }}
              defaultExpanded={true}
            />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;