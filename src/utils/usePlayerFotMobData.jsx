// usePlayerFotMobData.js
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
                const response = await axios.get(`/api/api/playerData?id=${playerId}`);
                const data = response.data;
    
                // Assicurati che i dati siano completi
                if (data && data.id) {
                    setPlayerData(data);
                } else {
                    setError('Incomplete data received');
                }
            } catch (err) {
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
