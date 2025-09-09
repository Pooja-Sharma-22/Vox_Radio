import React, { useState } from 'react';
import { ArrowLeft, Calendar, Download, Print } from 'lucide-react';
import { Button } from './ui/button';
import EnhancedProgramSchedule from './EnhancedProgramSchedule';

const FullPageSchedule = () => {
  const [viewMode, setViewMode] = useState('enhanced'); // 'enhanced' or 'table'

  const handleBack = () => {
    window.close(); // Close if opened in new window
    // Or navigate back if using React Router
    // navigate(-1);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Create a simple CSV download of the schedule
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Day,Time,Program,Presenter,Type\n" +
      Object.entries(enhancedPrograms).map(([day, programs]) =>
        programs.map(program => 
          `${day},"${program.time}","${program.name}","${program.presenter}","${program.type}"`
        ).join('\n')
      ).join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "vox_radio_schedule.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Full Page Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="flex items-center space-x-2 text-white hover:text-orange-200 transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back to Dashboard</span>
              </button>
              
              <div className="h-8 w-px bg-orange-300"></div>
              
              <div className="flex items-center space-x-3">
                <Calendar size={24} />
                <div>
                  <h1 className="text-2xl font-bold">VOX Radio Program Schedule</h1>
                  <p className="text-orange-100">Complete weekly programming guide</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                onClick={handleDownload}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600"
              >
                <Download size={16} className="mr-2" />
                Download CSV
              </Button>
              
              <Button
                onClick={handlePrint}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600"
              >
                <Print size={16} className="mr-2" />
                Print Schedule
              </Button>
              
              <div className="flex rounded-lg overflow-hidden border border-orange-300">
                <button
                  onClick={() => setViewMode('enhanced')}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    viewMode === 'enhanced' 
                      ? 'bg-white text-orange-600' 
                      : 'text-white hover:bg-orange-400'
                  }`}
                >
                  Enhanced View
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    viewMode === 'table' 
                      ? 'bg-white text-orange-600' 
                      : 'text-white hover:bg-orange-400'
                  }`}
                >
                  Table View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === 'enhanced' ? (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <EnhancedProgramSchedule isFullPage={true} />
          </div>
        ) : (
          <WeeklyTableView />
        )}
      </div>
    </div>
  );
};

// Weekly Table View Component
const WeeklyTableView = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              {days.map(day => (
                <th key={day} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Generate time slots from 5 AM to 5 AM next day */}
            {Array.from({ length: 24 }, (_, i) => {
              const hour = (i + 5) % 24;
              const timeLabel = `${hour.toString().padStart(2, '0')}:00`;
              
              return (
                <tr key={timeLabel} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                    {timeLabel}
                  </td>
                  {days.map(day => {
                    // Find program for this time slot and day
                    const dayPrograms = enhancedPrograms[day] || [];
                    const program = dayPrograms.find(p => {
                      const startTime = p.time.split('-')[0].trim();
                      const startHour = parseInt(startTime.split(':')[0]);
                      return startHour === hour;
                    });
                    
                    return (
                      <td key={`${day}-${timeLabel}`} className="px-6 py-4 text-sm text-gray-900">
                        {program ? (
                          <div className="space-y-1">
                            <div className="font-medium text-gray-900">{program.name}</div>
                            <div className="text-xs text-gray-500">{program.presenter}</div>
                            <div className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              PROGRAM_TYPES[program.type]?.color || 'bg-gray-500'
                            } text-white`}>
                              {program.type}
                            </div>
                          </div>
                        ) : (
                          <div className="text-gray-400 text-xs">-</div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Import the program data (this would normally be imported from a separate file)
const PROGRAM_TYPES = {
  'Music': { color: 'bg-blue-500' },
  'Bible Teaching': { color: 'bg-green-500' },
  'Interactive': { color: 'bg-purple-500' },
  'Community': { color: 'bg-orange-500' },
  'Special': { color: 'bg-red-500' }
};

const enhancedPrograms = {
  Sunday: [
    { time: "5:00-7:00AM", name: "Music and Talks", presenter: "Emmanuel Lepolu", type: "Music" },
    { time: "7:00-7:30AM", name: "Salvation Half Hour", presenter: "Min. Cooper", type: "Bible Teaching" },
    // ... (truncated for brevity, but would include all programs)
  ],
  Monday: [
    { time: "5:00-8:00AM", name: "The Quiet Storm", presenter: "New Life Africa", type: "Special" },
    { time: "8:00-9:00AM", name: "Good Shepherd Fellowship", presenter: "Bishop Thomas", type: "Bible Teaching" },
    // ... (truncated for brevity)
  ],
  // ... other days
};

export default FullPageSchedule;