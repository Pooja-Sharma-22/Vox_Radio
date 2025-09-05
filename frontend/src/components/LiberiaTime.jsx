import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Radio } from 'lucide-react';

const LiberiaTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      // Liberia is GMT+0 (same as UTC)
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatLiberiaTime = () => {
    // Liberia follows GMT+0 (same as UTC)
    const liberiaTime = new Date(currentTime.toLocaleString("en-US", {timeZone: "Africa/Monrovia"}));
    
    const timeString = liberiaTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false // 24-hour format for professional look
    });
    
    const dateString = liberiaTime.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    const ampm = liberiaTime.toLocaleTimeString('en-US', {
      hour12: true
    }).slice(-2);

    return { timeString, dateString, ampm };
  };

  const { timeString, dateString, ampm } = formatLiberiaTime();

  return (
    <div className="relative">
      {/* Main Time Display - Responsive */}
      <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-xl border-2 border-white shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="text-center">
          {/* Live indicator */}
          <div className="flex items-center justify-center mb-1">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse mr-1 sm:mr-2"></div>
            <span className="text-xs font-semibold tracking-wider uppercase">LIVE TIME</span>
          </div>
          
          {/* Time - Responsive */}
          <div className="flex items-center justify-center space-x-1 sm:space-x-2">
            <Clock size={16} className="sm:w-5 sm:h-5 text-yellow-300 animate-pulse" />
            <span className="text-lg sm:text-2xl font-mono font-bold tracking-wider text-yellow-100">
              {timeString}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-yellow-200 ml-1">
              {ampm}
            </span>
          </div>
          
          {/* Date and Location - Responsive */}
          <div className="flex items-center justify-center mt-1 space-x-2 sm:space-x-3">
            <div className="flex items-center">
              <MapPin size={10} className="sm:w-3 sm:h-3 text-yellow-300 mr-1" />
              <span className="text-xs font-medium text-yellow-100 hidden sm:inline">Monrovia, Liberia</span>
              <span className="text-xs font-medium text-yellow-100 sm:hidden">Monrovia</span>
            </div>
            <span className="text-xs text-yellow-200">•</span>
            <span className="text-xs font-medium text-yellow-100">{dateString}</span>
          </div>
          
          {/* GMT Indicator - Responsive */}
          <div className="text-xs text-yellow-200 mt-1 font-medium">
            <span className="hidden sm:inline">GMT+0 | West Africa Time</span>
            <span className="sm:hidden">GMT+0</span>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements - Responsive */}
      <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full animate-ping"></div>
      <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
      
      {/* Radio Wave Animation - Responsive */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
        <Radio size={12} className="sm:w-4 sm:h-4 text-yellow-300 animate-bounce" />
      </div>
    </div>
  );
};

export default LiberiaTime;