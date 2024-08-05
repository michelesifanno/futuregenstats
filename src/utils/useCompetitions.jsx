import { useState, useEffect } from 'react';
import supabase from '../supabase/client';

export default function useCompetitions() {
    const [competitions, setCompetitions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchCompetitions() {
            setLoading(true);
            setError('');
            setCompetitions([]);

            try {
                // Modifica 'competition' se il nome della colonna è diverso
                const { data, error } = await supabase
                    .from('players')
                    .select('competition'); // Assicurati che 'competition' sia il nome corretto

                if (error) {
                    throw error;
                }

                console.log("Data received:", data); // Aggiungi questo log
                // Estrai valori unici dalla colonna 'competition'
                const uniqueCompetitions = Array.from(new Set(data.map(item => item.competition)));
                setCompetitions(uniqueCompetitions);
            } catch (error) {
                setError(`Errore nella richiesta - ${error.message}`);
            } finally {
                setLoading(false);
            }
        }

        fetchCompetitions();
    }, []); // L'array vuoto come dipendenza significa che l'effetto viene eseguito solo una volta al montaggio del componente

    return { competitions, error, loading };
}