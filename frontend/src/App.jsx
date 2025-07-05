import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import ShortenerPage from './pages/ShortenerPage';
import StatsPage from './pages/StatsPage';
import RedirectHandler from './pages/RedirectHandler';
import { LoggingProvider } from './utils/LoggingContext';

function App() {
  return (
    <LoggingProvider>
      <Router>
        <Container maxWidth="md">
          <Routes>
            <Route path="/" element={<ShortenerPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/:shortcode" element={<RedirectHandler />} />
          </Routes>
        </Container>
      </Router>
    </LoggingProvider>
  );
}

export default App;