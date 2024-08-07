import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import Flag from './Flag';

const CountriesFilter = ({ filter }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let query;

      switch (filter) {
        case 'num_players':
          query = supabase
            .from('players')
            .select('nationality, id')
            .group('nationality')
            .count('id', { as: 'num_players' })
            .order('num_players', { ascending: false })
            .limit(10);
          break;

        case 'total_goals':
          query = supabase
            .from('players_stats')
            .select('players(nationality), goals')
            .group('players.nationality')
            .sum('goals', { as: 'total_goals' })
            .order('total_goals', { ascending: false })
            .limit(10);
          break;

        case 'total_assists':
          query = supabase
            .from('players_stats')
            .select('players(nationality), assists')
            .group('players.nationality')
            .sum('assists', { as: 'total_assists' })
            .order('total_assists', { ascending: false })
            .limit(10);
          break;

        case 'total_matches':
          query = supabase
            .from('players_stats')
            .select('players(nationality), matches')
            .group('players.nationality')
            .sum('matches', { as: 'total_matches' })
            .order('total_matches', { ascending: false })
            .limit(10);
          break;

        case 'avg_market_value':
          query = supabase
            .from('players_info')
            .select('nationality, market_value')
            .group('nationality')
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
        setCountries(data);
      }
    };

    fetchData();
  }, [filter]);

  const renderContent = () => {
    switch (filter) {
      case 'num_players':
        return (
          <ul>
            {countries.map(country => (
              <li key={country.nationality}>
                <Flag nationality={country.nationality} />
                {country.nationality} - {country.num_players} players
              </li>
            ))}
          </ul>
        );

      case 'total_goals':
        return (
          <ul>
            {countries.map(country => (
              <li key={country.players.nationality}>
                <Flag nationality={country.players.nationality} />
                {country.players.nationality} - {country.total_goals} goals
              </li>
            ))}
          </ul>
        );

      case 'total_assists':
        return (
          <ul>
            {countries.map(country => (
              <li key={country.players.nationality}>
                <Flag nationality={country.players.nationality} />
                {country.players.nationality} - {country.total_assists} assists
              </li>
            ))}
          </ul>
        );

      case 'total_matches':
        return (
          <ul>
            {countries.map(country => (
              <li key={country.players.nationality}>
                <Flag nationality={country.players.nationality} />
                {country.players.nationality} - {country.total_matches} matches
              </li>
            ))}
          </ul>
        );

      case 'avg_market_value':
        return (
          <ul>
            {countries.map(country => (
              <li key={country.nationality}>
                <Flag nationality={country.nationality} />
                {country.nationality} - ${country.avg_market_value.toFixed(2)}
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
      <h2>Countries by {filter.replace('_', ' ').toUpperCase()}</h2>
      {renderContent()}
    </div>
  );
};

export default CountriesFilter;
