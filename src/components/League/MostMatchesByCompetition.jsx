import { useState } from 'react';
import { Box, Grid, Typography, useMediaQuery, Table, TableBody, TableCell, TableContainer, TableRow, TablePagination, Accordion, AccordionSummary, AccordionDetails, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMostMatchesByCompetition } from '../../utils/useMostMatchesByCompetition';
import { useCompetitions } from '../../utils/useCompetitions';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const rankStyles = {
    gold: { color: '#CCAD07' },
    silver: { color: '#959595' },
    bronze: { color: '#CD7F32' },
};

export default function MostMatchesByCompetition({ competitionId }) {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const { players, loading: playersLoading, error: playersError } = useMostMatchesByCompetition(competitionId);

    const sortedPlayers = players.sort((a, b) => b.total_matches - a.total_matches);

    if (playersError) return <p>Error: {playersError}</p>;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedPlayers = sortedPlayers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Accordion defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="most-matches-in-competition"
                id="most-matches-in-competition"
            >
                <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '14px' : '16px' }}>
                    Most Matches in {players?.competition_name} 👴🏻
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '0px' }}>
                {playersLoading ? (
                    <Box sx={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        {players.length === 0 ? (
                            <Typography sx={{ fontWeight: 500, fontSize: '16px', padding: '40px 20px', color: 'red' }}>
                                Non ci sono giocatori che soddisfano le richieste.
                            </Typography>
                        ) : (
                            <>
                                <TableContainer>
                                    <Table aria-label="most-matches-in-competition">
                                        <TableBody>
                                            {paginatedPlayers.map((player, index) => {
                                                const globalIndex = page * rowsPerPage + index + 1;
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
                                                                        {globalIndex}
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
                                <Grid item xs={1} sx={{ textAlign: 'center' }}>
                                  <img
                                    src={player.club_image}
                                    alt={`${player.club_name} logo`}
                                    style={{ width: '30px' }}
                                  />
                                </Grid>
                                <Grid item xs={2}>
                                  <Typography sx={{ fontWeight: 500, fontSize: '14px', color: rankStyle.color, textAlign: 'right' }}>
                                    {player.total_matches}
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
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 50]}
                                    component="div"
                                    count={players.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </>
                        )}
                    </>
                )}
            </AccordionDetails>
        </Accordion>
    );
}
