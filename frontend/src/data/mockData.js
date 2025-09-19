// All Liberian cities for weather rotation (rotates every 15 minutes) - All temperatures in Fahrenheit
// Create timestamp in Liberia time (Africa/Monrovia, UTC+0)
const createLiberiaTimestamp = () => {
  const now = new Date();
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Monrovia',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(now) + ' GMT';
};

const weatherTimestamp = createLiberiaTimestamp();

// Rain prediction data for Liberian regions
const generateRainPrediction = () => {
  const rainConditions = [
    { condition: "Heavy Rain", probability: 85, intensity: "Heavy", duration: "2-4 hours" },
    { condition: "Light Rain", probability: 70, intensity: "Light", duration: "1-2 hours" },
    { condition: "Thunderstorms", probability: 75, intensity: "Heavy", duration: "1-3 hours" },
    { condition: "Drizzle", probability: 60, intensity: "Light", duration: "30min-1hour" },
    { condition: "Rain Showers", probability: 80, intensity: "Moderate", duration: "1-2 hours" },
    { condition: "Scattered Showers", probability: 65, intensity: "Light", duration: "15-45 minutes" }
  ];
  
  return rainConditions[Math.floor(Math.random() * rainConditions.length)];
};

export const allLiberianCities = [
  // Set 1 - Major Cities & Greater Monrovia Area
  [
    {
      city: "Monrovia",
      country: "Liberia",
      temperature: 82, // Changed from 28°C to 82°F
      condition: "Partly Cloudy",
      humidity: "78%",
      windSpeed: "7.5 mph", // Changed from km/h to mph
      updated: weatherTimestamp,
      rainPrediction: {
        probability: 75,
        nextRainIn: "2 hours",
        intensity: "Moderate",
        duration: "1-2 hours"
      }
    },
    {
      city: "Gbarnga", 
      country: "Liberia",
      temperature: 79, // Changed from 26°C to 79°F
      condition: "Sunny",
      humidity: "65%",
      windSpeed: "5 mph",
      updated: weatherTimestamp,
      rainPrediction: {
        probability: 60,
        nextRainIn: "4 hours",
        intensity: "Light",
        duration: "30min-1hour"
      }
    },
    {
      city: "Bensonville",
      country: "Liberia",
      temperature: 83,
      condition: "Partly Cloudy",
      humidity: "76%",
      windSpeed: "8 mph",
      updated: weatherTimestamp,
      rainPrediction: {
        probability: 70,
        nextRainIn: "2.5 hours",
        intensity: "Moderate",
        duration: "1-2 hours"
      }
    },
    {
      city: "Caldwell",
      country: "Liberia",
      temperature: 84,
      condition: "Warm",
      humidity: "79%",
      windSpeed: "7 mph",
      updated: weatherTimestamp,
      rainPrediction: {
        probability: 65,
        nextRainIn: "3 hours",
        intensity: "Light",
        duration: "1-2 hours"
      }
    },
    {
      city: "Kakata",
      country: "Liberia",
      temperature: 81,
      condition: "Overcast",
      humidity: "71%",
      windSpeed: "6 mph",
      updated: weatherTimestamp,
      rainPrediction: {
        probability: 90,
        nextRainIn: "30 minutes",
        intensity: "Heavy",
        duration: "2-4 hours"
      }
    },
    {
      city: "Harbel",
      country: "Liberia",
      temperature: 82,
      condition: "Warm",
      humidity: "76%",
      windSpeed: "7 mph",
      updated: weatherTimestamp,
      rainPrediction: {
        probability: 65,
        nextRainIn: "3.5 hours",
        intensity: "Light",
        duration: "1-2 hours"
      }
    },
    {
      city: "Careysburg",
      country: "Liberia",
      temperature: 83,
      condition: "Warm",
      humidity: "77%",
      windSpeed: "7 mph",
      updated: weatherTimestamp,
      rainPrediction: {
        probability: 65,
        nextRainIn: "3 hours",
        intensity: "Moderate",
        duration: "1-2 hours"
      }
    },
    {
      city: "Marshall",
      country: "Liberia",
      temperature: 85,
      condition: "Sunny",
      humidity: "74%",
      windSpeed: "8 mph",
      updated: weatherTimestamp,
      rainPrediction: {
        probability: 55,
        nextRainIn: "5 hours",
        intensity: "Light",
        duration: "1 hour"
      }
    }
  ],
  // Set 2 - Coastal Cities & Grand Bassa
  [
    {
      city: "Buchanan",
      country: "Liberia",
      temperature: 84, // Changed from 29°C to 84°F
      condition: "Clear",
      humidity: "82%",
      windSpeed: "9 mph",
      updated: weatherTimestamp,
      rainPrediction: {
        probability: 85,
        nextRainIn: "1 hour",
        intensity: "Heavy",
        duration: "2-3 hours"
      }
    },
    {
      city: "Harper",
      country: "Liberia",
      temperature: 86, // Changed from 30°C to 86°F
      condition: "Sunny",
      humidity: "85%",
      windSpeed: "11 mph", // Changed from 18 km/h to mph
      updated: weatherTimestamp,
      rainPrediction: {
        probability: 70,
        nextRainIn: "3 hours",
        intensity: "Moderate",
        duration: "1-2 hours"
      }
    },
    {
      city: "Greenville",
      country: "Liberia",
      temperature: 84, // Changed from 29°C to 84°F
      condition: "Partly Cloudy",
      humidity: "80%",
      windSpeed: "10 mph", // Changed from 16 km/h to mph
      updated: weatherTimestamp,
      rainPrediction: {
        probability: 80,
        nextRainIn: "1.5 hours",
        intensity: "Heavy",
        duration: "2-3 hours"
      }
    },
    {
      city: "Barclayville",
      country: "Liberia",
      temperature: 85,
      condition: "Humid",
      humidity: "87%",
      windSpeed: "9 mph",
      updated: weatherTimestamp,
      rainPrediction: {
        probability: 75,
        nextRainIn: "2 hours",
        intensity: "Moderate",
        duration: "2-3 hours"
      }
    },
    {
      city: "Grand Bassa",
      country: "Liberia",
      temperature: 82,
      condition: "Clear",
      humidity: "77%",
      windSpeed: "9 mph",
      updated: weatherTimestamp,
      rainPrediction: {
        probability: 65,
        nextRainIn: "5 hours",
        intensity: "Moderate",
        duration: "1-2 hours"
      }
    },
    {
      city: "River Cess",
      country: "Liberia",
      temperature: 81,
      condition: "Light Rain",
      humidity: "88%",
      windSpeed: "7 mph",
      updated: weatherTimestamp,
      rainPrediction: {
        probability: 95,
        nextRainIn: "Currently raining",
        intensity: "Light",
        duration: "Ongoing (1-2 more hours)"
      }
    }
  ],
  // Set 3 - Northern Cities & Nimba
  [
    {
      city: "Voinjama",
      country: "Liberia",
      temperature: 77, // Changed from 25°C to 77°F
      condition: "Overcast",
      humidity: "72%",
      windSpeed: "6 mph", // Changed from 9 km/h to mph
      updated: weatherTimestamp,
      rainPrediction: {
        probability: 85,
        nextRainIn: "1 hour",
        intensity: "Heavy",
        duration: "3-4 hours"
      }
    },
    {
      city: "Ganta",
      country: "Liberia",
      temperature: 78,
      condition: "Cool",
      humidity: "70%",
      windSpeed: "5 mph",
      updated: weatherTimestamp,
      rainPrediction: {
        probability: 60,
        nextRainIn: "4 hours",
        intensity: "Light",
        duration: "1-2 hours"
      }
    },
    {
      city: "Sanniquellie",
      country: "Liberia",
      temperature: 76,
      condition: "Misty",
      humidity: "81%",
      windSpeed: "4 mph",
      updated: weatherTimestamp,
      rainPrediction: {
        probability: 80,
        nextRainIn: "1.5 hours",
        intensity: "Moderate",
        duration: "2-3 hours"
      }
    },
    {
      city: "Kolahun",
      country: "Liberia",
      temperature: 75, // Changed from 24°C to 75°F
      condition: "Foggy",
      humidity: "90%",
      windSpeed: "4 mph", // Changed from 6 km/h to mph
      updated: weatherTimestamp,
      rainPrediction: {
        probability: 75,
        nextRainIn: "2 hours",
        intensity: "Moderate",
        duration: "2-3 hours"
      }
    },
    {
      city: "Foya",
      country: "Liberia",
      temperature: 79,
      condition: "Partly Cloudy",
      humidity: "68%",
      windSpeed: "6 mph",
      updated: weatherTimestamp,
      rainPrediction: {
        probability: 55,
        nextRainIn: "6 hours",
        intensity: "Light",
        duration: "1 hour"
      }
    },
    {
      city: "Zorzor",
      country: "Liberia",
      temperature: 73,
      condition: "Cool",
      humidity: "75%",
      windSpeed: "4 mph",
      updated: weatherTimestamp,
      rainPrediction: {
        probability: 70,
        nextRainIn: "3 hours",
        intensity: "Light",
        duration: "1-2 hours"
      }
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
      updated: weatherTimestamp,
      rainPrediction: {
        probability: 95,
        nextRainIn: "Currently storming",
        intensity: "Heavy",
        duration: "Ongoing (2-3 more hours)"
      }
    },
    {
      city: "Robertsport",
      country: "Liberia",
      temperature: 82, // Changed from 28°C to 82°F
      condition: "Windy",
      humidity: "79%",
      windSpeed: "12 mph", // Changed from 20 km/h to mph
      updated: weatherTimestamp,
      rainPrediction: {
        probability: 70,
        nextRainIn: "2.5 hours",
        intensity: "Moderate",
        duration: "1-3 hours"
      }
    },
    {
      city: "Bopolu",
      country: "Liberia",
      temperature: 80,
      condition: "Overcast",
      humidity: "74%",
      windSpeed: "6 mph",
      updated: weatherTimestamp,
      rainPrediction: {
        probability: 85,
        nextRainIn: "1 hour",
        intensity: "Heavy",
        duration: "2-4 hours"
      }
    },
    {
      city: "Tubmanburg",
      country: "Liberia",
      temperature: 79, // Changed from 26°C to 79°F
      condition: "Partly Cloudy",
      humidity: "73%",
      windSpeed: "7 mph", // Changed from 11 km/h to mph
      updated: weatherTimestamp,
      rainPrediction: {
        probability: 65,
        nextRainIn: "4 hours",
        intensity: "Moderate",
        duration: "1-2 hours"
      }
    },
    {
      city: "Pleebo",
      country: "Liberia",
      temperature: 84,
      condition: "Humid",
      humidity: "87%",
      windSpeed: "9 mph",
      updated: weatherTimestamp,
      rainPrediction: {
        probability: 80,
        nextRainIn: "1.5 hours",
        intensity: "Heavy",
        duration: "2-4 hours"
      }
    },
    {
      city: "Fish Town",
      country: "Liberia",
      temperature: 85,
      condition: "Coastal Breeze",
      humidity: "84%",
      windSpeed: "11 mph",
      updated: weatherTimestamp,
      rainPrediction: {
        probability: 60,
        nextRainIn: "4 hours",
        intensity: "Moderate",
        duration: "1-2 hours"
      }
    }
  ],
  // Set 5 - Mining Areas & Rural Counties
  [
    {
      city: "Kakata",
      country: "Liberia",
      temperature: 81, // Changed from 27°C to 81°F
      condition: "Overcast",
      humidity: "71%",
      windSpeed: "6 mph",
      updated: weatherTimestamp,
      rainPrediction: {
        probability: 90,
        nextRainIn: "30 minutes",
        intensity: "Heavy",
        duration: "2-4 hours"
      }
    },
    {
      city: "Yekepa",
      country: "Liberia",
      temperature: 75, // Changed from 24°C to 75°F
      condition: "Cool",
      humidity: "70%",
      windSpeed: "5 mph", // Changed from 8 km/h to mph
      updated: weatherTimestamp,
      rainPrediction: {
        probability: 60,
        nextRainIn: "5 hours",
        intensity: "Light",
        duration: "1 hour"
      }
    },
    {
      city: "Careysburg",
      country: "Liberia",
      temperature: 83,
      condition: "Warm",
      humidity: "77%",
      windSpeed: "7 mph",
      updated: weatherTimestamp,
      rainPrediction: {
        probability: 65,
        nextRainIn: "3 hours",
        intensity: "Moderate",
        duration: "1-2 hours"
      }
    },
    {
      city: "Harbel",
      country: "Liberia",
      temperature: 82, // Changed from 28°C to 82°F
      condition: "Warm",
      humidity: "76%",
      windSpeed: "7 mph", // Changed from 12 km/h to mph
      updated: weatherTimestamp,
      rainPrediction: {
        probability: 65,
        nextRainIn: "3.5 hours",
        intensity: "Light",
        duration: "1-2 hours"
      }
    }
  ]
];

