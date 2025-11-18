
import React, { useState } from 'react';
import type { MediaItem } from '../types';
import MovieCard from './MovieCard';

interface ContentGridProps {
  title: string;
  subtitle?: string;
  items: MediaItem[];
  onCardClick: (id: number, type: 'movie' | 'tv') => void;
  isFilterable?: boolean;
  onFilterChange?: (filter: string) => void;
  filterOptions?: { label: string; value: string }[];
}

const ContentGrid: React.FC<ContentGridProps> = ({
  title,
  subtitle,
  items,
  onCardClick,
  isFilterable = false,
  onFilterChange,
  filterOptions = [],
}) => {

  const [activeFilter, setActiveFilter] = useState(filterOptions[0]?.value || '');

  const handleFilterClick = (value: string) => {
    setActiveFilter(value);
    if(onFilterChange) onFilterChange(value);
  }

  return (
    <section className="my-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold font-playfair">{title}</h2>
          {subtitle && <p className="text-slate-400 mt-1">{subtitle}</p>}
        </div>
        {isFilterable && (
          <div className="flex items-center gap-2 mt-4 md:mt-0 flex-wrap">
            {filterOptions.map(opt => (
              <button
                key={opt.value}
                onClick={() => handleFilterClick(opt.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === opt.value ? 'bg-red-600 text-white' : 'bg-slate-800 hover:bg-slate-700'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {items.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {items.map(item => item && (
            <MovieCard
              key={item.id}
              item={item}
              onClick={() => onCardClick(item.id, (item.media_type || (item.title ? 'movie' : 'tv')) as 'movie' | 'tv')}
            />
          ))}
        </div>
      ) : (
        <p className="text-slate-500 text-center py-8">No content found.</p>
      )}
    </section>
  );
};

export default ContentGrid;
