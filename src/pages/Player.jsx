import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePlayer } from '../utils/usePlayer';
import usePlayerId from '../utils/usePlayerId';
import usePlayerFotMobData from '../utils/usePlayerFotMobData';
import { useTheme } from '@emotion/react';
import { Box, Typography, Grid, CircularProgress, useMediaQuery } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import PlayerRecentMatches from '../components/SinglePlayer/PlayerRecentMatches';
import PlayerPerformance from '../components/SinglePlayer/PlayerPerformance';
import PlayerCurrentStats from '../components/SinglePlayer/PlayerCurrentStats';
import PlayerTraits from '../components/SinglePlayer/PlayerTraits';
import PlayerCareer from '../components/SinglePlayer/PlayerCareer';
import PlayerFaq from '../components/SinglePlayer/PlayerFaq';
import PlayerResume from '../components/SinglePlayer/PlayerResume';
import PlayerInformation from '../components/SinglePlayer/PlayerInformation';
import AdBanner from '../components/AdBanner';
import PlayerCompetitions from '../components/SinglePlayer/PlayerCompetitions';

export default function Player() {
    const { slug } = useParams();
    const { player, performance, club, loading: playerLoading, error: playerError } = usePlayer(slug);

    // Verifica i dati del giocatore e del club
    useEffect(() => {
        console.log('Player:', player);
        console.log('Club:', club);
    }, [player, club]);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    const phrases = [
        "Loading data... 📊",
        "Getting the player in shape... 💆🏻‍♂️",
        "Ironing the jerseys... 👕",
        "Hang tight... 🔥",
        "Sharpening the cleats... 👟"
    ];

    const [funnyPhrase, setFunnyPhrase] = useState(phrases[Math.floor(Math.random() * phrases.length)]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
            setFunnyPhrase(randomPhrase);
        }, 2000);

        return () => clearInterval(intervalId);
    }, []);

    if (playerLoading) {
        return (
            <Box sx={{
                background: theme.palette.secondary.main,
                padding: isMobile ? '100px 10px' : '110px 20px',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <CircularProgress />
                <Typography sx={{ marginTop: 2 }}>{funnyPhrase}</Typography>
            </Box>
        );
    }

    if (playerError) {
        console.error('Player Error:', playerError);

        return (
            <Box sx={{
                background: theme.palette.secondary.main,
                padding: isMobile ? '100px 10px' : '110px 20px',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Typography color="error">Error: {playerError}</Typography>
            </Box>
        );
    }

    const pageTitle = `${player?.name} - ${player?.position} Stats & Performance at ${club?.name} | Future Gen Stats`;
    const metaDescription = `Explore detailed performance stats and key metrics of ${player?.name}, playing as ${player?.position} for ${club?.name}. Stay updated with the latest achievements and career highlights of this promising player.`;

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={metaDescription} />
            </Helmet>
            <Box sx={{
                background: theme.palette.secondary.main,
                padding: isMobile ? '70px 10px' : '90px 20px',
                minHeight: '100vh',
            }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                            <Box sx={{ padding: isMobile ? '10px 0px 10px 0px' : '10px' }}>
                                <PlayerInformation playerId={slug} />
                            </Box>
                            {isDesktop ? (
                                <Box sx={{ padding: isMobile ? '0px' : '10px' }}>
                                    <PlayerResume performance={performance} name={player?.name} />
                                </Box>
                            ) : null}
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ padding: isMobile ? '0px 0px' : '10px' }}>
                                <PlayerPerformance performance={performance} name={player.name} />
                            </Box>
                            <Box sx={{ padding: isMobile ? '10px 0px' : '10px' }}>
                                <PlayerCompetitions performance={performance} name={player.name} />
                            </Box>
                            {(isMobile || isTablet) ? (
                                <Box sx={{ padding: isMobile ? '0px' : '10px' }}>
                                    <PlayerResume performance={performance} name={player?.name} />
                                </Box>
                            ) : null}
                        </Grid>
                        <Grid item xs={12} sx={{minHeight:'50px!important'}}>
                            <AdBanner />
                        </Grid>
                    </Grid>
            </Box>
        </>
    );
}