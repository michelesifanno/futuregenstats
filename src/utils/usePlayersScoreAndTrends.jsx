import { useState, useEffect } from 'react';
import supabase from '../supabase/client'; // Assicurati che questo percorso sia corretto

// Hook per ottenere i migliori giocatori per ruolo e categoria di età
export function usePlayersScoreAndTrends() {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                setLoading(true);

                let query = supabase
                    .from('player_score')
                    .select(`
                        player_id,
                        name,
                        talent_score,
                        count,
                        average_talent_score,
                        normalized_talent_score,
                        classification,
                        trend,
                        id,
                        players (
                            image,
                            new_id,
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
                    .order('normalized_talent_score', { ascending: false });

                const { data, error } = await query;

                if (error) {
                    throw error;
                }

                // Formattazione dei dati
                const formattedData = data.map(player => {
                    // Conversione delle nazionalità
                    let nationalities = 'N/A';
                    if (player.players?.nationalities && Array.isArray(player.players.nationalities)) {
                        nationalities = player.players.nationalities.map(nat => nat.name).join(', ');
                    }

                    // Conversione delle posizioni
                    let positions = 'N/A';
                    if (player.players?.positions && Array.isArray(player.players.positions)) {
                        positions = player.players.positions.map(pos => pos.name).join(', ');
                    }

                    return {
                        player_id: player.player_id,
                        new_id: player.players?.new_id,
                        name: player.name,
                        talent_score: player.talent_score,
                        count: player.count,
                        average_talent_score: player.average_talent_score,
                        normalized_talent_score: player.normalized_talent_score,
                        classification: player.classification,
                        trend: player.trend,
                        id: player.id,
                        image: player.players?.image,
                        positions: positions,
                        nationalities: nationalities,
                        marketvalue: player.players?.marketvalue,
                        marketvaluecurrency: player.players?.marketvaluecurrency,
                        club_name: player.players?.clubs?.name,
                        club_image: player.players?.clubs?.image
                    };
                });

                console.log('Data fetched:'. formattedData);

                setPlayers(formattedData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        


        fetchPlayers();
    }, []);

    return { players, loading, error };
}