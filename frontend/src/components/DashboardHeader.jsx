import React, { useState, useEffect, useMemo } from 'react';
import { useProgramSchedule } from '../hooks/useProgramSchedule.js';
import { formatMonrovia } from '../utils/timeUtils.js';
import { TIME_CONFIG } from '../config/timeConfig.js';

const DashboardHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Complete program schedule (synchronized with VoxRadioProgramLog.jsx)
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
  { Day: 'MONDAY', 'Time (24h)': '05:00-08:00', Program: 'The Quiet Storm', 'Presenter(s)': 'Justus Owaka', timeSlot: 5, duration: 3 },
  { Day: 'MONDAY', 'Time (24h)': '08:00-09:00', Program: 'Good Shepherd Fellowship', 'Presenter(s)': 'Bishop Thomas', timeSlot: 8, duration: 1 },
  { Day: 'MONDAY', 'Time (24h)': '09:00-10:00', Program: 'Living Word', 'Presenter(s)': 'Dr Mensah Otabil', timeSlot: 9, duration: 1 },
  { Day: 'MONDAY', 'Time (24h)': '10:00-10:10', Program: 'Jingles and Music', 'Presenter(s)': 'Deddeh Gayflor', timeSlot: 10, duration: 0.17 },
  { Day: 'MONDAY', 'Time (24h)': '10:10-10:20', Program: 'Announcement', 'Presenter(s)': 'Deddeh Gayflor', timeSlot: 10.17, duration: 0.17 },
  { Day: 'MONDAY', 'Time (24h)': '10:20-10:45', Program: 'Back To The Bible Canada', 'Presenter(s)': 'Dr. John Neufeld', timeSlot: 10.33, duration: 0.42 },
  { Day: 'MONDAY', 'Time (24h)': '10:45-11:00', Program: 'Music', 'Presenter(s)': 'Deddeh Gayflor', timeSlot: 10.75, duration: 0.25 },
  { Day: 'MONDAY', 'Time (24h)': '11:00-13:00', Program: 'Worship Connexion', 'Presenter(s)': 'New Life Africa / TWR', timeSlot: 11, duration: 2 },
  { Day: 'MONDAY', 'Time (24h)': '13:00-13:05', Program: 'Word To Go', 'Presenter(s)': 'Dr Mensah Otabil', timeSlot: 13, duration: 0.08 },
  { Day: 'MONDAY', 'Time (24h)': '13:05-15:00', Program: 'Launch Time Connection', 'Presenter(s)': 'Deddeh Gayflor', timeSlot: 13.08, duration: 1.92 },
  { Day: 'MONDAY', 'Time (24h)': '15:00-16:30', Program: 'The Heart Beat', 'Presenter(s)': 'Various', timeSlot: 15, duration: 1.5 },
  { Day: 'MONDAY', 'Time (24h)': '16:30-17:30', Program: 'Thru The Bible', 'Presenter(s)': 'Dr. J. Vernon McGee', timeSlot: 16.5, duration: 1 },
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
  { Day: 'TUESDAY', 'Time (24h)': '05:00-08:00', Program: 'The Quiet Storm', 'Presenter(s)': 'Justus Owaka', timeSlot: 5, duration: 3 },
  { Day: 'TUESDAY', 'Time (24h)': '08:00-09:00', Program: 'Good Shepherd Fellowship', 'Presenter(s)': 'Bishop Thomas', timeSlot: 8, duration: 1 },
  { Day: 'TUESDAY', 'Time (24h)': '09:00-10:00', Program: 'Living Word', 'Presenter(s)': 'Dr Mensah Otabil', timeSlot: 9, duration: 1 },
  { Day: 'TUESDAY', 'Time (24h)': '10:00-10:10', Program: 'Jingles and Music', 'Presenter(s)': 'Emmanuel Lepolu', timeSlot: 10, duration: 0.17 },
  { Day: 'TUESDAY', 'Time (24h)': '10:10-10:20', Program: 'Announcement', 'Presenter(s)': 'Emmanuel Lepolu', timeSlot: 10.17, duration: 0.17 },
  { Day: 'TUESDAY', 'Time (24h)': '10:20-10:45', Program: 'Back To The Bible Canada', 'Presenter(s)': 'Dr. John Neufeld', timeSlot: 10.33, duration: 0.42 },
  { Day: 'TUESDAY', 'Time (24h)': '10:45-11:00', Program: 'Music', 'Presenter(s)': 'Emmanuel Lepolu', timeSlot: 10.75, duration: 0.25 },
  { Day: 'TUESDAY', 'Time (24h)': '11:00-13:00', Program: 'Worship Connexion', 'Presenter(s)': 'New Life Africa / TWR', timeSlot: 11, duration: 2 },
  { Day: 'TUESDAY', 'Time (24h)': '13:00-13:05', Program: 'Word To Go', 'Presenter(s)': 'Dr Mensah Otabil', timeSlot: 13, duration: 0.08 },
  { Day: 'TUESDAY', 'Time (24h)': '13:05-15:00', Program: 'Launch Time Connection', 'Presenter(s)': 'Beauty Nuah', timeSlot: 13.08, duration: 1.92 },
  { Day: 'TUESDAY', 'Time (24h)': '15:00-16:30', Program: 'The Heart Beat', 'Presenter(s)': 'Various', timeSlot: 15, duration: 1.5 },
  { Day: 'TUESDAY', 'Time (24h)': '16:30-17:30', Program: 'Thru The Bible', 'Presenter(s)': 'Dr. J. Vernon McGee', timeSlot: 16.5, duration: 1 },
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
  { Day: 'WEDNESDAY', 'Time (24h)': '05:00-08:00', Program: 'The Quiet Storm', 'Presenter(s)': 'Justus Owaka', timeSlot: 5, duration: 3 },
  { Day: 'WEDNESDAY', 'Time (24h)': '08:00-09:00', Program: 'Good Shepherd Fellowship', 'Presenter(s)': 'Bishop Thomas', timeSlot: 8, duration: 1 },
  { Day: 'WEDNESDAY', 'Time (24h)': '09:00-10:00', Program: 'Living Word', 'Presenter(s)': 'Dr Mensah Otabil', timeSlot: 9, duration: 1 },
  { Day: 'WEDNESDAY', 'Time (24h)': '10:00-10:10', Program: 'Jingles and Music', 'Presenter(s)': 'Emmanuel Lepolu', timeSlot: 10, duration: 0.17 },
  { Day: 'WEDNESDAY', 'Time (24h)': '10:10-10:20', Program: 'Announcement', 'Presenter(s)': 'Emmanuel Lepolu', timeSlot: 10.17, duration: 0.17 },
  { Day: 'WEDNESDAY', 'Time (24h)': '10:20-10:45', Program: 'New Day Hour', 'Presenter(s)': 'Pastor Fatorma', timeSlot: 10.33, duration: 0.42 },
  { Day: 'WEDNESDAY', 'Time (24h)': '10:45-11:00', Program: 'Music', 'Presenter(s)': 'T. KCalvin Walter', timeSlot: 10.75, duration: 0.25 },
  { Day: 'WEDNESDAY', 'Time (24h)': '11:00-13:00', Program: 'Worship Connexion', 'Presenter(s)': 'New Life Africa / TWR', timeSlot: 11, duration: 2 },
  { Day: 'WEDNESDAY', 'Time (24h)': '13:00-13:05', Program: 'Word To Go', 'Presenter(s)': 'Dr Mensah Otabil', timeSlot: 13, duration: 0.08 },
  { Day: 'WEDNESDAY', 'Time (24h)': '13:05-15:00', Program: 'Launch Time Connection', 'Presenter(s)': 'Beauty Nuah', timeSlot: 13.08, duration: 1.92 },
  { Day: 'WEDNESDAY', 'Time (24h)': '15:00-16:30', Program: 'The Heart Beat', 'Presenter(s)': 'Various', timeSlot: 15, duration: 1.5 },
  { Day: 'WEDNESDAY', 'Time (24h)': '16:30-17:30', Program: 'Thru The Bible', 'Presenter(s)': 'Dr. J. Vernon McGee', timeSlot: 16.5, duration: 1 },
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
  { Day: 'THURSDAY', 'Time (24h)': '04:30-05:00', Program: 'Thru the Bible', 'Presenter(s)': 'Dr. J. Vernon McGee', timeSlot: 4.5, duration: 0.5 },
  { Day: 'THURSDAY', 'Time (24h)': '05:00-08:00', Program: 'The Quiet Storm', 'Presenter(s)': 'Justus Owaka', timeSlot: 5, duration: 3 },
  { Day: 'THURSDAY', 'Time (24h)': '08:00-09:00', Program: 'Good Shepherd Fellowship', 'Presenter(s)': 'Bishop Thomas', timeSlot: 8, duration: 1 },
  { Day: 'THURSDAY', 'Time (24h)': '09:00-10:00', Program: 'Living Word', 'Presenter(s)': 'Dr Mensah Otabil', timeSlot: 9, duration: 1 },
  { Day: 'THURSDAY', 'Time (24h)': '10:00-10:10', Program: 'Jingles and Music', 'Presenter(s)': 'Emmanuel Lepolu', timeSlot: 10, duration: 0.17 },
  { Day: 'THURSDAY', 'Time (24h)': '10:10-10:20', Program: 'Announcement', 'Presenter(s)': 'Emmanuel Lepolu', timeSlot: 10.17, duration: 0.17 },
  { Day: 'THURSDAY', 'Time (24h)': '10:20-11:00', Program: 'Music', 'Presenter(s)': 'Deddeh Gayflor', timeSlot: 10.33, duration: 0.67 },
  { Day: 'THURSDAY', 'Time (24h)': '11:00-13:00', Program: 'Worship Connexion', 'Presenter(s)': 'New Life Africa / TWR', timeSlot: 11, duration: 2 },
  { Day: 'THURSDAY', 'Time (24h)': '13:00-13:05', Program: 'Word To Go', 'Presenter(s)': 'Dr Mensah Otabil', timeSlot: 13, duration: 0.08 },
  { Day: 'THURSDAY', 'Time (24h)': '13:05-15:00', Program: 'Launch Time Connect', 'Presenter(s)': 'Deddeh Gayflor', timeSlot: 13.08, duration: 1.92 },
  { Day: 'THURSDAY', 'Time (24h)': '15:00-16:30', Program: 'The Heart Beat', 'Presenter(s)': 'Various', timeSlot: 15, duration: 1.5 },
  { Day: 'THURSDAY', 'Time (24h)': '16:30-17:30', Program: 'Thru The Bible', 'Presenter(s)': 'Dr. J. Vernon McGee', timeSlot: 16.5, duration: 1 },
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
  { Day: 'FRIDAY', 'Time (24h)': '04:30-05:00', Program: 'Thru the Bible', 'Presenter(s)': 'Dr. J. Vernon McGee', timeSlot: 4.5, duration: 0.5 },
  { Day: 'FRIDAY', 'Time (24h)': '05:00-08:00', Program: 'The Quiet Storm', 'Presenter(s)': 'Justus Owaka', timeSlot: 5, duration: 3 },
  { Day: 'FRIDAY', 'Time (24h)': '08:00-09:00', Program: 'Good Shepherd Fellowship', 'Presenter(s)': 'Bishop Thomas', timeSlot: 8, duration: 1 },
  { Day: 'FRIDAY', 'Time (24h)': '09:00-10:00', Program: 'Living Word', 'Presenter(s)': 'Dr Mensah Otabil', timeSlot: 9, duration: 1 },
  { Day: 'FRIDAY', 'Time (24h)': '10:00-10:10', Program: 'Jingles and Music', 'Presenter(s)': 'Maxim Somah', timeSlot: 10, duration: 0.17 },
  { Day: 'FRIDAY', 'Time (24h)': '10:10-10:20', Program: 'Announcement', 'Presenter(s)': 'Maxim Somah', timeSlot: 10.17, duration: 0.17 },
  { Day: 'FRIDAY', 'Time (24h)': '10:20-11:00', Program: 'Music', 'Presenter(s)': 'Maxim Somah', timeSlot: 10.33, duration: 0.67 },
  { Day: 'FRIDAY', 'Time (24h)': '11:00-13:00', Program: 'Worship Connexion', 'Presenter(s)': 'New Life Africa / TWR', timeSlot: 11, duration: 2 },
  { Day: 'FRIDAY', 'Time (24h)': '13:00-13:05', Program: 'Word To Go', 'Presenter(s)': 'Dr Mensah Otabil', timeSlot: 13, duration: 0.08 },
  { Day: 'FRIDAY', 'Time (24h)': '13:05-15:00', Program: 'Launch Time Connect', 'Presenter(s)': 'Maxim Somah', timeSlot: 13.08, duration: 1.92 },
  { Day: 'FRIDAY', 'Time (24h)': '15:00-15:20', Program: 'Music', 'Presenter(s)': 'Various', timeSlot: 15, duration: 0.33 },
  { Day: 'FRIDAY', 'Time (24h)': '15:20-15:24', Program: 'Guidelines For Living', 'Presenter(s)': 'Guidelines International', timeSlot: 15.33, duration: 0.07 },
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
  { Day: 'SATURDAY', 'Time (24h)': '05:00-07:00', Program: 'Music', 'Presenter(s)': 'T. KCalvin Walter', timeSlot: 5, duration: 2 },
  { Day: 'SATURDAY', 'Time (24h)': '07:00-08:30', Program: 'The Morning Jam', 'Presenter(s)': 'T. KCalvin Walter', timeSlot: 7, duration: 1.5 },
  { Day: 'SATURDAY', 'Time (24h)': '08:30-09:00', Program: 'Music', 'Presenter(s)': 'T. KCalvin Walter', timeSlot: 8.5, duration: 0.5 },
  { Day: 'SATURDAY', 'Time (24h)': '09:00-10:15', Program: 'Vox Sports DESK', 'Presenter(s)': 'T. KCalvin Walter and Emmanuel', timeSlot: 9, duration: 1.25 },
  { Day: 'SATURDAY', 'Time (24h)': '10:15-11:15', Program: 'Teenagers Talk', 'Presenter(s)': 'Janet and D\'Alessandro', timeSlot: 10.25, duration: 1 },
  { Day: 'SATURDAY', 'Time (24h)': '11:15-13:00', Program: 'Music', 'Presenter(s)': 'Various', timeSlot: 11.25, duration: 1.75 },
  { Day: 'SATURDAY', 'Time (24h)': '13:00-13:30', Program: 'Truth For Life', 'Presenter(s)': 'Alistair Begg', timeSlot: 13, duration: 0.5 },
  { Day: 'SATURDAY', 'Time (24h)': '13:30-14:00', Program: 'Planet Sports', 'Presenter(s)': 'Steve Vickers', timeSlot: 13.5, duration: 0.5 },
  { Day: 'SATURDAY', 'Time (24h)': '14:00-16:00', Program: 'Island Praise', 'Presenter(s)': 'Stacy Rose', timeSlot: 14, duration: 2 },
  { Day: 'SATURDAY', 'Time (24h)': '16:00-19:00', Program: 'Blessed Beatz', 'Presenter(s)': 'New Life Africa', timeSlot: 16, duration: 3 },
  { Day: 'SATURDAY', 'Time (24h)': '19:00-00:00', Program: 'Transformed DJ', 'Presenter(s)': 'New Life Africa', timeSlot: 19, duration: 5 }
];

  // Use the program schedule hook for proper Monrovia time handling
  const { 
    currentProgram, 
    nextProgram, 
    countdown,
    isServerTimeSynced 
  } = useProgramSchedule(programScheduleData);

  // Update current time every second for display
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format current time in Monrovia timezone
  const formatLiberiaTime = useMemo(() => {
    return formatMonrovia(currentTime, true);
  }, [currentTime]);

  return (
    <div className="bg-gradient-to-r from-orange-600 to-orange-800 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="py-3 px-2 sm:py-6 sm:px-0">
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-center mb-2">Vox Radio Presenters Dashboard</h2>
          
          {/* Current Program Display - Mobile First */}
          {currentProgram && (
            <div className="mt-2 px-2">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3">
                {/* Audio waves animation - smaller on mobile */}
                <div className="flex items-center space-x-1">
                  <div className="w-1 bg-yellow-300 rounded-full animate-pulse" style={{height: '8px', animationDelay: '0ms', animationDuration: '600ms'}}></div>
                  <div className="w-1 bg-yellow-300 rounded-full animate-pulse" style={{height: '12px', animationDelay: '100ms', animationDuration: '600ms'}}></div>
                  <div className="w-1 bg-yellow-300 rounded-full animate-pulse" style={{height: '10px', animationDelay: '200ms', animationDuration: '600ms'}}></div>
                  <div className="w-1 bg-yellow-300 rounded-full animate-pulse" style={{height: '14px', animationDelay: '300ms', animationDuration: '600ms'}}></div>
                  <div className="w-1 bg-yellow-300 rounded-full animate-pulse" style={{height: '11px', animationDelay: '400ms', animationDuration: '600ms'}}></div>
                </div>
                
                <div className="text-center">
                  <div className="text-sm sm:text-lg lg:text-xl font-bold text-white">
                    LIVE NOW: {currentProgram.Program.toUpperCase()}
                  </div>
                  <div className="text-xs sm:text-sm lg:text-base text-orange-100 font-medium mt-1">
                    with {currentProgram['Presenter(s)'] || 'Various'}
                  </div>
                  <div className="text-xs sm:text-sm text-orange-200 mt-1">
                    {currentProgram['Time (24h)']}
                  </div>
                </div>
                
                {/* Audio waves animation - smaller on mobile */}
                <div className="flex items-center space-x-1">
                  <div className="w-1 bg-yellow-300 rounded-full animate-pulse" style={{height: '11px', animationDelay: '500ms', animationDuration: '600ms'}}></div>
                  <div className="w-1 bg-yellow-300 rounded-full animate-pulse" style={{height: '14px', animationDelay: '0ms', animationDuration: '600ms'}}></div>
                  <div className="w-1 bg-yellow-300 rounded-full animate-pulse" style={{height: '10px', animationDelay: '100ms', animationDuration: '600ms'}}></div>
                  <div className="w-1 bg-yellow-300 rounded-full animate-pulse" style={{height: '12px', animationDelay: '200ms', animationDuration: '600ms'}}></div>
                  <div className="w-1 bg-yellow-300 rounded-full animate-pulse" style={{height: '8px', animationDelay: '300ms', animationDuration: '600ms'}}></div>
                </div>
              </div>
            </div>
          )}

          {/* Next Program Display - Mobile First */}
          {nextProgram && (
            <div className="mt-3 px-2 text-center">
              <div className="text-xs sm:text-sm font-medium text-orange-200">
                NEXT PROGRAM: {nextProgram.Program} with {nextProgram['Presenter(s)'] || 'Various'} | {nextProgram['Time (24h)']}
              </div>
            </div>
          )}

          {/* Current Time Display */}
          <div className="mt-2 text-center">
            <div className="text-xs sm:text-sm text-orange-200">
              Current Liberia Time: {formatLiberiaTime}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;