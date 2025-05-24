import React from 'react';
import SlidePreview from './SlidePreview';
import { BookOpen, Calendar, Users, Clock, MessageSquare } from 'lucide-react';

export default function SermonRow({ sermon, onSermonClick, onActionClick }) {
  return (
    <div className="sermon-row group" onClick={() => onSermonClick(sermon.title)}>
      <div className="media-preview-container">
        <SlidePreview 
          title={sermon.slideTitle} 
          status={sermon.status}
          actions={sermon.actions?.map(action => ({
            ...action,
            onClick: (e) => onActionClick(action, e)
          })) || []}
        />
      </div>
      
      <div className="sermon-content flex-1 min-w-0">
        <div className="flex flex-col h-full">
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {sermon.title}
                </h3>
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
                {/* Status */}
                <span className="flex items-center gap-1">
                  <span className={`inline-block w-2 h-2 rounded-full ${
                    sermon.status === 'Draft' ? 'bg-yellow-500' :
                    sermon.status === 'Scheduled' ? 'bg-blue-500' :
                    'bg-green-500'
                  }`}></span>
                  <span className="whitespace-nowrap">{sermon.status}</span>
                </span>
                
                {/* Service Type */}
                <span className="flex items-center gap-1">
                  <Clock size={12} className="opacity-70" />
                  <span className="whitespace-nowrap">
                    {sermon.serviceType || 'No Service Type'}
                  </span>
                </span>
                
                {/* Sermon Service */}
                <span className="flex items-center gap-1">
                  <Users size={12} className="opacity-70" />
                  <span className="whitespace-nowrap">
                    {sermon.sermonService || 'General'}
                  </span>
                </span>
                
                {/* Comments */}
                <span className="flex items-center gap-1">
                  <MessageSquare size={12} className="opacity-70" />
                  <span className="whitespace-nowrap">
                    {sermon.commentCount || 0} {sermon.commentCount === 1 ? 'Comment' : 'Comments'}
                  </span>
                </span>
              </div>
              
              {sermon.media && sermon.media.length > 0 && (
                <div className="flex items-center justify-end">
                  <div className="flex items-center gap-1.5">
                    {sermon.media.map((media, index) => (
                      <span 
                        key={index} 
                        className={`media-indicator media-${media.type.toLowerCase()} text-xs px-2 py-0.5 rounded`}
                      >
                        {media.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

