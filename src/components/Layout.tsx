import { Link, NavLink, Outlet, useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { Film, Heart, Home } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { SortDropdown } from './SortDropdown';
import { FilterOption, SortOption } from '../types';

export function Layout() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const currentQuery = searchParams.get('q') || '';
  const currentFilter = (searchParams.get('type') || 'all') as FilterOption;
  const currentSort = (searchParams.get('sort') || 'year-desc') as SortOption;

  // Only show filters on the home page
  const isHomePage = location.pathname === '/';
  const showFilters = isHomePage;

  const handleSearch = (query: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (query) {
      newParams.set('q', query);
    } else {
      newParams.delete('q');
    }
    const paramString = newParams.toString();
    navigate(paramString ? '/?' + paramString : '/', { replace: false });
  };

  const handleFilterChange = (type: FilterOption) => {
    const newParams = new URLSearchParams(searchParams);
    if (type === 'all') {
      newParams.delete('type');
    } else {
      newParams.set('type', type);
    }
    const paramString = newParams.toString();
    navigate(paramString ? '/?' + paramString : '/', { replace: false });
  };

  const handleSortChange = (sort: SortOption) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', sort);
    navigate('/?' + newParams.toString());
  };

  const resetToHome = () => {
    navigate('/');
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-bg-primary">
      <header className="flex-shrink-0 z-50 bg-bg-primary/95 backdrop-blur-md border-b border-white/10 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Top Bar */}
          <div className="flex items-center justify-between h-16 gap-4">
            <Link to="/" className="flex items-center gap-4 group shrink-0" onClick={resetToHome}>
              <div className="flex items-center gap-2">
                <div className="bg-gold p-1.5 rounded-md group-hover:scale-110 transition-transform">
                  <Film className="w-5 h-5 text-bg-primary" />
                </div>
                <span className="font-bold text-xl tracking-tight hidden min-[400px]:inline">
                  CINE<span className="text-gold">LOG</span>
                </span>
              </div>
              
              <div className="hidden lg:flex flex-col border-l border-white/10 pl-4 h-8 justify-center">
                <span className="text-xs font-bold text-gold uppercase tracking-widest leading-none mb-1">Discover Cinema</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-tighter leading-none">Explore latest movies & series</span>
              </div>
            </Link>

            <div className="flex-grow max-w-md hidden sm:block">
              <SearchBar onSearch={handleSearch} initialQuery={currentQuery} />
            </div>

            <nav className="flex items-center gap-1 sm:gap-2 shrink-0">
              <Link
                to="/"
                className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all ${
                  location.pathname === '/' && !searchParams.toString() 
                  ? 'bg-white/10 text-white font-semibold' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                onClick={resetToHome}
              >
                <Home className="w-4 h-4" />
                <span className="hidden md:inline">Browse</span>
              </Link>

              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-full transition-all ${isActive ? 'bg-white/10 text-gold font-semibold' : 'text-gray-400 hover:text-gold hover:bg-white/5'}`
                }>

                <Heart className="w-4 h-4" />
                <span className="hidden md:inline">Favorites</span>
              </NavLink>
            </nav>
          </div>
          
          {/* Sub-Header: Filters & Sort (YouTube Style) - Only on home page */}
          {showFilters && (
            <div className="flex items-center justify-between py-2 border-t border-white/5 gap-4">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 pr-4 md:pr-0">
                {(['all', 'movie', 'series', 'game'] as FilterOption[]).map((option) => (
                  <button
                    key={option}
                    onClick={() => handleFilterChange(option)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${
                      currentFilter === option 
                      ? 'bg-gold border-gold text-bg-primary shadow-lg shadow-gold/20' 
                      : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:border-white/10 hover:text-white'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <SortDropdown currentSort={currentSort} onSortChange={handleSortChange} />
            </div>
          )}
          
          {/* Mobile Search Bar (Only shown on mobile) */}
          <div className="pb-3 sm:hidden">
            <SearchBar onSearch={handleSearch} initialQuery={currentQuery} />
          </div>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto scroll-smooth">
        <div className="flex flex-col min-h-full">
          <div className="flex-grow">
            <Outlet key={location.pathname + location.search} />
          </div>

          <footer className="bg-bg-secondary py-8 border-t border-white/5 mt-auto">
            <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
              <p>© 2024 CineLog. Student Project for JavaScript 2.</p>
              <p className="mt-1">Built by Amir Hemmatnia</p>
              <p className="mt-2">Powered by OMDB API</p>
            </div>
          </footer>
        </div>
      </main>
    </div>);

}