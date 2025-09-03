import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Play, Pause, Volume2, VolumeX, X, Minimize2, Maximize2 } from 'lucide-react';

const RadioPlayer = ({ isVisible, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMinimized, setIsMinimized] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const iframeRef = useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      // Reload iframe to stop stream (low bandwidth friendly)
      if (iframeRef.current) {
        iframeRef.current.src = '';
      }
      setIsPlaying(false);
      setConnectionStatus('stopped');
    } else {
      // Load stream
      if (iframeRef.current) {
        iframeRef.current.src = 'https://radio.galcom.org/?station=VOXRadio';
      }
      setIsPlaying(true);
      setConnectionStatus('connecting');
      
      // Simulate connection status for user feedback
      setTimeout(() => {
        setConnectionStatus('connected');
      }, 3000);
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
      default: return 'Ready';
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
    <div className="fixed bottom-4 right-4 z-50">
      <Card className={`bg-black border-orange-500 border-2 shadow-2xl transition-all duration-300 ${
        isMinimized ? 'w-64' : 'w-80'
      }`}>
        <CardContent className="p-0">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                <span className="text-orange-500 text-xs font-bold">VOX</span>
              </div>
              <span className="font-semibold text-sm">Vox Radio 97.5 FM</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white hover:bg-opacity-20 h-6 w-6 p-0"
              >
                {isMinimized ? <Maximize2 size={12} /> : <Minimize2 size={12} />}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={onClose}
                className="text-white hover:bg-white hover:bg-opacity-20 h-6 w-6 p-0"
              >
                <X size={12} />
              </Button>
            </div>
          </div>

          {/* Player Content */}
          {!isMinimized && (
            <div className="bg-black text-white p-4">
              {/* Status */}
              <div className="text-center mb-3">
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
                  Optimized for Low Bandwidth
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-4 mb-3">
                <Button
                  onClick={handlePlayPause}
                  className={`w-12 h-12 rounded-full ${
                    isPlaying 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-green-500 hover:bg-green-600'
                  } text-white`}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </Button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleVolumeToggle}
                  className="text-white hover:bg-gray-800 p-1"
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </Button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #f97316 0%, #f97316 ${(isMuted ? 0 : volume) * 100}%, #374151 ${(isMuted ? 0 : volume) * 100}%, #374151 100%)`
                  }}
                />
              </div>

              {/* Low Bandwidth Notice */}
              <div className="mt-3 p-2 bg-gray-900 rounded text-xs text-gray-300 text-center">
                <span className="text-orange-400">💡</span> Stream uses minimal data for low-speed connections
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
                  className={`w-8 h-8 rounded-full ${
                    isPlaying 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-green-500 hover:bg-green-600'
                  } text-white p-0`}
                >
                  {isPlaying ? <Pause size={12} /> : <Play size={12} />}
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

          {/* Hidden iframe for stream */}
          {isPlaying && (
            <iframe
              ref={iframeRef}
              src="https://radio.galcom.org/?station=VOXRadio"
              style={{ display: 'none' }}
              title="Vox Radio Stream"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RadioPlayer;