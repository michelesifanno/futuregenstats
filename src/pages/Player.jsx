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
    const { playerId, loading: idLoading, error: idError } = usePlayerId(player?.name, club?.name);
    const { playerData, teamColor, loading: fotMobLoading, error: fotMobError } = usePlayerFotMobData(playerId);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));


    const phrases = [
        "Stiamo preparando i dati... 📊",
        "Stiamo mettendo in forma il giocatore... 💆🏻‍♂️",
        "Stiamo stirando le divise... 👕",
        "Arrivano eh... 🔥",
        "Affilando i tacchetti... 👟"
    ];

    // Imposta una frase iniziale casuale
    const [funnyPhrase, setFunnyPhrase] = useState(phrases[Math.floor(Math.random() * phrases.length)]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
            setFunnyPhrase(randomPhrase);
        }, 2000); // Cambia frase ogni 2 secondi

        return () => clearInterval(intervalId);
    }, []);

    // Gestisci i vari stati di caricamento ed errore
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
                <Typography color="error">Errore: {playerError || idError || fotMobError}</Typography>
            </Box>
        );
    }

    const isMajorLeague = ["LaLiga", "Serie A", "Premier League", "Bundesliga", "Ligue 1", "Serie B"].includes(playerData?.mainLeague.leagueName);

    const pageTitle = `Ultimate Stats for ${playerData?.name} - ${playerData?.positionDescription?.primaryPosition?.label} - ${playerData?.primaryTeam?.teamName} | Future Gen Stats`;
    const metaDescription = `The latest performance stats of ${playerData?.name}, the ${playerData?.positionDescription?.primaryPosition?.label} from ${playerData?.primaryTeam?.teamName}. Don't miss out on the future star's key metrics.`;

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
                { isMajorLeague ?
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
