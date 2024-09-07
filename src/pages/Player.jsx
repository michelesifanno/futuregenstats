import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePlayer } from '../utils/usePlayer';
import { useCurrentStats } from '../utils/useCurrentStats';
import { useTheme } from '@emotion/react';
import { Box, Typography, Grid, CircularProgress, useMediaQuery } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import PlayerPerformance from '../components/SinglePlayer/PlayerPerformance';
import PlayerResume from '../components/SinglePlayer/PlayerResume';
import PlayerInformation from '../components/SinglePlayer/PlayerInformation';
import AdBanner from '../components/AdBanner';
import PlayerCompetitions from '../components/SinglePlayer/PlayerCompetitions';


export default function Player() {
    const { slug } = useParams();
    const { player, performance, club, loading: playerLoading, error: playerError } = usePlayer(slug);



    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

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

    const pageTitle = `${player?.name} - ${player?.positions} Stats & Performance at ${club?.name} | Future Gen Stats`;
    const metaDescription = `Explore detailed performance stats and key metrics of ${player?.name}, playing as ${player?.position} for ${club?.name}. Stay updated with the latest achievements and career highlights of this promising player.`;

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={metaDescription} />
            </Helmet>
            <Box sx={{
                background: theme.palette.secondary.main,
                padding: isMobile ? '70px 10px 10px 10px' : '95px 10px 20px 10px',
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
                                <PlayerPerformance playerId={player?.id} />
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