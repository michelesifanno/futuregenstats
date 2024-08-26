require('dotenv').config();
const axios = require('axios');
const supabase = require('./supabase');

// Numero massimo di richieste
const MAX_REQUESTS = 499;

// Contatore delle richieste effettuate
let requestCount = 0;

// Funzione per ottenere gli ID delle squadre e delle competizioni dalla tabella 'clubs'
const fetchClubCompetitionIds = async () => {
  try {
    const { data, error } = await supabase
      .from('clubs')
      .select('id, competition_id');

    if (error) {
      console.error('Errore nel recupero degli ID dei club e delle competizioni:', error.message);
      return [];
    }

    return data;
  } catch (error) {
    console.error('Eccezione durante il recupero degli ID dei club e delle competizioni:', error);
    return [];
  }
};

// Funzione per controllare se i dati dei giocatori sono già presenti nella tabella 'players'
const checkPlayersDataExists = async (clubId) => {
  try {
    const { data, error } = await supabase
      .from('players')
      .select('id')
      .eq('club_id', clubId)

    if (error) {
      console.error('Errore nel controllo dei dati dei giocatori:', error.message);
      return false;
    }

    return data.length > 0;
  } catch (error) {
    console.error('Eccezione durante il controllo dei dati dei giocatori:', error);
    return false;
  }
};

// Funzione per ottenere i giocatori di una squadra
const fetchPlayersData = async (clubId, competitionId) => {
  if (requestCount >= MAX_REQUESTS) {
    console.log('Limite di richieste raggiunto.');
    return null;
  }

  const options = {
    method: 'GET',
    url: `${process.env.RAPID_URL}clubs/squad`,
    params: {
      season_id: '2024',
      locale: 'UK',
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
// Funzione per inserire i dati dei giocatori in Supabase
const insertPlayersData = async (playersData, clubId, competitionId) => {
  const mappedData = playersData
    .filter(player => {
      // Filtra i giocatori con valori validi per dateOfBirth e marketValue
      return player.dateOfBirth && player.dateOfBirth !== "-" && player.marketValue && !isNaN(player.marketValue.value);
    })
    .map(player => ({
      id: player.id,
      name: player.name,
      image: player.image,
      shirtnumber: player.shirtNumber,
      age: player.age,
      dateofbirth: player.dateOfBirth && player.dateOfBirth !== "-" 
        ? new Date(player.dateOfBirth * 1000).toISOString() 
        : null, // Imposta come null se dateOfBirth non è valido
      height: player.height,
      foot: player.foot,
      marketvalue: player.marketValue ? player.marketValue.value : null,
      marketvaluecurrency: player.marketValue ? player.marketValue.currency : null,
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
  // Recupera gli ID delle squadre e delle competizioni dalla tabella 'clubs'
  const clubData = await fetchClubCompetitionIds();
  
  let startProcessing = false;

  for (const club of clubData) {
    if (requestCount >= MAX_REQUESTS) {
      console.log('Limite di richieste raggiunto. Interrompendo l\'esecuzione.');
      break;
    }

    const { id: clubId, competition_id: competitionId } = club;

    // Controlla se i dati dei giocatori sono già presenti
    const dataExists = await checkPlayersDataExists(clubId, competitionId);
    if (dataExists) {
      console.log(`Dati dei giocatori per la squadra ${clubId} già presenti.`);
      continue;
    }

    // Se è la prima volta che si esegue la funzione o se la squadra è quella dell'ultimo calciatore, inizia il processo
    if (!startProcessing) {
      startProcessing = true;
    }

    // Recupera i dati dei giocatori
    const playersData = await fetchPlayersData(clubId, competitionId);
    if (playersData) {
      await insertPlayersData(playersData, clubId, competitionId);
    }

    // Rispetta il limite di 5 richieste al secondo
    await new Promise(resolve => setTimeout(resolve, 200));
  }
};

main();
