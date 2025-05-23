import React from 'react';

export default function StatCard({ icon, label, value, change }) {
  return (
    <div className="stat-card shadcn-card">
      <div className="stat-icon-wrapper">
        <div className="stat-icon">
          {icon}
        </div>
        <div className="stat-label">{label}</div>
      </div>
      <div className="stat-content">
        <div className="stat-value">{value}</div>
        <div className="stat-change">{change}</div>
      </div>
    </div>
  );
}
