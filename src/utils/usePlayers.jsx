import { useState, useEffect } from 'react';
import supabase from '../supabase/client';

const formatMarketValue = (value) => {
    if (!value) return 'N/A';
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) return 'N/A';
    return `${(numericValue / 1000000).toFixed(1)} mil.`;
};

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
                    .select('*')
                    .eq('player_id', playerId);
                    console.log('Performance Data:', performanceData); // Log per verificare i dati delle performance
                if (performanceError) throw performanceError;

                // Recupera le informazioni del club
                const { data: clubData, error: clubError } = await supabase
                    .from('clubs')
                    .select('*')
                    .eq('id', playerData?.club_id)
                    .single();

                if (clubError) throw clubError;

                // Setta i dati nello stato
                setPlayer(formatPlayerData(playerData));
                setPerformance(performanceData);
                setClub(clubData);

            } catch (err) {
                setError(err.message || 'Errore nel recupero dei dati');
            } finally {
                setLoading(false);
            }
        };

        fetchPlayerAndPerformance();
    }, [playerId]);

    // Funzione per formattare i dati del giocatore
    const formatPlayerData = (player) => {
        if (!player) return null;

        let positions = 'N/A';
        try {
            const positionsObj = player.positions;
            if (positionsObj && typeof positionsObj === 'object') {
                const positionsArray = Object.values(positionsObj)
                    .filter(pos => pos && pos.name);
                if (positionsArray.length > 0) {
                    positions = positionsArray[0].name;
                }
            }
        } catch (e) {
            console.error('Errore nella conversione di positions:', e);
        }

        let nationalities = 'N/A';
        try {
            const nationalitiesArray = player.nationalities;
            if (nationalitiesArray) {
                nationalities = nationalitiesArray.map(nat => nat.name).join(', ');
            }
        } catch (e) {
            console.error('Errore nella conversione di nationalities:', e);
        }

        return {
            ...player,
            dateOfBirth: player.dateofbirth ? new Date(player.dateofbirth).toLocaleDateString() : 'N/A',
            positions,
            nationalities,
            marketvalue: formatMarketValue(player.marketvalue),
            is_goalkeeper: player.is_goalkeeper,
        };
    };

    return { player, performance, club, loading, error };
}
