export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

export interface MovieDetail extends Movie {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  imdbRating: string;
  BoxOffice: string;
}

export interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: 'True' | 'False';
  Error?: string;
}

export type SortOption = 'year-desc' | 'year-asc' | 'title-asc' | 'title-desc';
export type FilterOption = 'all' | 'movie' | 'series' | 'game';