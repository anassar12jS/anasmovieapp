
export interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  media_type?: 'movie' | 'tv';
  isTV?: boolean;
}

export interface Movie extends MediaItem {
  media_type: 'movie';
  release_date: string;
}

export interface TVShow extends MediaItem {
  media_type: 'tv';
  first_air_date: string;
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface Season {
  season_number: number;
  episode_count: number;
  name: string;
}

export interface Episode {
    episode_number: number;
    name: string;
}

export interface TVShowDetails extends TVShow {
  seasons: Season[];
}

export interface SeasonDetails {
    episodes: Episode[];
}

export type Page = 'home' | 'movies' | 'tv' | 'genres';

export type WatchItem = {
    id: number;
    type: 'movie' | 'tv';
};

export type AIGenieSuggestion = {
  title: string;
  year: number;
};
