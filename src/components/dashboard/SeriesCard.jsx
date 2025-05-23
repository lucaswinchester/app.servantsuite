import React from 'react';
import { BookOpen, Plus } from 'lucide-react';
import Button from '../ui/Button';

export default function SeriesCard({ series }) {
  return (
    <div className="card shadcn-card series-card">
      <div className="card-header">
        <h2 className="card-title">
          <div className="card-title-icon">
            <BookOpen size={20} />
          </div>
          Series
        </h2>
      </div>
      
      {series.map((item, index) => (
        <div className="series-item" key={index}>
          <div className="series-title">{item.title}</div>
          {item.progress ? (
            <>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: item.progress }}></div>
              </div>
              <div className="progress-text">{item.progressText}</div>
            </>
          ) : (
            <div style={{
              color: "var(--muted-foreground)",
              fontSize: "0.75rem",
              marginTop: "0.5rem"
            }}>
              {item.status}
            </div>
          )}
        </div>
      ))}
      
      <Button 
        variant="primary" 
        className="gradient-button"
        style={{ marginTop: "1rem" }}
      >
        <Plus size={16} /> Create New Series
      </Button>
    </div>
  );
}
