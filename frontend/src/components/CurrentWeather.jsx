import React from 'react';
import WeatherCard from './WeatherCard';
import { mockWeatherData } from '../data/mockData';

const CurrentWeather = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="mr-3">🌤️</span>
          Current Weather - Liberia
        </h3>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockWeatherData.map((weather, index) => (
          <WeatherCard key={index} weather={weather} />
        ))}
      </div>
    </div>
  );
};

export default CurrentWeather;