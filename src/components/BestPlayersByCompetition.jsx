import { useState, useEffect } from 'react';
import { Grid, Button, Typography, useMediaQuery, InputLabel, MenuItem, FormControl, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useBestPlayersPerCompetition } from '../utils/useBestPlayersPerCompetition';
import { useCompetitions } from '../utils/useCompetitions';
import { CircularProgress } from '@mui/material';


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



  const handleCompetitionChange = (id) => {
    setCompetitionId(id);
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

  const sortedPlayers = players
    .sort((a, b) => a.rank - b.rank);

  // Filtrare solo le competizioni con gli ID specificati
  const filteredCompetitions = competitions.filter(competition =>
    ['IT1', 'ES1', 'FR1', 'GB1', 'L1'].includes(competition.id)
  );

  if (competitionsLoading || playersLoading) return <CircularProgress />;
  if (competitionsError) return <p>Error: {competitionsError}</p>;
  if (playersError) return <p>Error: {playersError}</p>;

  return (
    <>
      <div style={{ padding: '20px' }}>
        <Typography sx={{ fontWeight: 400, fontSize: isMobile ? '12px' : '14px', marginBottom: isMobile ? '10px' : '20px' }}>Seleziona la competizione e la categoria. Lo score è calcolato da un algoritmo che tiene conto di variabili relative alla stagione 23/24.</Typography>
        <Grid container spacing={2}>
          {/* Colonna per le competizioni */}
          <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: (isMobile || isTablet) ? 'center' : 'flex-start', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {filteredCompetitions.map((competition) => (
                <StyledButton
                  key={competition.id}
                  variant={competitionId === competition.id ? 'contained' : 'outlined'}
                  onClick={() => handleCompetitionChange(competition.id)}
                  sx={{ margin: '2px', height: isMobile ? '60px' : '80px', padding: '0px', minWidth: isMobile ? '60px' : '80px' }}
                >
                  <img
                    src={competition.competitionimage}
                    alt={competition.name}
                    style={{ width: isMobile ? '30px' : '40px' }}
                  />
                </StyledButton>
              ))}
            </div>
          </Grid>

          {/* Colonna per le categorie di età */}
          <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            {(isMobile || isTablet) ? (
              <FormControl fullWidth sx={{ marginTop: isMobile ? '20px' : '0px' }}>
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
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {['Under 18', 'Under 19', 'Under 20', 'Under 21', 'Under 22', 'Under 23'].map((category) => (
                  <StyledButton
                    key={category}
                    variant={ageCategory === category ? 'contained' : 'outlined'}
                    onClick={() => handleAgeCategoryChange({ target: { value: category } })}
                    sx={{ padding: '10px 15px', margin: '2px', fontSize: '14px' }}
                  >
                    {category}
                  </StyledButton>
                ))}
              </div>
            )}
          </Grid>
        </Grid>
      </div>
      {players.length === 0 ? (
        <Typography sx={{ fontWeight: 500, fontSize: '16px', padding: '40px 20px', color: 'red' }}>
          Non ci sono giocatori che soddisfano le richieste.
        </Typography>
      ) : (<br />)}
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
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, ...rankStyle }}
                >
                  <TableCell
                    align="center"
                    sx={{
                      padding: isMobile ? '30px 0px 30px 15px' : '20px'
                    }}
                  >
                    <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '14px' : '18px', color: rankStyle.color }}>
                      {player.rank}
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
                    <Typography sx={{ fontWeight: 400, fontSize: isMobile ? '12px' : '14px' }}>
                      {player.positions}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      padding: isMobile ? '8px' : '20px'
                    }}
                  >
                    <img src={player.club_image} alt={`${player.club_name} logo`} style={{ width: isMobile ? '30px' : '40px' }} />
                  </TableCell>
                  {!(isMobile || isTablet) && (
                    <TableCell
                      align="left"
                      sx={{
                        padding: isMobile ? '8px' : '20px'
                      }}
                    >
                      <Typography sx={{ fontWeight: 500, fontSize:'14px' }}>{player.nationalities}</Typography>
                    </TableCell>
                  )}
                  {!(isMobile || isTablet) && (
                    <TableCell
                      align="left"
                      sx={{
                        padding: isMobile ? '8px' : '20px'
                      }}
                    >
                      <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>
                        {player.marketvalue} {player.marketvaluecurrency}
                      </Typography>
                    </TableCell>
                  )}
                  <TableCell
                    align="right"
                    sx={{
                      padding: isMobile ? '30px 15px 30px 0px' : '20px'
                    }}
                  >
                    <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '14px' : '18px', color: rankStyle.color }}>
                      {player.total_score}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}