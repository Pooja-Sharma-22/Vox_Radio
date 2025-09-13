import React from 'react';
import { Card, CardContent } from './ui/card';
import { Thermometer, Droplets, Wind, CloudRain, Clock, Zap } from 'lucide-react';
import { formatMonrovia, formatMonroviaFull } from '../utils/timeUtils';

const WeatherCard = ({ weather }) => {
  const getRainColor = (probability) => {
    if (probability >= 80) return 'text-red-600 bg-red-50';
    if (probability >= 60) return 'text-orange-600 bg-orange-50';
    return 'text-blue-600 bg-blue-50';
  };

  const getIntensityIcon = (intensity) => {
    switch (intensity?.toLowerCase()) {
      case 'heavy': return <Zap size={12} className="text-red-500" />;
      case 'moderate': return <CloudRain size={12} className="text-orange-500" />;
      case 'light': return <Droplets size={12} className="text-blue-500" />;
      default: return <CloudRain size={12} className="text-gray-500" />;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-orange-300">
      <CardContent className="p-3 sm:p-4">
        <h4 className="font-bold text-gray-900 mb-2 sm:mb-3 text-base sm:text-lg">{weather.city}, {weather.country}</h4>
        
        <div className="text-2xl sm:text-4xl font-bold text-orange-500 mb-2 flex items-center">
          <Thermometer className="mr-1 sm:mr-2" size={24} />
          {weather.temperature}°F
        </div>
        
        <p className="text-gray-700 font-medium mb-3 sm:mb-4 text-sm sm:text-base">{weather.condition}</p>
        
        {/* Rain Prediction Section */}
        {weather.rainPrediction && (
          <div className={`mb-3 p-2 rounded-lg border ${getRainColor(weather.rainPrediction.probability)}`}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-1">
                <CloudRain size={14} />
                <span className="font-semibold text-xs">Rain Prediction</span>
              </div>
              <span className="text-xs font-bold">{weather.rainPrediction.probability}%</span>
            </div>
            
            <div className="space-y-1 text-xs">
              <div className="flex items-center space-x-1">
                <Clock size={10} />
                <span>Next: {weather.rainPrediction.nextRainIn}</span>
              </div>
              <div className="flex items-center space-x-1">
                {getIntensityIcon(weather.rainPrediction.intensity)}
                <span>{weather.rainPrediction.intensity} • {weather.rainPrediction.duration}</span>
              </div>
            </div>
          </div>
        )}
        
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