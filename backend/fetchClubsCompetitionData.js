require('dotenv').config();
const axios = require('axios');
const supabase = require('./supabase');

// Array di ID delle competizioni
const competitionIds = [
  "IT1", "IT2", "IT3A", "IT3B", "IT3C", "IT4C", "IT4I", "IT4A", "IT4B", "IT4D", "IT4E", "IT4F", "IT4G", "IT4H", "ITJ6", "ITJ5", "IJ1", "ITJ4", "IJ2A", "IJ2B", "ITJ7",
  "GB1", "GB2", "GB3", "GB4", "CNAT", "NLN6", "NLS6", "GB18", "GB21",
  "ES1", "ES2", "E3G1", "E3G2", "E4G1", "E4G2", "E4G3", "E4G4", "E4G5",
  "FR1", "FR2", "FR3", "CN2B", "CN2C", "CN2A", "C3NA", "C3NO", "C3PL", "C3VL", "C3BR", "C3IF", "C3HF", "C3GE", "C3CM", "C3BF", "F19A", "F19B", "F19C", "F19D",
  "L1", "L2", "L3", "RLN3", "RLSW", "RLW3", "RLB3", "RLN4", "OBLG", "OLW3", "OBLF", "OLNI", "OLRP", "OBLJ", "OLB2", "OLB1", "OBLN", "OBLL", "OBLK", "OLMR", "OBLC", "OBLB", "SLI", "RHL", "THLI", "VLBA", "VLBE", "VLBW", "VLHM", "VLHN", "VLHS", "VLMV", "VLSA", "VLSB", "VLSW", "VLW1", "VLW2", "LNR1", "LNWE", "LLHM", "BRBL", "LBMI", "LNR2", "LBNW", "LBSO", "LBSW", "LLHA", "LLHB", "LBNO", "LLHO", "LLM1", "LLM2", "LLSA", "LLSL", "LNBR", "LNHA", "LLL", "19D1", "17DC", "17DD", "17DE", "17DF", "17DG", "17DH", "19D5", "19D2", "19D3", "19D4", "19D6", "19D7", "19D8", "17DB", "17DA"
];


// Funzione per ottenere i dati dei club per una competizione
const fetchClubsCompetitionData = async (competitionId) => {
  const options = {
    method: 'GET',
    url: `${process.env.RAPID_URL}competitions/clubs`,
    params: {
      locale: 'UK',
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
  console.log(`Aggiornamento dei dati dei club per la competizione ${competitionId}`);

  try {
    for (const club of clubsData) {
      const { error: updateError } = await supabase
        .from('clubs')
        .upsert({
          id: club.id,
          name: club.name,
          image: club.image,
          competition_id: competitionId // Associa il competitionId
        });

      if (updateError) {
        console.error('Errore nell\'aggiornamento del club:', updateError.message);
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
