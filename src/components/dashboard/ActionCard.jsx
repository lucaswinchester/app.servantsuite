import React from 'react';

export default function ActionCard({ icon, title, description }) {
  return (
    <div className="action-card shadcn-card">
      <div className="action-icon">
        {icon}
      </div>
      <div className="action-title">{title}</div>
      <div className="action-desc">{description}</div>
    </div>
  );
}
