import { useState, useEffect } from 'react';
import supabase from '../supabase/client';

export function useCompetitions () {
    const [competitions, setCompetitions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchCompetitions = async () => {
        try {
          setLoading(true);
          const { data, error } = await supabase
            .from('competitions')
            .select('*');
  
          if (error) {
            throw error;
          }
  
          setCompetitions(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCompetitions();
    }, []);
  
    return { competitions, loading, error };
  };