import { useState, useEffect } from 'react';
import supabase from '../supabase/client';

export function useYouthByCompetitionByNationality(competitionName, competitionCountryName) {
    
    const [data, setData] = useState({
        nationalPlayers: 0,
        foreignPlayers: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchPlayerCounts = async () => {
            try {
                setLoading(true);
                 
                // Query per ottenere i giocatori nazionali
                const { data: nationalData, error: nationalError } = await supabase
                    .from('youth_players_per_competition_nationality')
                    .select('num_youth_players')
                    .eq('competition_name', competitionName)
                    .eq('nationality', competitionCountryName);

                if (nationalError) {
                    throw nationalError;
                }

                // Query per ottenere i giocatori stranieri
                const { data: foreignData, error: foreignError } = await supabase
                    .from('youth_players_per_competition_nationality')
                    .select('num_youth_players')
                    .eq('competition_name', competitionName)
                    .neq('nationality', competitionCountryName);

                if (foreignError) {
                    throw foreignError;
                }

                // Calcolo della somma dei giocatori nazionali
                const nationalPlayers = nationalData.reduce((sum, player) => sum + player.num_youth_players, 0);

                // Calcolo della somma dei giocatori stranieri
                const foreignPlayers = foreignData.reduce((sum, player) => sum + player.num_youth_players, 0);

                const totalPlayers = foreignPlayers + nationalPlayers;

                // Aggiorna lo stato con i risultati
                setData({
                    nationalPlayers,
                    foreignPlayers,
                    totalPlayers,
                });

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (competitionName && competitionCountryName) {
            fetchPlayerCounts();
        }

    }, [competitionName, competitionCountryName]);

    return { data, loading, error };
}
