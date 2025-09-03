import React, { useState } from 'react';
import Header from './Header';
import Navigation from './Navigation';
import DashboardHeader from './DashboardHeader';
import TabNavigation from './TabNavigation';
import CurrentWeather from './CurrentWeather';
import { Button } from './ui/button';
import { Download } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('current-weather');
  const [language, setLanguage] = useState('EN');

  const handleDownloadExcel = () => {
    // Mock download functionality
    alert('Excel download functionality would be implemented here');
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'current-weather':
        return <CurrentWeather />;
      case 'whatsapp-facebook':
        return <div className="p-8 text-center text-gray-600">WhatsApp & Facebook functionality coming soon</div>;
      case 'submit-testimony':
        return <div className="p-8 text-center text-gray-600">Submit Testimony form coming soon</div>;
      case 'log-phone-call':
        return <div className="p-8 text-center text-gray-600">Log Phone Call functionality coming soon</div>;
      case 'recent-submissions':
        return <div className="p-8 text-center text-gray-600">Recent Submissions list coming soon</div>;
      default:
        return <CurrentWeather />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />
      <DashboardHeader language={language} setLanguage={setLanguage} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          <Button 
            onClick={handleDownloadExcel}
            className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
          >
            <Download size={16} />
            Download as Excel
          </Button>
        </div>
        <div className="bg-white rounded-lg shadow-sm min-h-96">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;