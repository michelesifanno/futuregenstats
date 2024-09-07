import { useState, useEffect } from 'react';
import axios from 'axios';  

export function useCurrentStats({id}) {
    const [performance, setPerformance] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlayerPerformance = async (playerId) => {
            const options = {
                method: 'GET',
                url: 'https://transfermarkt-db.p.rapidapi.com/v1/players/performance',
                params: {
                    player_id: playerId,
                    locale: 'UK',
                    season_id: '2024'
                },
                headers: {
                    'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,  // Usa VITE_RAPID_API_KEY se stai usando Vite
                    'x-rapidapi-host': 'transfermarkt-db.p.rapidapi.com'
                }
            };

            try {
                setLoading(true);
                console.log(`Richiesta delle performance per il giocatore ${playerId}`);
                const response = await axios.request(options);
                setPerformance(response.data.data || []);
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    console.error(`Errore 429: Troppe richieste. Il processo viene bloccato.`);
                } else {
                    console.error(`Errore nel recupero delle performance per il giocatore ${playerId}:`, error.message);
                }
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPlayerPerformance(id);
        } else {
            setPerformance([]);
            setLoading(false);
            setError(null);
        }
    }, [id]);

    return { performance, loading, error };
}
