// Vox Radio Time Configuration
// All times should be displayed in Liberia time (Africa/Monrovia, UTC+0)

export const TIME_CONFIG = {
  // Canonical timezone for Vox Radio
  APP_TZ: 'Africa/Monrovia',
  
  // Display format settings
  DISPLAY_FORMAT: 'HH:mm',
  LABEL_TZ: 'GMT',
  
  // Update intervals
  TICK_INTERVAL: 5000, // 5 seconds
  LIVE_CHECK_INTERVAL: 60000, // 1 minute
  
  // Time format options for Intl.DateTimeFormat
  MONROVIA_FORMAT_OPTIONS: {
    timeZone: 'Africa/Monrovia',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  },
  
  FULL_MONROVIA_FORMAT_OPTIONS: {
    timeZone: 'Africa/Monrovia',
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }
};

// Development mode toggle for testing
export const DEV_CONFIG = {
  SIMULATE_TIME: false,
  TIME_OFFSET_MINUTES: 0
};