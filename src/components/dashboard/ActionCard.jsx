import React from 'react';
import { ArrowRight } from 'lucide-react';

// Define gradient colors for different cards
const iconGradients = [
  'from-purple-500 to-pink-500',
  'from-blue-500 to-cyan-400',
  'from-green-500 to-emerald-400',
  'from-amber-500 to-yellow-400',
  'from-rose-500 to-pink-500',
  'from-indigo-500 to-purple-500'
];

export default function ActionCard({ icon, title, description, actionText = 'Get started', index = 0 }) {
  // Cycle through gradients based on index
  const gradientClass = iconGradients[index % iconGradients.length];
  
  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 overflow-hidden group hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <div className={`absolute top-4 right-4 p-2.5 rounded-xl bg-gradient-to-br ${gradientClass} text-white group-hover:opacity-90 transition-all duration-300 group-hover:scale-110`}>
        {React.cloneElement(icon, { size: 20, className: 'text-white' })}
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{description}</p>
      
      <div className="mt-4">
        <button className="inline-flex items-center text-sm font-medium bg-gradient-to-r from-[#ff6b6b] to-[#ffa36b] bg-clip-text text-transparent hover:opacity-80 transition-opacity group">
          {actionText}
          <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform text-[#ff6b6b]" />
        </button>
      </div>
    </div>
  );
}
