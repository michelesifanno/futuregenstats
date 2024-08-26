require('dotenv').config();
const axios = require('axios');
const supabase = require('./supabase');

const MAX_REQUESTS = 499;
let requestCount = 0;

// Funzione per ottenere l'ultimo ID dei club inseriti
const fetchLastClubId = async () => {
  try {
    const { data, error } = await supabase
      .from('players')
      .select('club_id')
      .order('club_id', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Errore nel recupero dell\'ultimo ID del club:', error.message);
      return null;
    }

    if (data.length > 0) {
      return data[0].club_id;
    }
  } catch (error) {
    console.error('Eccezione durante il recupero dell\'ultimo ID del club:', error);
  }

  return null;
};

// Funzione per ottenere gli ID delle squadre dalla tabella 'clubs' a partire dall'ultimo ID
const fetchClubIds = async (lastClubId) => {
  try {
    let query = supabase
      .from('clubs')
      .select('id')
      .order('id', { ascending: true });

    if (lastClubId) {
      query = query.gt('id', lastClubId);
    }

    const { data, error } = await query;

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
const insertPlayersData = async (playersData, clubId) => {
  // Funzione per convertire i valori in numeri e sostituire i valori non numerici con null
  const parseIntOrNull = (value) => {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? null : parsed;
  };

  // Funzione per gestire le date e sostituire le date non valide con null
  const parseDateOrNull = (timestamp) => {
    try {
      const date = new Date(timestamp * 1000);
      // Verifica se la data è valida
      if (isNaN(date.getTime()) || date.getFullYear() < 1900) {
        // Se la data non è valida o l'anno è inferiore a 1900, ritorna null
        return null;
      }
      return date.toISOString();
    } catch (error) {
      console.error(`Errore nella conversione della data ${timestamp}:`, error);
      return null;
    }
  };

  // Mappa i dati dei giocatori con valori convertiti
  const mappedData = playersData.map(player => {
    // Controlla e gestisci i valori problematici
    const dateofbirth = parseDateOrNull(player.dateOfBirth);
    if (dateofbirth === null && player.dateOfBirth) {
      console.warn(`Data di nascita non valida per il giocatore ${player.id}: ${player.dateOfBirth}`);
    }
    
    return {
      id: player.id,
      name: player.name,
      image: player.image,
      shirtnumber: parseIntOrNull(player.shirtNumber),
      age: parseIntOrNull(player.age),
      dateofbirth: dateofbirth,
      height: parseIntOrNull(player.height),
      foot: player.foot,
      marketvalue: player.marketValue.value,
      marketvaluecurrency: player.marketValue.currency,
      positions: player.positions,
      nationalities: player.nationalities,
      club_id: clubId
    };
  });

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
  let lastClubId = await fetchLastClubId();
  let clubIds = await fetchClubIds(lastClubId);

  if (clubIds.length === 0) {
    console.log('Nessun club da elaborare.');
    return;
  }

  for (let i = 0; i < clubIds.length; i++) {
    if (requestCount >= MAX_REQUESTS) {
      console.log('Limite di richieste raggiunto. Interrompendo l\'esecuzione.');
      break;
    }

    const clubId = clubIds[i];
    const playersData = await fetchPlayersData(clubId);
    if (playersData) {
      await insertPlayersData(playersData, clubId);
    }

    await new Promise(resolve => setTimeout(resolve, 200));
  }
};

main();