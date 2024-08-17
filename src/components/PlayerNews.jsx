import React, { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableRow, Avatar, Chip, Grid, Accordion, AccordionSummary, AccordionDetails, useMediaQuery, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@emotion/react';

export default function PlayerNews({ playerName }) {
  const [news, setNews] = useState([]);
  const apiKey = import.meta.env.VITE_NEWS_API;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(playerName)}&apiKey=${apiKey}&language=it&pageSize=6`
      );
      const data = await response.json();

      if (data.status === "ok") {
        const newsData = data.articles.map(article => ({
          title: article.title,
          link: article.url,
          pubDate: article.publishedAt,
          source: article.source.name,
          imageUrl: article.urlToImage || 'https://via.placeholder.com/150', // Placeholder image if none provided
        }));
        setNews(newsData);
      } else {
        console.error('Error fetching news:', data.message);
      }
    };
    fetchNews();
  }, [playerName]);

  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="news-content" id="news-header">
        <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '16px' : '18px' }}>
          Notizie su <span style={{ color: '#2047e4', fontWeight: 600 }}>{playerName}</span> 📰
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer component={Paper}>
          <Table aria-label="player-news">
            <TableBody>
              {news.length > 0 ? (
                news.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{display: isMobile ? 'none' : 'block'}}>
                      <Avatar src={item.imageUrl} alt={item.title} sx={{ width: 80, height: 80 }} href={item.link} target="_blank" rel="noopener noreferrer"/>
                    </TableCell>
                    <TableCell>
                      <Typography component="a" href={item.link} target="_blank" rel="noopener noreferrer" sx={{textDecoration:'none!important', color:'#333', fontSize:'16px', lineHeight:'26px', marginBottom:'10px!important', display:'block'}}>
                        {item.title}
                      </Typography>
                      <Typography variant="body" color="textSecondary">
                       {new Date(item.pubDate).toLocaleString()} - <span style={{ color: '#2047e4' }}>{item.source}</span>
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3}>
                    <Typography>Nessuna notizia trovata.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
}
