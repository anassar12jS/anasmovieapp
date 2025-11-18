
import React, { useState, useEffect, useCallback } from 'react';
import type { WatchItem, TVShowDetails, Season, Episode } from '../types';
import { getTVShowDetails, getMovieDetails, getSeasonDetails } from '../services/tmdbService';
import { EMBED_BASE_URL } from '../constants';
import { ArrowLeftIcon, XMarkIcon } from './icons/Icons';

interface WatchPageProps {
  item: WatchItem;
  onClose: () => void;
}

const WatchPage: React.FC<WatchPageProps> = ({ item, onClose }) => {
  const [details, setDetails] = useState<TVShowDetails | null>(null);
  const [title, setTitle] = useState('Loading...');
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  const addToContinueWatching = (itemDetails: any) => {
    let continuing = JSON.parse(localStorage.getItem('moviestream_continue_watching') || '[]');
    continuing = continuing.filter((i: any) => i.id !== itemDetails.id);
    const newItem = {
        id: itemDetails.id,
        isTV: item.type === 'tv',
        title: itemDetails.title || itemDetails.name,
        poster_path: itemDetails.poster_path,
        vote_average: itemDetails.vote_average,
        overview: itemDetails.overview,
    };
    continuing.unshift(newItem);
    localStorage.setItem('moviestream_continue_watching', JSON.stringify(continuing.slice(0, 20)));
  };

  useEffect(() => {
    const fetchDetails = async () => {
      if (item.type === 'tv') {
        const tvDetails = await getTVShowDetails(item.id);
        setDetails(tvDetails);
        setTitle(tvDetails.name || 'TV Show');
        const firstSeason = tvDetails.seasons.find(s => s.season_number > 0);
        if (firstSeason) {
            setSelectedSeason(firstSeason.season_number);
        }
        addToContinueWatching(tvDetails);
      } else {
        const movieDetails = await getMovieDetails(item.id);
        setTitle(movieDetails.title || 'Movie');
        addToContinueWatching(movieDetails);
      }
    };
    fetchDetails();
  }, [item]);

  useEffect(() => {
    if (item.type === 'tv' && details) {
      getSeasonDetails(item.id, selectedSeason)
        .then(seasonData => {
            setEpisodes(seasonData.episodes);
            if(seasonData.episodes.length > 0) {
                setSelectedEpisode(1);
            }
        });
    }
  }, [item.id, item.type, selectedSeason, details]);

  const getEmbedUrl = () => {
    if (item.type === 'movie') return `${EMBED_BASE_URL}/movie/${item.id}`;
    return `${EMBED_BASE_URL}/tv/${item.id}?s=${selectedSeason}&e=${selectedEpisode}`;
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);


  return (
    <div className="fixed inset-0 bg-slate-900 z-[100] flex flex-col animate-fade-in">
      <header className="flex items-center justify-between p-4 bg-slate-900/80 backdrop-blur-lg border-b border-slate-800">
        <div className="flex items-center gap-4">
            <button onClick={onClose} className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 text-slate-300 hover:bg-slate-700 hover:text-white">
                <ArrowLeftIcon /> Back
            </button>
            <h2 className="text-xl font-bold truncate">{title}</h2>
        </div>
        {item.type === 'tv' && details && (
          <div className="flex items-center gap-4">
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(Number(e.target.value))}
              className="bg-slate-800 border border-slate-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {details.seasons.filter(s => s.season_number > 0).map(season => (
                <option key={season.season_number} value={season.season_number}>
                  {season.name}
                </option>
              ))}
            </select>
            <select
              value={selectedEpisode}
              onChange={(e) => setSelectedEpisode(Number(e.target.value))}
              className="bg-slate-800 border border-slate-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {episodes.map(ep => (
                <option key={ep.episode_number} value={ep.episode_number}>
                  Episode {ep.episode_number}
                </option>
              ))}
            </select>
          </div>
        )}
         <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-700 transition-colors">
            <XMarkIcon />
         </button>
      </header>
      <main className="flex-1 bg-black">
        <iframe
          key={getEmbedUrl()} // Force re-render on URL change
          src={getEmbedUrl()}
          title="Movie Player"
          allowFullScreen
          className="w-full h-full border-0"
        ></iframe>
      </main>
    </div>
  );
};

export default WatchPage;
