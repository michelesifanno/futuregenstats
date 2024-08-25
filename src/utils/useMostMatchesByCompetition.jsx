import { useState, useEffect } from 'react';
import supabase from '../supabase/client';

// Funzione per formattare il valore di mercato
const formatMarketValue = (value) => {
  if (!value) return 'N/A';
  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) return 'N/A';
  return `${(numericValue / 1000000).toFixed(1)} mil.`;
};

export function useMostMatchesByCompetition(competitionId) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data: players, error } = await supabase
          .from('most_matches_per_competition')
          .select(`
            player_id,
            player_name,
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
            ),
            competition_id,
            competition_name,
            total_matches,
            age_category
          `)
          .eq('competition_id', competitionId);

        if (error) {
          throw new Error(error.message);
        }

        const formattedData = players.map(player => {
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
            if (Array.isArray(nationalitiesArray)) {
              nationalities = nationalitiesArray.map(nat => nat.name).join(', ');
            }
          } catch (e) {
            console.error('Errore nella conversione di nationalities:', e);
          }

          return {
            player_id: player.player_id,
            player_name: player.player_name,
            total_matches: player.total_matches,
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
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [competitionId]);

  return { players, loading, error };
}
