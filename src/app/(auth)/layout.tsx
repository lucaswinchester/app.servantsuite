'use client';

import { ReactNode, useEffect } from 'react';
import { Inter } from 'next/font/google';
import AnimatedGradient from '@/components/auth/AnimatedGradient';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function AuthLayout({ children }: { children: ReactNode }) {
  // Ensure the body has no margin or padding that could cause scrolling
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'transparent';
    document.body.style.background = 'transparent';
    
    return () => {
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.overflow = '';
      document.body.style.background = '';
    };
  }, []);

  return (
    <div className={`${inter.variable} min-h-screen flex items-center justify-center px-0 py-4 relative overflow-hidden bg-transparent`}>
      <AnimatedGradient/>
      <div className="relative z-10 w-full max-w-md mx-3">
        {children}
      </div>
    </div>
  );
}
