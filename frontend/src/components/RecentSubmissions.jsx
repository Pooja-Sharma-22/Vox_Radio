import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { CheckCircle, XCircle, Clock, Search, Filter, Eye, Trash2, MessageSquare, Phone } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const RecentSubmissions = () => {
  const { toast } = useToast();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [allSubmissions, setAllSubmissions] = useState([]);

  // Load submissions from localStorage
  useEffect(() => {
    const loadSubmissions = () => {
      const testimonies = JSON.parse(localStorage.getItem('voxRadioTestimonies') || '[]');
      const phoneCalls = JSON.parse(localStorage.getItem('voxRadioPhoneCalls') || '[]');
      const whatsappMessages = JSON.parse(localStorage.getItem('voxRadioWhatsApp') || '[]');

      // Combine all submissions with proper structure
      const combined = [
        ...testimonies.map(t => ({ 
          ...t, 
          type: 'testimony', 
          icon: MessageSquare,
          name: t.name || 'Unknown',
          content: t.message || '',
          date: t.timestamp || new Date().toLocaleString(),
          approved: t.approved !== undefined ? t.approved : false
        })),
        ...phoneCalls.map(c => ({ 
          ...c, 
          type: 'phone_call', 
          icon: Phone, 
          name: c.caller || 'Unknown Caller',
          content: c.notes || c.topic || '',
          date: c.timestamp || new Date().toLocaleString(),
          approved: true // Phone calls are automatically approved
        })),
        ...whatsappMessages.map(w => ({ 
          ...w, 
          type: 'whatsapp', 
          icon: MessageSquare,
          name: w.sender || w.name || 'WhatsApp User',
          content: w.message || '',
          date: w.time || w.timestamp || new Date().toLocaleString(),
          approved: w.replied || false
        }))
      ];

      // Sort by date (newest first)
      combined.sort((a, b) => new Date(b.date) - new Date(a.date));
      setAllSubmissions(combined);
    };

    loadSubmissions();
    
    // Set up interval to refresh data every 10 seconds
    const interval = setInterval(loadSubmissions, 10000);
    return () => clearInterval(interval);
  }, []);

  const filteredSubmissions = allSubmissions.filter(submission => {
    const matchesSearch = searchTerm === '' || 
      submission.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.topic?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === 'all' || submission.type === selectedType;
    
    const matchesStatus = filter === 'all' || 
      (filter === 'approved' && submission.approved) ||
      (filter === 'pending' && !submission.approved);

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleApprove = (id, type) => {
    if (type === 'testimony') {
      const testimonies = JSON.parse(localStorage.getItem('voxRadioTestimonies') || '[]');
      const updated = testimonies.map(t => t.id === id ? { ...t, approved: true } : t);
      localStorage.setItem('voxRadioTestimonies', JSON.stringify(updated));
    } else if (type === 'whatsapp') {
      const messages = JSON.parse(localStorage.getItem('voxRadioWhatsApp') || '[]');
      const updated = messages.map(m => m.id === id ? { ...m, replied: true } : m);
      localStorage.setItem('voxRadioWhatsApp', JSON.stringify(updated));
    }
    
    // Refresh submissions
    const loadSubmissions = () => {
      const testimonies = JSON.parse(localStorage.getItem('voxRadioTestimonies') || '[]');
      const phoneCalls = JSON.parse(localStorage.getItem('voxRadioPhoneCalls') || '[]');
      const whatsappMessages = JSON.parse(localStorage.getItem('voxRadioWhatsApp') || '[]');

      const combined = [
        ...testimonies.map(t => ({ ...t, type: 'testimony', icon: MessageSquare, name: t.name || 'Unknown', content: t.message || '', date: t.timestamp || new Date().toLocaleString(), approved: t.approved !== undefined ? t.approved : false })),
        ...phoneCalls.map(c => ({ ...c, type: 'phone_call', icon: Phone, name: c.caller || 'Unknown Caller', content: c.notes || c.topic || '', date: c.timestamp || new Date().toLocaleString(), approved: true })),
        ...whatsappMessages.map(w => ({ ...w, type: 'whatsapp', icon: MessageSquare, name: w.sender || w.name || 'WhatsApp User', content: w.message || '', date: w.time || w.timestamp || new Date().toLocaleString(), approved: w.replied || false }))
      ];

      combined.sort((a, b) => new Date(b.date) - new Date(a.date));
      setAllSubmissions(combined);
    };
    
    loadSubmissions();
    
    toast({
      title: "Approved Successfully",
      description: `${type.replace('_', ' ')} has been approved.`,
    });
  };

  const handleReject = (id, type) => {
    if (type === 'testimony') {
      const testimonies = JSON.parse(localStorage.getItem('voxRadioTestimonies') || '[]');
      const updated = testimonies.filter(t => t.id !== id);
      localStorage.setItem('voxRadioTestimonies', JSON.stringify(updated));
    } else if (type === 'whatsapp') {
      const messages = JSON.parse(localStorage.getItem('voxRadioWhatsApp') || '[]');
      const updated = messages.filter(m => m.id !== id);
      localStorage.setItem('voxRadioWhatsApp', JSON.stringify(updated));
    }
    
    // Refresh submissions
    setAllSubmissions(prev => prev.filter(s => s.id !== id));
    
    toast({
      title: "Rejected Successfully",
      description: `${type.replace('_', ' ')} has been removed.`,
    });
  };

  const handleView = (submission) => {
    const details = `
Type: ${submission.type.replace('_', ' ').toUpperCase()}
Name: ${submission.name}
Date: ${submission.date}
Content: ${submission.content}
${submission.phone ? `Phone: ${submission.phone}` : ''}
${submission.category ? `Category: ${submission.category}` : ''}
${submission.presenter ? `Presenter: ${submission.presenter}` : ''}
${submission.followUpRequired ? 'Follow-up Required: Yes' : ''}
    `.trim();
    
    alert(details);
  };

  const getStatusBadge = (submission) => {
    if (submission.type === 'phone_call') {
      return <Badge className="bg-blue-100 text-blue-800">Logged</Badge>;
    }
    if (submission.approved) {
      return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
    }
    return <Badge className="bg-orange-100 text-orange-800">Pending</Badge>;
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 'testimony': return 'Testimony';
      case 'phone_call': return 'Phone Call';
      case 'whatsapp': return 'WhatsApp';
      default: return type;
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="mr-3">📋</span>
          Recent Submissions
        </h3>
        <div className="text-sm text-gray-600">
          Total: {filteredSubmissions.length} submissions
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Search size={16} className="text-gray-500" />
              <Input
                placeholder="Search submissions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-gray-500" />
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="testimony">Testimonies</SelectItem>
                  <SelectItem value="phone_call">Phone Calls</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submissions List */}
      <div className="space-y-4">
        {filteredSubmissions.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions yet</h3>
                <p className="text-gray-500 mb-6 max-w-md">
                  Testimonies, phone calls, and WhatsApp messages will appear here once they start coming in.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <MessageSquare size={16} />
                    <span>Testimonies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} />
                    <span>Phone Calls</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare size={16} />
                    <span>WhatsApp Messages</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredSubmissions.map((submission, index) => {
            const IconComponent = submission.icon;
            return (
              <Card key={`${submission.type}-${submission.id || index}`} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <IconComponent size={20} className="text-orange-600" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900">
                            {submission.name}
                          </span>
                          {getStatusBadge(submission)}
                          <span className="text-xs text-gray-500">
                            {getTypeLabel(submission.type)}
                          </span>
                        </div>
                        
                        {submission.phone && (
                          <p className="text-sm text-gray-600 mb-1">📞 {submission.phone}</p>
                        )}
                        
                        {submission.category && (
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full mr-2">
                            {submission.category}
                          </span>
                        )}
                        
                        <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                          {submission.content}
                        </p>
                        
                        <p className="text-xs text-gray-500 mt-2">
                          {submission.date}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleView(submission)}
                      >
                        <Eye size={14} />
                      </Button>
                      
                      {!submission.approved && submission.type !== 'phone_call' && (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-500 hover:bg-green-600 text-white"
                            onClick={() => handleApprove(submission.id, submission.type)}
                          >
                            <CheckCircle size={14} />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReject(submission.id, submission.type)}
                          >
                            <XCircle size={14} />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RecentSubmissions;