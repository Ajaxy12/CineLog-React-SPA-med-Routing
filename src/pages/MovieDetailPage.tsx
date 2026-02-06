import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Star,
  Clock,
  Calendar,
  Globe,
  Award,
  Heart } from
'lucide-react';
import { getMovieById } from '../services/movieApi';
import { useFavorites } from '../hooks/useFavorites';
import { MovieDetail } from '../types';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
export function MovieDetailPage() {
  const { id } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  useEffect(() => {
    if (!id) return;
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const data = await getMovieById(id);
        setMovie(data);
      } catch (err) {
        setError('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ErrorMessage
          message={error || 'Movie not found'}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }


  const isFav = isFavorite(movie.imdbID);
  
  return (
    <>
      <Helmet defer={false}>
        <title>CINELOG - {movie.Title} ({movie.Year})</title>
        <meta name="description" content={`${movie.Title} - Rating: ${movie.imdbRating}/10. ${movie.Plot || 'Discover details about this movie.'}`} />
        <meta name="keywords" content={`${movie.Title}, ${movie.Year}, ${movie.Director}, ${movie.Genre}`} />
        <meta property="og:title" content={`${movie.Title} (${movie.Year})`} />
        <meta property="og:description" content={movie.Plot || `Details about ${movie.Title}`} />
        <meta property="og:type" content="movie" />
        <meta property="og:image" content={movie.Poster !== 'N/A' ? movie.Poster : ''} />
        <meta property="og:url" content={`${window.location.href}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${movie.Title} (${movie.Year})`} />
        <meta name="twitter:description" content={movie.Plot || `Discover ${movie.Title}`} />
        <meta name="twitter:image" content={movie.Poster !== 'N/A' ? movie.Poster : ''} />
      </Helmet>
      <motion.div
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        className="min-h-screen bg-bg-primary">

      {/* Backdrop Banner */}
      <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-primary z-10" />
        <div className="absolute inset-0 bg-black/60 z-0" />
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : ''}
          alt="Backdrop"
          className="w-full h-full object-cover blur-sm opacity-50" />


        <div className="absolute top-4 left-4 z-20">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-white/10 transition-colors">

            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-20 pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <motion.div
              initial={{
                y: 20,
                opacity: 0
              }}
              animate={{
                y: 0,
                opacity: 1
              }}
              className="w-64 md:w-80 rounded-xl overflow-hidden shadow-2xl border-4 border-white/10">

              <img
                src={
                movie.Poster !== 'N/A' ?
                movie.Poster :
                'https://via.placeholder.com/300x450?text=No+Poster'
                }
                alt={movie.Title}
                className="w-full h-auto" />

            </motion.div>
          </div>

          {/* Details */}
          <div className="flex-1 pt-4 md:pt-12">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
              <div>
                <motion.h1
                  initial={{
                    y: 20,
                    opacity: 0
                  }}
                  animate={{
                    y: 0,
                    opacity: 1
                  }}
                  transition={{
                    delay: 0.1
                  }}
                  className="text-4xl font-bold mb-2 text-white">

                  {movie.Title}
                </motion.h1>
                <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
                  <span className="px-2 py-1 bg-white/10 rounded border border-white/5">
                    {movie.Rated}
                  </span>
                  <span>{movie.Year}</span>
                  <span>{movie.Genre}</span>
                </div>
              </div>

              <button
                onClick={() =>
                isFav ? removeFavorite(movie.imdbID) : addFavorite(movie)
                }
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${isFav ? 'bg-gold text-bg-primary hover:bg-yellow-500' : 'bg-white/10 text-white hover:bg-white/20'}`}>

                <Heart
                  className={`w-5 h-5 ${isFav ? 'fill-bg-primary' : ''}`} />

                {isFav ? 'In Favorites' : 'Add to Favorites'}
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-bg-secondary p-4 rounded-lg border border-white/5">
                <div className="flex items-center gap-2 text-gold mb-1">
                  <Star className="w-4 h-4" />
                  <span className="font-bold">{movie.imdbRating}</span>
                </div>
                <p className="text-xs text-gray-500">IMDb Rating</p>
              </div>
              <div className="bg-bg-secondary p-4 rounded-lg border border-white/5">
                <div className="flex items-center gap-2 text-blue-400 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="font-bold">{movie.Runtime}</span>
                </div>
                <p className="text-xs text-gray-500">Duration</p>
              </div>
              <div className="bg-bg-secondary p-4 rounded-lg border border-white/5">
                <div className="flex items-center gap-2 text-green-400 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="font-bold">{movie.Released}</span>
                </div>
                <p className="text-xs text-gray-500">Released</p>
              </div>
              <div className="bg-bg-secondary p-4 rounded-lg border border-white/5">
                <div className="flex items-center gap-2 text-purple-400 mb-1">
                  <Globe className="w-4 h-4" />
                  <span className="font-bold truncate">
                    {movie.Country.split(',')[0]}
                  </span>
                </div>
                <p className="text-xs text-gray-500">Country</p>
              </div>
            </div>

            {/* Plot & Info */}
            <div className="space-y-6 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Plot</h3>
                <p className="leading-relaxed">{movie.Plot}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Director
                  </h3>
                  <p className="text-white">{movie.Director}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Writers
                  </h3>
                  <p className="text-white">{movie.Writer}</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Cast
                  </h3>
                  <p className="text-white">{movie.Actors}</p>
                </div>
                {movie.Awards !== 'N/A' &&
                <div className="md:col-span-2 bg-gold/10 p-4 rounded-lg border border-gold/20">
                    <div className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-gold mt-1" />
                      <div>
                        <h3 className="font-semibold text-gold mb-1">Awards</h3>
                        <p className="text-sm text-gray-300">{movie.Awards}</p>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      </motion.div>
    </>
  );
}