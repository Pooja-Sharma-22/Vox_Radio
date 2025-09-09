import React, { useState, useEffect } from 'react';
import { Radio, Clock, Calendar, ChevronDown, ChevronUp } from 'lucide-react';

// Updated Vox Radio Program schedule based on actual program log - moved outside component to prevent re-renders
const programs = [
  {
    id: 1,
    name: "Good Shaping",
    presenter: "Sam Doe",
    day: "Monday-Friday",
    time: "05:00-06:00",
    startHour: 5,
    endHour: 6,
    days: [1, 2, 3, 4, 5]
  },
  {
    id: 2,
    name: "The Gospel Classic",
    presenter: "Emmanuel Howard",
    day: "Monday-Friday", 
    time: "06:00-08:00",
    startHour: 6,
    endHour: 8,
    days: [1, 2, 3, 4, 5]
  },
  {
    id: 3,
    name: "Music",
    presenter: "Victoria Walker",
    day: "Monday-Friday",
    time: "08:00-10:00", 
    startHour: 8,
    endHour: 10,
    days: [1, 2, 3, 4, 5]
  },
  {
    id: 4,
    name: "Jingles and Promos",
    presenter: "Angeline Konway",
    day: "Monday-Friday",
    time: "10:00-10:30",
    startHour: 10,
    endHour: 10.5,
    days: [1, 2, 3, 4, 5]
  },
  {
    id: 5,
    name: "Announcements",
    presenter: "Beatrice Ballah",
    day: "Monday-Friday",
    time: "10:30-11:00",
    startHour: 10.5,
    endHour: 11,
    days: [1, 2, 3, 4, 5]
  },
  {
    id: 6,
    name: "Music",
    presenter: "Maxim M. Somah",
    day: "Monday-Friday",
    time: "11:00-12:00",
    startHour: 11,
    endHour: 12,
    days: [1, 2, 3, 4, 5]
  },
  {
    id: 7,
    name: "Worship Connection",
    presenter: "Emmanuel Lepolu",
    day: "Monday-Friday",
    time: "12:00-13:00",
    startHour: 12,
    endHour: 13,
    days: [1, 2, 3, 4, 5]
  },
  {
    id: 8,
    name: "Word to Go",
    presenter: "Trenz KCalvin",
    day: "Monday-Friday",
    time: "13:00-14:00",
    startHour: 13,
    endHour: 14,
    days: [1, 2, 3, 4, 5]
  },
  {
    id: 9,
    name: "The Heart Beat",
    presenter: "Sam Doe",
    day: "Monday-Friday",
    time: "14:00-16:00",
    startHour: 14,
    endHour: 16,
    days: [1, 2, 3, 4, 5]
  },
  {
    id: 10,
    name: "Thru The Bible",
    presenter: "Emmanuel Howard", 
    day: "Monday-Friday",
    time: "16:00-17:00",
    startHour: 16,
    endHour: 17,
    days: [1, 2, 3, 4, 5]
  },
  {
    id: 11,
    name: "Music",
    presenter: "Victoria Walker",
    day: "Monday-Friday",
    time: "17:00-19:00",
    startHour: 17,
    endHour: 19,
    days: [1, 2, 3, 4, 5]
  },
  {
    id: 12,
    name: "Vox Talk",
    presenter: "Angeline Konway",
    day: "Monday-Friday", 
    time: "19:00-20:00",
    startHour: 19,
    endHour: 20,
    days: [1, 2, 3, 4, 5]
  },
  {
    id: 13,
    name: "Announcements",
    presenter: "Beatrice Ballah",
    day: "Monday-Friday",
    time: "20:00-20:30",
    startHour: 20,
    endHour: 20.5,
    days: [1, 2, 3, 4, 5]
  },
  {
    id: 14,
    name: "International Thru The Bible",
    presenter: "Maxim M. Somah",
    day: "Monday-Friday",
    time: "20:30-21:00",
    startHour: 20.5,
    endHour: 21,
    days: [1, 2, 3, 4, 5]
  },
  // Weekend Programs
  {
    id: 15,
    name: "The Morning Glory",
    presenter: "Emmanuel Lepolu",
    day: "Saturday",
    time: "05:00-08:00",
    startHour: 5,
    endHour: 8,
    days: [6]
  },
  {
    id: 16,
    name: "Music",
    presenter: "Trenz KCalvin",
    day: "Saturday",
    time: "08:00-10:00",
    startHour: 8,
    endHour: 10,
    days: [6]
  },
  {
    id: 17,
    name: "Faith For Life",
    presenter: "Sam Doe",
    day: "Saturday",
    time: "10:00-12:00",
    startHour: 10,
    endHour: 12,
    days: [6]
  },
  {
    id: 18,
    name: "Music",
    presenter: "Emmanuel Howard",
    day: "Saturday",
    time: "12:00-14:00",
    startHour: 12,
    endHour: 14,
    days: [6]
  },
  {
    id: 19,
    name: "Blessed Rest",
    presenter: "Victoria Walker",
    day: "Saturday",
    time: "14:00-16:00",
    startHour: 14,
    endHour: 16,
    days: [6]
  },
  // Sunday Programs
  {
    id: 20,
    name: "Sunday Service",
    presenter: "Angeline Konway",
    day: "Sunday",
    time: "06:00-12:00",
    startHour: 6,
    endHour: 12,
    days: [0]
  },
  {
    id: 21,
    name: "The Gospel Classic",
    presenter: "Beatrice Ballah",
    day: "Sunday",
    time: "12:00-14:00",
    startHour: 12,
    endHour: 14,
    days: [0]
  },
  {
    id: 22,
    name: "Music and Testimonies",
    presenter: "Maxim M. Somah",
    day: "Sunday",
    time: "14:00-16:00",
    startHour: 14,
    endHour: 16,
    days: [0]
  }
];

