// All Liberian cities for weather rotation (rotates every 15 minutes) - All temperatures in Fahrenheit
export const allLiberianCities = [
  // Set 1 - Major Cities
  [
    {
      city: "Monrovia",
      country: "Liberia",
      temperature: 82, // Changed from 28°C to 82°F
      condition: "Partly Cloudy",
      humidity: "78%",
      windSpeed: "7.5 mph", // Changed from km/h to mph
      updated: new Date().toLocaleString()
    },
    {
      city: "Gbarnga", 
      country: "Liberia",
      temperature: 79, // Changed from 26°C to 79°F
      condition: "Sunny",
      humidity: "65%",
      windSpeed: "5 mph",
      updated: new Date().toLocaleString()
    },
    {
      city: "Buchanan",
      country: "Liberia",
      temperature: 84, // Changed from 29°C to 84°F
      condition: "Clear",
      humidity: "82%",
      windSpeed: "9 mph",
      updated: new Date().toLocaleString()
    },
    {
      city: "Kakata",
      country: "Liberia",
      temperature: 81, // Changed from 27°C to 81°F
      condition: "Overcast",
      humidity: "71%",
      windSpeed: "6 mph",
      updated: new Date().toLocaleString()
    }
  ],
  // Set 2 - Coastal Cities
  [
    {
      city: "Harper",
      country: "Liberia",
      temperature: 86, // Changed from 30°C to 86°F
      condition: "Sunny",
      humidity: "85%",
      windSpeed: "11 mph", // Changed from 18 km/h to mph
      updated: new Date().toLocaleString()
    },
    {
      city: "Greenville",
      country: "Liberia",
      temperature: 84, // Changed from 29°C to 84°F
      condition: "Partly Cloudy",
      humidity: "80%",
      windSpeed: "10 mph", // Changed from 16 km/h to mph
      updated: new Date().toLocaleString()
    },
    {
      city: "Grand Bassa",
      country: "Liberia",
      temperature: 82, // Changed from 28°C to 82°F
      condition: "Clear",
      humidity: "77%",
      windSpeed: "9 mph", // Changed from 14 km/h to mph
      updated: new Date().toLocaleString()
    },
    {
      city: "River Cess",
      country: "Liberia",
      temperature: 81, // Changed from 27°C to 81°F
      condition: "Light Rain",
      humidity: "88%",
      windSpeed: "7 mph", // Changed from 11 km/h to mph
      updated: new Date().toLocaleString()
    }
  ],
  // Set 3 - Northern Cities
  [
    {
      city: "Voinjama",
      country: "Liberia",
      temperature: 77, // Changed from 25°C to 77°F
      condition: "Overcast",
      humidity: "72%",
      windSpeed: "6 mph", // Changed from 9 km/h to mph
      updated: new Date().toLocaleString()
    },
    {
      city: "Kolahun",
      country: "Liberia",
      temperature: 75, // Changed from 24°C to 75°F
      condition: "Foggy",
      humidity: "90%",
      windSpeed: "4 mph", // Changed from 6 km/h to mph
      updated: new Date().toLocaleString()
    },
    {
      city: "Foya",
      country: "Liberia",
      temperature: 79, // Changed from 26°C to 79°F
      condition: "Partly Cloudy",
      humidity: "68%",
      windSpeed: "6 mph", // Changed from 10 km/h to mph
      updated: new Date().toLocaleString()
    },
    {
      city: "Zorzor",
      country: "Liberia",
      temperature: 73, // Changed from 23°C to 73°F
      condition: "Cool",
      humidity: "75%",
      windSpeed: "4 mph", // Changed from 7 km/h to mph
      updated: new Date().toLocaleString()
    }
  ],
  // Set 4 - Central/Eastern Cities
  [
    {
      city: "Zwedru",
      country: "Liberia",
      temperature: 81, // Changed from 27°C to 81°F
      condition: "Thunderstorms",
      humidity: "92%",
      windSpeed: "8 mph", // Changed from 13 km/h to mph
      updated: new Date().toLocaleString()
    },
    {
      city: "Pleebo",
      country: "Liberia",
      temperature: 84, // Changed from 29°C to 84°F
      condition: "Humid",
      humidity: "87%",
      windSpeed: "9 mph", // Changed from 15 km/h to mph
      updated: new Date().toLocaleString()
    },
    {
      city: "Tubmanburg",
      country: "Liberia",
      temperature: 79, // Changed from 26°C to 79°F
      condition: "Partly Cloudy",
      humidity: "73%",
      windSpeed: "7 mph", // Changed from 11 km/h to mph
      updated: new Date().toLocaleString()
    },
    {
      city: "Robertsport",
      country: "Liberia",
      temperature: 82, // Changed from 28°C to 82°F
      condition: "Windy",
      humidity: "79%",
      windSpeed: "12 mph", // Changed from 20 km/h to mph
      updated: new Date().toLocaleString()
    }
  ],
  // Set 5 - Mining/Rural Areas
  [
    {
      city: "Yekepa",
      country: "Liberia",
      temperature: 75, // Changed from 24°C to 75°F
      condition: "Cool",
      humidity: "70%",
      windSpeed: "5 mph", // Changed from 8 km/h to mph
      updated: new Date().toLocaleString()
    },
    {
      city: "Bong Mines",
      country: "Liberia",
      temperature: 77, // Changed from 25°C to 77°F
      condition: "Misty",
      humidity: "83%",
      windSpeed: "6 mph", // Changed from 9 km/h to mph
      updated: new Date().toLocaleString()
    },
    {
      city: "Harbel",
      country: "Liberia",
      temperature: 82, // Changed from 28°C to 82°F
      condition: "Warm",
      humidity: "76%",
      windSpeed: "7 mph", // Changed from 12 km/h to mph
      updated: new Date().toLocaleString()
    },
    {
      city: "Bomi Hills",
      country: "Liberia",
      temperature: 79, // Changed from 26°C to 79°F
      condition: "Overcast",
      humidity: "74%",
      windSpeed: "6 mph", // Changed from 10 km/h to mph
      updated: new Date().toLocaleString()
    }
  ]
];

// Function to get current weather data set based on 15-minute rotation
export const getCurrentWeatherData = () => {
  const now = new Date();
  const minutes = now.getMinutes();
  const rotationIndex = Math.floor(minutes / 15); // Changes every 15 minutes (0, 1, 2, 3)
  const setIndex = rotationIndex % allLiberianCities.length;
  return allLiberianCities[setIndex];
};

// Legacy export for backward compatibility
export const mockWeatherData = getCurrentWeatherData();

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