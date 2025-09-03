import React from 'react';
import { Card, CardContent } from './ui/card';
import { Thermometer, Droplets, Wind } from 'lucide-react';

const WeatherCard = ({ weather }) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-orange-300">
      <CardContent className="p-4">
        <h4 className="font-bold text-gray-900 mb-3 text-lg">{weather.city}, {weather.country}</h4>
        
        <div className="text-4xl font-bold text-orange-500 mb-2 flex items-center">
          <Thermometer className="mr-2" size={32} />
          {weather.temperature}°C
        </div>
        
        <p className="text-gray-700 font-medium mb-4">{weather.condition}</p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-600">
            <Droplets size={16} className="mr-2 text-blue-500" />
            <span>Humidity: {weather.humidity}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Wind size={16} className="mr-2 text-gray-500" />
            <span>Wind: {weather.windSpeed}</span>
          </div>
        </div>
        
        <p className="text-xs text-gray-500 mt-3 pt-3 border-t">
          Updated: {weather.updated}
        </p>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;