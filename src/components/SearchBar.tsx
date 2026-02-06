import React, { useEffect, useState, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

export function SearchBar({ onSearch, initialQuery = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  
  // Keep a ref to the latest onSearch to avoid stale closures
  const onSearchRef = useRef(onSearch);
  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  // Sync state with initialQuery (for URL changes)
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      // Only trigger if query actually changed compared to URL
      if (query.trim() !== initialQuery.trim()) {
        onSearchRef.current(query.trim());
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [query, initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchRef.current(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full group">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-500 group-focus-within:text-gold transition-colors" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="block w-full pl-9 pr-10 py-2 bg-bg-secondary/60 border border-white/5 rounded-full leading-5 text-gold placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40 focus:bg-bg-secondary shadow-inner backdrop-blur-md text-sm font-medium transition-colors duration-150"
          placeholder="Search movies, series..."
        />
        
        <AnimatePresence>
          {query.length > 0 && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => {
                setQuery('');
                onSearchRef.current('');
              }}
              className="absolute inset-y-0 right-0 pr-4 flex items-center group/btn"
              title="Clear search"
            >
              <div className="p-1 rounded-full hover:bg-white/10 transition-colors">
                <X className="h-5 w-5 text-gray-400 group-hover/btn:text-white transition-colors" />
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}