import React from 'react';
import { Button } from './ui/button';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'current-weather', label: 'Current Weather', icon: '🌤️', shortLabel: 'Weather' },
    { id: 'weather-forecast', label: 'Weather Forecast', icon: '🌈', shortLabel: 'Forecast' },
    { id: 'program-log', label: 'Program Log', icon: '📊', shortLabel: 'Log' },
    { id: 'cleanfeed', label: 'Studio', icon: '🎙️', shortLabel: 'Studio' },
    { id: 'whatsapp', label: 'WhatsApp', icon: '💬', shortLabel: 'WhatsApp' },
    { id: 'submit-testimony', label: 'Submit Testimony', icon: '✍️', shortLabel: 'Testimony' },
    { id: 'log-phone-call', label: 'Log a Phone Call', icon: '📞', shortLabel: 'Phone' },
    { id: 'recent-submissions', label: 'Recent Submissions', icon: '📋', shortLabel: 'Recent' }
  ];

  return (
    <div className="flex space-x-1 sm:space-x-2 bg-black rounded-lg p-1 sm:p-2 border border-gray-300 overflow-x-auto">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab(tab.id)}
          className={`text-xs sm:text-sm transition-all font-medium whitespace-nowrap ${
            activeTab === tab.id 
              ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 border border-white' 
              : 'text-white hover:text-orange-400 hover:bg-gray-800'
          }`}
        >
          <span className="mr-1 sm:mr-2">{tab.icon}</span>
          <span className="hidden sm:inline">{tab.label}</span>
          <span className="sm:hidden">{tab.shortLabel}</span>
        </Button>
      ))}
    </div>
  );
};

export default TabNavigation;