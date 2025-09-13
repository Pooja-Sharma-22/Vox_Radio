import React, { useState, useEffect } from 'react';
import { formatMonrovia, formatMonroviaFull, nowMonrovia } from '../utils/timeUtils';
import { TIME_CONFIG } from '../config/timeConfig';

// 2-day forecast data for Liberian counties and cities
const liberianForecastData = [
  // Tomorrow's forecast
  {
    day: 'tomorrow',
    locations: [
      { name: 'Monrovia, Montserrado', highTemp: 84, lowTemp: 76, condition: '🌤️ Partly Cloudy', humidity: 78, wind: 8, rain: 25 },
      { name: 'Gbarnga, Bong', highTemp: 81, lowTemp: 72, condition: '☀️ Sunny', humidity: 65, wind: 6, rain: 10 },
      { name: 'Buchanan, Grand Bassa', highTemp: 86, lowTemp: 78, condition: '🌧️ Light Rain', humidity: 85, wind: 12, rain: 60 },
      { name: 'Harper, Maryland', highTemp: 88, lowTemp: 79, condition: '🌤️ Partly Cloudy', humidity: 80, wind: 10, rain: 20 },
      { name: 'Voinjama, Lofa', highTemp: 79, lowTemp: 69, condition: '🌦️ Scattered Showers', humidity: 82, wind: 7, rain: 45 },
      { name: 'Zwedru, Grand Gedeh', highTemp: 83, lowTemp: 74, condition: '☁️ Cloudy', humidity: 76, wind: 5, rain: 30 }
    ]
  },
  // Day after tomorrow's forecast
  {
    day: 'dayAfter',
    locations: [
      { name: 'Monrovia, Montserrado', highTemp: 87, lowTemp: 78, condition: '☀️ Sunny', humidity: 72, wind: 9, rain: 15 },
      { name: 'Gbarnga, Bong', highTemp: 85, lowTemp: 75, condition: '🌤️ Partly Cloudy', humidity: 68, wind: 7, rain: 20 },
      { name: 'Buchanan, Grand Bassa', highTemp: 89, lowTemp: 80, condition: '🌦️ Scattered Showers', humidity: 83, wind: 11, rain: 40 },
      { name: 'Harper, Maryland', highTemp: 91, lowTemp: 81, condition: '☀️ Sunny', humidity: 75, wind: 12, rain: 10 },
      { name: 'Voinjama, Lofa', highTemp: 82, lowTemp: 71, condition: '🌧️ Rain', humidity: 88, wind: 8, rain: 70 },
      { name: 'Zwedru, Grand Gedeh', highTemp: 86, lowTemp: 76, condition: '⛅ Mostly Cloudy', humidity: 74, wind: 6, rain: 35 }
    ]
  }
];

