import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Play, Pause, Volume2, VolumeX, X, Minimize2, Maximize2 } from 'lucide-react';

const RadioPlayer = ({ isVisible, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMinimized, setIsMinimized] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('stopped');
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      // Stop the stream
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      setIsPlaying(false);
      setConnectionStatus('stopped');
    } else {
      // Start the stream - open in new window for better compatibility
      const radioUrl = 'https://radio.galcom.org/?station=VOXRadio';
      const radioWindow = window.open(
        radioUrl,
        'VoxRadioStream',
        `
          width=400,
          height=300,
          left=${(window.screen.width - 400) / 2},
          top=${(window.screen.height - 300) / 2},
          scrollbars=no,
          resizable=yes,
          toolbar=no,
          menubar=no,
          location=no,
          directories=no,
          status=yes
        `.replace(/\s/g, '')
      );
      
      if (radioWindow) {
        setIsPlaying(true);
        setConnectionStatus('connected');
        radioWindow.focus();
        
        // Check if window is closed
        const checkClosed = setInterval(() => {
          if (radioWindow.closed) {
            setIsPlaying(false);
            setConnectionStatus('stopped');
            clearInterval(checkClosed);
          }
        }, 1000);
      } else {
        alert('Please allow popups to listen to Vox Radio live stream');
      }
    }
  };

  const handleVolumeToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const getConnectionStatusText = () => {
    switch(connectionStatus) {
      case 'connecting': return 'Connecting...';
      case 'connected': return 'Live Stream Active';
      case 'stopped': return 'Stream Stopped';
      default: return 'Ready to Play';
    }
  };

  const getConnectionStatusColor = () => {
    switch(connectionStatus) {
      case 'connecting': return 'text-orange-500';
      case 'connected': return 'text-green-500';
      case 'stopped': return 'text-gray-500';
      default: return 'text-gray-400';
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-2 sm:bottom-4 right-2 sm:right-4 z-50">
      <Card className={`bg-black border-orange-500 border-2 shadow-2xl transition-all duration-300 ${
        isMinimized ? 'w-48 sm:w-64' : 'w-72 sm:w-80'
      }`}>
        <CardContent className="p-0">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-2 sm:p-3 flex items-center justify-between">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white flex items-center justify-center">
                <span className="text-orange-500 text-xs font-bold">VOX</span>
              </div>
              <span className="font-semibold text-xs sm:text-sm">Vox Radio 97.5 FM</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white hover:bg-opacity-20 h-5 w-5 sm:h-6 sm:w-6 p-0"
              >
                {isMinimized ? <Maximize2 size={10} className="sm:w-3 sm:h-3" /> : <Minimize2 size={10} className="sm:w-3 sm:h-3" />}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={onClose}
                className="text-white hover:bg-white hover:bg-opacity-20 h-5 w-5 sm:h-6 sm:w-6 p-0"
              >
                <X size={10} className="sm:w-3 sm:h-3" />
              </Button>
            </div>
          </div>

          {/* Player Content */}
          {!isMinimized && (
            <div className="bg-black text-white p-3 sm:p-4">
              {/* Status */}
              <div className="text-center mb-2 sm:mb-3">
                <div className={`text-xs ${getConnectionStatusColor()}`}>
                  {connectionStatus === 'connecting' && (
                    <span className="inline-block w-1 h-1 bg-orange-500 rounded-full mr-1 animate-pulse"></span>
                  )}
                  {connectionStatus === 'connected' && (
                    <span className="inline-block w-1 h-1 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                  )}
                  {getConnectionStatusText()}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Opens in separate window - Low bandwidth optimized
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-4 mb-2 sm:mb-3">
                <Button
                  onClick={handlePlayPause}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${
                    isPlaying 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-green-500 hover:bg-green-600'
                  } text-white`}
                >
                  {isPlaying ? <Pause size={16} className="sm:w-5 sm:h-5" /> : <Play size={16} className="sm:w-5 sm:h-5" />}
                </Button>
              </div>

              {/* Info */}
              <div className="text-center">
                <div className="text-xs text-gray-300 mb-2">
                  {isPlaying ? 'Stream active in popup window' : 'Click play to open stream'}
                </div>
                <div className="text-xs text-orange-400">
                  💡 Optimized for low-speed internet connections
                </div>
              </div>
            </div>
          )}

          {/* Minimized View */}
          {isMinimized && (
            <div className="bg-black text-white p-2 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  onClick={handlePlayPause}
                  size="sm"
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full ${
                    isPlaying 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-green-500 hover:bg-green-600'
                  } text-white p-0`}
                >
                  {isPlaying ? <Pause size={10} className="sm:w-3 sm:h-3" /> : <Play size={10} className="sm:w-3 sm:h-3" />}
                </Button>
                <div className="text-xs">
                  <div className={getConnectionStatusColor()}>
                    {connectionStatus === 'connected' && '🔴 LIVE'}
                    {connectionStatus === 'connecting' && '🟡 Connecting'}
                    {connectionStatus === 'stopped' && '⭕ Stopped'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hidden audio element for future use */}
          <audio
            ref={audioRef}
            style={{ display: 'none' }}
            preload="none"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default RadioPlayer;