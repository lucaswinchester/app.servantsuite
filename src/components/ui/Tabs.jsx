'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

// Simple implementation of Tabs components
const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={`inline-flex h-10 items-center justify-center rounded-lg bg-gray-100 p-1 text-gray-500 dark:bg-gray-800/50 dark:text-gray-400 ${className || ''}`}
    {...props}
  />
));
TabsList.displayName = 'TabsList';

const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
      data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm
      dark:ring-offset-gray-900 dark:focus-visible:ring-gray-600
      dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-white
      hover:bg-gray-100 dark:hover:bg-gray-800/80
      ${className || ''}`}
    {...props}
  />
));
TabsTrigger.displayName = 'TabsTrigger';

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={`mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300 ${className || ''}`}
    {...props}
  />
));
TabsContent.displayName = 'TabsContent';

// Named exports
export { Tabs, TabsList, TabsTrigger, TabsContent };
