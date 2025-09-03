import React from 'react';
import { Button } from './ui/button';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'current-weather', label: 'Current Weather' },
    { id: 'whatsapp-facebook', label: 'WhatsApp & Facebook' },
    { id: 'submit-testimony', label: 'Submit Testimony' },
    { id: 'log-phone-call', label: 'Log a Phone Call' },
    { id: 'recent-submissions', label: 'Recent Submissions' }
  ];

  return (
    <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab(tab.id)}
          className={`text-sm transition-all ${
            activeTab === tab.id 
              ? 'bg-orange-500 text-white hover:bg-orange-600' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
          }`}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
};

export default TabNavigation;