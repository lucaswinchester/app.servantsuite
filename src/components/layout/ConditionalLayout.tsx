'use client';

import { usePathname } from 'next/navigation';
import { useSidebar } from '@/context/SidebarContext';
import Sidebar from './Sidebar';
import { SidebarProvider } from '@/context/SidebarContext';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

// Inner component that uses the Sidebar context
function MainContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();
  
  // Calculate the content width to maintain consistent margin
  const sidebarWidth = isCollapsed ? 80 : 280;
  const contentMargin = '1.5rem';
  
  return (
    <div className="flex min-h-screen h-full">
      <Sidebar />
      <main 
        className="overflow-y-auto h-full transition-all duration-300 ease-in-out bg-gray-50 dark:bg-gray-900"
        style={{
          marginLeft: `${sidebarWidth}px`,
          width: `calc(100% - ${sidebarWidth}px)`,
          minHeight: '100vh',
          padding: `1.5rem ${contentMargin} 1.5rem ${contentMargin}`,
        }}
      >
        <div className="w-full h-full">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  
  // Define paths where sidebar should be hidden
  const hideSidebarPaths = [
    '/sign-in',
    '/sign-up',
    '/forgot-password',
    '/reset-password',
    '/waitlist',
  ];

  // Check if current path is an auth path
  const isAuthPath = hideSidebarPaths.some(path => 
    pathname?.startsWith(path)
  );

  if (isAuthPath) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center p-4">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <MainContent>{children}</MainContent>
    </SidebarProvider>
  );
}
