require('dotenv').config();
const axios = require('axios');
const supabase = require('./supabase');

// Array di ID delle competizioni
const competitionIds = [
  "IT1", "IT2", "CIT", "CL", "EL", "GB1", 
  "ES1", "L1", "FR1", "IJ1", "SCI", "IT3A", 
  "IT3B", "IT3C"
];

// Funzione per ottenere i dati dei club per una competizione
const fetchClubsCompetitionData = async (competitionId) => {
  const options = {
    method: 'GET',
    url: `${process.env.RAPID_URL}competitions/clubs`,
    params: {
      locale: 'IT',
      competition_id: competitionId
    },
    headers: {
      'x-rapidapi-key': process.env.RAPID_API_KEY,
      'x-rapidapi-host': 'transfermarkt-db.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data.data;
  } catch (error) {
    console.error(`Errore nel recupero delle squadre per la competizione ${competitionId}:`, error);
    return [];
  }
};

// Funzione per inserire o aggiornare i dati delle squadre in Supabase
const insertOrUpdateClubs = async (clubsData, competitionId) => {
  // Inserisci i dati dei club
  try {
    for (const club of clubsData) {
      // Inserisci o aggiorna i dati del club
      const { error: insertError } = await supabase
        .from('clubs')
        .upsert({
          id: club.id,
          name: club.name,
          image: club.image
        });

      if (insertError) {
        console.error('Errore nell\'inserimento del club:', insertError.message);
        continue;
      }

      // Inserisci la relazione club-competizione
      const { error: relationError } = await supabase
        .from('club_competitions')
        .upsert({
          club_id: club.id,
          competition_id: competitionId
        });

      if (relationError) {
        console.error('Errore nell\'inserimento della relazione club-competizione:', relationError.message);
      }
    }
  } catch (err) {
    console.error('Eccezione durante l\'inserimento dei dati delle squadre in Supabase:', err);
  }
};

// Funzione principale
const main = async () => {
  for (const competitionId of competitionIds) {
    // Recupera i dati dei club
    const clubsData = await fetchClubsCompetitionData(competitionId);
    console.log(`Dati dei club per la competizione ${competitionId}:`, clubsData);
    if (clubsData && clubsData.length > 0) {
      await insertOrUpdateClubs(clubsData, competitionId);
    } else {
      console.log(`Nessun dato trovato per la competizione ${competitionId}.`);
    }

    // Rispetta il limite di 5 richieste al secondo
    await new Promise(resolve => setTimeout(resolve, 200));
  }
};

main();
