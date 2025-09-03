import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '../hooks/use-toast';
import { User, Phone, MessageSquare, CheckCircle } from 'lucide-react';

const SubmitTestimony = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    category: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.message || !formData.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create testimony object with timestamp
      const testimonyData = {
        ...formData,
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        approved: false,
        type: 'testimony'
      };

      // Save to localStorage for persistence
      const existingTestimonies = JSON.parse(localStorage.getItem('voxRadioTestimonies') || '[]');
      existingTestimonies.unshift(testimonyData);
      localStorage.setItem('voxRadioTestimonies', JSON.stringify(existingTestimonies));

      console.log('Testimony submitted:', testimonyData);
      
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

    } catch (error) {
      console.error('Error submitting testimony:', error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your testimony. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="text-orange-500" />
              Share Your Testimony with Vox Radio Community
            </CardTitle>
            <p className="text-gray-600">
              Your testimony will be reviewed and may be shared on air to encourage others in the community.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="flex items-center gap-2 text-base font-medium">
                  <User size={16} />
                  Full Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="flex items-center gap-2 text-base font-medium">
                  <Phone size={16} />
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="0777123456"
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="category" className="text-base font-medium">Testimony Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger className="mt-2">
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
                <Label htmlFor="message" className="flex items-center gap-2 text-base font-medium">
                  <MessageSquare size={16} />
                  Your Testimony *
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Share your testimony with our community..."
                  rows={8}
                  required
                  className="mt-2"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Please share your experience in detail so others can be encouraged.
                </p>
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Testimony'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Submission Guidelines */}
        <Card className="mt-6">
          <CardContent className="p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Testimony Guidelines:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Be specific about what happened and how it impacted your life</li>
              <li>• Keep your testimony positive and encouraging</li>
              <li>• All testimonies are reviewed before being shared on air</li>
              <li>• You may be contacted for follow-up or to appear on the show</li>
              <li>• Your testimony may be edited for length and clarity</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubmitTestimony;