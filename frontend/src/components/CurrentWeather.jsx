import React, { useState, useEffect, useMemo } from 'react';
import WeatherCard from './WeatherCard';
import { getCurrentWeatherData } from '../data/mockData';
import { Button } from './ui/button';
import { formatMonrovia, formatMonroviaFull, nowMonrovia } from '../utils/timeUtils';
import { TIME_CONFIG } from '../config/timeConfig';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const CurrentWeather = () => {
  const [weatherData, setWeatherData] = useState(getCurrentWeatherData());
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [nextRotation, setNextRotation] = useState('');
  const [currentLiberiaTime, setCurrentLiberiaTime] = useState(new Date());
  const [serverTimeOffset, setServerTimeOffset] = useState(0);
  const [isServerTimeSynced, setIsServerTimeSynced] = useState(false);

  // Sync with server time on mount
  useEffect(() => {
    const syncServerTime = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/server-time`);
        if (response.ok) {
          const serverTime = await response.json();
          const serverUTC = new Date(serverTime.utc);
          const clientUTC = new Date();
          const offset = serverUTC.getTime() - clientUTC.getTime();
          
          setServerTimeOffset(offset);
          setIsServerTimeSynced(true);
          console.log('Weather page: Server time synced, offset:', offset, 'ms');
        } else {
          console.warn('Weather page: Failed to sync server time, using client time');
          setIsServerTimeSynced(false);
        }
      } catch (error) {
        console.warn('Weather page: Server time sync failed:', error.message);
        setIsServerTimeSynced(false);
      }
    };

    syncServerTime();
  }, []); // Remove BACKEND_URL from dependency array since it's constant

  // Update Liberia time every minute
  useEffect(() => {
    const updateLiberiaTime = () => {
      const now = nowMonrovia();
      if (isServerTimeSynced) {
        now.setTime(now.getTime() + serverTimeOffset);
      }
      setCurrentLiberiaTime(now);
    };

    // Update immediately
    updateLiberiaTime();

    // Then update every minute
    const timer = setInterval(updateLiberiaTime, 60000);

    return () => clearInterval(timer);
  }, [serverTimeOffset, isServerTimeSynced]);

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
      "Major Cities & Greater Monrovia",
      "Coastal Cities & Grand Bassa", 
      "Northern Cities & Nimba",
      "Central/Eastern Cities",
      "Mining Areas & Rural Counties"
    ];
    
    return setNames[rotationIndex % setNames.length];
  };

  // Update weather data every 15 minutes
  useEffect(() => {
    const updateWeatherData = () => {
      const newData = getCurrentWeatherData();
      // Update timestamps to Liberia time
      const liberiaTimestamp = nowMonrovia();
      if (isServerTimeSynced) {
        liberiaTimestamp.setTime(liberiaTimestamp.getTime() + serverTimeOffset);
      }
      
      // Update all weather data with Liberia timestamp
      const updatedData = newData.map(weather => ({
        ...weather,
        updated: formatMonroviaFull(liberiaTimestamp)
      }));
      
      setWeatherData(updatedData);
      setLastUpdate(liberiaTimestamp);
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

  // Format current Liberia time for display
  const currentTimeDisplay = useMemo(() => {
    return formatMonrovia(currentLiberiaTime, false);
  }, [currentLiberiaTime]);

  // Format last update time for display
  const lastUpdateDisplay = useMemo(() => {
    return formatMonrovia(lastUpdate, true);
  }, [lastUpdate]);

  return (
    <div className="p-3 sm:p-6">
      {/* Liberia Time Banner */}
      <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse mr-3"></div>
            <div>
              <div className="text-sm font-bold text-orange-900">
                Current Time: {currentTimeDisplay} GMT
              </div>
              <div className="text-xs text-orange-600">
                Liberia (West Africa) • All weather times in GMT
              </div>
            </div>
          </div>
          <div className="text-right">
            {isServerTimeSynced ? (
              <div className="text-xs text-green-600 font-medium">● Server Synced</div>
            ) : (
              <div className="text-xs text-yellow-600 font-medium">○ Local Time</div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
        <div className="mb-3 sm:mb-0">
          <h3 className="text-lg sm:text-2xl font-bold text-gray-900 flex items-center">
            <span className="mr-2 sm:mr-3">🌤️</span>
            Current Weather - Liberia (West Africa)
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Showing: <span className="font-medium text-orange-600">{getCurrentSetInfo()}</span>
          </p>
        </div>
        <div className="text-left sm:text-right">
          <div 
            className="text-xs sm:text-sm text-gray-500"
            aria-label={`Last updated at ${formatMonroviaFull(lastUpdate)} Africa/Monrovia time`}
          >
            Last updated: {lastUpdateDisplay}
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
      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">15-Minute Rotation Schedule:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3 text-xs">
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

      {/* Rain Forecast Summary */}
      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
          <span className="mr-2">🌧️</span>
          Rain Forecast Summary - Liberia
        </h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
          <div className="bg-white p-3 rounded border-l-4 border-red-500">
            <div className="text-sm font-semibold text-red-700">High Rain Risk</div>
            <div className="text-xs text-gray-600 mt-1">80%+ probability</div>
            <div className="text-xs mt-2">
              {weatherData.filter(w => w.rainPrediction?.probability >= 80).map(w => w.city).join(', ') || 'None currently'}
            </div>
          </div>
          
          <div className="bg-white p-3 rounded border-l-4 border-orange-500">
            <div className="text-sm font-semibold text-orange-700">Moderate Rain Risk</div>
            <div className="text-xs text-gray-600 mt-1">60-79% probability</div>
            <div className="text-xs mt-2">
              {weatherData.filter(w => w.rainPrediction?.probability >= 60 && w.rainPrediction?.probability < 80).map(w => w.city).join(', ') || 'None currently'}
            </div>
          </div>
          
          <div className="bg-white p-3 rounded border-l-4 border-blue-500">
            <div className="text-sm font-semibold text-blue-700">Low Rain Risk</div>
            <div className="text-xs text-gray-600 mt-1">Below 60% probability</div>
            <div className="text-xs mt-2">
              {weatherData.filter(w => w.rainPrediction?.probability < 60).map(w => w.city).join(', ') || 'None currently'}
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <div className="text-sm font-semibold text-yellow-800 mb-1">⚠️ Rainy Season Alert</div>
              <p className="text-xs text-yellow-800">
                Liberia is currently experiencing its rainy season (May-October). Expect frequent afternoon and evening thunderstorms. 
                Heavy rains can cause flooding in low-lying areas. Stay informed and plan travel accordingly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Link to Weather Forecast */}
      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
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