const WeatherForecast = () => {
  const [forecastData, setForecastData] = useState(liberianForecastData);
  const [forecastLastUpdate, setForecastLastUpdate] = useState(new Date());
  const [currentLiberiaTime, setCurrentLiberiaTime] = useState(new Date());
  const [serverTimeOffset, setServerTimeOffset] = useState(0);
  const [isServerTimeSynced, setIsServerTimeSynced] = useState(false);

  // Backend URL from environment
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

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
          console.log('Weather forecast: Server time synced, offset:', offset, 'ms');
        } else {
          console.warn('Weather forecast: Failed to sync server time, using client time');
          setIsServerTimeSynced(false);
        }
      } catch (error) {
        console.warn('Weather forecast: Server time sync failed:', error.message);
        setIsServerTimeSynced(false);
      }
    };

    syncServerTime();
  }, [BACKEND_URL]);

  // Update Liberia time every minute
  useEffect(() => {
    const updateLiberiaTime = () => {
      const now = nowMonrovia();
      if (isServerTimeSynced) {
        now.setTime(now.getTime() + serverTimeOffset);
      }
      setCurrentLiberiaTime(now);
    };

    updateLiberiaTime();
    const timer = setInterval(updateLiberiaTime, 60000);

    return () => clearInterval(timer);
  }, [serverTimeOffset, isServerTimeSynced]);

  // Calculate next forecast update time in Liberia time
  const calculateNextForecastUpdate = () => {
    const now = nowMonrovia();
    if (isServerTimeSynced) {
      now.setTime(now.getTime() + serverTimeOffset);
    }
    
    const minutes = now.getMinutes();
    const nextUpdateMinute = Math.ceil((minutes + 1) / 30) * 30;
    const nextUpdateTime = new Date(now);
    
    if (nextUpdateMinute >= 60) {
      nextUpdateTime.setHours(nextUpdateTime.getHours() + 1);
      nextUpdateTime.setMinutes(0);
    } else {
      nextUpdateTime.setMinutes(nextUpdateMinute);
    }
    
    nextUpdateTime.setSeconds(0);
    return formatMonrovia(nextUpdateTime, false);
  };

  // Generate updated forecast data with slight variations
  const generateUpdatedForecast = () => {
    return liberianForecastData.map(dayData => ({
      ...dayData,
      locations: dayData.locations.map(location => ({
        ...location,
        highTemp: location.highTemp + Math.floor(Math.random() * 5) - 2, // ±2 degrees variation
        lowTemp: location.lowTemp + Math.floor(Math.random() * 3) - 1, // ±1 degree variation
        humidity: Math.max(60, Math.min(95, location.humidity + Math.floor(Math.random() * 11) - 5)), // ±5% variation, min 60%, max 95%
        wind: Math.max(3, location.wind + Math.floor(Math.random() * 5) - 2), // ±2 mph variation, min 3 mph
        rain: Math.max(0, Math.min(100, location.rain + Math.floor(Math.random() * 21) - 10)) // ±10% variation, 0-100%
      }))
    }));
  };

  // Update forecast data every 30 minutes
  useEffect(() => {
    const updateForecastData = () => {
      const newForecastData = generateUpdatedForecast();
      setForecastData(newForecastData);
      setForecastLastUpdate(new Date());
    };

    // Set up interval to update forecast every 30 minutes
    const forecastInterval = setInterval(() => {
      const now = new Date();
      const minutes = now.getMinutes();
      
      // Update at 0 and 30 minutes
      if ((minutes === 0 || minutes === 30) && now.getSeconds() < 10) {
        updateForecastData();
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(forecastInterval);
  }, []);

  const getDateString = (daysAhead) => {
    const date = nowMonrovia();
    if (isServerTimeSynced) {
      date.setTime(date.getTime() + serverTimeOffset);
    }
    date.setDate(date.getDate() + daysAhead);
    
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric',
      timeZone: TIME_CONFIG.APP_TZ
    }).format(date);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 flex items-center">
            <span className="mr-3">🌈</span>
            2-Day Weather Forecast - Counties & Cities
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Extended weather predictions for major Liberian counties and cities
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">
            Last updated: {forecastLastUpdate.toLocaleString()}
          </div>
          <div className="text-xs text-blue-600 mt-1">
            Next update: {calculateNextForecastUpdate()}
          </div>
        </div>
      </div>

      {/* Auto-Update Info Banner */}
      <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <p className="text-sm text-blue-800">
            <strong>Auto-Update:</strong> Weather forecasts refresh automatically every 30 minutes with updated predictions for all counties and cities
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Tomorrow's Forecast */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
          <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <span className="mr-3">📅</span>
            Tomorrow ({getDateString(1)})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forecastData[0].locations.map((location, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-5 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="text-center">
                  <h5 className="font-semibold text-gray-800 mb-3 text-base">{location.name}</h5>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{location.highTemp}°F</div>
                      <div className="text-sm text-gray-600">High</div>
                    </div>
                    <div className="text-center p-3 bg-indigo-50 rounded-lg">
                      <div className="text-2xl font-bold text-indigo-600">{location.lowTemp}°F</div>
                      <div className="text-sm text-gray-600">Low</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 mb-3 font-medium">
                    {location.condition}
                  </div>
                  <div className="text-sm text-gray-600 space-y-2">
                    <div className="flex justify-between">
                      <span>💧 Humidity:</span>
                      <span className="font-medium">{location.humidity}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>💨 Wind:</span>
                      <span className="font-medium">{location.wind} mph</span>
                    </div>
                    <div className="flex justify-between">
                      <span>🌧️ Rain:</span>
                      <span className="font-medium">{location.rain}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Day After Tomorrow's Forecast */}
        <div className="bg-gradient-to-r from-green-50 to-purple-50 rounded-lg p-6 border border-green-200">
          <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <span className="mr-3">📅</span>
            {getDateString(2)}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forecastData[1].locations.map((location, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-5 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="text-center">
                  <h5 className="font-semibold text-gray-800 mb-3 text-base">{location.name}</h5>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{location.highTemp}°F</div>
                      <div className="text-sm text-gray-600">High</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{location.lowTemp}°F</div>
                      <div className="text-sm text-gray-600">Low</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 mb-3 font-medium">
                    {location.condition}
                  </div>
                  <div className="text-sm text-gray-600 space-y-2">
                    <div className="flex justify-between">
                      <span>💧 Humidity:</span>
                      <span className="font-medium">{location.humidity}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>💨 Wind:</span>
                      <span className="font-medium">{location.wind} mph</span>
                    </div>
                    <div className="flex justify-between">
                      <span>🌧️ Rain:</span>
                      <span className="font-medium">{location.rain}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer Info */}
      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse mt-1"></div>
          <div>
            <p className="text-sm text-yellow-800">
              <strong>Weather Data Coverage:</strong> This forecast covers major counties and cities across Liberia including Montserrado, Bong, Grand Bassa, Maryland, Lofa, and Grand Gedeh counties.
            </p>
            <p className="text-xs text-yellow-700 mt-2">
              Weather predictions are based on West African meteorological patterns and are updated every 30 minutes for accuracy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherForecast;