// hooks/useMobileDetection.ts
import { useState, useEffect } from 'react';

export function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkDevice = () => {
      // Check user agent for mobile devices
      const userAgent = navigator.userAgent || navigator.vendor;
      const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
      
      // Check screen size
      const isSmallScreen = window.innerWidth <= 768;
      
      // Check touch capability
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      const mobile = mobileRegex.test(userAgent.toLowerCase()) || 
                   (isSmallScreen && isTouchDevice);
      
      setIsMobile(mobile);
      setIsLoading(false);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return { isMobile, isLoading };
}