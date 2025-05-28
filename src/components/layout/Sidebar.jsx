'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Book, 
  BookOpen, 
  Users, 
  Settings, 
  ChevronLeft,
  HelpCircle, 
  Moon, 
  Sun
} from 'lucide-react';
import { useSidebar } from '../../context/SidebarContext';
import { UserButton, useUser, useClerk } from '@clerk/nextjs';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

export default function Sidebar() {
  const pathname = usePathname();
  const { 
    isCollapsed, 
    toggleSidebar, 
    closeMobileMenu 
  } = useSidebar();
  const { user, isLoaded } = useUser();

  const clerk = useClerk();
  console.log('Clerk instance:', clerk);

  console.log(useUser);
  
  // Debug logging
  useEffect(() => {
    console.log('User loading state:', { isLoaded, user });
    if (isLoaded && !user) {
      console.log('User is not authenticated');
    }
  }, [isLoaded, user]);
  
  // Close mobile menu when path changes
  useEffect(() => {
    closeMobileMenu();
  }, [pathname, closeMobileMenu]);
  
  const navItems = [
    { path: '/dashboard', icon: <Home size={20} />, label: 'Dashboard' },
    { path: '/sermons', icon: <Book size={20} />, label: 'Sermons' },
    { path: '/series', icon: <BookOpen size={20} />, label: 'Series' },
    { path: '/team', icon: <Users size={20} />, label: 'Team' }
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
    <div 
      data-collapsed={isCollapsed}
      className={`h-full flex flex-col ${isCollapsed ? 'w-20' : 'w-[280px]'} py-4 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 pointer-events-auto transition-all duration-300 fixed left-0 top-0 bottom-0 z-40`}>
      <div className="flex-1 flex flex-col overflow-y-auto py-6">
        {/* Collapse Toggle Button - Positioned absolutely outside the sidebar */}
        <div className="py-6 absolute -right-3 top-4 z-50">
          <button
            onClick={toggleSidebar}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={`
              h-8 w-8 p-1.5 rounded-full
              bg-white dark:bg-gray-800
              shadow-lg border border-gray-200 dark:border-gray-600
              hover:bg-orange-50 dark:hover:bg-orange-900
              hover:border-orange-200 dark:hover:border-orange-600
              hover:text-orange-600 dark:hover:text-orange-400
              transition-all duration-200 ease-out
              flex items-center justify-center
              focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2
            `}
          >
            <ChevronLeft 
              size={16} 
              strokeWidth={2.5} 
              className={`transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`} 
            />
          </button>
        </div>

        {/* Logo Section */}
        <div className={`relative ${isCollapsed ? 'px-0' : 'px-4'} mb-4`}>
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
            <div className={`flex-shrink-0 flex items-center ${isCollapsed ? 'justify-center w-10 h-10' : 'justify-start h-10 pl-1'}`}>
              <Image 
                src="/ServantSuite-Icon.png" 
                alt="ServantSuite"
                className="w-8 h-8 object-contain"
                style={{
                  marginTop: '0.125rem' // Small adjustment to align with nav icons
                }}
              />
            </div>
            {!isCollapsed && (
              <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
                ServantSuite
              </span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1">
          <ul className={`space-y-1 ${isCollapsed ? 'flex flex-col items-center' : 'px-2'}`}>
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-gradient-to-r from-[#ff6b6b] to-[#ffa36b] text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                    } ${isCollapsed ? 'justify-center px-2' : 'px-3'}`}
                  >
                    <span className={`${isCollapsed ? '' : 'mr-3'}`}>
                      {React.cloneElement(item.icon, {
                        className: 'flex-shrink-0',
                        size: 20,
                      })}
                    </span>
                    {!isCollapsed && item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>



        {/* Utility Icons */}
        <div className={`mt-auto ${isCollapsed ? 'flex flex-col items-center' : 'px-2'}`}>
          <div className={`${isCollapsed ? 'flex flex-col items-center' : ''}`}>
          <button 
              className="group flex items-center w-full p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              onClick={toggleDarkMode}
            >
              <div className="flex items-center justify-center h-6 w-6">
                {darkMode ? (
                  <Sun size={18} className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                ) : (
                  <Moon size={18} className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                )}
              </div>
              {!isCollapsed && (
                <span className="ml-3 text-sm text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </span>
              )}
            </button>
            <button 
              className="group flex items-center w-full p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
              title="Help & Support"
              onClick={() => window.location.href = '/help'}
            >
              <div className="flex items-center justify-center h-6 w-6">
                <HelpCircle size={18} className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              </div>
              {!isCollapsed && (
                <span className="ml-3 text-sm text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                  Help
                </span>
              )}
            </button>
            <button 
              className={`group flex items-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors ${isCollapsed ? 'p-2' : 'w-full pl-3 pr-2 py-2'}`}
              title="Settings"
              onClick={() => window.location.href = '/settings'}
            >
              <div className="flex items-center justify-center h-6 w-6">
                <Settings size={18} className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              </div>
              {!isCollapsed && (
                <span className="ml-3 text-sm text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                  Settings
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* User Section - Pinned to bottom */}
      <div className={`mt-auto border-t border-gray-100 dark:border-gray-800 transition-all duration-300 ${isCollapsed ? 'px-2' : 'px-4'}`}>
        <div className={`w-full py-3 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          <div className="flex items-center gap-3 w-full">
            {!isLoaded ? (
              <div className="flex items-center gap-3 w-full">
                <Skeleton className="h-9 w-9 rounded-full" />
                {!isCollapsed && (
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full">
                <UserButton 
                  appearance={{
                    elements: {
                      userButtonAvatarBox: 'h-9 w-9',
                      userButtonPopoverCard: 'w-72',
                      userButtonPopoverActionButtonText: 'text-sm',
                      userButtonPopoverActionButtonIcon: 'h-4 w-4',
                      userButtonPopoverActionButton: 'h-9 px-3',
                      userButtonPopoverFooter: 'hidden',
                      userPreviewMainIdentifier: 'text-sm font-medium',
                      userPreviewSecondaryIdentifier: 'text-xs text-muted-foreground',
                      userButtonTrigger: 'w-full justify-start',
                      userButtonOuterIdentifier: 'text-sm font-medium',
                      userButtonPopoverActionButtonIconBox: 'h-4 w-4',
                    },
                  }}
                  showName={!isCollapsed}
                  afterSignOutUrl="/"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
