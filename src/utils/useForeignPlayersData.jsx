import { useState, useEffect } from 'react';
import supabase from '../supabase/client';

const useForeignPlayersData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const competitionCountryMap = {
    'Premier League': 'England',
    'Serie A': 'Italy',
    'Bundesliga': 'Germany',
    'La Liga': 'Spain',
    'Ligue 1': 'France',
    'Brasileirão': 'Brazil',
    'Primeira Liga': 'Portugal',
    'Eredivisie': 'Netherlands'
  };

  useEffect(() => {
    const fetchForeignPlayersData = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data: playersData, error: playersError } = await supabase
          .from('players')
          .select('competition, nationality');

        if (playersError) throw playersError;

        const competitions = playersData.reduce((acc, player) => {
          const { competition, nationality } = player;
          const competitionCountry = competitionCountryMap[competition];
          const isForeign = nationality !== competitionCountry;

          if (!acc[competition]) {
            acc[competition] = { total: 0, foreign: 0 };
          }

          acc[competition].total += 1;
          if (isForeign) {
            acc[competition].foreign += 1;
          }

          return acc;
        }, {});

        const formattedData = Object.keys(competitions).map((competition) => {
          const { total, foreign } = competitions[competition];
          return {
            competition,
            foreignCount: foreign,
            localCount: total - foreign,
            foreignPercentage: (foreign / total) * 100,
          };
        });

        setData(formattedData);
      } catch (error) {
        setError('Errore durante il recupero dei dati');
        console.error('Errore:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchForeignPlayersData();
  }, []);

  return { data, loading, error };
};

export default useForeignPlayersData;
