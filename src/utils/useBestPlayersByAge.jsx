import { useState, useEffect } from 'react';
import supabase from '../supabase/client'; // Assicurati che questo percorso sia corretto

// Funzione per formattare il valore di mercato
const formatMarketValue = (value) => {
    if (!value) return 'N/A';
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) return 'N/A';
    return `${(numericValue / 1000000).toFixed(1)} mil.`;
};

// Hook per ottenere i migliori giocatori per ruolo e categoria di età
export function useBestPlayersByAge(ageCategory) {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                setLoading(true);

                let query = supabase
                    .from('best_young_players_by_age')
                    .select(`
                        player_id,
                        player_name,
                        role,
                        age_category,
                        total_weighted_goals,
                        total_weighted_assists,
                        total_weighted_minutes_played,
                        total_weighted_matches,
                        total_weighted_to_nil,
                        total_weighted_conceded_goals,
                        total_score,
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
                
                if (ageCategory) {
                    query = query.eq('age_category', ageCategory);
                }

                const { data, error } = await query;

                if (error) {
                    throw error;
                }

                // Formattazione dei dati
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
                        if (Array.isArray(nationalitiesArray)) {
                            nationalities = nationalitiesArray.map(nat => nat.name).join(', ');
                        }
                    } catch (e) {
                        console.error('Errore nella conversione di nationalities:', e);
                    }

                    return {
                        player_id: player.player_id,
                        player_name: player.player_name,
                        total_score: player.total_score,
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
                setError(err.message || 'Errore nel recupero dei dati');
            } finally {
                setLoading(false);
            }
        };

        fetchPlayers();
    }, [ageCategory]); // Usa ageCategory come dipendenza

    return { players, loading, error };
}
