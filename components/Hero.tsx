
import React, { useState, useEffect, useCallback } from 'react';
import { getTrending } from '../services/tmdbService';
import type { MediaItem } from '../types';
import { BACKDROP_BASE_URL } from '../constants';
import { PlayIcon, StarIcon, ChevronLeftIcon, ChevronRightIcon } from './icons/Icons';

interface HeroProps {
  onWatch: (id: number, type: 'movie' | 'tv') => void;
}

const Hero: React.FC<HeroProps> = ({ onWatch }) => {
  const [slides, setSlides] = useState<MediaItem[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    getTrending('movie', 'day')
      .then(data => setSlides(data.results.slice(0, 5)))
      .catch(error => console.error('Error fetching hero slides:', error));
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  
  useEffect(() => {
    if (slides.length > 0) {
      const slideInterval = setInterval(nextSlide, 7000);
      return () => clearInterval(slideInterval);
    }
  }, [slides.length, nextSlide]);

  if (slides.length === 0) {
    return <div className="h-[70vh] bg-slate-800 animate-pulse"></div>;
  }

  const activeSlide = slides[currentSlide];

  return (
    <section className="relative h-[70vh] w-full overflow-hidden mb-16 -mt-20">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={`${BACKDROP_BASE_URL}${slide.backdrop_path}`}
            alt={slide.title || slide.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
        </div>
      ))}
      
      <div className="absolute inset-0 flex items-end p-8 md:p-16 text-white z-10">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-bold font-playfair mb-4 drop-shadow-lg">{activeSlide.title}</h2>
          <p className="text-slate-300 mb-6 text-sm md:text-base leading-relaxed hidden md:block">
            {activeSlide.overview.substring(0, 150)}...
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onWatch(activeSlide.id, activeSlide.media_type || 'movie')}
              className="flex items-center gap-2 px-6 py-3 rounded-full text-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
            >
              <PlayIcon />
              <span>Watch Now</span>
            </button>
            <div className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full">
              <StarIcon className="text-yellow-400" />
              <span className="font-bold text-lg">{activeSlide.vote_average.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 right-8 z-10 flex items-center gap-2">
        <button onClick={prevSlide} className="w-12 h-12 rounded-full bg-black/30 hover:bg-black/60 flex items-center justify-center transition-colors">
          <ChevronLeftIcon />
        </button>
        <button onClick={nextSlide} className="w-12 h-12 rounded-full bg-black/30 hover:bg-black/60 flex items-center justify-center transition-colors">
          <ChevronRightIcon />
        </button>
      </div>

       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full cursor-pointer transition-all duration-500 ${
              index === currentSlide ? 'w-8 bg-red-500' : 'w-4 bg-slate-500/50'
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
