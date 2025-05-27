'use client';

import React, { createContext, useContext, useState } from 'react';

const TabsContext = createContext();

export const Tabs = ({ 
  children, 
  defaultValue, 
  className = '',
  ...props 
}) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={`w-full ${className}`} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({ 
  children, 
  className = '',
  ...props 
}) => {
  return (
    <div 
      className={`flex space-x-2 mb-4 border-b w-full justify-start rounded-none bg-transparent p-0 h-auto ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const TabsTrigger = ({ 
  value, 
  children, 
  className = '',
  ...props 
}) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === value;
  
  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`
        rounded-none border-b-2 border-transparent px-0 pb-3 pt-0 font-medium
        ${isActive 
          ? 'border-primary text-primary' 
          : 'text-muted-foreground hover:text-foreground'
        } 
        ${className}
      `}
      data-state={isActive ? 'active' : 'inactive'}
      {...props}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ 
  value, 
  children, 
  className = '',
  ...props 
}) => {
  const { activeTab } = useContext(TabsContext);
  
  if (activeTab !== value) return null;
  
  return (
    <div className={`mt-0 ${className}`} {...props}>
      {children}
    </div>
  );
};
