import axios from 'axios';

// Replace with your actual credentials
const CLIENT_ID = '0fd545c0-f70e-4a7e-beb9-0c827b31ad1d';
const CLIENT_SECRET = 'qcMksvzADAZMJvEv';


const LOGGING_API = 'http://20.244.56.144/evaluation-service/log';

/**
 * Logs lifecycle events to the external logging API.
 * 
 * @param {string} stack - Component or side (e.g., 'frontend', 'backend')
 * @param {string} level - Log level: 'info', 'warn', 'error', 'fatal'
 * @param {string} pkg - Package or subsystem name: 'db', 'auth', 'handler'
 * @param {string} message - Descriptive message
 * @param {object} metadata - Optional additional info (default: {})
 */
export const log = async (stack, level, pkg, message, metadata = {}) => {
  try {
    await axios.post(LOGGING_API, {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      stack,
      level,
      package: pkg,
      message,
      metadata,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    // Per instructions, do not use console.log; silently fail
  }
};
