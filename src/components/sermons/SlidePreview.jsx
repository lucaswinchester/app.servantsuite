import React from 'react';
import { MoreVertical } from 'lucide-react';

// Brand-consistent gradient presets
const GRADIENT_PRESETS = [
  // Primary brand gradient
  ['#ff6b6b', '#ffa36b'],
  // Variations of the primary brand colors
  ['#ff8e8e', '#ffb88c'],
  ['#ff7c7c', '#ff9e7a'],
  // Complementary colors that work with the brand
  ['#6b8cff', '#6bc6ff'],
  ['#8e6bff', '#c86bff'],
  // Darker variations for contrast
  ['#e64c4c', '#e67e4c'],
  ['#ff4d4d', '#ff8a4d'],
  // Lighter variations
  ['#ff9e9e', '#ffc19e'],
  ['#ffb3b3', '#ffd1b3']
];

// Function to get a consistent gradient based on title
const getGradientForTitle = (title) => {
  if (!title) return GRADIENT_PRESETS[0];
  
  // Simple hash function to get a consistent index
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const index = Math.abs(hash) % GRADIENT_PRESETS.length;
  return GRADIENT_PRESETS[index];
};

export default function SlidePreview({ title, status, actions = [] }) {
  return (
    <div className={`slide-preview ${status?.toLowerCase() || ''} group relative overflow-hidden w-32 h-20 rounded-md`}>
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full flex items-center justify-center text-white transition-all duration-300"
          style={{
            background: `linear-gradient(135deg, ${getGradientForTitle(title).join(', ')})`
          }}
        >
          {title && <div className="text-center px-2 font-medium text-sm line-clamp-2">{title}</div>}
        </div>
      </div>
      
      {actions.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-1.5 flex justify-around items-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                action.onClick?.(e);
              }}
              className="p-1 rounded-full text-white hover:bg-white/20 transition-colors flex-shrink-0"
              title={action.label}
            >
              {action.icon || <MoreVertical size={14} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
