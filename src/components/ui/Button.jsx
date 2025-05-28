import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  onClick = () => {},
  className = '',
  ...props 
}) {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  
  return (
    <button 
      className={`${baseClass} ${variantClass} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
