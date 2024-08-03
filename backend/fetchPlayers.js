const axios = require('axios');
const supabase = require('./supabase');
require('dotenv').config();

const competitions = [
    { id: 2021, name: 'Premier League' },
    { id: 2019, name: 'Serie A' },
    { id: 2002, name: 'Bundesliga' },
    { id: 2015, name: 'Ligue 1' },
    { id: 2014, name: 'La Liga' },
    { id: 2013, name: 'Brasileirão' }, // Campeonato Brasileiro Série A
    { id: 2003, name: 'Eredivisie' }, // Olanda
    { id: 2017, name: 'Primeira Liga' }, // Portogallo
    { id: 2018, name: 'J1 League' }, // Giappone
    { id: 1016, name: 'Major League Soccer' } // Stati Uniti
];

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const fetchPlayers = async () => {
  const apiKey = process.env.API_KEY;
  const baseUrl = process.env.BASE_URL;
  const headers = { 'X-Auth-Token': apiKey };

  try {
    for (const competition of competitions) {
      const teamsUrl = `${baseUrl}/v2/competitions/${competition.id}/teams`;
      
      const teamsResponse = await axios.get(teamsUrl, { headers });
      const teams = teamsResponse.data.teams;
      console.log(`Teams fetched for ${competition.name}:`, teams.length);

      for (const team of teams) {
        await delay(6000); // Ritardo di 6 secondi tra le richieste

        const teamId = team.id;
        const teamUrl = `${baseUrl}/v2/teams/${teamId}`;

        let teamResponse;
        let retries = 3;

        while (retries > 0) {
          try {
            teamResponse = await axios.get(teamUrl, { headers });
            console.log(`Players fetched for team ${team.name} (${competition.name}):`, teamResponse.data.squad.length);
            break;
          } catch (error) {
            if (error.response && error.response.status === 429) {
              console.error('Rate limit exceeded, retrying in 15 seconds...');
              await delay(15000); // Aspetta 15 secondi prima di riprovare
              retries--;
            } else {
              throw error;
            }
          }
        }

        if (!teamResponse) {
          console.error(`Failed to fetch team ${team.name} after multiple retries`);
          continue;
        }

        const players = teamResponse.data.squad;

        for (const player of players) {
          const { id, name, position, nationality, dateOfBirth } = player;
          const { name: teamName } = team;
          const competitionName = competition.name;

          const { error } = await supabase
            .from('players')
            .upsert({
              id,
              name,
              position,
              nationality,
              dateofbirth: dateOfBirth,
              team: teamName,
              competition: competitionName
            }, {
              onConflict: ['id']
            });

          if (error) {
            console.error(`Error inserting player ${name}:`, error.message);
          } else {
            console.log(`Player ${name} inserted/updated successfully.`);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error fetching players:', error);
  }
};

module.exports = fetchPlayers;
