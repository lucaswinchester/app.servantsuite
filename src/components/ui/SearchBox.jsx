import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBox({ placeholder, onChange, className = '' }) {
  return (
    <div className={`relative min-w-[300px] ${className}`}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <Search size={16} />
      </div>
      <input 
        type="text" 
        placeholder={placeholder}
        onChange={onChange}
        className="w-full py-3 pl-10 pr-4 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent transition-colors"
      />
    </div>
  );
}
