import { useState, useEffect } from 'react';
import supabase from '../supabase/client'; // Assicurati di avere l'istanza di Supabase configurata

export function  useClubAndCompetitionData () {
    const [clubs, setClubs] = useState([]);
    const [competitions, setCompetitions] = useState([]);

    useEffect(() => {
        const fetchClubsAndCompetitions = async () => {
            try {
                // Fetch clubs
                const { data: clubsData, error: clubsError } = await supabase
                    .from('clubs')
                    .select('id, name, image, competition_id');

                if (clubsError) throw clubsError;

                // Fetch competitions
                const { data: competitionsData, error: competitionsError } = await supabase
                    .from('competitions')
                    .select('id, competitionname, competitionimage');

                if (competitionsError) throw competitionsError;

                setClubs(clubsData);
                setCompetitions(competitionsData);
            } catch (error) {
                console.error('Error fetching data from Supabase', error);
            }
        };

        fetchClubsAndCompetitions();
    }, []);

    return { clubs, competitions };
};
