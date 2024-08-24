import React from 'react';
import {
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useTheme } from '@emotion/react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function PlayerCompetitions({ performance = [], name }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const isGoalkeeper = performance.length > 0 ? performance[0].is_goalkeeper : false;

  // Aggregate performance data
  const performanceByCompetition = performance.reduce((acc, curr) => {
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

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="competitions-stats-content"
        id="competitions-stats-header"
      >
        <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '14px' : '16px' }}>
          23/24 Competitions Stats <br />
          <span style={{ fontSize: '10px' }}>We're working hard to keep the stats as fresh as possible.</span>
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 0 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {!isGoalkeeper && (
                <>
                  <TableCell>⚽️</TableCell>
                  <TableCell>👟</TableCell>
                </>
              )}
              {isGoalkeeper && (
                <>
                  <TableCell>🥅</TableCell>
                  <TableCell>🛡️</TableCell>
                </>
              )}
              <TableCell>👕</TableCell>
              <TableCell>⏱️</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(performanceByCompetition).map((comp, index) => (
              comp.minutes_played > 0 && (
                <TableRow
                  key={index}
                  sx={{
                    verticalAlign: 'middle',
                    padding: isMobile ? '0px!important' : '20px!important',
                  }}
                >
                  <TableCell className="player-competitions">
                    <img
                      src={comp.competition_image}
                      alt={comp.competition_name}
                      style={{ width: '14px', marginRight: '10px' }}
                    />
                    {comp.competition_name}
                  </TableCell>
                  {!isGoalkeeper && (
                    <>
                      <TableCell className="player-competitions">
                        {comp.goals}
                      </TableCell>
                      <TableCell className="player-competitions">
                        {comp.assists}
                      </TableCell>
                    </>
                  )}
                  {isGoalkeeper && (
                    <>
                      <TableCell className="player-competitions">
                        {comp.conceded_goals}
                      </TableCell>
                      <TableCell className="player-competitions">
                        {comp.to_nil}
                      </TableCell>
                    </>
                  )}
                  <TableCell className="player-competitions">
                    {comp.matches}
                  </TableCell>
                  <TableCell className="player-competitions">
                    {comp.minutes_played}'
                  </TableCell>
                </TableRow>
              )
            ))}
          </TableBody>
        </Table>
      </AccordionDetails>
    </Accordion>
  );
}