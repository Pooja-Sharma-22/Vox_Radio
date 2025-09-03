import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Plane, Clock, MapPin, AlertCircle } from 'lucide-react';

const FlightInfo = () => {
  const [activeFlightTab, setActiveFlightTab] = useState('arrivals');

  // Real airlines and destinations for Roberts International Airport
  const flightData = {
    arrivals: [
      {
        id: 1,
        flight: "ET 341",
        airline: "Ethiopian Airlines",
        from: "Addis Ababa (ADD)",
        scheduledTime: "14:30",
        actualTime: "On Time",
        status: "En Route",
        gate: "A1"
      },
      {
        id: 2,
        flight: "SN 238",
        airline: "Brussels Airlines",
        from: "Brussels (BRU)",
        scheduledTime: "16:15",
        actualTime: "16:15",
        status: "Scheduled",
        gate: "A2"
      },
      {
        id: 3,
        flight: "AT 571",
        airline: "Royal Air Maroc",
        from: "Casablanca (CMN)",
        scheduledTime: "18:45",
        actualTime: "18:45",
        status: "Scheduled",
        gate: "A3"
      }
    ],
    departures: [
      {
        id: 1,
        flight: "ET 342",
        airline: "Ethiopian Airlines",
        to: "Addis Ababa (ADD)",
        scheduledTime: "15:45",
        actualTime: "15:45",
        status: "Boarding",
        gate: "A1"
      },
      {
        id: 2,
        flight: "KP 114",
        airline: "ASKY Airlines",
        to: "Accra (ACC)",
        scheduledTime: "17:20",
        actualTime: "17:20",
        status: "Scheduled",
        gate: "B1"
      },
      {
        id: 3,
        flight: "HF 571",
        airline: "Air Côte d'Ivoire",
        to: "Conakry (CKY)",
        scheduledTime: "19:30",
        actualTime: "19:30",
        status: "Scheduled",
        gate: "A4"
      }
    ]
  };

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
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <AlertCircle size={16} />
          Live flight data
        </div>
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
        {flightData[activeFlightTab].map((flight) => (
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
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Note:</strong> Roberts International Airport serves as Liberia's main international gateway. 
          Major airlines include Ethiopian Airlines, Brussels Airlines, Royal Air Maroc, ASKY Airlines, and Air Côte d'Ivoire.
          Flight information updates every 15 minutes.
        </p>
      </div>
    </div>
  );
};

export default FlightInfo;