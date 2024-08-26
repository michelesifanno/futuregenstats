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
