import React, { useState, useEffect, useMemo } from 'react';
import { Search, Download, Calendar, Clock, Filter, Users, Play, Book, MessageCircle, Star, Wifi, WifiOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useProgramSchedule } from '../hooks/useProgramSchedule.js';
import { formatMonrovia, formatMonroviaFull } from '../utils/timeUtils.js';
import { TIME_CONFIG } from '../config/timeConfig.js';

// Complete program schedule data from the Excel file
const programScheduleData = [
  // SUNDAY
  { Day: 'SUNDAY', 'Time (24h)': '00:00-05:00', Program: 'Music', 'Presenter(s)': '', Category: 'Music', timeSlot: 0, duration: 5 },
  { Day: 'SUNDAY', 'Time (24h)': '05:00-07:00', Program: 'Music and Talks', 'Presenter(s)': 'Emmanuel Lerpolu', Category: 'Music/Talk', timeSlot: 5, duration: 2 },
  { Day: 'SUNDAY', 'Time (24h)': '07:00-07:30', Program: 'Salvation Half Hour', 'Presenter(s)': 'Min. Cooper', Category: 'Bible Teaching', timeSlot: 7, duration: 0.5 },
  { Day: 'SUNDAY', 'Time (24h)': '07:30-08:00', Program: 'Music', 'Presenter(s)': 'Emmanuel Lerpolu', Category: 'Music', timeSlot: 7.5, duration: 0.5 },
  { Day: 'SUNDAY', 'Time (24h)': '08:00-10:00', Program: 'The Gospel Caravan', 'Presenter(s)': 'Emmanuel Lerpolu', Category: 'Bible Teaching', timeSlot: 8, duration: 2 },
  { Day: 'SUNDAY', 'Time (24h)': '10:00-15:00', Program: 'Music', 'Presenter(s)': '', Category: 'Music', timeSlot: 10, duration: 5 },
  { Day: 'SUNDAY', 'Time (24h)': '15:00-16:00', Program: 'Sunday Special', 'Presenter(s)': 'Beatrice Ballah', Category: 'Music/Talk', timeSlot: 15, duration: 1 },
  { Day: 'SUNDAY', 'Time (24h)': '16:00-18:00', Program: 'Music and Talks', 'Presenter(s)': 'Victoria Walker', Category: 'Music/Talk', timeSlot: 16, duration: 2 },
  { Day: 'SUNDAY', 'Time (24h)': '18:00-19:30', Program: 'Kids Hour', 'Presenter(s)': 'Victoria Walker', Category: 'Kids Teaching', timeSlot: 18, duration: 1.5 },
  { Day: 'SUNDAY', 'Time (24h)': '19:30-21:00', Program: 'Music', 'Presenter(s)': 'Maxim Somah', Category: 'Music', timeSlot: 19.5, duration: 1.5 },
  { Day: 'SUNDAY', 'Time (24h)': '21:00-22:00', Program: 'Search The Scriptures', 'Presenter(s)': 'Maxim Somah', Category: 'Bible Teaching', timeSlot: 21, duration: 1 },
  { Day: 'SUNDAY', 'Time (24h)': '22:00-00:00', Program: 'Music', 'Presenter(s)': '', Category: 'Music', timeSlot: 22, duration: 2 },

  // MONDAY
  { Day: 'MONDAY', 'Time (24h)': '00:00-00:30', Program: 'Music', 'Presenter(s)': '', Category: 'Music', timeSlot: 0, duration: 0.5 },
  { Day: 'MONDAY', 'Time (24h)': '00:30-04:30', Program: 'International Kapoa Secure Liberia', 'Presenter(s)': 'Sam W. Doe', Category: 'Community', timeSlot: 0.5, duration: 4 },
  { Day: 'MONDAY', 'Time (24h)': '04:30-05:00', Program: 'Thru the Bible', 'Presenter(s)': 'Dr. J. Vernon McGee', Category: 'Bible Teaching', timeSlot: 4.5, duration: 0.5 },
  { Day: 'MONDAY', 'Time (24h)': '05:00-08:00', Program: 'The Quiet Storm', 'Presenter(s)': 'Justus Owaka', Category: 'New Life Africa', timeSlot: 5, duration: 3 },
  { Day: 'MONDAY', 'Time (24h)': '08:00-09:00', Program: 'Good Shepherd Fellowship', 'Presenter(s)': 'Bishop Thomas', Category: 'Bible Teaching', timeSlot: 8, duration: 1 },
  { Day: 'MONDAY', 'Time (24h)': '09:00-10:00', Program: 'Living Word', 'Presenter(s)': 'Dr Mensah Otabil', Category: 'Bible Teaching', timeSlot: 9, duration: 1 },
  { Day: 'MONDAY', 'Time (24h)': '10:00-10:10', Program: 'Jingles and Music', 'Presenter(s)': 'Deddeh Gayflor', Category: 'Music', timeSlot: 10, duration: 0.17 },
  { Day: 'MONDAY', 'Time (24h)': '10:10-10:20', Program: 'Announcement', 'Presenter(s)': 'Deddeh Gayflor', Category: 'Announcement', timeSlot: 10.17, duration: 0.17 },
  { Day: 'MONDAY', 'Time (24h)': '10:20-10:45', Program: 'Back To The Bible Canada', 'Presenter(s)': 'Dr. John Neufeld', Category: 'Bible Teaching', timeSlot: 10.33, duration: 0.42 },
  { Day: 'MONDAY', 'Time (24h)': '10:45-11:00', Program: 'Music', 'Presenter(s)': 'Deddeh Gayflor', Category: 'Music', timeSlot: 10.75, duration: 0.25 },
  { Day: 'MONDAY', 'Time (24h)': '11:00-13:00', Program: 'Worship Connexion', 'Presenter(s)': 'New Life Africa / TWR', Category: 'Music', timeSlot: 11, duration: 2 },
  { Day: 'MONDAY', 'Time (24h)': '13:00-13:05', Program: 'Word To Go', 'Presenter(s)': 'Dr Mensah Otabil', Category: 'Bible Teaching', timeSlot: 13, duration: 0.08 },
  { Day: 'MONDAY', 'Time (24h)': '13:05-15:00', Program: 'Launch Time Connection', 'Presenter(s)': 'Deddeh Gayflor', Category: 'Talk Show', timeSlot: 13.08, duration: 1.92 },
  { Day: 'MONDAY', 'Time (24h)': '15:00-16:30', Program: 'The Heart Beat', 'Presenter(s)': 'Various', Category: 'Music', timeSlot: 15, duration: 1.5 },
  { Day: 'MONDAY', 'Time (24h)': '16:30-17:30', Program: 'Thru The Bible', 'Presenter(s)': 'Dr. J. Vernon McGee', Category: 'Bible Teaching', timeSlot: 16.5, duration: 1 },
  { Day: 'MONDAY', 'Time (24h)': '17:30-17:45', Program: 'Music', 'Presenter(s)': 'Emmanuel Lepolu', Category: 'Music', timeSlot: 17.5, duration: 0.25 },
  { Day: 'MONDAY', 'Time (24h)': '17:45-18:00', Program: 'Announcement', 'Presenter(s)': 'Emmanuel Lepolu', Category: 'Announcement', timeSlot: 17.75, duration: 0.25 },
  { Day: 'MONDAY', 'Time (24h)': '18:00-18:30', Program: 'Major Headlines', 'Presenter(s)': 'Emmanuel Lepolu', Category: 'News', timeSlot: 18, duration: 0.5 },
  { Day: 'MONDAY', 'Time (24h)': '18:30-19:30', Program: 'Music', 'Presenter(s)': 'Emmanuel Lepolu', Category: 'Music', timeSlot: 18.5, duration: 1 },
  { Day: 'MONDAY', 'Time (24h)': '19:30-20:45', Program: 'Vox Talk', 'Presenter(s)': 'Maxim and Sam', Category: 'Talk Show', timeSlot: 19.5, duration: 1.25 },
  { Day: 'MONDAY', 'Time (24h)': '20:45-21:00', Program: 'Announcement', 'Presenter(s)': 'Sam', Category: 'Announcement', timeSlot: 20.75, duration: 0.25 },
  { Day: 'MONDAY', 'Time (24h)': '21:00-22:00', Program: 'Vox Prayer Night', 'Presenter(s)': 'Leone Moore', Category: 'Prayer', timeSlot: 21, duration: 1 },
  { Day: 'MONDAY', 'Time (24h)': '22:00-23:00', Program: 'The Night Ride', 'Presenter(s)': 'Sam W. Doe', Category: 'Music', timeSlot: 22, duration: 1 },
  { Day: 'MONDAY', 'Time (24h)': '23:00-00:00', Program: 'Music', 'Presenter(s)': 'Sam W. Doe', Category: 'Music', timeSlot: 23, duration: 1 },

  // TUESDAY
  { Day: 'TUESDAY', 'Time (24h)': '00:00-00:30', Program: 'Music', 'Presenter(s)': '', Category: 'Music', timeSlot: 0, duration: 0.5 },
  { Day: 'TUESDAY', 'Time (24h)': '00:30-04:30', Program: 'International Kapoa Secure Liberia', 'Presenter(s)': 'Sam W. Doe', Category: 'Community', timeSlot: 0.5, duration: 4 },
  { Day: 'TUESDAY', 'Time (24h)': '04:30-05:00', Program: 'Thru the Bible', 'Presenter(s)': 'Dr. J. Vernon McGee', Category: 'Bible Teaching', timeSlot: 4.5, duration: 0.5 },
  { Day: 'TUESDAY', 'Time (24h)': '05:00-08:00', Program: 'The Quiet Storm', 'Presenter(s)': 'Justus Owaka', Category: 'New Life Africa', timeSlot: 5, duration: 3 },
  { Day: 'TUESDAY', 'Time (24h)': '08:00-09:00', Program: 'Good Shepherd Fellowship', 'Presenter(s)': 'Bishop Thomas', Category: 'Bible Teaching', timeSlot: 8, duration: 1 },
  { Day: 'TUESDAY', 'Time (24h)': '09:00-10:00', Program: 'Living Word', 'Presenter(s)': 'Dr Mensah Otabil', Category: 'Bible Teaching', timeSlot: 9, duration: 1 },
  { Day: 'TUESDAY', 'Time (24h)': '10:00-10:10', Program: 'Jingles and Music', 'Presenter(s)': 'Emmanuel Lepolu', Category: 'Music', timeSlot: 10, duration: 0.17 },
  { Day: 'TUESDAY', 'Time (24h)': '10:10-10:20', Program: 'Announcement', 'Presenter(s)': 'Emmanuel Lepolu', Category: 'Announcement', timeSlot: 10.17, duration: 0.17 },
  { Day: 'TUESDAY', 'Time (24h)': '10:20-10:45', Program: 'Back To The Bible Canada', 'Presenter(s)': 'Dr. John Neufeld', Category: 'Bible Teaching', timeSlot: 10.33, duration: 0.42 },
  { Day: 'TUESDAY', 'Time (24h)': '10:45-11:00', Program: 'Music', 'Presenter(s)': 'Emmanuel Lepolu', Category: 'Music', timeSlot: 10.75, duration: 0.25 },
  { Day: 'TUESDAY', 'Time (24h)': '11:00-13:00', Program: 'Worship Connexion', 'Presenter(s)': 'New Life Africa / TWR', Category: 'Music', timeSlot: 11, duration: 2 },
  { Day: 'TUESDAY', 'Time (24h)': '13:00-13:05', Program: 'Word To Go', 'Presenter(s)': 'Dr Mensah Otabil', Category: 'Bible Teaching', timeSlot: 13, duration: 0.08 },
  { Day: 'TUESDAY', 'Time (24h)': '13:05-15:00', Program: 'Launch Time Connection', 'Presenter(s)': 'Beauty Nuah', Category: 'Talk Show', timeSlot: 13.08, duration: 1.92 },
  { Day: 'TUESDAY', 'Time (24h)': '15:00-16:30', Program: 'The Heart Beat', 'Presenter(s)': 'Various', Category: 'Music', timeSlot: 15, duration: 1.5 },
  { Day: 'TUESDAY', 'Time (24h)': '16:30-17:30', Program: 'Thru The Bible', 'Presenter(s)': 'Dr. J. Vernon McGee', Category: 'Bible Teaching', timeSlot: 16.5, duration: 1 },
  { Day: 'TUESDAY', 'Time (24h)': '17:30-17:45', Program: 'Music', 'Presenter(s)': 'Beatrice Ballah', Category: 'Music', timeSlot: 17.5, duration: 0.25 },
  { Day: 'TUESDAY', 'Time (24h)': '17:45-18:00', Program: 'Announcement', 'Presenter(s)': 'Beatrice Ballah', Category: 'Announcement', timeSlot: 17.75, duration: 0.25 },
  { Day: 'TUESDAY', 'Time (24h)': '18:00-19:00', Program: 'She Speaks Up', 'Presenter(s)': 'Beatrice Ballah', Category: 'Talk Show', timeSlot: 18, duration: 1 },
  { Day: 'TUESDAY', 'Time (24h)': '19:00-19:30', Program: 'Music', 'Presenter(s)': 'Maxim Somah', Category: 'Music', timeSlot: 19, duration: 0.5 },
  { Day: 'TUESDAY', 'Time (24h)': '19:30-20:45', Program: 'Vox Talk', 'Presenter(s)': 'Maxim and Sam', Category: 'Talk Show', timeSlot: 19.5, duration: 1.25 },
  { Day: 'TUESDAY', 'Time (24h)': '20:45-21:00', Program: 'Announcement', 'Presenter(s)': 'Various', Category: 'Announcement', timeSlot: 20.75, duration: 0.25 },
  { Day: 'TUESDAY', 'Time (24h)': '21:00-22:00', Program: 'Vox Prayer Night', 'Presenter(s)': 'Leone Moore', Category: 'Prayer', timeSlot: 21, duration: 1 },
  { Day: 'TUESDAY', 'Time (24h)': '22:00-00:00', Program: 'Music', 'Presenter(s)': 'Maxim Somah', Category: 'Music', timeSlot: 22, duration: 2 },

  // WEDNESDAY
  { Day: 'WEDNESDAY', 'Time (24h)': '00:00-00:30', Program: 'Music', 'Presenter(s)': '', Category: 'Music', timeSlot: 0, duration: 0.5 },
  { Day: 'WEDNESDAY', 'Time (24h)': '00:30-04:30', Program: 'International Kapoa Secure Liberia', 'Presenter(s)': 'Maxim Somah', Category: 'Community', timeSlot: 0.5, duration: 4 },
  { Day: 'WEDNESDAY', 'Time (24h)': '04:30-05:00', Program: 'Thru the Bible', 'Presenter(s)': 'Dr. J. Vernon McGee', Category: 'Bible Teaching', timeSlot: 4.5, duration: 0.5 },
  { Day: 'WEDNESDAY', 'Time (24h)': '05:00-08:00', Program: 'The Quiet Storm', 'Presenter(s)': 'Justus Owaka', Category: 'New Life Africa', timeSlot: 5, duration: 3 },
  { Day: 'WEDNESDAY', 'Time (24h)': '08:00-09:00', Program: 'Good Shepherd Fellowship', 'Presenter(s)': 'Bishop Thomas', Category: 'Bible Teaching', timeSlot: 8, duration: 1 },
  { Day: 'WEDNESDAY', 'Time (24h)': '09:00-10:00', Program: 'Living Word', 'Presenter(s)': 'Dr Mensah Otabil', Category: 'Bible Teaching', timeSlot: 9, duration: 1 },
  { Day: 'WEDNESDAY', 'Time (24h)': '10:00-10:10', Program: 'Jingles and Music', 'Presenter(s)': 'Emmanuel Lepolu', Category: 'Music', timeSlot: 10, duration: 0.17 },
  { Day: 'WEDNESDAY', 'Time (24h)': '10:10-10:20', Program: 'Announcement', 'Presenter(s)': 'Emmanuel Lepolu', Category: 'Announcement', timeSlot: 10.17, duration: 0.17 },
  { Day: 'WEDNESDAY', 'Time (24h)': '10:20-10:45', Program: 'New Day Hour', 'Presenter(s)': 'Pastor Fatorma', Category: 'Bible Teaching', timeSlot: 10.33, duration: 0.42 },
  { Day: 'WEDNESDAY', 'Time (24h)': '10:45-11:00', Program: 'Music', 'Presenter(s)': 'T. KCalvin Walter', Category: 'Music', timeSlot: 10.75, duration: 0.25 },
  { Day: 'WEDNESDAY', 'Time (24h)': '11:00-13:00', Program: 'Worship Connexion', 'Presenter(s)': 'New Life Africa / TWR', Category: 'Music', timeSlot: 11, duration: 2 },
  { Day: 'WEDNESDAY', 'Time (24h)': '13:00-13:05', Program: 'Word To Go', 'Presenter(s)': 'Dr Mensah Otabil', Category: 'Bible Teaching', timeSlot: 13, duration: 0.08 },
  { Day: 'WEDNESDAY', 'Time (24h)': '13:05-15:00', Program: 'Launch Time Connection', 'Presenter(s)': 'Beauty Nuah', Category: 'Talk Show', timeSlot: 13.08, duration: 1.92 },
  { Day: 'WEDNESDAY', 'Time (24h)': '15:00-16:30', Program: 'The Heart Beat', 'Presenter(s)': 'Various', Category: 'Music', timeSlot: 15, duration: 1.5 },
  { Day: 'WEDNESDAY', 'Time (24h)': '16:30-17:30', Program: 'Thru The Bible', 'Presenter(s)': 'Dr. J. Vernon McGee', Category: 'Bible Teaching', timeSlot: 16.5, duration: 1 },
  { Day: 'WEDNESDAY', 'Time (24h)': '17:30-17:45', Program: 'Music', 'Presenter(s)': 'Victoria Walker', Category: 'Music', timeSlot: 17.5, duration: 0.25 },
  { Day: 'WEDNESDAY', 'Time (24h)': '17:45-18:00', Program: 'Announcement', 'Presenter(s)': 'Victoria Walker', Category: 'Announcement', timeSlot: 17.75, duration: 0.25 },
  { Day: 'WEDNESDAY', 'Time (24h)': '18:00-19:15', Program: 'Music', 'Presenter(s)': 'Victoria Walker', Category: 'Music', timeSlot: 18, duration: 1.25 },
  { Day: 'WEDNESDAY', 'Time (24h)': '19:15-20:45', Program: 'Ladies Let\'s Talk', 'Presenter(s)': 'Victoria Walker', Category: 'Talk Show', timeSlot: 19.25, duration: 1.5 },
  { Day: 'WEDNESDAY', 'Time (24h)': '20:45-21:00', Program: 'Announcement', 'Presenter(s)': 'Victoria Walker', Category: 'Announcement', timeSlot: 20.75, duration: 0.25 },
  { Day: 'WEDNESDAY', 'Time (24h)': '21:00-22:00', Program: 'Vox Prayer Night', 'Presenter(s)': 'Leone Moore', Category: 'Prayer', timeSlot: 21, duration: 1 },
  { Day: 'WEDNESDAY', 'Time (24h)': '22:00-00:00', Program: 'Music', 'Presenter(s)': 'Emmanuel Howard', Category: 'Music', timeSlot: 22, duration: 2 },

  // THURSDAY
  { Day: 'THURSDAY', 'Time (24h)': '00:00-00:30', Program: 'Music', 'Presenter(s)': '', Category: 'Music', timeSlot: 0, duration: 0.5 },
  { Day: 'THURSDAY', 'Time (24h)': '00:30-04:30', Program: 'International Kapoa Secure Liberia', 'Presenter(s)': 'Emmanuel Howard', Category: 'Community', timeSlot: 0.5, duration: 4 },
  { Day: 'THURSDAY', 'Time (24h)': '04:30-05:00', Program: 'Thru the Bible', 'Presenter(s)': 'Dr. J. Vernon McGee', Category: 'Bible Teaching', timeSlot: 4.5, duration: 0.5 },
  { Day: 'THURSDAY', 'Time (24h)': '05:00-08:00', Program: 'The Quiet Storm', 'Presenter(s)': 'Justus Owaka', Category: 'New Life Africa', timeSlot: 5, duration: 3 },
  { Day: 'THURSDAY', 'Time (24h)': '08:00-09:00', Program: 'Good Shepherd Fellowship', 'Presenter(s)': 'Bishop Thomas', Category: 'Bible Teaching', timeSlot: 8, duration: 1 },
  { Day: 'THURSDAY', 'Time (24h)': '09:00-10:00', Program: 'Living Word', 'Presenter(s)': 'Dr Mensah Otabil', Category: 'Bible Teaching', timeSlot: 9, duration: 1 },
  { Day: 'THURSDAY', 'Time (24h)': '10:00-10:10', Program: 'Jingles and Music', 'Presenter(s)': 'Emmanuel Lepolu', Category: 'Music', timeSlot: 10, duration: 0.17 },
  { Day: 'THURSDAY', 'Time (24h)': '10:10-10:20', Program: 'Announcement', 'Presenter(s)': 'Emmanuel Lepolu', Category: 'Announcement', timeSlot: 10.17, duration: 0.17 },
  { Day: 'THURSDAY', 'Time (24h)': '10:20-11:00', Program: 'Music', 'Presenter(s)': 'Deddeh Gayflor', Category: 'Music', timeSlot: 10.33, duration: 0.67 },
  { Day: 'THURSDAY', 'Time (24h)': '11:00-13:00', Program: 'Worship Connexion', 'Presenter(s)': 'New Life Africa / TWR', Category: 'Music', timeSlot: 11, duration: 2 },
  { Day: 'THURSDAY', 'Time (24h)': '13:00-13:05', Program: 'Word To Go', 'Presenter(s)': 'Dr Mensah Otabil', Category: 'Bible Teaching', timeSlot: 13, duration: 0.08 },
  { Day: 'THURSDAY', 'Time (24h)': '13:05-15:00', Program: 'Launch Time Connect', 'Presenter(s)': 'Deddeh Gayflor', Category: 'Talk Show', timeSlot: 13.08, duration: 1.92 },
  { Day: 'THURSDAY', 'Time (24h)': '15:00-16:30', Program: 'The Heart Beat', 'Presenter(s)': 'Various', Category: 'Music', timeSlot: 15, duration: 1.5 },
  { Day: 'THURSDAY', 'Time (24h)': '16:30-17:30', Program: 'Thru The Bible', 'Presenter(s)': 'Dr. J. Vernon McGee', Category: 'Bible Teaching', timeSlot: 16.5, duration: 1 },
  { Day: 'THURSDAY', 'Time (24h)': '17:30-17:45', Program: 'Music', 'Presenter(s)': 'Beauty Nuah', Category: 'Music', timeSlot: 17.5, duration: 0.25 },
  { Day: 'THURSDAY', 'Time (24h)': '17:45-18:00', Program: 'Announcement', 'Presenter(s)': 'Beauty Nuah', Category: 'Announcement', timeSlot: 17.75, duration: 0.25 },
  { Day: 'THURSDAY', 'Time (24h)': '18:00-19:00', Program: 'Teenagers Talk', 'Presenter(s)': 'Beauty Nuah', Category: 'Talk Show', timeSlot: 18, duration: 1 },
  { Day: 'THURSDAY', 'Time (24h)': '19:00-19:30', Program: 'Music', 'Presenter(s)': 'Sam W. Doe', Category: 'Music', timeSlot: 19, duration: 0.5 },
  { Day: 'THURSDAY', 'Time (24h)': '19:30-20:45', Program: 'Vox Talk', 'Presenter(s)': 'Maxim And Sam', Category: 'Talk Show', timeSlot: 19.5, duration: 1.25 },
  { Day: 'THURSDAY', 'Time (24h)': '20:45-21:00', Program: 'Announcement', 'Presenter(s)': 'Maxim Somah', Category: 'Announcement', timeSlot: 20.75, duration: 0.25 },
  { Day: 'THURSDAY', 'Time (24h)': '21:00-22:00', Program: 'Vox Prayer Night', 'Presenter(s)': 'Leone Moore', Category: 'Prayer', timeSlot: 21, duration: 1 },
  { Day: 'THURSDAY', 'Time (24h)': '22:00-00:00', Program: 'Music', 'Presenter(s)': 'Sam W. Doe', Category: 'Music', timeSlot: 22, duration: 2 },

  // FRIDAY
  { Day: 'FRIDAY', 'Time (24h)': '00:00-00:30', Program: 'Music', 'Presenter(s)': '', Category: 'Music', timeSlot: 0, duration: 0.5 },
  { Day: 'FRIDAY', 'Time (24h)': '00:30-04:30', Program: 'International Kapoa Secure Liberia', 'Presenter(s)': 'Maxim Somah and Sam W. Doe', Category: 'Community', timeSlot: 0.5, duration: 4 },
  { Day: 'FRIDAY', 'Time (24h)': '04:30-05:00', Program: 'Thru the Bible', 'Presenter(s)': 'Dr. J. Vernon McGee', Category: 'Bible Teaching', timeSlot: 4.5, duration: 0.5 },
  { Day: 'FRIDAY', 'Time (24h)': '05:00-08:00', Program: 'The Quiet Storm', 'Presenter(s)': 'Justus Owaka', Category: 'New Life Africa', timeSlot: 5, duration: 3 },
  { Day: 'FRIDAY', 'Time (24h)': '08:00-09:00', Program: 'Good Shepherd Fellowship', 'Presenter(s)': 'Bishop Thomas', Category: 'Bible Teaching', timeSlot: 8, duration: 1 },
  { Day: 'FRIDAY', 'Time (24h)': '09:00-10:00', Program: 'Living Word', 'Presenter(s)': 'Dr Mensah Otabil', Category: 'Bible Teaching', timeSlot: 9, duration: 1 },
  { Day: 'FRIDAY', 'Time (24h)': '10:00-10:10', Program: 'Jingles and Music', 'Presenter(s)': 'Maxim Somah', Category: 'Music', timeSlot: 10, duration: 0.17 },
  { Day: 'FRIDAY', 'Time (24h)': '10:10-10:20', Program: 'Announcement', 'Presenter(s)': 'Maxim Somah', Category: 'Announcement', timeSlot: 10.17, duration: 0.17 },
  { Day: 'FRIDAY', 'Time (24h)': '10:20-11:00', Program: 'Music', 'Presenter(s)': 'Maxim Somah', Category: 'Music', timeSlot: 10.33, duration: 0.67 },
  { Day: 'FRIDAY', 'Time (24h)': '11:00-13:00', Program: 'Worship Connexion', 'Presenter(s)': 'New Life Africa / TWR', Category: 'Music', timeSlot: 11, duration: 2 },
  { Day: 'FRIDAY', 'Time (24h)': '13:00-13:05', Program: 'Word To Go', 'Presenter(s)': 'Dr Mensah Otabil', Category: 'Bible Teaching', timeSlot: 13, duration: 0.08 },
  { Day: 'FRIDAY', 'Time (24h)': '13:05-15:00', Program: 'Launch Time Connect', 'Presenter(s)': 'Maxim Somah', Category: 'Talk Show', timeSlot: 13.08, duration: 1.92 },
  { Day: 'FRIDAY', 'Time (24h)': '15:00-15:20', Program: 'Music', 'Presenter(s)': 'Various', Category: 'Music', timeSlot: 15, duration: 0.33 },
  { Day: 'FRIDAY', 'Time (24h)': '15:20-15:24', Program: 'Guidelines For Living', 'Presenter(s)': 'Guidelines International', Category: 'Bible Teaching', timeSlot: 15.33, duration: 0.07 },
  { Day: 'FRIDAY', 'Time (24h)': '15:24-16:00', Program: 'The Heart Beat', 'Presenter(s)': 'Various', Category: 'Music', timeSlot: 15.4, duration: 0.6 },
  { Day: 'FRIDAY', 'Time (24h)': '16:00-17:00', Program: 'The Drug Show', 'Presenter(s)': 'Sam W. Doe', Category: 'Talk Show', timeSlot: 16, duration: 1 },
  { Day: 'FRIDAY', 'Time (24h)': '17:00-18:00', Program: 'Trenz At 10', 'Presenter(s)': 'T. KCalvin Walter', Category: 'Talk Show', timeSlot: 17, duration: 1 },
  { Day: 'FRIDAY', 'Time (24h)': '18:00-19:00', Program: 'The Living Proof', 'Presenter(s)': 'T. KCalvin Walter', Category: 'Bible Teaching', timeSlot: 18, duration: 1 },
  { Day: 'FRIDAY', 'Time (24h)': '19:00-20:45', Program: 'Music', 'Presenter(s)': 'T. KCalvin Walter', Category: 'Music', timeSlot: 19, duration: 1.75 },
  { Day: 'FRIDAY', 'Time (24h)': '20:45-21:00', Program: 'Announcement', 'Presenter(s)': 'T. KCalvin Walter', Category: 'Announcement', timeSlot: 20.75, duration: 0.25 },
  { Day: 'FRIDAY', 'Time (24h)': '21:00-22:00', Program: 'The Conversation', 'Presenter(s)': 'T. KCalvin Walter', Category: 'Talk Show', timeSlot: 21, duration: 1 },
  { Day: 'FRIDAY', 'Time (24h)': '22:00-00:00', Program: 'Music', 'Presenter(s)': 'T. KCalvin Walter', Category: 'Music', timeSlot: 22, duration: 2 },

  // SATURDAY
  { Day: 'SATURDAY', 'Time (24h)': '00:00-00:30', Program: 'Music', 'Presenter(s)': '', Category: 'Music', timeSlot: 0, duration: 0.5 },
  { Day: 'SATURDAY', 'Time (24h)': '00:30-04:30', Program: 'International Kapoa Secure Liberia', 'Presenter(s)': 'T. KCalvin Walter', Category: 'Community', timeSlot: 0.5, duration: 4 },
  { Day: 'SATURDAY', 'Time (24h)': '05:00-07:00', Program: 'Music', 'Presenter(s)': 'T. KCalvin Walter', Category: 'Music', timeSlot: 5, duration: 2 },
  { Day: 'SATURDAY', 'Time (24h)': '07:00-08:30', Program: 'The Morning Jam', 'Presenter(s)': 'T. KCalvin Walter', Category: 'Music', timeSlot: 7, duration: 1.5 },
  { Day: 'SATURDAY', 'Time (24h)': '08:30-09:00', Program: 'Music', 'Presenter(s)': 'T. KCalvin Walter', Category: 'Music', timeSlot: 8.5, duration: 0.5 },
  { Day: 'SATURDAY', 'Time (24h)': '09:00-10:15', Program: 'Vox Sports DESK', 'Presenter(s)': 'T. KCalvin Walter and Emmanuel', Category: 'Sports', timeSlot: 9, duration: 1.25 },
  { Day: 'SATURDAY', 'Time (24h)': '10:15-11:15', Program: 'Teenagers Talk', 'Presenter(s)': 'Janet and D\'Alessandro', Category: 'Talk Show', timeSlot: 10.25, duration: 1 },
  { Day: 'SATURDAY', 'Time (24h)': '11:15-13:00', Program: 'Music', 'Presenter(s)': 'Various', Category: 'Music', timeSlot: 11.25, duration: 1.75 },
  { Day: 'SATURDAY', 'Time (24h)': '13:00-13:30', Program: 'Truth For Life', 'Presenter(s)': 'Alistair Begg', Category: 'Bible Teaching', timeSlot: 13, duration: 0.5 },
  { Day: 'SATURDAY', 'Time (24h)': '13:30-14:00', Program: 'Planet Sports', 'Presenter(s)': 'Steve Vickers', Category: 'Sports', timeSlot: 13.5, duration: 0.5 },
  { Day: 'SATURDAY', 'Time (24h)': '14:00-16:00', Program: 'Island Praise', 'Presenter(s)': 'Stacy Rose', Category: 'Music', timeSlot: 14, duration: 2 },
  { Day: 'SATURDAY', 'Time (24h)': '16:00-19:00', Program: 'Blessed Beatz', 'Presenter(s)': 'New Life Africa', Category: 'Music', timeSlot: 16, duration: 3 },
  { Day: 'SATURDAY', 'Time (24h)': '19:00-00:00', Program: 'Transformed DJ', 'Presenter(s)': 'New Life Africa', Category: 'Music', timeSlot: 19, duration: 5 }
];

