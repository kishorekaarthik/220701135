import React, { createContext, useContext } from 'react';
import axios from 'axios';

const LoggingContext = createContext();

const CLIENT_ID = 'your-client-id';
const CLIENT_SECRET = 'your-client-secret';

export const LoggingProvider = ({ children }) => {
  const log = async (message, level = 'INFO', metadata = {}) => {
    try {
      await axios.post('http://20.244.56.144/evaluation-service/log', {
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        message,
        level,
        metadata,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
        console.error('Logging failed:', error);
    }
  };

  return (
    <LoggingContext.Provider value={{ log }}>
      {children}
    </LoggingContext.Provider>
  );
};

export const useLogger = () => useContext(LoggingContext);