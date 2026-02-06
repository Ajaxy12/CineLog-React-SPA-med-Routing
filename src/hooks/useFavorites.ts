import { useState, useEffect } from 'react';
import { Movie } from '../types';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const saved = localStorage.getItem('movie-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('movie-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (movie: Movie) => {
    setFavorites((prev) => {
      if (prev.some((m) => m.imdbID === movie.imdbID)) return prev;
      return [...prev, movie];
    });
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((m) => m.imdbID !== id));
  };

  const isFavorite = (id: string) => {
    return favorites.some((m) => m.imdbID === id);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
}