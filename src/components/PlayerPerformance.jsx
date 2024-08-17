import React from 'react';
import { useMediaQuery, Accordion, AccordionSummary, AccordionDetails, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useTheme } from '@emotion/react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function PlayerPerformance ({ performance = [], name })  {
    
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    const isGoalkeeper = performance.length > 0 ? performance[0].is_goalkeeper : false;
    // Aggregare le performance
    const totalGoals = performance.reduce((acc, curr) => acc + (curr.goals || 0), 0);
    const totalMatches = performance.reduce((acc, curr) => acc + (curr.matches || 0), 0);
    const totalMinutesPlayed = performance.reduce((acc, curr) => acc + (curr.minutes_played || 0), 0);
    const totalAssists = performance.reduce((acc, curr) => acc + (curr.assists || 0), 0);
    const totalYellowCards = performance.reduce((acc, curr) => acc + (curr.yellow_cards || 0), 0);
    const totalRedCards = performance.reduce((acc, curr) => acc + (curr.red_cards || 0), 0);
    const totalConcededGoals = performance.reduce((acc, curr) => acc + (curr.conceded_goals || 0), 0);
    const totalOwnGoals = performance.reduce((acc, curr) => acc + (curr.own_goals || 0), 0);
    const totalPenaltyGoals = performance.reduce((acc, curr) => acc + (curr.penalty_goals || 0), 0);
    
    // Aggregare le competizioni
    const competitions = performance.map((p) => ({
        id: p.competition_id,
        name: p.competition_name,
        image: p.competition_image,
        matches: p.matches
    }));

    // Rimuovere le competizioni duplicate
    const uniqueCompetitions = Array.from(new Set(competitions.map(c => c.id)))
        .map(id => {
            return competitions.find(c => c.id === id);
        });

    return (
        <div>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="general-stats-content" id="general-stats-header">
                    <Typography>Statistiche Generali di <span style={{color:'#2047e4', fontWeight:600}}>{name}</span></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Goals</TableCell>
                                    <TableCell sx={{color:'#2047e4', textAlign:'right'}}>{totalGoals}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Partite</TableCell>
                                    <TableCell sx={{color:'#2047e4', textAlign:'right'}}>{totalMatches}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Minuti giocati</TableCell>
                                    <TableCell sx={{color:'#2047e4', textAlign:'right'}}>{totalMinutesPlayed}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Assists</TableCell>
                                    <TableCell sx={{color:'#2047e4', textAlign:'right'}}>{totalAssists}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Cartellini gialli</TableCell>
                                    <TableCell sx={{color:'#2047e4', textAlign:'right'}}>{totalYellowCards}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Cartellini rossi</TableCell>
                                    <TableCell sx={{color:'#2047e4', textAlign:'right'}}>{totalRedCards}</TableCell>
                                </TableRow>
                                {isGoalkeeper && (
                                <TableRow>
                                    <TableCell>Goal concessi</TableCell>
                                    <TableCell sx={{color:'#2047e4', textAlign:'right'}}>{totalConcededGoals}</TableCell>
                                </TableRow>
                                )}
                                <TableRow>
                                    <TableCell>Autogol</TableCell>
                                    <TableCell sx={{color:'#2047e4', textAlign:'right'}}>{totalOwnGoals}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Rigori segnati</TableCell>
                                    <TableCell sx={{color:'#2047e4', textAlign:'right'}}>{totalPenaltyGoals}</TableCell>
                                </TableRow>
                                {isGoalkeeper && (
                                    <TableRow>
                                        <TableCell>Doppia ammonizione</TableCell>
                                        <TableCell sx={{color:'#2047e4', textAlign:'right'}}>{performance.reduce((acc, curr) => acc + (curr.yellow_red_cards || 0), 0)}</TableCell>
                                    </TableRow>
                                )}
                                {isGoalkeeper && (
                                    <TableRow>
                                        <TableCell>Porta inviolata</TableCell>
                                        <TableCell sx={{color:'#2047e4', textAlign:'right'}}>{performance.reduce((acc, curr) => acc + (curr.to_nil || 0), 0)}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded={isMobile || isTablet}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="competitions-content" id="competitions-header">
                    <Typography>Competizioni Giocate</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {uniqueCompetitions.length > 0 ? (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    {uniqueCompetitions.map((comp) => (
                                        <TableRow key={comp.id}>
                                            <TableCell>
                                                {comp.image ? (
                                                    <img src={comp.image} alt={comp.name} style={{ width: 50, height: 50 }} />
                                                ) : (
                                                    'N/A'
                                                )}
                                            </TableCell>
                                            <TableCell>{comp.name || 'N/A'}</TableCell>
                                            <TableCell sx={{color:'#2047e4', textAlign:'right'}}>{comp.matches || 0} partite</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <Typography>Nessuna competizione trovata.</Typography>
                    )}
                </AccordionDetails>
            </Accordion>
        </div>
    );
};