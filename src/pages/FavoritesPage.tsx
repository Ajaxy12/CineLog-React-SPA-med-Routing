import { motion } from 'framer-motion';
import { Heart, Film } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useFavorites } from '../hooks/useFavorites';
import { MovieCard } from '../components/MovieCard';
import { Link } from 'react-router-dom';
export function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();
  return (
    <>
      <Helmet defer={false}>
        <title>CINELOG - My Collection</title>
        <meta name="description" content="View and manage your favorite movies in your personal collection." />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-gold/10 rounded-full">
          <Heart className="w-6 h-6 text-gold fill-gold" />
        </div>
        <h1 className="text-3xl font-bold">My Collection</h1>
        <span className="ml-auto text-gray-500 text-sm bg-white/5 px-3 py-1 rounded-full">
          {favorites.length} movies
        </span>
      </div>

      {favorites.length === 0 ?
      <div className="text-center py-20 bg-bg-secondary/30 rounded-2xl border border-white/5 border-dashed">
          <Film className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
          <p className="text-gray-400 mb-6">
            Start building your collection by browsing movies.
          </p>
          <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-2 bg-gold text-bg-primary font-semibold rounded-lg hover:bg-yellow-500 transition-colors">

            Browse Movies
          </Link>
        </div> :

      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

          {favorites.map((movie) =>
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          isFavorite={true}
          onToggleFavorite={(e) => {
            e.preventDefault();
            removeFavorite(movie.imdbID);
          }} />

        )}
        </motion.div>
      }
    </div>
    </>);

}