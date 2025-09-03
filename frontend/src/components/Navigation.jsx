import React from 'react';
import { Button } from './ui/button';
import { 
  Home, 
  Info, 
  Radio, 
  Church, 
  Target, 
  Heart,
  ChevronDown
} from 'lucide-react';

const Navigation = () => {
  const navItems = [
    { icon: Home, label: 'Home', active: false },
    { icon: Info, label: 'About', active: false },
    { icon: Radio, label: 'Programs', active: false },
    { icon: Church, label: 'Partner Churches', active: false },
    { icon: Target, label: 'Impact', active: false },
    { icon: Heart, label: 'Donate', hasDropdown: true },
  ];

  return (
    <>
      {/* Orange banner */}
      <div className="bg-orange-500 text-white text-center py-2 text-sm flex justify-center items-center gap-4">
        <span>🎙️ Launch set for November 13, 2025</span>
        <span>•</span>
        <span>📡 Broadcasting into 3 nations</span>
        <span>•</span>
        <span>🌍 Reaching the Greater Metro Area</span>
      </div>
      
      {/* Main navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <div className="text-white font-bold text-lg">VOX</div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Vox Radio</h1>
                <p className="text-sm text-gray-600">97.5 FM - The Voice of the Community</p>
              </div>
            </div>

            {/* Navigation items */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 cursor-pointer transition-colors">
                  <item.icon size={16} />
                  <span className="text-sm font-medium">{item.label}</span>
                  {item.hasDropdown && <ChevronDown size={14} />}
                </div>
              ))}
              
              {/* Language selector */}
              <div className="flex items-center space-x-2 text-sm">
                <span className="font-medium text-gray-900">EN</span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-600 cursor-pointer hover:text-orange-500">FR</span>
              </div>

              {/* Listen Live button */}
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6">
                Listen Live
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;