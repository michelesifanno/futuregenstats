const express = require('express');
const cron = require('node-cron');
const fetchPlayers = require('./fetchPlayers');
const supabase = require('./supabase');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.get('/players', async (req, res) => {
  const { data, error } = await supabase
    .from('players')
    .select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// Esegui fetchPlayers all'avvio del server per il test
fetchPlayers().then(() => {
  console.log('Players data fetched and stored successfully.');
}).catch(error => {
  console.error('Error fetching players data:', error);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
