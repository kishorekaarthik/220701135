import React, { createContext, useContext } from 'react';
import { log as logToServer } from './logger';

const LoggingContext = createContext();

export const LoggingProvider = ({ children }) => {
  const log = (stack, level, pkg, message, metadata = {}) => {
    logToServer(stack, level, pkg, message, metadata);
  };

  return (
    <LoggingContext.Provider value={{ log }}>
      {children}
    </LoggingContext.Provider>
  );
};

export const useLogger = () => useContext(LoggingContext);
