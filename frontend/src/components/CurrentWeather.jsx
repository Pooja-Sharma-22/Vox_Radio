import React from 'react';
import WeatherCard from './WeatherCard';
import { mockWeatherData } from '../data/mockData';

const CurrentWeather = () => {
  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Current Weather</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockWeatherData.map((weather, index) => (
          <WeatherCard key={index} weather={weather} />
        ))}
      </div>
    </div>
  );
};

export default CurrentWeather;