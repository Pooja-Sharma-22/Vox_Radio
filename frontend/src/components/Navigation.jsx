import React, { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X, Radio, Mic } from 'lucide-react';
import LiberiaTime from './LiberiaTime';

const Navigation = () => {
  const [isRadioPlaying, setIsRadioPlaying] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const openRadioStream = () => {
    const radioUrl = process.env.REACT_APP_RADIO_STREAM_URL || 'https://radio.galcom.org/?station=VOXRadio';
    
    const streamWindow = window.open(
      radioUrl,
      'VoxRadioStream',
      'width=400,height=600,scrollbars=yes,resizable=yes'
    );
    
    if (streamWindow) {
      streamWindow.focus();
    }
  };

  const openCleanfeedStudio = () => {
    const studioUrl = process.env.REACT_APP_CLEANFEED_STUDIO_URL || 'https://cleanfeed.net/studio?voxradiolib';
    
    const studioWindow = window.open(
      studioUrl,
      'CleanfeedStudio',
      'width=1200,height=800,scrollbars=yes,resizable=yes,status=yes,menubar=no,toolbar=no'
    );

    if (studioWindow) {
      studioWindow.focus();
    }
  };

  return (
    <nav className="bg-black shadow-lg border-b-2 border-orange-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo - Mobile Responsive */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center border-2 border-white shadow-lg">
              <div className="text-white font-bold text-lg sm:text-xl">VOX</div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl sm:text-2xl font-bold text-white">Vox Radio</h1>
              <p className="text-orange-400 font-medium text-sm sm:text-base">97.5 FM - The Voice of the Community</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-bold text-white">Vox Radio</h1>
              <p className="text-orange-400 font-medium text-xs">97.5 FM</p>
            </div>
          </div>

          {/* Desktop - Center Liberia Time */}
          <div className="hidden lg:flex flex-1 justify-center">
            <LiberiaTime />
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <Button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-orange-500 hover:bg-orange-600 text-white p-2"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>

          {/* Desktop Listen Live button */}
          <div className="hidden sm:flex items-center space-x-4">
            <Button 
              onClick={openRadioStream}
              className={`px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-lg font-semibold border border-white shadow-lg transition-all duration-300 ${
                isRadioPlaying 
                  ? 'bg-green-500 hover:bg-green-600 animate-pulse' 
                  : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
              } text-white`}
            >
              {isRadioPlaying ? (
                <>
                  <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                  <span className="hidden sm:inline">🎙️ LIVE - Now Playing</span>
                  <span className="sm:hidden">🎙️ LIVE</span>
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">🎙️ Listen Live</span>
                  <span className="sm:hidden">🎙️ Live</span>
                </>
              )}
            </Button>
            
            {isRadioPlaying && (
              <div className="text-xs text-orange-400 animate-bounce hidden sm:block">
                ● STREAMING
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden bg-gray-900 border-t border-orange-500 py-4">
            {/* Mobile Liberia Time */}
            <div className="flex justify-center mb-4 lg:hidden">
              <div className="scale-75">
                <LiberiaTime />
              </div>
            </div>
            
            {/* Mobile Listen Live Button */}
            <div className="flex justify-center">
              <Button 
                onClick={openRadioStream}
                className={`px-6 py-3 text-lg font-semibold border border-white shadow-lg transition-all duration-300 ${
                  isRadioPlaying 
                    ? 'bg-green-500 hover:bg-green-600 animate-pulse' 
                    : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
                } text-white`}
              >
                {isRadioPlaying ? (
                  <>
                    <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                    🎙️ LIVE - Now Playing
                  </>
                ) : (
                  <>
                    🎙️ Listen Live
                  </>
                )}
              </Button>
            </div>
            
            {isRadioPlaying && (
              <div className="text-center mt-2">
                <div className="text-xs text-orange-400 animate-bounce">
                  ● STREAMING
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Low bandwidth optimization notice */}
      {isRadioPlaying && (
        <div className="bg-orange-600 text-white text-center py-1 text-xs">
          🎵 Vox Radio Live Stream Active - Optimized for Low Bandwidth 🎵
        </div>
      )}
    </nav>
  );
};

export default Navigation;