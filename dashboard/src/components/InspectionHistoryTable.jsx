import React, { useState, useMemo } from 'react';
import { allInspections } from '../data/inspectionData';

export default function InspectionHistoryTable({ activeId, onSelectInspection }) {
  const [filterCondition, setFilterCondition] = useState('ALL'); // ALL, GOOD, MODERATE, POOR, CRITICAL

  const filteredData = useMemo(() => {
    if (filterCondition === 'ALL') return allInspections;
    return allInspections.filter(item => {
      const cond = (item.condition || '').toUpperCase();
      if (filterCondition === 'MODERATE') {
        return cond === 'MODERATE' || cond === 'FAIR';
      }
      return cond === filterCondition;
    });
  }, [filterCondition]);

  return (
    <div className="panel visual-history-panel">
      <div className="history-header-bar">
        <h3>INSPECTION HISTORY ({filteredData.length})</h3>

        {/* Simple Filters */}
        <div className="history-filter-pills">
          {['ALL', 'GOOD', 'MODERATE', 'POOR', 'CRITICAL'].map((cond) => (
            <button
              key={cond}
              className={`filter-pill-btn ${filterCondition === cond ? 'active' : ''}`}
              onClick={() => setFilterCondition(cond)}
            >
              {cond}
            </button>
          ))}
        </div>
      </div>

      <div className="table-scroll-wrap">
        <table className="compact-control-table">
          <thead>
            <tr>
              <th>IMAGE</th>
              <th>THI</th>
              <th>DEFECTS</th>
              <th>RELIABILITY</th>
              <th>RISK</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => {
              const isSelected = item.id === activeId;
              const thi = (item.thi ?? 0).toFixed(1);
              const rel = (item.reliability ?? 0).toFixed(1);
              const defects = item.defects ?? 0;
              const risk = (item.risk_level || 'LOW').toUpperCase();
              const action = (item.recommendation || 'MONITOR').toUpperCase();

              const condClass = item.condition === 'GOOD' ? 'text-emerald' : item.condition === 'POOR' ? 'text-amber' : item.condition === 'CRITICAL' ? 'text-ruby' : 'text-cyan';
              const riskClass = risk === 'LOW' ? 'badge-good' : risk === 'MEDIUM' ? 'badge-warning' : 'badge-critical';

              return (
                <tr 
                  key={item.id} 
                  className={`table-row-item ${isSelected ? 'row-selected' : ''}`}
                  onClick={() => onSelectInspection(item)}
                >
                  <td className="col-image font-mono">
                    {isSelected && <span className="active-cyan-dot">●</span>}
                    {item.shortName || item.image}
                  </td>
                  <td className={`col-thi font-mono ${condClass}`}>{thi}</td>
                  <td className={`col-defects font-mono ${defects > 0 ? 'text-ruby' : 'text-emerald'}`}>
                    {defects}
                  </td>
                  <td className="col-rel font-mono">{rel}</td>
                  <td className="col-risk">
                    <span className={`risk-tag-sm ${riskClass}`}>{risk}</span>
                  </td>
                  <td className="col-action text-ellipsis">{action}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

