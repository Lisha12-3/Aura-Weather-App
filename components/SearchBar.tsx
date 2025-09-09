import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-lg rounded-xl shadow-lg bg-slate-800/60 backdrop-blur-sm border border-slate-700/80">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search for a city..."
        className="w-full bg-transparent text-gray-200 placeholder-gray-400 px-5 py-3 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-teal-500/50"
        disabled={loading}
        aria-label="Search for a city"
      />
      <button
        type="submit"
        className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-5 py-3 rounded-r-xl transition-colors duration-300 disabled:bg-teal-800/50 disabled:cursor-not-allowed flex items-center justify-center"
        disabled={loading}
        aria-label="Search"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;