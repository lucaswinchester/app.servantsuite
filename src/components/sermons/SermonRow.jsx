import React from 'react';
import SlidePreview from './SlidePreview';
import SermonActions from './SermonActions';
import StatusBadge from '../ui/StatusBadge';
import { BookOpen, Calendar, Users } from 'lucide-react';

export default function SermonRow({ sermon, onSermonClick, onActionClick }) {
  return (
    <div className="sermon-row" onClick={() => onSermonClick(sermon.title)}>
      <SlidePreview 
        title={sermon.slideTitle} 
        status={sermon.status} 
        icon={sermon.icon}
      />
      
      <div className="sermon-content">
        <div className="sermon-key-info">
          <h3 className="sermon-title">{sermon.title}</h3>
          <StatusBadge status={sermon.status} />
          <div className="sermon-scripture">
            <BookOpen size={14} /> {sermon.scripture}
          </div>
          
          {sermon.description && (
            <div className="sermon-description">{sermon.description}</div>
          )}
          
          {sermon.progress && (
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${sermon.progress}%` }}
              ></div>
            </div>
          )}
          
          <div className="media-indicators">
            {sermon.media.map((media, index) => (
              <span 
                key={index} 
                className={`media-indicator media-${media.type.toLowerCase()}`}
              >
                {media.label}
              </span>
            ))}
          </div>
        </div>
        
        <div className="sermon-meta-column">
          <div className="sermon-date">
            <Calendar size={14} /> {sermon.date}
          </div>
          <div className="series-tag">{sermon.series}</div>
          <div className="sermon-stats">
            {sermon.stats.map((stat, index) => (
              <span key={index}>{stat}</span>
            ))}
          </div>
        </div>
      </div>
      
      <SermonActions 
        actions={sermon.actions} 
        onActionClick={(action, e) => onActionClick(action, e)}
      />
    </div>
  );
}
