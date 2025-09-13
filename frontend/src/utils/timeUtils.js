import { TIME_CONFIG, DEV_CONFIG } from '../config/timeConfig';

/**
 * Get current time in Monrovia timezone
 * @returns {Date} Current time adjusted for Monrovia
 */
export const nowMonrovia = () => {
  try {
    const now = new Date();
    
    // Apply dev time offset if in simulation mode
    if (DEV_CONFIG.SIMULATE_TIME) {
      now.setMinutes(now.getMinutes() + DEV_CONFIG.TIME_OFFSET_MINUTES);
    }
    
    return now;
  } catch (error) {
    console.error('Error in nowMonrovia:', error);
    return new Date();
  }
};

/**
 * Format a date/time for display in Monrovia timezone
 * @param {Date|string} dateOrIso - Date object or ISO string
 * @param {boolean} includeLabel - Whether to include GMT label
 * @returns {string} Formatted time string
 */
export const formatMonrovia = (dateOrIso, includeLabel = true) => {
  const date = typeof dateOrIso === 'string' ? new Date(dateOrIso) : dateOrIso;
  
  const formatter = new Intl.DateTimeFormat('en-US', TIME_CONFIG.MONROVIA_FORMAT_OPTIONS);
  const timeString = formatter.format(date);
  
  return includeLabel ? `${timeString} ${TIME_CONFIG.LABEL_TZ}` : timeString;
};

/**
 * Format full datetime for tooltips/audit
 * @param {Date|string} dateOrIso - Date object or ISO string
 * @returns {string} Full formatted datetime string
 */
export const formatMonroviaFull = (dateOrIso) => {
  const date = typeof dateOrIso === 'string' ? new Date(dateOrIso) : dateOrIso;
  
  const formatter = new Intl.DateTimeFormat('en-US', TIME_CONFIG.FULL_MONROVIA_FORMAT_OPTIONS);
  return formatter.format(date);
};

/**
 * Parse time string (HH:mm) and create Date object for today in Monrovia timezone
 * @param {string} timeString - Time in HH:mm format
 * @param {number} dayOffset - Days to offset (0 = today, 1 = tomorrow, -1 = yesterday)
 * @returns {Date} Date object representing the time in Monrovia
 */
export const parseTimeToMonroviaDate = (timeString, dayOffset = 0) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  
  // Get current date in Monrovia timezone
  const now = nowMonrovia();
  const monroviaDate = new Date(now.toLocaleString('en-US', { timeZone: TIME_CONFIG.APP_TZ }));
  
  // Set the time
  monroviaDate.setHours(hours);
  monroviaDate.setMinutes(minutes);
  monroviaDate.setSeconds(0);
  monroviaDate.setMilliseconds(0);
  
  // Apply day offset
  if (dayOffset !== 0) {
    monroviaDate.setDate(monroviaDate.getDate() + dayOffset);
  }
  
  return monroviaDate;
};

/**
 * Check if a program is currently live
 * @param {Object} program - Program object with timeSlot and duration
 * @param {Date} nowMonrovia - Current time in Monrovia
 * @returns {boolean} True if program is currently live
 */
export const isLiveNow = (program, nowMonrovia = null) => {
  if (!nowMonrovia) {
    nowMonrovia = new Date();
  }
  
  // Get current day and time in Monrovia
  const monroviaFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_CONFIG.APP_TZ,
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  });
  
  const monroviaTime = monroviaFormatter.formatToParts(nowMonrovia);
  const currentDay = monroviaTime.find(part => part.type === 'weekday').value.toUpperCase();
  const currentHour = parseInt(monroviaTime.find(part => part.type === 'hour').value);
  const currentMinute = parseInt(monroviaTime.find(part => part.type === 'minute').value);
  const currentTimeSlot = currentHour + (currentMinute / 60);
  
  // Check if it's the right day and time slot
  const programDay = program.Day;
  const programStart = program.timeSlot;
  const programEnd = programStart + program.duration;
  
  if (programDay !== currentDay) {
    return false;
  }
  
  // Handle cross-midnight programs
  if (programEnd > 24) {
    // Program crosses midnight
    return currentTimeSlot >= programStart || currentTimeSlot < (programEnd - 24);
  } else {
    // Normal program within same day
    return currentTimeSlot >= programStart && currentTimeSlot < programEnd;
  }
};

/**
 * Get the next program after current time
 * @param {Array} programSchedule - Array of program objects
 * @param {Date} nowMonrovia - Current time in Monrovia
 * @returns {Object|null} Next program object or null
 */
export const getNextProgram = (programSchedule, nowMonrovia = null) => {
  if (!nowMonrovia) {
    nowMonrovia = new Date();
  }
  
  // Get current day and time in Monrovia
  const monroviaFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_CONFIG.APP_TZ,
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  });
  
  const monroviaTime = monroviaFormatter.formatToParts(nowMonrovia);
  const currentDay = monroviaTime.find(part => part.type === 'weekday').value.toUpperCase();
  const currentHour = parseInt(monroviaTime.find(part => part.type === 'hour').value);
  const currentMinute = parseInt(monroviaTime.find(part => part.type === 'minute').value);
  const currentTimeSlot = currentHour + (currentMinute / 60);
  
  // Find programs for today that start after current time
  const todayPrograms = programSchedule
    .filter(program => program.Day === currentDay && program.timeSlot > currentTimeSlot)
    .sort((a, b) => a.timeSlot - b.timeSlot);
  
  if (todayPrograms.length > 0) {
    return todayPrograms[0];
  }
  
  // If no programs today, get first program of tomorrow
  const dayOrder = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  const tomorrow = dayOrder[(dayOrder.indexOf(currentDay) + 1) % 7];
  
  const tomorrowPrograms = programSchedule
    .filter(program => program.Day === tomorrow)
    .sort((a, b) => a.timeSlot - b.timeSlot);
  
  return tomorrowPrograms.length > 0 ? tomorrowPrograms[0] : null;
};

/**
 * Calculate countdown to next program in minutes
 * @param {Object} nextProgram - Next program object
 * @param {Date} nowMonrovia - Current time in Monrovia
 * @returns {number} Minutes until next program starts
 */
export const getCountdownMinutes = (nextProgram, nowMonrovia = null) => {
  if (!nextProgram || !nowMonrovia) {
    return 0;
  }
  
  // Get current time info in Monrovia
  const monroviaFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_CONFIG.APP_TZ,
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  });
  
  const monroviaTime = monroviaFormatter.formatToParts(nowMonrovia);
  const currentDay = monroviaTime.find(part => part.type === 'weekday').value.toUpperCase();
  const currentHour = parseInt(monroviaTime.find(part => part.type === 'hour').value);
  const currentMinute = parseInt(monroviaTime.find(part => part.type === 'minute').value);
  const currentTimeSlot = currentHour + (currentMinute / 60);
  
  let targetTimeSlot = nextProgram.timeSlot;
  
  // If next program is tomorrow, add 24 hours
  if (nextProgram.Day !== currentDay) {
    targetTimeSlot += 24;
  }
  
  const diffHours = targetTimeSlot - currentTimeSlot;
  return Math.max(0, Math.round(diffHours * 60));
};

/**
 * Format countdown for display
 * @param {number} minutes - Minutes remaining
 * @returns {string} Formatted countdown string
 */
export const formatCountdown = (minutes) => {
  if (minutes === 0) {
    return 'Starting now';
  } else if (minutes < 60) {
    return `${minutes}m`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${remainingMinutes}m`;
    }
  }
};