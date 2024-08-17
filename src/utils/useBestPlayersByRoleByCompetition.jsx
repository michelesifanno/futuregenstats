import { useState, useEffect } from 'react';
import supabase from '../supabase/client';

const formatMarketValue = (value) => {
    if (!value) return 'N/A';
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) return 'N/A';
    return `${(numericValue / 1000000).toFixed(1)} mil.`;
};

export function useBestPlayersByRoleByCompetition(role, competitionIds, ageCategory) {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                setLoading(true);

                let query = supabase
                    .from('best_young_players_by_role')
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
                    `);
                
                if (role) {
                    query = query.eq('role', role);
                }

                if (competitionIds && competitionIds.length > 0) {
                    query = query.in('competition_id', competitionIds);
                }

                if (ageCategory) {
                    query = query.eq('age_category', ageCategory);
                }

                const { data, error } = await query;

                if (error) throw error;

                const formattedData = data.map(player => {
                    const nationalities = player.players.nationalities?.map(nat => nat.name).join(', ') || 'N/A';
                    const positions = player.players.positions?.map(pos => pos.name).join(', ') || 'N/A';

                    return {
                        player_id: player.player_id,
                        player_name: player.player_name,
                        total_score: player.total_score,
                        rank: player.rank,
                        age_category: player.age_category,
                        competition_id: player.competition_id,
                        competition_name: player.competition_name,
                        player_image: player.players.image,
                        club_name: player.players.clubs.name,
                        club_image: player.players.clubs.image,
                        positions,
                        nationalities,
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

        fetchPlayers();
    }, [role, competitionIds, ageCategory]);

    return { players, loading, error };
}
