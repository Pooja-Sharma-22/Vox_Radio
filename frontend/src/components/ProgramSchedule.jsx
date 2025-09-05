import React, { useState, useEffect } from 'react';
import { Radio, Clock, Calendar } from 'lucide-react';

const ProgramSchedule = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentProgram, setCurrentProgram] = useState(null);

  // Program schedule for Vox Radio
  const programs = [
    {
      id: 1,
      name: "Morning Devotion",
      day: "Monday-Friday",
      time: "06:00-07:00",
      startHour: 6,
      endHour: 7,
      days: [1, 2, 3, 4, 5] // Monday to Friday
    },
    {
      id: 2,
      name: "Community Hour",
      day: "Monday-Friday",
      time: "12:00-13:00",
      startHour: 12,
      endHour: 13,
      days: [1, 2, 3, 4, 5]
    },
    {
      id: 3,
      name: "Chains Broken",
      day: "Friday",
      time: "16:00-17:00",
      startHour: 16,
      endHour: 17,
      days: [5] // Friday only
    },
    {
      id: 4,
      name: "Evening Praise",
      day: "Monday-Sunday",
      time: "18:00-19:00",
      startHour: 18,
      endHour: 19,
      days: [0, 1, 2, 3, 4, 5, 6] // All days
    },
    {
      id: 5,
      name: "Youth Connect",
      day: "Saturday",
      time: "14:00-15:00",
      startHour: 14,
      endHour: 15,
      days: [6] // Saturday only
    },
    {
      id: 6,
      name: "Sunday Service",
      day: "Sunday",
      time: "09:00-11:00",
      startHour: 9,
      endHour: 11,
      days: [0] // Sunday only
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date(new Date().toLocaleString("en-US", {timeZone: "Africa/Monrovia"}));
      setCurrentTime(now);
      
      // Check if any program is currently active
      const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const currentHour = now.getHours();
      
      const activeProgram = programs.find(program => 
        program.days.includes(currentDay) && 
        currentHour >= program.startHour && 
        currentHour < program.endHour
      );
      
      setCurrentProgram(activeProgram);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isUpcoming = (program) => {
    const currentDay = currentTime.getDay();
    const currentHour = currentTime.getHours();
    
    return program.days.includes(currentDay) && 
           currentHour < program.startHour && 
           (program.startHour - currentHour) <= 2; // Show as upcoming if within 2 hours
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-3 border-b border-orange-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Programs Header */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Radio className="text-orange-400 animate-pulse" size={20} />
              <span className="text-lg font-bold text-orange-400">VOX RADIO PROGRAMS</span>
            </div>
            
            {/* Current Program Display */}
            {currentProgram && (
              <div className="flex items-center space-x-2 bg-orange-500 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-bold text-white">NOW LIVE: {currentProgram.name}</span>
                <Clock size={16} className="text-yellow-300" />
              </div>
            )}
          </div>

          {/* Program Schedule Scroll */}
          <div className="flex-1 mx-6 overflow-hidden">
            <div className="flex space-x-6 program-marquee">
              {programs.map((program) => {
                const isCurrent = currentProgram && currentProgram.id === program.id;
                const isUpcomingProgram = isUpcoming(program);
                
                return (
                  <div 
                    key={program.id} 
                    className={`flex items-center space-x-2 whitespace-nowrap px-3 py-1 rounded transition-all duration-300 ${
                      isCurrent 
                        ? 'bg-orange-500 text-white font-bold scale-110 shadow-lg' 
                        : isUpcomingProgram
                        ? 'bg-yellow-600 text-white font-semibold'
                        : 'text-gray-300 hover:text-orange-400'
                    }`}
                  >
                    <Calendar size={14} className={isCurrent ? 'text-yellow-300' : 'text-orange-400'} />
                    <span className={`text-sm ${isCurrent ? 'font-bold' : 'font-medium'}`}>
                      {program.name}
                    </span>
                    <span className="text-xs opacity-75">
                      {program.day} {program.time}
                    </span>
                    {isCurrent && (
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse ml-2"></div>
                    )}
                    {isUpcomingProgram && (
                      <span className="text-xs bg-yellow-400 text-black px-1 rounded font-bold ml-1">
                        SOON
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Next Program Info */}
          <div className="text-right">
            <div className="text-xs text-gray-400">NEXT PROGRAM</div>
            <div className="text-sm text-orange-400 font-medium">
              {(() => {
                const currentDay = currentTime.getDay();
                const currentHour = currentTime.getHours();
                
                // Find next program today
                const todayPrograms = programs
                  .filter(p => p.days.includes(currentDay) && p.startHour > currentHour)
                  .sort((a, b) => a.startHour - b.startHour);
                
                if (todayPrograms.length > 0) {
                  const next = todayPrograms[0];
                  return `${next.name} at ${next.time.split('-')[0]}`;
                }
                
                // Find first program tomorrow
                const tomorrow = (currentDay + 1) % 7;
                const tomorrowPrograms = programs
                  .filter(p => p.days.includes(tomorrow))
                  .sort((a, b) => a.startHour - b.startHour);
                
                if (tomorrowPrograms.length > 0) {
                  const next = tomorrowPrograms[0];
                  return `${next.name} Tomorrow`;
                }
                
                return "Check Schedule";
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramSchedule;