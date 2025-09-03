import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { MessageCircle, Users, TrendingUp, Plus, RefreshCw } from 'lucide-react';

const WhatsAppSection = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const openWhatsApp = () => {
    const url = `https://wa.me/2310777975975`;
    window.open(url, '_blank');
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="mr-3">💬</span>
          WhatsApp Management
        </h3>
        <div className="flex gap-2">
          <Button 
            onClick={handleRefresh}
            disabled={isLoading}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
            {isLoading ? 'Loading...' : 'Refresh'}
          </Button>
          <Button 
            onClick={openWhatsApp}
            className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
          >
            <MessageCircle size={16} />
            Open WhatsApp
          </Button>
        </div>
      </div>

      {/* Statistics Cards - Empty State */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today</p>
                <p className="text-2xl font-bold text-green-600">--</p>
              </div>
              <MessageCircle className="text-green-500" size={32} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-blue-600">--</p>
              </div>
              <TrendingUp className="text-blue-500" size={32} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-purple-600">--</p>
              </div>
              <Users className="text-purple-500" size={32} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">WhatsApp Number</p>
                <p className="text-lg font-bold text-orange-600">0777975975</p>
              </div>
              <MessageCircle className="text-orange-500" size={32} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Messages - Empty State */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Recent WhatsApp Messages</span>
            <Button size="sm" variant="outline" className="flex items-center gap-2">
              <Plus size={16} />
              Add Message
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <MessageCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
            <p className="text-gray-500 mb-4">
              WhatsApp messages will appear here once they start coming in.
            </p>
            <div className="text-sm text-gray-400">
              <p>WhatsApp Business Number: <strong>0777975975</strong></p>
              <p>Ready to receive and manage community messages</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppSection;