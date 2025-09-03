import React from 'react';
import { Button } from './ui/button';
import { Globe } from 'lucide-react';

const DashboardHeader = ({ language, setLanguage }) => {
  return (
    <div className="bg-orange-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <h2 className="text-2xl font-bold">Vox Radio Presenters Dashboard</h2>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Globe size={16} />
            </div>
            <span className="text-sm">Language:</span>
            <div className="flex items-center space-x-1">
              <div className="w-6 h-4 bg-blue-600 relative">
                <div className="w-2 h-4 bg-white absolute right-0"></div>
                <div className="w-2 h-4 bg-red-600 absolute right-0"></div>
              </div>
              <Button
                variant={language === 'FR' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setLanguage(language === 'FR' ? 'EN' : 'FR')}
                className="text-white hover:bg-white hover:bg-opacity-20 h-8"
              >
                Français
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;