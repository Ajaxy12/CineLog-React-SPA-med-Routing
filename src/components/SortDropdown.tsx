import { useState, useRef, useEffect } from 'react';
import { ArrowUpDown, ChevronDown } from 'lucide-react';
import { SortOption } from '../types';

interface SortDropdownProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'year-desc', label: 'Newest' },
  { value: 'year-asc', label: 'Oldest' },
  { value: 'title-asc', label: 'A-Z' },
  { value: 'title-desc', label: 'Z-A' },
];

export function SortDropdown({ currentSort, onSortChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLabel = SORT_OPTIONS.find((opt) => opt.value === currentSort)?.label || 'Newest';

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleSelect = (value: SortOption) => {
    onSortChange(value);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center gap-2 shrink-0 border-l border-white/10 pl-4 ml-auto" ref={dropdownRef}>
      <ArrowUpDown className="w-3.5 h-3.5 text-gold hidden xs:block" aria-hidden="true" />
      <div className="relative">
        {/* Button to toggle dropdown */}
        {/* axe-ignore: aria-expanded uses valid 'true'/'false' string values */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 bg-transparent text-gold text-[10px] font-bold uppercase tracking-widest outline-none cursor-pointer hover:text-white transition-colors px-2 py-1 rounded"
          aria-label="Sort options"
          aria-expanded={isOpen ? 'true' : 'false'}
          aria-haspopup="listbox"
        >
          {currentLabel}
          <ChevronDown 
            className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            aria-hidden="true" 
          />
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-bg-secondary border border-white/10 rounded-md shadow-xl z-50 overflow-hidden">
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors ${
                  currentSort === option.value
                    ? 'bg-gold text-bg-primary'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
