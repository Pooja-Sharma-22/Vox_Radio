import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { MessageCircle, Users, TrendingUp, RefreshCw, CheckCircle, Clock } from 'lucide-react';
import AddWhatsAppMessage from './AddWhatsAppMessage';

const WhatsAppSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({
    today: 0,
    week: 0,
    month: 0
  });

  // Load WhatsApp messages and calculate stats
  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = () => {
    const whatsappMessages = JSON.parse(localStorage.getItem('voxRadioWhatsApp') || '[]');
    setMessages(whatsappMessages);
    
    // Calculate stats (simple mock calculation)
    const now = new Date();
    const today = whatsappMessages.filter(msg => {
      const msgDate = new Date(msg.timestamp || msg.time || now);
      return msgDate.toDateString() === now.toDateString();
    }).length;

    setStats({
      today: today,
      week: Math.max(today * 3, whatsappMessages.length), // Mock calculation
      month: whatsappMessages.length
    });
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      loadMessages();
      setIsLoading(false);
    }, 2000);
  };

  const openWhatsApp = () => {
    const url = `https://wa.me/2310777975975`;
    window.open(url, '_blank');
  };

  const handleReplyMessage = (messageId) => {
    const updatedMessages = messages.map(msg => 
      msg.id === messageId ? { ...msg, replied: true } : msg
    );
    localStorage.setItem('voxRadioWhatsApp', JSON.stringify(updatedMessages));
    setMessages(updatedMessages);
    
    alert('Reply sent successfully!');
  };

  const handleMessageAdded = (newMessage) => {
    loadMessages(); // Refresh the messages list
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
          <span className="mr-3">💬</span>
          WhatsApp Management
        </h3>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button 
            onClick={handleRefresh}
            disabled={isLoading}
            variant="outline"
            className="flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
            {isLoading ? 'Loading...' : 'Refresh'}
          </Button>
          <Button 
            onClick={openWhatsApp}
            className="bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <MessageCircle size={16} />
            Open WhatsApp
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Today</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">{stats.today}</p>
              </div>
              <MessageCircle className="text-green-500" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">This Week</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-600">{stats.week}</p>
              </div>
              <TrendingUp className="text-blue-500" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">This Month</p>
                <p className="text-xl sm:text-2xl font-bold text-purple-600">{stats.month}</p>
              </div>
              <Users className="text-purple-500" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 col-span-2 lg:col-span-1">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">WhatsApp Number</p>
                <p className="text-base sm:text-lg font-bold text-orange-600">0777975975</p>
              </div>
              <MessageCircle className="text-orange-500" size={24} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Messages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Recent WhatsApp Messages</span>
            <AddWhatsAppMessage onMessageAdded={handleMessageAdded} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
              <p className="text-gray-500 mb-4">
                WhatsApp messages will appear here once they start coming in.
              </p>
              <div className="text-sm text-gray-400">
                <p>WhatsApp Business Number: <strong>0777975975</strong></p>
                <p>Use "Add Message" button to manually add messages</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="p-3 sm:p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col sm:flex-row items-start justify-between space-y-3 sm:space-y-0">
                    <div className="flex-1 w-full">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <span className="font-semibold text-gray-900">{message.sender}</span>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock size={12} />
                          {message.time}
                        </span>
                        <div className="flex items-center gap-2">
                          {message.replied ? (
                            <CheckCircle size={16} className="text-green-500" />
                          ) : (
                            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                          )}
                        </div>
                      </div>
                      {message.phone && (
                        <p className="text-sm text-gray-600 mb-2">📞 {message.phone}</p>
                      )}
                      <p className="text-gray-700 mb-3 text-sm sm:text-base">{message.message}</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    {!message.replied && (
                      <Button 
                        size="sm" 
                        onClick={() => handleReplyMessage(message.id)}
                        className="bg-green-500 hover:bg-green-600 text-white w-full sm:w-auto"
                      >
                        Reply
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => alert(`Message details:\nFrom: ${message.sender}\nTime: ${message.time}\nMessage: ${message.message}\nReplied: ${message.replied ? 'Yes' : 'No'}`)}
                      className="w-full sm:w-auto"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppSection;