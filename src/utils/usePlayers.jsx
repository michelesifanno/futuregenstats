import { useState, useEffect } from 'react';
import supabase from '../supabase/client';

const formatMarketValue = (value) => {
    if (!value) return 'N/A';
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) return 'N/A';
    return `${(numericValue / 1000000).toFixed(1)} mil.`;
};

export function usePlayers(ageCategory) {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                setLoading(true);

                // Recupera le informazioni dei giocatori e dei loro club
                const { data: playersData, error: playersError } = await supabase
                    .from('players')
                    .select(`
                        *,
                        clubs (
                            id,
                            name,
                            image
                        )
                    `)
                    .eq('age_category', ageCategory)
                    .order('marketvalue', { ascending: false });

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
    }, [ageCategory]);

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

        // Aggiungi il valore numerico e formattato del marketvalue
        const marketValueNumeric = parseFloat(player.marketvalue) || 0;
        const marketValueFormatted = formatMarketValue(player.marketvalue);

        return {
            ...player,
            dateOfBirth: player.dateofbirth ? new Date(player.dateofbirth).toLocaleDateString() : 'N/A',
            positions,
            nationalities,
            marketvalue: marketValueNumeric, // Valore numerico
            marketvalueFormatted: marketValueFormatted, // Valore formattato per la visualizzazione
            club: {
                id: player.clubs?.id || 'N/A',
                name: player.clubs?.name || 'N/A',
                image: player.clubs?.image || '',
            },
        };
    };

    return { players, loading, error };
}