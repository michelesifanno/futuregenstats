import { useState, useEffect } from 'react';
import { Box, Grid, Button, Typography, useMediaQuery, FormControl, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableRow, Accordion, AccordionSummary, AccordionDetails, Tabs, Tab } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useBestPlayersPerCompetition } from '../../utils/useBestPlayersPerCompetition';
import { useCompetitions } from '../../utils/useCompetitions';
import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Stili personalizzati per i bottoni
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
    color: '#CCAD07',
  },
  silver: {
    color: '#959595',
  },
  bronze: {
    color: '#CD7F32',
  },
};

export default function BestPlayersByCompetition() {
  const theme = useTheme();
  const [competitionId, setCompetitionId] = useState('IT1');
  const { players, loading: playersLoading, error: playersError } = useBestPlayersPerCompetition(competitionId);
  const { competitions, loading: competitionsLoading, error: competitionsError } = useCompetitions();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const handleCompetitionChange = (event, newValue) => {
    setCompetitionId(newValue);
    const element = document.getElementById('best-players-by-competition');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sortedPlayers = players.sort((a, b) => b.total_score - a.total_score).slice(0, 10); // Ordina in base al punteggio totale


  // Filtrare solo le competizioni con gli ID specificati
  const filteredCompetitions = competitions.filter(competition =>
    ['IT1', 'ES1', 'FR1', 'GB1', 'L1'].includes(competition.id)
  );

  if (competitionsError) return <p>Error: {competitionsError}</p>;
  if (playersError) return <p>Error: {playersError}</p>;

  return (
    <>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="best-players-by-competition"
          id="best-players-by-competition"
        >
          <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '14px' : '16px' }}>
          Best Young Players by League 🎖️
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: '0px' }}>
          <Tabs
            value={competitionId}
            onChange={handleCompetitionChange}
            indicatorColor="primary"
            textColor="primary"
            centered
            variant={isMobile ? 'scrollable' : 'standard'}
            scrollButtons="auto"
          >
            {filteredCompetitions.map((competition) => (
              <Tab
                key={competition.id}
                label={
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <img
                      src={competition.competitionimage}
                      alt={competition.name}
                      style={{ width: '30px' }}
                    />
                  </div>
                }
                value={competition.id}
                sx={{ fontSize: '12px!important', padding: '10px', width: isMobile ? 'auto' : '20%!important', textAlign: 'center', borderBottom: '1px solid #f6f6f6' }}
              />
            ))}
          </Tabs>
          {competitionsLoading || playersLoading ? (
            <Box sx={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>) : (
            <>
              {players.length === 0 ? (
                <Typography sx={{ fontWeight: 500, fontSize: '16px', padding: '40px 20px', color: 'red' }}>
                  Non ci sono giocatori che soddisfano le richieste.
                </Typography>
              ) : (
                <TableContainer>
                  <Table aria-label="best-players-by-competition">
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
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, ...rankStyle, padding: isMobile ? '10px' : '20px' }}
                          >
                            <TableCell sx={{ textAlign: 'center' }}>
                              <Grid container sx={{ alignItems: 'center', justifyContent: 'flex-start' }}>
                                <Grid item xs={1}>
                                  <Typography sx={{ fontWeight: 500, fontSize: '14px', color: rankStyle.color, textAlign: 'center' }}>
                                    {index + 1}
                                  </Typography>
                                </Grid>
                                <Grid item xs={2} md={1}>
                                  <img
                                    src={player.player_image}
                                    alt={player.player_name}
                                    style={{ width: '40px', borderRadius: '2px' }}
                                  />
                                </Grid>
                                <Grid item xs={6} md={5} sx={{ textAlign: 'left', padding: '0px 10px!important' }}>
                                  <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>
                                    <Link to={`/player/${player.player_id}`} style={{ textDecoration: 'none', color: '#333' }}>
                                      {player.player_name}
                                    </Link>
                                  </Typography>
                                  <Typography sx={{ fontWeight: 400, fontSize: '12px' }}>
                                    {player.positions}
                                  </Typography>
                                </Grid>
                                <Grid item xs={1} sx={{ textAlign: 'center' }}>
                                  <img
                                    src={player.club_image}
                                    alt={`${player.club_name} logo`}
                                    style={{ width: '30px' }}
                                  />
                                </Grid>
                                {isMobile ? (null) : (
                                  <Grid item xs={2} sx={{ textAlign: 'right' }}>
                                    <Typography sx={{ fontWeight: 500, fontSize: '12px' }}>
                                      {player.marketvalue} {player.marketvaluecurrency}
                                    </Typography>
                                  </Grid>
                                )}

                                <Grid item xs={2}>
                                  <Typography sx={{ fontWeight: 500, fontSize: '14px', color: rankStyle.color, textAlign: 'right' }}>
                                    {player.total_score}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </>
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
}
