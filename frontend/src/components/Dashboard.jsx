import React, { useState } from 'react';
import Navigation from './Navigation';
import DashboardHeader from './DashboardHeader';
import ProgramSchedule from './ProgramSchedule';
import VoxRadioProgramLog from './VoxRadioProgramLog';
import BroadcastClocks from './BroadcastClocks';
import CleanfeedStudio from './CleanfeedStudio';
import TabNavigation from './TabNavigation';
import CurrentWeather from './CurrentWeather';
import WeatherForecast from './WeatherForecast';
import WhatsAppSection from './WhatsAppSection';
import SubmitTestimony from './SubmitTestimony';
import LogPhoneCall from './LogPhoneCall';
import RecentSubmissions from './RecentSubmissions';
import NotificationSystem from './NotificationSystem';
import { Button } from './ui/button';
import { Download } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('current-weather');

  const handleDownloadExcel = () => {
    const data = {
      weather: 'Current weather data for Liberian cities',
      testimonies: 'Recent testimonies submitted',
      phoneCalls: 'Phone call logs',
      whatsapp: 'WhatsApp message statistics'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vox-radio-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'current-weather':
        return <CurrentWeather />;
      case 'weather-forecast':
        return <WeatherForecast />;
      case 'program-log':
        return <VoxRadioProgramLog />;
      case 'cleanfeed':
        return <CleanfeedStudio />;
      case 'whatsapp':
        return <WhatsAppSection />;
      case 'submit-testimony':
        return <SubmitTestimony />;
      case 'log-phone-call':
        return <LogPhoneCall />;
      case 'recent-submissions':
        return <RecentSubmissions />;
      default:
        return <CurrentWeather />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <ProgramSchedule />
      <DashboardHeader />
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 sm:py-6 border-b border-gray-300 gap-4">
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex items-center justify-center sm:justify-end">
            <Button 
              onClick={handleDownloadExcel}
              size="sm"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white flex items-center gap-1 sm:gap-2 shadow-lg border border-black text-xs sm:text-sm"
            >
              <Download size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Download Report</span>
              <span className="sm:hidden">Download</span>
            </Button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 min-h-96 mt-4">
          {renderTabContent()}
        </div>
      </div>
      
      {/* Notification System */}
      <NotificationSystem />
    </div>
  );
};

export default Dashboard;