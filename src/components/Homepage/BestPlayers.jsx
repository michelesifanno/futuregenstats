import { useState } from 'react';
import {
  Box, Grid, Button, Typography, useMediaQuery, Table, TableBody, TableCell, TableContainer, TableRow, Accordion, AccordionSummary, AccordionDetails, CircularProgress, TablePagination} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { usePlayersScoreAndTrends } from '../../utils/usePlayersScoreAndTrends';
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

export default function BestPlayers() {
  const theme = useTheme();
  const { players, loading: playersLoading, error: playersError } = usePlayersScoreAndTrends();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
  };

  const paginatedPlayers = players ? players.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : [];


  return (
    <>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="most-experienced-players"
          id="most-experienced-players"
        >
          <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '14px' : '16px' }}>
            Best Young Players ⭐️
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: '0px' }}>
          <TableContainer>
            <Table aria-label="most-experienced-players">
              <TableBody>
                {playersLoading ? (
                  <Box sx={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <>
                    {players.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          <Typography>No players found</Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                        paginatedPlayers.map((player, index) => {
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
                            key={player.new_id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, padding: isMobile ? '10px' : '20px' }}
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
                                    src={player.image}
                                    alt={player.name}
                                    style={{ width: '40px', borderRadius: '2px' }}
                                  />
                                </Grid>
                                <Grid item xs={6} md={5} sx={{ textAlign: 'left', padding: '0px 10px!important' }}>
                                  <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>
                                    <Link to={`/player/${player.new_id}`} style={{ textDecoration: 'none', color: '#333' }}>
                                      {player.name}
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
                                {isMobile ? null : (
                                  <Grid item xs={2} sx={{ textAlign: 'right' }}>
                                    <Typography sx={{ fontWeight: 500, fontSize: '12px' }}>
                                      {player.classification}
                                    </Typography>
                                  </Grid>
                                )}

                                <Grid item xs={2}>
                                  <Typography sx={{ fontWeight: 500, fontSize: '14px', color: rankStyle.color, textAlign: 'right' }}>
                                    {player.normalized_talent_score}
                                  </Typography>
                                </Grid>
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
          <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={players.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
        </AccordionDetails>
      </Accordion>
    </>
  );
}
