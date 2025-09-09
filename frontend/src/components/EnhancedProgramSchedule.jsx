import React, { useState, useEffect } from 'react';
import { Radio, Clock, Calendar, ChevronDown, ChevronUp, Play, Users, Book, MessageCircle, Heart, Star, Search, X, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

// Program type categories with colors (matching your HTML structure)
const PROGRAM_TYPES = {
  'Music': { 
    color: 'bg-blue-500', 
    textColor: 'text-blue-500',
    borderColor: 'border-blue-500',
    icon: Play,
    bgLight: 'bg-blue-50'
  },
  'Bible Teaching': { 
    color: 'bg-green-500', 
    textColor: 'text-green-500',
    borderColor: 'border-green-500',
    icon: Book,
    bgLight: 'bg-green-50'
  },
  'Interactive': { 
    color: 'bg-purple-500', 
    textColor: 'text-purple-500',
    borderColor: 'border-purple-500',
    icon: MessageCircle,
    bgLight: 'bg-purple-50'
  },
  'Community': { 
    color: 'bg-orange-500', 
    textColor: 'text-orange-500',
    borderColor: 'border-orange-500',
    icon: Users,
    bgLight: 'bg-orange-50'
  },
  'Special': { 
    color: 'bg-red-500', 
    textColor: 'text-red-500',
    borderColor: 'border-red-500',
    icon: Star,
    bgLight: 'bg-red-50'
  }
};

// Enhanced program data based on your HTML structure - ALL 7 DAYS
const enhancedPrograms = {
  Sunday: [
    { time: "5:00-7:00AM", name: "Music and Talks", presenter: "Emmanuel Lepolu", type: "Music" },
    { time: "7:00-7:30AM", name: "Salvation Half Hour", presenter: "Min. Cooper", type: "Bible Teaching" },
    { time: "7:30-8:00AM", name: "Music", presenter: "Emmanuel Lepolu", type: "Music" },
    { time: "8:00-10:00AM", name: "The Gospel Caravan", presenter: "Emmanuel Lepolu", type: "Bible Teaching" },
    { time: "10:00AM-3:00PM", name: "Music", presenter: "Various", type: "Music" },
    { time: "3:00-4:00PM", name: "Sunday Special", presenter: "Beatrice Ballah", type: "Special" },
    { time: "4:00-6:00PM", name: "Music and Talks", presenter: "Victoria Walker", type: "Music" },
    { time: "6:00-7:30PM", name: "Kids Hour", presenter: "Victoria Walker", type: "Special" },
    { time: "7:30-9:00PM", name: "Music", presenter: "Maxim Somah", type: "Music" },
    { time: "9:00-10:00PM", name: "Search The Scriptures", presenter: "Maxim Somah", type: "Bible Teaching" },
    { time: "10:00PM-5:00AM", name: "Music", presenter: "Various", type: "Music" }
  ],
  Monday: [
    { time: "5:00-8:00AM", name: "The Quiet Storm", presenter: "New Life Africa", type: "Special" },
    { time: "8:00-9:00AM", name: "Good Shepherd Fellowship", presenter: "Bishop Thomas", type: "Bible Teaching" },
    { time: "9:00-10:00AM", name: "Living Word", presenter: "Pastor Mensa", type: "Bible Teaching" },
    { time: "10:00-10:10AM", name: "Jingles and Music", presenter: "Deddeh Gayflor", type: "Music" },
    { time: "10:10-10:20AM", name: "Announcement", presenter: "Deddeh Gayflor", type: "Community" },
    { time: "10:20-10:45AM", name: "Back To The Bible", presenter: "Various", type: "Bible Teaching" },
    { time: "10:45-11:00AM", name: "Music", presenter: "Deddeh Gayflor", type: "Music" },
    { time: "11:00AM-1:00PM", name: "Worship Connexion", presenter: "New Life Africa", type: "Bible Teaching" },
    { time: "1:00-1:05PM", name: "Word To Go", presenter: "Pastor Mensa", type: "Bible Teaching" },
    { time: "1:05-3:00PM", name: "Launch Time Connection", presenter: "Deddeh Gayflor", type: "Special" },
    { time: "2:00-2:20PM", name: "Announcement", presenter: "Deddeh Gayflor", type: "Community" },
    { time: "2:30-2:32PM", name: "Reset", presenter: "Bernice Salad", type: "Special" },
    { time: "3:00-4:30PM", name: "The Heart Beat", presenter: "Various", type: "Community" },
    { time: "4:30-5:30PM", name: "Thru The Bible", presenter: "Pastor Mcquee", type: "Bible Teaching" },
    { time: "5:30-5:45PM", name: "Music", presenter: "Emmanuel Lepolu", type: "Music" },
    { time: "5:45-6:00PM", name: "Announcement", presenter: "Emmanuel Lepolu", type: "Community" },
    { time: "6:00-6:30PM", name: "Major Headlines", presenter: "Emmanuel Lepolu", type: "Community" },
    { time: "6:30-7:30PM", name: "Music", presenter: "Emmanuel Lepolu", type: "Music" },
    { time: "7:30-8:45PM", name: "Vox Talk", presenter: "Maxim and Sam", type: "Interactive" },
    { time: "8:45-9:00PM", name: "Announcement", presenter: "Sam", type: "Community" },
    { time: "9:00-10:00PM", name: "Vox Prayer Night", presenter: "Leone Moore", type: "Bible Teaching" },
    { time: "10:00-11:00PM", name: "The Night Ride", presenter: "Sam W. Doe", type: "Special" },
    { time: "11:00PM-12:30AM", name: "Music", presenter: "Sam W. Doe", type: "Music" },
    { time: "12:30-4:30AM", name: "International Kapoa Secure Liberia", presenter: "Sam W. Doe", type: "Special" },
    { time: "4:30-5:00AM", name: "Thru The Bible", presenter: "Various", type: "Bible Teaching" }
  ],
  Tuesday: [
    { time: "5:00-8:00AM", name: "The Quiet Storm", presenter: "New Life Africa", type: "Special" },
    { time: "8:00-9:00AM", name: "Good Shepherd Fellowship", presenter: "Bishop Thomas", type: "Bible Teaching" },
    { time: "9:00-10:00AM", name: "Living Word", presenter: "Pastor Mensa", type: "Bible Teaching" },
    { time: "10:00-10:10AM", name: "Jingles and Music", presenter: "Emmanuel Lepolu", type: "Music" },
    { time: "10:10-10:20AM", name: "Announcement", presenter: "Emmanuel Lepolu", type: "Community" },
    { time: "10:20-10:45AM", name: "Back To The Bible", presenter: "Various", type: "Bible Teaching" },
    { time: "10:20-11:00AM", name: "Music", presenter: "Emmanuel Lepolu", type: "Music" },
    { time: "11:00AM-1:00PM", name: "Worship Connexion", presenter: "New Life Africa", type: "Bible Teaching" },
    { time: "1:00-1:05PM", name: "Word To Go", presenter: "Pastor Mensa", type: "Bible Teaching" },
    { time: "1:05-3:00PM", name: "Launch Time Connection", presenter: "Beauty Nuah", type: "Special" },
    { time: "2:00-2:20PM", name: "Announcement", presenter: "Beauty Nuah", type: "Community" },
    { time: "2:30-2:32PM", name: "Reset", presenter: "Bernice Salad", type: "Special" },
    { time: "3:00-4:30PM", name: "The Heart Beat", presenter: "Various", type: "Community" },
    { time: "4:30-5:30PM", name: "Thru The Bible", presenter: "Pastor Mcquee", type: "Bible Teaching" },
    { time: "5:30-5:45PM", name: "Music", presenter: "Beatrice Ballah", type: "Music" },
    { time: "5:45-6:00PM", name: "Announcement", presenter: "Beatrice Ballah", type: "Community" },
    { time: "6:00-7:00PM", name: "She Speaks Up", presenter: "Beatrice Ballah", type: "Interactive" },
    { time: "7:00-7:30PM", name: "Music", presenter: "Maxim Somah", type: "Music" },
    { time: "7:30-8:45PM", name: "Vox Talk", presenter: "Maxim and Sam", type: "Interactive" },
    { time: "8:45-9:00PM", name: "Announcement", presenter: "Various", type: "Community" },
    { time: "9:00-10:00PM", name: "Vox Prayer Night", presenter: "Leone Moore", type: "Bible Teaching" },
    { time: "10:00PM-12:30AM", name: "Music", presenter: "Maxim Somah", type: "Music" },
    { time: "12:30-4:30AM", name: "International Kapoa Secure Liberia", presenter: "Maxim Somah", type: "Special" },
    { time: "4:30-5:00AM", name: "Thru The Bible", presenter: "Various", type: "Bible Teaching" }
  ],
  Wednesday: [
    { time: "5:00-8:00AM", name: "The Quiet Storm", presenter: "New Life Africa", type: "Special" },
    { time: "8:00-9:00AM", name: "Good Shepherd Fellowship", presenter: "Bishop Thomas", type: "Bible Teaching" },
    { time: "9:00-10:00AM", name: "Living Word", presenter: "Pastor Mensa", type: "Bible Teaching" },
    { time: "10:00-10:10AM", name: "Jingles and Music", presenter: "Emmanuel Lepolu", type: "Music" },
    { time: "10:10-10:20AM", name: "Announcement", presenter: "Emmanuel Lepolu", type: "Community" },
    { time: "10:20-10:45AM", name: "New Day Hour", presenter: "Pastor Fatorma", type: "Bible Teaching" },
    { time: "10:45-11:00AM", name: "Music", presenter: "T. KCalvin Walter", type: "Music" },
    { time: "11:00AM-1:00PM", name: "Worship Connexion", presenter: "New Life Africa", type: "Bible Teaching" },
    { time: "1:00-1:05PM", name: "Word To Go", presenter: "Pastor Mensa", type: "Bible Teaching" },
    { time: "1:05-3:00PM", name: "Launch Time Connection", presenter: "Beauty Nuah", type: "Special" },
    { time: "2:00-2:20PM", name: "Announcement", presenter: "T. KCalvin Walter", type: "Community" },
    { time: "2:30-2:32PM", name: "Reset", presenter: "Bernice Salad", type: "Special" },
    { time: "3:00-4:30PM", name: "The Heart Beat", presenter: "Various", type: "Community" },
    { time: "4:30-5:30PM", name: "Thru The Bible", presenter: "Pastor Mcquee", type: "Bible Teaching" },
    { time: "5:30-5:45PM", name: "Music", presenter: "Victoria Walker", type: "Music" },
    { time: "5:45-6:00PM", name: "Announcement", presenter: "Victoria Walker", type: "Community" },
    { time: "6:00-7:15PM", name: "Music", presenter: "Victoria Walker", type: "Music" },
    { time: "7:15-8:45PM", name: "Ladies Let's Talk", presenter: "Victoria Walker", type: "Interactive" },
    { time: "8:45-9:00PM", name: "Announcement", presenter: "Victoria Walker", type: "Community" },
    { time: "9:00-10:00PM", name: "Vox Prayer Night", presenter: "Leone Moore", type: "Bible Teaching" },
    { time: "10:00PM-12:30AM", name: "Music", presenter: "Emmanuel Howard", type: "Music" },
    { time: "12:30-4:30AM", name: "International Kapoa Secure Liberia", presenter: "Emmanuel Howard", type: "Special" },
    { time: "4:30-5:00AM", name: "Thru The Bible", presenter: "Various", type: "Bible Teaching" }
  ],
  Thursday: [
    { time: "5:00-8:00AM", name: "The Quiet Storm", presenter: "New Life Africa", type: "Special" },
    { time: "8:00-9:00AM", name: "Good Shepherd Fellowship", presenter: "Bishop Thomas", type: "Bible Teaching" },
    { time: "9:00-10:00AM", name: "Living Word", presenter: "Pastor Mensa", type: "Bible Teaching" },
    { time: "10:00-10:10AM", name: "Jingles and Music", presenter: "Emmanuel Lepolu", type: "Music" },
    { time: "10:10-10:20AM", name: "Announcement", presenter: "Emmanuel Lepolu", type: "Community" },
    { time: "10:20-11:00AM", name: "Music", presenter: "Deddeh Gayflor", type: "Music" },
    { time: "11:00AM-1:00PM", name: "Worship Connexion", presenter: "New Life Africa", type: "Bible Teaching" },
    { time: "1:00-1:05PM", name: "Word To Go", presenter: "Pastor Mensa", type: "Bible Teaching" },
    { time: "1:05-3:00PM", name: "Launch Time Connect", presenter: "Deddeh Gayflor", type: "Community" },
    { time: "2:00-2:20PM", name: "Announcement", presenter: "Deddeh Gayflor", type: "Community" },
    { time: "2:30-2:32PM", name: "Reset", presenter: "Bernice Salad", type: "Special" },
    { time: "3:00-4:30PM", name: "The Heart Beat", presenter: "Various", type: "Community" },
    { time: "4:30-5:30PM", name: "Thru The Bible", presenter: "Pastor Mcquee", type: "Bible Teaching" },
    { time: "5:30-5:45PM", name: "Music", presenter: "Beauty Nuah", type: "Music" },
    { time: "5:45-6:00PM", name: "Announcement", presenter: "Beauty Nuah", type: "Community" },
    { time: "6:00-7:00PM", name: "Teenagers Talk", presenter: "Beauty Nuah", type: "Interactive" },
    { time: "7:00-7:30PM", name: "Music", presenter: "Sam W. Doe", type: "Music" },
    { time: "7:30-8:45PM", name: "Vox Talk", presenter: "Maxim And Sam", type: "Interactive" },
    { time: "8:45-9:00PM", name: "Announcement", presenter: "Maxim Somah", type: "Community" },
    { time: "10:00PM-12:30AM", name: "Music", presenter: "Sam W. Doe", type: "Music" },
    { time: "12:30-4:30AM", name: "International Kapoa Secure Liberia", presenter: "Maxim and Sam", type: "Special" },
    { time: "4:30-5:00AM", name: "Thru The Bible", presenter: "Various", type: "Bible Teaching" }
  ],
  Friday: [
    { time: "5:00-8:00AM", name: "The Quiet Storm", presenter: "New Life Africa", type: "Special" },
    { time: "8:00-9:00AM", name: "Good Shepherd Fellowship", presenter: "Bishop Thomas", type: "Bible Teaching" },
    { time: "9:00-10:00AM", name: "Living Word", presenter: "Pastor Mensa", type: "Bible Teaching" },
    { time: "10:00-10:10AM", name: "Jingles and Music", presenter: "Maxim Somah", type: "Music" },
    { time: "10:10-10:20AM", name: "Announcement", presenter: "Maxim Somah", type: "Community" },
    { time: "10:20-11:00AM", name: "Music", presenter: "Maxim Somah", type: "Music" },
    { time: "11:00AM-1:00PM", name: "Worship Connexion", presenter: "New Life Africa", type: "Bible Teaching" },
    { time: "1:00-1:05PM", name: "Word To Go", presenter: "Pastor Mensa", type: "Bible Teaching" },
    { time: "1:05-3:00PM", name: "Launch Time Connect", presenter: "Maxim Somah", type: "Community" },
    { time: "2:00-2:20PM", name: "Announcement", presenter: "Maxim Somah", type: "Community" },
    { time: "2:30-2:32PM", name: "Reset", presenter: "Bernice Salad", type: "Special" },
    { time: "3:00-3:20PM", name: "Music", presenter: "Various", type: "Music" },
    { time: "3:20-3:24PM", name: "Guidelines For Living", presenter: "Various", type: "Special" },
    { time: "3:24-4:00PM", name: "The Heart Beat", presenter: "Various", type: "Community" },
    { time: "4:00-5:00PM", name: "The Drug Show", presenter: "Sam W. Doe", type: "Special" },
    { time: "5:00-6:00PM", name: "Trenz At 10", presenter: "T. KCalvin Walter", type: "Special" },
    { time: "6:00-7:00PM", name: "The Living Proof", presenter: "T. KCalvin Walter", type: "Special" },
    { time: "7:00-8:45PM", name: "Music", presenter: "T. KCalvin Walter", type: "Music" },
    { time: "8:45-9:00PM", name: "Announcement", presenter: "T. KCalvin Walter", type: "Community" },
    { time: "9:00-10:00PM", name: "The Conversation", presenter: "T. KCalvin Walter", type: "Interactive" },
    { time: "10:00PM-12:30AM", name: "Music", presenter: "T. KCalvin Walter", type: "Music" },
    { time: "12:30-4:30AM", name: "International Kapoa Secure Liberia", presenter: "T. KCalvin Walter", type: "Special" },
    { time: "4:30-5:00AM", name: "Thru The Bible", presenter: "Various", type: "Bible Teaching" }
  ],
  Saturday: [
    { time: "5:00-7:00AM", name: "Music", presenter: "KCalvin", type: "Music" },
    { time: "7:00-8:30AM", name: "The Morning Jam", presenter: "KCalvin", type: "Music" },
    { time: "8:30-9:00AM", name: "Music", presenter: "KCalvin", type: "Music" },
    { time: "9:00-10:15AM", name: "Vox Sports DESK", presenter: "KCalvin and Emmanuel", type: "Community" },
    { time: "10:15-11:15AM", name: "Teenagers Talk", presenter: "Janet and D'Alessandro", type: "Interactive" },
    { time: "11:15AM-1:00PM", name: "Music", presenter: "Various", type: "Music" },
    { time: "1:00-1:30PM", name: "Truth For Life Weekend", presenter: "Various", type: "Bible Teaching" },
    { time: "1:30-2:00PM", name: "Planet Sports", presenter: "Various", type: "Community" },
    { time: "2:00-4:00PM", name: "Island Praise", presenter: "Various", type: "Bible Teaching" },
    { time: "4:00-7:00PM", name: "Blessed Beatz", presenter: "Various", type: "Music" },
    { time: "7:00PM-12:00AM", name: "Transformed DJ", presenter: "Various", type: "Music" },
    { time: "12:00AM-5:00AM", name: "Music", presenter: "Various", type: "Music" }
  ]
};

const EnhancedProgramSchedule = ({ isFullPage = false }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentProgram, setCurrentProgram] = useState(null);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedType, setSelectedType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('voxRadioFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage
  const saveFavorites = (newFavorites) => {
    setFavorites(newFavorites);
    localStorage.setItem('voxRadioFavorites', JSON.stringify(newFavorites));
  };

  // Toggle favorite program
  const toggleFavorite = (program, day) => {
    const programKey = `${day}-${program.name}-${program.time}`;
    const isFavorite = favorites.includes(programKey);
    
    if (isFavorite) {
      saveFavorites(favorites.filter(fav => fav !== programKey));
    } else {
      saveFavorites([...favorites, programKey]);
    }
  };

  // Check if program is favorite
  const isFavorite = (program, day) => {
    const programKey = `${day}-${program.name}-${program.time}`;
    return favorites.includes(programKey);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date(new Date().toLocaleString("en-US", {timeZone: "Africa/Monrovia"}));
      setCurrentTime(now);
      
      // Get current day name
      const currentDayName = days[now.getDay()];
      setSelectedDay(currentDayName);
      
      // Find current program (simplified logic for demonstration)
      const todayPrograms = enhancedPrograms[currentDayName] || [];
      const currentHour = now.getHours();
      const activeProgram = todayPrograms.find(program => {
        // Simple time matching logic - would need more sophisticated parsing
        const timeRange = program.time.split('-');
        if (timeRange.length === 2) {
          const startTime = timeRange[0].trim();
          const startHour = parseInt(startTime.split(':')[0]);
          return currentHour >= startHour && currentHour < startHour + 1;
        }
        return false;
      });
      
      setCurrentProgram(activeProgram);
    }, 1000);

    return () => clearInterval(timer);
  }, [days]);

  const getFilteredPrograms = () => {
    let dayPrograms = enhancedPrograms[selectedDay] || [];
    
    // Filter by search term
    if (searchTerm) {
      dayPrograms = dayPrograms.filter(program => 
        program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.presenter.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by type
    if (selectedType !== 'All') {
      dayPrograms = dayPrograms.filter(program => program.type === selectedType);
    }
    
    // Filter by favorites
    if (showFavoritesOnly) {
      dayPrograms = dayPrograms.filter(program => isFavorite(program, selectedDay));
    }
    
    return dayPrograms;
  };

  const getProgramTypeIcon = (type) => {
    const IconComponent = PROGRAM_TYPES[type]?.icon || Radio;
    return <IconComponent size={16} />;
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
              <span className="text-sm font-bold text-orange-400">ENHANCED SCHEDULE</span>
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

          {/* Mobile Expanded Content */}
          {isExpanded && (
            <div className="mt-4 space-y-4">
              {/* Search and Favorites Controls */}
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    type="text"
                    placeholder="Search programs, presenters, or types..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${
                      showFavoritesOnly 
                        ? 'bg-red-500 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <Heart size={12} fill={showFavoritesOnly ? 'white' : 'none'} />
                    <span>Favorites Only</span>
                  </button>
                  
                  {!isFullPage && (
                    <Button
                      size="sm"
                      onClick={() => window.open('/enhanced-schedule', '_blank')}
                      className="bg-orange-500 hover:bg-orange-600 text-white text-xs"
                    >
                      Full Schedule
                    </Button>
                  )}
                </div>
              </div>
              {/* Day Selector */}
              <div className="overflow-x-auto">
                <div className="flex space-x-2 pb-2">
                  {days.map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                        selectedDay === day 
                          ? 'bg-orange-500 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {day.substring(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div className="overflow-x-auto">
                <div className="flex space-x-2 pb-2">
                  <button
                    onClick={() => setSelectedType('All')}
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                      selectedType === 'All' 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    All
                  </button>
                  {Object.keys(PROGRAM_TYPES).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap flex items-center space-x-1 ${
                        selectedType === type 
                          ? `${PROGRAM_TYPES[type].color} text-white` 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {getProgramTypeIcon(type)}
                      <span>{type}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Program List */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {getFilteredPrograms().length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <div className="mb-2">
                      {searchTerm ? <Search size={24} /> : showFavoritesOnly ? <Heart size={24} /> : <Calendar size={24} />}
                    </div>
                    <p className="text-sm">
                      {searchTerm 
                        ? `No programs found matching "${searchTerm}"` 
                        : showFavoritesOnly 
                        ? 'No favorite programs for this day' 
                        : 'No programs scheduled for this day'
                      }
                    </p>
                  </div>
                ) : (
                  getFilteredPrograms().map((program, index) => {
                    const isCurrent = currentProgram && currentProgram.name === program.name;
                    const typeConfig = PROGRAM_TYPES[program.type];
                    const isCurrentFavorite = isFavorite(program, selectedDay);
                    
                    return (
                      <div 
                        key={index} 
                        className={`p-3 rounded-lg border-l-4 ${typeConfig?.borderColor} ${
                          isCurrent 
                            ? 'bg-orange-500 text-white' 
                            : `${typeConfig?.bgLight} bg-opacity-10 text-gray-300`
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 flex-1">
                            {getProgramTypeIcon(program.type)}
                            <div className="flex-1">
                              <div className="text-sm font-medium">{program.name}</div>
                              <div className="text-xs opacity-75">with {program.presenter}</div>
                            </div>
                            {isCurrent && (
                              <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-xs font-bold bg-green-400 text-black px-1.5 py-0.5 rounded-full">LIVE</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="text-right">
                              <div className="text-xs font-medium">{program.time}</div>
                              <div className={`text-xs ${typeConfig?.textColor}`}>{program.type}</div>
                            </div>
                            <button
                              onClick={() => toggleFavorite(program, selectedDay)}
                              className={`p-1 rounded-full transition-colors ${
                                isCurrentFavorite 
                                  ? 'text-red-500 hover:text-red-400' 
                                  : 'text-gray-400 hover:text-red-500'
                              }`}
                            >
                              <Heart size={14} fill={isCurrentFavorite ? 'currentColor' : 'none'} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:block py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Radio className="text-orange-400 animate-pulse" size={20} />
              <span className="text-lg font-bold text-orange-400">ENHANCED VOX RADIO SCHEDULE</span>
              
              {currentProgram && (
                <div className="flex items-center space-x-2 bg-orange-500 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-bold text-white">NOW LIVE: {currentProgram.name}</span>
                  <Clock size={16} className="text-yellow-300" />
                </div>
              )}
            </div>

            {/* Desktop Search and Controls */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  type="text"
                  placeholder="Search programs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-10 w-64 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  showFavoritesOnly 
                    ? 'bg-red-500 text-white shadow-lg' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Heart size={16} fill={showFavoritesOnly ? 'white' : 'none'} />
                <span>Favorites ({favorites.length})</span>
              </button>
              
              {!isFullPage && (
                <Button
                  onClick={() => window.open('/enhanced-schedule', '_blank')}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Full Schedule View
                </Button>
              )}
            </div>
          </div>

          {/* Desktop Type Filter */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-gray-400" />
              <span className="text-sm text-gray-400">Filter by type:</span>
              <button
                onClick={() => setSelectedType('All')}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedType === 'All' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                All Programs
              </button>
              {Object.keys(PROGRAM_TYPES).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${
                    selectedType === type 
                      ? `${PROGRAM_TYPES[type].color} text-white` 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {getProgramTypeIcon(type)}
                  <span>{type}</span>
                </button>
              ))}
            </div>
            
            <div className="text-sm text-gray-400">
              Showing {getFilteredPrograms().length} programs for {selectedDay}
            </div>
          </div>

          {/* Desktop Day Tabs */}
          <div className="flex space-x-1 mb-4">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedDay === day 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Desktop Program Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
            {getFilteredPrograms().map((program, index) => {
              const isCurrent = currentProgram && currentProgram.name === program.name;
              const typeConfig = PROGRAM_TYPES[program.type];
              
              return (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border-l-4 ${typeConfig?.borderColor} transition-all duration-300 ${
                    isCurrent 
                      ? 'bg-orange-500 text-white shadow-lg scale-105' 
                      : `${typeConfig?.bgLight} bg-opacity-10 text-gray-300 hover:bg-opacity-20`
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded ${typeConfig?.color} text-white`}>
                        {getProgramTypeIcon(program.type)}
                      </div>
                      <div>
                        <div className="font-medium text-lg">{program.name}</div>
                        <div className="text-sm opacity-75">with {program.presenter}</div>
                        <div className="text-sm font-medium mt-1">{program.time}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xs px-2 py-1 rounded ${typeConfig?.color} text-white`}>
                        {program.type}
                      </div>
                      {isCurrent && (
                        <div className="flex items-center space-x-1 mt-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-xs font-bold bg-green-400 text-black px-2 py-0.5 rounded-full">
                            LIVE
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedProgramSchedule;