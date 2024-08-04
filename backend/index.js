const express = require('express');
const cron = require('node-cron');
const fetchPlayers = require('./fetchPlayers');
const fetchStats = require('./fetchInfo');
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

// Funzione per pulire la tabella dei giocatori e aggiornare i dati
const updatePlayersData = async () => {
  try {
    // Esegui fetchPlayers e fetchStats
    await fetchPlayers();
    console.log('Players data fetched and stored successfully.');

    await fetchStats();
    console.log('Player stats fetched and stored successfully.');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Esegui updatePlayersData all'avvio del server
updatePlayersData();

// Pianifica il cron job per eseguire fetchPlayers e fetchStats ogni mese (ad esempio il primo giorno del mese alle 00:00)
cron.schedule('0 0 1 * *', () => {
  console.log('Running scheduled task...');
  updatePlayersData();
});

// Esegui fetchStats ogni mese il primo giorno del mese
cron.schedule('0 0 1 * *', () => {
  console.log('Running scheduled stats fetch...');
  fetchStats();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
