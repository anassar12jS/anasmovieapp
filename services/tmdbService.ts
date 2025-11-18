
import { API_BASE_URL, TMDB_API_KEY } from '../constants';
import type { TMDBResponse, MediaItem, Movie, TVShow, TVShowDetails, SeasonDetails } from '../types';

const fetchFromTMDB = async <T,>(endpoint: string): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}&language=en-US`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data from TMDB');
  }
  return response.json();
};

export const getTrending = (type: 'all' | 'movie' | 'tv' = 'all', time: 'day' | 'week' = 'week'): Promise<TMDBResponse<MediaItem>> => {
  return fetchFromTMDB(`/trending/${type}/${time}`);
};

export const getMoviesByEndpoint = (endpoint: string = 'popular'): Promise<TMDBResponse<Movie>> => {
  return fetchFromTMDB(`/movie/${endpoint}`);
};

export const getTvShows = (endpoint: string = 'popular'): Promise<TMDBResponse<TVShow>> => {
  return fetchFromTMDB(`/tv/${endpoint}`);
};

export const getMoviesByGenre = (genreId: number): Promise<TMDBResponse<Movie>> => {
    return fetchFromTMDB(`/discover/movie&with_genres=${genreId}`);
}

export const searchMulti = (query: string): Promise<TMDBResponse<MediaItem>> => {
  return fetchFromTMDB(`/search/multi&query=${encodeURIComponent(query)}`);
};

export const getMovieDetails = (id: number): Promise<Movie> => {
  return fetchFromTMDB(`/movie/${id}`);
};

export const getTVShowDetails = (id: number): Promise<TVShowDetails> => {
  return fetchFromTMDB(`/tv/${id}`);
};

export const getSeasonDetails = (tvId: number, seasonNumber: number): Promise<SeasonDetails> => {
  return fetchFromTMDB(`/tv/${tvId}/season/${seasonNumber}`);
};
