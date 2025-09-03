import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '../hooks/use-toast';
import { CheckCircle, Clock, User, Phone, MessageSquare } from 'lucide-react';

const SubmitTestimony = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    category: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.message || !formData.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Mock submission
    console.log('Testimony submitted:', formData);
    
    toast({
      title: "Testimony Submitted Successfully!",
      description: "Your testimony has been received and will be reviewed shortly.",
    });

    // Reset form
    setFormData({
      name: '',
      phone: '',
      category: '',
      message: ''
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="mr-3">✍️</span>
          Submit Testimony
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submission Form */}
        <Card>
          <CardHeader>
            <CardTitle>Share Your Testimony</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User size={16} />
                  Full Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone size={16} />
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="0777123456"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Testimony Category *</Label>
                <Select onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="healing">Healing & Recovery</SelectItem>
                    <SelectItem value="financial">Financial Breakthrough</SelectItem>
                    <SelectItem value="family">Family Restoration</SelectItem>
                    <SelectItem value="spiritual">Spiritual Growth</SelectItem>
                    <SelectItem value="general">General Praise</SelectItem>
                    <SelectItem value="prayer">Answered Prayer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message" className="flex items-center gap-2">
                  <MessageSquare size={16} />
                  Your Testimony *
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Share your testimony with our community..."
                  rows={6}
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                Submit Testimony
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Recent Testimonies */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Testimonies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Mary Johnson",
                  category: "Healing",
                  message: "God healed my mother from illness. Praise be to God!",
                  status: "approved",
                  time: "2 hours ago"
                },
                {
                  name: "Samuel Roberts",
                  category: "Financial",
                  message: "Got a new job after months of prayer. Thank you Jesus!",
                  status: "pending",
                  time: "5 hours ago"
                },
                {
                  name: "Grace Williams",
                  category: "Family",
                  message: "My husband returned home after prayer. God is good!",
                  status: "approved",
                  time: "1 day ago"
                }
              ].map((testimony, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">{testimony.name}</span>
                    <div className="flex items-center gap-2">
                      {testimony.status === 'approved' ? (
                        <CheckCircle size={16} className="text-green-500" />
                      ) : (
                        <Clock size={16} className="text-orange-500" />
                      )}
                      <span className="text-xs text-gray-500">{testimony.time}</span>
                    </div>
                  </div>
                  <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                    {testimony.category}
                  </span>
                  <p className="text-sm text-gray-700 mt-2">{testimony.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubmitTestimony;