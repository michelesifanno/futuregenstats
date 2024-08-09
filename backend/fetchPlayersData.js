require('dotenv').config();
const axios = require('axios');
const supabase = require('./supabase');

// Numero massimo di richieste
const MAX_REQUESTS = 499;

// Contatore delle richieste effettuate
let requestCount = 0;

// Funzione per ottenere gli ID delle squadre dalla tabella 'clubs'
const fetchClubIds = async () => {
  try {
    const { data, error } = await supabase
      .from('clubs')
      .select('id');

    if (error) {
      console.error('Errore nel recupero degli ID dei club:', error.message);
      return [];
    }

    return data.map(club => club.id);
  } catch (error) {
    console.error('Eccezione durante il recupero degli ID dei club:', error);
    return [];
  }
};

// Funzione per ottenere i giocatori di una squadra
const fetchPlayersData = async (clubId) => {
  if (requestCount >= MAX_REQUESTS) {
    console.log('Limite di richieste raggiunto.');
    return null;
  }

  const options = {
    method: 'GET',
    url: `${process.env.RAPID_URL}clubs/squad`,
    params: {
      season_id: '2024',
      locale: 'IT',
      club_id: clubId
    },
    headers: {
      'x-rapidapi-key': process.env.RAPID_API_KEY,
      'x-rapidapi-host': 'transfermarkt-db.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    requestCount++;
    return response.data.data;
  } catch (error) {
    console.error(`Errore nel recupero dei giocatori per la squadra ${clubId}:`, error);
    return null;
  }
};

// Funzione per inserire i dati dei giocatori in Supabase
const insertPlayersData = async (playersData, clubId) => {
  const mappedData = playersData.map(player => ({
    id: player.id,
    name: player.name,
    image: player.image,
    shirtnumber: player.shirtNumber,
    age: player.age,
    dateofbirth: new Date(player.dateOfBirth * 1000).toISOString(),
    height: player.height,
    foot: player.foot,
    marketvalue: player.marketValue.value,
    marketvaluecurrency: player.marketValue.currency,
    positions: player.positions,
    nationalities: player.nationalities,
    club_id: clubId
  }));

  console.log('Dati dei giocatori da inserire:', mappedData);

  try {
    const { data, error } = await supabase
      .from('players')
      .upsert(mappedData);

    if (error) {
      console.error('Errore nell\'inserimento dei dati dei giocatori in Supabase:', error.message);
      console.error('Dettagli dell\'errore:', error);
    } else {
      console.log('Dati dei giocatori inseriti con successo:', data);
    }
  } catch (err) {
    console.error('Eccezione durante l\'inserimento dei dati dei giocatori in Supabase:', err);
  }
};

// Funzione principale
const main = async () => {
  // Recupera gli ID delle squadre dalla tabella 'clubs'
  const clubIds = await fetchClubIds();
  
  let startProcessing = false;

  for (let i = 0; i < clubIds.length; i++) {
    if (requestCount >= MAX_REQUESTS) {
      console.log('Limite di richieste raggiunto. Interrompendo l\'esecuzione.');
      break;
    }

    const clubId = clubIds[i];

    // Se è la prima volta che si esegue la funzione o se la squadra è quella dell'ultimo calciatore, inizia il processo
    if (!startProcessing) {
      startProcessing = true;
    }

    // Recupera i dati dei giocatori
    const playersData = await fetchPlayersData(clubId);
    if (playersData) {
      await insertPlayersData(playersData, clubId);
    }

    // Rispetta il limite di 5 richieste al secondo
    await new Promise(resolve => setTimeout(resolve, 200));
  }
};

main();
