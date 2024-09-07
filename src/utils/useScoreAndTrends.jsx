import { useState, useEffect } from 'react';
import supabase from '../supabase/client';

export function useScoreAndTrends(id) {
    const [score, setScore] = useState(null);
    const [trends, setTrends] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchScore = async () => {
            try {
                setLoading(true);

                // Recupera le informazioni dei giocatori
                const { data: playersData, error: playersError } = await supabase
                    .from('player_score')
                    .select(`
                        talent_score,
                        count,
                        average_talent_score,
                        normalized_talent_score,
                        classification,
                        trend,
                        players (
                            new_id
                        )
                    `)
                    .eq('new_id', id);

                if (playersError) throw playersError;

                if (playersData && playersData.length > 0) {
                    const playerData = playersData[0];  // Prende il primo risultato (o unico)
                    setScore({
                        talent_score: playerData.talent_score,
                        count: playerData.count,
                        average_talent_score: playerData.average_talent_score,
                        normalized_talent_score: playerData.normalized_talent_score,
                        classification: playerData.classification,
                    });
                    setTrends(playerData.trend);
                }

            } catch (err) {
                setError(err.message || 'Errore nel recupero dei dati');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchScore();
        }
    }, [id]);  // Esegui l'effetto quando l'ID cambia

    return { score, trends, loading, error };
}