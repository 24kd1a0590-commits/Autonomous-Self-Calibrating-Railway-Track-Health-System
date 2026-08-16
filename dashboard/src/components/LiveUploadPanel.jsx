import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Play, RefreshCw, AlertCircle, CheckCircle2, FileText, Activity } from 'lucide-react';

export default function LiveUploadPanel({ backendOnline, isInspecting, onRunInspection, uploadError }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageSpecs, setImageSpecs] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file) return;

    // Validate type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      alert("Invalid file format. Please upload a JPG, JPEG, or PNG railway track image.");
      return;
    }

    setSelectedFile(file);

    // Read preview and dimensions
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
      const img = new Image();
      img.onload = () => {
        setImageSpecs({
          width: img.width,
          height: img.height,
          sizeKB: (file.size / 1024).toFixed(1)
        });
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
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
    setImageSpecs(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRun = () => {
    if (!selectedFile) return;
    onRunInspection(selectedFile);
  };

  return (
    <div className="panel live-upload-panel">
      <div className="panel-header">
        <div>
          <span className="panel-label">REAL-TIME INSPECTION WORKFLOW</span>
          <h3>LIVE TRACK INSPECTION</h3>
          <span className="panel-subtitle">Upload railway image for autonomous health assessment</span>
        </div>

        <div className={`status-pill ${backendOnline ? 'emerald' : 'amber'}`}>
          <Activity size={14} />
          {backendOnline ? '● BACKEND SERVICE ONLINE' : '▲ DISCONNECTED (START APP.PY)'}
        </div>
      </div>

      {!backendOnline && (
        <div className="backend-offline-alert">
          <AlertCircle size={18} />
          <div>
            <strong>Inspection Service Offline:</strong> Please start the Python API server by running <code>python app.py</code> at <code>http://127.0.0.1:8000</code>.
          </div>
        </div>
      )}

      {uploadError && (
        <div className="upload-error-alert">
          <AlertCircle size={18} />
          <span>{uploadError}</span>
        </div>
      )}

      <div className="upload-workspace-grid">
        <div 
          className={`dropzone-box ${dragOver ? 'drag-over' : ''} ${imagePreview ? 'has-preview' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !imagePreview && fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            accept="image/jpeg, image/jpg, image/png"
            style={{ display: 'none' }}
            onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
          />

          {!imagePreview ? (
            <div className="dropzone-content">
              <div className="upload-icon-bg">
                <UploadCloud size={36} />
              </div>
              <h4>Drag & Drop Railway Image Here</h4>
              <p>Supports JPG, JPEG, PNG format</p>
              <button 
                type="button" 
                className="btn-choose-file"
                onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
              >
                Choose Image
              </button>
            </div>
          ) : (
            <div className="preview-content">
              <img src={imagePreview} alt="Selected Preview" className="preview-image" />
              <div className="preview-overlay-tag">
                <CheckCircle2 size={14} /> IMAGE LOADED & READY
              </div>
            </div>
          )}
        </div>

        <div className="upload-details-card">
          <div className="details-header">
            <FileText size={16} className="text-cyan" />
            <span>SELECTED IMAGE SPECIFICATIONS</span>
          </div>

          {selectedFile ? (
            <div className="file-specs-list">
              <div className="spec-row">
                <span className="spec-label">Filename</span>
                <strong className="spec-val text-truncate">{selectedFile.name}</strong>
              </div>

              <div className="spec-row">
                <span className="spec-label">File Size</span>
                <strong className="spec-val">{imageSpecs ? `${imageSpecs.sizeKB} KB` : '...'}</strong>
              </div>

              <div className="spec-row">
                <span className="spec-label">Dimensions</span>
                <strong className="spec-val">
                  {imageSpecs ? `${imageSpecs.width} × ${imageSpecs.height} px` : 'Loading...'}
                </strong>
              </div>

              <div className="spec-row">
                <span className="spec-label">Inspection Target</span>
                <strong className="spec-val text-emerald">YOLO + Self-Calibration</strong>
              </div>

              <div className="action-buttons-row">
                <button 
                  className="btn-run-inspection"
                  onClick={handleRun}
                  disabled={isInspecting || !backendOnline}
                >
                  {isInspecting ? (
                    <>
                      <RefreshCw size={16} className="spin-icon" /> PROCESSING...
                    </>
                  ) : (
                    <>
                      <Play size={16} /> RUN INSPECTION
                    </>
                  )}
                </button>

                <button 
                  className="btn-clear-image"
                  onClick={handleClear}
                  disabled={isInspecting}
                >
                  CLEAR
                </button>
              </div>
            </div>
          ) : (
            <div className="no-file-prompt">
              <ImageIcon size={32} className="text-dim" />
              <p>Select or drag a railway image to enable pipeline inspection execution.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