const VoxRadioProgramLog = ({ isFullPage = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDay, setSelectedDay] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState('time');
  const [favorites, setFavorites] = useState(new Set());

  // Use the program schedule hook for proper Monrovia time handling
  const { 
    currentProgram, 
    nextProgram, 
    countdown,
    isProgramLive,
    isServerTimeSynced 
  } = useProgramSchedule(programScheduleData);

  // Get unique days and categories for filters
  const uniqueDays = ['ALL', ...new Set(programScheduleData.map(item => item.Day))];
  const uniqueCategories = ['ALL', ...new Set(programScheduleData.map(item => item.Category).filter(Boolean))];

  // Filter and sort programs
  const filteredPrograms = useMemo(() => {
    let filtered = programScheduleData.filter(program => {
      const matchesSearch = program.Program.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          program['Presenter(s)'].toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (program.Category && program.Category.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesDay = selectedDay === 'ALL' || program.Day === selectedDay;
      const matchesCategory = selectedCategory === 'ALL' || program.Category === selectedCategory;
      
      return matchesSearch && matchesDay && matchesCategory;
    });

    // Sort programs
    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'time':
          if (a.Day !== b.Day) {
            const dayOrder = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
            return dayOrder.indexOf(a.Day) - dayOrder.indexOf(b.Day);
          }
          return a.timeSlot - b.timeSlot;
        case 'program':
          return a.Program.localeCompare(b.Program);
        case 'presenter':
          return a['Presenter(s)'].localeCompare(b['Presenter(s)']);
        case 'category':
          return (a.Category || '').localeCompare(b.Category || '');
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedDay, selectedCategory, sortBy]);

  // Get upcoming programs (next 3 programs) using the hook's next program
  const getUpcomingPrograms = () => {
    if (!nextProgram) return [];
    
    // Get the next few programs after the next program
    const dayOrder = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const nextDay = nextProgram.Day;
    const nextTimeSlot = nextProgram.timeSlot;
    
    // Get programs starting after next program on same day
    let upcoming = [nextProgram];
    const sameDayPrograms = programScheduleData
      .filter(program => program.Day === nextDay && program.timeSlot > nextTimeSlot)
      .sort((a, b) => a.timeSlot - b.timeSlot)
      .slice(0, 2);
    
    upcoming = upcoming.concat(sameDayPrograms);
    
    // If we need more programs, get from next day
    if (upcoming.length < 3) {
      const dayAfterIndex = (dayOrder.indexOf(nextDay) + 1) % 7;
      const dayAfter = dayOrder[dayAfterIndex];
      const dayAfterPrograms = programScheduleData
        .filter(program => program.Day === dayAfter)
        .sort((a, b) => a.timeSlot - b.timeSlot)
        .slice(0, 3 - upcoming.length);
      
      upcoming = upcoming.concat(dayAfterPrograms);
    }
    
    return upcoming.slice(0, 3);
  };

  const upcomingPrograms = getUpcomingPrograms();

  const toggleFavorite = (programId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(programId)) {
      newFavorites.delete(programId);
    } else {
      newFavorites.add(programId);
    }
    setFavorites(newFavorites);
  };

  const downloadSchedule = () => {
    const csvContent = [
      ['Day', 'Time', 'Program', 'Presenter', 'Category'],
      ...filteredPrograms.map(program => [
        program.Day,
        program['Time (24h)'],
        program.Program,
        program['Presenter(s)'],
        program.Category || ''
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vox-radio-program-schedule.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Bible Teaching': 'bg-blue-100 text-blue-800',
      'Music': 'bg-green-100 text-green-800',
      'Talk Show': 'bg-purple-100 text-purple-800',
      'Community': 'bg-orange-100 text-orange-800',
      'New Life Africa': 'bg-teal-100 text-teal-800',
      'Prayer': 'bg-pink-100 text-pink-800',
      'Sports': 'bg-red-100 text-red-800',
      'News': 'bg-gray-100 text-gray-800',
      'Kids Teaching': 'bg-yellow-100 text-yellow-800',
      'Music/Talk': 'bg-indigo-100 text-indigo-800',
      'Announcement': 'bg-slate-100 text-slate-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-600';
  };

  const getProgramId = (program) => {
    return `${program.Day}-${program.timeSlot}-${program.Program}`;
  };

  return (
    <div className={`${isFullPage ? 'min-h-screen' : ''} p-4 sm:p-6`}>
      {!isFullPage && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Book className="mr-3 text-orange-600" size={28} />
              Vox Radio 24/7 Program Log
            </h2>
            <div className="flex items-center text-sm text-gray-600">
              {isServerTimeSynced ? (
                <><Wifi size={16} className="mr-1 text-green-600" />Server Synced</>
              ) : (
                <><WifiOff size={16} className="mr-1 text-yellow-600" />Local Time</>
              )}
            </div>
          </div>
          <p className="text-gray-600">
            Complete weekly program schedule with search and filter capabilities
            <span className="ml-2 text-sm text-gray-500">
              • All times in {TIME_CONFIG.LABEL_TZ} (Africa/Monrovia)
            </span>
          </p>
        </div>
      )}

      {/* Search and Filter Controls */}
      <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search programs, presenters, categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            {uniqueDays.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            {uniqueCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="time">Sort by Time</option>
            <option value="program">Sort by Program</option>
            <option value="presenter">Sort by Presenter</option>
            <option value="category">Sort by Category</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <Button
            onClick={downloadSchedule}
            size="sm"
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            <Download size={16} className="mr-2" />
            Download CSV
          </Button>
          
          <div className="flex items-center text-sm text-gray-600">
            <Calendar size={16} className="mr-2" />
            {filteredPrograms.length} programs found
          </div>
        </div>
      </div>

      {/* LIVE NOW and Upcoming Programs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Current Program - LIVE NOW */}
        {currentProgram && (
          <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
            <div className="flex items-center mb-3" role="status" aria-live="polite">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
              <h3 className="font-bold text-red-900 text-lg">LIVE NOW</h3>
            </div>
            <div className="bg-white rounded-lg p-3 border border-red-200">
              <div className="font-bold text-gray-900 text-lg">{currentProgram.Program}</div>
              <div className="text-sm text-gray-600 mt-1">— {currentProgram['Presenter(s)']}</div>
              <div className="text-xs text-red-600 mt-2" title={`Full schedule: ${formatMonroviaFull(new Date())}`}>
                {currentProgram.Day} • {currentProgram['Time (24h)']} GMT
              </div>
              {currentProgram.Category && (
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${getCategoryColor(currentProgram.Category)}`}>
                  {currentProgram.Category}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Next Program with Countdown */}
        {nextProgram && (
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-orange-900 flex items-center">
                <Clock size={20} className="mr-2" />
                NEXT UP
              </h3>
              {countdown && countdown.formatted !== 'Starting now' && (
                <span className="bg-orange-200 text-orange-800 px-2 py-1 rounded-full text-xs font-bold">
                  in {countdown.formatted}
                </span>
              )}
            </div>
            <div className="bg-white rounded-lg p-3 border border-orange-200">
              <div className="font-medium text-gray-900">{nextProgram.Program}</div>
              <div className="text-sm text-gray-600 mt-1">— {nextProgram['Presenter(s)']}</div>
              <div className="text-xs text-orange-600 mt-2" title={`Starts at ${nextProgram['Time (24h)']} Africa/Monrovia`}>
                {nextProgram.Day} • {nextProgram['Time (24h)']} GMT
              </div>
              {nextProgram.Category && (
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${getCategoryColor(nextProgram.Category)}`}>
                  {nextProgram.Category}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Additional Upcoming Programs */}
      {upcomingPrograms.length > 1 && (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 mb-6 border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
            <Calendar size={20} className="mr-2" />
            Coming Up Later
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {upcomingPrograms.slice(1).map((program, index) => (
              <div key={index} className="bg-white rounded-lg p-3 border border-blue-200">
                <div className="font-medium text-gray-900">{program.Program}</div>
                <div className="text-sm text-gray-600">{program['Presenter(s)']}</div>
                <div className="text-xs text-blue-600 mt-1" title={`Starts at ${program['Time (24h)']} Africa/Monrovia`}>
                  {program.Day} • {program['Time (24h)']} GMT
                </div>
                {program.Category && (
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${getCategoryColor(program.Category)}`}>
                    {program.Category}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Program Schedule Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-orange-600 to-orange-700 text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Day</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Time (24H)</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Program</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Presenter</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Category</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPrograms.map((program, index) => {
                const programId = getProgramId(program);
                const isCurrentProgram = currentProgram && 
                  currentProgram.Day === program.Day && 
                  currentProgram.timeSlot === program.timeSlot &&
                  currentProgram.Program === program.Program;
                
                return (
                  <tr 
                    key={`${program.Day}-${program.timeSlot}-${index}`}
                    className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                      isCurrentProgram ? 'bg-green-50 border-green-200' : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      <span className="font-medium text-gray-900">{program.Day}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span 
                        className="text-gray-700 font-mono text-sm" 
                        title={`Full UTC time: ${program['Time (24h)']} (Africa/Monrovia timezone)`}
                      >
                        {program['Time (24h)']} GMT
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        {isCurrentProgram && (
                          <div className="flex items-center mr-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                            <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full font-bold">
                              LIVE
                            </span>
                          </div>
                        )}
                        <span className="font-medium text-gray-900">{program.Program}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-gray-700">{program['Presenter(s)'] || 'Various'}</span>
                    </td>
                    <td className="px-4 py-3">
                      {program.Category && (
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(program.Category)}`}>
                          {program.Category}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => toggleFavorite(programId)}
                        className={`p-2 rounded-full transition-colors ${
                          favorites.has(programId)
                            ? 'text-yellow-500 hover:text-yellow-600'
                            : 'text-gray-400 hover:text-yellow-500'
                        }`}
                      >
                        <Star size={16} fill={favorites.has(programId) ? 'currentColor' : 'none'} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredPrograms.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No programs found matching your criteria.</div>
          <div className="text-gray-400 text-sm mt-2">Try adjusting your search or filter settings.</div>
        </div>
      )}
    </div>
  );
};

export default VoxRadioProgramLog;