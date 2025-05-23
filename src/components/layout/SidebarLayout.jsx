'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import MobileMenuToggle from './MobileMenuToggle';
import '../../styles/sidebar.css';

export default function SidebarLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (window.innerWidth <= 768) {
        const sidebar = document.getElementById("sidebar");
        const mobileMenuToggle = document.getElementById("mobileMenuToggle");
        
        if (
          sidebar &&
          mobileMenuToggle &&
          !sidebar.contains(e.target) &&
          e.target !== mobileMenuToggle &&
          !mobileMenuToggle.contains(e.target)
        ) {
          setMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);
    
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation for accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <div className="app">
      <MobileMenuToggle 
        isOpen={mobileMenuOpen} 
        onClick={toggleMobileMenu} 
      />
      
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        isMobileOpen={mobileMenuOpen}
        onToggle={toggleSidebar}
      />

      <main
        className={`main-content ${sidebarCollapsed ? "expanded" : ""}`}
        id="mainContent"
      >
        {children}
      </main>
    </div>
  );
}
