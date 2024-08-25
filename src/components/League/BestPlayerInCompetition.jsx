import { useState, useEffect } from 'react';
import { Box, Grid, Button, Typography, useMediaQuery, FormControl, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableRow, TablePagination, Accordion, AccordionSummary, AccordionDetails, Tabs, Tab } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useBestPlayersPerCompetition } from '../../utils/useBestPlayersPerCompetition';
import { useCompetitions } from '../../utils/useCompetitions';
import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


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

export default function BestPlayersInCompetition({ competitionId }) {
    const theme = useTheme();

    const { competitions, loading: competitionsLoading, error: competitionsError } = useCompetitions();
    const { players, loading: playersLoading, error: playersError } = useBestPlayersPerCompetition(competitionId);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const competition = competitions?.find(comp => comp.id === competitionId);

    const sortedPlayers = players.sort((a, b) => b.total_score - a.total_score); // Ordina in base al punteggio totale

    if (competitionsError) return <p>Error: {competitionsError}</p>;
    if (playersError) return <p>Error: {playersError}</p>;

    // Paginazione
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedPlayers = sortedPlayers ? sortedPlayers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : [];


    return (
        <>
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="best-players-in-competition"
                    id="best-players-in-competition"
                >
                    <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '14px' : '16px' }}>
                        Best Young Players in {competition?.competitionname} 🎖️
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: '0px' }}>
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
                                <>
                                    <TableContainer>
                                        <Table aria-label="best-players-in-competition">
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
        </>
    );
}
