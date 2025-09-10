import React, { useState, useEffect } from 'react';

// Complete program schedule data from the VoxRadioProgramLog
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
  { Day: 'MONDAY', 'Time (24h)': '04:30-05:00', Program: 'Thru the Bible', 'Presenter(s)': 'Dr. J. Vernon McGee', timeSlot: 4.5, duration: 0.5 },
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
  { Day: 'TUESDAY', 'Time (24h)': '04:30-05:00', Program: 'Thru the Bible', 'Presenter(s)': 'Dr. J. Vernon McGee', timeSlot: 4.5, duration: 0.5 },
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
  { Day: 'WEDNESDAY', 'Time (24h)': '04:30-05:00', Program: 'Thru the Bible', 'Presenter(s)': 'Dr. J. Vernon McGee', timeSlot: 4.5, duration: 0.5 },
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
  { Day: 'THURSDAY', 'Time (24h)': '04:30-05:00', Program: 'Thru the Bible', 'Presenter(s)': 'Various', timeSlot: 4.5, duration: 0.5 },
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
  { Day: 'FRIDAY', 'Time (24h)': '04:30-05:00', Program: 'Thru the Bible', 'Presenter(s)': 'Various', timeSlot: 4.5, duration: 0.5 },
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

const DashboardHeader = () => {
  const [currentProgram, setCurrentProgram] = useState(null);
  const [nextProgram, setNextProgram] = useState(null);
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

  // Find next program based on Liberia time
  const getNextProgram = () => {
    const now = new Date(new Date().toLocaleString("en-US", {timeZone: "Africa/Monrovia"}));
    const currentDay = days[now.getDay()].toUpperCase();
    const currentTimeDecimal = now.getHours() + (now.getMinutes() / 60);

    // Find next program today
    const nextToday = programScheduleData
      .filter(program => program.Day === currentDay && program.timeSlot > currentTimeDecimal)
      .sort((a, b) => a.timeSlot - b.timeSlot)[0];

    if (nextToday) {
      return nextToday;
    }

    // If no program today, get first program of next day
    const nextDayIndex = (now.getDay() + 1) % 7;
    const nextDayName = days[nextDayIndex].toUpperCase();
    
    return programScheduleData
      .filter(program => program.Day === nextDayName)
      .sort((a, b) => a.timeSlot - b.timeSlot)[0];
  };



  useEffect(() => {
    const timer = setInterval(() => {
      const activeProgram = getCurrentProgram();
      const upcomingProgram = getNextProgram();
      setCurrentProgram(activeProgram);
      setNextProgram(upcomingProgram);
    }, 5000); // Check every 5 seconds

    // Initial check
    setCurrentProgram(getCurrentProgram());
    setNextProgram(getNextProgram());

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 sm:py-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center">Vox Radio Presenters Dashboard</h2>
          
          {/* Current Program Display */}
          {currentProgram && (
            <div className="mt-3 text-center">
              <div className="flex items-center justify-center space-x-3">
                {/* Audio waves animation */}
                <div className="flex items-center space-x-1">
                  <div className="w-1 bg-yellow-300 rounded-full animate-pulse" style={{height: '12px', animationDelay: '0ms', animationDuration: '600ms'}}></div>
                  <div className="w-1 bg-yellow-300 rounded-full animate-pulse" style={{height: '20px', animationDelay: '100ms', animationDuration: '600ms'}}></div>
                  <div className="w-1 bg-yellow-300 rounded-full animate-pulse" style={{height: '16px', animationDelay: '200ms', animationDuration: '600ms'}}></div>
                  <div className="w-1 bg-yellow-300 rounded-full animate-pulse" style={{height: '24px', animationDelay: '300ms', animationDuration: '600ms'}}></div>
                  <div className="w-1 bg-yellow-300 rounded-full animate-pulse" style={{height: '18px', animationDelay: '400ms', animationDuration: '600ms'}}></div>
                </div>
                
                <div>
                  <div className="text-lg sm:text-xl font-bold text-white">
                    LIVE NOW: {currentProgram.Program.toUpperCase()}
                  </div>
                  <div className="text-sm sm:text-base text-orange-100 font-medium">
                    with {currentProgram['Presenter(s)'] || 'Various'} | {currentProgram['Time (24h)']}
                  </div>
                </div>
                
                {/* Audio waves animation */}
                <div className="flex items-center space-x-1">
                  <div className="w-1 bg-yellow-300 rounded-full animate-pulse" style={{height: '18px', animationDelay: '500ms', animationDuration: '600ms'}}></div>
                  <div className="w-1 bg-yellow-300 rounded-full animate-pulse" style={{height: '24px', animationDelay: '0ms', animationDuration: '600ms'}}></div>
                  <div className="w-1 bg-yellow-300 rounded-full animate-pulse" style={{height: '16px', animationDelay: '100ms', animationDuration: '600ms'}}></div>
                  <div className="w-1 bg-yellow-300 rounded-full animate-pulse" style={{height: '20px', animationDelay: '200ms', animationDuration: '600ms'}}></div>
                  <div className="w-1 bg-yellow-300 rounded-full animate-pulse" style={{height: '12px', animationDelay: '300ms', animationDuration: '600ms'}}></div>
                </div>
              </div>
            </div>
          )}

          {/* Next Program Display */}
          {nextProgram && (
            <div className="mt-2 text-center">
              <div className="text-sm font-medium text-orange-200">
                NEXT PROGRAM: {nextProgram.Program} with {nextProgram['Presenter(s)'] || 'Various'} | {nextProgram['Time (24h)']}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;