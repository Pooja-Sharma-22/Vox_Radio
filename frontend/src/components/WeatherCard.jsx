import React from 'react';
import { Card, CardContent } from './ui/card';

const WeatherCard = ({ weather }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <h4 className="font-medium text-gray-900 mb-2">{weather.city}, {weather.country}</h4>
        <div className="text-3xl font-bold text-orange-500 mb-1">{weather.temperature}°C</div>
        <p className="text-gray-600 mb-3">{weather.condition}</p>
        <p className="text-xs text-gray-500">Updated: {weather.updated}</p>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;