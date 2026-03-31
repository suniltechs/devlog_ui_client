"use client";

import React, { useEffect, useRef } from 'react';

interface FilterBarProps {
  filter: 'all' | 'error';
  setFilter: (filter: 'all' | 'error') => void;
  count: number;
  total: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filter, setFilter, count, total, searchQuery, setSearchQuery }) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex items-center gap-4 p-4 bg-zinc-900/50 border-b border-white/5 backdrop-blur-md sticky top-0 z-10 w-full">
      <div className="flex bg-zinc-800 p-0.5 rounded-lg border border-white/5 shrink-0">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
            filter === 'all' 
            ? 'bg-zinc-700 text-white shadow-sm' 
            : 'text-zinc-400 hover:text-white'
          }`}
        >
          All Logs
        </button>
        <button
          onClick={() => setFilter('error')}
          className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
            filter === 'error' 
            ? 'bg-red-500/20 text-red-500 shadow-sm' 
            : 'text-zinc-400 hover:text-red-400'
          }`}
        >
          Errors Only
        </button>
      </div>
      
      {/* Search Bar */}
      <div className="flex-1 relative max-w-md mx-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-zinc-500 text-sm">🔍</span>
        </div>
        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search logs... (Ctrl+K)"
          className="w-full bg-zinc-950/50 border border-white/10 rounded-md py-1.5 pl-9 pr-8 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all font-mono"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-zinc-300 font-bold"
          >
            ×
          </button>
        )}
      </div>

      <div className="ml-auto text-xs font-mono text-zinc-500 shrink-0">
        Showing {count} / {total} logs
      </div>
    </div>
  );
};
