import React, { useState } from 'react';
import Navigation from './Navigation';
import DashboardHeader from './DashboardHeader';
import TabNavigation from './TabNavigation';
import CurrentWeather from './CurrentWeather';
import WhatsAppSection from './WhatsAppSection';
import SubmitTestimony from './SubmitTestimony';
import LogPhoneCall from './LogPhoneCall';
import RecentSubmissions from './RecentSubmissions';
import { Button } from './ui/button';
import { Download } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('current-weather');

  const handleDownloadExcel = () => {
    const data = {
      weather: 'Current weather data for Liberian cities',
      flights: 'Flight arrivals and departures for Monrovia',
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
        return (
          <div>
            <CurrentWeather />
            <FlightInfo />
          </div>
        );
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
      <DashboardHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6 border-b border-gray-300">
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          <Button 
            onClick={handleDownloadExcel}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white flex items-center gap-2 shadow-lg border border-black"
          >
            <Download size={16} />
            Download Report
          </Button>
        </div>
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 min-h-96 mt-4">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;