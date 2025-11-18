
import React, { useState } from 'react';
import type { Page } from '../types';
import { HomeIcon, FilmIcon, TvIcon, SparklesIcon, MagnifyingGlassIcon, WandSparklesIcon } from './icons/Icons';

interface HeaderProps {
  onNavigate: (page: Page) => void;
  onSearch: (query: string) => void;
  onGenieClick: () => void;
  activePage: Page;
}

const NavLink: React.FC<{
  page: Page;
  activePage: Page;
  onNavigate: (page: Page) => void;
  icon: React.ReactNode;
  label: string;
}> = ({ page, activePage, onNavigate, icon, label }) => (
  <li>
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onNavigate(page);
      }}
      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
        activePage === page ? 'bg-red-600 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
      }`}
    >
      {icon}
      <span>{label}</span>
    </a>
  </li>
);

const Header: React.FC<HeaderProps> = ({ onNavigate, onSearch, onGenieClick, activePage }) => {
  const [query, setQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-8">
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="flex items-center gap-2 text-2xl font-bold font-playfair text-white">
              <span className="text-red-500"><FilmIcon /></span>
              MovieStream
            </a>
            <nav className="hidden md:flex">
              <ul className="flex items-center space-x-2">
                <NavLink page="home" activePage={activePage} onNavigate={onNavigate} icon={<HomeIcon />} label="Home" />
                <NavLink page="movies" activePage={activePage} onNavigate={onNavigate} icon={<FilmIcon />} label="Movies" />
                <NavLink page="tv" activePage={activePage} onNavigate={onNavigate} icon={<TvIcon />} label="Series" />
                <NavLink page="genres" activePage={activePage} onNavigate={onNavigate} icon={<SparklesIcon />} label="Genres" />
              </ul>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="bg-slate-800 border border-slate-700 text-white rounded-full py-2 pl-10 pr-4 w-40 md:w-64 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
              />
              <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <MagnifyingGlassIcon />
              </button>
            </form>
            <button
              onClick={onGenieClick}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <WandSparklesIcon />
              <span className="hidden sm:inline">AI Genie</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
