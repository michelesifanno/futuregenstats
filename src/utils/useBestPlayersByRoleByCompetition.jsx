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
export function useBestPlayersByRoleByCompetiton(role, competitionId, ageCategory) {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                setLoading(true);

                let query = supabase
                    .from('best_young_players_by_role_by_competition')
                    .select(`
                        player_id,
                        player_name,
                        role,
                        age_category,
                        competition_id,
                        competition_name,
                        weighted_goals,
                        weighted_assists,
                        weighted_minutes_played,
                        weighted_matches,
                        weighted_to_nil,
                        weighted_conceded_goals,
                        total_score,
                        rank,
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
                    .eq('competition_id', competitionId)
                    .eq('role', role);

                if (ageCategory) {
                    query = query.eq('age_category', ageCategory);
                }

                const { data, error } = await query;

                if (error) {
                    throw error;
                }

                // Formattazione dei dati
                const formattedData = data.map(player => {
                    let nationalities = 'N/A';
                    try {
                        const nationalitiesArray = player.players.nationalities;
                        if (nationalitiesArray) {
                            nationalities = nationalitiesArray.map(nat => nat.name).join(', ');
                        }
                    } catch (e) {
                        console.error('Errore nella conversione di nationalities:', e);
                    }

                    let positions = 'N/A';
                    try {
                        const positionsArray = player.players.positions;
                        if (positionsArray) {
                            positions = positionsArray.map(pos => pos.name).join(', ');
                        }
                    } catch (e) {
                        console.error('Errore nella conversione di positions:', e);
                    }

                    return {
                        player_id: player.player_id,
                        player_name: player.player_name,
                        total_score: player.total_score,
                        competition_id: player.competition_id,
                        competition_name: player.competition_name,            
                        rank: player.rank,
                        age_category: player.age_category,
                        player_image: player.players.image,
                        club_name: player.players.clubs.name,
                        club_image: player.players.clubs.image,
                        positions: positions,
                        nationalities: nationalities,
                        marketvalue: formatMarketValue(player.players.marketvalue),
                        marketvaluecurrency: player.players.marketvaluecurrency,
                        weighted_goals: player.weighted_goals,
                        weighted_assists: player.weighted_assists,
                        weighted_minutes_played: player.weighted_minutes_played,
                        weighted_matches: player.weighted_matches,
                        weighted_to_nil: player.weighted_to_nil,
                        weighted_conceded_goals: player.weighted_conceded_goals,

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
    }, [role, competitionId, ageCategory]);

    return { players, loading, error };
}
