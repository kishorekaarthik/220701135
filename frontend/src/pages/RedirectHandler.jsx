import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLogger } from '../utils/LoggingContext';

const RedirectHandler = () => {
  const { shortcode } = useParams();
  const { log } = useLogger();

  useEffect(() => {
    const fetchAndRedirect = async () => {
      try {
        // Replace with actual backend call
        const longUrl = "https://example.com";
        log('Redirecting', 'INFO', { shortcode });
        window.location.href = longUrl;
      } catch (err) {
        log('Redirection failed', 'ERROR', { shortcode });
      }
    };
    fetchAndRedirect();
  }, [shortcode]);

  return <p>Redirecting...</p>;
};

export default RedirectHandler;

