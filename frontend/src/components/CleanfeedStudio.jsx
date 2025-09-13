import React, { useState, useEffect } from 'react';
import { Mic, Radio, Users, Copy, Check, ExternalLink, Shield, ChevronDown, ChevronUp, Settings, Share, Mail, MessageCircle, X, HelpCircle } from 'lucide-react';
import { Button } from './ui/button';
import VDONinjaStudio from './VDONinjaStudio';

const CleanfeedStudio = () => {
  const [passwordCopied, setPasswordCopied] = useState(false);
  const [guestLinkCopied, setGuestLinkCopied] = useState(false);
  const [instructionsCopied, setInstructionsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);
  const [checklist, setChecklist] = useState({
    audioInterface: false,
    headphones: false,
    greenRoom: false,
    guestBrowser: false
  });
  const [cleanfeedSettings, setCleanfeedSettings] = useState({
    cleanfeedGuestUrl: 'https://cleanfeed.net/k?iUc5ijKCFYUj',
    presenterInstructions: `You're invited to join our live broadcast on Cleanfeed.
1) Click this guest link: {{cleanfeedGuestUrl}}
2) When the page opens, click "Start" and allow microphone access.
3) Use headphones (no speakers) to avoid echo.
4) Use Chrome or Edge on computer, or Safari on iPhone/iPad.
5) If you see a waiting screen (Green Room), please wait to be admitted by the studio.`
  });

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

  // Load Cleanfeed settings on component mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/cleanfeed-settings`);
        if (response.ok) {
          const settings = await response.json();
          setCleanfeedSettings(settings);
        }
      } catch (error) {
        console.warn('Failed to load Cleanfeed settings:', error);
      }
    };

    loadSettings();
  }, [BACKEND_URL]);

  const openCleanfeedStudio = () => {
    setIsLoading(true);
    
    // Open main Cleanfeed studio
    const studioWindow = window.open(
      'https://cleanfeed.net',
      'CleanfeedStudio',
      'width=1200,height=800,scrollbars=yes,resizable=yes,status=yes,location=yes,toolbar=yes'
    );

    if (studioWindow) {
      studioWindow.focus();
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const openKioskMode = () => {
    // Open in kiosk mode with minimal chrome
    const kioskWindow = window.open(
      'https://cleanfeed.net',
      'CleanfeedKiosk',
      'width=1200,height=800,menubar=no,toolbar=no,location=no,status=no,scrollbars=yes,resizable=yes'
    );

    if (kioskWindow) {
      kioskWindow.focus();
      // Show instruction after a brief delay
      setTimeout(() => {
        alert('Press "Start" in Cleanfeed to allow microphone access (required by browser).');
      }, 2000);
    }
  };

  const copyGuestLink = async () => {
    try {
      await navigator.clipboard.writeText(cleanfeedSettings.cleanfeedGuestUrl);
      setGuestLinkCopied(true);
      setTimeout(() => setGuestLinkCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy guest link:', err);
    }
  };

  const copyInstructions = async () => {
    try {
      const processedInstructions = cleanfeedSettings.presenterInstructions.replace(
        /{{cleanfeedGuestUrl}}/g,
        cleanfeedSettings.cleanfeedGuestUrl
      );
      await navigator.clipboard.writeText(processedInstructions);
      setInstructionsCopied(true);
      setTimeout(() => setInstructionsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy instructions:', err);
    }
  };

  const shareViaWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(cleanfeedSettings.cleanfeedGuestUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareViaEmail = () => {
    const url = `mailto:?subject=Cleanfeed%20Invite&body=${encodeURIComponent(cleanfeedSettings.cleanfeedGuestUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const testGuestLink = () => {
    window.open(cleanfeedSettings.cleanfeedGuestUrl, '_blank', 'noopener,noreferrer');
  };

  const handleChecklistChange = (item) => {
    setChecklist(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const processedInstructions = cleanfeedSettings.presenterInstructions.replace(
    /{{cleanfeedGuestUrl}}/g,
    cleanfeedSettings.cleanfeedGuestUrl
  );

  return (
    <div className="space-y-8">
      {/* VDO.Ninja Integration */}
      <VDONinjaStudio />
      
      {/* Divider */}
      <div className="border-t border-gray-300"></div>
      
      {/* Cleanfeed Integration (existing) */}
      <div className="p-3 sm:p-6">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 flex items-center">
            <Mic className="mr-3 text-blue-600" size={28} />
            Remote Broadcast (Cleanfeed)
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Professional remote broadcast studio for interviews and live shows
          </p>
        </div>

      {/* Main Studio Controls */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 sm:p-6 mb-6 border border-blue-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Studio Access */}
          <div className="space-y-3">
            <Button
              onClick={openCleanfeedStudio}
              disabled={isLoading}
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Opening Studio...
                </>
              ) : (
                <>
                  <Radio className="mr-2" size={20} />
                  Open Studio
                </>
              )}
            </Button>
            
            <Button
              onClick={openKioskMode}
              variant="outline"
              size="sm"
              className="w-full text-blue-600 border-blue-300 hover:bg-blue-50"
            >
              <ExternalLink className="mr-2" size={16} />
              Launch Studio (Kiosk)
            </Button>
            
            <p className="text-xs text-blue-700">
              Sign in with saved host credentials on this studio machine once; the session will persist.
            </p>
          </div>

          {/* Guest Link Controls */}
          <div className="space-y-3">
            <Button
              onClick={copyGuestLink}
              variant="outline"
              size="lg"
              className="w-full border-blue-300 hover:bg-blue-50"
            >
              {guestLinkCopied ? (
                <>
                  <Check className="mr-2 text-green-600" size={20} />
                  Guest Link Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2" size={20} />
                  Copy Guest Link
                </>
              )}
            </Button>

            {/* Share Row */}
            <div className="flex space-x-2">
              <Button
                onClick={shareViaWhatsApp}
                size="sm"
                variant="outline"
                className="flex-1 text-green-600 border-green-300 hover:bg-green-50"
              >
                <MessageCircle size={16} className="mr-1" />
                WhatsApp
              </Button>
              <Button
                onClick={shareViaEmail}
                size="sm"
                variant="outline"
                className="flex-1 text-gray-600 border-gray-300 hover:bg-gray-50"
              >
                <Mail size={16} className="mr-1" />
                Email
              </Button>
            </div>

            <Button
              onClick={() => setShowInstructionsModal(true)}
              variant="outline"
              size="sm"
              className="w-full text-orange-600 border-orange-300 hover:bg-orange-50"
            >
              <Users className="mr-2" size={16} />
              Presenter Instructions
            </Button>
          </div>
        </div>
      </div>

      {/* Pre-Broadcast Checklist */}
      <div className="bg-white rounded-lg p-4 sm:p-6 mb-6 border border-gray-200 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center">
          <Check className="mr-2 text-green-600" size={20} />
          Pre-Broadcast Checklist
        </h3>
        <div className="space-y-3">
          {[
            { key: 'audioInterface', label: 'Audio interface selected on studio PC' },
            { key: 'headphones', label: 'Use headphones (no speakers)' },
            { key: 'greenRoom', label: 'Green Room / Do-Not-Disturb set' },
            { key: 'guestBrowser', label: 'Guest on Chrome/Edge desktop or Safari on iOS' }
          ].map(item => (
            <label key={item.key} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={checklist[item.key]}
                onChange={() => handleChecklistChange(item.key)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className={`text-sm ${checklist[item.key] ? 'text-green-700 font-medium' : 'text-gray-700'}`}>
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Test Guest Link */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Guest Link</h4>
            <p className="text-xs text-gray-600 break-all">{cleanfeedSettings.cleanfeedGuestUrl}</p>
          </div>
          <Button
            onClick={testGuestLink}
            size="sm"
            variant="outline"
            className="ml-4"
          >
            <ExternalLink size={16} className="mr-1" />
            Test
          </Button>
        </div>
      </div>

      {/* Troubleshooting Accordion */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <button
          onClick={() => setShowTroubleshooting(!showTroubleshooting)}
          className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
        >
          <div className="flex items-center">
            <HelpCircle className="mr-2 text-orange-600" size={20} />
            <span className="font-medium text-gray-900">Troubleshooting</span>
          </div>
          {showTroubleshooting ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        
        {showTroubleshooting && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>Allow mic when prompted; if no audio, reselect device in Cleanfeed (gear icon)</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>Use wired Ethernet where possible</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>If echo: headphones only; disable speakers</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>Chrome/Edge recommended for desktop; Safari for iOS</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>Close other video call apps before starting</span>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Presenter Instructions Modal */}
      {showInstructionsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Presenter Instructions</h3>
                <button
                  onClick={() => setShowInstructionsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                  {processedInstructions}
                </pre>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  onClick={copyInstructions}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {instructionsCopied ? (
                    <>
                      <Check className="mr-2" size={16} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2" size={16} />
                      Copy Instructions
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => setShowInstructionsModal(false)}
                  variant="outline"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

        {/* Success Toast */}
        {guestLinkCopied && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
            Guest link copied!
          </div>
        )}
      </div>
    </div>
  );
};

export default CleanfeedStudio;