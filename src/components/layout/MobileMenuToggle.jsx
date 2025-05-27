import React from 'react';
import { Menu } from 'lucide-react';
import { useSidebar } from '../../context/SidebarContext';

export default function MobileMenuToggle() {
  const { isMobileOpen, toggleMobileMenu } = useSidebar();
  return (
    <button
      className="mobile-menu-toggle shadcn-button-ghost shadcn-button-icon"
      id="mobileMenuToggle"
      aria-label="Toggle menu"
      aria-expanded={isMobileOpen}
      onClick={toggleMobileMenu}
    >
      <div className={`mobile-toggle-icon ${isMobileOpen ? "open" : ""}`}>
        <Menu size={20} />
      </div>
    </button>
  );
}
