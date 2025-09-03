import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '../hooks/use-toast';
import { Phone, Clock, User, FileText, AlertTriangle } from 'lucide-react';
import { mockPhoneCalls } from '../data/mockData';

const LogPhoneCall = () => {
  const { toast } = useToast();
  const [callData, setCallData] = useState({
    caller: '',
    phone: '',
    topic: '',
    duration: '',
    notes: '',
    presenter: '',
    followUpRequired: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!callData.caller || !callData.topic || !callData.presenter) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    console.log('Phone call logged:', callData);
    
    toast({
      title: "Phone Call Logged Successfully!",
      description: "The phone call has been recorded in the system.",
    });

    setCallData({
      caller: '',
      phone: '',
      topic: '',
      duration: '',
      notes: '',
      presenter: '',
      followUpRequired: false
    });
  };

  const handleInputChange = (field, value) => {
    setCallData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatDuration = (duration) => {
    return duration || 'N/A';
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="mr-3">📞</span>
          Log Phone Call
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Record New Phone Call</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="caller" className="flex items-center gap-2">
                  <User size={16} />
                  Caller Name *
                </Label>
                <Input
                  id="caller"
                  value={callData.caller}
                  onChange={(e) => handleInputChange('caller', e.target.value)}
                  placeholder="Enter caller's name or 'Anonymous'"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone size={16} />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={callData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="0777123456 (optional)"
                />
              </div>

              <div>
                <Label htmlFor="topic">Call Topic/Category *</Label>
                <Select value={callData.topic} onValueChange={(value) => handleInputChange('topic', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select call topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prayer-request">Prayer Request</SelectItem>
                    <SelectItem value="song-request">Song Request</SelectItem>
                    <SelectItem value="program-feedback">Program Feedback</SelectItem>
                    <SelectItem value="complaint">Complaint</SelectItem>
                    <SelectItem value="general-inquiry">General Inquiry</SelectItem>
                    <SelectItem value="technical-issue">Technical Issue</SelectItem>
                    <SelectItem value="community-announcement">Community Announcement</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="presenter">Presenter *</Label>
                <Select value={callData.presenter} onValueChange={(value) => handleInputChange('presenter', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select presenter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="John Smith">John Smith</SelectItem>
                    <SelectItem value="Sarah Wilson">Sarah Wilson</SelectItem>
                    <SelectItem value="Michael Johnson">Michael Johnson</SelectItem>
                    <SelectItem value="Grace Davis">Grace Davis</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="duration" className="flex items-center gap-2">
                  <Clock size={16} />
                  Call Duration
                </Label>
                <Input
                  id="duration"
                  value={callData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  placeholder="e.g., 5:30"
                />
              </div>

              <div>
                <Label htmlFor="notes" className="flex items-center gap-2">
                  <FileText size={16} />
                  Notes
                </Label>
                <Textarea
                  id="notes"
                  value={callData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Add any relevant notes about the call..."
                  rows={4}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="followUp"
                  checked={callData.followUpRequired}
                  onChange={(e) => handleInputChange('followUpRequired', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="followUp" className="flex items-center gap-2">
                  <AlertTriangle size={16} className="text-orange-500" />
                  Follow-up Required
                </Label>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                Log Phone Call
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Phone Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {mockPhoneCalls.map((call) => (
                <div key={call.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="font-semibold text-gray-900 flex items-center gap-2">
                        <User size={16} />
                        {call.caller}
                      </span>
                      <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                        <Phone size={14} />
                        {call.phone}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-500">{call.timestamp}</span>
                      <p className="text-sm font-medium text-orange-600">
                        Duration: {formatDuration(call.duration)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                      {call.topic}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-2">{call.notes}</p>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Presenter: {call.presenter}</span>
                    {call.followUpRequired && (
                      <span className="text-orange-600 flex items-center gap-1">
                        <AlertTriangle size={12} />
                        Follow-up needed
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LogPhoneCall;