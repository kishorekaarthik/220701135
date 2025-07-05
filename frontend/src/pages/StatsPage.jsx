import React from 'react';
import { Box, Typography } from '@mui/material';
import { useLogger } from '../utils/LoggingContext';

const StatsPage = () => {
  const { log } = useLogger();
  log('Visited stats page', 'INFO');

  return (
    <Box>
      <Typography variant="h4">Statistics</Typography>
      <Typography>Display all stats here (mocked or from backend)</Typography>
    </Box>
  );
};

export default StatsPage;