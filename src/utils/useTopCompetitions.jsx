import { useState, useEffect } from 'react';
import supabase from '../supabase/client';

const useTopCompetitions = (filter) => {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompetitions = async () => {
      setLoading(true);
      setError(null);

      try {
        let data;

        switch (filter) {
          case 'num_players':
            const { data: numPlayersData, error: numPlayersError } = await supabase
              .from('players')
              .select('competition, id')
              .order('competition', { ascending: true });

            if (numPlayersError) throw numPlayersError;

            const numPlayersCount = numPlayersData.reduce((acc, player) => {
              acc[player.competition] = (acc[player.competition] || 0) + 1;
              return acc;
            }, {});

            data = Object.keys(numPlayersCount).map(competition => ({
              competition,
              sum: numPlayersCount[competition], // Usa `sum` per uniformità
            }));
            break;

          case 'total_goals':
            const { data: totalGoalsData, error: totalGoalsError } = await supabase
              .from('players_stats')
              .select('player_id, goals');

            if (totalGoalsError) throw totalGoalsError;

            const competitionGoals = await Promise.all(
              totalGoalsData.map(async stat => {
                const { data: playerData, error: playerError } = await supabase
                  .from('players')
                  .select('competition')
                  .eq('id', stat.player_id)
                  .single();

                if (playerError) throw playerError;

                return {
                  competition: playerData.competition,
                  goals: stat.goals,
                };
              })
            );

            const totalGoalsCount = competitionGoals.reduce((acc, { competition, goals }) => {
              acc[competition] = (acc[competition] || 0) + goals;
              return acc;
            }, {});

            data = Object.keys(totalGoalsCount).map(competition => ({
              competition,
              sum: totalGoalsCount[competition], // Usa `sum` per uniformità
            }));
            break;

          case 'total_assists':
            const { data: totalAssistsData, error: totalAssistsError } = await supabase
              .from('players_stats')
              .select('player_id, assists');

            if (totalAssistsError) throw totalAssistsError;

            const competitionAssists = await Promise.all(
              totalAssistsData.map(async stat => {
                const { data: playerData, error: playerError } = await supabase
                  .from('players')
                  .select('competition')
                  .eq('id', stat.player_id)
                  .single();

                if (playerError) throw playerError;

                return {
                  competition: playerData.competition,
                  assists: stat.assists,
                };
              })
            );

            const totalAssistsCount = competitionAssists.reduce((acc, { competition, assists }) => {
              acc[competition] = (acc[competition] || 0) + assists;
              return acc;
            }, {});

            data = Object.keys(totalAssistsCount).map(competition => ({
              competition,
              sum: totalAssistsCount[competition], // Usa `sum` per uniformità
            }));
            break;

          case 'total_matches':
            const { data: totalMatchesData, error: totalMatchesError } = await supabase
              .from('players_stats')
              .select('player_id, matches');

            if (totalMatchesError) throw totalMatchesError;

            const competitionMatches = await Promise.all(
              totalMatchesData.map(async stat => {
                const { data: playerData, error: playerError } = await supabase
                  .from('players')
                  .select('competition')
                  .eq('id', stat.player_id)
                  .single();

                if (playerError) throw playerError;

                return {
                  competition: playerData.competition,
                  matches: stat.matches,
                };
              })
            );

            const totalMatchesCount = competitionMatches.reduce((acc, { competition, matches }) => {
              acc[competition] = (acc[competition] || 0) + matches;
              return acc;
            }, {});

            data = Object.keys(totalMatchesCount).map(competition => ({
              competition,
              sum: totalMatchesCount[competition], // Usa `sum` per uniformità
            }));
            break;

          case 'avg_market_value':
            const { data: avgMarketValueData, error: avgMarketValueError } = await supabase
              .from('players_info')
              .select('current_team, market_value');

            if (avgMarketValueError) throw avgMarketValueError;

            const marketValueSum = avgMarketValueData.reduce((acc, { current_team, market_value }) => {
              if (!acc[current_team]) {
                acc[current_team] = { total: 0, count: 0 };
              }
              acc[current_team].total += market_value;
              acc[current_team].count += 1;
              return acc;
            }, {});

            data = Object.keys(marketValueSum).map(competition => ({
              competition,
              avg: marketValueSum[competition].total / marketValueSum[competition].count,
            }));
            break;

          default:
            throw new Error('Filtro non valido');
        }

        setCompetitions(data);
      } catch (error) {
        setError('Errore durante il recupero dei dati');
        console.error('Errore:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitions();
  }, [filter]);

  return { competitions, loading, error };
};

export default useTopCompetitions;
