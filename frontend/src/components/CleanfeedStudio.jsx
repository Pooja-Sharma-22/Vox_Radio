import React, { useState, useEffect } from 'react';
import { Mic, Radio, Users, Copy, Check, ExternalLink, Shield, ChevronDown, ChevronUp, Settings, Share, Mail, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

const CleanfeedStudio = () => {
  const [passwordCopied, setPasswordCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const studioUrl = process.env.REACT_APP_CLEANFEED_STUDIO_URL || 'https://cleanfeed.net/studio?voxradiolib';
  const studioPassword = process.env.REACT_APP_CLEANFEED_PASSWORD || 'Manager@2025';

  const openCleanfeedStudio = () => {
    setIsLoading(true);
    
    // Try to open in Chrome specifically
    const openInChrome = () => {
      // Method 1: Try Chrome protocol (works on some systems)
      try {
        window.location.href = `googlechrome://${studioUrl}`;
        return true;
      } catch (error) {
        console.log('Chrome protocol method failed:', error);
        return false;
      }
    };

    // Method 2: Use window.open with Chrome-optimized parameters
    const openWithWindowOpen = () => {
      const studioWindow = window.open(
        studioUrl,
        'CleanfeedStudio',
        'width=1200,height=800,scrollbars=yes,resizable=yes,status=yes,menubar=no,toolbar=no,location=yes'
      );

      if (studioWindow) {
        studioWindow.focus();
        return true;
      }
      return false;
    };

    // Method 3: Create a temporary link and click it (sometimes better for Chrome detection)
    const openWithTempLink = () => {
      const tempLink = document.createElement('a');
      tempLink.href = studioUrl;
      tempLink.target = '_blank';
      tempLink.rel = 'noopener noreferrer';
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      return true;
    };

    // Try methods in order of preference
    let opened = false;
    
    // First try Chrome protocol
    if (!opened) {
      opened = openInChrome();
    }
    
    // If that fails, try window.open
    if (!opened) {
      opened = openWithWindowOpen();
    }
    
    // If that fails, use temp link method
    if (!opened) {
      opened = openWithTempLink();
    }

    // Show user instruction if we can't guarantee Chrome opening
    if (opened) {
      // Show a toast or notification about Chrome preference
      console.log('Cleanfeed Studio opened - if not in Chrome, please copy the URL to Chrome for best experience');
    }

    // Reset loading state after a short delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const copyPassword = async () => {
    try {
      await navigator.clipboard.writeText(studioPassword);
      setPasswordCopied(true);
      setTimeout(() => setPasswordCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy password:', err);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
          <Mic className="mr-3 text-orange-600" size={28} />
          Cleanfeed Studio
        </h2>
        <p className="text-gray-600">
          Professional remote broadcast studio for interviews and live shows
        </p>
      </div>

      {/* Studio Access Card */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 mb-6 border border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
              <Radio className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Vox Radio Studio</h3>
              <p className="text-sm text-gray-600">Remote broadcast ready</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 mb-1">Status</div>
            <div className="flex items-center text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm font-medium">Online</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="flex items-center mb-2">
              <ExternalLink size={16} className="text-blue-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">Studio Link</span>
            </div>
            <div className="text-xs text-gray-500 break-all">
              {studioUrl}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Shield size={16} className="text-blue-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">Access Password</span>
              </div>
              <Button
                onClick={copyPassword}
                size="sm"
                variant="outline"
                className="h-6 px-2 text-xs"
              >
                {passwordCopied ? (
                  <>
                    <Check size={12} className="mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={12} className="mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <div className="text-xs text-gray-500 font-mono">
              {studioPassword}
            </div>
          </div>
        </div>

        <Button
          onClick={openCleanfeedStudio}
          disabled={isLoading}
          size="lg"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Opening in Chrome...
            </>
          ) : (
            <>
              <Mic className="mr-2" size={20} />
              Launch in Google Chrome
            </>
          )}
        </Button>
        
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-500">
            Opens in Google Chrome for optimal Cleanfeed experience
          </p>
        </div>
      </div>

      {/* Features & Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center">
            <Users className="mr-2 text-orange-600" size={20} />
            Studio Features
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2"></div>
              <span>High-quality audio streaming for remote interviews</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2"></div>
              <span>Multi-guest support for panel discussions</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2"></div>
              <span>Professional broadcast-quality audio</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2"></div>
              <span>Easy-to-use browser-based interface</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2"></div>
              <span>Recording capabilities for later use</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center">
            <Shield className="mr-2 text-blue-600" size={20} />
            Quick Start Guide
          </h3>
          <ol className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start">
              <div className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</div>
              <span>Click "Launch in Google Chrome" button above</span>
            </li>
            <li className="flex items-start">
              <div className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</div>
              <span>If not in Chrome, copy the URL and paste it in Chrome</span>
            </li>
            <li className="flex items-start">
              <div className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</div>
              <span>Enter the studio password when prompted</span>
            </li>
            <li className="flex items-start">
              <div className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</div>
              <span>Allow microphone access in Chrome</span>
            </li>
            <li className="flex items-start">
              <div className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">5</div>
              <span>Share the studio link with remote guests</span>
            </li>
            <li className="flex items-start">
              <div className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">6</div>
              <span>Start your professional broadcast!</span>
            </li>
          </ol>
        </div>
      </div>

      {/* Chrome Recommendation */}
      <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">🌐 Browser Recommendation</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p className="mb-2">
                <strong>Google Chrome is strongly recommended</strong> for the best Cleanfeed experience.
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Optimized audio quality and low latency</li>
                <li>Better WebRTC performance for real-time communication</li>
                <li>Reliable microphone and camera access</li>
                <li>Cleanfeed's preferred browser for professional broadcasting</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Pro Tips</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <ul className="list-disc list-inside space-y-1">
                <li>Use headphones to prevent audio feedback</li>
                <li>Test your setup before going live</li>
                <li>Keep the studio window open during broadcasts</li>
                <li>Share the password securely with guests only</li>
                <li>Set Chrome as your default browser for one-click access</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CleanfeedStudio;