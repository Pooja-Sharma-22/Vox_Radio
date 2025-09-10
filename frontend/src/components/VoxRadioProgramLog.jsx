import React, { useState, useEffect, useMemo } from 'react';
import { Search, Download, Calendar, Clock, Filter, Users, Play, Book, MessageCircle, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

// Complete program schedule data from the Excel file
const programScheduleData = [
  // SUNDAY
  { Day: 'SUNDAY', 'Time (24h)': '00:00-05:00', Program: 'Music', 'Presenter(s)': '', timeSlot: 0, duration: 5 },
  { Day: 'SUNDAY', 'Time (24h)': '05:00-07:00', Program: 'Music and Talks', 'Presenter(s)': 'Emmanuel Lerpolu', timeSlot: 5, duration: 2 },
  { Day: 'SUNDAY', 'Time (24h)': '07:00-07:30', Program: 'Salvation Half Hour', 'Presenter(s)': 'Min. Cooper', timeSlot: 7, duration: 0.5 },
  { Day: 'SUNDAY', 'Time (24h)': '07:30-08:00', Program: 'Music', 'Presenter(s)': 'Emmanuel Lerpolu', timeSlot: 7.5, duration: 0.5 },
  { Day: 'SUNDAY', 'Time (24h)': '08:00-10:00', Program: 'The Gospel Caravan', 'Presenter(s)': 'Emmanuel Lerpolu', timeSlot: 8, duration: 2 },
  { Day: 'SUNDAY', 'Time (24h)': '10:00-15:00', Program: 'Music', 'Presenter(s)': '', timeSlot: 10, duration: 5 },
  { Day: 'SUNDAY', 'Time (24h)': '15:00-16:00', Program: 'Sunday Special', 'Presenter(s)': 'Beatrice Ballah', timeSlot: 15, duration: 1 },
  { Day: 'SUNDAY', 'Time (24h)': '16:00-18:00', Program: 'Music and Talks', 'Presenter(s)': 'Victoria Walker', timeSlot: 16, duration: 2 },
  { Day: 'SUNDAY', 'Time (24h)': '18:00-19:30', Program: 'Kids Hour', 'Presenter(s)': 'Victoria Walker', timeSlot: 18, duration: 1.5 },
  { Day: 'SUNDAY', 'Time (24h)': '19:30-21:00', Program: 'Music', 'Presenter(s)': 'Maxim Somah', timeSlot: 19.5, duration: 1.5 },
  { Day: 'SUNDAY', 'Time (24h)': '21:00-22:00', Program: 'Search The Scriptures', 'Presenter(s)': 'Maxim Somah', timeSlot: 21, duration: 1 },
  { Day: 'SUNDAY', 'Time (24h)': '22:00-00:00', Program: 'Music', 'Presenter(s)': '', timeSlot: 22, duration: 2 },

  // MONDAY
  { Day: 'MONDAY', 'Time (24h)': '00:00-00:30', Program: 'Music', 'Presenter(s)': '', timeSlot: 0, duration: 0.5 },
  { Day: 'MONDAY', 'Time (24h)': '00:30-04:30', Program: 'International Kapoa Secure Liberia', 'Presenter(s)': 'Sam W. Doe', timeSlot: 0.5, duration: 4 },
  { Day: 'MONDAY', 'Time (24h)': '05:00-08:00', Program: 'The Quiet Storm', 'Presenter(s)': 'New Life Africa', timeSlot: 5, duration: 3 },
  { Day: 'MONDAY', 'Time (24h)': '08:00-09:00', Program: 'Good Shepherd Fellowship', 'Presenter(s)': 'Bishop Thomas', timeSlot: 8, duration: 1 },
  { Day: 'MONDAY', 'Time (24h)': '09:00-10:00', Program: 'Living Word', 'Presenter(s)': 'Pastor Mensa', timeSlot: 9, duration: 1 },
  { Day: 'MONDAY', 'Time (24h)': '10:00-10:10', Program: 'Jingles and Music', 'Presenter(s)': 'Deddeh Gayflor', timeSlot: 10, duration: 0.17 },
  { Day: 'MONDAY', 'Time (24h)': '10:10-10:20', Program: 'Announcement', 'Presenter(s)': 'Deddeh Gayflor', timeSlot: 10.17, duration: 0.17 },
  { Day: 'MONDAY', 'Time (24h)': '10:20-10:45', Program: 'Back To The Bible', 'Presenter(s)': 'Various', timeSlot: 10.33, duration: 0.42 },
  { Day: 'MONDAY', 'Time (24h)': '10:45-11:00', Program: 'Music', 'Presenter(s)': 'Deddeh Gayflor', timeSlot: 10.75, duration: 0.25 },
  { Day: 'MONDAY', 'Time (24h)': '11:00-13:00', Program: 'Worship Connexion', 'Presenter(s)': 'New Life Africa', timeSlot: 11, duration: 2 },
  { Day: 'MONDAY', 'Time (24h)': '13:00-13:05', Program: 'Word To Go', 'Presenter(s)': 'Pastor Mensa', timeSlot: 13, duration: 0.08 },
  { Day: 'MONDAY', 'Time (24h)': '13:05-15:00', Program: 'Launch Time Connection', 'Presenter(s)': 'Deddeh Gayflor', timeSlot: 13.08, duration: 1.92 },
  { Day: 'MONDAY', 'Time (24h)': '15:00-16:30', Program: 'The Heart Beat', 'Presenter(s)': 'Various', timeSlot: 15, duration: 1.5 },
  { Day: 'MONDAY', 'Time (24h)': '16:30-17:30', Program: 'Thru The Bible', 'Presenter(s)': 'Pastor Mcquee', timeSlot: 16.5, duration: 1 },
  { Day: 'MONDAY', 'Time (24h)': '17:30-17:45', Program: 'Music', 'Presenter(s)': 'Emmanuel Lepolu', timeSlot: 17.5, duration: 0.25 },
  { Day: 'MONDAY', 'Time (24h)': '17:45-18:00', Program: 'Announcement', 'Presenter(s)': 'Emmanuel Lepolu', timeSlot: 17.75, duration: 0.25 },
  { Day: 'MONDAY', 'Time (24h)': '18:00-18:30', Program: 'Major Headlines', 'Presenter(s)': 'Emmanuel Lepolu', timeSlot: 18, duration: 0.5 },
  { Day: 'MONDAY', 'Time (24h)': '18:30-19:30', Program: 'Music', 'Presenter(s)': 'Emmanuel Lepolu', timeSlot: 18.5, duration: 1 },
  { Day: 'MONDAY', 'Time (24h)': '19:30-20:45', Program: 'Vox Talk', 'Presenter(s)': 'Maxim and Sam', timeSlot: 19.5, duration: 1.25 },
  { Day: 'MONDAY', 'Time (24h)': '20:45-21:00', Program: 'Announcement', 'Presenter(s)': 'Sam', timeSlot: 20.75, duration: 0.25 },
  { Day: 'MONDAY', 'Time (24h)': '21:00-22:00', Program: 'Vox Prayer Night', 'Presenter(s)': 'Leone Moore', timeSlot: 21, duration: 1 },
  { Day: 'MONDAY', 'Time (24h)': '22:00-23:00', Program: 'The Night Ride', 'Presenter(s)': 'Sam W. Doe', timeSlot: 22, duration: 1 },
  { Day: 'MONDAY', 'Time (24h)': '23:00-00:00', Program: 'Music', 'Presenter(s)': 'Sam W. Doe', timeSlot: 23, duration: 1 },

  // TUESDAY
  { Day: 'TUESDAY', 'Time (24h)': '00:00-00:30', Program: 'Music', 'Presenter(s)': '', timeSlot: 0, duration: 0.5 },
  { Day: 'TUESDAY', 'Time (24h)': '00:30-04:30', Program: 'International Kapoa Secure Liberia', 'Presenter(s)': 'Sam W. Doe', timeSlot: 0.5, duration: 4 },
  { Day: 'TUESDAY', 'Time (24h)': '05:00-08:00', Program: 'The Quiet Storm', 'Presenter(s)': 'New Life Africa', timeSlot: 5, duration: 3 },
  { Day: 'TUESDAY', 'Time (24h)': '08:00-09:00', Program: 'Good Shepherd Fellowship', 'Presenter(s)': 'Bishop Thomas', timeSlot: 8, duration: 1 },
  { Day: 'TUESDAY', 'Time (24h)': '09:00-10:00', Program: 'Living Word', 'Presenter(s)': 'Pastor Mensa', timeSlot: 9, duration: 1 },
  { Day: 'TUESDAY', 'Time (24h)': '10:00-10:10', Program: 'Jingles and Music', 'Presenter(s)': 'Emmanuel Lepolu', timeSlot: 10, duration: 0.17 },
  { Day: 'TUESDAY', 'Time (24h)': '10:10-10:20', Program: 'Announcement', 'Presenter(s)': 'Emmanuel Lepolu', timeSlot: 10.17, duration: 0.17 },
  { Day: 'TUESDAY', 'Time (24h)': '10:20-10:45', Program: 'Back To The Bible', 'Presenter(s)': 'Various', timeSlot: 10.33, duration: 0.42 },
  { Day: 'TUESDAY', 'Time (24h)': '10:45-11:00', Program: 'Music', 'Presenter(s)': 'Emmanuel Lepolu', timeSlot: 10.75, duration: 0.25 },
  { Day: 'TUESDAY', 'Time (24h)': '11:00-13:00', Program: 'Worship Connexion', 'Presenter(s)': 'New Life Africa', timeSlot: 11, duration: 2 },
  { Day: 'TUESDAY', 'Time (24h)': '13:00-13:05', Program: 'Word To Go', 'Presenter(s)': 'Pastor Mensa', timeSlot: 13, duration: 0.08 },
  { Day: 'TUESDAY', 'Time (24h)': '13:05-15:00', Program: 'Launch Time Connection', 'Presenter(s)': 'Beauty Nuah', timeSlot: 13.08, duration: 1.92 },
  { Day: 'TUESDAY', 'Time (24h)': '15:00-16:30', Program: 'The Heart Beat', 'Presenter(s)': 'Various', timeSlot: 15, duration: 1.5 },
  { Day: 'TUESDAY', 'Time (24h)': '16:30-17:30', Program: 'Thru The Bible', 'Presenter(s)': 'Pastor Mcquee', timeSlot: 16.5, duration: 1 },
  { Day: 'TUESDAY', 'Time (24h)': '17:30-17:45', Program: 'Music', 'Presenter(s)': 'Beatrice Ballah', timeSlot: 17.5, duration: 0.25 },
  { Day: 'TUESDAY', 'Time (24h)': '17:45-18:00', Program: 'Announcement', 'Presenter(s)': 'Beatrice Ballah', timeSlot: 17.75, duration: 0.25 },
  { Day: 'TUESDAY', 'Time (24h)': '18:00-19:00', Program: 'She Speaks Up', 'Presenter(s)': 'Beatrice Ballah', timeSlot: 18, duration: 1 },
  { Day: 'TUESDAY', 'Time (24h)': '19:00-19:30', Program: 'Music', 'Presenter(s)': 'Maxim Somah', timeSlot: 19, duration: 0.5 },
  { Day: 'TUESDAY', 'Time (24h)': '19:30-20:45', Program: 'Vox Talk', 'Presenter(s)': 'Maxim and Sam', timeSlot: 19.5, duration: 1.25 },
  { Day: 'TUESDAY', 'Time (24h)': '20:45-21:00', Program: 'Announcement', 'Presenter(s)': 'Various', timeSlot: 20.75, duration: 0.25 },
  { Day: 'TUESDAY', 'Time (24h)': '21:00-22:00', Program: 'Vox Prayer Night', 'Presenter(s)': 'Leone Moore', timeSlot: 21, duration: 1 },
  { Day: 'TUESDAY', 'Time (24h)': '22:00-00:00', Program: 'Music', 'Presenter(s)': 'Maxim Somah', timeSlot: 22, duration: 2 },

  // WEDNESDAY
  { Day: 'WEDNESDAY', 'Time (24h)': '00:00-00:30', Program: 'Music', 'Presenter(s)': '', timeSlot: 0, duration: 0.5 },
  { Day: 'WEDNESDAY', 'Time (24h)': '00:30-04:30', Program: 'International Kapoa Secure Liberia', 'Presenter(s)': 'Maxim Somah', timeSlot: 0.5, duration: 4 },
  { Day: 'WEDNESDAY', 'Time (24h)': '05:00-08:00', Program: 'The Quiet Storm', 'Presenter(s)': 'New Life Africa', timeSlot: 5, duration: 3 },
  { Day: 'WEDNESDAY', 'Time (24h)': '08:00-09:00', Program: 'Good Shepherd Fellowship', 'Presenter(s)': 'Bishop Thomas', timeSlot: 8, duration: 1 },
  { Day: 'WEDNESDAY', 'Time (24h)': '09:00-10:00', Program: 'Living Word', 'Presenter(s)': 'Pastor Mensa', timeSlot: 9, duration: 1 },
  { Day: 'WEDNESDAY', 'Time (24h)': '10:00-10:10', Program: 'Jingles and Music', 'Presenter(s)': 'Emmanuel Lepolu', timeSlot: 10, duration: 0.17 },
  { Day: 'WEDNESDAY', 'Time (24h)': '10:10-10:20', Program: 'Announcement', 'Presenter(s)': 'Emmanuel Lepolu', timeSlot: 10.17, duration: 0.17 },
  { Day: 'WEDNESDAY', 'Time (24h)': '10:20-10:45', Program: 'New Day Hour', 'Presenter(s)': 'Pastor Fatorma', timeSlot: 10.33, duration: 0.42 },
  { Day: 'WEDNESDAY', 'Time (24h)': '10:45-11:00', Program: 'Music', 'Presenter(s)': 'T. KCalvin Walter', timeSlot: 10.75, duration: 0.25 },
  { Day: 'WEDNESDAY', 'Time (24h)': '11:00-13:00', Program: 'Worship Connexion', 'Presenter(s)': 'New Life Africa', timeSlot: 11, duration: 2 },
  { Day: 'WEDNESDAY', 'Time (24h)': '13:00-13:05', Program: 'Word To Go', 'Presenter(s)': 'Pastor Mensa', timeSlot: 13, duration: 0.08 },
  { Day: 'WEDNESDAY', 'Time (24h)': '13:05-15:00', Program: 'Launch Time Connection', 'Presenter(s)': 'Beauty Nuah', timeSlot: 13.08, duration: 1.92 },
  { Day: 'WEDNESDAY', 'Time (24h)': '15:00-16:30', Program: 'The Heart Beat', 'Presenter(s)': 'Various', timeSlot: 15, duration: 1.5 },
  { Day: 'WEDNESDAY', 'Time (24h)': '16:30-17:30', Program: 'Thru The Bible', 'Presenter(s)': 'Pastor Mcquee', timeSlot: 16.5, duration: 1 },
  { Day: 'WEDNESDAY', 'Time (24h)': '17:30-17:45', Program: 'Music', 'Presenter(s)': 'Victoria Walker', timeSlot: 17.5, duration: 0.25 },
  { Day: 'WEDNESDAY', 'Time (24h)': '17:45-18:00', Program: 'Announcement', 'Presenter(s)': 'Victoria Walker', timeSlot: 17.75, duration: 0.25 },
  { Day: 'WEDNESDAY', 'Time (24h)': '18:00-19:15', Program: 'Music', 'Presenter(s)': 'Victoria Walker', timeSlot: 18, duration: 1.25 },
  { Day: 'WEDNESDAY', 'Time (24h)': '19:15-20:45', Program: 'Ladies Let\'s Talk', 'Presenter(s)': 'Victoria Walker', timeSlot: 19.25, duration: 1.5 },
  { Day: 'WEDNESDAY', 'Time (24h)': '20:45-21:00', Program: 'Announcement', 'Presenter(s)': 'Victoria Walker', timeSlot: 20.75, duration: 0.25 },
  { Day: 'WEDNESDAY', 'Time (24h)': '21:00-22:00', Program: 'Vox Prayer Night', 'Presenter(s)': 'Leone Moore', timeSlot: 21, duration: 1 },
  { Day: 'WEDNESDAY', 'Time (24h)': '22:00-00:00', Program: 'Music', 'Presenter(s)': 'Emmanuel Howard', timeSlot: 22, duration: 2 },

  // THURSDAY
  { Day: 'THURSDAY', 'Time (24h)': '00:00-00:30', Program: 'Music', 'Presenter(s)': '', timeSlot: 0, duration: 0.5 },
  { Day: 'THURSDAY', 'Time (24h)': '00:30-04:30', Program: 'International Kapoa Secure Liberia', 'Presenter(s)': 'Emmanuel Howard', timeSlot: 0.5, duration: 4 },
  { Day: 'THURSDAY', 'Time (24h)': '05:00-08:00', Program: 'The Quiet Storm', 'Presenter(s)': 'New Life Africa', timeSlot: 5, duration: 3 },
  { Day: 'THURSDAY', 'Time (24h)': '08:00-09:00', Program: 'Good Shepherd Fellowship', 'Presenter(s)': 'Bishop Thomas', timeSlot: 8, duration: 1 },
  { Day: 'THURSDAY', 'Time (24h)': '09:00-10:00', Program: 'Living Word', 'Presenter(s)': 'Pastor Mensa', timeSlot: 9, duration: 1 },
  { Day: 'THURSDAY', 'Time (24h)': '10:00-10:10', Program: 'Jingles and Music', 'Presenter(s)': 'Emmanuel Lepolu', timeSlot: 10, duration: 0.17 },
  { Day: 'THURSDAY', 'Time (24h)': '10:10-10:20', Program: 'Announcement', 'Presenter(s)': 'Emmanuel Lepolu', timeSlot: 10.17, duration: 0.17 },
  { Day: 'THURSDAY', 'Time (24h)': '10:20-11:00', Program: 'Music', 'Presenter(s)': 'Deddeh Gayflor', timeSlot: 10.33, duration: 0.67 },
  { Day: 'THURSDAY', 'Time (24h)': '11:00-13:00', Program: 'Worship Connexion', 'Presenter(s)': 'New Life Africa', timeSlot: 11, duration: 2 },
  { Day: 'THURSDAY', 'Time (24h)': '13:00-13:05', Program: 'Word To Go', 'Presenter(s)': 'Pastor Mensa', timeSlot: 13, duration: 0.08 },
  { Day: 'THURSDAY', 'Time (24h)': '13:05-15:00', Program: 'Launch Time Connect', 'Presenter(s)': 'Deddeh Gayflor', timeSlot: 13.08, duration: 1.92 },
  { Day: 'THURSDAY', 'Time (24h)': '15:00-16:30', Program: 'The Heart Beat', 'Presenter(s)': 'Various', timeSlot: 15, duration: 1.5 },
  { Day: 'THURSDAY', 'Time (24h)': '16:30-17:30', Program: 'Thru The Bible', 'Presenter(s)': 'Pastor Mcquee', timeSlot: 16.5, duration: 1 },
  { Day: 'THURSDAY', 'Time (24h)': '17:30-17:45', Program: 'Music', 'Presenter(s)': 'Beauty Nuah', timeSlot: 17.5, duration: 0.25 },
  { Day: 'THURSDAY', 'Time (24h)': '17:45-18:00', Program: 'Announcement', 'Presenter(s)': 'Beauty Nuah', timeSlot: 17.75, duration: 0.25 },
  { Day: 'THURSDAY', 'Time (24h)': '18:00-19:00', Program: 'Teenagers Talk', 'Presenter(s)': 'Beauty Nuah', timeSlot: 18, duration: 1 },
  { Day: 'THURSDAY', 'Time (24h)': '19:00-19:30', Program: 'Music', 'Presenter(s)': 'Sam W. Doe', timeSlot: 19, duration: 0.5 },
  { Day: 'THURSDAY', 'Time (24h)': '19:30-20:45', Program: 'Vox Talk', 'Presenter(s)': 'Maxim And Sam', timeSlot: 19.5, duration: 1.25 },
  { Day: 'THURSDAY', 'Time (24h)': '20:45-21:00', Program: 'Announcement', 'Presenter(s)': 'Maxim Somah', timeSlot: 20.75, duration: 0.25 },
  { Day: 'THURSDAY', 'Time (24h)': '21:00-22:00', Program: 'Vox Prayer Night', 'Presenter(s)': 'Leone Moore', timeSlot: 21, duration: 1 },
  { Day: 'THURSDAY', 'Time (24h)': '22:00-00:00', Program: 'Music', 'Presenter(s)': 'Sam W. Doe', timeSlot: 22, duration: 2 },

  // FRIDAY
  { Day: 'FRIDAY', 'Time (24h)': '00:00-00:30', Program: 'Music', 'Presenter(s)': '', timeSlot: 0, duration: 0.5 },
  { Day: 'FRIDAY', 'Time (24h)': '00:30-04:30', Program: 'International Kapoa Secure Liberia', 'Presenter(s)': 'Maxim Somah and Sam W. Doe', timeSlot: 0.5, duration: 4 },
  { Day: 'FRIDAY', 'Time (24h)': '05:00-08:00', Program: 'The Quiet Storm', 'Presenter(s)': 'New Life Africa', timeSlot: 5, duration: 3 },
  { Day: 'FRIDAY', 'Time (24h)': '08:00-09:00', Program: 'Good Shepherd Fellowship', 'Presenter(s)': 'Bishop Thomas', timeSlot: 8, duration: 1 },
  { Day: 'FRIDAY', 'Time (24h)': '09:00-10:00', Program: 'Living Word', 'Presenter(s)': 'Pastor Mensa', timeSlot: 9, duration: 1 },
  { Day: 'FRIDAY', 'Time (24h)': '10:00-10:10', Program: 'Jingles and Music', 'Presenter(s)': 'Maxim Somah', timeSlot: 10, duration: 0.17 },
  { Day: 'FRIDAY', 'Time (24h)': '10:10-10:20', Program: 'Announcement', 'Presenter(s)': 'Maxim Somah', timeSlot: 10.17, duration: 0.17 },
  { Day: 'FRIDAY', 'Time (24h)': '10:20-11:00', Program: 'Music', 'Presenter(s)': 'Maxim Somah', timeSlot: 10.33, duration: 0.67 },
  { Day: 'FRIDAY', 'Time (24h)': '11:00-13:00', Program: 'Worship Connexion', 'Presenter(s)': 'New Life Africa', timeSlot: 11, duration: 2 },
  { Day: 'FRIDAY', 'Time (24h)': '13:00-13:05', Program: 'Word To Go', 'Presenter(s)': 'Pastor Mensa', timeSlot: 13, duration: 0.08 },
  { Day: 'FRIDAY', 'Time (24h)': '13:05-15:00', Program: 'Launch Time Connect', 'Presenter(s)': 'Maxim Somah', timeSlot: 13.08, duration: 1.92 },
  { Day: 'FRIDAY', 'Time (24h)': '15:00-15:20', Program: 'Music', 'Presenter(s)': 'Various', timeSlot: 15, duration: 0.33 },
  { Day: 'FRIDAY', 'Time (24h)': '15:20-15:24', Program: 'Guidelines For Living', 'Presenter(s)': 'Various', timeSlot: 15.33, duration: 0.07 },
  { Day: 'FRIDAY', 'Time (24h)': '15:24-16:00', Program: 'The Heart Beat', 'Presenter(s)': 'Various', timeSlot: 15.4, duration: 0.6 },
  { Day: 'FRIDAY', 'Time (24h)': '16:00-17:00', Program: 'The Drug Show', 'Presenter(s)': 'Sam W. Doe', timeSlot: 16, duration: 1 },
  { Day: 'FRIDAY', 'Time (24h)': '17:00-18:00', Program: 'Trenz At 10', 'Presenter(s)': 'T. KCalvin Walter', timeSlot: 17, duration: 1 },
  { Day: 'FRIDAY', 'Time (24h)': '18:00-19:00', Program: 'The Living Proof', 'Presenter(s)': 'T. KCalvin Walter', timeSlot: 18, duration: 1 },
  { Day: 'FRIDAY', 'Time (24h)': '19:00-20:45', Program: 'Music', 'Presenter(s)': 'T. KCalvin Walter', timeSlot: 19, duration: 1.75 },
  { Day: 'FRIDAY', 'Time (24h)': '20:45-21:00', Program: 'Announcement', 'Presenter(s)': 'T. KCalvin Walter', timeSlot: 20.75, duration: 0.25 },
  { Day: 'FRIDAY', 'Time (24h)': '21:00-22:00', Program: 'The Conversation', 'Presenter(s)': 'T. KCalvin Walter', timeSlot: 21, duration: 1 },
  { Day: 'FRIDAY', 'Time (24h)': '22:00-00:00', Program: 'Music', 'Presenter(s)': 'T. KCalvin Walter', timeSlot: 22, duration: 2 },

  // SATURDAY
  { Day: 'SATURDAY', 'Time (24h)': '00:00-00:30', Program: 'Music', 'Presenter(s)': '', timeSlot: 0, duration: 0.5 },
  { Day: 'SATURDAY', 'Time (24h)': '00:30-04:30', Program: 'International Kapoa Secure Liberia', 'Presenter(s)': 'T. KCalvin Walter', timeSlot: 0.5, duration: 4 },
  { Day: 'SATURDAY', 'Time (24h)': '05:00-07:00', Program: 'Music', 'Presenter(s)': 'KCalvin', timeSlot: 5, duration: 2 },
  { Day: 'SATURDAY', 'Time (24h)': '07:00-08:30', Program: 'The Morning Jam', 'Presenter(s)': 'KCalvin', timeSlot: 7, duration: 1.5 },
  { Day: 'SATURDAY', 'Time (24h)': '08:30-09:00', Program: 'Music', 'Presenter(s)': 'KCalvin', timeSlot: 8.5, duration: 0.5 },
  { Day: 'SATURDAY', 'Time (24h)': '09:00-10:15', Program: 'Vox Sports DESK', 'Presenter(s)': 'KCalvin and Emmanuel', timeSlot: 9, duration: 1.25 },
  { Day: 'SATURDAY', 'Time (24h)': '10:15-11:15', Program: 'Teenagers Talk', 'Presenter(s)': 'Janet and D\'Alessandro', timeSlot: 10.25, duration: 1 },
  { Day: 'SATURDAY', 'Time (24h)': '11:15-13:00', Program: 'Music', 'Presenter(s)': 'Various', timeSlot: 11.25, duration: 1.75 },
  { Day: 'SATURDAY', 'Time (24h)': '13:00-13:30', Program: 'Truth For Life Weekend', 'Presenter(s)': 'Various', timeSlot: 13, duration: 0.5 },
  { Day: 'SATURDAY', 'Time (24h)': '13:30-14:00', Program: 'Planet Sports', 'Presenter(s)': 'Various', timeSlot: 13.5, duration: 0.5 },
  { Day: 'SATURDAY', 'Time (24h)': '14:00-16:00', Program: 'Island Praise', 'Presenter(s)': 'Various', timeSlot: 14, duration: 2 },
  { Day: 'SATURDAY', 'Time (24h)': '16:00-19:00', Program: 'Blessed Beatz', 'Presenter(s)': 'Various', timeSlot: 16, duration: 3 },
  { Day: 'SATURDAY', 'Time (24h)': '19:00-00:00', Program: 'Transformed DJ', 'Presenter(s)': 'Various', timeSlot: 19, duration: 5 }
];

// Program categories for color coding and filtering
const programCategories = {
  'Music': { color: '#FFD966', label: 'Music', icon: Play },
  'Bible Teaching': { color: '#A9D08E', label: 'Bible Teaching', icon: Book },
  'Talk/Connection': { color: '#9DC3E6', label: 'Talk/Connection', icon: MessageCircle },
  'Special': { color: '#F4B183', label: 'Special', icon: Star },
  'Community': { color: '#E7E6E6', label: 'Community', icon: Users }
};

// Function to categorize programs
const categorizeProgram = (programName) => {
  const name = programName.toLowerCase();
  
  if (name.includes('music') || name === 'music') {
    return 'Music';
  } else if (name.includes('bible') || name.includes('scripture') || name.includes('word') || 
             name.includes('worship') || name.includes('salvation') || name.includes('gospel') ||
             name.includes('prayer')) {
    return 'Bible Teaching';
  } else if (name.includes('talk') || name.includes('connection') || name.includes('fellowship') || 
             name.includes('night ride') || name.includes('conversation') || name.includes('vox prayer')) {
    return 'Talk/Connection';
  } else if (name.includes('special') || name.includes('sports') || name.includes('hour') || 
             name.includes('kapoa') || name.includes('reset') || name.includes('guidelines') || 
             name.includes('truth for life') || name.includes('kids') || name.includes('teenagers') ||
             name.includes('ladies') || name.includes('drug show') || name.includes('living proof') ||
             name.includes('trenz') || name.includes('morning jam') || name.includes('transformed') ||
             name.includes('blessed') || name.includes('island')) {
    return 'Special';
  } else {
    return 'Community';
  }
};

const VoxRadioProgramLog = () => {
  const [activeTab, setActiveTab] = useState('weekly-schedule');
  const [selectedDay, setSelectedDay] = useState('All Days');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentProgram, setCurrentProgram] = useState(null);

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  // Find current program based on Liberia time
  const getCurrentProgram = () => {
    const now = new Date(new Date().toLocaleString("en-US", {timeZone: "Africa/Monrovia"}));
    const currentDay = days[now.getDay()].toUpperCase();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTimeDecimal = currentHour + (currentMinutes / 60);

    return programScheduleData.find(program => {
      if (program.Day !== currentDay) return false;
      
      const startTime = program.timeSlot;
      const endTime = startTime + program.duration;
      
      // Handle programs that cross midnight
      if (startTime > endTime) {
        return currentTimeDecimal >= startTime || currentTimeDecimal < endTime;
      }
      
      return currentTimeDecimal >= startTime && currentTimeDecimal < endTime;
    });
  };

  // Update current program
  useEffect(() => {
    const timer = setInterval(() => {
      const activeProgram = getCurrentProgram();
      setCurrentProgram(activeProgram);
    }, 30000); // Check every 30 seconds

    // Initial check
    setCurrentProgram(getCurrentProgram());

    return () => clearInterval(timer);
  }, []);

  // Filter programs based on current filters
  const filteredPrograms = useMemo(() => {
    let filtered = programScheduleData;

    // Filter by day
    if (selectedDay !== 'All Days') {
      filtered = filtered.filter(program => program.Day === selectedDay.toUpperCase());
    }

    // Filter by category
    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(program => categorizeProgram(program.Program) === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(program => 
        program.Program.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (program['Presenter(s)'] && program['Presenter(s)'].toLowerCase().includes(searchTerm.toLowerCase())) ||
        program.Day.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [selectedDay, selectedCategory, searchTerm]);

  // Get upcoming programs (next 5 for today)
  const getUpcomingPrograms = () => {
    const now = new Date(new Date().toLocaleString("en-US", {timeZone: "Africa/Monrovia"}));
    const currentDay = days[now.getDay()].toUpperCase();
    const currentTimeDecimal = now.getHours() + (now.getMinutes() / 60);

    return programScheduleData
      .filter(program => program.Day === currentDay && program.timeSlot > currentTimeDecimal)
      .sort((a, b) => a.timeSlot - b.timeSlot)
      .slice(0, 5);
  };

  // Download functionality
  const handleDownload = (format) => {
    const data = filteredPrograms.map(program => ({
      Day: program.Day,
      Time: program['Time (24h)'],
      Program: program.Program,
      Presenter: program['Presenter(s)'] || 'Various',
      Category: categorizeProgram(program.Program)
    }));

    if (format === 'excel') {
      // Create CSV for Excel compatibility
      const headers = ['Day', 'Time', 'Program', 'Presenter', 'Category'];
      const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(header => `"${row[header]}"`).join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `vox-radio-schedule-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else if (format === 'pdf') {
      // For PDF, we'll create a formatted text file
      const content = [
        'VOX RADIO 97.5FM - WEEKLY PROGRAM SCHEDULE',
        '=' .repeat(50),
        '',
        ...data.map(program => 
          `${program.Day} | ${program.Time} | ${program.Program} | ${program.Presenter}`
        )
      ].join('\n');

      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `vox-radio-schedule-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="p-6 bg-white">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Vox Radio Weekly Program Schedule
        </h1>
        <p className="text-gray-600">
          Browse the 24/7 program log, see what's live now, and check what's coming up. Download the full schedule for offline use.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 border-b">
        <button
          onClick={() => setActiveTab('weekly-schedule')}
          className={`px-4 py-2 font-medium rounded-t-lg ${
            activeTab === 'weekly-schedule'
              ? 'bg-orange-500 text-white border-b-2 border-orange-500'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
          }`}
        >
          📅 Weekly Schedule
        </button>
        <button
          onClick={() => setActiveTab('upcoming-programs')}
          className={`px-4 py-2 font-medium rounded-t-lg ${
            activeTab === 'upcoming-programs'
              ? 'bg-orange-500 text-white border-b-2 border-orange-500'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
          }`}
        >
          ⏰ Upcoming Programs
        </button>
      </div>

      {activeTab === 'weekly-schedule' && (
        <>
          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  type="text"
                  placeholder="Search any program, presenter, or keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="All Days">All Days</option>
              {days.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="All Categories">All Categories</option>
              {Object.keys(programCategories).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <div className="flex space-x-2">
              <Button
                onClick={() => handleDownload('excel')}
                variant="outline"
                size="sm"
                className="flex items-center space-x-1"
              >
                <Download size={16} />
                <span>Excel</span>
              </Button>
              <Button
                onClick={() => handleDownload('pdf')}
                variant="outline"
                size="sm"
                className="flex items-center space-x-1"
              >
                <Download size={16} />
                <span>PDF</span>
              </Button>
            </div>
          </div>

          {/* Program Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-left font-medium text-gray-900">Day</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-medium text-gray-900">Time (24h)</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-medium text-gray-900">Program</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-medium text-gray-900">Presenter(s)</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-medium text-gray-900">Category</th>
                </tr>
              </thead>
              <tbody>
                {filteredPrograms.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="border border-gray-200 px-4 py-8 text-center text-gray-500">
                      No programs found matching your search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredPrograms.map((program, index) => {
                    const category = categorizeProgram(program.Program);
                    const categoryConfig = programCategories[category];
                    const isCurrentProgram = currentProgram && 
                      currentProgram.Day === program.Day && 
                      currentProgram.Program === program.Program &&
                      currentProgram['Time (24h)'] === program['Time (24h)'];

                    return (
                      <tr 
                        key={index} 
                        className={`hover:bg-gray-50 ${isCurrentProgram ? 'ring-2 ring-green-500 bg-green-50' : ''}`}
                        style={{ backgroundColor: isCurrentProgram ? '#f0fdf4' : categoryConfig.color }}
                      >
                        <td className="border border-gray-200 px-4 py-3 font-medium">
                          {program.Day}
                          {isCurrentProgram && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white">
                              LIVE
                            </span>
                          )}
                        </td>
                        <td className="border border-gray-200 px-4 py-3">{program['Time (24h)']}</td>
                        <td className="border border-gray-200 px-4 py-3 font-medium">{program.Program}</td>
                        <td className="border border-gray-200 px-4 py-3">{program['Presenter(s)'] || 'Various'}</td>
                        <td className="border border-gray-200 px-4 py-3">
                          <span className="inline-flex items-center space-x-1 text-sm">
                            {React.createElement(categoryConfig.icon, { size: 14 })}
                            <span>{category}</span>
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Results Summary */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredPrograms.length} of {programScheduleData.length} programs
          </div>
        </>
      )}

      {activeTab === 'upcoming-programs' && (
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Upcoming Programs Today
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-left font-medium text-gray-900">Time (24h)</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-medium text-gray-900">Program</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-medium text-gray-900">Presenter(s)</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-medium text-gray-900">Category</th>
                </tr>
              </thead>
              <tbody>
                {getUpcomingPrograms().length === 0 ? (
                  <tr>
                    <td colSpan="4" className="border border-gray-200 px-4 py-8 text-center text-gray-500">
                      No more programs scheduled for today.
                    </td>
                  </tr>
                ) : (
                  getUpcomingPrograms().map((program, index) => {
                    const category = categorizeProgram(program.Program);
                    const categoryConfig = programCategories[category];

                    return (
                      <tr key={index} className="hover:bg-gray-50" style={{ backgroundColor: categoryConfig.color }}>
                        <td className="border border-gray-200 px-4 py-3 font-medium">{program['Time (24h)']}</td>
                        <td className="border border-gray-200 px-4 py-3 font-medium">{program.Program}</td>
                        <td className="border border-gray-200 px-4 py-3">{program['Presenter(s)'] || 'Various'}</td>
                        <td className="border border-gray-200 px-4 py-3">
                          <span className="inline-flex items-center space-x-1 text-sm">
                            {React.createElement(categoryConfig.icon, { size: 14 })}
                            <span>{category}</span>
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoxRadioProgramLog;