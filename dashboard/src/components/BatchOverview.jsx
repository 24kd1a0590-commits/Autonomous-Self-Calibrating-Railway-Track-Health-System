import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area, CartesianGrid 
} from 'recharts';
import { summaryStats, thiBins, riskDistribution, conditionDistribution, qualityGainSamples } from '../data/inspectionData';
import { BarChart3, PieChart as PieIcon, TrendingUp } from 'lucide-react';

export default function BatchOverview() {
  return (
    <div className="panel batch-overview-panel">
      <div className="panel-header">
        <div>
          <span className="panel-label">DATASET VALIDATION ANALYTICS</span>
          <h3>BATCH INSPECTION OVERVIEW (85 TEST IMAGES)</h3>
        </div>
        <div className="status-pill blue">
          <BarChart3 size={14} /> EVALUATION SUMMARY
        </div>
      </div>

      <div className="batch-stats-summary-grid">
        <div className="batch-stat-card">
          <span className="bstat-label">TOTAL IMAGES</span>
          <span className="bstat-num">{summaryStats.totalInspections}</span>
          <small className="bstat-sub">Test Dataset Frames</small>
        </div>

        <div className="batch-stat-card">
          <span className="bstat-label">DEFECTS FOUND</span>
          <span className="bstat-num text-ruby">{summaryStats.defectsDetectedCount}</span>
          <small className="bstat-sub">{summaryStats.defectFreeCount} Defect Free</small>
        </div>

        <div className="batch-stat-card">
          <span className="bstat-label">AVG TRACK HEALTH</span>
          <span className="bstat-num text-amber">{summaryStats.avgTHI}</span>
          <small className="bstat-sub">Out of 100 THI</small>
        </div>

        <div className="batch-stat-card">
          <span className="bstat-label">AVG RELIABILITY</span>
          <span className="bstat-num text-cyan">{summaryStats.avgReliability}</span>
          <small className="bstat-sub">High Confidence Trust</small>
        </div>

        <div className="batch-stat-card">
          <span className="bstat-label">AVG QUALITY GAIN</span>
          <span className="bstat-num text-emerald">+{summaryStats.avgQualityGain}</span>
          <small className="bstat-sub">{summaryStats.avgQualityBefore} → {summaryStats.avgQualityAfter}</small>
        </div>
      </div>

      <div className="charts-grid-two">
        <div className="chart-box">
          <div className="chart-box-header">
            <BarChart3 size={16} />
            <span>Track Health Index (THI) Distribution</span>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={thiBins}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2638" />
                <XAxis dataKey="range" stroke="#6b7280" tick={{ fontSize: 11 }} />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#121620", borderColor: "#1e2638", borderRadius: "8px", color: "#f3f4f6" }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-box">
          <div className="chart-box-header">
            <PieIcon size={16} />
            <span>Risk Level Distribution</span>
          </div>
          <div className="chart-wrapper pie-chart-flex">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: "#121620", borderColor: "#1e2638", borderRadius: "8px", color: "#f3f4f6" }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="pie-legend">
              {riskDistribution.map((item, idx) => (
                <div key={idx} className="legend-row">
                  <span className="legend-dot" style={{ backgroundColor: item.color }}></span>
                  <span className="legend-name">{item.name}</span>
                  <strong className="legend-val">{item.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="chart-box full-width-chart">
        <div className="chart-box-header">
          <TrendingUp size={16} />
          <span>Quality Improvement Before vs After Adaptive Calibration (Sample Test Frames)</span>
        </div>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={qualityGainSamples}>
              <defs>
                <linearGradient id="qAfterGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2638" />
              <XAxis dataKey="name" stroke="#6b7280" tick={{ fontSize: 10 }} />
              <YAxis domain={[50, 100]} stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: "#121620", borderColor: "#1e2638", borderRadius: "8px", color: "#f3f4f6" }}
              />
              <Area type="monotone" dataKey="before" name="Quality Before" stroke="#6b7280" fill="transparent" strokeDasharray="4 4" strokeWidth={2} />
              <Area type="monotone" dataKey="after" name="Quality After" stroke="#06b6d4" fillOpacity={1} fill="url(#qAfterGrad)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
