import React from 'react';
import type { WeatherData } from '../types';
import WeatherIcon from './WeatherIcon';

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherDetail: React.FC<{ icon: JSX.Element; label: string; value: string | number }> = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="text-teal-400">{icon}</div>
    <div>
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="font-semibold text-gray-200">{value}</p>
    </div>
  </div>
);


const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  const { city, country, currentWeather } = data;

  return (
    <div className="w-full max-w-lg bg-slate-800/60 backdrop-blur-lg border border-slate-700/80 rounded-2xl shadow-xl text-gray-100 p-6 sm:p-8 transition-transform duration-300">
      {/* Location */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-bold">{city}</h2>
          <p className="text-gray-400">{country}</p>
        </div>
        <div className="text-right">
            <p className="text-5xl sm:text-6xl font-extrabold tracking-tighter">{Math.round(currentWeather.temperature)}°C</p>
        </div>
      </div>
      
      {/* Main Weather Visual */}
      <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 sm:gap-8 my-8 text-center sm:text-left">
          <div className="[filter:drop-shadow(0_5px_8px_rgba(0,0,0,0.4))]">
            <WeatherIcon iconName={currentWeather.icon} className="w-28 h-28" />
          </div>
          <p className="text-2xl capitalize font-medium text-gray-200">{currentWeather.condition}</p>
      </div>

      {/* Details */}
      <div className="border-t border-slate-700/80 pt-6 flex justify-around items-center">
        <WeatherDetail 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-3.333 0-6.667 2.667-10 8h20c-3.333-5.333-6.667-8-10-8z" /><path d="M12 8V4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}/><path d="M16 6v-2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}/><path d="M8 6v-2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}/></svg>}
          label="Humidity"
          value={`${currentWeather.humidity}%`}
        />
        <WeatherDetail
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 12h14M5 16h14" /></svg>}
          label="Wind Speed"
          value={`${currentWeather.windSpeed} km/h`}
        />
      </div>
    </div>
  );
};

export default WeatherCard;