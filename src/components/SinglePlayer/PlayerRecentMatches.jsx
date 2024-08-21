import React, { useState, useEffect } from 'react';
import { useMediaQuery, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Typography, Accordion, AccordionSummary, AccordionDetails, CircularProgress } from '@mui/material';
import { useTheme } from '@emotion/react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function PlayerRecentMatches({ matches }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    // Stato di caricamento
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simula il caricamento dei dati
        const timer = setTimeout(() => {
            setLoading(false); // I dati sono stati caricati
        }, 1000); // Intervallo di 1 secondo

        return () => clearTimeout(timer); // Pulizia del timer
    }, [matches]);

    useEffect(() => {
        // Simula il caricamento dei dati
        setLoading(!matches); // I dati sono stati caricati o meno
    }, [matches]);

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

    const handleRowClick = (matchPageUrl) => {
        // Apri la pagina del match in una nuova scheda
        window.open(`https://fotmob.com/${matchPageUrl}`, '_blank', 'noreferrer');
    };


    const paginatedMatches = matches ? matches.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : [];

    const defaultImage = '/competitions/globe.png'; // Percorso dell'immagine di fallback

    const renderRecentMatches = () => {
        if (!matches || matches.length === 0) {
            return <Typography>Recent matches not found 😔</Typography>;
        }

        return (
            <>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {isMobile ? (
                                    null
                                ) : (
                                    <>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell><Typography sx={{ fontSize: '16px' }}>⏱️</Typography></TableCell>
                                        <TableCell><Typography sx={{ fontSize: '16px' }}>⚽️</Typography></TableCell>
                                        <TableCell><Typography sx={{ fontSize: '16px' }}>👟</Typography></TableCell>
                                        <TableCell><Typography sx={{ fontSize: '16px' }}>🟨</Typography></TableCell>
                                        <TableCell><Typography sx={{ fontSize: '16px' }}>🟥</Typography></TableCell>
                                        <TableCell><Typography sx={{ fontSize: '16px' }}>⭐️</Typography></TableCell>
                                    </>
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedMatches.map(match => (
                                <TableRow
                                    key={match.id}
                                    style={{ cursor: 'pointer', verticalAlign: 'middle', padding: isMobile ? '0px!important' : '20px!important', fontSize: '14px!important' }}
                                    onClick={() => handleRowClick(match.matchPageUrl)}
                                >
                                    {isMobile ? (
                                        <TableCell sx={{fontSize:'12px!important'}}>
                                            <Grid container spacing={2} sx={{ marginBottom: '10px!important' }}>
                                                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                                    {match.leagueName}
                                                </Grid>
                                                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                                    {new Date(match.matchDate.utcTime).toLocaleDateString('it-IT', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    })}
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2}>
                                                <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                                    <img
                                                        src={`https://www.fotmob.com/_next/image?url=https://images.fotmob.com/image_resources/logo/teamlogo/${match.opponentTeamId}_small.png&w=96&q=75`}
                                                        alt={match.opponentTeamName}
                                                        style={{ width: '30px' }}
                                                    />
                                                </Grid>
                                                <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                    <span style={{ fontWeight: 500 }}>{match.opponentTeamName}</span>
                                                    <span>{match.homeScore}-{match.awayScore}</span>
                                                </Grid>
                                                <Grid item xs={7} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                                    {match.minutesPlayed > 0 && (
                                                        <span style={{ padding: '2px 4px', borderRadius: '5px', border: '1px solid #ddd', margin: '0px 2px' }}>
                                                            {match.minutesPlayed} '
                                                        </span>
                                                    )}
                                                    {match.goals > 0 && (
                                                        <span style={{ padding: '2px 4px', borderRadius: '5px', border: '1px solid #ddd', margin: '0px 2px' }}>
                                                            {match.goals} ⚽️
                                                        </span>
                                                    )}
                                                    {match.assists > 0 && (
                                                        <span style={{ padding: '2px 4px', borderRadius: '5px', border: '1px solid #ddd', margin: '0px 2px' }}>
                                                            {match.assists} 👟
                                                        </span>
                                                    )}
                                                    {match.yellowCards > 0 && (
                                                        <span style={{ padding: '2px 4px', borderRadius: '5px', border: '1px solid #ddd', margin: '0px 2px' }}>
                                                            {match.yellowCards} 🟨
                                                        </span>
                                                    )}
                                                    {match.redCards > 0 && (
                                                        <span style={{ padding: '2px 4px', borderRadius: '5px', border: '1px solid #ddd', margin: '0px 2px' }}>
                                                            {match.redCards} 🟥
                                                        </span>
                                                    )}
                                                    <span style={{ fontWeight: '500', color: 'white', border: `1px solid ${match.ratingProps.bgcolor}`, backgroundColor: match.ratingProps.bgcolor, padding: '2px 4px', borderRadius: '5px' }}>
                                                        {match.ratingProps.num}
                                                    </span>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    ) : (
                                        <>
                                            <TableCell className='recent-matches'>
                                                <img
                                                    src={`https://www.fotmob.com/_next/image?url=https://images.fotmob.com/image_resources/logo/leaguelogo/${match.leagueId}_small.png&w=96&q=75`}
                                                    alt={match.leagueName}
                                                    style={{ width: '20px' }}
                                                />
                                            </TableCell>
                                            <TableCell className='recent-matches'>
                                                {new Date(match.matchDate.utcTime).toLocaleDateString('it-IT', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}
                                            </TableCell>
                                            <TableCell className='recent-matches'>
                                                <img
                                                    src={`https://www.fotmob.com/_next/image?url=https://images.fotmob.com/image_resources/logo/teamlogo/${match.opponentTeamId}_small.png&w=96&q=75`}
                                                    alt={match.opponentTeamName}
                                                    style={{ width: '20px', marginRight: '5px' }}
                                                />
                                                {match.opponentTeamName}
                                            </TableCell>
                                            <TableCell className='recent-matches'>{match.homeScore}-{match.awayScore}</TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell className='recent-matches'>{match.minutesPlayed}'</TableCell>
                                            <TableCell className='recent-matches'>{match.goals}</TableCell>
                                            <TableCell className='recent-matches'>{match.assists}</TableCell>
                                            <TableCell className='recent-matches'>{match.yellowCards}</TableCell>
                                            <TableCell className='recent-matches'>{match.redCards}</TableCell>
                                            <TableCell>
                                                <Typography sx={{ fontSize: '14px', fontWeight: '500', color: 'white' }}>
                                                    <span style={{ border: `1px solid ${match.ratingProps.bgcolor}`, backgroundColor: match.ratingProps.bgcolor, padding: '2px 4px', borderRadius: '5px' }}>
                                                        {match.ratingProps.num}
                                                    </span>
                                                </Typography>
                                            </TableCell>
                                        </>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={matches.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </>
        );
    };

    return (
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="recent-matches" id="recent-matches">
                    <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '14px' : '16px' }}>
                        Recent matches
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        renderRecentMatches()
                    )}
                </AccordionDetails>
            </Accordion>
    );
}
