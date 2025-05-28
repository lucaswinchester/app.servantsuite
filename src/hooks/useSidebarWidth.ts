import { useEffect } from 'react';

export function useSidebarWidth() {
  useEffect(() => {
    const updateSidebarWidth = () => {
      const root = document.documentElement;
      const sidebar = document.querySelector('[data-collapsed]') as HTMLElement;
      
      if (sidebar) {
        const isCollapsed = sidebar.getAttribute('data-collapsed') === 'true';
        const width = isCollapsed ? '80px' : '280px';
        
        // Update the CSS variable
        root.style.setProperty('--current-sidebar-width', width);
        
        // Trigger a reflow to ensure the transition works
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        void sidebar.offsetWidth;
      }
    };

    // Initial update
    updateSidebarWidth();

    // Set up mutation observer to watch for sidebar collapse/expand
    const observer = new MutationObserver(updateSidebarWidth);
    const config = { 
      attributes: true, 
      attributeFilter: ['data-collapsed'] 
    };
    
    const sidebar = document.querySelector('[data-collapsed]');
    
    if (sidebar) {
      observer.observe(sidebar, config);
    }

    // Also update on window resize to handle any layout changes
    window.addEventListener('resize', updateSidebarWidth);
    
    // Cleanup
    return () => {
      if (sidebar) {
        observer.disconnect();
      }
      window.removeEventListener('resize', updateSidebarWidth);
    };
  }, []);
}