const ProgramSchedule = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentProgram, setCurrentProgram] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date(new Date().toLocaleString("en-US", {timeZone: "Africa/Monrovia"}));
      setCurrentTime(now);
      
      // Check if any program is currently active
      const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const currentHour = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentTimeInMinutes = currentHour * 60 + currentMinutes;
      
      const activeProgram = programs.find(program => {
        const programStartInMinutes = program.startHour * 60;
        const programEndInMinutes = program.endHour * 60;
        
        return program.days.includes(currentDay) && 
               currentTimeInMinutes >= programStartInMinutes && 
               currentTimeInMinutes < programEndInMinutes;
      });
      
      setCurrentProgram(activeProgram);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isUpcoming = (program) => {
    const currentDay = currentTime.getDay();
    const currentHour = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinutes;
    const programStartInMinutes = program.startHour * 60;
    
    return program.days.includes(currentDay) && 
           currentTimeInMinutes < programStartInMinutes && 
           (programStartInMinutes - currentTimeInMinutes) <= 60; // Show as upcoming if within 1 hour
  };

  const getNextProgram = () => {
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
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white border-b border-orange-500">
      {/* Mobile Layout */}
      <div className="sm:hidden">
        <div className="px-4 py-3">
          {/* Mobile Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Radio className="text-orange-400 animate-pulse" size={16} />
              <span className="text-sm font-bold text-orange-400">PROGRAMS</span>
            </div>
            
            {/* Current Program Display - Mobile */}
            {currentProgram && (
              <div className="flex items-center space-x-1 bg-orange-500 px-2 py-1 rounded-full">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-bold text-white text-xs">LIVE: {currentProgram.name}</span>
              </div>
            )}
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-orange-400 hover:text-orange-300 transition-colors"
            >
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>

          {/* Expandable Program List - Mobile */}
          <div className={`mt-3 space-y-2 transition-all duration-500 ease-in-out overflow-hidden ${
            isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}>
            {programs.map((program, index) => {
              const isCurrent = currentProgram && currentProgram.id === program.id;
              const isUpcomingProgram = isUpcoming(program);
              
              return (
                <div 
                  key={program.id} 
                  className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 transform ${
                    isCurrent 
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold scale-102 shadow-lg' 
                      : isUpcomingProgram
                      ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold shadow-md'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isExpanded ? 'slideInUp 0.3s ease-out forwards' : ''
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <Calendar size={14} className={isCurrent ? 'text-yellow-300' : 'text-orange-400'} />
                    <div>
                      <div className="text-sm font-medium">{program.name}</div>
                      <div className="text-xs opacity-75">with {program.presenter}</div>
                    </div>
                    {isCurrent && (
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs font-bold bg-green-400 text-black px-1.5 py-0.5 rounded-full">LIVE</span>
                      </div>
                    )}
                    {isUpcomingProgram && (
                      <span className="text-xs bg-yellow-300 text-black px-1.5 py-0.5 rounded-full font-bold">
                        SOON
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-medium">{program.day}</div>
                    <div className="text-xs opacity-75">{program.time}</div>
                  </div>
                </div>
              );
            })}
            
            {/* Next Program - Mobile */}
            <div className="text-center pt-2 border-t border-gray-700">
              <div className="text-xs text-gray-400">NEXT PROGRAM</div>
              <div className="text-sm text-orange-400 font-medium">
                {getNextProgram()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:block py-3">
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

            {/* Program Schedule Scroll - Desktop */}
            <div className="flex-1 mx-6 overflow-hidden">
              <div className="flex space-x-6 program-marquee">
                {programs.map((program) => {
                  const isCurrent = currentProgram && currentProgram.id === program.id;
                  const isUpcomingProgram = isUpcoming(program);
                  
                  return (
                    <div 
                      key={program.id} 
                      className={`flex items-center space-x-3 whitespace-nowrap px-4 py-2 rounded-lg transition-all duration-300 ${
                        isCurrent 
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold scale-110 shadow-lg' 
                          : isUpcomingProgram
                          ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold shadow-md'
                          : 'text-gray-300 hover:text-orange-400 hover:bg-gray-800 rounded-lg px-3 py-1'
                      }`}
                    >
                      <Calendar size={16} className={isCurrent ? 'text-yellow-300' : 'text-orange-400'} />
                      <div className="flex flex-col items-start">
                        <span className={`text-sm ${isCurrent ? 'font-bold' : 'font-medium'}`}>
                          {program.name}
                        </span>
                        <span className="text-xs opacity-75">
                          with {program.presenter}
                        </span>
                      </div>
                      <div className="text-xs opacity-75 border-l border-gray-400 pl-2">
                        <div>{program.day}</div>
                        <div>{program.time}</div>
                      </div>
                      {isCurrent && (
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-xs font-bold bg-green-400 text-black px-2 py-0.5 rounded-full">
                            LIVE
                          </span>
                        </div>
                      )}
                      {isUpcomingProgram && (
                        <span className="text-xs bg-yellow-300 text-black px-2 py-0.5 rounded-full font-bold">
                          SOON
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Next Program Info - Desktop */}
            <div className="text-right">
              <div className="text-xs text-gray-400">NEXT PROGRAM</div>
              <div className="text-sm text-orange-400 font-medium">
                {getNextProgram()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramSchedule;