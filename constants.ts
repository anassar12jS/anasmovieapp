
// IMPORTANT: Replace with your actual TMDB API key.
// It's highly recommended to store this in an environment variable.
export const TMDB_API_KEY = '123d3ef011d8c74c8d91a7a6a868ebfd';

export const API_BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
export const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280';
export const EMBED_BASE_URL = 'https://vidsrc.to/embed'; // Using a popular embed source

export const GENRE_MAP = {
  action: 28,
  comedy: 35,
  drama: 18,
  horror: 27,
  'sci-fi': 878,
  romance: 10749,
  thriller: 53,
  animation: 16
};

export const GENRES = [
    { label: 'Action', value: 'action' },
    { label: 'Comedy', value: 'comedy' },
    { label: 'Drama', value: 'drama' },
    { label: 'Horror', value: 'horror' },
    { label: 'Sci-Fi', value: 'sci-fi' },
    { label: 'Romance', value: 'romance' },
    { label: 'Thriller', value: 'thriller' },
    { label: 'Animation', value: 'animation' },
];
