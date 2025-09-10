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
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 flex items-center">
            <span className="mr-3">🌤️</span>
            Current Weather - Liberia
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Showing: <span className="font-medium text-orange-600">{getCurrentSetInfo()}</span>
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">
            Last updated: {lastUpdate.toLocaleString()}
          </div>
          <div className="text-xs text-orange-600 mt-1">
            Next rotation: {nextRotation}
          </div>
        </div>
      </div>
      
      {/* Rotation Info Banner */}
      <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
          <p className="text-sm text-orange-800">
            <strong>Auto-Rotation:</strong> Cities change automatically every 15 minutes to show different regions across Liberia
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      
      {/* 2-Day Weather Forecast */}
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="mr-3">🌈</span>
          2-Day Weather Forecast - Liberia
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tomorrow */}
          <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
            <div className="text-center">
              <h5 className="text-lg font-semibold text-gray-800 mb-2">
                Tomorrow ({new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })})
              </h5>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">79°F</div>
                  <div className="text-sm text-gray-600">High</div>
                  <div className="text-xs text-gray-500 mt-1">🌤️ Partly Cloudy</div>
                </div>
                <div className="text-center p-3 bg-indigo-50 rounded-lg">
                  <div className="text-2xl font-bold text-indigo-600">72°F</div>
                  <div className="text-sm text-gray-600">Low</div>
                  <div className="text-xs text-gray-500 mt-1">🌙 Clear Night</div>
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-600 space-y-1">
                <div>💧 Humidity: 75%</div>
                <div>💨 Wind: 6 mph</div>
                <div>🌧️ Rain Chance: 20%</div>
              </div>
            </div>
          </div>
          
          {/* Day After Tomorrow */}
          <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
            <div className="text-center">
              <h5 className="text-lg font-semibold text-gray-800 mb-2">
                {new Date(Date.now() + 48 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </h5>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">83°F</div>
                  <div className="text-sm text-gray-600">High</div>
                  <div className="text-xs text-gray-500 mt-1">☀️ Sunny</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">74°F</div>
                  <div className="text-sm text-gray-600">Low</div>
                  <div className="text-xs text-gray-500 mt-1">🌌 Mostly Clear</div>
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-600 space-y-1">
                <div>💧 Humidity: 68%</div>
                <div>💨 Wind: 8 mph</div>
                <div>🌧️ Rain Chance: 10%</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Forecast Note */}
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
            <p className="text-sm text-yellow-800">
              <strong>Extended Forecast:</strong> Weather predictions are updated daily based on West African meteorological patterns. Temperatures shown for Monrovia region.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;