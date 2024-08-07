import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const CompetitionsFilter = ({ filter }) => {
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let query;

      switch (filter) {
        case 'num_players':
          query = supabase
            .from('players')
            .select('competition, id')
            .group('competition')
            .count('id', { as: 'num_players' })
            .order('num_players', { ascending: false })
            .limit(10);
          break;

        case 'total_goals':
          query = supabase
            .from('players_stats')
            .select('players(competition), goals')
            .group('players.competition')
            .sum('goals', { as: 'total_goals' })
            .order('total_goals', { ascending: false })
            .limit(10);
          break;

        case 'total_assists':
          query = supabase
            .from('players_stats')
            .select('players(competition), assists')
            .group('players.competition')
            .sum('assists', { as: 'total_assists' })
            .order('total_assists', { ascending: false })
            .limit(10);
          break;

        case 'total_matches':
          query = supabase
            .from('players_stats')
            .select('players(competition), matches')
            .group('players.competition')
            .sum('matches', { as: 'total_matches' })
            .order('total_matches', { ascending: false })
            .limit(10);
          break;

        case 'avg_market_value':
          query = supabase
            .from('players_info')
            .select('current_team, market_value')
            .group('current_team')
            .avg('market_value', { as: 'avg_market_value' })
            .order('avg_market_value', { ascending: false })
            .limit(10);
          break;

        default:
          return;
      }

      const { data, error } = await query;
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setCompetitions(data);
      }
    };

    fetchData();
  }, [filter]);

  const renderContent = () => {
    switch (filter) {
      case 'num_players':
        return (
          <ul>
            {competitions.map(competition => (
              <li key={competition.competition}>
                {competition.competition} - {competition.num_players} players
              </li>
            ))}
          </ul>
        );

      case 'total_goals':
        return (
          <ul>
            {competitions.map(competition => (
              <li key={competition.players.competition}>
                {competition.players.competition} - {competition.total_goals} goals
              </li>
            ))}
          </ul>
        );

      case 'total_assists':
        return (
          <ul>
            {competitions.map(competition => (
              <li key={competition.players.competition}>
                {competition.players.competition} - {competition.total_assists} assists
              </li>
            ))}
          </ul>
        );

      case 'total_matches':
        return (
          <ul>
            {competitions.map(competition => (
              <li key={competition.players.competition}>
                {competition.players.competition} - {competition.total_matches} matches
              </li>
            ))}
          </ul>
        );

      case 'avg_market_value':
        return (
          <ul>
            {competitions.map(competition => (
              <li key={competition.current_team}>
                {competition.current_team} - ${competition.avg_market_value.toFixed(2)}
              </li>
            ))}
          </ul>
        );

      default:
        return <p>Select a valid filter.</p>;
    }
  };

  return (
    <div>
      <h2>Competitions by {filter.replace('_', ' ').toUpperCase()}</h2>
      {renderContent()}
    </div>
  );
};

export default CompetitionsFilter;
