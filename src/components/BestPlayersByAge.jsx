import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, Typography, useMediaQuery, CircularProgress, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useBestPlayersByRoleByCompetition } from '../utils/useBestPlayersByRoleByCompetition';
import { useCompetitions } from '../utils/useCompetitions';

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2),
  '&.MuiButton-contained': {
    backgroundColor: 'rgba(32, 71, 228, 0.1)',
    border: '1px solid #0033cc',
    color: '#2047e4',
    boxShadow: 'none',
    borderRadius: '2px',
    '&:hover': {
      backgroundColor: 'rgba(32, 71, 228, 0.1)',
    },
  },
  '&.MuiButton-outlined': {
    borderColor: '#eee',
    color: '#2047e4',
    '&:hover': {
      borderColor: '#0033cc',
      backgroundColor: 'rgba(32, 71, 228, 0.1)',
    },
  },
}));

const rankStyles = {
  gold: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    color: '#CCAD07',
  },
  silver: {
    backgroundColor: 'rgba(192, 192, 192, 0.1)',
    color: '#959595',
  },
  bronze: {
    backgroundColor: 'rgba(205, 127, 50, 0.1)',
    color: '#CD7F32',
  },
};

export default function BestPlayersByAge({ role, age_category }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentRole, setRole] = useState(role);
  const [currentAgeCategory, setAgeCategory] = useState(age_category);

  const { competitions, loading: competitionsLoading, error: competitionsError } = useCompetitions();
  const filteredCompetitionIds = ['IT1', 'ES1', 'FR1', 'GB1', 'L1'];
  const { players, loading: playersLoading, error: playersError } = useBestPlayersByRoleByCompetition(currentRole, filteredCompetitionIds, currentAgeCategory);

  if (competitionsLoading || playersLoading) return <CircularProgress />;
  if (competitionsError) return <p>Error: {competitionsError}</p>;
  if (playersError) return <p>Error: {playersError}</p>;

  const sortedPlayers = players
    .sort((a, b) => b.total_score - a.total_score)
    .slice(0, 10);

  return (
    <>
      {players.length === 0 ? (
        <Typography sx={{ fontWeight: 500, fontSize: '16px', padding: '40px 20px', color: 'red' }}>
          Non ci sono giocatori che soddisfano le richieste.
        </Typography>
      ) : (
        <TableContainer>
          <Table aria-label="best-gk">
            <TableBody>
              {sortedPlayers.map((player, index) => {
                let rankStyle = {};
                if (index === 0) {
                  rankStyle = rankStyles.gold;
                } else if (index === 1) {
                  rankStyle = rankStyles.silver;
                } else if (index === 2) {
                  rankStyle = rankStyles.bronze;
                }
                return (
                  <TableRow
                    key={player.player_id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, ...rankStyle }}
                  >
                    <TableCell
                      align="center"
                      sx={{ padding: isMobile ? '30px 0px 30px 15px' : '20px' }}
                    >
                      <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '14px' : '18px', color: rankStyle.color }}>
                        {index + 1}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ padding: isMobile ? '8px' : '20px' }}
                    >
                      <img src={player.player_image} alt={player.player_name} style={{ width: isMobile ? '36px' : '45px', borderRadius: '5px' }} />
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ padding: isMobile ? '8px' : '20px' }}
                    >
                      <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '14px' : '16px' }}>
                        <Link to={`/player/${player.player_id}`} style={{ textDecoration: 'none', color: '#333' }}>
                          {player.player_name}
                        </Link>
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ padding: isMobile ? '8px' : '20px' }}
                    >
                      <img src={player.club_image} alt={`${player.club_name} logo`} style={{ width: isMobile ? '30px' : '40px' }} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
