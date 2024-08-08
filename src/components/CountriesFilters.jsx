import React, { useEffect, useState } from 'react';
import supabase from '../supabase/client';
import Flag from './Flag';

const CountriesFilter = ({ filter }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        let data;

        switch (filter) {
          case 'num_players':
            const { data: numPlayersData, error: numPlayersError } = await supabase
              .from('players')
              .select('nationality, id')
              .order('nationality', { ascending: true });

            if (numPlayersError) throw numPlayersError;

            // Aggrega il numero di giocatori per nazionalità
            const numPlayersCount = numPlayersData.reduce((acc, player) => {
              acc[player.nationality] = (acc[player.nationality] || 0) + 1;
              return acc;
            }, {});

            data = Object.keys(numPlayersCount).map(nationality => ({
              nationality,
              count: numPlayersCount[nationality],
            }));
            break;

          case 'total_goals':
            const { data: totalGoalsData, error: totalGoalsError } = await supabase
              .from('players_stats')
              .select('player_id, goals');

            if (totalGoalsError) throw totalGoalsError;

            const playerGoals = await Promise.all(
              totalGoalsData.map(async stat => {
                const { data: playerData, error: playerError } = await supabase
                  .from('players')
                  .select('nationality')
                  .eq('id', stat.player_id)
                  .single();

                if (playerError) throw playerError;

                return {
                  nationality: playerData.nationality,
                  goals: stat.goals,
                };
              })
            );

            // Aggrega i goal totali per nazionalità
            const totalGoalsCount = playerGoals.reduce((acc, { nationality, goals }) => {
              acc[nationality] = (acc[nationality] || 0) + goals;
              return acc;
            }, {});

            data = Object.keys(totalGoalsCount).map(nationality => ({
              nationality,
              sum: totalGoalsCount[nationality],
            }));
            break;

          case 'total_assists':
            const { data: totalAssistsData, error: totalAssistsError } = await supabase
              .from('players_stats')
              .select('player_id, assists');

            if (totalAssistsError) throw totalAssistsError;

            const playerAssists = await Promise.all(
              totalAssistsData.map(async stat => {
                const { data: playerData, error: playerError } = await supabase
                  .from('players')
                  .select('nationality')
                  .eq('id', stat.player_id)
                  .single();

                if (playerError) throw playerError;

                return {
                  nationality: playerData.nationality,
                  assists: stat.assists,
                };
              })
            );

            // Aggrega gli assist totali per nazionalità
            const totalAssistsCount = playerAssists.reduce((acc, { nationality, assists }) => {
              acc[nationality] = (acc[nationality] || 0) + assists;
              return acc;
            }, {});

            data = Object.keys(totalAssistsCount).map(nationality => ({
              nationality,
              sum: totalAssistsCount[nationality],
            }));
            break;

          case 'total_matches':
            const { data: totalMatchesData, error: totalMatchesError } = await supabase
              .from('players_stats')
              .select('player_id, matches');

            if (totalMatchesError) throw totalMatchesError;

            const playerMatches = await Promise.all(
              totalMatchesData.map(async stat => {
                const { data: playerData, error: playerError } = await supabase
                  .from('players')
                  .select('nationality')
                  .eq('id', stat.player_id)
                  .single();

                if (playerError) throw playerError;

                return {
                  nationality: playerData.nationality,
                  matches: stat.matches,
                };
              })
            );

            // Aggrega le partite totali per nazionalità
            const totalMatchesCount = playerMatches.reduce((acc, { nationality, matches }) => {
              acc[nationality] = (acc[nationality] || 0) + matches;
              return acc;
            }, {});

            data = Object.keys(totalMatchesCount).map(nationality => ({
              nationality,
              sum: totalMatchesCount[nationality],
            }));
            break;

          case 'avg_market_value':
            const { data: avgMarketValueData, error: avgMarketValueError } = await supabase
              .from('players_info')
              .select('nationality, market_value');

            if (avgMarketValueError) throw avgMarketValueError;

            // Aggrega il valore di mercato medio per nazionalità
            const marketValueSum = avgMarketValueData.reduce((acc, { nationality, market_value }) => {
              if (!acc[nationality]) {
                acc[nationality] = { total: 0, count: 0 };
              }
              acc[nationality].total += market_value;
              acc[nationality].count += 1;
              return acc;
            }, {});

            data = Object.keys(marketValueSum).map(nationality => ({
              nationality,
              avg: marketValueSum[nationality].total / marketValueSum[nationality].count,
            }));
            break;

          default:
            throw new Error('Filtro non valido');
        }

        setCountries(data);
      } catch (error) {
        setError('Errore durante il recupero dei dati');
        console.error('Errore:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filter]);

  const renderContent = () => {
    if (loading) return <p>Caricamento in corso...</p>;
    if (error) return <p>{error}</p>;

    return (
      <ul>
        {countries.map(country => (
          <li key={country.nationality}>
            <Flag nationality={country.nationality} />
            {country.nationality} -{' '}
            {filter === 'num_players' && `${country.count} giocatori`}
            {filter === 'total_goals' && `${country.sum} goal`}
            {filter === 'total_assists' && `${country.sum} assist`}
            {filter === 'total_matches' && `${country.sum} partite`}
            {filter === 'avg_market_value' && `€${country.avg.toFixed(2)}`}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h2>Paesi per {filter.replace('_', ' ').toUpperCase()}</h2>
      {renderContent()}
    </div>
  );
};

export default CountriesFilter;
