import React from 'react';
import { Button } from './ui/button';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'current-weather', label: 'Current Weather', icon: '🌤️' },
    { id: 'whatsapp', label: 'WhatsApp', icon: '💬' },
    { id: 'submit-testimony', label: 'Submit Testimony', icon: '✍️' },
    { id: 'log-phone-call', label: 'Log a Phone Call', icon: '📞' },
    { id: 'recent-submissions', label: 'Recent Submissions', icon: '📋' }
  ];

  return (
    <div className="flex space-x-2 bg-black rounded-lg p-2 border border-gray-300">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab(tab.id)}
          className={`text-sm transition-all font-medium ${
            activeTab === tab.id 
              ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 border border-white' 
              : 'text-white hover:text-orange-400 hover:bg-gray-800'
          }`}
        >
          <span className="mr-2">{tab.icon}</span>
          {tab.label}
        </Button>
      ))}
    </div>
  );
};

export default TabNavigation;