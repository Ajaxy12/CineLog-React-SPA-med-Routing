import { MovieDetail, SearchResponse } from '../types';

const API_KEY = 'b9bd48a6'; // Public demo key often used in tutorials
const BASE_URL = 'https://www.omdbapi.com';

export async function searchMovies(
query: string,
type?: string,
page = 1)
: Promise<SearchResponse> {
  const typeParam = type && type !== 'all' ? `&type=${type}` : '';
  const response = await fetch(
    `${BASE_URL}/?apikey=${API_KEY}&s=${query}${typeParam}&page=${page}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }

  return response.json();
}

export async function getMovieById(id: string): Promise<MovieDetail> {
  const response = await fetch(
    `${BASE_URL}/?apikey=${API_KEY}&i=${id}&plot=full`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }

  const data = await response.json();

  if (data.Response === 'False') {
    throw new Error(data.Error || 'Movie not found');
  }

  return data;
}