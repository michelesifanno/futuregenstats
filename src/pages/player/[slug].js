// pages/player/[slug].js
import React from 'react';
import Head from 'next/head';
import { Box, Typography, Grid, CircularProgress, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';
import PlayerName from '../../components/PlayerName';
import PlayerInfo from '../../components/PlayerInfo';
import PlayerPerformance from '../../components/PlayerPerformance';
import PlayerNews from '../../components/PlayerNews';

export async function getServerSideProps(context) {
    const { slug } = context.params;

    // Sostituisci con l'URL della tua API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const playerRes = await fetch(`${apiUrl}/players/${slug}`);
    const playerData = await playerRes.json();
    const performanceRes = await fetch(`${apiUrl}/players/${slug}/performance`);
    const performanceData = await performanceRes.json();
    const clubRes = await fetch(`${apiUrl}/clubs/${playerData.clubId}`);
    const clubData = await clubRes.json();

    // Gestisci eventuali errori o dati mancanti
    if (!playerData) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            player: playerData,
            performance: performanceData,
            club: clubData,
        },
    };
}

function PlayerPage({ player, performance, club }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    if (!player) return <CircularProgress />;

    return (
        <>
            <Head>
                <title>{player.name} - Profilo</title>
                <meta name="description" content={`Profilo di ${player.name}, giocatore di calcio`} />
            </Head>
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
                            <PlayerNews playerName={player?.name} />
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

export default PlayerPage;
