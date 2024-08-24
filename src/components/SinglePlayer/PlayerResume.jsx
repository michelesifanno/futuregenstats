import React from 'react';
import { useMediaQuery, Typography, Box } from '@mui/material';
import { useTheme } from '@emotion/react';

export default function PlayerResume({ performance = [], name }) {
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
        During the 2023/2024 season, <strong>{name}</strong> {isGoalkeeper
          ? `conceded ${totalConcededGoals} goals and secured ${performance.reduce((acc, curr) => acc + (curr.to_nil || 0), 0)} clean sheets`
          : `scored ${totalGoals} goals and provided ${totalAssists} assists`} across {totalMatches} matches. The player demonstrated impressive stamina, accumulating {totalMinutesPlayed} minutes on the pitch. {isGoalkeeper
            ? totalConcededGoals === 0 ? 'An absolute wall in goal, consistently keeping a clean sheet.' : totalConcededGoals <= 10 ? 'Despite conceding a few goals, they displayed strong defensive skills.' : 'A goalkeeper who, although conceding several goals, fought hard for the team.'
            : totalGoals >= 20 ? 'A true goal machine, consistently finding the back of the net.' : totalGoals >= 10 ? 'A solid performer with a keen eye for goal.' : 'Although not prolific, they contributed valuable goals when it mattered most.'}
      </Typography>

      <Typography variant="body1" sx={{ marginTop: 2, fontSize: isMobile ? '12px' : '14px' }}>
        In terms of discipline, {name} was relatively {isDisciplinary ? 'disciplined' : isAggressive ? 'aggressive' : 'balanced'}, accumulating {totalYellowCards} yellow cards and {totalRedCards} red cards throughout the season. This indicates {isDisciplinary ? 'a well-disciplined player' : isAggressive ? 'a player prone to aggressive behavior' : 'a player with a balanced disciplinary record'}. {totalYellowCards === 0 && totalRedCards === 0 ? 'Their ability to stay composed under pressure is commendable.' : totalRedCards > 0 ? 'However, a bit more control on the field could benefit their game.' : 'Maintaining this balance will be key to their future success.'}
      </Typography>

      <Typography variant="body1" sx={{ marginTop: 2, fontSize: isMobile ? '12px' : '14px' }}>
        The data provided by Future Gen Stats is sourced through advanced algorithms that meticulously analyze player performance metrics, helping to identify emerging talents. This rigorous evaluation process offers detailed insights, aiding scouts and media professionals in tracking the next generation of football stars.
      </Typography>
    </Box>
  );
}
