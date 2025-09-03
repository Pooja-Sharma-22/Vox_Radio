import React, { useState } from 'react';
import { Button } from './ui/button';
import LiberiaTime from './LiberiaTime';

const Navigation = () => {
  const [isRadioPlaying, setIsRadioPlaying] = useState(false);
  
  const openRadioStream = () => {
    const radioUrl = 'https://radio.galcom.org/?station=VOXRadio';
    
    // Calculate center position for popup
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const popupWidth = 400;
    const popupHeight = 300;
    const left = (screenWidth - popupWidth) / 2;
    const top = (screenHeight - popupHeight) / 2;
    
    // Open popup with specific features for radio streaming
    const radioWindow = window.open(
      radioUrl,
      'VoxRadioStream',
      `
        width=${popupWidth},
        height=${popupHeight},
        left=${left},
        top=${top},
        scrollbars=no,
        resizable=yes,
        toolbar=no,
        menubar=no,
        location=no,
        directories=no,
        status=yes,
        copyhistory=no
      `.replace(/\s/g, '')
    );
    
    if (radioWindow) {
      setIsRadioPlaying(true);
      
      // Check if window is closed to update button state
      const checkClosed = setInterval(() => {
        if (radioWindow.closed) {
          setIsRadioPlaying(false);
          clearInterval(checkClosed);
        }
      }, 1000);
      
      // Focus the popup window
      radioWindow.focus();
    } else {
      // Fallback if popup is blocked
      alert('Please allow popups for this site to listen to Vox Radio live stream');
    }
  };

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

          {/* Center - Liberia Time (One of a Kind) */}
          <div className="flex-1 flex justify-center">
            <LiberiaTime />
          </div>

          {/* Listen Live button with streaming indicator */}
          <div className="flex items-center space-x-4">
            <Button 
              onClick={openRadioStream}
              className={`px-8 py-3 text-lg font-semibold border border-white shadow-lg transition-all duration-300 ${
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
            
            {isRadioPlaying && (
              <div className="text-xs text-orange-400 animate-bounce">
                ● STREAMING
              </div>
            )}
          </div>
        </div>
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