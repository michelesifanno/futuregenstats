import React, { useEffect, useState } from 'react';
import supabase from '../supabase/client';
import { Avatar } from './Avatar';

const TopPlayers = ({ filter }) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let query;
      switch (filter) {
        case 'matches':
          query = supabase
            .from('players_stats')
            .select(`
              players(name),
              matches
            `)
            .order('matches', { ascending: false })
            .limit(10);
          break;
        case 'goals':
          query = supabase
            .from('players_stats')
            .select(`
              players(name),
              goals
            `)
            .order('goals', { ascending: false })
            .limit(10);
          break;
        case 'assists':
          query = supabase
            .from('players_stats')
            .select(`
              players(name),
              assists
            `)
            .order('assists', { ascending: false })
            .limit(10);
          break;
        case 'starting_xi':
          query = supabase
            .from('players_stats')
            .select(`
              players(name),
              starting_xi
            `)
            .order('starting_xi', { ascending: false })
            .limit(10);
          break;
        default:
          query = supabase
            .from('players_info')
            .select(`
              name,
              market_value
            `)
            .order('market_value', { ascending: false })
            .limit(10);
          break;
      }

      const { data, error } = await query;
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setPlayers(data);
      }
    };

    fetchData();
  }, [filter]);

  return (
    <div>
      <h2>Top Players by {filter}</h2>
      <ul>
        {players.map(player => (
          <li key={player.id}>
            <Avatar name={player.players.name} />
            {player.players.name} - {player[filter]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopPlayers;
