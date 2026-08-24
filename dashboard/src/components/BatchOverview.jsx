import React from 'react';
import { 
  PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { riskDistribution, conditionDistribution } from '../data/inspectionData';
import Tooltip from './Tooltip';

export default function BatchOverview() {
  return (
    <div className="panel visual-batch-analytics-panel">
      <div className="panel-micro-title flex-between">
        <span className="flex-center-gap">
          BATCH INSPECTION ANALYTICS
          <Tooltip text="Aggregate statistical distribution across the 85-image inspection dataset." />
        </span>
        <span className="analytics-dataset-tag font-mono">
          DATASET: 85 FRAMES
        </span>
      </div>

      <div className="two-charts-grid">
        {/* 1. Track condition distribution */}
        <div className="chart-card">
          <span className="chart-card-title">TRACK CONDITION DISTRIBUTION</span>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={conditionDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#182232" />
                <XAxis dataKey="name" stroke="#6b7280" tick={{ fontSize: 10 }} />
                <YAxis stroke="#6b7280" tick={{ fontSize: 10 }} />
                <RechartsTooltip contentStyle={{ backgroundColor: "#0e131f", borderColor: "#1e283a", color: "#f3f4f6" }} />
                <Bar dataKey="value" fill="#00f0ff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Risk distribution */}
        <div className="chart-card">
          <span className="chart-card-title">RISK LEVEL DISTRIBUTION</span>
          <div className="chart-container pie-flex">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ backgroundColor: "#0e131f", borderColor: "#1e283a", color: "#f3f4f6" }} />
              </PieChart>
            </ResponsiveContainer>

            <div className="compact-pie-legend">
              {riskDistribution.map((item, idx) => (
                <div key={idx} className="legend-item">
                  <span className="legend-dot" style={{ backgroundColor: item.color }}></span>
                  <span className="legend-label">{item.name}</span>
                  <span className="legend-count font-mono">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
