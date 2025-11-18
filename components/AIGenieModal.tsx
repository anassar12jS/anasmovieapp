
import React, { useState, useEffect, useCallback } from 'react';
import { getAIRecommendations } from '../services/geminiService';
import { searchMulti } from '../services/tmdbService';
import type { AIGenieSuggestion, MediaItem } from '../types';
import MovieCard from './MovieCard';
import { WandSparklesIcon, XMarkIcon } from './icons/Icons';

interface AIGenieModalProps {
  onClose: () => void;
  onSelect: (id: number, type: 'movie' | 'tv') => void;
}

const AIGenieModal: React.FC<AIGenieModalProps> = ({ onClose, onSelect }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState<MediaItem[]>([]);

  const handleSearch = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setError('');
    setResults([]);
    try {
      const suggestions = await getAIRecommendations(prompt);
      const tmdbPromises = suggestions.map(suggestion => 
        searchMulti(`${suggestion.title} year:${suggestion.year}`).then(res => 
          res.results.find(item => item.media_type === 'movie' && item.poster_path)
        )
      );
      const tmdbResults = (await Promise.all(tmdbPromises)).filter(Boolean) as MediaItem[];
      setResults(tmdbResults);
    } catch (err) {
      setError('Could not find recommendations. Please try a different description.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
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
    <div className="fixed inset-0 bg-black/70 z-[200] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl shadow-purple-500/20 border border-slate-700">
        <header className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <WandSparklesIcon className="w-8 h-8 text-purple-400" />
            <h2 className="text-2xl font-bold font-playfair">AI Movie Genie</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-700 transition-colors">
            <XMarkIcon />
          </button>
        </header>
        <main className="p-6 flex-1 overflow-y-auto">
          <p className="text-slate-300 mb-4 text-center">Describe the movie or show you're looking for, and I'll find it for you!</p>
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="e.g., a sci-fi movie about dreams..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? 'Thinking...' : 'Find'}
            </button>
          </div>
          {error && <p className="text-red-400 text-center">{error}</p>}
          {results.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-center">Here's what I found:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {results.map(item => (
                  <MovieCard key={item.id} item={item} onClick={() => onSelect(item.id, 'movie')} />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AIGenieModal;
