import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { MessageCircle, Users, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { mockWhatsAppData } from '../data/mockData';

const WhatsAppSection = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleReplyMessage = (messageId) => {
    // Mock reply functionality
    console.log(`Replying to message ${messageId}`);
    alert(`Reply sent to message ${messageId}!`);
  };

  const openWhatsApp = () => {
    const url = `https://wa.me/${mockWhatsAppData.number.replace(/^0/, '231')}`;
    window.open(url, '_blank');
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="mr-3">💬</span>
          WhatsApp Management
        </h3>
        <Button 
          onClick={openWhatsApp}
          className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
        >
          <MessageCircle size={16} />
          Open WhatsApp
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today</p>
                <p className="text-2xl font-bold text-green-600">{mockWhatsAppData.todayMessages}</p>
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
                <p className="text-2xl font-bold text-blue-600">{mockWhatsAppData.weekMessages}</p>
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
                <p className="text-2xl font-bold text-purple-600">{mockWhatsAppData.monthMessages}</p>
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
                <p className="text-lg font-bold text-orange-600">{mockWhatsAppData.number}</p>
              </div>
              <MessageCircle className="text-orange-500" size={32} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Messages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Recent WhatsApp Messages</span>
            <span className="text-sm text-gray-500">Last updated: {mockWhatsAppData.lastUpdate}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockWhatsAppData.recentMessages.map((message) => (
              <div key={message.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-gray-900">{message.sender}</span>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock size={12} />
                        {message.time}
                      </span>
                      {message.replied ? (
                        <CheckCircle size={16} className="text-green-500" />
                      ) : (
                        <AlertCircle size={16} className="text-orange-500" />
                      )}
                    </div>
                    <p className="text-gray-700 mb-3">{message.message}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {!message.replied && (
                    <Button 
                      size="sm" 
                      onClick={() => handleReplyMessage(message.id)}
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      Reply
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setSelectedMessage(message.id)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppSection;