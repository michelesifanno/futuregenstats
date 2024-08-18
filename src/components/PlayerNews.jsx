import React, { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableRow, Avatar, Grid, Accordion, AccordionSummary, AccordionDetails, useMediaQuery, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@emotion/react';

export default function PlayerNews({ playerName, playerClub, playerRole }) {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_NEWS_API; // Assicurati che la chiave API sia correttamente configurata
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const sanitizeString = (str) => {
    return str.replace(/[^\w\s]/gi, ' ').trim();
  };
  
  useEffect(() => {
    const fetchNews = async () => {
      const sanitizedClubName = sanitizeString(playerClub);
      try {
        const response = await fetch(
          `https://gnews.io/api/v4/search?q=${encodeURIComponent(playerName)}%20${encodeURIComponent(sanitizedClubName)}&token=${apiKey}&lang=it&max=6`        );
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        if (data && data.articles) {
          const newsData = data.articles.map(article => ({
            title: article.title,
            link: article.url,
            pubDate: article.publishedAt,
            source: article.source.name,
            imageUrl: article.image || 'https://via.placeholder.com/150', // Placeholder image if none provided
          }));
          setNews(newsData);
        } else {
          throw new Error('No articles found');
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchNews();
  }, [playerName, playerClub, apiKey]);

  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="news-content" id="news-header">
        <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '16px' : '18px' }}>
          Notizie su <span style={{ color: '#2047e4', fontWeight: 600 }}>{playerName}</span> 📰
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {error ? (
          <Typography color="error">Errore: {error}</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table aria-label="player-news">
              <TableBody>
                {news.length > 0 ? (
                  news.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{display: isMobile ? 'none' : 'block'}}>
                        <Avatar 
                          src={item.imageUrl} 
                          alt={item.title} 
                          sx={{ width: 80, height: 80 }} 
                          component="a"
                          href={item.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography 
                          component="a" 
                          href={item.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          sx={{textDecoration:'none!important', color:'#333', fontSize:'16px', lineHeight:'26px', marginBottom:'10px!important', display:'block'}}
                        >
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {new Date(item.pubDate).toLocaleString()} - <span style={{ color: '#2047e4' }}>{item.source}</span>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2}>
                      <Typography>Nessuna notizia trovata.</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
