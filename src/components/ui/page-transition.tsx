'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingKey, setLoadingKey] = useState(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentPath, setCurrentPath] = useState(pathname);
  const [isClient, setIsClient] = useState(false);

  // Set client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle route changes
  useEffect(() => {
    if (!isClient) return;

    const handleStart = () => {
      setIsLoading(true);
    };

    const handleComplete = () => {
      const timer = setTimeout(() => {
        setIsLoading(false);
        setLoadingKey(prev => prev + 1);
      }, 100);
      
      return () => clearTimeout(timer);
    };

    // For initial page load
    handleStart();
    const initialTimer = setTimeout(handleComplete, 100);
    
    // For subsequent navigation
    if (pathname !== currentPath) {
      setCurrentPath(pathname);
      handleStart();
      const navTimer = setTimeout(handleComplete, 100);
      return () => clearTimeout(navTimer);
    }

    return () => {
      clearTimeout(initialTimer);
    };
  }, [pathname, searchParams, isClient, currentPath]);

  // Handle initial page load
  useEffect(() => {
    if (!isClient) return;

    const handleLoad = () => {
      setIsLoading(false);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [isClient]);

  if (!isClient) {
    return <>{children}</>;
  }

  return (
    <div key={loadingKey} className="relative min-h-screen">
      {children}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="h-12 w-12 pointer-events-auto"
            >
              <div className="animate-spin rounded-full h-full w-full border-t-2 border-b-2 border-[#ff6b6b]"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
