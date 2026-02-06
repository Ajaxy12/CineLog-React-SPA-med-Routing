import { useEffect, useState, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MovieCard } from './MovieCard';
import { searchMovies } from '../services/movieApi';
import { useFavorites } from '../hooks/useFavorites';
import { Movie, SortOption } from '../types';

interface GenreRowProps {
  title: string;
  searchTerm: string;
  type?: string;
  sort?: SortOption;
}

export function GenreRow({ title, searchTerm, type, sort = 'year-desc' }: GenreRowProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const [visibleMovies, setVisibleMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchGenreMovies = async () => {
      setLoading(true);
      try {
        const data = await searchMovies(searchTerm, type || 'movie');
        if (data.Response === 'True') {
          // Filter out movies without valid posters AND remove duplicates
          const seen = new Set();
          const uniqueMoviesWithPosters = data.Search.filter((movie) => {
            const isDuplicate = seen.has(movie.imdbID);
            seen.add(movie.imdbID);
            const hasValidPoster = movie.Poster && movie.Poster !== 'N/A';
            return !isDuplicate && hasValidPoster;
          });
          
          // Fetch more movies as a backup pool in case some images fail to load
          const pool = uniqueMoviesWithPosters.slice(0, 40);
          setMovies(pool);
          setVisibleMovies(pool);
        }
      } catch (err) {
        console.error(`Failed to fetch ${title}:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchGenreMovies();
  }, [searchTerm, type, title]);

  const handleImageFailed = (failedMovieId: string) => {
    // Remove the movie from visible list if its image fails to load
    setVisibleMovies((prev) => {
      const updated = prev.filter((m) => m.imdbID !== failedMovieId);
      
      // If we have less than 10 visible movies, try to add more from the original list
      if (updated.length < 10 && movies.length > updated.length) {
        const existingIds = new Set(updated.map((m) => m.imdbID));
        const nextMovie = movies.find((m) => !existingIds.has(m.imdbID));
        if (nextMovie) {
          return [...updated, nextMovie];
        }
      }
      
      return updated;
    });
  };

  const handleToggleFavorite = (e: React.MouseEvent, movie: Movie) => {
    e.preventDefault();
    if (isFavorite(movie.imdbID)) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
  };

  // Sort visible movies
  const sortedVisibleMovies = useMemo(() => {
    return [...visibleMovies].sort((a, b) => {
      if (sort === 'year-desc') return parseInt(b.Year) - parseInt(a.Year);
      if (sort === 'year-asc') return parseInt(a.Year) - parseInt(b.Year);
      if (sort === 'title-asc') return a.Title.localeCompare(b.Title);
      if (sort === 'title-desc') return b.Title.localeCompare(a.Title);
      return 0;
    });
  }, [visibleMovies, sort]);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    checkScroll();
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener('scroll', checkScroll);
      return () => ref.removeEventListener('scroll', checkScroll);
    }
  }, [visibleMovies]);

  if (loading) {
    return null;
  }

  if (visibleMovies.length === 0) return null;

  return (
    <div className="mb-10 group/row">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          {title}
          <ChevronRight className="w-5 h-5 text-gold opacity-0 group-hover/row:opacity-100 group-hover/row:translate-x-1 transition-all" />
        </h2>
        <span className="text-xs text-gray-500 uppercase tracking-widest">{visibleMovies.length} titles</span>
      </div>

      <div className="relative -mx-4 px-4 group/row-nav">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-bg-primary/90 backdrop-blur-sm border border-white/10 rounded-full p-2 opacity-0 group-hover/row-nav:opacity-100 transition-opacity hover:bg-gold hover:text-bg-primary hover:border-gold shadow-xl"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Scrollable Row */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-2 snap-x snap-mandatory"
        >
          {sortedVisibleMovies.map((movie, index) => (
            <motion.div
              key={movie.imdbID}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: index * 0.05 }}
              className="w-[75vw] sm:w-44 shrink-0 snap-center"
            >
              <MovieCard
                movie={movie}
                isFavorite={isFavorite(movie.imdbID)}
                onToggleFavorite={(e) => handleToggleFavorite(e, movie)}
                onImageFailed={() => handleImageFailed(movie.imdbID)}
              />
            </motion.div>
          ))}
        </div>

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-bg-primary/90 backdrop-blur-sm border border-white/10 rounded-full p-2 opacity-0 group-hover/row-nav:opacity-100 transition-opacity hover:bg-gold hover:text-bg-primary hover:border-gold shadow-xl"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Edge Fade Effects */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-2 w-12 bg-gradient-to-r from-bg-primary to-transparent pointer-events-none" />
        )}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-2 w-12 bg-gradient-to-l from-bg-primary to-transparent pointer-events-none" />
        )}
      </div>
    </div>
  );
}
