import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, History } from 'lucide-react';
import { allInspections } from '../data/inspectionData';
import Tooltip from './Tooltip';

export default function InspectionHistoryTable({ activeId, onSelectInspection, defaultExpanded = false }) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [filterCondition, setFilterCondition] = useState('ALL');

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
      <div className="history-header-bar flex-between">
        <div className="flex-center-gap">
          <History size={16} className="text-cyan" />
          <h3 className="history-title">INSPECTION HISTORY</h3>
          <span className="count-badge font-mono">{allInspections.length} INSPECTIONS</span>
          <Tooltip text="Database of 85 historical inspection runs with filters, charts, and track health scores." />
        </div>

        <div className="history-header-actions">
          {isExpanded && (
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
          )}

          <button 
            className="btn-toggle-history"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                <ChevronUp size={14} /> HIDE HISTORY
              </>
            ) : (
              <>
                <ChevronDown size={14} /> VIEW HISTORY
              </>
            )}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="table-scroll-wrap">
          <table className="compact-control-table">
            <thead>
              <tr>
                <th>IMAGE</th>
                <th>THI</th>
                <th>DEFECTS</th>
                <th>RELIABILITY</th>
                <th>RISK</th>
                <th>RECOMMENDED ACTION</th>
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
      )}
    </div>
  );
}
