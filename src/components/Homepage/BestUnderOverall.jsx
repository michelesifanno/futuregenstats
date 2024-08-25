import { useState } from 'react';
import { Box, Grid, Button, Typography, useMediaQuery, Table, TableBody, TableCell, TableContainer, TableRow, Accordion, AccordionSummary, AccordionDetails, CircularProgress, Tabs, Tab } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useBestPlayersByAge } from '../../utils/useBestPlayersByAge';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

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

export default function BestUnderOverall() {

  const theme = useTheme();
  const [ageCategory, setAgeCategory] = useState('Under 19');
  const { players, loading: playersLoading, error: playersError } = useBestPlayersByAge(ageCategory);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleAgeCategory = (event, newValue) => {
    setAgeCategory(newValue);
    const element = document.getElementById('best-youths-overral');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sortedPlayers = players.sort((a, b) => b.total_score - a.total_score).slice(0, 10); // Ordina in base al punteggio totale

  return (
    <>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="best-under-overral"
          id="best-under-overral"
        >
          <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '14px' : '16px' }}>
            Best Youths Overral ⭐️
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: '0px' }}>
        <Tabs
            value={ageCategory}
            onChange={handleAgeCategory}
            indicatorColor="primary"
            textColor="primary"
            variant={'scrollable'}
            scrollButtons="auto"
            centered
            sx={{ borderBottom: '1px solid #f6f6f6' }}
          >
            <Tab label="Under 18" value="Under 18" sx={{ fontSize: '12px!important', padding: '10px', textAlign: 'center' }} />
            <Tab label="Under 19" value="Under 19" sx={{ fontSize: '12px!important', padding: '10px', textAlign: 'center' }} />
            <Tab label="Under 20" value="Under 20" sx={{ fontSize: '12px!important', padding: '10px', textAlign: 'center' }} />
            <Tab label="Under 21" value="Under 21" sx={{ fontSize: '12px!important', padding: '10px', textAlign: 'center' }} />
            <Tab label="Under 22" value="Under 22" sx={{ fontSize: '12px!important', padding: '10px', textAlign: 'center' }} />
            <Tab label="Under 23" value="Under 23" sx={{ fontSize: '12px!important', padding: '10px', textAlign: 'center' }} />
          </Tabs>

          <TableContainer>
            <Table aria-label="most-experienced-players">
              <TableBody>
                {playersLoading ? (
                  <Box sx={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                  </Box>
                ) : playersError ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography>Error: {playersError}</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {sortedPlayers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          <Typography>No players found</Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      sortedPlayers.map((player, index) => {
                        // Determina lo stile di rango
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
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, padding: '20px' }}
                          >
                            <TableCell sx={{ textAlign: 'center' }}>
                              <Grid container sx={{ alignItems: 'center', justifyContent: 'flex-start' }}>
                                <Grid item xs={1} md={1}>
                                  <Typography sx={{ fontWeight: 500, fontSize: '14px', color: rankStyle.color, textAlign: isMobile ? 'center' : 'left' }}>
                                    {index + 1}
                                  </Typography>
                                </Grid>
                                <Grid item xs={2} md={2}>
                                  <img
                                    src={player.player_image}
                                    alt={player.player_name}
                                    style={{ width: '40px', borderRadius: '2px' }}
                                  />
                                </Grid>
                                <Grid item xs={6} md={6} sx={{ textAlign: 'left', padding: '0px 10px!important' }}>
                                  <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>
                                    <Link to={`/player/${player.player_id}`} style={{ textDecoration: 'none', color: '#333' }}>
                                      {player.player_name}
                                    </Link>
                                  </Typography>
                                  <Typography sx={{ fontWeight: 400, fontSize: '12px' }}>
                                    {player.positions}
                                  </Typography>
                                </Grid>
                                <Grid item xs={1} md={3} sx={{ textAlign: 'center' }}>
                                  <img
                                    src={player.club_image}
                                    alt={`${player.club_name} logo`}
                                    style={{ width: '30px' }}
                                  />
                                </Grid>
                                {isMobile ? (
                                  <>
                                <Grid item xs={2}>
                                  <Typography sx={{ fontWeight: 500, fontSize: '14px', color: rankStyle.color, textAlign: 'right' }}>
                                    {player.total_score}
                                  </Typography>
                                </Grid>
                                  </>
                                ) : (null)}
                              </Grid>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
