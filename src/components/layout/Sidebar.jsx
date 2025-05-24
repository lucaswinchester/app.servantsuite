'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Book,
  BookOpen,
  Users,
  Target,
  Settings,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Moon,
  Sun
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Sidebar({ isCollapsed, isMobileOpen, onToggle }) {
  const pathname = usePathname();

  const navItems = [
    { path: '/dashboard', icon: <Home size={20} />, label: 'Dashboard' },
    { path: '/sermons', icon: <Book size={20} />, label: 'Sermons' },
    { path: '/series', icon: <BookOpen size={20} />, label: 'Series' },
    { path: '/team', icon: <Users size={20} />, label: 'Team' },
    { path: '/resources', icon: <Target size={20} />, label: 'Resources' }
  ];

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for dark mode preference
    if (typeof window !== 'undefined') {
      const isDark = localStorage.getItem('darkMode') === 'true' || 
                   (!localStorage.getItem('darkMode') && 
                    window.matchMedia('(prefers-color-scheme: dark)').matches);
      setDarkMode(isDark);
      document.documentElement.classList.toggle('dark', isDark);
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  return (
    <nav
      className={`sidebar ${isCollapsed ? "collapsed" : ""} ${
        isMobileOpen ? "open" : ""
      }`}
      id="sidebar"
    >
      <div className="logo-section">
        <div className="logo flex items-center">
          <div className="w-8 h-8 flex-shrink-0">
            <img 
              src="/ss-icon.svg" 
              alt="ServantSuite Logo" 
              className="w-full h-full"
            />
          </div>
          {!isCollapsed && (
            <span className="logo-text font-semibold text-2xl ml-2">
              ServantSuite
            </span>
          )}
        </div>
        <button
          className="toggle-sidebar"
          id="toggleSidebar"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={onToggle}
        >
          {isCollapsed ? (
            <ChevronRight size={16} />
          ) : (
            <ChevronLeft size={16} />
          )}
        </button>
      </div>

      <ul className="nav-items">
        {navItems.map((item) => (
          <li className="nav-item" key={item.path}>
            <Link 
              href={item.path} 
              className={pathname === item.path ? 'active' : ''}
            >
              <span className="nav-icon">
                {item.icon}
              </span>
              <span className="nav-text">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Utility Icons */}
      <div className="utility-section">
        <button 
          className="utility-icon" 
          title="Settings"
          onClick={() => window.location.href = '/settings'}
        >
          <Settings size={20} />
          <span className="utility-tooltip">Settings</span>
        </button>
        <button 
          className="utility-icon" 
          title="Help & Support"
          onClick={() => window.location.href = '/help'}
        >
          <HelpCircle size={20} />
          <span className="utility-tooltip">Help</span>
        </button>
        <button 
          className="utility-icon" 
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          onClick={toggleDarkMode}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          <span className="utility-tooltip">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>

      {/* User Section */}
      <div className="user-section shadcn-card">
        <div className="user-info">
          <div className="user-avatar">PJ</div>
          <div className="user-details">
            <h4>Pastor John</h4>
            <p>Grace Community</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
