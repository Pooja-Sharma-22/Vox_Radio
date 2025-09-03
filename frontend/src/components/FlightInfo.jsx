import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Plane, Clock, MapPin } from 'lucide-react';
import { mockFlightData } from '../data/mockData';

const FlightInfo = () => {
  const [activeFlightTab, setActiveFlightTab] = useState('arrivals');

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'landed':
      case 'departed':
        return 'text-green-600 bg-green-100';
      case 'boarding':
      case 'en route':
        return 'text-orange-600 bg-orange-100';
      case 'delayed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-blue-600 bg-blue-100';
    }
  };

  return (
    <div className="p-6 border-t border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="mr-3">✈️</span>
          Flight Information - Roberts International Airport (ROB)
        </h3>
      </div>

      <div className="flex space-x-2 mb-6">
        <Button
          variant={activeFlightTab === 'arrivals' ? 'default' : 'outline'}
          onClick={() => setActiveFlightTab('arrivals')}
          className={activeFlightTab === 'arrivals' ? 'bg-orange-500 hover:bg-orange-600' : ''}
        >
          <Plane className="mr-2 rotate-180" size={16} />
          Arrivals
        </Button>
        <Button
          variant={activeFlightTab === 'departures' ? 'default' : 'outline'}
          onClick={() => setActiveFlightTab('departures')}
          className={activeFlightTab === 'departures' ? 'bg-orange-500 hover:bg-orange-600' : ''}
        >
          <Plane className="mr-2" size={16} />
          Departures
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {mockFlightData[activeFlightTab].map((flight) => (
          <Card key={flight.id} className="hover:shadow-md transition-shadow border-l-4 border-l-orange-500">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-lg">
                <span className="font-bold">{flight.flight}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(flight.status)}`}>
                  {flight.status}
                </span>
              </CardTitle>
              <p className="text-sm text-gray-600">{flight.airline}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <MapPin size={16} className="mr-2 text-gray-500" />
                  <span className="font-medium">
                    {activeFlightTab === 'arrivals' ? `From: ${flight.from}` : `To: ${flight.to}`}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock size={16} className="mr-2 text-gray-500" />
                  <span>Scheduled: {flight.scheduledTime}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock size={16} className="mr-2 text-orange-500" />
                  <span className="font-medium">Actual: {flight.actualTime}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Gate: </span>
                  <span className="font-bold text-orange-600">{flight.gate}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FlightInfo;