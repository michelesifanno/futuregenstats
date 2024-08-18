import { useState, useEffect } from 'react';
import supabase from '../supabase/client';

// Funzione per recuperare le performance del giocatore
export function usePlayerPerformance(playerId) {
    const [performance, setPerformance] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [aggregatedData, setAggregatedData] = useState(null);

    useEffect(() => {
        const fetchPerformance = async () => {
            try {
                setLoading(true);

                // Recupera le performance del giocatore
                const { data: performanceData, error: performanceError } = await supabase
                    .from('players_performance')
                    .select('*')
                    .eq('player_id', playerId);

                if (performanceError) throw performanceError;

                setPerformance(performanceData);

                // Aggregare i dati delle performance
                const totalGoals = performanceData.reduce((acc, curr) => acc + (curr.goals || 0), 0);
                const totalMatches = performanceData.reduce((acc, curr) => acc + (curr.matches || 0), 0);
                const totalMinutesPlayed = performanceData.reduce((acc, curr) => acc + (curr.minutes_played || 0), 0);
                const totalAssists = performanceData.reduce((acc, curr) => acc + (curr.assists || 0), 0);
                const totalYellowCards = performanceData.reduce((acc, curr) => acc + (curr.yellow_cards || 0), 0);
                const totalRedCards = performanceData.reduce((acc, curr) => acc + (curr.red_cards || 0), 0);
                const totalOwnGoals = performanceData.reduce((acc, curr) => acc + (curr.own_goals || 0), 0);
                const totalPenaltyGoals = performanceData.reduce((acc, curr) => acc + (curr.penalty_goals || 0), 0);
                const totalYellowRedCards = performanceData.reduce((acc, curr) => acc + (curr.yellow_red_cards || 0), 0);
                const totalConcededGoals = performanceData.reduce((acc, curr) => acc + (curr.conceded_goals || 0), 0);
                const totalCleanSheets = performanceData.reduce((acc, curr) => acc + (curr.to_nil || 0), 0);

                // Aggregare le competizioni
                const competitions = performanceData.map((p) => ({
                    id: p.competition_id,
                    name: p.competition_name,
                    image: p.competition_image,
                    matches: p.matches
                }));

                const performanceByCompetition = performanceData.reduce((acc, curr) => {
                    const comp = acc[curr.competition_id] || {
                        competition_name: curr.competition_name,
                        competition_image: curr.competition_image,
                        goals: 0,
                        matches: 0,
                        minutes_played: 0,
                        assists: 0,
                        yellow_cards: 0,
                        red_cards: 0,
                        conceded_goals: 0,
                        own_goals: 0,
                        penalty_goals: 0,
                        to_nil: 0,
                        yellow_red_cards: 0,
                    };

                    comp.goals += curr.goals || 0;
                    comp.matches += curr.matches || 0;
                    comp.minutes_played += curr.minutes_played || 0;
                    comp.assists += curr.assists || 0;
                    comp.yellow_cards += curr.yellow_cards || 0;
                    comp.red_cards += curr.red_cards || 0;
                    comp.conceded_goals += curr.conceded_goals || 0;
                    comp.own_goals += curr.own_goals || 0;
                    comp.penalty_goals += curr.penalty_goals || 0;
                    comp.to_nil += curr.to_nil || 0;
                    comp.yellow_red_cards += curr.yellow_red_cards || 0;

                    acc[curr.competition_id] = comp;
                    return acc;
                }, {});

                // Rimuovere le competizioni duplicate
                const uniqueCompetitions = Array.from(new Set(competitions.map(c => c.id)))
                    .map(id => {
                        return competitions.find(c => c.id === id);
                    });

                setAggregatedData({
                    totalGoals,
                    totalMatches,
                    totalMinutesPlayed,
                    totalAssists,
                    totalYellowCards,
                    totalRedCards,
                    totalOwnGoals,
                    totalPenaltyGoals,
                    totalYellowRedCards,
                    totalConcededGoals,
                    totalCleanSheets,
                    performanceByCompetition: Object.values(performanceByCompetition),
                    uniqueCompetitions
                });

            } catch (err) {
                setError(err.message || 'Errore nel recupero delle performance');
            } finally {
                setLoading(false);
            }
        };

        if (playerId) {
            fetchPerformance();
        }
    }, [playerId]);

    return { performance, loading, error, aggregatedData };
}
