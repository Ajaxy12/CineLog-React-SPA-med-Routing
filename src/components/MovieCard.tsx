import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Movie } from '../types';
interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
  onImageFailed?: () => void;
}
export function MovieCard({
  movie,
  isFavorite,
  onToggleFavorite,
  onImageFailed
}: MovieCardProps) {
  const [imageError, setImageError] = useState(false);
  
  const hasPoster = movie.Poster && movie.Poster !== 'N/A';

  const handleImageError = () => {
    setImageError(true);
    onImageFailed?.();
  };

  // Don't render if poster failed to load
  if (hasPoster && imageError) {
    return null;
  }

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        y: 0
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      exit={{
        opacity: 0,
        scale: 0.9
      }}
      className="group relative bg-bg-secondary rounded-xl overflow-hidden shadow-lg border border-white/5 h-full flex flex-col">

      <Link to={`/movie/${movie.imdbID}`} className="block h-full flex flex-col">
        <div className="aspect-[2/3] relative overflow-hidden bg-gray-800 flex-shrink-0">
          {hasPoster ?
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            onError={handleImageError}
          /> :


          <div className="w-full h-full flex items-center justify-center text-gray-600">
              <span className="text-sm">No Poster</span>
            </div>
          }

          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-semibold text-lg leading-tight mb-2 line-clamp-2 group-hover:text-gold transition-colors">
            {movie.Title}
          </h3>

          <div className="flex items-center justify-between text-sm text-gray-400 mt-auto">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-gold" />
              <span className="font-medium text-gray-300">{movie.Year}</span>
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${
              movie.Type === 'movie' ? 'bg-gold/10 border-gold/20 text-gold' :
              movie.Type === 'series' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
              'bg-white/5 border-white/10 text-gray-400'
            }`}>
              {movie.Type}
            </span>
          </div>

          <div className="mt-3 flex items-center text-xs font-bold uppercase tracking-wider text-gold opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
            View Details 
            <svg className="w-3.5 h-3.5 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </Link>

      <button
        onClick={onToggleFavorite}
        className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all z-10"
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>

        <Heart
          className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-gold text-gold' : 'text-white'}`} />

      </button>
    </motion.div>);

}