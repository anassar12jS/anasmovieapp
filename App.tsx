
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ContentGrid from './components/ContentGrid';
import WatchPage from './components/WatchPage';
import AIGenieModal from './components/AIGenieModal';
import { getTrending, getMoviesByEndpoint, getTvShows, getMoviesByGenre, searchMulti } from './services/tmdbService';
import type { MediaItem, Page, WatchItem } from './types';
import { GENRE_MAP, GENRES } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [watchItem, setWatchItem] = useState<WatchItem | null>(null);
  const [isGenieVisible, setIsGenieVisible] = useState(false);
  const [content, setContent] = useState<{ [key: string]: MediaItem[] }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchHomeContent = useCallback(async () => {
    setIsLoading(true);
    try {
      const [trending, newMovies, continueWatching] = await Promise.all([
        getTrending('all', 'week'),
        getMoviesByEndpoint('upcoming'),
        Promise.resolve(JSON.parse(localStorage.getItem('moviestream_continue_watching') || '[]')),
      ]);
      setContent({
        trending: trending.results.slice(0, 12),
        newMovies: newMovies.results.slice(0, 12),
        continueWatching: continueWatching.slice(0, 12),
      });
    } catch (error) {
      console.error('Error fetching home content:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchPageContent = useCallback(async (page: Page, filter?: string) => {
    setIsLoading(true);
    try {
      let results: MediaItem[] = [];
      if (searchQuery) {
        const searchResults = await searchMulti(searchQuery);
        results = searchResults.results;
      } else if (page === 'movies') {
        const movies = await getMoviesByEndpoint(filter || 'top_rated');
        results = movies.results;
      } else if (page === 'tv') {
        const shows = await getTvShows(filter || 'popular');
        results = shows.results;
      } else if (page === 'genres') {
        const genreMovies = await getMoviesByGenre(GENRE_MAP[filter as keyof typeof GENRE_MAP] || 28);
        results = genreMovies.results;
      }
      setContent(prev => ({ ...prev, pageContent: results }));
    } catch (error) {
      console.error(`Error fetching content for ${page}:`, error);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (currentPage === 'home') {
      fetchHomeContent();
    } else {
      fetchPageContent(currentPage, 'top_rated');
    }
  }, [currentPage, fetchHomeContent, fetchPageContent]);

  const handleNavigation = (page: Page) => {
    setSearchQuery('');
    setCurrentPage(page);
    setWatchItem(null);
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage('home');
    setIsLoading(true);
    searchMulti(query)
      .then(data => {
        setContent({ searchResults: data.results });
      })
      .catch(error => console.error('Error searching:', error))
      .finally(() => setIsLoading(false));
  };
  
  const handleOpenWatch = (id: number, type: 'movie' | 'tv') => {
    setWatchItem({ id, type });
  };

  const handleCloseWatch = () => {
    setWatchItem(null);
    if (currentPage === 'home') {
        fetchHomeContent(); // Refresh continue watching
    }
  };

  const renderContent = () => {
    if (isLoading && (!content.trending || content.trending.length === 0)) {
        return <div className="text-center p-10">Loading...</div>;
    }

    if (searchQuery) {
      return (
        <ContentGrid
          title={`Search results for "${searchQuery}"`}
          items={content.searchResults || []}
          onCardClick={handleOpenWatch}
        />
      );
    }

    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onWatch={handleOpenWatch} />
            {content.continueWatching && content.continueWatching.length > 0 && (
                <ContentGrid title="Continue Watching" subtitle="Pick up where you left off" items={content.continueWatching} onCardClick={handleOpenWatch} />
            )}
            <ContentGrid title="Trending Now" subtitle="The hottest movies & shows this week" items={content.trending || []} onCardClick={handleOpenWatch} />
            <ContentGrid title="New Releases" subtitle="Fresh content just added" items={content.newMovies || []} onCardClick={handleOpenWatch} />
          </>
        );
      case 'movies':
        return <ContentGrid title="Top Movies" items={content.pageContent || []} onCardClick={handleOpenWatch} isFilterable onFilterChange={(filter) => fetchPageContent('movies', filter)} filterOptions={[{label: 'Top Rated', value: 'top_rated'}, {label: 'Popular', value: 'popular'}, {label: 'Upcoming', value: 'upcoming'}]} />;
      case 'tv':
        return <ContentGrid title="Popular Series" items={content.pageContent || []} onCardClick={handleOpenWatch} isFilterable onFilterChange={(filter) => fetchPageContent('tv', filter)} filterOptions={[{label: 'Popular', value: 'popular'}, {label: 'Top Rated', value: 'top_rated'}]} />;
      case 'genres':
        return <ContentGrid title="Explore by Genre" items={content.pageContent || []} onCardClick={handleOpenWatch} isFilterable onFilterChange={(filter) => fetchPageContent('genres', filter)} filterOptions={GENRES} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen">
      <Header 
        onNavigate={handleNavigation} 
        onSearch={handleSearch} 
        onGenieClick={() => setIsGenieVisible(true)}
        activePage={currentPage}
      />
      <main className="pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {renderContent()}
        </div>
      </main>
      {watchItem && <WatchPage item={watchItem} onClose={handleCloseWatch} />}
      {isGenieVisible && <AIGenieModal onClose={() => setIsGenieVisible(false)} onSelect={handleOpenWatch} />}
      <footer className="text-center py-8 mt-12 border-t border-slate-800 text-slate-500">
        <p>&copy; 2025 MovieStream AI. Your premium streaming destination.</p>
      </footer>
    </div>
  );
};

export default App;
