import React from 'react';
import { Book, Plus, Search, Download } from 'lucide-react';

export default function SermonCard({ sermons }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Book size={20} className="mr-2 text-[#ff6b6b] dark:text-[#ffa36b]" />
          Your Sermons
        </h2>
        <button className="text-sm font-medium bg-gradient-to-r from-[#ff6b6b] to-[#ffa36b] bg-clip-text text-transparent hover:opacity-80 transition-opacity">
          View All
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        <button className="inline-flex items-center px-4 py-1.5 text-sm font-medium rounded-full bg-gradient-to-r from-[#ff6b6b] to-[#ffa36b] text-white hover:opacity-90 transition-opacity">
          <span className="mr-1">✨</span> Create New
        </button>
        <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
          <Download size={14} className="mr-1" /> Import
        </button>
        <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
          <Search size={14} className="mr-1" /> Search
        </button>
      </div>
      
      <ul className="space-y-4 mb-6 flex-grow">
        {sermons.map((sermon, index) => (
          <li key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">{sermon.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{sermon.meta}</p>
            </div>
            <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
              sermon.status === 'complete' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                : 'bg-gradient-to-r from-[#ff6b6b] to-[#ffa36b] text-white'
            }`}>
              {sermon.progress}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