// Function to get current weather data set based on 15-minute rotation
export const getCurrentWeatherData = () => {
  const now = new Date();
  const minutes = now.getMinutes();
  const rotationIndex = Math.floor(minutes / 15);
  return allLiberianCities[rotationIndex % allLiberianCities.length];
};

// Sample program schedule
export const programs = [
  {
    id: 1,
    name: "Morning Drive",
    presenter: "John Doe",
    time: "06:00 - 10:00",
    day: "Monday",
    description: "Start your day with the latest news and music",
    category: "Talk Show"
  },
  {
    id: 2,
    name: "Liberian Hits",
    presenter: "Jane Smith",
    time: "10:00 - 14:00",
    day: "Monday",
    description: "The best of Liberian music",
    category: "Music"
  },
  {
    id: 3,
    name: "Evening Talk",
    presenter: "Mike Johnson",
    time: "18:00 - 20:00",
    day: "Monday",
    description: "Community discussions and call-ins",
    category: "Talk Show"
  },
  {
    id: 4,
    name: "Late Night Jazz",
    presenter: "Sarah Wilson",
    time: "22:00 - 02:00",
    day: "Monday",
    description: "Smooth jazz and soul music",
    category: "Music"
  }
];

// Sample testimonies
export const testimonies = [
  {
    id: 1,
    name: "Mary Johnson",
    testimony: "Vox Radio has been a blessing to our community. The programs are inspiring and informative.",
    location: "Monrovia",
    date: "2024-01-15",
    approved: true
  },
  {
    id: 2,
    name: "Joseph Smith",
    testimony: "I love the morning show. It keeps me informed about what's happening in Liberia.",
    location: "Gbarnga",
    date: "2024-01-14",
    approved: false
  }
];

