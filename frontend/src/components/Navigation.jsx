import React from 'react';
import { Button } from './ui/button';

const Navigation = () => {
  return (
    <nav className="bg-black shadow-lg border-b-2 border-orange-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center border-2 border-white shadow-lg">
              <div className="text-white font-bold text-xl">VOX</div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Vox Radio</h1>
              <p className="text-orange-400 font-medium">97.5 FM - The Voice of the Community</p>
            </div>
          </div>

          {/* Listen Live button */}
          <div className="flex items-center space-x-4">
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 text-lg font-semibold border border-white shadow-lg">
              🎙️ Listen Live
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;