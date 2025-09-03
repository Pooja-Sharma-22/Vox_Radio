import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';
import { Plus, MessageCircle, User, Phone } from 'lucide-react';

const AddWhatsAppMessage = ({ onMessageAdded }) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageData, setMessageData] = useState({
    sender: '',
    phone: '',
    message: '',
    replied: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!messageData.sender || !messageData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in sender name and message.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create WhatsApp message object
      const whatsappMessage = {
        ...messageData,
        id: Date.now(),
        time: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        timestamp: new Date().toLocaleString(),
        type: 'whatsapp'
      };

      // Save to localStorage
      const existingMessages = JSON.parse(localStorage.getItem('voxRadioWhatsApp') || '[]');
      existingMessages.unshift(whatsappMessage);
      localStorage.setItem('voxRadioWhatsApp', JSON.stringify(existingMessages));

      console.log('WhatsApp message added:', whatsappMessage);
      
      toast({
        title: "Message Added Successfully!",
        description: "WhatsApp message has been added to the system.",
      });

      // Reset form and close dialog
      setMessageData({
        sender: '',
        phone: '',
        message: '',
        replied: false
      });
      
      setIsOpen(false);
      
      // Notify parent component if callback provided
      if (onMessageAdded) {
        onMessageAdded(whatsappMessage);
      }

    } catch (error) {
      console.error('Error adding WhatsApp message:', error);
      toast({
        title: "Error Adding Message",
        description: "There was an error adding the message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setMessageData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="flex items-center gap-2">
          <Plus size={16} />
          Add Message
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="text-green-500" size={20} />
            Add WhatsApp Message
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="sender" className="flex items-center gap-2">
              <User size={16} />
              Sender Name *
            </Label>
            <Input
              id="sender"
              value={messageData.sender}
              onChange={(e) => handleInputChange('sender', e.target.value)}
              placeholder="Enter sender's name"
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
              value={messageData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="0777123456 (optional)"
            />
          </div>

          <div>
            <Label htmlFor="message" className="flex items-center gap-2">
              <MessageCircle size={16} />
              Message *
            </Label>
            <Textarea
              id="message"
              value={messageData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Enter the WhatsApp message..."
              rows={4}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="replied"
              checked={messageData.replied}
              onChange={(e) => handleInputChange('replied', e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-green-500 focus:ring-green-500"
            />
            <Label htmlFor="replied" className="text-sm">
              Mark as replied
            </Label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              {isSubmitting ? 'Adding...' : 'Add Message'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddWhatsAppMessage;