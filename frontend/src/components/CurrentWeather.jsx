import React, { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard';
import { getCurrentWeatherData } from '../data/mockData';

const CurrentWeather = () => {
  const [weatherData, setWeatherData] = useState(getCurrentWeatherData());
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [nextRotation, setNextRotation] = useState('');

  // Calculate next rotation time - stable function
  const calculateNextRotation = () => {
    const now = new Date();
    const minutes = now.getMinutes();
    const nextRotationMinute = Math.ceil((minutes + 1) / 15) * 15;
    const nextRotationTime = new Date(now);
    
    if (nextRotationMinute >= 60) {
      nextRotationTime.setHours(nextRotationTime.getHours() + 1);
      nextRotationTime.setMinutes(0);
    } else {
      nextRotationTime.setMinutes(nextRotationMinute);
    }
    
    nextRotationTime.setSeconds(0);
    return nextRotationTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Get current set info - stable function
  const getCurrentSetInfo = () => {
    const now = new Date();
    const minutes = now.getMinutes();
    const rotationIndex = Math.floor(minutes / 15);
    
    const setNames = [
      "Major Cities",
      "Coastal Cities", 
      "Northern Cities",
      "Central/Eastern Cities",
      "Mining/Rural Areas"
    ];
    
    return setNames[rotationIndex % setNames.length];
  };

  // Update weather data every 15 minutes
  useEffect(() => {
    const updateWeatherData = () => {
      const newData = getCurrentWeatherData();
      setWeatherData(newData);
      setLastUpdate(new Date());
      setNextRotation(calculateNextRotation());
    };

    // Initial calculation
    setNextRotation(calculateNextRotation());

    // Set up interval to update every minute to check for rotation
    const interval = setInterval(() => {
      const now = new Date();
      const minutes = now.getMinutes();
      
      // Update at 0, 15, 30, 45 minutes
      if (minutes % 15 === 0 && now.getSeconds() < 10) {
        updateWeatherData();
      } else {
        // Update next rotation time display only
        setNextRotation(calculateNextRotation());
      }
    }, 10000); // Check every 10 seconds for smoother updates

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-3 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
        <div className="mb-3 sm:mb-0">
          <h3 className="text-lg sm:text-2xl font-bold text-gray-900 flex items-center">
            <span className="mr-2 sm:mr-3">🌤️</span>
            Current Weather - Liberia
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Showing: <span className="font-medium text-orange-600">{getCurrentSetInfo()}</span>
          </p>
        </div>
        <div className="text-left sm:text-right">
          <div className="text-xs sm:text-sm text-gray-500">
            Last updated: {lastUpdate.toLocaleString()}
          </div>
          <div className="text-xs text-orange-600 mt-1">
            Next rotation: {nextRotation}
          </div>
        </div>
      </div>
      
      {/* Rotation Info Banner */}
      <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-orange-50 border border-orange-200 rounded-lg">
        <div className="flex items-start sm:items-center gap-2">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse mt-1 sm:mt-0 flex-shrink-0"></div>
          <p className="text-xs sm:text-sm text-orange-800">
            <strong>Auto-Rotation:</strong> Cities change automatically every 15 minutes to show different regions across Liberia
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {weatherData.map((weather, index) => (
          <WeatherCard key={`${weather.city}-${index}`} weather={weather} />
        ))}
      </div>
      
      {/* Rotation Schedule */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-3">15-Minute Rotation Schedule:</h4>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
          <div className="p-2 bg-white rounded border">
            <div className="font-medium text-gray-900">:00 - :14</div>
            <div className="text-gray-600">Major Cities</div>
            <div className="text-gray-500">Monrovia, Gbarnga, Buchanan, Kakata</div>
          </div>
          <div className="p-2 bg-white rounded border">
            <div className="font-medium text-gray-900">:15 - :29</div>
            <div className="text-gray-600">Coastal Cities</div>
            <div className="text-gray-500">Harper, Greenville, Grand Bassa, River Cess</div>
          </div>
          <div className="p-2 bg-white rounded border">
            <div className="font-medium text-gray-900">:30 - :44</div>
            <div className="text-gray-600">Northern Cities</div>
            <div className="text-gray-500">Voinjama, Kolahun, Foya, Zorzor</div>
          </div>
          <div className="p-2 bg-white rounded border">
            <div className="font-medium text-gray-900">:45 - :59</div>
            <div className="text-gray-600">Central/Eastern</div>
            <div className="text-gray-500">Zwedru, Pleebo, Tubmanburg, Robertsport</div>
          </div>
          <div className="p-2 bg-white rounded border">
            <div className="font-medium text-gray-900">Next Hour</div>
            <div className="text-gray-600">Mining/Rural Areas</div>
            <div className="text-gray-500">Yekepa, Bong Mines, Harbel, Bomi Hills</div>
          </div>
        </div>
      </div>

      {/* Link to Weather Forecast */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Extended Weather Forecast</h4>
            <p className="text-sm text-blue-800">
              View 2-day weather predictions for counties and cities across Liberia
            </p>
          </div>
          <div className="text-2xl">🌈</div>
        </div>
        <p className="text-xs text-blue-600 mt-2">
          → Switch to the "Weather Forecast" tab to see detailed predictions
        </p>
      </div>
    </div>
  );
};

export default CurrentWeather;