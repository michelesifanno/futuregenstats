import { useState, useEffect } from 'react';
import supabase from '../supabase/client';

const usePlayers = (filter) => {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        let statsData = [];
        let infoData = [];
        let playerIds = [];

        if (['matches', 'goals', 'assists', 'starting_xi'].includes(filter)) {
          // Recupera dati dalla tabella players_stats
          const { data, error } = await supabase
            .from('players_stats')
            .select(`
              player_id,
              matches,
              goals,
              assists,
              starting_xi,
              on_bench,
              on_pitch,
              pitch_time,
              subbed_in,
              subbed_out
            `)
            .order(filter, { ascending: false })
            .limit(5);

          if (error) throw error;
          statsData = data;
          playerIds = data.map(item => item.player_id);
        } else {
          // Recupera dati dalla tabella players_info
          const { data, error } = await supabase
            .from('players_info')
            .select(`
              id,
              name,
              position,
              nationality,
              birthday,
              market_value,
              matches_in_database,
              current_team
            `)
            .order('market_value', { ascending: false })
            .limit(5);

          if (error) throw error;
          infoData = data;
          playerIds = data.map(item => item.id);
        }

        // Recupera dati dai giocatori
        const { data: playersData, error: playersError } = await supabase
          .from('players')
          .select(`
            id,
            name,
            nationality,
            team,
            competition
          `)
          .in('id', playerIds);

console.log('Players Data:', playersData);
console.log('Stats Data:', statsData);
      

        if (playersError) throw playersError;

        // Combina i dati
        const combinedData = (statsData.length ? statsData : infoData).map(item => {
          const player = playersData.find(p => p.id === (item.player_id || item.id));
          return { ...player, ...item };
        });
        console.log('Combined Data:', combinedData);

        setPlayers(combinedData);
      } catch (err) {
        setError(err);
        setPlayers([]);
      }
    };

    fetchPlayers();
  }, [filter]);

  return { players, error };
};


export default usePlayers;
