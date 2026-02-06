import { FilterOption, SortOption } from '../types';
import { Filter, ArrowUpDown } from 'lucide-react';
interface FilterBarProps {
  filter: FilterOption;
  sort: SortOption;
  onFilterChange: (filter: FilterOption) => void;
  onSortChange: (sort: SortOption) => void;
}
export function FilterBar({
  filter,
  sort,
  onFilterChange,
  onSortChange
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-bg-secondary/50 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <Filter className="w-4 h-4 text-gold" />
        <span className="text-sm text-gray-400 font-bold uppercase tracking-wider">Type:</span>
        <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
          {(['all', 'movie', 'series', 'game'] as FilterOption[]).map(
            (option) =>
            <button
              key={option}
              onClick={() => onFilterChange(option)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap border ${filter === option ? 'bg-gold border-gold text-bg-primary shadow-lg shadow-gold/20' : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/10'}`}>

                {option}
              </button>

          )}
        </div>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <ArrowUpDown className="w-4 h-4 text-gold" />
        <span className="text-sm text-gray-400 font-bold uppercase tracking-wider">Sort:</span>
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="bg-bg-primary border border-white/10 text-gold text-sm rounded-lg focus:ring-2 focus:ring-gold/50 focus:border-gold block w-full sm:w-auto p-2.5 outline-none appearance-none cursor-pointer hover:border-gold/30 transition-all pr-10 font-bold uppercase tracking-wider [color-scheme:dark]"
            aria-label="Sort options">
            <option value="year-desc" className="bg-bg-secondary">Newest First</option>
            <option value="year-asc" className="bg-bg-secondary">Oldest First</option>
            <option value="title-asc" className="bg-bg-secondary">Title (A-Z)</option>
            <option value="title-desc" className="bg-bg-secondary">Title (Z-A)</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>);

}