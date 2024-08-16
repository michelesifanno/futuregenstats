import { useState, useEffect } from 'react';
import { Grid, Button, Typography, useMediaQuery, CircularProgress, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useBestPlayersByRole } from '../utils/useBestPlayersByRole';
import { useCompetitions } from '../utils/useCompetitions';

// Stili personalizzati per i bottoni
const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2),
  '&.MuiButton-contained': {
    backgroundColor: 'rgba(32, 71, 228, 0.1)',  // Colore di sfondo
    border: '1px solid #0033cc',  // Colore del bordo
    color: '#2047e4',  // Colore del testo
    boxShadow: 'none',
    borderRadius: '2px',
    '&:hover': {
      backgroundColor: 'rgba(32, 71, 228, 0.1)',  // Colore di sfondo al passaggio del mouse
    },
  },
  '&.MuiButton-outlined': {
    borderColor: '#eee',  // Colore del bordo per il bottone outline
    color: '#2047e4',  // Colore del testo per il bottone outline
    '&:hover': {
      borderColor: '#0033cc',  // Colore del bordo al passaggio del mouse
      backgroundColor: 'rgba(32, 71, 228, 0.1)',  // Colore di sfondo al passaggio del mouse
    },
  },
}));

// Definizione degli stili per il ranking
const rankStyles = {
  gold: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)', // Oro trasparente
    color: '#CCAD07', // Oro
  },
  silver: {
    backgroundColor: 'rgba(192, 192, 192, 0.1)', // Argento trasparente
    color: '#959595', // Argento
  },
  bronze: {
    backgroundColor: 'rgba(205, 127, 50, 0.1)', // Bronzo trasparente
    color: '#CD7F32', // Bronzo
  },
};

export default function BestFW() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const { competitions, loading: competitionsLoading, error: competitionsError } = useCompetitions();
  const filteredCompetitionIds = ['IT1', 'ES1', 'FR1', 'GB1', 'L1'];
  const [role, setRole] = useState('Attacco');

  const { players, loading: playersLoading, error: playersError } = useBestPlayersByRole(role, filteredCompetitionIds); // Usa la lista delle competizioni

  if (competitionsLoading || playersLoading) return <CircularProgress />;
  if (competitionsError) return <p>Error: {competitionsError}</p>;
  if (playersError) return <p>Error: {playersError}</p>;

  // Ordinare i giocatori per total_score in ordine decrescente e limitare a 10
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
                      sx={{
                        padding: isMobile ? '30px 0px 30px 15px' : '20px'
                      }}
                    >
                      <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '14px' : '18px', color: rankStyle.color }}>
                        {index + 1} {/* Indice + 1 per mostrare la posizione corretta */}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        padding: isMobile ? '8px' : '20px'
                      }}
                    >
                      <img src={player.player_image} alt={player.player_name} style={{ width: isMobile ? '36px' : '45px', borderRadius: '5px' }} />
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        padding: isMobile ? '8px' : '20px'
                      }}
                    >
                      <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '14px' : '16px' }}>
                        {player.player_name}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        padding: isMobile ? '8px' : '20px'
                      }}
                    >
                      <img src={player.club_image} alt={`${player.club_name} logo`} style={{ width: isMobile ? '30px' : '40px'}} />
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