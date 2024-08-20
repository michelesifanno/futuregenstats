import { useState, useEffect } from 'react';
import axios from 'axios';

const usePlayerFotMobData = (playerId) => {
    const [playerData, setPlayerData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlayerData = async () => {
            setLoading(true);
            try {
                // Utilizza il server proxy per ottenere i dati
                const response = await axios.get(`http://www.futuregenstats.com/api/playerData?id=${playerId}`);
                const data = response.data;
                console.log('Fetched data:', data); // Debug: mostra i dati ricevuti
                setPlayerData(data);
            } catch (err) {
                console.error('Error fetching player data:', err); // Debug: mostra l'errore
                setError('Error fetching player data');
            } finally {
                setLoading(false);
            }
        };
            
        fetchPlayerData();
    }, [playerId]);

    return { playerData, loading, error };
};

export default usePlayerFotMobData;
