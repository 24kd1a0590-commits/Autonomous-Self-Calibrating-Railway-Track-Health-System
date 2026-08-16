import React, { useState } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import MetricCards from "./components/MetricCards";
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

function App() {
  const [selectedInspection, setSelectedInspection] = useState(() => {
    return allInspections.find((i) => i.id === defaultSelectedId) || allInspections[0];
  });

  return (
    <div className="app-container">
      <Header />

      <main className="dashboard-body">
        <HeroSection activeInspection={selectedInspection} />

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

        <BatchOverview />

        <InspectionHistoryTable
          activeId={selectedInspection?.id}
          onSelectInspection={setSelectedInspection}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;