import { useState, useEffect } from 'react';
import supabase from '../supabase/client';

export function useCompetitions(competitionId) {
    const [competition, setCompetition] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompetition = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('competitions')
                    .select('*')
                    .eq('id', competitionId)
                    .single(); // Fetch a single record

                if (error) {
                    throw error;
                }

                setCompetition(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (competitionId) {
            fetchCompetition();
        } else {
            setError('Competition ID non fornito.');
            setLoading(false);
        }
    }, [competitionId]);

    return { competition, loading, error };
}
