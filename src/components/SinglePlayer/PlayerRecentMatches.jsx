import React, { useState, useEffect } from 'react';
import { useMediaQuery, Avatar, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Typography, Accordion, AccordionSummary, AccordionDetails, CircularProgress } from '@mui/material';
import { useTheme } from '@emotion/react';
import { flagCodes } from '../../utils/flagCodes';
import { useClubAndCompetitionData } from '../../utils/useClubAndCompetitionData';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function PlayerRecentMatches({ matches }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    const { clubs, competitions } = useClubAndCompetitionData(); // Recupera i dati delle squadre e competizioni

    // Stato di caricamento
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simula il caricamento dei dati
        const timer = setTimeout(() => {
            setLoading(false); // I dati sono stati caricati
        }, 2000); // Intervallo di 1 secondo

        return () => clearTimeout(timer); // Pulizia del timer
    }, [matches]);

    useEffect(() => {
        // Simula il caricamento dei dati
        if (matches) {
            setLoading(false); // I dati sono stati caricati
        } else {
            setLoading(true); // I dati non sono ancora disponibili
        }
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

    const paginatedMatches = matches ? matches.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : [];

    const defaultImage = '/competitions/globe.png'; // Percorso dell'immagine di fallback

    // Dizionario di traduzione manuale
    const nameTranslationDict = {
        'lyon': 'olymp. lione',
        'olymp. lione': 'lyon',
        'marseille': 'marsiglia',
        'marsiglia': 'marseille',
        'brest': 'stade brestois',
        'stade brestois': 'brest',
        'paris saint-germain': 'paris sg',
        'paris sg': 'paris saint-germain',
        // Aggiungi altre traduzioni se necessario
    };
    
    
// Funzione per normalizzare il nome del team
const normalizeTeamName = (teamName) => {
    return teamName
        .toLowerCase()
        .replace(/^(ac|fc|cf|sc|cs|cd|ss|cr|-|as|bayer|stade|us)\s+/i, '') // Rimuovi articoli comuni
        .replace(/\s+/g, '') // Rimuovi spazi
        .slice(0, 7); // Mantieni solo i primi 5 caratteri
};

// Funzione per normalizzare e tradurre i nomi dei club
const translateClubName = (name) => {
    const normalizedName = normalizeTeamName(name);
    return nameTranslationDict[normalizedName] || normalizedName;
};

const normalizeName = (name) => {
    return name.trim().toLowerCase().replace(/[^a-z]/g, '').slice(0, 5);
};

// Funzione per ottenere il logo del club o della nazionale
const getClubLogo = (teamName) => {
    const translatedName = translateClubName(teamName);
    const club = clubs.find(club => normalizeTeamName(club.name) === normalizeTeamName(translatedName));
    if (club) {
        return club.image || defaultImage; // Ritorna il logo del club se trovato
    }

    // Cerca tra le nazionali
    const countryCode = Object.keys(flagCodes).find(
        country => normalizeName(country) === normalizeName(translatedName)
    );

    if (countryCode) {
        return `/flags/${flagCodes[countryCode]}.png`;
    }
    return defaultImage; // Se non si trova nulla, ritorna l'immagine di default
};


    const getCompetitionLogo = (competitionName) => {
        const competition = competitions.find(comp => comp.competitionname === competitionName);
        return competition ? competition.competitionimage || defaultImage : defaultImage;
    };



    const renderRecentMatches = () => {
        if (matches && matches.length === 0) {
            return <Typography>Nessun match recente trovato nelle top 5 leghe europee 😔</Typography>;
        }
    
        if (!matches || paginatedMatches.length === 0) {
            return <Typography>Nessun match recente trovato nelle top 5 leghe europee 😔</Typography>;
        }
        return (
            <>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell>⏱️</TableCell>
                                <TableCell>⚽️</TableCell>
                                <TableCell>👟</TableCell>
                                <TableCell>🟨</TableCell>
                                <TableCell>🟥</TableCell>
                                <TableCell>⭐️</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedMatches.map(match => (
                                <TableRow key={match.id} style={{ verticalAlign: 'middle' }}>
                                    <TableCell className='recent-matches'><img src={getCompetitionLogo(match.leagueName)} alt={match.leagueName} style={{ width: '20px' }} /></TableCell>
                                    <TableCell className='recent-matches'>{new Date(match.matchDate.utcTime).toLocaleDateString()}</TableCell>
                                    <TableCell className='recent-matches'><img src={getClubLogo(match.opponentTeamName)} alt={match.opponentTeamName} style={{ width: '20px' }} /> - {match.opponentTeamName}</TableCell>
                                    <TableCell className='recent-matches'>{match.homeScore}-{match.awayScore}</TableCell>
                                    <TableCell className='recent-matches'>{match.minutesPlayed}</TableCell>
                                    <TableCell className='recent-matches'>{match.goals}</TableCell>
                                    <TableCell className='recent-matches'>{match.assists}</TableCell>
                                    <TableCell className='recent-matches'>{match.yellowCards}</TableCell>
                                    <TableCell className='recent-matches'>{match.redCards}</TableCell>
                                    <TableCell className='recent-matches'>{match.ratingProps.num}</TableCell>
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
        <div>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="recent-matches" id="recent-matches">
                    <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '14px' : '16px' }}>
                        Statistiche ultime partite
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
        </div>
    );
};
