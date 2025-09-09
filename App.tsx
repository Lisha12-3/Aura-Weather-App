import React, { useState, useEffect, useCallback } from 'react';
import { fetchWeatherData } from './services/geminiService';
import type { WeatherData } from './types';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import Loader from './components/Loader';
import ErrorDisplay from './components/ErrorDisplay';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getWeatherData = useCallback(async (city: string) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);
    try {
      const data = await fetchWeatherData(city);
      setWeatherData(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getWeatherData('Mumbai');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getWeatherData]);

  const handleSearch = (city: string) => {
    getWeatherData(city);
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-slate-900 to-gray-800 text-gray-100 selection:bg-teal-500/30">
      <div className="container mx-auto max-w-4xl flex flex-col items-center justify-center flex-grow gap-8 w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-200 text-center tracking-wider">
          Aura Weather
        </h1>
        
        <SearchBar onSearch={handleSearch} loading={loading} />

        {loading && <Loader />}
        {error && <ErrorDisplay message={error} />}
        
        {weatherData && (
          <div className="w-full flex flex-col items-center gap-8 animate-fade-in">
            <WeatherCard data={weatherData} />
            
            <div className="w-full max-w-3xl">
              <h3 className="text-xl font-semibold text-gray-300 mb-4 text-center">5-Day Forecast</h3>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {weatherData.forecast.slice(0, 5).map((item, index) => (
                  <ForecastCard key={index} item={item} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
       <footer className="w-full py-4 text-center text-gray-500 text-sm">
          <p>Created by Leesa</p>
        </footer>
       <style>{`
          @keyframes fade-in {
              from { opacity: 0; transform: translateY(15px); }
              to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
              animation: fade-in 0.6s ease-out forwards;
          }
      `}</style>
    </main>
  );
};

export default App;