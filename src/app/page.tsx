// app/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMobileDetection } from '../hooks/useMobileDetection';
import { MobileMessage } from '../components/MobileMessage';
import { LoadingScreen } from '../components/LoadingScreen';

export default function HomePage() {
  const { isMobile, isLoading } = useMobileDetection();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if not mobile and not loading
    if (!isLoading && !isMobile) {
      router.push('/dashboard');
    }
  }, [isMobile, isLoading, router]);

  // Show loading screen while detecting device
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Show mobile message if on mobile device
  if (isMobile) {
    return <MobileMessage />;
  }

  // Show loading while redirecting to dashboard
  return <LoadingScreen />;
}