require('dotenv').config();

const axios = require('axios');
const supabase = require('./supabase');

// Array di ID delle competizioni
const competitionIds = [
  "IT1", "IT2", "CIT", "CL", "EL", "GB1", 
  "ES1", "L1", "FR1", "IJ1", "SCI", "IT3A", 
  "IT3B", "IT3C"
];

// Funzione per ottenere informazioni su una singola competizione
const fetchCompetitionData = async (competitionId) => {
  const options = {
    method: 'GET',
    url: `${process.env.RAPID_URL}competitions/info`,
    params: { competition_id: competitionId, locale: 'IT' },
    headers: {
      'x-rapidapi-key': process.env.RAPID_API_KEY,
      'x-rapidapi-host': 'transfermarkt-db.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data.data;
  } catch (error) {
    console.error(`Errore nel recupero dei dati per la competizione ${competitionId}:`, error);
    return null;
  }
};

// Funzione per inserire i dati in Supabase
const insertCompetitionData = async (competitionData) => {
  // Mappa i nomi delle chiavi del JSON ai nomi delle colonne della tabella
  const mappedData = {
    id: competitionData.id,
    competitionname: competitionData.competitionName,
    competitionnameen: competitionData.competitionNameEN,
    marketvalue: competitionData.marketValue,
    marketvaluecurrency: competitionData.marketValueCurrency,
    marketvaluenumeral: competitionData.marketValueNumeral,
    marketvalueunformatted: competitionData.marketValueUnformatted,
    competitionimage: competitionData.competitionImage,
    hastable: competitionData.hasTable,
    trophy: competitionData.trophy,
    seasonid: competitionData.seasonId,
    season: competitionData.season,
    tournamentflag: competitionData.tournamentFlag,
    currentmatchday: competitionData.currentMatchDay,
    competitiontypeid: competitionData.competitionTypeID,
    currentchampionid: competitionData.currentChampionID,
    currentchampionname: competitionData.currentChampionName,
    currentchampionimage: competitionData.currentChampionImage,
    internationalflag: competitionData.internationalFlag,
    competitioncountryid: competitionData.competitionCountryID,
    competitioncountryimage: competitionData.competitionCountryImage,
    competitioncountryname: competitionData.competitionCountryName,
    competitioncountrynameen: competitionData.competitionCountryNameEN,
    leaguelevel: competitionData.leagueLevel,
    mostvaluableplayerid: competitionData.mostValuablePlayerID,
    mostvaluableplayername: competitionData.mostValuablePlayerName,
    mostvaluableplayermarketvalue: competitionData.mostValuablePlayerMarketValue,
    mostvaluableplayermarketvaluecurrency: competitionData.mostValuablePlayerMarketValueCurrency,
    mostvaluableplayermarketvaluenumeral: competitionData.mostValuablePlayerMarketValueNumeral,
    mostvaluableclubid: competitionData.mostValuableClubID,
    mostvaluableclubname: competitionData.mostValuableClubName,
    mostvaluableclubmarketvalue: competitionData.mostValuableClubMarketValue,
    mostvaluableclubmarketvaluecurrency: competitionData.mostValuableClubMarketValueCurrency,
    mostvaluableclubmarketvaluenumeral: competitionData.mostValuableClubMarketValueNumeral
  };

  console.log('Dati da inserire:', mappedData);

  try {
    const { data, error } = await supabase
      .from('competitions')
      .insert([mappedData]);

    if (error) {
      console.error('Errore nell\'inserimento dei dati in Supabase:', error.message);
      console.error('Dettagli dell\'errore:', error);
    } else {
      console.log('Dati inseriti con successo:', data);
    }
  } catch (err) {
    console.error('Eccezione durante l\'inserimento dei dati in Supabase:', err);
  }
};

// Funzione principale
const main = async () => {
  for (let i = 0; i < competitionIds.length; i++) {
    const competitionId = competitionIds[i];
    const competitionData = await fetchCompetitionData(competitionId);

    if (competitionData) {
      await insertCompetitionData(competitionData);
    }

    // Rispetta il limite di 5 richieste al secondo
    await new Promise(resolve => setTimeout(resolve, 200));
  }
};

main();
