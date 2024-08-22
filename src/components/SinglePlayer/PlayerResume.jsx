import React from 'react';
import { useMediaQuery, Typography, Box } from '@mui/material';
import { useTheme } from '@emotion/react';

export default function PlayerPerformance({ performance = [], name }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  // Aggregating performance data
  const totalGoals = performance.reduce((acc, curr) => acc + (curr.goals || 0), 0);
  const totalMatches = performance.reduce((acc, curr) => acc + (curr.matches || 0), 0);
  const totalMinutesPlayed = performance.reduce((acc, curr) => acc + (curr.minutes_played || 0), 0);
  const totalAssists = performance.reduce((acc, curr) => acc + (curr.assists || 0), 0);
  const totalYellowCards = performance.reduce((acc, curr) => acc + (curr.yellow_cards || 0), 0);
  const totalRedCards = performance.reduce((acc, curr) => acc + (curr.red_cards || 0), 0);
  const totalConcededGoals = performance.reduce((acc, curr) => acc + (curr.conceded_goals || 0), 0);
  const totalOwnGoals = performance.reduce((acc, curr) => acc + (curr.own_goals || 0), 0);
  const totalPenaltyGoals = performance.reduce((acc, curr) => acc + (curr.penalty_goals || 0), 0);

  // Determine the tone based on cards
  const isDisciplinary = totalYellowCards + totalRedCards <= 5;
  const isAggressive = totalYellowCards + totalRedCards > 10;

  // Aggregating competitions
  const competitions = performance.map((p) => ({
    id: p.competition_id,
    name: p.competition_name,
    image: p.competition_image,
    matches: p.matches,
    goals: p.goals || 0,
    assists: p.assists || 0,
    minutes_played: p.minutes_played || 0,
    yellow_cards: p.yellow_cards || 0,
    red_cards: p.red_cards || 0,
    conceded_goals: p.conceded_goals || 0,
    own_goals: p.own_goals || 0,
    penalty_goals: p.penalty_goals || 0,
    to_nil: p.to_nil || 0,
    yellow_red_cards: p.yellow_red_cards || 0,
  }));

  // Remove duplicate competitions
  const uniqueCompetitions = Array.from(new Set(competitions.map(c => c.id)))
    .map(id => competitions.find(c => c.id === id));

  const isGoalkeeper = performance.length > 0 ? performance[0].is_goalkeeper : false;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 500, fontSize: isMobile ? '14px' : '16px' }}>
        {name} Resume
      </Typography>

      <Typography variant="body1" sx={{ marginTop: 2, fontSize: isMobile ? '12px' : '14px' }}>
        In the 2023/2024 season, <strong>{name}</strong> achieved a total of <strong>{totalGoals}</strong> goals and provided <strong>{totalAssists}</strong> assists across <strong>{totalMatches}</strong> matches. The player showcased remarkable endurance, clocking <strong>{totalMinutesPlayed}</strong> minutes on the field.
      </Typography>

      <Typography variant="body1" sx={{ marginTop: 2, fontSize: isMobile ? '12px' : '14px' }}>
        In terms of discipline, <strong>{name}</strong> was relatively {isDisciplinary ? 'disciplined' : isAggressive ? 'aggressive' : 'balanced'}, having accumulated <strong>{totalYellowCards}</strong> yellow cards and <strong>{totalRedCards}</strong> red cards throughout the season. This indicates a {isDisciplinary ? 'well-disciplined player' : isAggressive ? 'player prone to aggressive behavior' : 'player with a balanced disciplinary record'}.
      </Typography>

      {isGoalkeeper && (
        <>
          <Typography variant="body1" sx={{ marginTop: 2, fontSize: isMobile ? '12px' : '14px' }}>
            As a goalkeeper, <strong>{name}</strong> faced <strong>{totalConcededGoals}</strong> goals and managed to keep a clean sheet <strong>{performance.reduce((acc, curr) => acc + (curr.to_nil || 0), 0)}</strong> times.
          </Typography>
        </>
      )}

      <Typography variant="body1" sx={{ marginTop: 2, fontSize: isMobile ? '12px' : '14px' }}>
        The data provided by Future Gen Stats is sourced through advanced algorithms that meticulously analyze player performance metrics from the 2023/2024 season. These metrics are compared against those of other players to identify the most promising young talents. This rigorous evaluation process helps to spotlight these emerging stars, offering them greater visibility. Furthermore, it provides journalists and club directors with detailed statistical insights, enabling them to monitor and assess these players more closely. By showcasing these up-and-coming talents, Future Gen Stats plays a crucial role in helping talent scouts and media professionals stay informed about potential future stars.
      </Typography>
    </Box>
  );
}
