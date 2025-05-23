import React from 'react';
import SlidePreview from './SlidePreview';
import SermonActions from './SermonActions';
import StatusBadge from '../ui/StatusBadge';
import { BookOpen, Calendar, Users, Clock, MessageSquare } from 'lucide-react';

export default function SermonRow({ sermon, onSermonClick, onActionClick }) {
  return (
    <div className="sermon-row group" onClick={() => onSermonClick(sermon.title)}>
      <div className="media-preview-container">
        <SlidePreview 
          title={sermon.slideTitle} 
          status={sermon.status} 
          icon={sermon.icon}
        />
      </div>
      
      <div className="sermon-content flex-1 min-w-0">
        <div className="flex flex-col h-full">
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="sermon-title text-base font-medium text-gray-900 dark:text-white truncate">
                    {sermon.title}
                  </h3>
                  <StatusBadge status={sermon.status} />
                </div>
                <div className="sermon-scripture flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                  <BookOpen size={14} className="flex-shrink-0" /> 
                  <span className="truncate">{sermon.scripture}</span>
                </div>
              </div>
              
              <div className="sermon-meta-column flex-shrink-0 text-right">
                <div className="sermon-date flex items-center justify-end gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                  <Calendar size={14} className="flex-shrink-0" />
                  <span>{sermon.date}</span>
                </div>
                <div className="mt-1">
                  <span className="series-tag text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-0.5 rounded">
                    {sermon.series}
                  </span>
                </div>
              </div>
            </div>
            
            {sermon.description && (
              <div className="sermon-description text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                {sermon.description}
              </div>
            )}
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-start justify-between">
              <div className="sermon-stats flex-1 flex items-center gap-6 text-xs text-gray-500 dark:text-gray-400">
                {sermon.stats.map((stat, index) => (
                  <span key={index} className="flex items-center gap-1">
                    {stat.startsWith('👥') && <Users size={12} className="opacity-70" />}
                    {stat.startsWith('⏱️') && <Clock size={12} className="opacity-70" />}
                    {stat.startsWith('💬') && <MessageSquare size={12} className="opacity-70" />}
                    <span className="whitespace-nowrap">{stat.replace(/^[^\s]+\s*/, '')}</span>
                  </span>
                ))}
              </div>
              
              <div className="flex items-center">
                {sermon.media && sermon.media.length > 0 && (
                  <div className="flex items-center gap-1.5 mr-2">
                    {sermon.media.map((media, index) => (
                      <span 
                        key={index} 
                        className={`media-indicator media-${media.type.toLowerCase()} text-xs px-2 py-0.5 rounded`}
                      >
                        {media.label}
                      </span>
                    ))}
                  </div>
                )}
                
                <SermonActions 
                  actions={sermon.actions} 
                  onActionClick={(action, e) => {
                    e.stopPropagation();
                    onActionClick(action, e);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

