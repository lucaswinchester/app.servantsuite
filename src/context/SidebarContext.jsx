'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Initialize state from localStorage on mount (client-side only)
  useEffect(() => {
    const loadState = () => {
      try {
        const savedState = localStorage.getItem('sidebarState');
        if (savedState) {
          const { isCollapsed: savedCollapsed } = JSON.parse(savedState);
          setIsCollapsed(savedCollapsed);
        }
      } catch (error) {
        console.error('Error loading sidebar state:', error);
      } finally {
        setIsInitialized(true);
      }
    };
    
    loadState();
    
    // Also load on window focus in case it was changed in another tab
    window.addEventListener('focus', loadState);
    return () => window.removeEventListener('focus', loadState);
  }, []);

  // Save state to localStorage when it changes
  useEffect(() => {
    if (isInitialized) { // Only save if we've finished initializing
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('sidebarState', JSON.stringify({ isCollapsed }));
        }
      } catch (error) {
        console.error('Error saving sidebar state:', error);
      }
    }
  }, [isCollapsed, isInitialized]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
  };

  // Use a loading state to prevent rendering children until initialized
  if (!isInitialized) {
    return <div style={{ visibility: 'hidden' }} />; // Return an empty div instead of null
  }

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        isMobileOpen,
        toggleSidebar,
        toggleMobileMenu,
        closeMobileMenu,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
