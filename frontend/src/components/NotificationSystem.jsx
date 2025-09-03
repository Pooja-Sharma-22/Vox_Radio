import React, { useState, useEffect } from 'react';
import { useToast } from '../hooks/use-toast';
import { Bell, MessageCircle, Phone, FileText } from 'lucide-react';

const NotificationSystem = () => {
  const { toast } = useToast();
  const [lastCheckCounts, setLastCheckCounts] = useState({
    testimonies: 0,
    phoneCalls: 0,
    whatsapp: 0
  });

  useEffect(() => {
    const checkForNewSubmissions = () => {
      // Get current counts
      const testimonies = JSON.parse(localStorage.getItem('voxRadioTestimonies') || '[]');
      const phoneCalls = JSON.parse(localStorage.getItem('voxRadioPhoneCalls') || '[]');
      const whatsappMessages = JSON.parse(localStorage.getItem('voxRadioWhatsApp') || '[]');

      const currentCounts = {
        testimonies: testimonies.length,
        phoneCalls: phoneCalls.length,
        whatsapp: whatsappMessages.length
      };

      // Check for new submissions
      if (lastCheckCounts.testimonies > 0 && currentCounts.testimonies > lastCheckCounts.testimonies) {
        const newCount = currentCounts.testimonies - lastCheckCounts.testimonies;
        toast({
          title: "New Testimony Received!",
          description: `${newCount} new testimon${newCount > 1 ? 'ies' : 'y'} submitted`,
          duration: 5000,
        });
        
        // Play notification sound (optional)
        if (window.Audio) {
          try {
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+H');
            audio.play().catch(() => {});
          } catch (e) {}
        }
      }

      if (lastCheckCounts.phoneCalls > 0 && currentCounts.phoneCalls > lastCheckCounts.phoneCalls) {
        const newCount = currentCounts.phoneCalls - lastCheckCounts.phoneCalls;
        toast({
          title: "New Phone Call Logged!",
          description: `${newCount} new phone call${newCount > 1 ? 's' : ''} recorded`,
          duration: 5000,
        });
      }

      if (lastCheckCounts.whatsapp > 0 && currentCounts.whatsapp > lastCheckCounts.whatsapp) {
        const newCount = currentCounts.whatsapp - lastCheckCounts.whatsapp;
        toast({
          title: "New WhatsApp Message!",
          description: `${newCount} new WhatsApp message${newCount > 1 ? 's' : ''} received`,
          duration: 5000,
        });
      }

      // Update last check counts
      setLastCheckCounts(currentCounts);
    };

    // Initial count setup (don't show notifications on first load)
    const testimonies = JSON.parse(localStorage.getItem('voxRadioTestimonies') || '[]');
    const phoneCalls = JSON.parse(localStorage.getItem('voxRadioPhoneCalls') || '[]');
    const whatsappMessages = JSON.parse(localStorage.getItem('voxRadioWhatsApp') || '[]');

    setLastCheckCounts({
      testimonies: testimonies.length,
      phoneCalls: phoneCalls.length,
      whatsapp: whatsappMessages.length
    });

    // Check every 5 seconds for new submissions
    const interval = setInterval(checkForNewSubmissions, 5000);

    return () => clearInterval(interval);
  }, [toast, lastCheckCounts]);

  return null; // This component doesn't render anything visible
};

export default NotificationSystem;