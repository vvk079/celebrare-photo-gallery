import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ searchQuery, onSearchChange, onClearSearch }) {
  return (
    <div className="w-full max-w-xl mx-auto my-6 sm:my-8 px-4">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400 group-focus-within:text-neutral-700 transition-colors">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Filter photos by author name..."
          className="w-full pl-11 pr-10 py-3 bg-white border border-neutral-200 rounded-xl text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 transition-all shadow-sm"
          aria-label="Filter photos by author name"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={onClearSearch}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-neutral-700 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
