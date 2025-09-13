import React, { useState, useEffect } from 'react';
import { Mic, Radio, Users, Copy, Check, ExternalLink, Shield, ChevronDown, ChevronUp, Settings, Share, Mail, MessageCircle, X, HelpCircle, Volume2 } from 'lucide-react';
import { Button } from './ui/button';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const VDONinjaStudio = () => {
  const [settings, setSettings] = useState({
    vdoDirectorUrl: '',
    vdoGuestUrl: '',
    audioOnly: true,
    proAudio: true,
    cleanUI: true,
    audioBitrateKbps: 128
  });
  const [guestLinkCopied, setGuestLinkCopied] = useState(false);
  const [instructionsCopied, setInstructionsCopied] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [checklist, setChecklist] = useState({
    interfaceSelected: false,
    headphones: false,
    wiredConnection: false,
    levelsOK: false
  });

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

  // Load VDO.Ninja settings on component mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/vdo-ninja-settings`);
        if (response.ok) {
          const loadedSettings = await response.json();
          setSettings(loadedSettings);
        }
      } catch (error) {
        console.warn('Failed to load VDO.Ninja settings:', error);
      }
    };

    loadSettings();
  }, [BACKEND_URL]);

  // Compose URLs with parameters
  const composeUrls = () => {
    let directorUrl = settings.vdoDirectorUrl;
    let guestUrl = settings.vdoGuestUrl;

    if (!directorUrl || !guestUrl) {
      return { directorUrl: '', guestUrl: '' };
    }

    // Add parameters to director URL
    if (settings.audioOnly) {
      directorUrl += (directorUrl.includes('?') ? '&' : '?') + 'novideo';
    }
    if (settings.proAudio) {
      directorUrl += (directorUrl.includes('?') ? '&' : '?') + 'proaudio';
    }
    if (settings.cleanUI) {
      directorUrl += (directorUrl.includes('?') ? '&' : '?') + 'cleanoutput';
    }
    if (settings.audioBitrateKbps) {
      directorUrl += (directorUrl.includes('?') ? '&' : '?') + `audiobitrate=${settings.audioBitrateKbps}`;
    }

    // Add parameters to guest URL
    if (settings.audioOnly) {
      guestUrl += (guestUrl.includes('?') ? '&' : '?') + 'novideo';
    }
    if (settings.proAudio) {
      guestUrl += (guestUrl.includes('?') ? '&' : '?') + 'proaudio';
    }
    if (settings.cleanUI) {
      guestUrl += (guestUrl.includes('?') ? '&' : '?') + 'cleanoutput';
    }
    if (settings.audioBitrateKbps) {
      guestUrl += (guestUrl.includes('?') ? '&' : '?') + `outboundaudiobitrate=${settings.audioBitrateKbps}`;
    }

    return { directorUrl, guestUrl };
  };

  const { directorUrl, guestUrl } = composeUrls();

  const saveSettings = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/vdo-ninja-settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        // Show success feedback
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
        toast.textContent = 'Settings saved successfully!';
        document.body.appendChild(toast);
        setTimeout(() => {
          document.body.removeChild(toast);
        }, 3000);
      }
    } catch (error) {
      console.error('Failed to save VDO.Ninja settings:', error);
    }
  };

  const openDirectorRoom = () => {
    if (directorUrl) {
      window.open(directorUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const copyGuestLink = async () => {
    if (guestUrl) {
      try {
        await navigator.clipboard.writeText(guestUrl);
        setGuestLinkCopied(true);
        setTimeout(() => setGuestLinkCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy guest link:', err);
      }
    }
  };

  const shareViaWhatsApp = () => {
    if (guestUrl) {
      const url = `https://wa.me/?text=${encodeURIComponent(guestUrl)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const shareViaEmail = () => {
    if (guestUrl) {
      const url = `mailto:?subject=VDO.Ninja%20Invite&body=${encodeURIComponent(guestUrl)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const copyInstructions = async () => {
    const instructions = `You're invited to join our live audio link (Vox Radio – VDO.Ninja).
1) Click this link: ${guestUrl}
2) Click "Start" and allow microphone access.
3) Use wired headphones (no speakers) to avoid echo.
4) Chrome/Edge on computer or Safari on iPhone/iPad works best.`;

    try {
      await navigator.clipboard.writeText(instructions);
      setInstructionsCopied(true);
      setTimeout(() => setInstructionsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy instructions:', err);
    }
  };

  const testDirectorLink = () => {
    if (directorUrl) {
      window.open(directorUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const testGuestLink = () => {
    if (guestUrl) {
      window.open(guestUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleChecklistChange = (item) => {
    setChecklist(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  return (
    <div className="p-3 sm:p-6">
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 flex items-center">
          <Volume2 className="mr-3 text-purple-600" size={28} />
          Remote Broadcast (VDO.Ninja)
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Professional live streaming solution for remote interviews and broadcasts
        </p>
      </div>

      {/* Settings Panel */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="w-full flex items-center justify-between text-left"
        >
          <div className="flex items-center">
            <Settings className="mr-2 text-purple-600" size={20} />
            <span className="font-medium text-gray-900">VDO.Ninja Settings</span>
          </div>
          {showSettings ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        
        {showSettings && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Director URL
                </label>
                <input
                  type="url"
                  value={settings.vdoDirectorUrl}
                  onChange={(e) => setSettings(prev => ({ ...prev, vdoDirectorUrl: e.target.value }))}
                  placeholder="https://vdo.ninja/alpha"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Guest URL
                </label>
                <input
                  type="url"
                  value={settings.vdoGuestUrl}
                  onChange={(e) => setSettings(prev => ({ ...prev, vdoGuestUrl: e.target.value }))}
                  placeholder="https://vdo.ninja/?room=myroom"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.audioOnly}
                  onChange={(e) => setSettings(prev => ({ ...prev, audioOnly: e.target.checked }))}
                  className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">Audio Only</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.proAudio}
                  onChange={(e) => setSettings(prev => ({ ...prev, proAudio: e.target.checked }))}
                  className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">Pro Audio</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.cleanUI}
                  onChange={(e) => setSettings(prev => ({ ...prev, cleanUI: e.target.checked }))}
                  className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">Clean UI</span>
              </label>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bitrate (kbps)
                </label>
                <select
                  value={settings.audioBitrateKbps}
                  onChange={(e) => setSettings(prev => ({ ...prev, audioBitrateKbps: parseInt(e.target.value) }))}
                  className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                >
                  <option value="64">64</option>
                  <option value="96">96</option>
                  <option value="128">128</option>
                  <option value="256">256</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={testDirectorLink}
                variant="outline"
                size="sm"
                disabled={!directorUrl}
                className="text-purple-600 border-purple-300 hover:bg-purple-50"
              >
                <ExternalLink size={16} className="mr-1" />
                Test Director
              </Button>
              <Button
                onClick={testGuestLink}
                variant="outline"
                size="sm"
                disabled={!guestUrl}
                className="text-purple-600 border-purple-300 hover:bg-purple-50"
              >
                <ExternalLink size={16} className="mr-1" />
                Test Guest
              </Button>
              <Button
                onClick={saveSettings}
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Save Settings
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Main Studio Controls */}
      <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 sm:p-6 mb-6 border border-purple-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Director Controls */}
          <div className="space-y-3">
            <Button
              onClick={openDirectorRoom}
              disabled={!directorUrl}
              size="lg"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3"
            >
              <Radio className="mr-2" size={20} />
              Open Director Room
            </Button>
            
            <p className="text-xs text-purple-700">
              {directorUrl ? 'Opens composed director URL with audio parameters' : 'Configure director URL in settings first'}
            </p>
          </div>

          {/* Guest Link Controls */}
          <div className="space-y-3">
            <Button
              onClick={copyGuestLink}
              disabled={!guestUrl}
              variant="outline"
              size="lg"
              className="w-full border-purple-300 hover:bg-purple-50"
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
                disabled={!guestUrl}
                size="sm"
                variant="outline"
                className="flex-1 text-green-600 border-green-300 hover:bg-green-50"
              >
                <MessageCircle size={16} className="mr-1" />
                WhatsApp
              </Button>
              <Button
                onClick={shareViaEmail}
                disabled={!guestUrl}
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
              disabled={!guestUrl}
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
            { key: 'interfaceSelected', label: 'Interface selected' },
            { key: 'headphones', label: 'Headphones on' },
            { key: 'wiredConnection', label: 'Wired/Ethernet' },
            { key: 'levelsOK', label: 'Levels OK' }
          ].map(item => (
            <label key={item.key} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={checklist[item.key]}
                onChange={() => handleChecklistChange(item.key)}
                className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
              />
              <span className={`text-sm ${checklist[item.key] ? 'text-green-700 font-medium' : 'text-gray-700'}`}>
                {item.label}
              </span>
            </label>
          ))}
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
                <span>Allow mic permission; if no audio, reselect device in VDO.ninja settings</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>Reduce bitrate to 64-96 kbps if audio is choppy</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>Use wired Ethernet for best stability</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>Chrome/Edge recommended for desktop; Safari for iOS</span>
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
                  {`You're invited to join our live audio link (Vox Radio – VDO.Ninja).
1) Click this link: ${guestUrl}
2) Click "Start" and allow microphone access.
3) Use wired headphones (no speakers) to avoid echo.
4) Chrome/Edge on computer or Safari on iPhone/iPad works best.`}
                </pre>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  onClick={copyInstructions}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
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

      {/* Success Toast for guest link copy */}
      {guestLinkCopied && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          Guest link copied!
        </div>
      )}
    </div>
  );
};

export default VDONinjaStudio;