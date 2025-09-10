import React, { useState, useEffect } from 'react';
import { Radio, Clock, Calendar, Search, X, Filter, Heart, Play, Users, Book, MessageCircle, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

// Program type categories with colors (matching Kioo Radio style)
const PROGRAM_TYPES = {
  'Music': { 
    color: 'bg-blue-500', 
    textColor: 'text-blue-600',
    borderColor: 'border-blue-500',
    bgLight: 'bg-blue-50',
    icon: Play
  },
  'Bible Teaching': { 
    color: 'bg-green-500', 
    textColor: 'text-green-600',
    borderColor: 'border-green-500',
    bgLight: 'bg-green-50',
    icon: Book
  },
  'Interactive': { 
    color: 'bg-purple-500', 
    textColor: 'text-purple-600',
    borderColor: 'border-purple-500',
    bgLight: 'bg-purple-50',
    icon: MessageCircle
  },
  'Community': { 
    color: 'bg-orange-500', 
    textColor: 'text-orange-600',
    borderColor: 'border-orange-500',
    bgLight: 'bg-orange-50',
    icon: Users
  },
  'Special': { 
    color: 'bg-red-500', 
    textColor: 'text-red-600',
    borderColor: 'border-red-500',
    bgLight: 'bg-red-50',
    icon: Star
  }
};

// Enhanced program data with real-time tracking - 24-hour format
const enhancedPrograms = {
  Sunday: [
    { id: 'sun-1', time: "05:00-07:00", timeSlot: 5, duration: 2, name: "Music and Talks", presenter: "Emmanuel Lepolu", type: "Music" },
    { id: 'sun-2', time: "07:00-07:30", timeSlot: 7, duration: 0.5, name: "Salvation Half Hour", presenter: "Min. Cooper", type: "Bible Teaching" },
    { id: 'sun-3', time: "07:30-08:00", timeSlot: 7.5, duration: 0.5, name: "Music", presenter: "Emmanuel Lepolu", type: "Music" },
    { id: 'sun-4', time: "08:00-10:00", timeSlot: 8, duration: 2, name: "The Gospel Caravan", presenter: "Emmanuel Lepolu", type: "Bible Teaching" },
    { id: 'sun-5', time: "10:00-15:00", timeSlot: 10, duration: 5, name: "Music", presenter: "Various", type: "Music" },
    { id: 'sun-6', time: "15:00-16:00", timeSlot: 15, duration: 1, name: "Sunday Special", presenter: "Beatrice Ballah", type: "Special" },
    { id: 'sun-7', time: "16:00-18:00", timeSlot: 16, duration: 2, name: "Music and Talks", presenter: "Victoria Walker", type: "Music" },
    { id: 'sun-8', time: "18:00-19:30", timeSlot: 18, duration: 1.5, name: "Kids Hour", presenter: "Victoria Walker", type: "Special" },
    { id: 'sun-9', time: "19:30-21:00", timeSlot: 19.5, duration: 1.5, name: "Music", presenter: "Maxim Somah", type: "Music" },
    { id: 'sun-10', time: "21:00-22:00", timeSlot: 21, duration: 1, name: "Search The Scriptures", presenter: "Maxim Somah", type: "Bible Teaching" },
    { id: 'sun-11', time: "22:00-05:00", timeSlot: 22, duration: 7, name: "Music", presenter: "Various", type: "Music" }
  ],
  Monday: [
    { id: 'mon-0', time: "00:30-04:30", timeSlot: 0.5, duration: 4, name: "International Kapoa Secure Liberia", presenter: "Sam W. Doe", type: "Community" },
    { id: 'mon-1', time: "05:00-08:00", timeSlot: 5, duration: 3, name: "The Quiet Storm", presenter: "New Life Africa", type: "Special" },
    { id: 'mon-2', time: "08:00-09:00", timeSlot: 8, duration: 1, name: "Good Shepherd Fellowship", presenter: "Bishop Thomas", type: "Bible Teaching" },
    { id: 'mon-3', time: "09:00-10:00", timeSlot: 9, duration: 1, name: "Living Word", presenter: "Pastor Mensa", type: "Bible Teaching" },
    { id: 'mon-4', time: "10:00-10:10", timeSlot: 10, duration: 0.17, name: "Jingles and Music", presenter: "Deddeh Gayflor", type: "Music" },
    { id: 'mon-5', time: "10:10-10:20", timeSlot: 10.17, duration: 0.17, name: "Announcement", presenter: "Deddeh Gayflor", type: "Community" },
    { id: 'mon-6', time: "10:20-10:45", timeSlot: 10.33, duration: 0.42, name: "Back To The Bible", presenter: "Various", type: "Bible Teaching" },
    { id: 'mon-7', time: "10:45-11:00", timeSlot: 10.75, duration: 0.25, name: "Music", presenter: "Deddeh Gayflor", type: "Music" },
    { id: 'mon-8', time: "11:00-13:00", timeSlot: 11, duration: 2, name: "Worship Connexion", presenter: "New Life Africa", type: "Bible Teaching" },
    { id: 'mon-9', time: "13:00-13:05", timeSlot: 13, duration: 0.08, name: "Word To Go", presenter: "Pastor Mensa", type: "Bible Teaching" },
    { id: 'mon-10', time: "13:05-15:00", timeSlot: 13.08, duration: 1.92, name: "Launch Time Connection", presenter: "Deddeh Gayflor", type: "Special" },
    { id: 'mon-11', time: "15:00-16:30", timeSlot: 15, duration: 1.5, name: "The Heart Beat", presenter: "Various", type: "Community" },
    { id: 'mon-12', time: "16:30-17:30", timeSlot: 16.5, duration: 1, name: "Thru The Bible", presenter: "Pastor Mcquee", type: "Bible Teaching" },
    { id: 'mon-13', time: "17:30-17:45", timeSlot: 17.5, duration: 0.25, name: "Music", presenter: "Emmanuel Lepolu", type: "Music" },
    { id: 'mon-14', time: "17:45-18:00", timeSlot: 17.75, duration: 0.25, name: "Announcement", presenter: "Emmanuel Lepolu", type: "Community" },
    { id: 'mon-15', time: "18:00-18:30", timeSlot: 18, duration: 0.5, name: "Major Headlines", presenter: "Emmanuel Lepolu", type: "Community" },
    { id: 'mon-16', time: "18:30-19:30", timeSlot: 18.5, duration: 1, name: "Music", presenter: "Emmanuel Lepolu", type: "Music" },
    { id: 'mon-17', time: "19:30-20:45", timeSlot: 19.5, duration: 1.25, name: "Vox Talk", presenter: "Maxim and Sam", type: "Interactive" },
    { id: 'mon-18', time: "20:45-21:00", timeSlot: 20.75, duration: 0.25, name: "Announcement", presenter: "Sam", type: "Community" },
    { id: 'mon-19', time: "21:00-22:00", timeSlot: 21, duration: 1, name: "Vox Prayer Night", presenter: "Leone Moore", type: "Bible Teaching" },
    { id: 'mon-20', time: "22:00-23:00", timeSlot: 22, duration: 1, name: "The Night Ride", presenter: "Sam W. Doe", type: "Special" },
    { id: 'mon-21', time: "23:00-00:30", timeSlot: 23, duration: 1.5, name: "Music", presenter: "Sam W. Doe", type: "Music" }
  ],
  Tuesday: [
    { id: 'tue-0', time: "00:30-04:30", timeSlot: 0.5, duration: 4, name: "International Kapoa Secure Liberia", presenter: "Sam W. Doe", type: "Community" },
    { id: 'tue-1', time: "05:00-08:00", timeSlot: 5, duration: 3, name: "The Quiet Storm", presenter: "New Life Africa", type: "Special" },
    { id: 'tue-2', time: "08:00-09:00", timeSlot: 8, duration: 1, name: "Good Shepherd Fellowship", presenter: "Bishop Thomas", type: "Bible Teaching" },
    { id: 'tue-3', time: "09:00-10:00", timeSlot: 9, duration: 1, name: "Living Word", presenter: "Pastor Mensa", type: "Bible Teaching" },
    { id: 'tue-4', time: "10:00-10:10", timeSlot: 10, duration: 0.17, name: "Jingles and Music", presenter: "Emmanuel Lepolu", type: "Music" },
    { id: 'tue-5', time: "10:10-10:20", timeSlot: 10.17, duration: 0.17, name: "Announcement", presenter: "Emmanuel Lepolu", type: "Community" },
    { id: 'tue-6', time: "10:20-10:45", timeSlot: 10.33, duration: 0.42, name: "Back To The Bible", presenter: "Various", type: "Bible Teaching" },
    { id: 'tue-7', time: "10:45-11:00", timeSlot: 10.75, duration: 0.25, name: "Music", presenter: "Emmanuel Lepolu", type: "Music" },
    { id: 'tue-8', time: "11:00-13:00", timeSlot: 11, duration: 2, name: "Worship Connexion", presenter: "New Life Africa", type: "Bible Teaching" },
    { id: 'tue-9', time: "13:00-13:05", timeSlot: 13, duration: 0.08, name: "Word To Go", presenter: "Pastor Mensa", type: "Bible Teaching" },
    { id: 'tue-10', time: "13:05-15:00", timeSlot: 13.08, duration: 1.92, name: "Launch Time Connection", presenter: "Beauty Nuah", type: "Special" },
    { id: 'tue-11', time: "15:00-16:30", timeSlot: 15, duration: 1.5, name: "The Heart Beat", presenter: "Various", type: "Community" },
    { id: 'tue-12', time: "16:30-17:30", timeSlot: 16.5, duration: 1, name: "Thru The Bible", presenter: "Pastor Mcquee", type: "Bible Teaching" },
    { id: 'tue-13', time: "17:30-17:45", timeSlot: 17.5, duration: 0.25, name: "Music", presenter: "Beatrice Ballah", type: "Music" },
    { id: 'tue-14', time: "17:45-18:00", timeSlot: 17.75, duration: 0.25, name: "Announcement", presenter: "Beatrice Ballah", type: "Community" },
    { id: 'tue-15', time: "18:00-19:00", timeSlot: 18, duration: 1, name: "She Speaks Up", presenter: "Beatrice Ballah", type: "Interactive" },
    { id: 'tue-16', time: "19:00-19:30", timeSlot: 19, duration: 0.5, name: "Music", presenter: "Maxim Somah", type: "Music" },
    { id: 'tue-17', time: "19:30-20:45", timeSlot: 19.5, duration: 1.25, name: "Vox Talk", presenter: "Maxim and Sam", type: "Interactive" },
    { id: 'tue-18', time: "20:45-21:00", timeSlot: 20.75, duration: 0.25, name: "Announcement", presenter: "Various", type: "Community" },
    { id: 'tue-19', time: "21:00-22:00", timeSlot: 21, duration: 1, name: "Vox Prayer Night", presenter: "Leone Moore", type: "Bible Teaching" },
    { id: 'tue-20', time: "22:00-00:30", timeSlot: 22, duration: 2.5, name: "Music", presenter: "Maxim Somah", type: "Music" }
  ],
  Wednesday: [
    { id: 'wed-0', time: "00:30-04:30", timeSlot: 0.5, duration: 4, name: "International Kapoa Secure Liberia", presenter: "Maxim Somah", type: "Community" },
    { id: 'wed-1', time: "05:00-08:00", timeSlot: 5, duration: 3, name: "The Quiet Storm", presenter: "New Life Africa", type: "Special" },
    { id: 'wed-2', time: "08:00-09:00", timeSlot: 8, duration: 1, name: "Good Shepherd Fellowship", presenter: "Bishop Thomas", type: "Bible Teaching" },
    { id: 'wed-3', time: "09:00-10:00", timeSlot: 9, duration: 1, name: "Living Word", presenter: "Pastor Mensa", type: "Bible Teaching" },
    { id: 'wed-4', time: "10:00-10:10", timeSlot: 10, duration: 0.17, name: "Jingles and Music", presenter: "Emmanuel Lepolu", type: "Music" },
    { id: 'wed-5', time: "10:10-10:20", timeSlot: 10.17, duration: 0.17, name: "Announcement", presenter: "Emmanuel Lepolu", type: "Community" },
    { id: 'wed-6', time: "10:20-10:45", timeSlot: 10.33, duration: 0.42, name: "New Day Hour", presenter: "Pastor Fatorma", type: "Bible Teaching" },
    { id: 'wed-7', time: "10:45-11:00", timeSlot: 10.75, duration: 0.25, name: "Music", presenter: "T. KCalvin Walter", type: "Music" },
    { id: 'wed-8', time: "11:00-13:00", timeSlot: 11, duration: 2, name: "Worship Connexion", presenter: "New Life Africa", type: "Bible Teaching" },
    { id: 'wed-9', time: "13:00-13:05", timeSlot: 13, duration: 0.08, name: "Word To Go", presenter: "Pastor Mensa", type: "Bible Teaching" },
    { id: 'wed-10', time: "13:05-15:00", timeSlot: 13.08, duration: 1.92, name: "Launch Time Connection", presenter: "Beauty Nuah", type: "Special" },
    { id: 'wed-11', time: "15:00-16:30", timeSlot: 15, duration: 1.5, name: "The Heart Beat", presenter: "Various", type: "Community" },
    { id: 'wed-12', time: "16:30-17:30", timeSlot: 16.5, duration: 1, name: "Thru The Bible", presenter: "Pastor Mcquee", type: "Bible Teaching" },
    { id: 'wed-13', time: "17:30-17:45", timeSlot: 17.5, duration: 0.25, name: "Music", presenter: "Victoria Walker", type: "Music" },
    { id: 'wed-14', time: "17:45-18:00", timeSlot: 17.75, duration: 0.25, name: "Announcement", presenter: "Victoria Walker", type: "Community" },
    { id: 'wed-15', time: "18:00-19:15", timeSlot: 18, duration: 1.25, name: "Music", presenter: "Victoria Walker", type: "Music" },
    { id: 'wed-16', time: "19:15-20:45", timeSlot: 19.25, duration: 1.5, name: "Ladies Let's Talk", presenter: "Victoria Walker", type: "Interactive" },
    { id: 'wed-17', time: "20:45-21:00", timeSlot: 20.75, duration: 0.25, name: "Announcement", presenter: "Victoria Walker", type: "Community" },
    { id: 'wed-18', time: "21:00-22:00", timeSlot: 21, duration: 1, name: "Vox Prayer Night", presenter: "Leone Moore", type: "Bible Teaching" },
    { id: 'wed-19', time: "22:00-00:30", timeSlot: 22, duration: 2.5, name: "Music", presenter: "Emmanuel Howard", type: "Music" }
  ],
  Thursday: [
    { id: 'thu-0', time: "00:30-04:30", timeSlot: 0.5, duration: 4, name: "International Kapoa Secure Liberia", presenter: "Maxim Somah and Sam W. Doe", type: "Community" },
    { id: 'thu-1', time: "05:00-08:00", timeSlot: 5, duration: 3, name: "The Quiet Storm", presenter: "New Life Africa", type: "Special" },
    { id: 'thu-2', time: "08:00-09:00", timeSlot: 8, duration: 1, name: "Good Shepherd Fellowship", presenter: "Bishop Thomas", type: "Bible Teaching" },
    { id: 'thu-3', time: "09:00-10:00", timeSlot: 9, duration: 1, name: "Living Word", presenter: "Pastor Mensa", type: "Bible Teaching" },
    { id: 'thu-4', time: "10:00-10:10", timeSlot: 10, duration: 0.17, name: "Jingles and Music", presenter: "Emmanuel Lepolu", type: "Music" },
    { id: 'thu-5', time: "10:10-10:20", timeSlot: 10.17, duration: 0.17, name: "Announcement", presenter: "Emmanuel Lepolu", type: "Community" },
    { id: 'thu-6', time: "10:20-11:00", timeSlot: 10.33, duration: 0.67, name: "Music", presenter: "Deddeh Gayflor", type: "Music" },
    { id: 'thu-7', time: "11:00-13:00", timeSlot: 11, duration: 2, name: "Worship Connexion", presenter: "New Life Africa", type: "Bible Teaching" },
    { id: 'thu-8', time: "13:00-13:05", timeSlot: 13, duration: 0.08, name: "Word To Go", presenter: "Pastor Mensa", type: "Bible Teaching" },
    { id: 'thu-9', time: "13:05-15:00", timeSlot: 13.08, duration: 1.92, name: "Launch Time Connect", presenter: "Deddeh Gayflor", type: "Community" },
    { id: 'thu-10', time: "15:00-16:30", timeSlot: 15, duration: 1.5, name: "The Heart Beat", presenter: "Various", type: "Community" },
    { id: 'thu-11', time: "16:30-17:30", timeSlot: 16.5, duration: 1, name: "Thru The Bible", presenter: "Pastor Mcquee", type: "Bible Teaching" },
    { id: 'thu-12', time: "17:30-17:45", timeSlot: 17.5, duration: 0.25, name: "Music", presenter: "Beauty Nuah", type: "Music" },
    { id: 'thu-13', time: "17:45-18:00", timeSlot: 17.75, duration: 0.25, name: "Announcement", presenter: "Beauty Nuah", type: "Community" },
    { id: 'thu-14', time: "18:00-19:00", timeSlot: 18, duration: 1, name: "Teenagers Talk", presenter: "Beauty Nuah", type: "Interactive" },
    { id: 'thu-15', time: "19:00-19:30", timeSlot: 19, duration: 0.5, name: "Music", presenter: "Sam W. Doe", type: "Music" },
    { id: 'thu-16', time: "19:30-20:45", timeSlot: 19.5, duration: 1.25, name: "Vox Talk", presenter: "Maxim And Sam", type: "Interactive" },
    { id: 'thu-17', time: "20:45-21:00", timeSlot: 20.75, duration: 0.25, name: "Announcement", presenter: "Maxim Somah", type: "Community" },
    { id: 'thu-18', time: "22:00-00:30", timeSlot: 22, duration: 2.5, name: "Music", presenter: "Sam W. Doe", type: "Music" }
  ],
  Friday: [
    { id: 'fri-0', time: "00:30-04:30", timeSlot: 0.5, duration: 4, name: "International Kapoa Secure Liberia", presenter: "T. KCalvin Walter", type: "Community" },
    { id: 'fri-1', time: "05:00-08:00", timeSlot: 5, duration: 3, name: "The Quiet Storm", presenter: "New Life Africa", type: "Special" },
    { id: 'fri-2', time: "08:00-09:00", timeSlot: 8, duration: 1, name: "Good Shepherd Fellowship", presenter: "Bishop Thomas", type: "Bible Teaching" },
    { id: 'fri-3', time: "09:00-10:00", timeSlot: 9, duration: 1, name: "Living Word", presenter: "Pastor Mensa", type: "Bible Teaching" },
    { id: 'fri-4', time: "10:00-10:10", timeSlot: 10, duration: 0.17, name: "Jingles and Music", presenter: "Maxim Somah", type: "Music" },
    { id: 'fri-5', time: "10:10-10:20", timeSlot: 10.17, duration: 0.17, name: "Announcement", presenter: "Maxim Somah", type: "Community" },
    { id: 'fri-6', time: "10:20-11:00", timeSlot: 10.33, duration: 0.67, name: "Music", presenter: "Maxim Somah", type: "Music" },
    { id: 'fri-7', time: "11:00-13:00", timeSlot: 11, duration: 2, name: "Worship Connexion", presenter: "New Life Africa", type: "Bible Teaching" },
    { id: 'fri-8', time: "13:00-13:05", timeSlot: 13, duration: 0.08, name: "Word To Go", presenter: "Pastor Mensa", type: "Bible Teaching" },
    { id: 'fri-9', time: "13:05-15:00", timeSlot: 13.08, duration: 1.92, name: "Launch Time Connect", presenter: "Maxim Somah", type: "Community" },
    { id: 'fri-10', time: "15:00-15:20", timeSlot: 15, duration: 0.33, name: "Music", presenter: "Various", type: "Music" },
    { id: 'fri-11', time: "15:20-15:24", timeSlot: 15.33, duration: 0.07, name: "Guidelines For Living", presenter: "Various", type: "Special" },
    { id: 'fri-12', time: "15:24-16:00", timeSlot: 15.4, duration: 0.6, name: "The Heart Beat", presenter: "Various", type: "Community" },
    { id: 'fri-13', time: "16:00-17:00", timeSlot: 16, duration: 1, name: "The Drug Show", presenter: "Sam W. Doe", type: "Special" },
    { id: 'fri-14', time: "17:00-18:00", timeSlot: 17, duration: 1, name: "Trenz At 10", presenter: "T. KCalvin Walter", type: "Special" },
    { id: 'fri-15', time: "18:00-19:00", timeSlot: 18, duration: 1, name: "The Living Proof", presenter: "T. KCalvin Walter", type: "Special" },
    { id: 'fri-16', time: "19:00-20:45", timeSlot: 19, duration: 1.75, name: "Music", presenter: "T. KCalvin Walter", type: "Music" },
    { id: 'fri-17', time: "20:45-21:00", timeSlot: 20.75, duration: 0.25, name: "Announcement", presenter: "T. KCalvin Walter", type: "Community" },
    { id: 'fri-18', time: "21:00-22:00", timeSlot: 21, duration: 1, name: "The Conversation", presenter: "T. KCalvin Walter", type: "Interactive" },
    { id: 'fri-19', time: "22:00-00:30", timeSlot: 22, duration: 2.5, name: "Music", presenter: "T. KCalvin Walter", type: "Music" }
  ],
  Saturday: [
    { id: 'sat-1', time: "05:00-07:00", timeSlot: 5, duration: 2, name: "Music", presenter: "KCalvin", type: "Music" },
    { id: 'sat-2', time: "07:00-08:30", timeSlot: 7, duration: 1.5, name: "The Morning Jam", presenter: "KCalvin", type: "Music" },
    { id: 'sat-3', time: "08:30-09:00", timeSlot: 8.5, duration: 0.5, name: "Music", presenter: "KCalvin", type: "Music" },
    { id: 'sat-4', time: "09:00-10:15", timeSlot: 9, duration: 1.25, name: "Vox Sports DESK", presenter: "KCalvin and Emmanuel", type: "Community" },
    { id: 'sat-5', time: "10:15-11:15", timeSlot: 10.25, duration: 1, name: "Teenagers Talk", presenter: "Janet and D'Alessandro", type: "Interactive" },
    { id: 'sat-6', time: "11:15-13:00", timeSlot: 11.25, duration: 1.75, name: "Music", presenter: "Various", type: "Music" },
    { id: 'sat-7', time: "13:00-13:30", timeSlot: 13, duration: 0.5, name: "Truth For Life Weekend", presenter: "Various", type: "Bible Teaching" },
    { id: 'sat-8', time: "13:30-14:00", timeSlot: 13.5, duration: 0.5, name: "Planet Sports", presenter: "Various", type: "Community" },
    { id: 'sat-9', time: "14:00-16:00", timeSlot: 14, duration: 2, name: "Island Praise", presenter: "Various", type: "Bible Teaching" },
    { id: 'sat-10', time: "16:00-19:00", timeSlot: 16, duration: 3, name: "Blessed Beatz", presenter: "Various", type: "Music" },
    { id: 'sat-11', time: "19:00-00:00", timeSlot: 19, duration: 5, name: "Transformed DJ", presenter: "Various", type: "Music" },
    { id: 'sat-12', time: "00:00-05:00", timeSlot: 0, duration: 5, name: "Music", presenter: "Various", type: "Music" }
  ]
};

const EnhancedProgramSchedule = ({ isFullPage = false }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentProgram, setCurrentProgram] = useState(null);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedType, setSelectedType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('voxRadioFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage
  const saveFavorites = (newFavorites) => {
    setFavorites(newFavorites);
    localStorage.setItem('voxRadioFavorites', JSON.stringify(newFavorites));
  };

  // Toggle favorite program
  const toggleFavorite = (program, day) => {
    const programKey = `${day}-${program.name}-${program.time}`;
    const isFavorite = favorites.includes(programKey);
    
    if (isFavorite) {
      saveFavorites(favorites.filter(fav => fav !== programKey));
    } else {
      saveFavorites([...favorites, programKey]);
    }
  };

  // Check if program is favorite
  const isFavorite = (program, day) => {
    const programKey = `${day}-${program.name}-${program.time}`;
    return favorites.includes(programKey);
  };

  // Find current program based on Liberia time
  const getCurrentProgram = () => {
    const now = new Date(new Date().toLocaleString("en-US", {timeZone: "Africa/Monrovia"}));
    const currentDay = days[now.getDay()];
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTimeDecimal = currentHour + (currentMinutes / 60);

    const todayPrograms = enhancedPrograms[currentDay] || [];
    
    return todayPrograms.find(program => {
      const startTime = program.timeSlot;
      const endTime = startTime + program.duration;
      
      // Handle programs that cross midnight
      if (startTime > endTime) {
        return currentTimeDecimal >= startTime || currentTimeDecimal < endTime;
      }
      
      return currentTimeDecimal >= startTime && currentTimeDecimal < endTime;
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date(new Date().toLocaleString("en-US", {timeZone: "Africa/Monrovia"}));
      setCurrentTime(now);
      
      // Get current day name
      const currentDayName = days[now.getDay()];
      setSelectedDay(currentDayName);
      
      // Find current program
      const activeProgram = getCurrentProgram();
      setCurrentProgram(activeProgram);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getFilteredPrograms = () => {
    let dayPrograms = enhancedPrograms[selectedDay] || [];
    
    // Filter by search term
    if (searchTerm) {
      dayPrograms = dayPrograms.filter(program => 
        program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.presenter.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by type
    if (selectedType !== 'All') {
      dayPrograms = dayPrograms.filter(program => program.type === selectedType);
    }
    
    // Filter by favorites
    if (showFavoritesOnly) {
      dayPrograms = dayPrograms.filter(program => isFavorite(program, selectedDay));
    }
    
    return dayPrograms;
  };

  const getProgramTypeIcon = (type) => {
    const IconComponent = PROGRAM_TYPES[type]?.icon || Radio;
    return <IconComponent size={16} />;
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
      {/* Header Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-3">
            <Radio className="text-orange-400 animate-pulse" size={24} />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-orange-400">VOX RADIO PROGRAMS</h2>
              <p className="text-sm text-gray-400">Complete daily programming schedule - 24 Hour Format</p>
            </div>
            
            {/* Current Program Indicator */}
            {currentProgram && (
              <div className="hidden lg:flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-bold text-white text-sm">
                  ON AIR: {currentProgram.name} with {currentProgram.presenter}
                </span>
                <Clock size={16} className="text-yellow-300" />
              </div>
            )}
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 w-full lg:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                type="text"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10 w-full sm:w-64 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                showFavoritesOnly 
                  ? 'bg-red-500 text-white shadow-lg' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Heart size={16} fill={showFavoritesOnly ? 'white' : 'none'} />
              <span className="hidden sm:inline">Favorites ({favorites.length})</span>
              <span className="sm:hidden">❤️ {favorites.length}</span>
            </button>
            
            {!isFullPage && (
              <Button
                onClick={() => window.open('/enhanced-schedule', '_blank')}
                className="bg-orange-500 hover:bg-orange-600 text-white whitespace-nowrap"
              >
                Full View
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Current Program */}
        {currentProgram && (
          <div className="lg:hidden mt-4 flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="font-bold text-white text-sm">
              ON AIR: {currentProgram.name}
            </span>
          </div>
        )}
      </div>

      {/* Type Filters */}
      <div className="px-4 sm:px-6 lg:px-8 pb-4">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          <Filter size={16} className="text-gray-400 flex-shrink-0" />
          <button
            onClick={() => setSelectedType('All')}
            className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
              selectedType === 'All' 
                ? 'bg-orange-500 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            All Programs
          </button>
          {Object.keys(PROGRAM_TYPES).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 whitespace-nowrap ${
                selectedType === type 
                  ? `${PROGRAM_TYPES[type].color} text-white` 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {getProgramTypeIcon(type)}
              <span>{type}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Day Tabs */}
      <div className="px-4 sm:px-6 lg:px-8 pb-6">
        <div className="flex space-x-1 overflow-x-auto pb-2">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                selectedDay === day 
                  ? 'bg-orange-500 text-white shadow-lg' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Program Table - Kioo Radio Style */}
      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3">
            <h3 className="text-lg font-bold text-white">
              {selectedDay} Program Schedule
              <span className="ml-2 text-sm text-orange-100">
                ({getFilteredPrograms().length} programs)
              </span>
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time (24H)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Program
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Presenter
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getFilteredPrograms().length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="text-gray-400">
                        <Calendar size={48} className="mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">
                          {searchTerm 
                            ? 'No Results Found' 
                            : showFavoritesOnly 
                            ? 'No Favorite Programs' 
                            : 'No Programs Scheduled'
                          }
                        </h3>
                        <p className="text-sm">
                          {searchTerm 
                            ? `No programs found matching "${searchTerm}" for ${selectedDay}` 
                            : showFavoritesOnly 
                            ? `You haven't favorited any programs for ${selectedDay} yet` 
                            : `No programs are scheduled for ${selectedDay}`
                          }
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  getFilteredPrograms().map((program, index) => {
                    const isCurrent = currentProgram && currentProgram.id === program.id;
                    const typeConfig = PROGRAM_TYPES[program.type];
                    const isCurrentFavorite = isFavorite(program, selectedDay);
                    
                    return (
                      <tr 
                        key={program.id} 
                        className={`transition-all duration-200 cursor-pointer ${
                          isCurrent 
                            ? 'bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 shadow-md' 
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => {
                          // Program click functionality can be added here
                          console.log('Clicked program:', program);
                        }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`text-sm font-medium ${isCurrent ? 'text-orange-600' : 'text-gray-900'}`}>
                              {program.time}
                            </div>
                            {isCurrent && (
                              <div className="ml-2 flex items-center space-x-1">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                                  LIVE
                                </span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`text-sm font-medium ${isCurrent ? 'text-orange-600' : 'text-gray-900'}`}>
                            {program.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm ${isCurrent ? 'text-orange-600 font-medium' : 'text-gray-500'}`}>
                            {program.presenter}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeConfig?.color} text-white`}>
                            {getProgramTypeIcon(program.type)}
                            <span className="ml-1">{program.type}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(program, selectedDay);
                            }}
                            className={`p-2 rounded-full transition-colors ${
                              isCurrentFavorite 
                                ? 'text-red-500 hover:text-red-400 bg-red-50' 
                                : 'text-gray-400 hover:text-red-500 hover:bg-gray-50'
                            }`}
                          >
                            <Heart size={16} fill={isCurrentFavorite ? 'currentColor' : 'none'} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedProgramSchedule;