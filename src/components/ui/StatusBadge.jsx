import React from 'react';

export default function StatusBadge({ status, children }) {
  return (
    <div className={`status-badge status-${status.toLowerCase()}`}>
      {children || status}
    </div>
  );
}
