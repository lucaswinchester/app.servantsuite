import React from 'react';
import { BookOpen, Calendar, Users, MessageSquare } from 'lucide-react';

export default function SeriesRow({ series, onSeriesClick, onActionClick }) {
  return (
    <div className="sermon-row group" onClick={() => onSeriesClick(series.title)}>
      <div className="sermon-content flex-1 min-w-0">
        <div className="flex flex-col h-full">
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-blue-400 dark:group-hover:from-blue-400 dark:group-hover:to-blue-200 transition-all duration-300">
                  {series.title}
                </h3>
                <div className="sermon-scripture flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                  <BookOpen size={14} className="flex-shrink-0" /> 
                  <span>{series.sermonCount} {series.sermonCount === 1 ? 'Sermon' : 'Sermons'}</span>
                </div>
              </div>
              
              <div className="sermon-meta-column flex-shrink-0 text-right">
                <div className="sermon-date flex items-center justify-end gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                  <Calendar size={14} className="flex-shrink-0" />
                  <span>{series.dateRange}</span>
                </div>
                <div className="mt-1">
                  <span className="series-tag text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-0.5 rounded">
                    {series.status}
                  </span>
                </div>
              </div>
            </div>
            
            {series.description && (
              <div className="sermon-description text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                {series.description}
              </div>
            )}
          </div>
          
          <div className="sermon-stats flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center">
                <MessageSquare size={14} className="mr-1.5" />
                {series.commentCount} {series.commentCount === 1 ? 'Comment' : 'Comments'}
              </span>
            </div>
            
            <div className="action-buttons flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {series.actions?.map((action, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    onActionClick?.(action, e);
                  }}
                  className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  title={action.label}
                >
                  {React.cloneElement(action.icon, { size: 16 })}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
