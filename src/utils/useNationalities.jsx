import { useState, useEffect } from 'react';
import supabase from '../supabase/client';

export function useNationalities() {
    const [nations, setNations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNations = async () => {
            try {
                setLoading(true);

                const { data, error } = await supabase
                    .from('nationalities')
                    .select('*');

                console.log('Data fetched:', data); // Debugging log
                if (error) {
                    console.error('Supabase error:', error); // Debugging log
                    throw error;
                }

                setNations(data);

            } catch (err) {
                console.error('Error in fetchNations:', err); // Debugging log
                setError(err.message || 'Errore nel recupero dei dati');
            } finally {
                setLoading(false);
            }
        };

        fetchNations();
    }, []);

    return { nations, loading, error };
}