import React, { useState, useEffect } from 'react';
import { useMediaQuery, Box, Grid, Typography, CircularProgress, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@emotion/react';

export default function PlayerCurrentStats({
    mainLeague,
}) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    const [playerInfoMap, setPlayerInfoMap] = useState(new Map());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (mainLeague?.stats) {
            const map = new Map(mainLeague.stats.map(item => [item.localizedTitleId, item.value]));
            console.log('Player Info Map:', Array.from(map.entries())); // Debugging statement
            setPlayerInfoMap(map);
            setLoading(false);
        } else {
            setLoading(true); // I dati non sono disponibili
        }
    }, [mainLeague]);
        
    

    return (
        <>
            {loading ? (
                <CircularProgress />
            ) : (
                <Accordion defaultExpanded sx={{backgroundColor:'#00e8da'}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color:'#171d8d'}}/>} aria-controls="current-stats" id="current-stats">
                    <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '14px' : '16px', color:'#171d8d' }}>
                        Current season Stats
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{padding:'0px!important'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={3} sx={{ padding: '20px!important', borderRight: '1px solid rgba(23,29,141,0.2)', borderBottom: '1px solid rgba(23,29,141,0.2)' }}>
                            <Typography
                                sx={{
                                    fontWeight: 500,
                                    fontSize: '10px',
                                    textAlign: 'left',
                                    color: 'rgba(23,29,141,0.7)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    marginBottom: '8px', // Spazio tra il titolo e l'elemento successivo
                                }}
                            >
                                {mainLeague?.season || 'Unavailable'}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <img
                                    src={`https://www.fotmob.com/_next/image?url=https://images.fotmob.com/image_resources/logo/leaguelogo/${mainLeague.leagueId}_small.png&w=96&q=75`}
                                    alt={mainLeague.leagueName}
                                    style={{ width: '20px', marginRight:'5px' }}
                                />
                                <Typography
                                    sx={{
                                        fontWeight: 400,
                                        fontSize: '14px',
                                        textAlign: 'left',
                                        color: '#171D8D',
                                    }}
                                >
                                    {mainLeague?.leagueName || 'Unavailable'}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} md={3} sx={{ padding: '20px!important', borderRight: isMobile ? 'none' : '1px solid rgba(23,29,141,0.2)', borderBottom: '1px solid rgba(23,29,141,0.2)' }}>
                            <Typography
                                sx={{
                                    fontWeight: 500,
                                    fontSize: '10px',
                                    textAlign: 'left',
                                    color: 'rgba(23,29,141,0.7)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    marginBottom: '8px', // Spazio tra il titolo e l'elemento successivo
                                }}
                            >
                                Goals ⚽️
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: 400,
                                    fontSize: '14px',
                                    textAlign: 'left',
                                    color: '#171D8D',
                                }}
                            >
                                {playerInfoMap.has("goals") ? playerInfoMap.get("goals") : 'Unavailable'}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={3} sx={{ padding: '20px!important', borderBottom: '1px solid rgba(23,29,141,0.2)', borderRight: '1px solid rgba(23,29,141,0.2)' }}>
                            <Typography
                                sx={{
                                    fontWeight: 500,
                                    fontSize: '10px',
                                    textAlign: 'left',
                                    color: 'rgba(23,29,141,0.7)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    marginBottom: '8px', // Spazio tra il titolo e l'elemento successivo
                                }}
                            >
                                Assists 👟
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: 400,
                                    fontSize: '14px',
                                    textAlign: 'left',
                                    color: '#171D8D',
                                }}
                            >
                                {playerInfoMap.has("assists") ? playerInfoMap.get("assists") : 'Unavailable'}
                                </Typography>
                        </Grid>
                        <Grid item xs={6} md={3} sx={{ padding: '20px!important', borderBottom: '1px solid rgba(23,29,141,0.2)' }}>
                            <Typography
                                sx={{
                                    fontWeight: 500,
                                    fontSize: '10px',
                                    textAlign: 'left',
                                    color: 'rgba(23,29,141,0.7)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    marginBottom: '8px', // Spazio tra il titolo e l'elemento successivo
                                }}
                            >
                                Started 🏎️
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: 400,
                                    fontSize: '14px',
                                    textAlign: 'left',
                                    color: '#171D8D',
                                }}
                            >
                                {playerInfoMap.has("started") ? playerInfoMap.get("started") : 'Unavailable'}
                                </Typography>
                        </Grid>
                        <Grid item xs={6} md={3} sx={{ padding: '20px!important', borderBottom: isMobile ? '1px solid rgba(23,29,141,0.2)' : 'none', borderRight: '1px solid rgba(23,29,141,0.2)' }}>
                            <Typography
                                sx={{
                                    fontWeight: 500,
                                    fontSize: '10px',
                                    textAlign: 'left',
                                    color: 'rgba(23,29,141,0.7)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    marginBottom: '8px', // Spazio tra il titolo e l'elemento successivo
                                }}
                            >
                                Matches 👕
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: 400,
                                    fontSize: '14px',
                                    textAlign: 'left',
                                    color: '#171D8D',
                                }}
                            >
                                {playerInfoMap.has("matches_uppercase") ? playerInfoMap.get("matches_uppercase") : 'Unavailable'}
                                </Typography>
                        </Grid>
                        <Grid item xs={6} md={3} sx={{ padding: '20px!important', borderRight: isMobile ? 'none' : '1px solid rgba(23,29,141,0.2)', borderBottom: isMobile ? '1px solid rgba(23,29,141,0.2)' : 'none' }}>
                            <Typography
                                sx={{
                                    fontWeight: 500,
                                    fontSize: '10px',
                                    textAlign: 'left',
                                    color: 'rgba(23,29,141,0.7)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    marginBottom: '8px', // Spazio tra il titolo e l'elemento successivo
                                }}
                            >
                                Minutes Player ⏱️
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: 400,
                                    fontSize: '14px',
                                    textAlign: 'left',
                                    color: '#171D8D',
                                }}
                            >
                                {playerInfoMap.has("minutes_played") ? playerInfoMap.get("minutes_played") : 'Unavailable'}
                                </Typography>
                        </Grid>
                        <Grid item xs={6} md={3} sx={{ padding: '20px!important', borderRight: '1px solid rgba(23,29,141,0.2)' }}>
                            <Typography
                                sx={{
                                    fontWeight: 500,
                                    fontSize: '10px',
                                    textAlign: 'left',
                                    color: 'rgba(23,29,141,0.7)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    marginBottom: '8px', // Spazio tra il titolo e l'elemento successivo
                                }}
                            >
                                Rating ⭐️
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: 400,
                                    fontSize: '14px',
                                    textAlign: 'left',
                                    color: '#171D8D',
                                }}
                            >
                                {playerInfoMap.has("rating") ? playerInfoMap.get("rating") : 'Unavailable'}
                                </Typography>
                        </Grid>
                        <Grid item xs={6} md={3} sx={{ padding: '20px!important' }}>
                            <Typography
                                sx={{
                                    fontWeight: 500,
                                    fontSize: '10px',
                                    textAlign: 'left',
                                    color: 'rgba(23,29,141,0.7)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    marginBottom: '8px', // Spazio tra il titolo e l'elemento successivo
                                }}
                            >
                                Discipline 👿
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: 400,
                                    fontSize: '14px',
                                    textAlign: 'left',
                                    color: '#171D8D',
                                }}
                            >
                                {playerInfoMap.has("yellow_cards") ? playerInfoMap.get("yellow_cards") + ' 🟨' : 'Unavailable'} | {playerInfoMap.has("red_cards") ? playerInfoMap.get("red_cards") + ' 🟥' : 'Unavailable'}
                            </Typography>
                        </Grid>
                    </Grid>
                    </AccordionDetails>
            </Accordion>
            )}
        </>
    );
}
