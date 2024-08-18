import React from 'react';
import { useParams } from 'react-router-dom';
import { usePlayer } from '../utils/usePlayer';
import { useTheme } from '@emotion/react';
import { Box, Typography, Grid, CircularProgress, useMediaQuery } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import PlayerName from '../components/PlayerName';
import PlayerInfo from '../components/PlayerInfo';
import PlayerPerformance from '../components/PlayerPerformance';
import PlayerNews from '../components/PlayerNews';

export default function Player() {
    const { slug } = useParams();
    const { player, performance, club, loading, error } = usePlayer(slug);
    console.log('Player:', player);
    console.log('Performance:', performance);
    console.log('Club:', club);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">Errore: {error}</Typography>;

    const pageTitle = `${player.name} - Profilo del Giocatore | Future Gen Stats`;
    const metaDescription = `Scopri il profilo del giovane calciatore ${player.name}, ${player.positions} del ${club.name}. Età, statistiche e ultime notizie.`;

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
                                position={player?.positions}
                                club_image={club?.image}
                                value={player?.marketvalue}
                                value_currency={player?.marketvaluecurrency}
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