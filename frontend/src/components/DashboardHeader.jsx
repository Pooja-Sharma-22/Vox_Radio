import React, { useState, useEffect } from 'react';

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

const DashboardHeader = () => {
  const [currentProgram, setCurrentProgram] = useState(null);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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
      const activeProgram = getCurrentProgram();
      setCurrentProgram(activeProgram);
      
      // Debug logging (can be removed later)
      if (activeProgram) {
        console.log('Current program found:', activeProgram);
      } else {
        const now = new Date(new Date().toLocaleString("en-US", {timeZone: "Africa/Monrovia"}));
        const currentDay = days[now.getDay()];
        const currentHour = now.getHours();
        const currentMinutes = now.getMinutes();
        const currentTimeDecimal = currentHour + (currentMinutes / 60);
        console.log(`No current program. Day: ${currentDay}, Time: ${currentHour}:${currentMinutes} (${currentTimeDecimal})`);
      }
    }, 5000); // Check every 5 seconds

    // Initial check
    const initialProgram = getCurrentProgram();
    setCurrentProgram(initialProgram);
    if (initialProgram) {
      console.log('Initial program found:', initialProgram);
    }

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 sm:py-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center">Vox Radio Presenters Dashboard</h2>
          
          {/* Current Program and Presenter Display */}
          {currentProgram ? (
            <div className="mt-4 bg-black bg-opacity-20 rounded-lg px-4 py-3 mx-auto max-w-2xl">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <div className="text-center">
                  <div className="text-lg font-bold text-white">
                    NOW PLAYING: {currentProgram.name}
                  </div>
                  <div className="text-sm text-orange-100">
                    with {currentProgram.presenter} | {currentProgram.time}
                  </div>
                </div>
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          ) : (
            <div className="mt-4 bg-gray-800 bg-opacity-30 rounded-lg px-4 py-2 mx-auto max-w-2xl">
              <div className="text-center">
                <div className="text-sm text-orange-200">
                  {new Date(new Date().toLocaleString("en-US", {timeZone: "Africa/Monrovia"})).toLocaleString()} | 
                  Day: {days[new Date(new Date().toLocaleString("en-US", {timeZone: "Africa/Monrovia"})).getDay()]} | 
                  No program currently scheduled
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;