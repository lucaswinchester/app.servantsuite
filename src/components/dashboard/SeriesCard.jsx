import React from 'react';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import { Search } from 'lucide-react';

export default function SeriesCard({ series }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <BookOpen size={20} className="mr-2 text-[#ff6b6b] dark:text-[#ffa36b]" />
          Series
        </h3>
        <Link 
          href="/series" 
          className="text-sm font-medium bg-gradient-to-r from-[#ff6b6b] to-[#ffa36b] bg-clip-text text-transparent hover:opacity-80 transition-opacity"
        >
          View All
        </Link>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        <Link href="/series/new" className="inline-flex items-center px-4 py-1.5 text-sm font-medium rounded-full bg-gradient-to-r from-[#ff6b6b] to-[#ffa36b] text-white hover:opacity-90 transition-opacity">
          <span className="mr-1">✨</span> Create New
        </Link>
        <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
          <Search size={14} className="mr-1" /> Search
        </button>
      </div>
      
      <div className="space-y-6 mb-6 flex-grow">
        {series.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="font-medium text-gray-900 dark:text-white">{item.title}</div>
            {item.progress ? (
              <div className="space-y-1.5">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-[#ff6b6b] to-[#ffa36b] h-2 rounded-full" 
                    style={{ width: item.progress }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {item.progressText}
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {item.status}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
