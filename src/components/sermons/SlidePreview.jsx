import React from 'react';

export default function SlidePreview({ title, status, icon }) {
  return (
    <div className={`slide-preview ${status.toLowerCase()}`}>
      <div>{title}</div>
      <div className="play-icon">{icon}</div>
    </div>
  );
}