// Sample phone calls
export const phoneCalls = [
  {
    id: 1,
    callerName: "Patricia Williams",
    phoneNumber: "+231-77-555-0123",
    callDate: "2024-01-15",
    callTime: "09:30 AM",
    purpose: "Program Feedback",
    notes: "Caller praised the morning show and suggested more local music",
    followUpRequired: false,
    duration: "5 minutes"
  },
  {
    id: 2,
    callerName: "Robert Johnson",
    phoneNumber: "+231-88-555-0456",
    callDate: "2024-01-15",
    callTime: "02:15 PM",
    purpose: "Advertisement Inquiry",
    notes: "Local business owner interested in advertising slots",
    followUpRequired: true,
    duration: "12 minutes"
  }
];

// Sample flight information
export const flightInfo = [
  {
    id: 1,
    airline: "Brussels Airlines",
    flight: "SN238",
    route: "Monrovia → Brussels",
    departure: "11:30 PM",
    arrival: "06:45 AM +1",
    status: "On Time",
    gate: "A2"
  },
  {
    id: 2,
    airline: "Royal Air Maroc",
    flight: "AT561",
    route: "Casablanca → Monrovia",
    departure: "02:15 PM",
    arrival: "07:30 PM",
    status: "Delayed 30min",
    gate: "B1"
  }
];