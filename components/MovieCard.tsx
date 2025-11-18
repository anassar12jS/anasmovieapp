
import React from 'react';
import type { MediaItem } from '../types';
import { IMAGE_BASE_URL } from '../constants';
import { PlayIcon, StarIcon } from './icons/Icons';

interface MovieCardProps {
  item: MediaItem;
  onClick: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ item, onClick }) => {
  const title = item.title || item.name;
  const posterUrl = item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div onClick={onClick} className="group relative rounded-lg overflow-hidden cursor-pointer shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-red-500/30">
      <img src={posterUrl} alt={title} className="w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-white font-bold text-base leading-tight drop-shadow-md">{title}</h3>
      </div>
      <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 text-xs font-semibold">
        <StarIcon className="text-yellow-400 w-3 h-3" />
        <span>{item.vote_average.toFixed(1)}</span>
      </div>
       <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-16 h-16 bg-red-600/80 rounded-full flex items-center justify-center">
            <PlayIcon className="w-8 h-8"/>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
