import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { CheckCircle, XCircle, Clock, Search, Filter, Eye, Trash2, MessageSquare, Phone } from 'lucide-react';
import { mockTestimonies, mockPhoneCalls, mockWhatsAppData } from '../data/mockData';

const RecentSubmissions = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  // Empty submissions - to be populated with real data
  const allSubmissions = [];

  const filteredSubmissions = allSubmissions.filter(submission => {
    const matchesSearch = searchTerm === '' || 
      submission.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.caller?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.sender?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.topic?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === 'all' || submission.type === selectedType;
    
    const matchesStatus = filter === 'all' || 
      (filter === 'approved' && submission.approved) ||
      (filter === 'pending' && !submission.approved);

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleApprove = (id, type) => {
    console.log(`Approving ${type} with id ${id}`);
    alert(`${type} approved successfully!`);
  };

  const handleReject = (id, type) => {
    console.log(`Rejecting ${type} with id ${id}`);
    alert(`${type} rejected successfully!`);
  };

  const handleView = (submission) => {
    console.log('Viewing submission:', submission);
    alert(`Viewing ${submission.type}: ${submission.message || submission.topic}`);
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

  const getSubmissionName = (submission) => {
    return submission.name || submission.caller || submission.sender || 'Unknown';
  };

  const getSubmissionContent = (submission) => {
    return submission.message || submission.topic || submission.notes || 'No content';
  };

  const getSubmissionDate = (submission) => {
    return submission.date || submission.timestamp || submission.time || 'Unknown date';
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
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No submissions found matching your criteria.</p>
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
                            {getSubmissionName(submission)}
                          </span>
                          {getStatusBadge(submission)}
                          <span className="text-xs text-gray-500 capitalize">
                            {submission.type.replace('_', ' ')}
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
                          {getSubmissionContent(submission)}
                        </p>
                        
                        <p className="text-xs text-gray-500 mt-2">
                          {getSubmissionDate(submission)}
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