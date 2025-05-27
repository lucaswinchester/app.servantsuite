'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

// Simple Tabs component
export const Tabs = TabsPrimitive.Root;

// TabsList component
export const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={`flex space-x-2 rounded-md bg-gray-100 p-1 ${className || ''}`}
    {...props}
  />
));
TabsList.displayName = 'TabsList';

// TabsTrigger component
export const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={`px-3 py-1.5 text-sm font-medium rounded-sm transition-colors ${className || ''}`}
    {...props}
  />
));
TabsTrigger.displayName = 'TabsTrigger';

// TabsContent component
export const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={`mt-2 ${className || ''}`}
    {...props}
  />
));
TabsContent.displayName = 'TabsContent';
