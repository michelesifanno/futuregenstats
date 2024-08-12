import { useState, useEffect } from 'react';
import supabase from '../supabase/client'; // Assicurati che questo percorso sia corretto

// Funzione per formattare il valore di mercato
const formatMarketValue = (value) => {
  if (!value) return 'N/A';
  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) return 'N/A';
  return `${(numericValue / 1000000).toFixed(1)} mil.`;
};

// Hook per ottenere i migliori giocatori per competizione e categoria di età
export function useBestPlayersPerCompetition (competitionId, ageCategory) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from('best_young_players_per_competition')
          .select(`
            player_id,
            player_name,
            competition_id,
            competition_name,
            total_score,
            rank,
            age_category,
            players (
              image,
              positions,
              nationalities,
              marketvalue,
              marketvaluecurrency,
              clubs (
                name,
                image
              )
            )
          `)
          .eq('competition_id', competitionId);

        if (ageCategory) {
          query = query.eq('age_category', ageCategory);
        }

        const { data, error } = await query;

        if (error) {
          throw error;
        }

        const formattedData = data.map(player => {
          // Parsing delle posizioni
          let positions = 'N/A';
          try {
            const positionsObj = player.players.positions;
            if (positionsObj && typeof positionsObj === 'object') {
              const positionsArray = Object.values(positionsObj)
                .filter(pos => pos && pos.name);  // Filtra le posizioni che non sono null e hanno una proprietà name
        
              if (positionsArray.length > 0) {
                positions = positionsArray[0].name;  // Prende solo la prima posizione
              }
            }
          } catch (e) {
            console.error('Errore nella conversione di positions:', e);
          }
        
          // Parsing delle nazionalità
          let nationalities = 'N/A';
          try {
            const nationalitiesArray = player.players.nationalities;
            if (nationalitiesArray) {
              nationalities = nationalitiesArray.map(nat => nat.name).join(', ');
            }
          } catch (e) {
            console.error('Errore nella conversione di nationalities:', e);
          }

          return {
            player_id: player.player_id,
            player_name: player.player_name,
            competition_id: player.competition_id,
            competition_name: player.competition_name,
            total_score: player.total_score,
            rank: player.rank,
            age_category: player.age_category,
            player_image: player.players.image,
            club_name: player.players.clubs.name,
            club_image: player.players.clubs.image,
            positions: positions,
            nationalities: nationalities,
            marketvalue: formatMarketValue(player.players.marketvalue),
            marketvaluecurrency: player.players.marketvaluecurrency,
          };
        });

        setPlayers(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (competitionId) {
      fetchPlayers();
    }
  }, [competitionId, ageCategory]);

  return { players, loading, error };
};
