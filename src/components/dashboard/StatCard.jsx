import React from 'react';

export default function StatCard({ icon, label, value, change }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-[#ff6b6b] to-[#ffa36b] text-white">
            {React.cloneElement(icon, { size: 20 })}
          </div>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</span>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold bg-gradient-to-r from-[#ff6b6b] to-[#ffa36b] bg-clip-text text-transparent">
            {value}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{change}</div>
        </div>
      </div>
    </div>
  );
}
