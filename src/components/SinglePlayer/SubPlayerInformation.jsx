import React, { useState, useEffect } from 'react';
import { useMediaQuery, Box, Grid, Typography, CircularProgress } from '@mui/material';
import { useTheme } from '@emotion/react';
import { usePlayer } from '../../utils/usePlayer';

export default function SubPlayerInformation({ playerId }) {
    const { player, club, error } = usePlayer(playerId);
    const [loading, setLoading] = useState(true);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    useEffect(() => {
        console.log('Fetching data for playerId:', playerId);
        if (playerId) {
            setLoading(true);
            // Quando i dati vengono caricati, aggiorniamo lo stato di loading
            if (player && club) {
                setLoading(false);
            }
        } else {
            setLoading(true);
        }
    }, [playerId, player, club]);

    useEffect(() => {
        // Scrolla in alto quando il componente viene montato
        console.log('Scrolling to top');
        window.scrollTo(0, 0);
    }, [playerId]);


    useEffect(() => {
        // Simula il caricamento dei dati per 1 secondo
        if (playerId) {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [playerId]);

    return (
        <>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">Error: {error}</Typography>
            ) : (
                <Box
                    sx={{
                        backgroundColor: '#171d8d',
                        borderRadius: '5px',
                    }}
                >
                    <Grid container spacing={2} sx={{ alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.2)', padding: '10px 20px 10px 20px!important' }}>
                        <Grid item xs={1}>
                            <img
                                src={player.image}
                                alt={player.name || 'Player image'}
                                style={{ width: '70px', height: 'auto' }}
                            />
                        </Grid>
                        <Grid item xs={8} sx={{ paddingLeft: (isMobile || isTablet) ? '60px!important' : '20px!important' }}>
                            <div>
                                <Typography
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: isMobile ? '18px' : '20px',
                                        textAlign: 'left',
                                        color: '#fff',
                                        lineHeight: '20px',
                                        marginBottom:'5px'
                                    }}
                                >
                                    {player.name || 'Unavailable'}
                                </Typography>
                            </div>
                            <div>
                                <Typography
                                    sx={{
                                        fontWeight: 400,
                                        fontSize: isMobile ? '14px' : '16px',
                                        textAlign: 'left',
                                        color: 'rgba(255, 255, 255, 0.7)',
                                    }}
                                >
                                    {(player.positions || 'Unavailable')}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center!important', justifyContent: 'flex-end!important' }}>
                            <img
                                src={club.image}
                                alt={club.name || 'Team Logo'}
                                style={{
                                    width: '50px',
                                    height: 'auto',
                                    marginRight: '5px'
                                }}
                            />
                            {isMobile ? ('') : (
                                <Typography
                                    sx={{
                                        fontWeight: 400,
                                        fontSize: '12px',
                                        textTransform: 'uppercase',
                                        textAlign: 'left',
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        letterSpacing: '0.5px',
                                    }}
                                >
                                    {club.name || 'Unavailable'}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={6} md={4} sx={{ padding: '20px!important', borderRight: '1px solid rgba(255, 255, 255, 0.2)', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>
                            <Typography
                                sx={{
                                    fontWeight: 500,
                                    fontSize: '10px',
                                    textAlign: 'left',
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    marginBottom: '8px',
                                }}
                            >
                                Nationality
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography
                                    sx={{
                                        fontWeight: 400,
                                        fontSize: '14px',
                                        textAlign: 'left',
                                        color: '#fff',
                                    }}
                                >
                                    {player.nationalities || 'Unavailable'}
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={6} md={4} sx={{ padding: '20px!important', borderRight: isMobile ? 'none' : '1px solid rgba(255, 255, 255, 0.2)', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>
                            <Typography
                                sx={{
                                    fontWeight: 500,
                                    fontSize: '10px',
                                    textAlign: 'left',
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    marginBottom: '8px',
                                }}
                            >
                                {player.dateOfBirth || 'Unavailable'}
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: 400,
                                    fontSize: '14px',
                                    textAlign: 'left',
                                    color: '#fff',
                                }}
                            >
                                {player.age || 'Unavailable'} years old
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={4} sx={{ padding: '20px!important', borderBottom: '1px solid rgba(255, 255, 255, 0.2)', borderRight: '1px solid rgba(255, 255, 255, 0.2)' }}>
                            <Typography
                                sx={{
                                    fontWeight: 500,
                                    fontSize: '10px',
                                    textAlign: 'left',
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    marginBottom: '8px',
                                }}
                            >
                                Height
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: 400,
                                    fontSize: '14px',
                                    textAlign: 'left',
                                    color: '#fff',
                                }}
                            >
                                {player.height || 'Unavailable'} m.
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={4} sx={{ padding: '20px!important', borderRight: isMobile ? 'none' : '1px solid rgba(255, 255, 255, 0.2)', borderBottom: isMobile ? '1px solid rgba(255, 255, 255, 0.2)' : 'none' }}>
                            <Typography
                                sx={{
                                    fontWeight: 500,
                                    fontSize: '10px',
                                    textAlign: 'left',
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    marginBottom: '8px',
                                }}
                            >
                                Preferred Foot
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: 400,
                                    fontSize: '14px',
                                    textAlign: 'left',
                                    color: '#fff',
                                    textTransform:'capitalize',
                                }}
                            >
                                {player.foot || 'Unavailable'}
                            </Typography>
                        </Grid>

                        <Grid item xs={6} md={4} sx={{ padding: '20px!important', borderRight: '1px solid rgba(255, 255, 255, 0.2)' }}>
                            <Typography
                                sx={{
                                    fontWeight: 500,
                                    fontSize: '10px',
                                    textAlign: 'left',
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    marginBottom: '8px',
                                }}
                            >
                                Shirt Number
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: 400,
                                    fontSize: '14px',
                                    textAlign: 'left',
                                    color: '#fff',
                                }}
                            >
                                #{player.shirtnumber || '//'}
                            </Typography>
                        </Grid>

                        <Grid item xs={6} md={4} sx={{ padding: '20px!important' }}>
                            <Typography
                                sx={{
                                    fontWeight: 500,
                                    fontSize: '10px',
                                    textAlign: 'left',
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    marginBottom: '8px',
                                }}
                            >
                                Market Value
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: 400,
                                    fontSize: '14px',
                                    textAlign: 'left',
                                    color: '#fff',
                                }}
                            >
                                € {player.marketvalue || 'Unavailable'}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            )}
        </>
    );
}