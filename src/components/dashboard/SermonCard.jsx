import React from 'react';
import { Book, Plus } from 'lucide-react';
import Button from '../ui/Button';

export default function SermonCard({ sermons }) {
  return (
    <div className="card shadcn-card sermons-card">
      <div className="card-header">
        <h2 className="card-title">
          <div className="card-title-icon">
            <Book size={20} />
          </div>
          Your Sermons
        </h2>
      </div>
      
      <div className="quick-actions">
        <button className="btn-bubble shadcn-button shadcn-button-secondary">
          <span className="gradient-text">✨</span> Create New
        </button>
        <button className="btn-bubble shadcn-button shadcn-button-secondary">
          <span className="gradient-text">📥</span> Import
        </button>
        <button className="btn-bubble shadcn-button shadcn-button-secondary">
          <span className="gradient-text">🔍</span> Search
        </button>
      </div>
      
      <ul className="sermon-list">
        {sermons.map((sermon, index) => (
          <li className="sermon-item" key={index}>
            <div className="sermon-info">
              <h3>{sermon.title}</h3>
              <div className="sermon-meta">{sermon.meta}</div>
            </div>
            <div className={`progress-bubble ${sermon.status}`}>
              {sermon.progress}
            </div>
          </li>
        ))}
      </ul>
      
      <Button 
        variant="primary" 
        className="gradient-button"
        style={{ marginTop: "1.5rem" }}
      >
        View All Sermons
      </Button>
    </div>
  );
}
