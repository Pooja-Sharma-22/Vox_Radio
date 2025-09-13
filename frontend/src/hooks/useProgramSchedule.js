import { useState, useEffect, useMemo } from 'react';
import { TIME_CONFIG } from '../config/timeConfig';
import { 
  nowMonrovia, 
  isLiveNow, 
  getNextProgram, 
  getCountdownMinutes,
  formatCountdown 
} from '../utils/timeUtils';

// Backend URL from environment
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

/**
 * Custom hook for managing program schedule with Monrovia timezone
 */
export const useProgramSchedule = (programScheduleData) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [serverTimeOffset, setServerTimeOffset] = useState(0);
  const [isServerTimeSynced, setIsServerTimeSynced] = useState(false);

  // Sync with server time on mount
  useEffect(() => {
    const syncServerTime = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/server-time`);
        if (response.ok) {
          const serverTime = await response.json();
          const serverUTC = new Date(serverTime.utc);
          const clientUTC = new Date();
          const offset = serverUTC.getTime() - clientUTC.getTime();
          
          setServerTimeOffset(offset);
          setIsServerTimeSynced(true);
          console.log('Server time synced, offset:', offset, 'ms');
        } else {
          console.warn('Failed to sync server time, using client time');
          setIsServerTimeSynced(false);
        }
      } catch (error) {
        console.warn('Server time sync failed:', error.message);
        setIsServerTimeSynced(false);
      }
    };

    syncServerTime();
  }, []);

  // Update current time every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      // Apply server time offset if available
      if (isServerTimeSynced) {
        now.setTime(now.getTime() + serverTimeOffset);
      }
      setCurrentTime(now);
    }, TIME_CONFIG.TICK_INTERVAL);

    return () => clearInterval(timer);
  }, [serverTimeOffset, isServerTimeSynced]);

  // Get current program
  const currentProgram = useMemo(() => {
    if (!programScheduleData || programScheduleData.length === 0) return null;
    
    const monroviaTime = nowMonrovia();
    if (isServerTimeSynced) {
      monroviaTime.setTime(monroviaTime.getTime() + serverTimeOffset);
    }
    
    return programScheduleData.find(program => isLiveNow(program, monroviaTime));
  }, [programScheduleData, currentTime, serverTimeOffset, isServerTimeSynced]);

  // Get next program
  const nextProgram = useMemo(() => {
    if (!programScheduleData || programScheduleData.length === 0) return null;
    
    const monroviaTime = nowMonrovia();
    if (isServerTimeSynced) {
      monroviaTime.setTime(monroviaTime.getTime() + serverTimeOffset);
    }
    
    return getNextProgram(programScheduleData, monroviaTime);
  }, [programScheduleData, currentTime, serverTimeOffset, isServerTimeSynced]);

  // Get countdown to next program
  const countdown = useMemo(() => {
    if (!nextProgram) return null;
    
    const monroviaTime = nowMonrovia();
    if (isServerTimeSynced) {
      monroviaTime.setTime(monroviaTime.getTime() + serverTimeOffset);
    }
    
    const minutes = getCountdownMinutes(nextProgram, monroviaTime);
    return {
      minutes,
      formatted: formatCountdown(minutes)
    };
  }, [nextProgram, currentTime, serverTimeOffset, isServerTimeSynced]);

  // Check if a specific program is live
  const isProgramLive = useMemo(() => {
    return (program) => {
      const monroviaTime = nowMonrovia();
      if (isServerTimeSynced) {
        monroviaTime.setTime(monroviaTime.getTime() + serverTimeOffset);
      }
      return isLiveNow(program, monroviaTime);
    };
  }, [currentTime, serverTimeOffset, isServerTimeSynced]);

  return {
    currentProgram,
    nextProgram,
    countdown,
    isProgramLive,
    currentTime,
    isServerTimeSynced,
    serverTimeOffset
  };
};