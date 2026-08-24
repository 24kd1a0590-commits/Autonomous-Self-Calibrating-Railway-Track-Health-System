import React, { useState, useRef } from 'react';
import { UploadCloud, Play, RefreshCw, AlertCircle, FileImage, Trash2, Image as ImageIcon } from 'lucide-react';
import Tooltip from './Tooltip';
import { getQualityAfter, getDefectCount, getConfidence } from '../utils/formatters';

export default function LiveUploadPanel({ 
  backendOnline, 
  isInspecting, 
  onRunInspection, 
  onSelectTestImage,
  testImages = [],
  uploadError,
  activeInspection,
  onSwitchImageMode
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedTestImage, setSelectedTestImage] = useState("");
  const [fileDimensions, setFileDimensions] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [activeTab, setActiveTab] = useState('FINAL'); // 'ORIGINAL' | 'CALIBRATED' | 'FINAL'
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      alert("Invalid format. Upload JPG or PNG railway track image.");
      return;
    }

    setSelectedFile(file);
    setSelectedTestImage("");

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setImagePreview(dataUrl);

      const img = new Image();
      img.onload = () => {
        setFileDimensions(`${img.width} × ${img.height} px`);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setSelectedTestImage("");
    setImagePreview(null);
    setFileDimensions(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRun = () => {
    if (selectedFile) {
      onRunInspection(selectedFile);
    } else if (selectedTestImage) {
      onSelectTestImage(selectedTestImage);
    }
  };

  const handleDatasetChange = (e) => {
    const filename = e.target.value;
    setSelectedTestImage(filename);
    setSelectedFile(null);
    setImagePreview(null);
    if (filename) {
      onSelectTestImage(filename);
    }
  };

  // Determine current display image URL:
  const currentDisplayedImage = isInspecting
    ? null
    : (selectedFile && imagePreview)
    ? imagePreview
    : activeInspection?.image_urls
    ? (activeTab === 'ORIGINAL' ? activeInspection.image_urls.original :
       activeTab === 'CALIBRATED' ? activeInspection.image_urls.calibrated :
       activeTab === 'FINAL' ? activeInspection.image_urls.annotated :
       activeInspection.image_urls.annotated)
    : activeInspection?.annotated_image || activeInspection?.original_image || null;

  const qualityScore = getQualityAfter(activeInspection).toFixed(1);
  const defectsCount = getDefectCount(activeInspection);
  const confidenceVal = getConfidence(activeInspection).toFixed(2);


  return (
    <div className="live-inspection-main-wrapper">
      {/* 1. Compact Industrial Upload & Dataset Selector Card */}
      <div className="panel upload-industrial-card">
        <div className="panel-micro-title flex-between">
          <span className="flex-center-gap">
            LIVE INSPECTION
            <Tooltip text="Select a test image from dataset or upload a custom railway track image to run the Python self-calibration & YOLO pipeline." />
          </span>
          <span className={`status-pill-small ${backendOnline ? 'online' : 'offline'}`}>
            {backendOnline ? 'SYSTEM READY' : 'BACKEND OFFLINE'}
          </span>
        </div>

        {uploadError && (
          <div className="upload-error-banner">
            <AlertCircle size={15} />
            <span>{uploadError}</span>
          </div>
        )}

        {/* Dataset Image Dropdown Selector */}
        <div className="dataset-selector-box" style={{ marginBottom: '12px' }}>
          <label className="dataset-label font-mono flex-center-gap" style={{ fontSize: '11px', color: '#00f0ff', marginBottom: '4px', display: 'block' }}>
            <ImageIcon size={13} /> SELECT FROM TEST DATASET ({testImages.length} IMAGES AVAILABLE):
          </label>
          <select 
            className="dataset-dropdown font-mono" 
            value={selectedTestImage}
            onChange={handleDatasetChange}
            disabled={isInspecting || !backendOnline}
            style={{
              width: '100%',
              backgroundColor: '#0a0f1d',
              color: '#38bdf8',
              border: '1px solid #1e293b',
              borderRadius: '6px',
              padding: '8px 12px',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            <option value="">-- Choose a Dataset Test Image --</option>
            {testImages.map((img) => (
              <option key={img.filename} value={img.filename}>
                {img.filename}
              </option>
            ))}
          </select>
        </div>

        {!selectedFile ? (
          /* Dropzone state */
          <div 
            className={`compact-dropzone ${dragOver ? 'drag-over' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={(e) => { e.preventDefault(); setDragOver(false); }}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              accept="image/jpeg, image/jpg, image/png"
              style={{ display: 'none' }}
              onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
            />
            <div className="dropzone-content">
              <UploadCloud size={28} className="upload-icon-cyan" />
              <div className="dropzone-text">
                <span className="drop-main">OR UPLOAD CUSTOM IMAGE</span>
                <span className="drop-sub">[ CLICK TO BROWSE ] or [ DRAG & DROP ]</span>
              </div>
            </div>
          </div>
        ) : (
          /* Selected File Card State */
          <div className="selected-file-card">
            <div className="file-info-col">
              <FileImage size={24} className="text-cyan" />
              <div className="file-details">
                <span className="filename-text font-mono">{selectedFile.name}</span>
                <span className="dimensions-text font-mono">{fileDimensions || 'Calculating dimensions...'}</span>
              </div>
            </div>

            <div className="file-actions-row">
              <button 
                className="btn-clear-action"
                onClick={handleClear}
                disabled={isInspecting}
              >
                <Trash2 size={13} /> CLEAR
              </button>

              <button 
                className="btn-run-inspection"
                onClick={handleRun}
                disabled={(!selectedFile && !selectedTestImage) || isInspecting || !backendOnline}
              >
                {isInspecting ? (
                  <>
                    <RefreshCw size={14} className="spin-icon" /> RUNNING...
                  </>
                ) : (
                  <>
                    <Play size={14} /> RUN INSPECTION
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 2. Visual Center Image Viewer */}
      <div className="panel image-center-viewer-panel" style={{ position: 'relative' }}>
        <div className="image-viewer-header">
          <div className="view-tabs">
            <button 
              className={`view-tab-btn ${activeTab === 'ORIGINAL' ? 'active' : ''}`}
              onClick={() => { setActiveTab('ORIGINAL'); if (onSwitchImageMode) onSwitchImageMode('ORIGINAL'); }}
            >
              ORIGINAL
            </button>
            <button 
              className={`view-tab-btn ${activeTab === 'CALIBRATED' ? 'active' : ''}`}
              onClick={() => { setActiveTab('CALIBRATED'); if (onSwitchImageMode) onSwitchImageMode('CALIBRATED'); }}
            >
              CALIBRATED
            </button>
            <button 
              className={`view-tab-btn ${activeTab === 'FINAL' ? 'active' : ''}`}
              onClick={() => { setActiveTab('FINAL'); if (onSwitchImageMode) onSwitchImageMode('FINAL'); }}
            >
              FINAL RESULT
            </button>
          </div>

          {activeInspection && (
            <div className="image-overlay-chips">
              <span className="overlay-chip chip-cyan">QUALITY {qualityScore}</span>
              <span className={`overlay-chip ${defectsCount > 0 ? 'chip-ruby' : 'chip-emerald'}`}>
                DEFECTS {defectsCount}
              </span>
              <span className="overlay-chip chip-blue">CONFIDENCE {confidenceVal}</span>
            </div>
          )}
        </div>

        <div className="main-image-viewport" style={{ position: 'relative', minHeight: '380px' }}>
          {isInspecting ? (
            <div className="viewport-placeholder" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <RefreshCw size={48} className="spin-icon text-cyan" style={{ marginBottom: '16px' }} />
              <span className="text-cyan font-mono" style={{ fontSize: '16px', fontWeight: 'bold', letterSpacing: '1px' }}>
                Analyzing image...
              </span>
              <span className="text-muted font-mono" style={{ fontSize: '12px', marginTop: '6px' }}>
                Running Image Quality Assessment → Self-Calibration → YOLO Detection → Reliability Evaluation
              </span>
            </div>
          ) : currentDisplayedImage ? (
            <img 
              src={currentDisplayedImage} 
              alt="Inspection Visual Stage" 
              className="viewport-img"
              key={currentDisplayedImage}
            />
          ) : (
            <div className="viewport-placeholder">
              <UploadCloud size={40} className="text-dim" />
              <span>SELECT OR UPLOAD A RAILWAY TRACK IMAGE TO VIEW</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

