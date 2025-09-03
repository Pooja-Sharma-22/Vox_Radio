import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '../hooks/use-toast';
import { Phone, Clock, User, FileText, AlertTriangle, Plus } from 'lucide-react';

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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!callData.caller || !callData.topic || !callData.presenter) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create phone call object with timestamp
      const phoneCallData = {
        ...callData,
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        type: 'phone_call'
      };

      // Save to localStorage for persistence
      const existingCalls = JSON.parse(localStorage.getItem('voxRadioPhoneCalls') || '[]');
      existingCalls.unshift(phoneCallData);
      localStorage.setItem('voxRadioPhoneCalls', JSON.stringify(existingCalls));

      console.log('Phone call logged:', phoneCallData);
      
      toast({
        title: "Phone Call Logged Successfully!",
        description: "The phone call has been recorded in the system.",
      });

      // Reset form
      setCallData({
        caller: '',
        phone: '',
        topic: '',
        duration: '',
        notes: '',
        presenter: '',
        followUpRequired: false
      });

    } catch (error) {
      console.error('Error logging phone call:', error);
      toast({
        title: "Logging Error",
        description: "There was an error logging the phone call. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setCallData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="mr-3">📞</span>
          Log Phone Call
        </h3>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Record New Phone Call</CardTitle>
            <p className="text-gray-600">
              Log all incoming calls for better listener engagement and follow-up management.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="caller" className="flex items-center gap-2 text-base font-medium">
                  <User size={16} />
                  Caller Name *
                </Label>
                <Input
                  id="caller"
                  value={callData.caller}
                  onChange={(e) => handleInputChange('caller', e.target.value)}
                  placeholder="Enter caller's name or 'Anonymous'"
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="flex items-center gap-2 text-base font-medium">
                  <Phone size={16} />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={callData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="0777123456 (optional)"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="topic" className="text-base font-medium">Call Topic/Category *</Label>
                <Select value={callData.topic} onValueChange={(value) => handleInputChange('topic', value)}>
                  <SelectTrigger className="mt-2">
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
                <Label htmlFor="presenter" className="text-base font-medium">Presenter *</Label>
                <Select value={callData.presenter} onValueChange={(value) => handleInputChange('presenter', value)}>
                  <SelectTrigger className="mt-2">
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
                <Label htmlFor="duration" className="flex items-center gap-2 text-base font-medium">
                  <Clock size={16} />
                  Call Duration
                </Label>
                <Input
                  id="duration"
                  value={callData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  placeholder="e.g., 5:30"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="notes" className="flex items-center gap-2 text-base font-medium">
                  <FileText size={16} />
                  Notes
                </Label>
                <Textarea
                  id="notes"
                  value={callData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Add any relevant notes about the call..."
                  rows={4}
                  className="mt-2"
                />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="followUp"
                  checked={callData.followUpRequired}
                  onChange={(e) => handleInputChange('followUpRequired', e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
                <Label htmlFor="followUp" className="flex items-center gap-2 text-base">
                  <AlertTriangle size={16} className="text-orange-500" />
                  Follow-up Required
                </Label>
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold"
              >
                {isSubmitting ? 'Logging Call...' : 'Log Phone Call'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LogPhoneCall;