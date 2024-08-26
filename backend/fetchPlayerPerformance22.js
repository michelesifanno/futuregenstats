require('dotenv').config();
const axios = require('axios');
const supabase = require('./supabase');

// Funzione per ottenere tutti gli ID dei giocatori dalla tabella `player_performance_23`
const fetchAllPlayerPerformance23Ids = async () => {
  let allIds = [];
  let lastId = null;
  let data;

  do {
    let query = supabase
      .from('players_performance_23')
      .select('player_id')  // player_id come integer
      .order('player_id', { ascending: true })
      .limit(1000);
      
    if (lastId) {
      query = query.gt('player_id', lastId);
    }

    const result = await query;
    data = result.data;

    if (result.error) {
      console.error('Errore nel recupero degli ID delle performance dalla tabella players_performance_23:', result.error.message);
      return [];
    }

    if (data.length > 0) {
      allIds.push(...data.map(performance => performance.player_id.toString()));  // Converti a stringa
      lastId = data[data.length - 1].player_id;
    }
  } while (data.length === 1000);

  // Rimuovere i duplicati usando Set
  const uniqueIds = [...new Set(allIds)];
  console.log(`ID performance unici recuperati dalla tabella players_performance_23: ${uniqueIds.length}`);
  return uniqueIds;
};

// Funzione per ottenere tutti gli ID delle performance già presenti nella tabella `player_performance_22`
const fetchAllPlayerPerformance22Ids = async () => {
  let allIds = [];
  let lastId = null;
  let data;

  do {
    let query = supabase
      .from('players_performance_22')
      .select('player_id')  // player_id come integer
      .order('player_id', { ascending: true })
      .limit(1000);
      
    if (lastId) {
      query = query.gt('player_id', lastId);
    }

    const result = await query;
    data = result.data;

    if (result.error) {
      console.error('Errore nel recupero degli ID delle performance dalla tabella players_performance_22:', result.error.message);
      return [];
    }

    if (data.length > 0) {
      allIds.push(...data.map(performance => performance.player_id.toString()));  // Converti a stringa
      lastId = data[data.length - 1].player_id;
    }
  } while (data.length === 1000);

  // Rimuovere i duplicati usando Set
  const uniqueIds = [...new Set(allIds)];
  console.log(`ID performance unici recuperati dalla tabella players_performance_22: ${uniqueIds.length}`);
  return uniqueIds;
};

// Funzione per ottenere le performance di un giocatore
const fetchPlayerPerformance = async (playerId) => {
  const options = {
    method: 'GET',
    url: 'https://transfermarkt-db.p.rapidapi.com/v1/players/performance',
    params: {
      player_id: playerId,
      locale: 'UK',
      season_id: '2022'
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
    console.error(`Errore nel recupero delle performance per il giocatore ${playerId}:`, error.message);
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
      .from('players_performance_22')
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
    // Recupera tutti gli ID dei giocatori da player_performance_23
    const playerPerformance23Ids = await fetchAllPlayerPerformance23Ids();

    // Recupera tutti gli ID dei giocatori già presenti in player_performance_22
    const playerPerformance22Ids = await fetchAllPlayerPerformance22Ids();

    // Trova gli ID mancanti in player_performance_22
    const missingPlayerIds = playerPerformance23Ids.filter(id => !playerPerformance22Ids.includes(id));

    // Verifica che il calcolo degli ID mancanti sia corretto
    console.log(`ID mancanti per il fetch delle performance per player_performance_22: ${missingPlayerIds.length}`);
    
    // Aggiungi un log dettagliato degli ID mancanti
    console.log(`ID mancanti: ${missingPlayerIds.join(', ')}`);

    if (missingPlayerIds.length === 0) {
      console.log('Tutti i giocatori hanno già performance salvate in player_performance_22.');
      return;
    }

    // Elaborazione dei giocatori con performance mancanti
    for (const playerId of missingPlayerIds) {
      console.log(`Inizio recupero delle performance per il giocatore ${playerId}`);
      const performanceData = await fetchPlayerPerformance(playerId);

      if (performanceData) {
        await insertPlayerPerformance(playerId, performanceData);
      } else {
        console.log(`Nessun dato di performance trovato per il giocatore ${playerId}`);
      }

      // Rispetta il limite di rate per le richieste API
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    console.log('Processo completato.');
  } catch (error) {
    console.error('Errore durante l\'esecuzione del processo principale:', error.message);
  }
};

main();
