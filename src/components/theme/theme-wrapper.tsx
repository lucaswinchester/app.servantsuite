'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider } from '@/providers/theme-provider';

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent theme flickering by only rendering children when mounted
  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider defaultTheme="system" storageKey="servantsuite-theme">
      {children}
    </ThemeProvider>
  );
}
