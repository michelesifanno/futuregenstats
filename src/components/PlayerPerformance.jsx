import React from 'react';
import { useMediaQuery, Accordion, AccordionSummary, AccordionDetails, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useTheme } from '@emotion/react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function PlayerPerformance({ performance = [], name }) {

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

    const performanceByCompetition = performance.reduce((acc, curr) => {
        const comp = acc[curr.competition_id] || {
            competition_name: curr.competition_name,
            competition_image: curr.competition_image,
            goals: 0,
            matches: 0,
            minutes_played: 0,
            assists: 0,
            yellow_cards: 0,
            red_cards: 0,
            conceded_goals: 0,
            own_goals: 0,
            penalty_goals: 0,
            to_nil: 0,
            yellow_red_cards: 0,
        };

        comp.goals += curr.goals || 0;
        comp.matches += curr.matches || 0;
        comp.minutes_played += curr.minutes_played || 0;
        comp.assists += curr.assists || 0;
        comp.yellow_cards += curr.yellow_cards || 0;
        comp.red_cards += curr.red_cards || 0;
        comp.conceded_goals += curr.conceded_goals || 0;
        comp.own_goals += curr.own_goals || 0;
        comp.penalty_goals += curr.penalty_goals || 0;
        comp.to_nil += curr.to_nil || 0;
        comp.yellow_red_cards += curr.yellow_red_cards || 0;

        acc[curr.competition_id] = comp;
        return acc;
    }, {});

    // Rimuovere le competizioni duplicate
    const uniqueCompetitions = Array.from(new Set(competitions.map(c => c.id)))
        .map(id => {
            return competitions.find(c => c.id === id);
        });

    return (
        <div>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="general-stats-content" id="general-stats-header">
                    {!isGoalkeeper && (
                        <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '16px' : '18px' }}>
                            Statistiche generali di <span style={{ color: '#2047e4', fontWeight: 600 }}>{name}</span> ⚽️
                        </Typography>
                    )}
                    {isGoalkeeper && (
                        <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '16px' : '18px' }}>
                            Statistiche generali di <span style={{ color: '#2047e4', fontWeight: 600 }}>{name}</span> 🧤
                        </Typography>
                    )}
                </AccordionSummary>
                <AccordionDetails>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="title-stats">Goals</TableCell>
                                    <TableCell className="value-stats" >{totalGoals}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="title-stats">Partite</TableCell>
                                    <TableCell className="value-stats" >{totalMatches}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="title-stats">Minuti giocati</TableCell>
                                    <TableCell className="value-stats" >{totalMinutesPlayed}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="title-stats">Assists</TableCell>
                                    <TableCell className="value-stats" >{totalAssists}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="title-stats">Cartellini gialli</TableCell>
                                    <TableCell className="value-stats" >{totalYellowCards}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="title-stats">Cartellini rossi</TableCell>
                                    <TableCell className="value-stats" >{totalRedCards}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="title-stats">Autogol</TableCell>
                                    <TableCell className="value-stats" >{totalOwnGoals}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="title-stats">Rigori segnati</TableCell>
                                    <TableCell className="value-stats" >{totalPenaltyGoals}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="title-stats">Doppia ammonizione</TableCell>
                                    <TableCell className="value-stats">{performance.reduce((acc, curr) => acc + (curr.yellow_red_cards || 0), 0)}</TableCell>
                                </TableRow>
                                {isGoalkeeper && (
                                    <TableRow>
                                        <TableCell className="title-stats">Goal concessi</TableCell>
                                        <TableCell className="value-stats">{totalConcededGoals}</TableCell>
                                    </TableRow>
                                )}
                                {isGoalkeeper && (
                                    <TableRow>
                                        <TableCell className="title-stats">Porta inviolata</TableCell>
                                        <TableCell className="value-stats">{performance.reduce((acc, curr) => acc + (curr.to_nil || 0), 0)}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="competitions-content" id="competitions-header">
                    <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '16px' : '18px' }}>
                        Competizioni giocate 🏆
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                {Object.values(performanceByCompetition).map((comp, index) => {
                // Check if minutes_played is greater than 0
                if (comp.minutes_played > 0) {
                    return (
                        <Accordion key={index}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`competition-${index}-content`}
                                id={`competition-${index}-header`}
                                sx={{ display: 'flex!important', alignItems: 'center!important', borderBottom: '1px solid #eee' }}
                            >
                                <img src={comp.competition_image} alt={comp.competition_name} style={{ width: 30, marginRight: '10px' }} />
                                <Typography sx={{ fontSize: '14px' }}>{comp.competition_name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="title-stats-comp">Goals</TableCell>
                                                <TableCell className="value-stats-comp">{comp.goals}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="title-stats-comp">Partite</TableCell>
                                                <TableCell className="value-stats-comp">{comp.matches}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="title-stats-comp">Minuti giocati</TableCell>
                                                <TableCell className="value-stats-comp">{comp.minutes_played}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="title-stats-comp">Assists</TableCell>
                                                <TableCell className="value-stats-comp">{comp.assists}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="title-stats-comp">Cartellini gialli</TableCell>
                                                <TableCell className="value-stats-comp">{comp.yellow_cards}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="title-stats-comp">Cartellini rossi</TableCell>
                                                <TableCell className="value-stats-comp">{comp.red_cards}</TableCell>
                                            </TableRow>
                                            {isGoalkeeper && (
                                                <>
                                                    <TableRow>
                                                        <TableCell className="title-stats-comp">Goal concessi</TableCell>
                                                        <TableCell className="value-stats-comp">{comp.conceded_goals}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell className="title-stats-comp">Doppia ammonizione</TableCell>
                                                        <TableCell className="value-stats-comp">{comp.yellow_red_cards}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell className="title-stats-comp">Porta inviolata</TableCell>
                                                        <TableCell className="value-stats-comp">{comp.to_nil}</TableCell>
                                                    </TableRow>
                                                </>
                                            )}
                                            <TableRow>
                                                <TableCell className="title-stats-comp">Autogol</TableCell>
                                                <TableCell className="value-stats-comp">{comp.own_goals}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="title-stats-comp">Rigori segnati</TableCell>
                                                <TableCell className="value-stats-comp">{comp.penalty_goals}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </AccordionDetails>
                        </Accordion>
                    );
                } else {
                    return null; // Skip rendering the Accordion if minutes_played is not greater than 0
                }
            })}
                </AccordionDetails>
            </Accordion>
        </div>
    );
};