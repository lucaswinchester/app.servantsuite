import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBox({ placeholder, onChange }) {
  return (
    <div className="search-box">
      <div className="search-icon">
        <Search size={16} />
      </div>
      <input 
        type="text" 
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
