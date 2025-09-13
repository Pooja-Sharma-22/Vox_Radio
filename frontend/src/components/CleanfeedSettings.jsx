import React, { useState, useEffect } from 'react';
import { Save, ExternalLink, Shield, AlertCircle, Check } from 'lucide-react';
import { Button } from './ui/button';

const CleanfeedSettings = () => {
  const [settings, setSettings] = useState({
    cleanfeedGuestUrl: 'https://cleanfeed.net/k?iUc5ijKCFYUj',
    presenterInstructions: `You're invited to join our live broadcast on Cleanfeed.
1) Click this guest link: {{cleanfeedGuestUrl}}
2) When the page opens, click "Start" and allow microphone access.
3) Use headphones (no speakers) to avoid echo.
4) Use Chrome or Edge on computer, or Safari on iPhone/iPad.
5) If you see a waiting screen (Green Room), please wait to be admitted by the studio.`
  });
  
  const [secrets, setSecrets] = useState({
    cleanfeedHostUsername: '',
    cleanfeedHostPassword: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [showSecrets, setShowSecrets] = useState(false);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

  // Load settings on component mount
  useEffect(() => {
    const loadSettings = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BACKEND_URL}/api/cleanfeed-settings`);
        if (response.ok) {
          const data = await response.json();
          setSettings(data);
        }
      } catch (error) {
        console.error('Failed to load Cleanfeed settings:', error);
      }
      setIsLoading(false);
    };

    loadSettings();
  }, [BACKEND_URL]);

  const handleSettingsChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSecretsChange = (field, value) => {
    setSecrets(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const testGuestLink = () => {
    if (settings.cleanfeedGuestUrl) {
      window.open(settings.cleanfeedGuestUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const saveSettings = async () => {
    setIsSaving(true);
    setSaveStatus('');
    
    try {
      const response = await fetch(`${BACKEND_URL}/api/cleanfeed-settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings)
      });

      if (response.ok) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus(''), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
      setSaveStatus('error');
    }
    
    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-3"></div>
        Loading Cleanfeed settings...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 flex items-center">
          <Shield className="mr-3 text-blue-600" size={28} />
          Settings → Integrations → Cleanfeed
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Configure Cleanfeed integration for remote broadcasting
        </p>
      </div>

      {/* Public Settings */}
      <div className="bg-white rounded-lg p-4 sm:p-6 mb-6 border border-gray-200 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">Public Settings</h3>
        
        {/* Guest URL */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Guest Link URL
          </label>
          <div className="flex space-x-2">
            <input
              type="url"
              value={settings.cleanfeedGuestUrl}
              onChange={(e) => handleSettingsChange('cleanfeedGuestUrl', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="https://cleanfeed.net/k?iUc5ijKCFYUj"
            />
            <Button
              onClick={testGuestLink}
              variant="outline"
              size="sm"
              className="flex-shrink-0"
            >
              <ExternalLink size={16} className="mr-1" />
              Test
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            This link will be shared with guests to join the broadcast
          </p>
        </div>

        {/* Presenter Instructions */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Presenter Instructions
          </label>
          <textarea
            value={settings.presenterInstructions}
            onChange={(e) => handleSettingsChange('presenterInstructions', e.target.value)}
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            placeholder="Enter instructions for presenters..."
          />
          <p className="text-xs text-gray-500 mt-1">
            Use <code>{'{{cleanfeedGuestUrl}}'}</code> to automatically insert the guest link
          </p>
        </div>
      </div>

      {/* Admin-Only Secrets Section */}
      <div className="bg-yellow-50 rounded-lg p-4 sm:p-6 mb-6 border border-yellow-200">
        <div className="flex items-start space-x-3">
          <AlertCircle className="text-yellow-600 mt-1 flex-shrink-0" size={20} />
          <div className="flex-1">
            <h3 className="font-bold text-yellow-900 mb-2">Host Credentials (Admin Only)</h3>
            <p className="text-sm text-yellow-800 mb-4">
              Host username & password are stored as <strong>server-side secrets</strong> and are not exposed to the browser.
            </p>
            
            <Button
              onClick={() => setShowSecrets(!showSecrets)}
              variant="outline"
              size="sm"
              className="mb-4"
            >
              {showSecrets ? 'Hide' : 'Show'} Credentials
            </Button>

            {showSecrets && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-yellow-900 mb-1">
                    Host Username
                  </label>
                  <input
                    type="text"
                    value={secrets.cleanfeedHostUsername}
                    onChange={(e) => handleSecretsChange('cleanfeedHostUsername', e.target.value)}
                    className="w-full px-3 py-2 border border-yellow-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                    placeholder="Enter Cleanfeed host username"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-yellow-900 mb-1">
                    Host Password
                  </label>
                  <input
                    type="password"
                    value={secrets.cleanfeedHostPassword}
                    onChange={(e) => handleSecretsChange('cleanfeedHostPassword', e.target.value)}
                    className="w-full px-3 py-2 border border-yellow-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                    placeholder="Enter Cleanfeed host password"
                  />
                </div>
                
                <p className="text-xs text-yellow-700">
                  Note: These credentials are only used for reference. The "Open Studio" button simply opens Cleanfeed where you sign in on the studio machine.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center space-x-4">
        <Button
          onClick={saveSettings}
          disabled={isSaving}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2" size={16} />
              Save Settings
            </>
          )}
        </Button>

        {saveStatus === 'success' && (
          <div className="flex items-center text-green-600">
            <Check size={16} className="mr-1" />
            Settings saved successfully!
          </div>
        )}

        {saveStatus === 'error' && (
          <div className="flex items-center text-red-600">
            <AlertCircle size={16} className="mr-1" />
            Failed to save settings
          </div>
        )}
      </div>

      {/* Usage Instructions */}
      <div className="mt-8 bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">Usage Instructions</h4>
        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
          <li>Configure the guest link URL that will be shared with remote participants</li>
          <li>Customize presenter instructions (use <code>{'{{cleanfeedGuestUrl}}'}</code> placeholder)</li>
          <li>Save your settings and return to the Studio page</li>
          <li>Use "Open Studio" to access Cleanfeed and sign in with your credentials</li>
          <li>Share the guest link via the Studio dashboard</li>
        </ol>
      </div>
    </div>
  );
};

export default CleanfeedSettings;