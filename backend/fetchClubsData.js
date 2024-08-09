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
const fetchClubsData = async (competitionId) => {
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
    return null;
  }
};

// Funzione per verificare l'esistenza degli ID delle competizioni
const verifyCompetitionIds = async () => {
  const { data, error } = await supabase
    .from('competitions')
    .select('id')
    .in('id', competitionIds);

  if (error) {
    console.error('Errore nella verifica degli ID delle competizioni:', error.message);
    return [];
  }

  return new Set(data.map(comp => comp.id));
};

// Funzione per inserire o aggiornare i dati delle squadre in Supabase
const insertOrUpdateClubs = async (clubsData, validCompetitionIds) => {
  const mappedData = clubsData.map(club => ({
    id: club.id,
    name: club.name,
    image: club.image,
    competition_id: club.competition_id
  }));

  console.log('Dati delle squadre da inserire/aggiornare:', mappedData);

  try {
    for (const data of mappedData) {
      if (!validCompetitionIds.has(data.competition_id)) {
        console.warn(`ID competizione non valido: ${data.competition_id}`);
        continue;
      }

      const { data: existingClubData, error: fetchError } = await supabase
        .from('clubs')
        .select('id, competition_id')
        .eq('id', data.id)
        .single();

      if (fetchError) {
        console.error('Errore nel recupero del club:', fetchError.message);
        continue;
      }

      if (existingClubData) {
        // Aggiorna la competizione se non è già presente
        if (!existingClubData.competition_id.includes(data.competition_id)) {
          const { error: updateError } = await supabase
            .from('clubs')
            .update({ competition_id: [...existingClubData.competition_id, data.competition_id] })
            .eq('id', data.id);

          if (updateError) {
            console.error('Errore nell\'aggiornamento del club:', updateError.message);
          }
        }
      } else {
        // Inserisce il nuovo club
        const { error: insertError } = await supabase
          .from('clubs')
          .insert([data]);

        if (insertError) {
          console.error('Errore nell\'inserimento del club:', insertError.message);
        }
      }
    }
  } catch (err) {
    console.error('Eccezione durante l\'inserimento/aggiornamento dei dati delle squadre in Supabase:', err);
  }
};

// Funzione principale
const main = async () => {
  // Verifica gli ID delle competizioni
  const validCompetitionIds = await verifyCompetitionIds();

  if (validCompetitionIds.size === 0) {
    console.error('Nessun ID competizione valido trovato.');
    return;
  }

  for (const competitionId of competitionIds) {
    // Recupera i dati dei club
    const clubsData = await fetchClubsData(competitionId);
    if (clubsData) {
      await insertOrUpdateClubs(clubsData, validCompetitionIds);
    }

    // Rispetta il limite di 5 richieste al secondo
    await new Promise(resolve => setTimeout(resolve, 200));
  }
};

main();
