// Mock weather data for Liberian cities
export const mockWeatherData = [
  {
    city: "Monrovia",
    country: "Liberia",
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: "78%",
    windSpeed: "12 km/h",
    updated: "2025-01-03 06:11"
  },
  {
    city: "Gbarnga", 
    country: "Liberia",
    temperature: 26,
    condition: "Sunny",
    humidity: "65%",
    windSpeed: "8 km/h",
    updated: "2025-01-03 06:11"
  },
  {
    city: "Buchanan",
    country: "Liberia",
    temperature: 29,
    condition: "Clear",
    humidity: "82%",
    windSpeed: "15 km/h",
    updated: "2025-01-03 06:11"
  },
  {
    city: "Kakata",
    country: "Liberia",
    temperature: 27,
    condition: "Overcast",
    humidity: "71%",
    windSpeed: "10 km/h",
    updated: "2025-01-03 06:11"
  }
];

// Mock flight data for Monrovia Roberts International Airport
export const mockFlightData = {
  arrivals: [
    {
      id: 1,
      flight: "ET 588",
      airline: "Ethiopian Airlines",
      from: "Addis Ababa (ADD)",
      scheduledTime: "14:30",
      actualTime: "14:25",
      status: "Landed",
      gate: "A2"
    },
    {
      id: 2,
      flight: "AF 718",
      airline: "Air France",
      from: "Paris (CDG)",
      scheduledTime: "16:45",
      actualTime: "On Time",
      status: "En Route",
      gate: "B1"
    },
    {
      id: 3,
      flight: "DL 157",
      airline: "Delta Airlines", 
      from: "New York (JFK)",
      scheduledTime: "18:20",
      actualTime: "18:20",
      status: "Scheduled",
      gate: "A3"
    }
  ],
  departures: [
    {
      id: 1,
      flight: "ET 589",
      airline: "Ethiopian Airlines",
      to: "Addis Ababa (ADD)",
      scheduledTime: "15:45",
      actualTime: "15:40",
      status: "Departed",
      gate: "A2"
    },
    {
      id: 2,
      flight: "AF 719",
      airline: "Air France",
      to: "Paris (CDG)",
      scheduledTime: "17:30",
      actualTime: "On Time",
      status: "Boarding",
      gate: "B1"
    },
    {
      id: 3,
      flight: "WN 254",
      airline: "West African Airlines",
      to: "Accra (ACC)",
      scheduledTime: "19:15",
      actualTime: "19:15",
      status: "Scheduled",
      gate: "A1"
    }
  ]
};

// Mock testimonies data
export const mockTestimonies = [
  {
    id: 1,
    name: "Mary Johnson",
    phone: "0777123456",
    message: "Vox Radio has been such a blessing to our community. Thank you for the wonderful programs!",
    date: "2025-01-03",
    time: "08:30",
    approved: true,
    category: "General Praise"
  },
  {
    id: 2,
    name: "Samuel Roberts", 
    phone: "0777654321",
    message: "I love the morning show and the inspirational music. Keep up the great work!",
    date: "2025-01-02",
    time: "15:45",
    approved: false,
    category: "Program Feedback"
  },
  {
    id: 3,
    name: "Grace Williams",
    phone: "0777987654",
    message: "Please pray for my family. We are going through difficult times.",
    date: "2025-01-02",
    time: "12:20",
    approved: true,
    category: "Prayer Request"
  }
];

// Mock phone calls data
export const mockPhoneCalls = [
  {
    id: 1,
    caller: "Anonymous Listener",
    phone: "0777***234",
    topic: "Prayer Request - Family Issues",
    duration: "5:30",
    notes: "Caller requested prayer for sick family member",
    presenter: "John Smith",
    timestamp: "2025-01-03 08:15",
    followUpRequired: true
  },
  {
    id: 2,
    caller: "Mike Davis",
    phone: "0777***567", 
    topic: "Song Request - Gospel Music",
    duration: "2:45",
    notes: "Requested 'Amazing Grace' for birthday celebration",
    presenter: "Sarah Wilson",
    timestamp: "2025-01-03 07:30",
    followUpRequired: false
  },
  {
    id: 3,
    caller: "Alice Cooper",
    phone: "0777***890",
    topic: "Program Suggestion",
    duration: "4:15",
    notes: "Suggested weekly health program for community",
    presenter: "John Smith", 
    timestamp: "2025-01-02 16:45",
    followUpRequired: true
  }
];

// Mock WhatsApp data
export const mockWhatsAppData = {
  number: "0777975975",
  todayMessages: 23,
  weekMessages: 156,
  monthMessages: 642,
  recentMessages: [
    {
      id: 1,
      sender: "Mary K.",
      message: "Good morning! Please play some gospel music.",
      time: "08:45",
      replied: true
    },
    {
      id: 2,
      sender: "Samuel R.",
      message: "Thank you for yesterday's program about health.",
      time: "08:30",
      replied: false
    },
    {
      id: 3,
      sender: "Grace W.",
      message: "Can you announce our church event this Sunday?",
      time: "08:15",
      replied: true
    }
  ],
  lastUpdate: "2025-01-03 08:50"
};