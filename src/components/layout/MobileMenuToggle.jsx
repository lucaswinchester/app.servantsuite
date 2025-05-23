import React from 'react';
import { Menu } from 'lucide-react';

export default function MobileMenuToggle({ isOpen, onClick }) {
  return (
    <button
      className="mobile-menu-toggle shadcn-button-ghost shadcn-button-icon"
      id="mobileMenuToggle"
      aria-label="Toggle menu"
      aria-expanded={isOpen}
      onClick={onClick}
    >
      <div className={`mobile-toggle-icon ${isOpen ? "open" : ""}`}>
        <Menu size={20} />
      </div>
    </button>
  );
}
