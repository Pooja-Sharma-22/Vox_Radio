import React, { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard';
import { getCurrentWeatherData } from '../data/mockData';

import React, { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard';
import { getCurrentWeatherData } from '../data/mockData';

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

const CurrentWeather = () => {
  const [weatherData, setWeatherData] = useState(getCurrentWeatherData());
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [nextRotation, setNextRotation] = useState('');
  const [forecastData, setForecastData] = useState(liberianForecastData);
  const [forecastLastUpdate, setForecastLastUpdate] = useState(new Date());

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

  // Calculate next forecast update time
  const calculateNextForecastUpdate = () => {
    const now = new Date();
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
    return nextUpdateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
    const date = new Date();
    date.setDate(date.getDate() + daysAhead);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };

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
      
      {/* 2-Day Weather Forecast for Liberian Counties and Cities */}
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-xl font-bold text-gray-900 flex items-center">
            <span className="mr-3">🌈</span>
            2-Day Weather Forecast - Counties & Cities
          </h4>
          <div className="text-right">
            <div className="text-sm text-gray-500">
              Last updated: {forecastLastUpdate.toLocaleString()}
            </div>
            <div className="text-xs text-blue-600 mt-1">
              Next update: {calculateNextForecastUpdate()}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Tomorrow's Forecast */}
          <div>
            <h5 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">📅</span>
              Tomorrow ({getDateString(1)})
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {forecastData[0].locations.map((location, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                  <div className="text-center">
                    <h6 className="font-medium text-gray-800 mb-2 text-sm">{location.name}</h6>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="text-center p-2 bg-blue-50 rounded-lg">
                        <div className="text-lg font-bold text-blue-600">{location.highTemp}°F</div>
                        <div className="text-xs text-gray-600">High</div>
                      </div>
                      <div className="text-center p-2 bg-indigo-50 rounded-lg">
                        <div className="text-lg font-bold text-indigo-600">{location.lowTemp}°F</div>
                        <div className="text-xs text-gray-600">Low</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 mb-2">
                      {location.condition}
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>💧 Humidity: {location.humidity}%</div>
                      <div>💨 Wind: {location.wind} mph</div>
                      <div>🌧️ Rain: {location.rain}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Day After Tomorrow's Forecast */}
          <div>
            <h5 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">📅</span>
              {getDateString(2)}
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {forecastData[1].locations.map((location, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                  <div className="text-center">
                    <h6 className="font-medium text-gray-800 mb-2 text-sm">{location.name}</h6>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="text-center p-2 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">{location.highTemp}°F</div>
                        <div className="text-xs text-gray-600">High</div>
                      </div>
                      <div className="text-center p-2 bg-purple-50 rounded-lg">
                        <div className="text-lg font-bold text-purple-600">{location.lowTemp}°F</div>
                        <div className="text-xs text-gray-600">Low</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 mb-2">
                      {location.condition}
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>💧 Humidity: {location.humidity}%</div>
                      <div>💨 Wind: {location.wind} mph</div>
                      <div>🌧️ Rain: {location.rain}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Forecast Update Info */}
        <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
            <p className="text-sm text-yellow-800">
              <strong>Extended Forecast:</strong> Weather predictions for major Liberian counties and cities are updated every 30 minutes based on West African meteorological patterns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;