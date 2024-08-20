// usePlayerFotMobData.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import Fotmob from "fotmob";

const fotmob = new Fotmob();

const usePlayerFotMobData = (playerId) => {
    const [playerData, setPlayerData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlayerData = async () => {
            setLoading(true);
            try {
                let response = await fotmob.getPlayer(playerId)
                const data = response.data;

                // Estrai e formatta i dati necessari
                
                setPlayerData(data);
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
