import React from 'react';
import { Card, CardContent } from './ui/card';
import { Thermometer, Droplets, Wind, CloudRain, Clock, Zap } from 'lucide-react';

const WeatherCard = ({ weather }) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-orange-300">
      <CardContent className="p-3 sm:p-4">
        <h4 className="font-bold text-gray-900 mb-2 sm:mb-3 text-base sm:text-lg">{weather.city}, {weather.country}</h4>
        
        <div className="text-2xl sm:text-4xl font-bold text-orange-500 mb-2 flex items-center">
          <Thermometer className="mr-1 sm:mr-2" size={24} />
          {weather.temperature}°F
        </div>
        
        <p className="text-gray-700 font-medium mb-3 sm:mb-4 text-sm sm:text-base">{weather.condition}</p>
        
        <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
          <div className="flex items-center text-gray-600">
            <Droplets size={14} className="mr-1 sm:mr-2 text-blue-500" />
            <span>Humidity: {weather.humidity}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Wind size={14} className="mr-1 sm:mr-2 text-gray-500" />
            <span>Wind: {weather.windSpeed}</span>
          </div>
        </div>
        
        <p className="text-xs text-gray-500 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t">
          Updated: {weather.updated}
        </p>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;