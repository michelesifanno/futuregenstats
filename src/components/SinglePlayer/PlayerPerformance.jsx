import React from 'react';
import { useMediaQuery, Accordion, AccordionSummary, AccordionDetails, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Box } from '@mui/material';
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
        <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="general-stats-content" id="general-stats-header">
                <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '14px' : '16px' }}>
                    23/24 Season Stats <br />
                    <span style={{ fontSize: '10px' }}>We're working hard to keep the stats as fresh as possible.</span>
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '0px!important' }}>
                {competitions ?
                    (
                        <Grid container>

                            {!isGoalkeeper && (
                                <>
                                    <Grid item xs={6} md={6} sx={{ padding: '20px!important', borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd' }}>
                                        <Typography
                                            sx={{
                                                fontWeight: 500,
                                                fontSize: '10px',
                                                textAlign: 'left',
                                                color: 'rgba(0, 0, 0, 0.7)',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                marginBottom: '8px', // Spazio tra il titolo e l'elemento successivo
                                            }}
                                        >
                                            Goals ⚽️
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography
                                                sx={{
                                                    fontWeight: 400,
                                                    fontSize: '14px',
                                                    textAlign: 'left',
                                                }}
                                            >
                                                {totalGoals}
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={6} md={6} sx={{ padding: '20px!important', borderBottom: '1px solid #ddd' }}>
                                        <Typography
                                            sx={{
                                                fontWeight: 500,
                                                fontSize: '10px',
                                                textAlign: 'left',
                                                color: 'rgba(0, 0, 0, 0.7)',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                marginBottom: '8px', // Spazio tra il titolo e l'elemento successivo
                                            }}
                                        >
                                            Assists 👟
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography
                                                sx={{
                                                    fontWeight: 400,
                                                    fontSize: '14px',
                                                    textAlign: 'left',
                                                }}
                                            >
                                                {totalAssists}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </>
                            )}

                            {isGoalkeeper && (
                                <>
                                    <Grid item xs={6} md={6} sx={{ padding: '20px!important', borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd' }}>
                                        <Typography
                                            sx={{
                                                fontWeight: 500,
                                                fontSize: '10px',
                                                textAlign: 'left',
                                                color: 'rgba(0, 0, 0, 0.7)',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                marginBottom: '8px', // Spazio tra il titolo e l'elemento successivo
                                            }}
                                        >
                                            Conceded Goals 🥅
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography
                                                sx={{
                                                    fontWeight: 400,
                                                    fontSize: '14px',
                                                    textAlign: 'left',
                                                }}
                                            >
                                                {totalConcededGoals}
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={6} md={6} sx={{ padding: '20px!important', borderBottom: '1px solid #ddd' }}>
                                        <Typography
                                            sx={{
                                                fontWeight: 500,
                                                fontSize: '10px',
                                                textAlign: 'left',
                                                color: 'rgba(0, 0, 0, 0.7)',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                marginBottom: '8px', // Spazio tra il titolo e l'elemento successivo
                                            }}
                                        >
                                            Cleansheets 🛡️
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography
                                                sx={{
                                                    fontWeight: 400,
                                                    fontSize: '14px',
                                                    textAlign: 'left',
                                                }}
                                            >
                                                {totalGoals} ⚽️
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </>
                            )}

                            <Grid item xs={6} md={6} sx={{ padding: '20px!important', borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd' }}>
                                <Typography
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: '10px',
                                        textAlign: 'left',
                                        color: 'rgba(0, 0, 0, 0.7)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                        marginBottom: '8px', // Spazio tra il titolo e l'elemento successivo
                                    }}
                                >
                                    Matches 👕
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography
                                        sx={{
                                            fontWeight: 400,
                                            fontSize: '14px',
                                            textAlign: 'left',
                                        }}
                                    >
                                        {totalMatches}
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid item xs={6} md={6} sx={{ padding: '20px!important', borderBottom: '1px solid #ddd' }}>
                                <Typography
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: '10px',
                                        textAlign: 'left',
                                        color: 'rgba(0, 0, 0, 0.7)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                        marginBottom: '8px', // Spazio tra il titolo e l'elemento successivo
                                    }}
                                >
                                    Minutes Played ⏱️
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography
                                        sx={{
                                            fontWeight: 400,
                                            fontSize: '14px',
                                            textAlign: 'left',
                                        }}
                                    >
                                        {totalMinutesPlayed}
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid item xs={6} md={6} sx={{ padding: '20px!important', borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd' }}>
                                <Typography
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: '10px',
                                        textAlign: 'left',
                                        color: 'rgba(0, 0, 0, 0.7)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                        marginBottom: '8px', // Spazio tra il titolo e l'elemento successivo
                                    }}
                                >
                                    Yellow Cards
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography
                                        sx={{
                                            fontWeight: 400,
                                            fontSize: '14px',
                                            textAlign: 'left',
                                        }}
                                    >
                                        {totalYellowCards} 🟨
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid item xs={6} md={6} sx={{ padding: '20px!important', borderBottom: '1px solid #ddd' }}>
                                <Typography
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: '10px',
                                        textAlign: 'left',
                                        color: 'rgba(0, 0, 0, 0.7)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                        marginBottom: '8px', // Spazio tra il titolo e l'elemento successivo
                                    }}
                                >
                                    Red Cards
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography
                                        sx={{
                                            fontWeight: 400,
                                            fontSize: '14px',
                                            textAlign: 'left',
                                        }}
                                    >
                                        {totalRedCards} 🟥
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid item xs={6} md={6} sx={{ padding: '20px!important', borderRight: '1px solid #ddd' }}>
                                <Typography
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: '10px',
                                        textAlign: 'left',
                                        color: 'rgba(0, 0, 0, 0.7)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                        marginBottom: '8px', // Spazio tra il titolo e l'elemento successivo
                                    }}
                                >
                                    Autogol ❌
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography
                                        sx={{
                                            fontWeight: 400,
                                            fontSize: '14px',
                                            textAlign: 'left',
                                        }}
                                    >
                                        {totalOwnGoals}
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid item xs={6} md={6} sx={{ padding: '20px!important' }}>
                                <Typography
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: '10px',
                                        textAlign: 'left',
                                        color: 'rgba(0, 0, 0, 0.7)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                        marginBottom: '8px', // Spazio tra il titolo e l'elemento successivo
                                    }}
                                >
                                    Penalty Gol ✅
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography
                                        sx={{
                                            fontWeight: 400,
                                            fontSize: '14px',
                                            textAlign: 'left',
                                        }}
                                    >
                                        {totalPenaltyGoals}
                                    </Typography>
                                </Box>
                            </Grid>

                        </Grid>
                    ) : (
                        <Typography>
                            Competitions stats not found 😔
                        </Typography>
                    )}
            </AccordionDetails>
        </Accordion>
    );
};