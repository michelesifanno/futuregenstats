// src/components/PlayerNews.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, List, ListItem, ListItemText, Link } from '@mui/material';

const PlayerNews = ({ playerName }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const rssFeedUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://www.gazzetta.it/rss/home.xml`;
        const response = await axios.get(rssFeedUrl);
        const filteredArticles = response.data.items.filter(item =>
          item.title.toLowerCase().includes(playerName.toLowerCase()) ||
          item.description.toLowerCase().includes(playerName.toLowerCase())
        );
        setArticles(filteredArticles);
      } catch (err) {
        setError('Errore nel recupero delle notizie');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [playerName]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Notizie su {playerName}</Typography>
      {articles.length > 0 ? (
        <List>
          {articles.map(article => (
            <ListItem key={article.guid}>
              <ListItemText
                primary={<Link href={article.link} target="_blank" rel="noopener noreferrer">{article.title}</Link>}
                secondary={article.description}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>Nessuna notizia trovata.</Typography>
      )}
    </Box>
  );
};

export default PlayerNews;
