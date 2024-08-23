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
import PlayerInformation from '../components/SinglePlayer/PlayerInformation';
import PlayerCurrentStats from '../components/SinglePlayer/PlayerCurrentStats';
import PlayerTraits from '../components/SinglePlayer/PlayerTraits';
import PlayerCareer from '../components/SinglePlayer/PlayerCareer';
import PlayerFaq from '../components/SinglePlayer/PlayerFaq';
import PlayerResume from '../components/SinglePlayer/PlayerResume';
import SubPlayerInformation from '../components/SinglePlayer/SubPlayerInformation';
import PlayerCompetitions from '../components/SinglePlayer/PlayerCompetitions';

export default function Player() {
    const { slug } = useParams();
    const { player, performance, club, loading: playerLoading, error: playerError } = usePlayer(slug);
    
    const shouldFetchFotMobData = player && club &&
        ["ES1", "IT1", "GB1", "L1", "FR1", "IT2"].includes(club?.competition_id) &&
        [20, 21, 22, 23].includes(player?.age);

    const { playerId, loading: idLoading, error: idError } = usePlayerId(
        shouldFetchFotMobData ? player?.name : null,
        shouldFetchFotMobData ? club?.name : null
    );

    const { playerData, teamColor, loading: fotMobLoading, error: fotMobError } = usePlayerFotMobData(
        shouldFetchFotMobData ? playerId : null
    );

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

    if (playerLoading || idLoading || fotMobLoading) {
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

    if (playerError || idError || fotMobError) {
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
                <Typography color="error">Error: {playerError || idError || fotMobError}</Typography>
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
                { shouldFetchFotMobData ?
                (
                    <>
                                    <Typography
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: '12px',
                                        textAlign: 'left',
                                        textTransform: 'uppercase',
                                        padding: '10px'
                                    }}
                                >
                                    Data by FotMob <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 40 40"><defs><clipPath id="3wxbwwlc6a"><path data-name="Rectangle 7737" fill="rgba(0, 152 , 95, 1.0)" d="M0 0h40v40H0z"></path></clipPath></defs><g data-name="Group 8063" clip-path="url(#3wxbwwlc6a)"><path data-name="Path 4631" d="M19.942 0A19.933 19.933 0 0 0 .347 23.636l16.487-4.248a5.57 5.57 0 0 0-.172 1.632L1.173 26.689c.156.434.329.859.514 1.279l15.267-5.608a6.036 6.036 0 0 0 .642 1.224L3.034 30.512A19.941 19.941 0 1 0 19.942 0m-5.031 33.49H9.842V28.9l5.069-2.4zm6.53-9.323a3.438 3.438 0 0 1 0-6.876 3.438 3.438 0 0 1 0 6.876m8.6-12.7h-15.13v7.051l-5.069 1.317V7.909a1.543 1.543 0 0 1 1.515-1.515h17.172a1.542 1.542 0 0 1 1.516 1.515z" fill="rgba(0, 152 , 95, 1.0)"></path></g></svg> | <a href={`https://www.fotmob.com/players/${playerData?.id}`} target="_blank" rel="noopener noreferrer">See more here</a>
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={8}>
                                        <Box sx={{ padding: isMobile ? '0px 0px 10px 0px' : '10px' }}>
                                            <PlayerInformation
                                                {...playerData}
                                            />
                                        </Box>
                                        <Box sx={{ padding: isMobile ? '0px' : '10px' }}>
                                            <PlayerCurrentStats
                                                {...playerData}
                                            />
                                        </Box>
                                        <Box sx={{ padding: isMobile ? '10px 0px' : '10px' }}>
                                            <PlayerRecentMatches
                                                matches={playerData?.recentMatches}
                                            />
                                        </Box>
                                        {isDesktop ? (<Box sx={{ padding: isMobile ? '0px' : '10px' }}>
                                            <PlayerResume
                                                performance={performance}
                                                name={player?.name}
                                            />
                                        </Box>) : null}
                
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Box sx={{ padding: isMobile ? '0px 0px' : '10px' }}>
                                            <PlayerTraits
                                                {...playerData}
                                            />
                                        </Box>
                                        <Box sx={{ padding: isMobile ? '10px 0px' : '10px' }}>
                                            <PlayerCareer
                                                {...playerData}
                                            />
                                        </Box>
                                        <Box sx={{ padding: isMobile ? '0px 0px' : '10px' }}>
                                            <PlayerFaq
                                                {...playerData}
                                            />
                                        </Box>
                                        {(isMobile || isTablet) ? (<Box sx={{ padding: isMobile ? '0px' : '10px' }}>
                                            <PlayerResume
                                                performance={performance}
                                                name={player?.name}
                                            />
                                        </Box>) : null}
                                    </Grid>
                                </Grid>
                                </>
                ) : (
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                            <Box sx={{ padding: isMobile ? '10px 0px 10px 0px' : '10px' }}>
                                <SubPlayerInformation
                                    playerId={slug}
                                />
                            </Box>
                            {isDesktop ? (<Box sx={{ padding: isMobile ? '0px' : '10px' }}>
                                <PlayerResume
                                    performance={performance}
                                    name={player?.name}
                                />
                            </Box>) : null}
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ padding: isMobile ? '0px 0px' : '10px' }}>
                                <PlayerPerformance
                                    performance={performance}
                                    name={player.name}
                                />
                            </Box>
                            <Box sx={{ padding: isMobile ? '10px 0px' : '10px' }}>
                                <PlayerCompetitions
                                    performance={performance}
                                    name={player.name}
                                />
                            </Box>
                            {(isMobile || isTablet) ? (<Box sx={{ padding: isMobile ? '0px' : '10px' }}>
                                <PlayerResume
                                    performance={performance}
                                    name={player?.name}
                                />
                            </Box>) : null}
                        </Grid>
                    </Grid>
                )
                }
            </Box>
        </>
    );
}
