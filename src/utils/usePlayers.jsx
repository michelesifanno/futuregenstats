import { useState, useEffect } from 'react';
import supabase from '../supabase/client';

// Funzione per recuperare i dettagli del giocatore e le sue performance
export function usePlayers(playerId) {
    const [player, setPlayer] = useState(null);
    const [performance, setPerformance] = useState([]);
    const [club, setClub] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlayerAndPerformance = async () => {
            try {
                setLoading(true);
                
                // Recupera le informazioni del giocatore e del club
                const { data: playerData, error: playerError } = await supabase
                    .from('players')
                    .select(`
                        *,
                        clubs (
                            name,
                            image
                        )
                    `)
                    .eq('id', playerId)
                    .single();

                if (playerError) throw playerError;

                // Recupera le performance del giocatore
                const { data: performanceData, error: performanceError } = await supabase
                    .from('players_performance')
                    .select(`
                        *
                    `)
                    .eq('player_id', playerId);

                if (performanceError) throw performanceError;

                setPlayer(playerData);
                setPerformance(performanceData);

                // Recupera le informazioni del club
                const { data: clubData, error: clubError } = await supabase
                    .from('clubs')
                    .select('*')
                    .eq('id', playerData?.club_id)
                    .single();

                if (clubError) throw clubError;

                setClub(clubData);

            } catch (err) {
                setError(err.message || 'Errore nel recupero dei dati');
            } finally {
                setLoading(false);
            }
        };

        fetchPlayerAndPerformance();
    }, [playerId]);

    return { player, performance, club, loading, error };
}
