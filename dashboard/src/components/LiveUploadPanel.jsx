import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, Play, RefreshCw, AlertCircle, FileImage, Trash2, CheckCircle2 } from 'lucide-react';
import Tooltip from './Tooltip';

export default function LiveUploadPanel({ 
  backendOnline, 
  isInspecting, 
  onRunInspection, 
  uploadError,
  activeInspection,
  onSwitchImageMode
}) {
  const [selectedFile, setSelectedFile] = useState(null);
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

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setImagePreview(dataUrl);

      // Measure dimensions
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
    setImagePreview(null);
    setFileDimensions(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRun = () => {
    if (!selectedFile) return;
    onRunInspection(selectedFile);
  };

  // Determine current display image:
  // If activeInspection exists and user has NOT selected a new pending upload:
  // tab ORIGINAL -> image_urls.original
  // tab CALIBRATED -> image_urls.calibrated
  // tab FINAL -> image_urls.annotated
  const currentDisplayedImage = selectedFile && imagePreview
    ? imagePreview
    : activeInspection?.image_urls
    ? (activeTab === 'ORIGINAL' ? activeInspection.image_urls.original :
       activeTab === 'CALIBRATED' ? activeInspection.image_urls.calibrated :
       activeInspection.image_urls.annotated)
    : null;

  const qualityScore = (activeInspection?.quality_after ?? 0).toFixed(1);
  const defectsCount = activeInspection?.defects ?? 0;
  const confidenceVal = (activeInspection?.confidence ?? 0).toFixed(2);

  return (
    <div className="live-inspection-main-wrapper">
      {/* 1. Compact Industrial Upload Card */}
      <div className="panel upload-industrial-card">
        <div className="panel-micro-title flex-between">
          <span className="flex-center-gap">
            LIVE INSPECTION
            <Tooltip text="Upload a railway track image to execute the 9-stage autonomous inspection pipeline." />
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
              <UploadCloud size={32} className="upload-icon-cyan" />
              <div className="dropzone-text">
                <span className="drop-main">Drop railway image here</span>
                <span className="drop-sub">[ CHOOSE IMAGE ] or [ DRAG & DROP ]</span>
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
                disabled={!selectedFile || isInspecting || !backendOnline}
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
      <div className="panel image-center-viewer-panel">
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

        <div className="main-image-viewport">
          {currentDisplayedImage ? (
            <img 
              src={currentDisplayedImage} 
              alt="Inspection Visual Stage" 
              className="viewport-img"
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
