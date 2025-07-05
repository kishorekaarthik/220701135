import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
  Card,
  CardContent,
  Divider,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LaunchIcon from '@mui/icons-material/Launch';
import LinkIcon from '@mui/icons-material/Link';
import { useLogger } from '../utils/LoggingContext';

const ShortenerPage = () => {
  const [urls, setUrls] = useState([{ url: '', validity: '', shortcode: '' }]);
  const [results, setResults] = useState([]);
  const { log } = useLogger();

  // Apply global styles to remove default margins/padding
  React.useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
    
    return () => {
      // Cleanup on unmount
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.documentElement.style.margin = '';
      document.documentElement.style.padding = '';
    };
  }, []);

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const handleAdd = () => {
    if (urls.length < 5) {
      setUrls([...urls, { url: '', validity: '', shortcode: '' }]);
    }
  };

  const handleSubmit = async () => {
    const validInputs = urls.every(u => u.url.trim() && (!u.validity || !isNaN(u.validity)));
    if (!validInputs) {
      log('Validation failed', 'ERROR');
      return;
    }

    try {
      const mockResults = urls.map((u, i) => ({
        original: u.url,
        short: `http://localhost:3000/${u.shortcode || 'abc' + i}`,
        expires: new Date(Date.now() + ((parseInt(u.validity) || 30) * 60000)).toLocaleString()
      }));
      setResults(mockResults);
      log('URLs shortened', 'INFO', { count: urls.length });
    } catch (error) {
      log('Shorten failed', 'ERROR', { error });
    }
  };

  return (
    <Box sx={{ 
      backgroundColor: '#0a0a0a', 
      minHeight: '100vh',
      width: '100vw',
      margin: 0,
      padding: { xs: 2, sm: 4 }, 
      color: '#ffffff',
      fontFamily: '"Inter", system-ui, sans-serif',
      boxSizing: 'border-box',
      position: 'fixed',
      top: 0,
      left: 0,
      overflowY: 'auto',
      overflowX: 'hidden'
    }}>
      {/* Header */}
      <Box sx={{ 
        textAlign: 'center', 
        mb: 6, 
        pt: 4,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        <LinkIcon sx={{ fontSize: 48, color: '#667eea', mb: 2 }} />
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 700, 
            mb: 1,
            fontSize: { xs: '2rem', sm: '3rem' }
          }}
        >
          URL Shortener
        </Typography>
        <Typography variant="body1" sx={{ color: '#888', fontSize: '1.1rem' }}>
          Create short, memorable links in seconds
        </Typography>
      </Box>

      {/* URL Input Section */}
      <Box sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}>
        {urls.map((entry, idx) => (
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              mb: 3, 
              borderRadius: 3, 
              backgroundColor: '#111111',
              border: '1px solid #1a1a1a',
              transition: 'all 0.3s ease',
              '&:hover': {
                border: '1px solid #333',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
              }
            }} 
            key={idx}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Enter URL to shorten"
                  fullWidth
                  variant="outlined"
                  placeholder="https://example.com/very-long-url"
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#0a0a0a',
                      borderRadius: 2,
                      '& fieldset': { borderColor: '#333' },
                      '&:hover fieldset': { borderColor: '#555' },
                      '&.Mui-focused fieldset': { borderColor: '#667eea' }
                    },
                    '& .MuiInputLabel-root': { color: '#888' },
                    '& .MuiInputBase-input': { color: '#fff', fontSize: '1.1rem' }
                  }}
                  value={entry.url}
                  onChange={(e) => handleChange(idx, 'url', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Validity (minutes)"
                  fullWidth
                  type="number"
                  variant="outlined"
                  placeholder="30"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#0a0a0a',
                      borderRadius: 2,
                      '& fieldset': { borderColor: '#333' },
                      '&:hover fieldset': { borderColor: '#555' },
                      '&.Mui-focused fieldset': { borderColor: '#667eea' }
                    },
                    '& .MuiInputLabel-root': { color: '#888' },
                    '& .MuiInputBase-input': { color: '#fff' }
                  }}
                  value={entry.validity}
                  onChange={(e) => handleChange(idx, 'validity', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Custom Code (optional)"
                  fullWidth
                  variant="outlined"
                  placeholder="my-link"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#0a0a0a',
                      borderRadius: 2,
                      '& fieldset': { borderColor: '#333' },
                      '&:hover fieldset': { borderColor: '#555' },
                      '&.Mui-focused fieldset': { borderColor: '#667eea' }
                    },
                    '& .MuiInputLabel-root': { color: '#888' },
                    '& .MuiInputBase-input': { color: '#fff' }
                  }}
                  value={entry.shortcode}
                  onChange={(e) => handleChange(idx, 'shortcode', e.target.value)}
                />
              </Grid>
            </Grid>
          </Paper>
        ))}

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            startIcon={<AddIcon />}
            onClick={handleAdd}
            disabled={urls.length >= 5}
            variant="outlined"
            sx={{ 
              borderRadius: 3,
              px: 3,
              py: 1.5,
              color: '#888',
              borderColor: '#333',
              fontSize: '1rem',
              '&:hover': { 
                borderColor: '#555',
                backgroundColor: '#111'
              },
              '&:disabled': { 
                borderColor: '#222',
                color: '#444'
              }
            }}
          >
            Add Another URL
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ 
              borderRadius: 3,
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': { 
                background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                transform: 'translateY(-1px)',
                boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)'
              }
            }}
          >
            Generate Short Links
          </Button>
        </Box>
      </Box>

      {/* Results Section */}
      {results.length > 0 && (
        <Box sx={{ maxWidth: '1000px', mx: 'auto' }}>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 600, 
              color: '#fff',
              mb: 4,
              textAlign: 'center'
            }}
          >
            ✨ Your shortened links are ready!
          </Typography>

          <Grid container spacing={3}>
            {results.map((res, i) => (
              <Grid item xs={12} md={6} key={i}>
                <Card 
                  variant="outlined" 
                  sx={{ 
                    borderRadius: 3, 
                    backgroundColor: '#111111',
                    border: '1px solid #1a1a1a',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      border: '1px solid #333',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 30px rgba(0,0,0,0.2)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="caption" sx={{ color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>
                        Original
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#ccc',
                          wordBreak: 'break-all',
                          fontSize: '0.9rem',
                          lineHeight: 1.4
                        }}
                      >
                        {res.original}
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="caption" sx={{ color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>
                        Shortened
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            color: '#667eea',
                            fontWeight: 600,
                            fontSize: '1.1rem'
                          }}
                        >
                          <a 
                            href={res.short} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            style={{ 
                              textDecoration: 'none', 
                              color: '#667eea',
                              '&:hover': { color: '#5a67d8' }
                            }}
                          >
                            {res.short}
                          </a>
                        </Typography>
                        <IconButton 
                          size="small" 
                          sx={{ color: '#667eea' }}
                          onClick={() => window.open(res.short, '_blank')}
                        >
                          <LaunchIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>

                    <Box sx={{ 
                      pt: 2, 
                      borderTop: '1px solid #1a1a1a',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}>
                      <Typography variant="caption" sx={{ color: '#666' }}>
                        ⏰ Expires: {res.expires}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default ShortenerPage;