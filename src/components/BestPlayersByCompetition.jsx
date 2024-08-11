import React, { useState } from 'react';
import { useBestPlayersPerCompetition } from '../utils/useBestPlayersPerCompetition';

const PlayersList = ({ competitionId }) => {
  const [ageCategory, setAgeCategory] = useState('');
  const { players, loading, error } = useBestPlayersPerCompetition(competitionId, ageCategory);

  const handleAgeCategoryChange = (event) => {
    setAgeCategory(event.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Players for Competition</h1>
      
      {/* Filtro per la categoria di età */}
      <div>
        <label htmlFor="ageCategory">Age Category:</label>
        <select id="ageCategory" value={ageCategory} onChange={handleAgeCategoryChange}>
          <option value="">All</option>
          <option value="Under 18">Under 18</option>
          <option value="Under 19">Under 19</option>
          <option value="Under 20">Under 18</option>
          <option value="Under 21">Under 21</option>
          <option value="Under 21">Under 22</option>
          <option value="Under 23">Under 23</option>
          {/* Aggiungi altre categorie se necessario */}
        </select>
      </div>

      <ul>
        {players.map(player => (
          <li key={player.player_id} style={{ marginBottom: '20px' }}>
            <img src={player.player_image} alt={player.player_name} style={{ width: 50, height: 50, borderRadius: '50%' }} />
            <h2>{player.player_name}</h2>
            <p>Rank: {player.rank}</p>
            <p>Score: {player.total_score}</p>
            <p>Club: {player.club_name}</p>
            <img src={player.club_image} alt={`${player.club_name} logo`} style={{ width: 50, height: 50 }} />
            <p>Competition ID: {player.competition_id}</p>
            <p>Competition Name: {player.competition_name}</p>
            <p>Positions: {player.positions}</p>
            <p>Nationalities: {player.nationalities}</p>
            <p>Market Value: {player.marketvalue} {player.marketvaluecurrency}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayersList;