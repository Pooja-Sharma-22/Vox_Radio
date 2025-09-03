import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

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
      hour12: true
    });
    
    const dateString = liberiaTime.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    return { timeString, dateString };
  };

  const { timeString, dateString } = formatLiberiaTime();

  return (
    <div className="flex items-center space-x-2 bg-black text-white px-3 py-2 rounded-lg border border-orange-500">
      <Clock size={16} className="text-orange-400" />
      <div className="text-sm">
        <div className="font-semibold text-orange-400">{timeString}</div>
        <div className="text-xs text-gray-300">{dateString} (GMT)</div>
      </div>
    </div>
  );
};

export default LiberiaTime;