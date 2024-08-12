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
export function useMostExperiencedPlayers(ageCategory) {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                setLoading(true);
                // Esegui la query per ottenere i giocatori basati sulla categoria di età
                let { data, error } = await supabase
                    .from('best_experienced_young_players')
                    .select(`
                        player_id,
                        player_name,
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
                    .eq('age_category', ageCategory);

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
                setError(err.message || 'Errore sconosciuto');
            } finally {
                setLoading(false);
            }
        };

        if (ageCategory) {
            fetchPlayers();
        }
    }, [ageCategory]);

    return { players, loading, error };
};
