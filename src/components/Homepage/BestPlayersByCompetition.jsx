import { useState, useEffect } from 'react';
import { Grid, Button, Typography, useMediaQuery, FormControl, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableRow, Accordion, AccordionSummary, AccordionDetails, Tabs, Tab } from '@mui/material';
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

export default function BestPlayersByCompetition() {
  const theme = useTheme();
  const [ageCategory, setAgeCategory] = useState('Under 23');
  const [competitionId, setCompetitionId] = useState('IT1');
  const { players, loading: playersLoading, error: playersError } = useBestPlayersPerCompetition(competitionId, ageCategory);
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

  const handleAgeCategoryChange = (event) => {
    setAgeCategory(event.target.value);
    const element = document.getElementById('best-players-by-competition');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sortedPlayers = players.sort((a, b) => a.rank - b.rank);

  // Filtrare solo le competizioni con gli ID specificati
  const filteredCompetitions = competitions.filter(competition =>
    ['IT1', 'ES1', 'FR1', 'GB1', 'L1'].includes(competition.id)
  );

  if (competitionsLoading || playersLoading) return <CircularProgress />;
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
            Best Youth by Competition 🏆
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
                      style={{ width: isMobile ? '30px' : '36px' }}
                    />
                  </div>
                }
                value={competition.id}
                sx={{ fontSize: '12px!important', padding: '10px', width: isMobile ? 'auto' : '20%!important', textAlign: 'center' }}
              />
            ))}
          </Tabs>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding:'20px!important' }}>
              {(isMobile || isTablet) ? (
                <FormControl fullWidth>
                  <Select
                    labelId="age-select-label"
                    id="age-select"
                    value={ageCategory}
                    onChange={handleAgeCategoryChange}
                    sx={{ fontSize: isMobile ? '14px' : '18px' }}
                  >
                    <MenuItem value="Under 18">Under 18</MenuItem>
                    <MenuItem value="Under 19">Under 19</MenuItem>
                    <MenuItem value="Under 20">Under 20</MenuItem>
                    <MenuItem value="Under 21">Under 21</MenuItem>
                    <MenuItem value="Under 22">Under 22</MenuItem>
                    <MenuItem value="Under 23">Under 23</MenuItem>
                  </Select>
                </FormControl>
              ) : (
                <>
                  {['Under 18', 'Under 19', 'Under 20', 'Under 21', 'Under 22', 'Under 23'].map((category) => (
                    <StyledButton
                      key={category}
                      variant={ageCategory === category ? 'contained' : 'outlined'}
                      onClick={() => handleAgeCategoryChange({ target: { value: category } })}
                      sx={{ padding: '10px 15px', margin: '2px', fontSize: '12px' }}
                    >
                      {category}
                    </StyledButton>
                  ))}
                </>
              )}
            </Grid>
          </Grid>

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
                        <TableCell align="center">
                          <Typography sx={{ fontWeight: 500, fontSize: '14px', color: rankStyle.color }}>
                            {player.rank}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <img src={player.player_image} alt={player.player_name} style={{ width: isMobile ? '26px' : '36px', borderRadius: '2px' }} />
                        </TableCell>
                        <TableCell align="left">
                          <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>
                            <Link to={`/player/${player.player_id}`} style={{ textDecoration: 'none', color: '#333' }}>
                              {player.player_name}
                            </Link>
                          </Typography>
                          <Typography sx={{ fontWeight: 400, fontSize: '12px' }}>
                            {player.positions}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <img src={player.club_image} alt={`${player.club_name} logo`} style={{ width: isMobile ? '20px' : '30px' }} />
                        </TableCell>
                          <TableCell align="left" sx={{display: (isMobile || isTablet) ? 'none' : 'table-cell'}}>
                            <Typography sx={{ fontWeight: 500, fontSize: '12px' }}>
                              {player.marketvalue} {player.marketvaluecurrency}
                            </Typography>
                          </TableCell>
                        <TableCell align="right">
                          <Typography sx={{ fontWeight: 500, fontSize: '14px', color: rankStyle.color }}>
                            {player.total_score}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
}
