import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MessageCircle, 
  Phone, 
  Heart,
  Target,
  Lightbulb,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const AIAnalytics = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedTool, setSelectedTool] = useState('overview');

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  };

  const stationMetrics = {
    totalListeners: 15420,
    weeklyGrowth: 12.5,
    testimonies: 156,
    phoneCalls: 89,
    whatsappMessages: 642,
    engagementRate: 8.7,
    peakListeningHours: "7-9 AM, 6-8 PM",
    topPrograms: ["Morning Devotion", "Community Hour", "Evening Praise"]
  };

  const aiInsights = [
    {
      type: "opportunity",
      title: "Peak Engagement Window",
      description: "Your audience is most active between 7-9 AM. Consider adding interactive segments during this time.",
      priority: "high",
      impact: "Potential 25% increase in listener engagement"
    },
    {
      type: "warning",
      title: "Testimony Response Time",
      description: "Average response time to testimonies is 4.2 hours. Faster responses could improve community connection.",
      priority: "medium",
      impact: "Could increase testimony submissions by 15%"
    },
    {
      type: "success",
      title: "WhatsApp Integration Success",
      description: "WhatsApp messages have increased 45% since implementation. Excellent community engagement.",
      priority: "low",
      impact: "Continue current strategy"
    }
  ];

  const improvementSuggestions = [
    {
      category: "Content Strategy",
      suggestions: [
        "Add more interactive call-in segments during peak hours",
        "Create a weekly community spotlight program",
        "Implement listener polls via WhatsApp"
      ]
    },
    {
      category: "Technical Improvements",
      suggestions: [
        "Set up automated WhatsApp responses for common queries",
        "Create a mobile app for easier listening access",
        "Implement live streaming with chat functionality"
      ]
    },
    {
      category: "Community Engagement",
      suggestions: [
        "Host monthly community events",
        "Create a listener rewards program",
        "Partner with local businesses for sponsorships"
      ]
    }
  ];

  const freeAITools = [
    {
      name: "Google Analytics",
      description: "Track website and digital engagement metrics",
      category: "Analytics",
      url: process.env.REACT_APP_ANALYTICS_URL || "https://analytics.google.com",
      useCase: "Monitor online listener behavior and trends"
    },
    {
      name: "Hootsuite (Free Plan)",
      description: "Social media management and analytics",
      category: "Social Media",
      url: "https://hootsuite.com",
      useCase: "Schedule posts and track social media engagement"
    },
    {
      name: "Canva",
      description: "AI-powered design tool for promotional materials",
      category: "Design",
      url: "https://canva.com",
      useCase: "Create professional graphics for social media and promotions"
    },
    {
      name: "ChatGPT (Free)",
      description: "AI assistant for content creation and analysis",
      category: "Content",
      url: "https://chat.openai.com",
      useCase: "Generate program ideas, analyze feedback, create scripts"
    },
    {
      name: "Google Trends",
      description: "Discover trending topics in your region",
      category: "Research",
      url: "https://trends.google.com",
      useCase: "Identify popular topics to cover in your programs"
    },
    {
      name: "SurveyMonkey (Free)",
      description: "Create listener surveys and polls",
      category: "Feedback",
      url: "https://surveymonkey.com",
      useCase: "Gather detailed listener feedback and preferences"
    }
  ];

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInsightIcon = (type) => {
    switch(type) {
      case 'opportunity': return <Target className="text-blue-500" size={20} />;
      case 'warning': return <AlertCircle className="text-orange-500" size={20} />;
      case 'success': return <CheckCircle className="text-green-500" size={20} />;
      default: return <Lightbulb className="text-gray-500" size={20} />;
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="mr-3">🤖</span>
          AI-Powered Station Analytics
        </h3>
        <Button 
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
        >
          <RefreshCw size={16} className={isAnalyzing ? 'animate-spin' : ''} />
          {isAnalyzing ? 'Analyzing...' : 'Refresh Analysis'}
        </Button>
      </div>

      {/* Station Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Listeners</p>
                <p className="text-2xl font-bold text-blue-600">{stationMetrics.totalListeners.toLocaleString()}</p>
              </div>
              <Users className="text-blue-500" size={32} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Weekly Growth</p>
                <p className="text-2xl font-bold text-green-600">+{stationMetrics.weeklyGrowth}%</p>
              </div>
              <TrendingUp className="text-green-500" size={32} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Engagement Rate</p>
                <p className="text-2xl font-bold text-purple-600">{stationMetrics.engagementRate}%</p>
              </div>
              <Heart className="text-purple-500" size={32} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Interactions</p>
                <p className="text-2xl font-bold text-orange-600">{stationMetrics.testimonies + stationMetrics.phoneCalls + stationMetrics.whatsappMessages}</p>
              </div>
              <MessageCircle className="text-orange-500" size={32} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="text-yellow-500" />
            AI-Generated Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-3">
                  {getInsightIcon(insight.type)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                      <Badge className={getPriorityColor(insight.priority)}>
                        {insight.priority} priority
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-2">{insight.description}</p>
                    <p className="text-sm text-blue-600 font-medium">{insight.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Improvement Suggestions */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="text-green-500" />
            AI-Generated Improvement Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {improvementSuggestions.map((category, index) => (
              <div key={index} className="space-y-3">
                <h4 className="font-semibold text-gray-900 pb-2 border-b border-orange-200">
                  {category.category}
                </h4>
                <ul className="space-y-2">
                  {category.suggestions.map((suggestion, suggestionIndex) => (
                    <li key={suggestionIndex} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Free AI Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="text-blue-500" />
            Free AI Tools for Station Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {freeAITools.map((tool, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{tool.name}</h4>
                  <Badge variant="outline">{tool.category}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{tool.description}</p>
                <p className="text-sm text-blue-600 mb-3 font-medium">
                  Use case: {tool.useCase}
                </p>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => window.open(tool.url, '_blank')}
                  className="w-full flex items-center gap-2"
                >
                  <ExternalLink size={14} />
                  Try {tool.name}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAnalytics;