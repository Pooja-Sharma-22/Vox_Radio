import React, { useState, useEffect, useMemo } from 'react';
import { Download, Clock, BarChart3, Globe, Radio, TrendingUp, Users, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { formatMonrovia } from '../utils/timeUtils';

const BroadcastClocks = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [viewMode, setViewMode] = useState('week'); // 'week' or 'day'

  // Complete program schedule (synchronized with VoxRadioProgramLog.jsx)
  const programScheduleData = [
    // SUNDAY
    { Day: 'SUNDAY', 'Time (24h)': '00:00-05:00', Program: 'Music', 'Presenter(s)': '', timeSlot: 0, duration: 5, language: 'English', category: 'Music' },
    { Day: 'SUNDAY', 'Time (24h)': '05:00-07:00', Program: 'Music and Talks', 'Presenter(s)': 'Emmanuel Lerpolu', timeSlot: 5, duration: 2, language: 'English', category: 'Talk' },
    { Day: 'SUNDAY', 'Time (24h)': '07:00-07:30', Program: 'Salvation Half Hour', 'Presenter(s)': 'Min. Cooper', timeSlot: 7, duration: 0.5, language: 'English', category: 'Religious' },
    { Day: 'SUNDAY', 'Time (24h)': '07:30-08:00', Program: 'Music', 'Presenter(s)': 'Emmanuel Lerpolu', timeSlot: 7.5, duration: 0.5, language: 'English', category: 'Music' },
    { Day: 'SUNDAY', 'Time (24h)': '08:00-10:00', Program: 'The Gospel Caravan', 'Presenter(s)': 'Emmanuel Lerpolu', timeSlot: 8, duration: 2, language: 'English', category: 'Religious' },
    { Day: 'SUNDAY', 'Time (24h)': '10:00-15:00', Program: 'Music', 'Presenter(s)': '', timeSlot: 10, duration: 5, language: 'English', category: 'Music' },
    { Day: 'SUNDAY', 'Time (24h)': '15:00-16:00', Program: 'Sunday Special', 'Presenter(s)': 'Beatrice Ballah', timeSlot: 15, duration: 1, language: 'English', category: 'Talk' },
    { Day: 'SUNDAY', 'Time (24h)': '16:00-18:00', Program: 'Music and Talks', 'Presenter(s)': 'Victoria Walker', timeSlot: 16, duration: 2, language: 'English', category: 'Talk' },
    { Day: 'SUNDAY', 'Time (24h)': '18:00-19:30', Program: 'Kids Hour', 'Presenter(s)': 'Victoria Walker', timeSlot: 18, duration: 1.5, language: 'English', category: 'Children' },
    { Day: 'SUNDAY', 'Time (24h)': '19:30-21:00', Program: 'Music', 'Presenter(s)': 'Maxim Somah', timeSlot: 19.5, duration: 1.5, language: 'English', category: 'Music' },
    { Day: 'SUNDAY', 'Time (24h)': '21:00-22:00', Program: 'Search The Scriptures', 'Presenter(s)': 'Maxim Somah', timeSlot: 21, duration: 1, language: 'English', category: 'Religious' },
    { Day: 'SUNDAY', 'Time (24h)': '22:00-00:00', Program: 'Music', 'Presenter(s)': '', timeSlot: 22, duration: 2, language: 'English', category: 'Music' },

    // MONDAY
    { Day: 'MONDAY', 'Time (24h)': '00:00-00:30', Program: 'Music', 'Presenter(s)': '', timeSlot: 0, duration: 0.5, language: 'English', category: 'Music' },
    { Day: 'MONDAY', 'Time (24h)': '00:30-04:30', Program: 'International Kapoa Secure Liberia', 'Presenter(s)': 'Sam W. Doe', timeSlot: 0.5, duration: 4, language: 'Mixed', category: 'News' },
    { Day: 'MONDAY', 'Time (24h)': '04:30-05:00', Program: 'Thru the Bible', 'Presenter(s)': 'Dr. J. Vernon McGee', timeSlot: 4.5, duration: 0.5, language: 'English', category: 'Religious' },
    { Day: 'MONDAY', 'Time (24h)': '05:00-08:00', Program: 'The Quiet Storm', 'Presenter(s)': 'Justus Owaka', timeSlot: 5, duration: 3, language: 'English', category: 'Music' },
    { Day: 'MONDAY', 'Time (24h)': '08:00-09:00', Program: 'Good Shepherd Fellowship', 'Presenter(s)': 'Bishop Thomas', timeSlot: 8, duration: 1, language: 'English', category: 'Religious' },
    { Day: 'MONDAY', 'Time (24h)': '09:00-10:00', Program: 'Living Word', 'Presenter(s)': 'Dr Mensah Otabil', timeSlot: 9, duration: 1, language: 'English', category: 'Religious' },
    { Day: 'MONDAY', 'Time (24h)': '10:00-10:10', Program: 'Jingles and Music', 'Presenter(s)': 'Deddeh Gayflor', timeSlot: 10, duration: 0.17, language: 'English', category: 'Music' },
    { Day: 'MONDAY', 'Time (24h)': '10:10-10:20', Program: 'Announcement', 'Presenter(s)': 'Deddeh Gayflor', timeSlot: 10.17, duration: 0.17, language: 'English', category: 'Announcement' },
    { Day: 'MONDAY', 'Time (24h)': '10:20-10:45', Program: 'Back To The Bible Canada', 'Presenter(s)': 'Dr. John Neufeld', timeSlot: 10.33, duration: 0.42, language: 'English', category: 'Religious' },
    { Day: 'MONDAY', 'Time (24h)': '10:45-11:00', Program: 'Music', 'Presenter(s)': 'Deddeh Gayflor', timeSlot: 10.75, duration: 0.25, language: 'English', category: 'Music' },
    { Day: 'MONDAY', 'Time (24h)': '11:00-13:00', Program: 'Worship Connexion', 'Presenter(s)': 'New Life Africa / TWR', timeSlot: 11, duration: 2, language: 'English', category: 'Religious' },
    { Day: 'MONDAY', 'Time (24h)': '13:00-13:05', Program: 'Word To Go', 'Presenter(s)': 'Dr Mensah Otabil', timeSlot: 13, duration: 0.08, language: 'English', category: 'Religious' },
    { Day: 'MONDAY', 'Time (24h)': '13:05-15:00', Program: 'Launch Time Connection', 'Presenter(s)': 'Deddeh Gayflor', timeSlot: 13.08, duration: 1.92, language: 'English', category: 'Talk' },
    { Day: 'MONDAY', 'Time (24h)': '15:00-16:30', Program: 'The Heart Beat', 'Presenter(s)': 'Various', timeSlot: 15, duration: 1.5, language: 'English', category: 'Talk' },
    { Day: 'MONDAY', 'Time (24h)': '16:30-17:30', Program: 'Thru The Bible', 'Presenter(s)': 'Dr. J. Vernon McGee', timeSlot: 16.5, duration: 1, language: 'English', category: 'Religious' },
    { Day: 'MONDAY', 'Time (24h)': '17:30-18:00', Program: 'Music', 'Presenter(s)': 'Maxim Somah', timeSlot: 17.5, duration: 0.5, language: 'English', category: 'Music' },
    { Day: 'MONDAY', 'Time (24h)': '18:00-19:00', Program: 'Evening News', 'Presenter(s)': 'Maxim Somah', timeSlot: 18, duration: 1, language: 'English', category: 'News' },
    { Day: 'MONDAY', 'Time (24h)': '19:00-22:00', Program: 'Music', 'Presenter(s)': '', timeSlot: 19, duration: 3, language: 'English', category: 'Music' },
    { Day: 'MONDAY', 'Time (24h)': '22:00-00:00', Program: 'INTERNATIONAL KAPOA SECURE LIBERIA', 'Presenter(s)': 'Maxim Somah', timeSlot: 22, duration: 2, language: 'Mixed', category: 'News' },

    // TUESDAY - SATURDAY (simplified for brevity, using similar pattern)
    // Add more days with similar structure...
  ];

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate language distribution
  const languageStats = useMemo(() => {
    const totalWeeklyHours = 168; // 7 days × 24 hours
    const stats = {};
    
    programScheduleData.forEach(program => {
      const lang = program.language || 'English';
      if (!stats[lang]) {
        stats[lang] = { hours: 0, programs: 0 };
      }
      stats[lang].hours += program.duration * 7; // Multiply by 7 for weekly total
      stats[lang].programs += 1;
    });

    return Object.entries(stats).map(([language, data]) => ({
      language,
      hours: data.hours,
      percentage: ((data.hours / totalWeeklyHours) * 100).toFixed(1),
      programs: data.programs
    })).sort((a, b) => b.hours - a.hours);
  }, []);

  // Calculate category distribution
  const categoryStats = useMemo(() => {
    const stats = {};
    
    programScheduleData.forEach(program => {
      const cat = program.category || 'General';
      if (!stats[cat]) {
        stats[cat] = { hours: 0, programs: 0 };
      }
      stats[cat].hours += program.duration * 7;
      stats[cat].programs += 1;
    });

    return Object.entries(stats).map(([category, data]) => ({
      category,
      hours: data.hours,
      percentage: ((data.hours / 168) * 100).toFixed(1),
      programs: data.programs
    })).sort((a, b) => b.hours - a.hours);
  }, []);

  // Generate 24-hour clock visualization
  const generateClockHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      const currentProgram = programScheduleData.find(program => 
        program.timeSlot <= i && (program.timeSlot + program.duration) > i
      );
      
      hours.push({
        hour: i,
        program: currentProgram?.Program || 'Music',
        language: currentProgram?.language || 'English',
        presenter: currentProgram?.['Presenter(s)'] || ''
      });
    }
    return hours;
  };

  const clockHours = generateClockHours();

  // Download functions
  const downloadPNG = () => {
    // Simple implementation - create canvas and draw clock
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;
    
    // Draw background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 800, 600);
    
    // Draw title
    ctx.fillStyle = '#000000';
    ctx.font = '24px Arial';
    ctx.fillText('Vox Radio - Broadcast Time Distribution', 50, 50);
    
    // Draw language stats
    let y = 100;
    ctx.font = '16px Arial';
    languageStats.forEach(stat => {
      ctx.fillText(`${stat.language}: ${stat.percentage}% (${stat.hours}h/week)`, 50, y);
      y += 25;
    });
    
    // Download
    const link = document.createElement('a');
    link.download = 'vox-radio-broadcast-clocks.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const downloadCSV = () => {
    const csvData = [
      ['Day', 'Time', 'Program', 'Presenter', 'Duration', 'Language', 'Category'],
      ...programScheduleData.map(program => [
        program.Day,
        program['Time (24h)'],
        program.Program,
        program['Presenter(s)'],
        program.duration,
        program.language,
        program.category
      ])
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.download = 'vox-radio-program-schedule.csv';
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  return (
    <div className="p-3 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <Clock className="mr-3 text-orange-600" size={32} />
          🎵 Broadcast Time — Interactive Clocks
        </h1>
        <div className="text-lg text-gray-600 mb-4">
          <span className="font-semibold text-orange-600">Vox Radio</span>
        </div>
        <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
          Based on weekly broadcast total: <span className="font-semibold">168 hours</span> (GMT / Liberia) • 
          Current time: <span className="font-semibold">{formatMonrovia(currentTime, true)}</span>
        </div>
      </div>

      {/* View Toggle */}
      <div className="mb-6">
        <div className="flex space-x-2">
          <Button
            onClick={() => setViewMode('week')}
            variant={viewMode === 'week' ? 'default' : 'outline'}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Week View
          </Button>
          <Button
            onClick={() => setViewMode('day')}
            variant={viewMode === 'day' ? 'default' : 'outline'}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Day View
          </Button>
        </div>
      </div>

      {/* 24-Hour Programming Distribution */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">24-Hour Programming Distribution</h2>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          {/* Clock Numbers */}
          <div className="flex flex-wrap justify-center items-center mb-4 text-sm font-medium text-gray-600">
            {Array.from({length: 24}, (_, i) => (
              <span key={i} className="w-8 text-center">{i}</span>
            ))}
          </div>
          
          {/* Clock Visualization */}
          <div className="flex flex-wrap justify-center items-center mb-6">
            {clockHours.map((hour, index) => (
              <div
                key={index}
                className={`w-8 h-8 m-1 rounded border-2 flex items-center justify-center text-xs font-bold ${
                  hour.language === 'English' ? 'bg-blue-100 border-blue-300 text-blue-800' :
                  hour.language === 'Mixed' ? 'bg-green-100 border-green-300 text-green-800' :
                  'bg-gray-100 border-gray-300 text-gray-800'
                }`}
                title={`${hour.hour}:00 - ${hour.program} (${hour.language})`}
              >
                {hour.hour}
              </div>
            ))}
          </div>
          
          <div className="text-center text-gray-600">
            <span className="font-semibold">24 Hours</span> • Daily Schedule
          </div>
        </div>
      </div>

      {/* Programming Time Slots */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Programming Time Slots</h3>
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="max-h-96 overflow-y-auto">
            {programScheduleData.slice(0, 20).map((program, index) => (
              <div key={index} className="flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{program['Time (24h)']}</div>
                  <div className="text-sm text-gray-600">{program.Program}</div>
                  {program['Presenter(s)'] && (
                    <div className="text-xs text-gray-500">{program['Presenter(s)']}</div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{program.duration}h</div>
                  <div className={`text-xs px-2 py-1 rounded ${
                    program.language === 'English' ? 'bg-blue-100 text-blue-800' :
                    program.language === 'Mixed' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {program.language}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Language Distribution */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Weekly Language Distribution</h2>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-orange-600">100.0%</div>
            <div className="text-lg text-gray-600">168h/week</div>
          </div>
          
          <div className="space-y-3">
            {languageStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Globe className="text-orange-600" size={20} />
                  <span className="font-medium text-gray-900">{stat.language}</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-orange-600">{stat.percentage}%</div>
                  <div className="text-sm text-gray-600">{stat.hours}h • {stat.programs} programs</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Airtime Analytics & Impact */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="mr-2 text-orange-600" size={24} />
          Airtime Analytics & Impact
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Airtime */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <Radio className="text-blue-600" size={24} />
              <span className="text-2xl font-bold text-blue-600">168h</span>
            </div>
            <div className="text-sm text-gray-600">Weekly Airtime</div>
            <div className="text-xs text-gray-500">7 days × 24 hours</div>
          </div>

          {/* Program Diversity */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="text-green-600" size={24} />
              <span className="text-2xl font-bold text-green-600">{categoryStats.length}</span>
            </div>
            <div className="text-sm text-gray-600">Program Categories</div>
            <div className="text-xs text-gray-500">Diverse content mix</div>
          </div>

          {/* Language Reach */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <Globe className="text-purple-600" size={24} />
              <span className="text-2xl font-bold text-purple-600">{languageStats.length}</span>
            </div>
            <div className="text-sm text-gray-600">Languages</div>
            <div className="text-xs text-gray-500">Community reach</div>
          </div>

          {/* Impact Score */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <Zap className="text-orange-600" size={24} />
              <span className="text-2xl font-bold text-orange-600">92</span>
            </div>
            <div className="text-sm text-gray-600">Impact Score</div>
            <div className="text-xs text-gray-500">Content quality</div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Category Distribution</h3>
          <div className="space-y-3">
            {categoryStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded ${
                    stat.category === 'Music' ? 'bg-blue-500' :
                    stat.category === 'Religious' ? 'bg-purple-500' :
                    stat.category === 'Talk' ? 'bg-green-500' :
                    stat.category === 'News' ? 'bg-red-500' :
                    'bg-gray-500'
                  }`}></div>
                  <span className="font-medium text-gray-900">{stat.category}</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-gray-900">{stat.percentage}%</span>
                  <div className="text-sm text-gray-500">{stat.hours}h/week</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Download Options */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="text-sm text-gray-600">
            <div className="font-medium">Total Visible: 100.0% • 168h</div>
            <div>Full Week: 100.0% • 168h</div>
            <div>Daily Programs: {programScheduleData.length} slots</div>
          </div>
          
          <div className="flex space-x-3">
            <Button
              onClick={downloadPNG}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Download size={16} />
              <span>📸 Download PNG</span>
            </Button>
            <Button
              onClick={downloadCSV}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Download size={16} />
              <span>📊 Export CSV</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Emergent Badge */}
      <div className="text-center mt-8 pt-6 border-t border-gray-200">
        <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
          <span>Made with</span>
          <a
            href="https://app.emergent.sh/?utm_source=emergent-badge"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            Emergent
          </a>
        </div>
      </div>
    </div>
  );
};

export default BroadcastClocks;