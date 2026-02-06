import { useEffect, useMemo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { MovieCard } from '../components/MovieCard';
import { GenreRow } from '../components/GenreRow';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { searchMovies } from '../services/movieApi';
import { useFavorites } from '../hooks/useFavorites';
import { Movie, FilterOption, SortOption } from '../types';

// Genre categories for the homepage sections
const GENRE_SECTIONS = [
  { title: '🎬 Action & Adventure', searchTerm: 'avengers', type: 'movie' },
  { title: '😂 Comedy Hits', searchTerm: 'funny', type: 'movie' },
  { title: '🎭 Drama Essentials', searchTerm: 'story', type: 'movie' },
  { title: '👻 Horror & Thriller', searchTerm: 'scary', type: 'movie' },
  { title: '🚀 Sci-Fi Universe', searchTerm: 'star', type: 'movie' },
  { title: '📺 Trending Series', searchTerm: 'honor', type: 'series' },
  { title: '⚽ Sports Legends', searchTerm: 'rocky', type: 'movie' },
  { title: '🦸 Superhero Saga', searchTerm: 'batman', type: 'movie' },
];

export function HomePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const filter = (searchParams.get('type') || 'all') as FilterOption;
  const sort = (searchParams.get('sort') || 'year-desc') as SortOption;

  // Search Results Mode only if there is an active search query
  const isSearchMode = query.trim() !== '';

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const fetchMovies = async (searchQuery: string, typeFilter: string) => {
    // If query is empty, use a default to show content
    const effectiveQuery = searchQuery.trim() || 'popular';
    
    setLoading(true);
    setError(null);
    try {
      const data = await searchMovies(effectiveQuery, typeFilter);
      if (data.Response === 'True') {
        // Filter out movies without valid posters AND remove duplicates
        const seen = new Set();
        const uniqueMoviesWithPosters = data.Search.filter((movie) => {
          const isDuplicate = seen.has(movie.imdbID);
          seen.add(movie.imdbID);
          const hasValidPoster = movie.Poster && movie.Poster !== 'N/A';
          return !isDuplicate && hasValidPoster;
        });
        setMovies(uniqueMoviesWithPosters);
      } else {
        setMovies([]);
        setError(data.Error || 'No results found');
      }
    } catch (err) {
      setError('Failed to connect to movie database');
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch movies when search criteria changes
  useEffect(() => {
    if (isSearchMode) {
      fetchMovies(query, filter);
    } else {
      // Clear movies when returning to browse mode
      setMovies([]);
      setError(null);
      setLoading(false);
    }
  }, [query, filter, isSearchMode]);
  // Sort movies locally since API pagination makes server-side sort hard
  const sortedMovies = useMemo(() => {
    return [...movies].sort((a, b) => {
      if (sort === 'year-desc') return parseInt(b.Year) - parseInt(a.Year);
      if (sort === 'year-asc') return parseInt(a.Year) - parseInt(b.Year);
      if (sort === 'title-asc') return a.Title.localeCompare(b.Title);
      if (sort === 'title-desc') return b.Title.localeCompare(a.Title);
      return 0;
    });
  }, [movies, sort]);

  const handleToggleFavorite = useCallback((e: React.MouseEvent, movie: Movie) => {
    e.preventDefault();
    if (isFavorite(movie.imdbID)) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
  }, [isFavorite, removeFavorite, addFavorite]);

  // Memoize the grid to prevent unnecessary re-renders
  const movieGrid = useMemo(() => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 auto-rows-max min-h-[600px] w-full">
      {sortedMovies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          isFavorite={isFavorite(movie.imdbID)}
          onToggleFavorite={(e) => handleToggleFavorite(e, movie)}
        />
      ))}
    </div>
  ), [sortedMovies, isFavorite, handleToggleFavorite]);
  return (
    <>
      <Helmet defer={false}>
        <title>CINELOG - Discover Movies & Series</title>
        <meta name="description" content="Search and discover thousands of movies, series, and games. Find ratings, details, and build your personal collection with Cinema." />
        <meta name="keywords" content="movies, search, cinema, films, TV shows, discovery" />
        <meta property="og:title" content="Movie Search - Find Your Favorite Movies" />
        <meta property="og:description" content="Search and discover thousands of movies, series, and games with detailed information and ratings." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Movie Search - Cinema Discovery" />
        <meta name="twitter:description" content="Search and discover your favorite movies with ratings and details." />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Content - Either Search Results or Genre Rows */}
      <div className="relative min-h-screen">
        <AnimatePresence mode="wait">
          {isSearchMode ? (
            // Search Results Mode
            <motion.div
              key="search-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  {query ? (
                    <>Search results for "<span className="text-gold">{query}</span>"</>
                  ) : (
                    <>Results for <span className="text-gold lowercase">{filter}s</span></>
                  )}
                </h2>
                <span className="text-sm text-gray-500">{sortedMovies.length} results</span>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-20 min-h-[400px]">
                  <LoadingSpinner />
                </div>
              ) : error ? (
                <div className="grid grid-cols-1 w-full min-h-[400px]">
                  <div className="col-span-full py-12">
                    <ErrorMessage
                      message={error}
                      onRetry={() => fetchMovies(query, filter)}
                    />
                  </div>
                </div>
              ) : (
                movieGrid
              )}
            </motion.div>
          ) : (
            // Browse Mode - Genre Rows
            <motion.div
              key="genre-rows"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {GENRE_SECTIONS
                .filter(section => filter === 'all' || section.type === filter)
                .map((section) => (
                <GenreRow
                  key={section.title}
                  title={section.title}
                  searchTerm={section.searchTerm}
                  type={section.type}
                  sort={sort}
                />
              ))}
              
              {/* Optional: Show message if no rows match the filter */}
              {GENRE_SECTIONS.filter(section => filter === 'all' || section.type === filter).length === 0 && (
                <div className="py-20">
                  <ErrorMessage
                    message={`No ${filter} sections available at the moment.`}
                    onRetry={() => navigate('/')}
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </div>
    </>
  );
}