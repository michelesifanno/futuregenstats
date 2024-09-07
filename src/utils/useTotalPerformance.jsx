import { useState, useEffect } from 'react';
import supabase from '../supabase/client';

// Funzione per recuperare le performance del giocatore
export function useTotalPerformance(playerId) {
    const [performance, setPerformance] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPerformance = async () => {
            try {
                setLoading(true);

                // Recupera le performance del giocatore
                const { data: performanceData, error: performanceError } = await supabase
                    .from('total_players_performance')
                    .select('*')
                    .eq('new_id', playerId);

                if (performanceError) throw performanceError;

                if (performanceData && performanceData.length > 0) {
                    const playerData = performanceData[0];  // Prende il primo risultato (o unico)
                    setPerformance({
                        goals: playerData.goals,
                        assists: playerData.assists,
                        own_goals: playerData.own_goals,
                        yellow_cards: playerData.yellow_cards,
                        red_cards: playerData.red_cards,
                        minutes_played: playerData.minutes_played,
                        penalty_goals: playerData.penalty_goals,
                        matches: playerData.matches,
                        to_nil: playerData.to_nil,
                        conceded_goals: playerData.conceded_goals,
                    });
                }

            } catch (err) {
                setError(err.message || 'Errore nel recupero delle performance');
            } finally {
                setLoading(false);
            }
        };

        if (playerId) {
            fetchPerformance();
        }
    }, [playerId]);

    return { performance, loading, error };
}