import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import { usePlayer } from '../utils/usePlayer';
import usePlayerId from '../utils/usePlayerId';
import usePlayerFotMobData from '../utils/usePlayerFotMobData';
import { useTheme } from '@emotion/react';
import { Box, Typography, Grid, CircularProgress, useMediaQuery } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import PlayerRecentMatches from '../components/SinglePlayer/PlayerRecentMatches';
import PlayerName from '../components/SinglePlayer/PlayerName';
import PlayerInfo from '../components/SinglePlayer/PlayerInfo';
import PlayerPerformance from '../components/SinglePlayer/PlayerPerformance';
import PlayerNews from '../components/SinglePlayer/PlayerNews';

export default function Player() {
    const { slug } = useParams();
    const { player, performance, club, loading: playerLoading, error: playerError } = usePlayer(slug);
    const { playerId, loading: idLoading, error: idError } = usePlayerId(player?.name || '');
    const { playerData, teamColor, loading: fotMobLoading, error: fotMobError } = usePlayerFotMobData(playerId);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Stato per la frase simpatica
    const [funnyPhrase, setFunnyPhrase] = useState('');
    const phrases = [
        "Scaldando i motori... 🏎️",
        "Preparando i dati... 📊",
        "Mettendo in forma il giocatore... 💆🏻‍♂️",
        "Controllando l'armadietto... 👕",
        "Giusto un momento... 🔥",
        "Affilando i tacchetti... 👟"
    ];

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

    const pageTitle = `${player?.name} - Profilo del Giocatore | Future Gen Stats`;
    const metaDescription = `Scopri il profilo del giovane calciatore ${player?.name}, ${player?.positions} del ${club?.name}. Età, statistiche e ultime notizie.`;

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={metaDescription} />
            </Helmet>
            <Box sx={{
                background: theme.palette.secondary.main,
                padding: isMobile ? '100px 10px' : '110px 20px',
                minHeight: '100vh',
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={7}>
                        <Box sx={{ padding: isMobile ? '0px 0px 10px 0px' : '10px' }}>
                            <PlayerName
                                image={player?.image}
                                name={player?.name}
                                club_image={club?.image}
                                value={player?.marketvalue}
                                value_currency={player?.marketvaluecurrency}
                                color={playerData?.primaryTeam.teamColors.color} 
                            />
                        </Box>
                        <Box sx={{ padding: isMobile ? '0px 0px' : '10px' }}>
                            <PlayerInfo
                                club_name={club?.name}
                                club_image={club?.image}
                                dateofbirth={player?.dateOfBirth}
                                age={player?.age}
                                height={player?.height}
                                nationalities={player?.nationalities}
                                foot={player?.foot}
                                shirtnumber={player?.shirtnumber}
                                positions={player?.positions}
                            />
                        </Box>
                        <Box sx={{ padding: isMobile ? '10px 0px 0px 0px' : '10px' }}>
                            <PlayerRecentMatches
                                matches={playerData?.recentMatches}
                            />
                        </Box>
                        <Box sx={{ padding: isMobile ? '10px 0px 0px 0px' : '10px' }}>
                            <PlayerNews
                                playerName={player?.name}
                                playerClub={club?.name}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Box sx={{ padding: isMobile ? '0px 0px' : '10px' }}>
                            <PlayerPerformance
                                performance={performance}
                                name={player?.name}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
