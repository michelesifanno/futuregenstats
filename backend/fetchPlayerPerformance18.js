require('dotenv').config();
const axios = require('axios');
const supabase = require('./supabase');
const fs = require('fs');
const LAST_PROCESSED_FILE = './last_processed_player_id.txt';

// Funzione per leggere l'ultimo playerId processato dal file
const readLastProcessedPlayerId = () => {
  if (fs.existsSync(LAST_PROCESSED_FILE)) {
    return fs.readFileSync(LAST_PROCESSED_FILE, 'utf8');
  }
  return null;
};

// Funzione per scrivere l'ultimo playerId processato nel file
const writeLastProcessedPlayerId = (playerId) => {
  fs.writeFileSync(LAST_PROCESSED_FILE, playerId, 'utf8');
};

// Funzione per ottenere tutti gli ID unici dei giocatori dalla tabella `players_performance_23`
const fetchUniquePlayerPerformanceIds = async () => {
  let allIds = [];
  let lastId = null;
  let data;

  do {
    let query = supabase
      .from('players_performance_19')
      .select('player_id')
      .order('player_id', { ascending: true })
      .limit(1000);
      
    if (lastId) {
      query = query.gt('player_id', lastId);
    }

    const result = await query;
    data = result.data;

    if (result.error) {
      console.error('Errore nel recupero degli ID delle performance:', result.error.message);
      return [];
    }

    if (data.length > 0) {
      allIds.push(...data.map(performance => performance.player_id.toString()));  // Converti a stringa
      lastId = data[data.length - 1].player_id;
    }
  } while (data.length === 1000);

  // Rimuovere i duplicati usando Set
  const uniqueIds = [...new Set(allIds)];
  console.log(`ID performance unici recuperati: ${uniqueIds.length}`);
  return uniqueIds;
};

// Funzione per ottenere le performance di un giocatore
// Funzione per ottenere le performance di un giocatore
const fetchPlayerPerformance = async (playerId) => {
  const options = {
    method: 'GET',
    url: 'https://transfermarkt-db.p.rapidapi.com/v1/players/performance',
    params: {
      player_id: playerId,
      locale: 'UK',
      season_id: '2018'  // Cambiato per recuperare i dati della stagione 2022
    },
    headers: {
      'x-rapidapi-key': process.env.RAPID_API_KEY,
      'x-rapidapi-host': 'transfermarkt-db.p.rapidapi.com'
    }
  };

  try {
    console.log(`Richiesta delle performance per il giocatore ${playerId}`);
    const response = await axios.request(options);
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.error(`Errore 429: Troppe richieste. Il processo viene bloccato.`);
      process.exit(1);  // Blocca il processo
    } else {
      console.error(`Errore nel recupero delle performance per il giocatore ${playerId}:`, error.message);
    }
    return null;
  }
};


// Funzione per inserire i dati delle performance dei giocatori in Supabase
const insertPlayerPerformance = async (playerId, performanceData) => {
  if (!performanceData || !performanceData.competitionPerformanceSummery) {
    console.error(`Dati delle performance non disponibili per il giocatore ${playerId}.`);
    return;
  }

  const performanceEntries = performanceData.competitionPerformanceSummery.flatMap(summary => {
    const { competition, performance, clubs } = summary;

    if (!competition || !performance || !clubs) {
      console.error(`Dati mancanti nella sintesi delle performance per il giocatore ${playerId}.`);
      return [];
    }

    return clubs.map(club => ({
      player_id: playerId,
      competition_id: competition.id,
      competition_name: competition.name,
      competition_short_name: competition.shortName,
      competition_image: competition.image,
      own_goals: parseInt(performance.ownGoals, 10) || 0,
      yellow_cards: parseInt(performance.yellowCards, 10) || 0,
      yellow_red_cards: parseInt(performance.yellowRedCards, 10) || 0,
      red_cards: parseInt(performance.redCards, 10) || 0,
      minutes_played: parseInt(performance.minutesPlayed, 10) || 0,
      penalty_goals: parseInt(performance.penaltyGoals, 10) || 0,
      minutes_per_goal: parseFloat(performance.minutesPerGoal) || 0,
      matches: parseInt(performance.matches, 10) || 0,
      goals: parseInt(performance.goals, 10) || 0,
      assists: parseInt(performance.assists, 10) || 0,
      to_nil: parseInt(performance.toNil, 10) || 0,
      conceded_goals: parseInt(performance.concededGoals, 10) || 0,
      is_goalkeeper: performance.isGoalkeeper || false,
      club_id: club.id,
      club_name: club.name,
      club_full_name: club.fullName,
      club_image: club.image
    }));
  });

  try {
    const { data, error } = await supabase
      .from('players_performance_18')  // Inserimento nella tabella `players_performance_22`
      .upsert(performanceEntries, { onConflict: ['player_id', 'competition_id', 'club_id'] });

    if (error) {
      console.error('Errore nell\'inserimento dei dati delle performance in Supabase:', error.message);
    } else {
      console.log(`Dati delle performance inseriti per il giocatore ${playerId}.`);
    }
  } catch (error) {
    console.error('Errore generale durante l\'inserimento dei dati delle performance:', error.message);
  }
};

// Funzione principale
const main = async () => {
  try {
    // Recupera tutti gli ID unici dei giocatori dalla tabella `players_performance_23`
    const uniquePlayerPerformanceIds = await fetchUniquePlayerPerformanceIds();

    if (uniquePlayerPerformanceIds.length === 0) {
      console.log('Non ci sono ID unici dei giocatori da elaborare.');
      return;
    }

    // Leggi l'ultimo playerId processato
    const lastProcessedPlayerId = readLastProcessedPlayerId();
    const startIndex = lastProcessedPlayerId ? uniquePlayerPerformanceIds.indexOf(lastProcessedPlayerId) + 1 : 0;

    // Elaborazione dei giocatori con performance mancanti
    for (let i = startIndex; i < uniquePlayerPerformanceIds.length; i++) {
      const playerId = uniquePlayerPerformanceIds[i];
      console.log(`Inizio recupero delle performance per il giocatore ${playerId}`);
      const performanceData = await fetchPlayerPerformance(playerId);

      if (performanceData) {
        await insertPlayerPerformance(playerId, performanceData);
      } else {
        console.log(`Nessun dato di performance trovato per il giocatore ${playerId}`);
      }

      // Salva il playerId processato
      writeLastProcessedPlayerId(playerId);

      // Rispetta il limite di rate per le richieste API
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    console.log('Processo completato.');
  } catch (error) {
    console.error('Errore durante l\'esecuzione del processo principale:', error.message);
  }
};

main();