import React, { useState, useMemo } from 'react';
import { allInspections } from '../data/inspectionData';
import { Search, Filter, ArrowUpDown, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function InspectionHistoryTable({ activeId, onSelectInspection }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('ALL');
  const [defectFilter, setDefectFilter] = useState('ALL');
  const [sortField, setSortField] = useState('image');
  const [sortAsc, setSortAsc] = useState(true);

  const filteredData = useMemo(() => {
    return allInspections.filter(item => {
      const matchesSearch = item.image.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.shortName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRisk = riskFilter === 'ALL' || item.risk_level === riskFilter;
      const matchesDefect = defectFilter === 'ALL' || 
                            (defectFilter === 'DEFECTS' && item.defects > 0) ||
                            (defectFilter === 'CLEAN' && item.defects === 0);

      return matchesSearch && matchesRisk && matchesDefect;
    }).sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (typeof aVal === 'string') {
        return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortAsc ? aVal - bVal : bVal - aVal;
    });
  }, [searchTerm, riskFilter, defectFilter, sortField, sortAsc]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <div className="panel history-table-panel">
      <div className="panel-header">
        <div>
          <span className="panel-label">INTERACTIVE CONTROL CENTER</span>
          <h3>INSPECTION HISTORY & BATCH RECORDS ({filteredData.length} IMAGES)</h3>
        </div>
        <div className="status-pill cyan">
          <span>SELECT ROW TO LOAD METRICS</span>
        </div>
      </div>

      <div className="table-controls-bar">
        <div className="search-input-wrap">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search image filename..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-dropdowns">
          <div className="select-wrap">
            <Filter size={14} />
            <select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)}>
              <option value="ALL">All Risk Levels</option>
              <option value="HIGH">HIGH Risk</option>
              <option value="MEDIUM">MEDIUM Risk</option>
              <option value="LOW">LOW Risk</option>
            </select>
          </div>

          <div className="select-wrap">
            <select value={defectFilter} onChange={(e) => setDefectFilter(e.target.value)}>
              <option value="ALL">All Detections</option>
              <option value="DEFECTS">Has Defects (&gt; 0)</option>
              <option value="CLEAN">No Defects (0)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="table-responsive-container">
        <table className="inspection-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('shortName')}>
                IMAGE <ArrowUpDown size={12} />
              </th>
              <th onClick={() => handleSort('quality_before')}>
                Q-BEFORE <ArrowUpDown size={12} />
              </th>
              <th onClick={() => handleSort('quality_after')}>
                Q-AFTER <ArrowUpDown size={12} />
              </th>
              <th onClick={() => handleSort('stability')}>
                STABILITY <ArrowUpDown size={12} />
              </th>
              <th onClick={() => handleSort('defects')}>
                DEFECTS <ArrowUpDown size={12} />
              </th>
              <th onClick={() => handleSort('reliability')}>
                RELIABILITY <ArrowUpDown size={12} />
              </th>
              <th onClick={() => handleSort('thi')}>
                THI <ArrowUpDown size={12} />
              </th>
              <th onClick={() => handleSort('condition')}>
                CONDITION <ArrowUpDown size={12} />
              </th>
              <th onClick={() => handleSort('risk_level')}>
                RISK <ArrowUpDown size={12} />
              </th>
              <th>RECOMMENDATION</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => {
              const isSelected = item.id === activeId;
              const isHighRisk = item.risk_level === 'HIGH';

              return (
                <tr 
                  key={item.id} 
                  className={`table-row ${isSelected ? 'selected-row' : ''}`}
                  onClick={() => onSelectInspection(item)}
                >
                  <td className="font-mono text-bold">
                    {isSelected && <span className="active-dot">●</span>}
                    {item.shortName}
                  </td>
                  <td>{item.quality_before.toFixed(1)}</td>
                  <td className="text-cyan">{item.quality_after.toFixed(1)}</td>
                  <td>{item.stability_pct}%</td>
                  <td className={item.defects > 0 ? "text-ruby font-bold" : "text-emerald"}>
                    {item.defects}
                  </td>
                  <td className="text-bold">{item.reliability.toFixed(1)}</td>
                  <td className="text-amber font-bold">{item.thi.toFixed(1)}</td>
                  <td>
                    <span className={`cond-badge cond-${item.condition.toLowerCase()}`}>
                      {item.condition}
                    </span>
                  </td>
                  <td>
                    <span className={`risk-tag risk-${item.risk_level.toLowerCase()}`}>
                      {item.risk_level}
                    </span>
                  </td>
                  <td className="text-ellipsis">{item.recommendation}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
