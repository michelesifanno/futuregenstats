import { useState, useEffect } from 'react';
import supabase from '../supabase/client';

const formatMarketValue = (value) => {
    if (!value) return 'N/A';
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) return 'N/A';
    return `${(numericValue / 1000000).toFixed(1)} mil.`;
};

export function usePlayersScoreAndTrends() {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                setLoading(true);

                // Recupera le informazioni dei giocatori e dei loro club
                const { data: playersData, error: playersError } = await supabase
                    .from('player_score')
                    .select(`
                        player_id,
                        talent_score,
                        count,
                        average_talent_score,
                        normalized_talent_score,
                        classification,
                        trend,
                        id,
                        players (
                            name,
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

                if (playersError) throw playersError;

                // Formatta i dati dei giocatori
                const formattedPlayers = playersData.map((player) => formatPlayerData(player));
                setPlayers(formattedPlayers);

            } catch (err) {
                setError(err.message || 'Errore nel recupero dei dati');
            } finally {
                setLoading(false);
            }
        };

        fetchPlayers();
    }, []);

    // Funzione per formattare i dati del giocatore
    const formatPlayerData = (player) => {
        if (!player) return null;
    
        let positions = 'N/A';
        try {
            const positionsObj = player.players?.positions;
            if (positionsObj && typeof positionsObj === 'object') {
                // Estrai le posizioni dall'oggetto
                const positionsArray = Object.values(positionsObj)
                    .filter(pos => pos && pos.group);  // Filtra solo i valori validi che hanno un nome
                if (positionsArray.length > 0) {
                    positions = positionsArray[0].group;
                }
            }
        } catch (e) {
            console.error('Errore nella conversione di positions:', e);
        }
    
        let nationalities = 'N/A';
        try {
            const nationalitiesArray = player.players?.nationalities;
            if (nationalitiesArray && Array.isArray(nationalitiesArray)) {
                nationalities = nationalitiesArray.map(nat => nat.name).join(', ');
            }
        } catch (e) {
            console.error('Errore nella conversione di nationalities:', e);
        }
    
        const marketValueNumeric = parseFloat(player.players?.marketvalue) || 0;
        const marketValueFormatted = formatMarketValue(player.players?.marketvalue);
    
        return {
            player_id: player.player_id,
            new_id: player.players?.new_id,
            name: player.players?.name,
            talent_score: player.talent_score,
            count: player.count,
            average_talent_score: player.average_talent_score,
            normalized_talent_score: player.normalized_talent_score,
            classification: player.classification,
            trend: player.trend,
            id: player.id,
            image: player.players?.image,
            positions: positions,  // Posizioni aggiornate
            nationalities: nationalities,
            marketvalue: marketValueNumeric,
            marketvaluecurrency: marketValueFormatted,
            club: {
                name: player.players?.clubs?.name || 'N/A',
                image: player.players?.clubs?.image || '',
            },
        };
    };
    

    return { players, loading, error };
}
