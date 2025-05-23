import React from 'react';

export default function SermonActions({ actions, onActionClick }) {
  return (
    <div className="sermon-actions">
      {actions.map((action, index) => (
        <button 
          key={index}
          className={`action-btn ${action.primary ? 'primary' : ''}`}
          onClick={(e) => onActionClick(action.label, e)}
        >
          {action.icon}
          {action.text && ` ${action.text}`}
        </button>
      ))}
    </div>
  );
}
