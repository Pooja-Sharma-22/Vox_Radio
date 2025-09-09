import React, { useState, useEffect } from 'react';
import { Radio, Clock, Calendar, ChevronDown, ChevronUp, Play, Users, Book, MessageCircle, Heart, Star, Search, X, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

// Program type categories with colors (matching your HTML structure)
const PROGRAM_TYPES = {
  'Music': { 
    color: 'bg-blue-500', 
    textColor: 'text-blue-500',
    borderColor: 'border-blue-500',
    icon: Play,
    bgLight: 'bg-blue-50'
  },
  'Bible Teaching': { 
    color: 'bg-green-500', 
    textColor: 'text-green-500',
    borderColor: 'border-green-500',
    icon: Book,
    bgLight: 'bg-green-50'
  },
  'Interactive': { 
    color: 'bg-purple-500', 
    textColor: 'text-purple-500',
    borderColor: 'border-purple-500',
    icon: MessageCircle,
    bgLight: 'bg-purple-50'
  },
  'Community': { 
    color: 'bg-orange-500', 
    textColor: 'text-orange-500',
    borderColor: 'border-orange-500',
    icon: Users,
    bgLight: 'bg-orange-50'
  },
  'Special': { 
    color: 'bg-red-500', 
    textColor: 'text-red-500',
    borderColor: 'border-red-500',
    icon: Star,
    bgLight: 'bg-red-50'
  }
};

import React, { useState, useEffect } from 'react';
import { Radio, Clock, Calendar, ChevronDown, ChevronUp, Play, Users, Book, MessageCircle, Heart, Star, Search, X, Filter } from 'lucide-react';
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

// Enhanced program data with real-time tracking
const enhancedPrograms = {
  Sunday: [
    { id: 'sun-1', time: "5:00-7:00AM", timeSlot: 5, duration: 2, name: "Music and Talks", presenter: "Emmanuel Lepolu", type: "Music" },
    { id: 'sun-2', time: "7:00-7:30AM", timeSlot: 7, duration: 0.5, name: "Salvation Half Hour", presenter: "Min. Cooper", type: "Bible Teaching" },
    { id: 'sun-3', time: "7:30-8:00AM", timeSlot: 7.5, duration: 0.5, name: "Music", presenter: "Emmanuel Lepolu", type: "Music" },
    { id: 'sun-4', time: "8:00-10:00AM", timeSlot: 8, duration: 2, name: "The Gospel Caravan", presenter: "Emmanuel Lepolu", type: "Bible Teaching" },
    { id: 'sun-5', time: "10:00AM-3:00PM", timeSlot: 10, duration: 5, name: "Music", presenter: "Various", type: "Music" },
    { id: 'sun-6', time: "3:00-4:00PM", timeSlot: 15, duration: 1, name: "Sunday Special", presenter: "Beatrice Ballah", type: "Special" },
    { id: 'sun-7', time: "4:00-6:00PM", timeSlot: 16, duration: 2, name: "Music and Talks", presenter: "Victoria Walker", type: "Music" },
    { id: 'sun-8', time: "6:00-7:30PM", timeSlot: 18, duration: 1.5, name: "Kids Hour", presenter: "Victoria Walker", type: "Special" },
    { id: 'sun-9', time: "7:30-9:00PM", timeSlot: 19.5, duration: 1.5, name: "Music", presenter: "Maxim Somah", type: "Music" },
    { id: 'sun-10', time: "9:00-10:00PM", timeSlot: 21, duration: 1, name: "Search The Scriptures", presenter: "Maxim Somah", type: "Bible Teaching" },
    { id: 'sun-11', time: "10:00PM-5:00AM", timeSlot: 22, duration: 7, name: "Music", presenter: "Various", type: "Music" }
  ],
  Monday: [
    { id: 'mon-1', time: "5:00-8:00AM", timeSlot: 5, duration: 3, name: "The Quiet Storm", presenter: "New Life Africa", type: "Special" },
    { id: 'mon-2', time: "8:00-9:00AM", timeSlot: 8, duration: 1, name: "Good Shepherd Fellowship", presenter: "Bishop Thomas", type: "Bible Teaching" },
    { id: 'mon-3', time: "9:00-10:00AM", timeSlot: 9, duration: 1, name: "Living Word", presenter: "Pastor Mensa", type: "Bible Teaching" },
    { id: 'mon-4', time: "10:00-10:10AM", timeSlot: 10, duration: 0.17, name: "Jingles and Music", presenter: "Deddeh Gayflor", type: "Music" },
    { id: 'mon-5', time: "10:10-10:20AM", timeSlot: 10.17, duration: 0.17, name: "Announcement", presenter: "Deddeh Gayflor", type: "Community" },
    { id: 'mon-6', time: "10:20-10:45AM", timeSlot: 10.33, duration: 0.42, name: "Back To The Bible", presenter: "Various", type: "Bible Teaching" },
    { id: 'mon-7', time: "10:45-11:00AM", timeSlot: 10.75, duration: 0.25, name: "Music", presenter: "Deddeh Gayflor", type: "Music" },
    { id: 'mon-8', time: "11:00AM-1:00PM", timeSlot: 11, duration: 2, name: "Worship Connexion", presenter: "New Life Africa", type: "Bible Teaching" },
    { id: 'mon-9', time: "1:00-1:05PM", timeSlot: 13, duration: 0.08, name: "Word To Go", presenter: "Pastor Mensa", type: "Bible Teaching" },
    { id: 'mon-10', time: "1:05-3:00PM", timeSlot: 13.08, duration: 1.92, name: "Launch Time Connection", presenter: "Deddeh Gayflor", type: "Special" },
    { id: 'mon-11', time: "3:00-4:30PM", timeSlot: 15, duration: 1.5, name: "The Heart Beat", presenter: "Various", type: "Community" },
    { id: 'mon-12', time: "4:30-5:30PM", timeSlot: 16.5, duration: 1, name: "Thru The Bible", presenter: "Pastor Mcquee", type: "Bible Teaching" },
    { id: 'mon-13', time: "5:30-5:45PM", timeSlot: 17.5, duration: 0.25, name: "Music", presenter: "Emmanuel Lepolu", type: "Music" },
    { id: 'mon-14', time: "5:45-6:00PM", timeSlot: 17.75, duration: 0.25, name: "Announcement", presenter: "Emmanuel Lepolu", type: "Community" },
    { id: 'mon-15', time: "6:00-6:30PM", timeSlot: 18, duration: 0.5, name: "Major Headlines", presenter: "Emmanuel Lepolu", type: "Community" },
    { id: 'mon-16', time: "6:30-7:30PM", timeSlot: 18.5, duration: 1, name: "Music", presenter: "Emmanuel Lepolu", type: "Music" },
    { id: 'mon-17', time: "7:30-8:45PM", timeSlot: 19.5, duration: 1.25, name: "Vox Talk", presenter: "Maxim and Sam", type: "Interactive" },
    { id: 'mon-18', time: "8:45-9:00PM", timeSlot: 20.75, duration: 0.25, name: "Announcement", presenter: "Sam", type: "Community" },
    { id: 'mon-19', time: "9:00-10:00PM", timeSlot: 21, duration: 1, name: "Vox Prayer Night", presenter: "Leone Moore", type: "Bible Teaching" },
    { id: 'mon-20', time: "10:00-11:00PM", timeSlot: 22, duration: 1, name: "The Night Ride", presenter: "Sam W. Doe", type: "Special" },
    { id: 'mon-21', time: "11:00PM-12:30AM", timeSlot: 23, duration: 1.5, name: "Music", presenter: "Sam W. Doe", type: "Music" },
    { id: 'mon-22', time: "12:30-4:30AM", timeSlot: 0.5, duration: 4, name: "International Kapoa Secure Liberia", presenter: "Sam W. Doe", type: "Special" },
    { id: 'mon-23', time: "4:30-5:00AM", timeSlot: 4.5, duration: 0.5, name: "Thru The Bible", presenter: "Various", type: "Bible Teaching" }
  ],
  Tuesday: [
    { id: 'tue-1', time: "5:00-8:00AM", timeSlot: 5, duration: 3, name: "The Quiet Storm", presenter: "New Life Africa", type: "Special" },
    { id: 'tue-2', time: "8:00-9:00AM", timeSlot: 8, duration: 1, name: "Good Shepherd Fellowship", presenter: "Bishop Thomas", type: "Bible Teaching" },
    { id: 'tue-3', time: "9:00-10:00AM", timeSlot: 9, duration: 1, name: "Living Word", presenter: "Pastor Mensa", type: "Bible Teaching" },
    { id: 'tue-4', time: "10:00-10:10AM", timeSlot: 10, duration: 0.17, name: "Jingles and Music", presenter: "Emmanuel Lepolu", type: "Music" },
    { id: 'tue-5', time: "10:10-10:20AM", timeSlot: 10.17, duration: 0.17, name: "Announcement", presenter: "Emmanuel Lepolu", type: "Community" },
    { id: 'tue-6', time: "10:20-10:45AM", timeSlot: 10.33, duration: 0.42, name: "Back To The Bible", presenter: "Various", type: "Bible Teaching" },
    { id: 'tue-7', time: "10:45-11:00AM", timeSlot: 10.75, duration: 0.25, name: "Music", presenter: "Emmanuel Lepolu", type: "Music" },
    { id: 'tue-8', time: "11:00AM-1:00PM", timeSlot: 11, duration: 2, name: "Worship Connexion", presenter: "New Life Africa", type: "Bible Teaching" },
    { id: 'tue-9', time: "1:00-1:05PM", timeSlot: 13, duration: 0.08, name: "Word To Go", presenter: "Pastor Mensa", type: "Bible Teaching" },
    { id: 'tue-10', time: "1:05-3:00PM", timeSlot: 13.08, duration: 1.92, name: "Launch Time Connection", presenter: "Beauty Nuah", type: "Special" },
    { id: 'tue-11', time: "3:00-4:30PM", timeSlot: 15, duration: 1.5, name: "The Heart Beat", presenter: "Various", type: "Community" },
    { id: 'tue-12', time: "4:30-5:30PM", timeSlot: 16.5, duration: 1, name: "Thru The Bible", presenter: "Pastor Mcquee", type: "Bible Teaching" },
    { id: 'tue-13', time: "5:30-5:45PM", timeSlot: 17.5, duration: 0.25, name: "Music", presenter: "Beatrice Ballah", type: "Music" },
    { id: 'tue-14', time: "5:45-6:00PM", timeSlot: 17.75, duration: 0.25, name: "Announcement", presenter: "Beatrice Ballah", type: "Community" },
    { id: 'tue-15', time: "6:00-7:00PM", timeSlot: 18, duration: 1, name: "She Speaks Up", presenter: "Beatrice Ballah", type: "Interactive" },
    { id: 'tue-16', time: "7:00-7:30PM", timeSlot: 19, duration: 0.5, name: "Music", presenter: "Maxim Somah", type: "Music" },
    { id: 'tue-17', time: "7:30-8:45PM", timeSlot: 19.5, duration: 1.25, name: "Vox Talk", presenter: "Maxim and Sam", type: "Interactive" },
    { id: 'tue-18', time: "8:45-9:00PM", timeSlot: 20.75, duration: 0.25, name: "Announcement", presenter: "Various", type: "Community" },
    { id: 'tue-19', time: "9:00-10:00PM", timeSlot: 21, duration: 1, name: "Vox Prayer Night", presenter: "Leone Moore", type: "Bible Teaching" },
    { id: 'tue-20', time: "10:00PM-12:30AM", timeSlot: 22, duration: 2.5, name: "Music", presenter: "Maxim Somah", type: "Music" },
    { id: 'tue-21', time: "12:30-4:30AM", timeSlot: 0.5, duration: 4, name: "International Kapoa Secure Liberia", presenter: "Maxim Somah", type: "Special" },
    { id: 'tue-22', time: "4:30-5:00AM", timeSlot: 4.5, duration: 0.5, name: "Thru The Bible", presenter: "Various", type: "Bible Teaching" }
  ],
  // Additional days would continue with the same pattern...
  Wednesday: [
    { id: 'wed-1', time: "5:00-8:00AM", timeSlot: 5, duration: 3, name: "The Quiet Storm", presenter: "New Life Africa", type: "Special" },
    { id: 'wed-2', time: "8:00-9:00AM", timeSlot: 8, duration: 1, name: "Good Shepherd Fellowship", presenter: "Bishop Thomas", type: "Bible Teaching" },
    { id: 'wed-3', time: "9:00-10:00AM", timeSlot: 9, duration: 1, name: "Living Word", presenter: "Pastor Mensa", type: "Bible Teaching" },
    { id: 'wed-4', time: "10:00-10:10AM", timeSlot: 10, duration: 0.17, name: "Jingles and Music", presenter: "Emmanuel Lepolu", type: "Music" },
    { id: 'wed-5', time: "10:10-10:20AM", timeSlot: 10.17, duration: 0.17, name: "Announcement", presenter: "Emmanuel Lepolu", type: "Community" },
    { id: 'wed-6', time: "10:20-10:45AM", timeSlot: 10.33, duration: 0.42, name: "New Day Hour", presenter: "Pastor Fatorma", type: "Bible Teaching" },
    { id: 'wed-7', time: "10:45-11:00AM", timeSlot: 10.75, duration: 0.25, name: "Music", presenter: "T. KCalvin Walter", type: "Music" },
    { id: 'wed-8', time: "11:00AM-1:00PM", timeSlot: 11, duration: 2, name: "Worship Connexion", presenter: "New Life Africa", type: "Bible Teaching" },
    { id: 'wed-9', time: "1:00-1:05PM", timeSlot: 13, duration: 0.08, name: "Word To Go", presenter: "Pastor Mensa", type: "Bible Teaching" },
    { id: 'wed-10', time: "1:05-3:00PM", timeSlot: 13.08, duration: 1.92, name: "Launch Time Connection", presenter: "Beauty Nuah", type: "Special" },
    { id: 'wed-11', time: "3:00-4:30PM", timeSlot: 15, duration: 1.5, name: "The Heart Beat", presenter: "Various", type: "Community" },
    { id: 'wed-12', time: "4:30-5:30PM", timeSlot: 16.5, duration: 1, name: "Thru The Bible", presenter: "Pastor Mcquee", type: "Bible Teaching" },
    { id: 'wed-13', time: "5:30-5:45PM", timeSlot: 17.5, duration: 0.25, name: "Music", presenter: "Victoria Walker", type: "Music" },
    { id: 'wed-14', time: "5:45-6:00PM", timeSlot: 17.75, duration: 0.25, name: "Announcement", presenter: "Victoria Walker", type: "Community" },
    { id: 'wed-15', time: "6:00-7:15PM", timeSlot: 18, duration: 1.25, name: "Music", presenter: "Victoria Walker", type: "Music" },
    { id: 'wed-16', time: "7:15-8:45PM", timeSlot: 19.25, duration: 1.5, name: "Ladies Let's Talk", presenter: "Victoria Walker", type: "Interactive" },
    { id: 'wed-17', time: "8:45-9:00PM", timeSlot: 20.75, duration: 0.25, name: "Announcement", presenter: "Victoria Walker", type: "Community" },
    { id: 'wed-18', time: "9:00-10:00PM", timeSlot: 21, duration: 1, name: "Vox Prayer Night", presenter: "Leone Moore", type: "Bible Teaching" },
    { id: 'wed-19', time: "10:00PM-12:30AM", timeSlot: 22, duration: 2.5, name: "Music", presenter: "Emmanuel Howard", type: "Music" },
    { id: 'wed-20', time: "12:30-4:30AM", timeSlot: 0.5, duration: 4, name: "International Kapoa Secure Liberia", presenter: "Emmanuel Howard", type: "Special" },
    { id: 'wed-21', time: "4:30-5:00AM", timeSlot: 4.5, duration: 0.5, name: "Thru The Bible", presenter: "Various", type: "Bible Teaching" }
  ],
  Thursday: [
    { id: 'thu-1', time: "5:00-8:00AM", timeSlot: 5, duration: 3, name: "The Quiet Storm", presenter: "New Life Africa", type: "Special" },
    { id: 'thu-2', time: "8:00-9:00AM", timeSlot: 8, duration: 1, name: "Good Shepherd Fellowship", presenter: "Bishop Thomas", type: "Bible Teaching" },
    { id: 'thu-3', time: "9:00-10:00AM", timeSlot: 9, duration: 1, name: "Living Word", presenter: "Pastor Mensa", type: "Bible Teaching" },
    { id: 'thu-4', time: "10:00-10:10AM", timeSlot: 10, duration: 0.17, name: "Jingles and Music", presenter: "Emmanuel Lepolu", type: "Music" },
    { id: 'thu-5', time: "10:10-10:20AM", timeSlot: 10.17, duration: 0.17, name: "Announcement", presenter: "Emmanuel Lepolu", type: "Community" },
    { id: 'thu-6', time: "10:20-11:00AM", timeSlot: 10.33, duration: 0.67, name: "Music", presenter: "Deddeh Gayflor", type: "Music" },
    { id: 'thu-7', time: "11:00AM-1:00PM", timeSlot: 11, duration: 2, name: "Worship Connexion", presenter: "New Life Africa", type: "Bible Teaching" },
    { id: 'thu-8', time: "1:00-1:05PM", timeSlot: 13, duration: 0.08, name: "Word To Go", presenter: "Pastor Mensa", type: "Bible Teaching" },
    { id: 'thu-9', time: "1:05-3:00PM", timeSlot: 13.08, duration: 1.92, name: "Launch Time Connect", presenter: "Deddeh Gayflor", type: "Community" },
    { id: 'thu-10', time: "3:00-4:30PM", timeSlot: 15, duration: 1.5, name: "The Heart Beat", presenter: "Various", type: "Community" },
    { id: 'thu-11', time: "4:30-5:30PM", timeSlot: 16.5, duration: 1, name: "Thru The Bible", presenter: "Pastor Mcquee", type: "Bible Teaching" },
    { id: 'thu-12', time: "5:30-5:45PM", timeSlot: 17.5, duration: 0.25, name: "Music", presenter: "Beauty Nuah", type: "Music" },
    { id: 'thu-13', time: "5:45-6:00PM", timeSlot: 17.75, duration: 0.25, name: "Announcement", presenter: "Beauty Nuah", type: "Community" },
    { id: 'thu-14', time: "6:00-7:00PM", timeSlot: 18, duration: 1, name: "Teenagers Talk", presenter: "Beauty Nuah", type: "Interactive" },
    { id: 'thu-15', time: "7:00-7:30PM", timeSlot: 19, duration: 0.5, name: "Music", presenter: "Sam W. Doe", type: "Music" },
    { id: 'thu-16', time: "7:30-8:45PM", timeSlot: 19.5, duration: 1.25, name: "Vox Talk", presenter: "Maxim And Sam", type: "Interactive" },
    { id: 'thu-17', time: "8:45-9:00PM", timeSlot: 20.75, duration: 0.25, name: "Announcement", presenter: "Maxim Somah", type: "Community" },
    { id: 'thu-18', time: "10:00PM-12:30AM", timeSlot: 22, duration: 2.5, name: "Music", presenter: "Sam W. Doe", type: "Music" },
    { id: 'thu-19', time: "12:30-4:30AM", timeSlot: 0.5, duration: 4, name: "International Kapoa Secure Liberia", presenter: "Maxim and Sam", type: "Special" },
    { id: 'thu-20', time: "4:30-5:00AM", timeSlot: 4.5, duration: 0.5, name: "Thru The Bible", presenter: "Various", type: "Bible Teaching" }
  ],
  Friday: [
    { id: 'fri-1', time: "5:00-8:00AM", timeSlot: 5, duration: 3, name: "The Quiet Storm", presenter: "New Life Africa", type: "Special" },
    { id: 'fri-2', time: "8:00-9:00AM", timeSlot: 8, duration: 1, name: "Good Shepherd Fellowship", presenter: "Bishop Thomas", type: "Bible Teaching" },
    { id: 'fri-3', time: "9:00-10:00AM", timeSlot: 9, duration: 1, name: "Living Word", presenter: "Pastor Mensa", type: "Bible Teaching" },
    { id: 'fri-4', time: "10:00-10:10AM", timeSlot: 10, duration: 0.17, name: "Jingles and Music", presenter: "Maxim Somah", type: "Music" },
    { id: 'fri-5', time: "10:10-10:20AM", timeSlot: 10.17, duration: 0.17, name: "Announcement", presenter: "Maxim Somah", type: "Community" },
    { id: 'fri-6', time: "10:20-11:00AM", timeSlot: 10.33, duration: 0.67, name: "Music", presenter: "Maxim Somah", type: "Music" },
    { id: 'fri-7', time: "11:00AM-1:00PM", timeSlot: 11, duration: 2, name: "Worship Connexion", presenter: "New Life Africa", type: "Bible Teaching" },
    { id: 'fri-8', time: "1:00-1:05PM", timeSlot: 13, duration: 0.08, name: "Word To Go", presenter: "Pastor Mensa", type: "Bible Teaching" },
    { id: 'fri-9', time: "1:05-3:00PM", timeSlot: 13.08, duration: 1.92, name: "Launch Time Connect", presenter: "Maxim Somah", type: "Community" },
    { id: 'fri-10', time: "3:00-3:20PM", timeSlot: 15, duration: 0.33, name: "Music", presenter: "Various", type: "Music" },
    { id: 'fri-11', time: "3:20-3:24PM", timeSlot: 15.33, duration: 0.07, name: "Guidelines For Living", presenter: "Various", type: "Special" },
    { id: 'fri-12', time: "3:24-4:00PM", timeSlot: 15.4, duration: 0.6, name: "The Heart Beat", presenter: "Various", type: "Community" },
    { id: 'fri-13', time: "4:00-5:00PM", timeSlot: 16, duration: 1, name: "The Drug Show", presenter: "Sam W. Doe", type: "Special" },
    { id: 'fri-14', time: "5:00-6:00PM", timeSlot: 17, duration: 1, name: "Trenz At 10", presenter: "T. KCalvin Walter", type: "Special" },
    { id: 'fri-15', time: "6:00-7:00PM", timeSlot: 18, duration: 1, name: "The Living Proof", presenter: "T. KCalvin Walter", type: "Special" },
    { id: 'fri-16', time: "7:00-8:45PM", timeSlot: 19, duration: 1.75, name: "Music", presenter: "T. KCalvin Walter", type: "Music" },
    { id: 'fri-17', time: "8:45-9:00PM", timeSlot: 20.75, duration: 0.25, name: "Announcement", presenter: "T. KCalvin Walter", type: "Community" },
    { id: 'fri-18', time: "9:00-10:00PM", timeSlot: 21, duration: 1, name: "The Conversation", presenter: "T. KCalvin Walter", type: "Interactive" },
    { id: 'fri-19', time: "10:00PM-12:30AM", timeSlot: 22, duration: 2.5, name: "Music", presenter: "T. KCalvin Walter", type: "Music" },
    { id: 'fri-20', time: "12:30-4:30AM", timeSlot: 0.5, duration: 4, name: "International Kapoa Secure Liberia", presenter: "T. KCalvin Walter", type: "Special" },
    { id: 'fri-21', time: "4:30-5:00AM", timeSlot: 4.5, duration: 0.5, name: "Thru The Bible", presenter: "Various", type: "Bible Teaching" }
  ],
  Saturday: [
    { id: 'sat-1', time: "5:00-7:00AM", timeSlot: 5, duration: 2, name: "Music", presenter: "KCalvin", type: "Music" },
    { id: 'sat-2', time: "7:00-8:30AM", timeSlot: 7, duration: 1.5, name: "The Morning Jam", presenter: "KCalvin", type: "Music" },
    { id: 'sat-3', time: "8:30-9:00AM", timeSlot: 8.5, duration: 0.5, name: "Music", presenter: "KCalvin", type: "Music" },
    { id: 'sat-4', time: "9:00-10:15AM", timeSlot: 9, duration: 1.25, name: "Vox Sports DESK", presenter: "KCalvin and Emmanuel", type: "Community" },
    { id: 'sat-5', time: "10:15-11:15AM", timeSlot: 10.25, duration: 1, name: "Teenagers Talk", presenter: "Janet and D'Alessandro", type: "Interactive" },
    { id: 'sat-6', time: "11:15AM-1:00PM", timeSlot: 11.25, duration: 1.75, name: "Music", presenter: "Various", type: "Music" },
    { id: 'sat-7', time: "1:00-1:30PM", timeSlot: 13, duration: 0.5, name: "Truth For Life Weekend", presenter: "Various", type: "Bible Teaching" },
    { id: 'sat-8', time: "1:30-2:00PM", timeSlot: 13.5, duration: 0.5, name: "Planet Sports", presenter: "Various", type: "Community" },
    { id: 'sat-9', time: "2:00-4:00PM", timeSlot: 14, duration: 2, name: "Island Praise", presenter: "Various", type: "Bible Teaching" },
    { id: 'sat-10', time: "4:00-7:00PM", timeSlot: 16, duration: 3, name: "Blessed Beatz", presenter: "Various", type: "Music" },
    { id: 'sat-11', time: "7:00PM-12:00AM", timeSlot: 19, duration: 5, name: "Transformed DJ", presenter: "Various", type: "Music" },
    { id: 'sat-12', time: "12:00AM-5:00AM", timeSlot: 0, duration: 5, name: "Music", presenter: "Various", type: "Music" }
  ]
};

const EnhancedProgramSchedule = ({ isFullPage = false }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentProgram, setCurrentProgram] = useState(null);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [isExpanded, setIsExpanded] = useState(false);
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
  }, [days]);

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
    <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white border-b border-orange-500">
      {/* Mobile Layout */}
      <div className="sm:hidden">
        <div className="px-4 py-3">
          {/* Mobile Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Radio className="text-orange-400 animate-pulse" size={16} />
              <span className="text-sm font-bold text-orange-400">ENHANCED SCHEDULE</span>
            </div>
            
            {/* Current Program Display - Mobile */}
            {currentProgram && (
              <div className="flex items-center space-x-1 bg-orange-500 px-2 py-1 rounded-full">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-bold text-white text-xs">LIVE: {currentProgram.name}</span>
              </div>
            )}
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-orange-400 hover:text-orange-300 transition-colors"
            >
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>

          {/* Mobile Expanded Content */}
          {isExpanded && (
            <div className="mt-4 space-y-4">
              {/* Search and Favorites Controls */}
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    type="text"
                    placeholder="Search programs, presenters, or types..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
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
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${
                      showFavoritesOnly 
                        ? 'bg-red-500 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <Heart size={12} fill={showFavoritesOnly ? 'white' : 'none'} />
                    <span>Favorites Only</span>
                  </button>
                  
                  {!isFullPage && (
                    <Button
                      size="sm"
                      onClick={() => window.open('/enhanced-schedule', '_blank')}
                      className="bg-orange-500 hover:bg-orange-600 text-white text-xs"
                    >
                      Full Schedule
                    </Button>
                  )}
                </div>
              </div>
              {/* Day Selector */}
              <div className="overflow-x-auto">
                <div className="flex space-x-2 pb-2">
                  {days.map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                        selectedDay === day 
                          ? 'bg-orange-500 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {day.substring(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div className="overflow-x-auto">
                <div className="flex space-x-2 pb-2">
                  <button
                    onClick={() => setSelectedType('All')}
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                      selectedType === 'All' 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    All
                  </button>
                  {Object.keys(PROGRAM_TYPES).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap flex items-center space-x-1 ${
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

              {/* Program List */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {getFilteredPrograms().length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <div className="mb-2">
                      {searchTerm ? <Search size={24} /> : showFavoritesOnly ? <Heart size={24} /> : <Calendar size={24} />}
                    </div>
                    <p className="text-sm">
                      {searchTerm 
                        ? `No programs found matching "${searchTerm}"` 
                        : showFavoritesOnly 
                        ? 'No favorite programs for this day' 
                        : 'No programs scheduled for this day'
                      }
                    </p>
                  </div>
                ) : (
                  getFilteredPrograms().map((program, index) => {
                    const isCurrent = currentProgram && currentProgram.name === program.name;
                    const typeConfig = PROGRAM_TYPES[program.type];
                    const isCurrentFavorite = isFavorite(program, selectedDay);
                    
                    return (
                      <div 
                        key={index} 
                        className={`p-3 rounded-lg border-l-4 ${typeConfig?.borderColor} ${
                          isCurrent 
                            ? 'bg-orange-500 text-white' 
                            : `${typeConfig?.bgLight} bg-opacity-10 text-gray-300`
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 flex-1">
                            {getProgramTypeIcon(program.type)}
                            <div className="flex-1">
                              <div className="text-sm font-medium">{program.name}</div>
                              <div className="text-xs opacity-75">with {program.presenter}</div>
                            </div>
                            {isCurrent && (
                              <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-xs font-bold bg-green-400 text-black px-1.5 py-0.5 rounded-full">LIVE</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="text-right">
                              <div className="text-xs font-medium">{program.time}</div>
                              <div className={`text-xs ${typeConfig?.textColor}`}>{program.type}</div>
                            </div>
                            <button
                              onClick={() => toggleFavorite(program, selectedDay)}
                              className={`p-1 rounded-full transition-colors ${
                                isCurrentFavorite 
                                  ? 'text-red-500 hover:text-red-400' 
                                  : 'text-gray-400 hover:text-red-500'
                              }`}
                            >
                              <Heart size={14} fill={isCurrentFavorite ? 'currentColor' : 'none'} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:block py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Radio className="text-orange-400 animate-pulse" size={20} />
              <span className="text-lg font-bold text-orange-400">ENHANCED VOX RADIO SCHEDULE</span>
              
              {currentProgram && (
                <div className="flex items-center space-x-2 bg-orange-500 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-bold text-white">NOW LIVE: {currentProgram.name}</span>
                  <Clock size={16} className="text-yellow-300" />
                </div>
              )}
            </div>

            {/* Desktop Search and Controls */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  type="text"
                  placeholder="Search programs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-10 w-64 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
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
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  showFavoritesOnly 
                    ? 'bg-red-500 text-white shadow-lg' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Heart size={16} fill={showFavoritesOnly ? 'white' : 'none'} />
                <span>Favorites ({favorites.length})</span>
              </button>
              
              {!isFullPage && (
                <Button
                  onClick={() => window.open('/enhanced-schedule', '_blank')}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Full Schedule View
                </Button>
              )}
            </div>
          </div>

          {/* Desktop Type Filter */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-gray-400" />
              <span className="text-sm text-gray-400">Filter by type:</span>
              <button
                onClick={() => setSelectedType('All')}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
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
                  className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${
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
            
            <div className="text-sm text-gray-400">
              Showing {getFilteredPrograms().length} programs for {selectedDay}
            </div>
          </div>

          {/* Desktop Day Tabs */}
          <div className="flex space-x-1 mb-4">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedDay === day 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Desktop Program Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${isFullPage ? 'max-h-screen' : 'max-h-96'} overflow-y-auto`}>
            {getFilteredPrograms().length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-400">
                <div className="mb-4">
                  {searchTerm ? <Search size={48} /> : showFavoritesOnly ? <Heart size={48} /> : <Calendar size={48} />}
                </div>
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
            ) : (
              getFilteredPrograms().map((program, index) => {
                const isCurrent = currentProgram && currentProgram.name === program.name;
                const typeConfig = PROGRAM_TYPES[program.type];
                const isCurrentFavorite = isFavorite(program, selectedDay);
                
                return (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg border-l-4 ${typeConfig?.borderColor} transition-all duration-300 relative group ${
                      isCurrent 
                        ? 'bg-orange-500 text-white shadow-lg scale-105' 
                        : `${typeConfig?.bgLight} bg-opacity-10 text-gray-300 hover:bg-opacity-20 hover:scale-102`
                    }`}
                  >
                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(program, selectedDay)}
                      className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-200 ${
                        isCurrentFavorite 
                          ? 'text-red-500 hover:text-red-400 bg-white bg-opacity-20' 
                          : 'text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      <Heart size={16} fill={isCurrentFavorite ? 'currentColor' : 'none'} />
                    </button>

                    <div className="flex items-start justify-between pr-8">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded ${typeConfig?.color} text-white`}>
                          {getProgramTypeIcon(program.type)}
                        </div>
                        <div>
                          <div className="font-medium text-lg">{program.name}</div>
                          <div className="text-sm opacity-75">with {program.presenter}</div>
                          <div className="text-sm font-medium mt-1">{program.time}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className={`text-xs px-2 py-1 rounded ${typeConfig?.color} text-white`}>
                        {program.type}
                      </div>
                      {isCurrent && (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-xs font-bold bg-green-400 text-black px-2 py-0.5 rounded-full">
                            LIVE NOW
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedProgramSchedule;