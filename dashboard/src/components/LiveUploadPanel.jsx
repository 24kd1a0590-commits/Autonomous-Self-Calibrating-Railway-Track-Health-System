import React, { useState, useRef } from 'react';
import { UploadCloud, Play, RefreshCw, AlertCircle, Image as ImageIcon } from 'lucide-react';

export default function LiveUploadPanel({ 
  backendOnline, 
  isInspecting, 
  onRunInspection, 
  uploadError,
  activeInspection,
  onSwitchImageMode
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [activeTab, setActiveTab] = useState('RESULT'); // 'ORIGINAL' | 'CALIBRATED' | 'RESULT'
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
      setImagePreview(e.target.result);
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
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRun = () => {
    if (!selectedFile) return;
    onRunInspection(selectedFile);
  };

  // Determine current display image:
  // If user uploaded a new image preview before running inspection -> show preview
  // Else if activeInspection exists -> show corresponding image url from tabs
  const currentDisplayedImage = selectedFile && imagePreview
    ? imagePreview
    : activeInspection?.image_urls
    ? (activeTab === 'ORIGINAL' ? activeInspection.image_urls.original :
       activeTab === 'CALIBRATED' ? activeInspection.image_urls.calibrated :
       activeInspection.image_urls.annotated)
    : null;

  return (
    <div className="panel live-inspection-upload-panel">
      {uploadError && (
        <div className="upload-error-banner">
          <AlertCircle size={16} />
          <span>{uploadError}</span>
        </div>
      )}

      <div className="upload-control-header">
        <div className="view-mode-tabs-bar">
          <button 
            className={`tab-btn ${activeTab === 'ORIGINAL' ? 'active' : ''}`}
            onClick={() => { setActiveTab('ORIGINAL'); if (onSwitchImageMode) onSwitchImageMode('ORIGINAL'); }}
          >
            ORIGINAL
          </button>
          <button 
            className={`tab-btn ${activeTab === 'CALIBRATED' ? 'active' : ''}`}
            onClick={() => { setActiveTab('CALIBRATED'); if (onSwitchImageMode) onSwitchImageMode('CALIBRATED'); }}
          >
            CALIBRATED
          </button>
          <button 
            className={`tab-btn ${activeTab === 'RESULT' ? 'active' : ''}`}
            onClick={() => { setActiveTab('RESULT'); if (onSwitchImageMode) onSwitchImageMode('RESULT'); }}
          >
            RESULT
          </button>
        </div>

        <div className="upload-action-buttons">
          {selectedFile && (
            <button 
              className="btn-clear-action" 
              onClick={handleClear}
              disabled={isInspecting}
            >
              CLEAR
            </button>
          )}

          <button 
            className="btn-run-inspection"
            onClick={handleRun}
            disabled={!selectedFile || isInspecting || !backendOnline}
          >
            {isInspecting ? (
              <>
                <RefreshCw size={16} className="spin-icon" /> RUNNING...
              </>
            ) : (
              <>
                <Play size={16} /> RUN INSPECTION
              </>
            )}
          </button>
        </div>
      </div>

      <div className="main-display-area">
        {/* Large Upload Dropzone when no file selected and no image URL */}
        {!selectedFile && !currentDisplayedImage ? (
          <div 
            className={`dropzone-box-large ${dragOver ? 'drag-over' : ''}`}
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
            <div className="dropzone-inner">
              <UploadCloud size={48} className="upload-icon-cyan" />
              <h3>DROP RAILWAY IMAGE HERE</h3>
              <button 
                type="button" 
                className="btn-upload-trigger"
                onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
              >
                Upload Image
              </button>
              <span className="file-format-hint">JPG / PNG</span>
            </div>
          </div>
        ) : (
          /* Prominently Show Active Image View */
          <div className="image-stage-container">
            <input 
              type="file" 
              ref={fileInputRef} 
              accept="image/jpeg, image/jpg, image/png"
              style={{ display: 'none' }}
              onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
            />

            <img 
              src={currentDisplayedImage} 
              alt="Railway Track Frame" 
              className="stage-image-main" 
            />

            <div className="image-stage-overlay-actions">
              <button 
                className="btn-reupload-floating"
                onClick={() => fileInputRef.current?.click()}
              >
                <UploadCloud size={14} /> Upload New Image
              </button>
              <span className="view-tag-indicator">
                {selectedFile ? 'NEW UPLOAD PREVIEW' : `VIEW: ${activeTab}`}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

