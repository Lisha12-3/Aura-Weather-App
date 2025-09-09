import React from 'react';
import type { ForecastItem } from '../types';
import WeatherIcon from './WeatherIcon';

interface ForecastCardProps {
  item: ForecastItem;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ item }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-800/60 backdrop-blur-lg border border-slate-700/80 rounded-xl shadow-lg flex-1 min-w-[110px] m-1 transition-transform transform hover:scale-105 duration-300 text-gray-200">
      <p className="font-bold text-base text-gray-300">{item.day.substring(0, 3)}</p>
      <div className="my-2 [filter:drop-shadow(0_2px_3px_rgba(0,0,0,0.4))]">
        <WeatherIcon iconName={item.icon} className="w-10 h-10" />
      </div>
      <p className="text-lg font-semibold">{Math.round(item.temperature)}°C</p>
      <p className="text-xs capitalize text-center text-gray-400 mt-1">{item.condition}</p>
    </div>
  );
};

export default ForecastCard;