'use client';

import React, { useEffect } from 'react';
import { SidebarProvider, useSidebar } from '../../context/SidebarContext';
import Sidebar from './Sidebar';
import '../../styles/sidebar.css';

export default function SidebarLayout({ children }) {
  return (
    <SidebarProvider>
      <LayoutWithSidebar>{children}</LayoutWithSidebar>
    </SidebarProvider>
  );
}

function LayoutWithSidebar({ children }) {
  const { isCollapsed } = useSidebar();

  // Update document body class when sidebar state changes
  useEffect(() => {
    if (isCollapsed) {
      document.body.classList.add('sidebar-collapsed');
      document.body.classList.remove('sidebar-expanded');
    } else {
      document.body.classList.add('sidebar-expanded');
      document.body.classList.remove('sidebar-collapsed');
    }
    
    return () => {
      document.body.classList.remove('sidebar-collapsed', 'sidebar-expanded');
    };
  }, [isCollapsed]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 transform transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-20' : 'w-[280px]'
        }`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div 
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
          isCollapsed ? 'ml-20' : 'ml-[280px]'
        }`}
      >
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
