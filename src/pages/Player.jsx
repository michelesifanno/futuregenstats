import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePlayers } from '../utils/usePlayers';
import { useTheme } from '@emotion/react';
import {
    Box,
    Typography,
    Grid,
    CircularProgress,
    useMediaQuery
} from '@mui/material';


export default function Player() {
    const { slug } = useParams();
    const { player, performance, club, loading, error } = usePlayers(slug);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));


    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">Errore: {error}</Typography>;

    return (
        <Box sx={{ background: theme.palette.secondary.main, padding: isMobile ? '100px 10px' : '120px 20px' }}>
            <Grid container spacing={2}>
                    <Box
                        sx={{
                            display: 'flex',
                            borderRadius: '5px',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '20px',
                            position: 'relative',
                            overflow: 'hidden',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundColor: '#fff',
                        }}
                    >
                        <Grid item xs={12} md={4}>
                            <img src={player.image} alt={player.name} style={{ width: isMobile ? '36px' : '120px', borderRadius: '5px' }} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography sx={{ fontWeight: 400, fontSize: isMobile ? '12px' : '14px' }}>
                                {player.name}
                            </Typography>
                        </Grid>
                    </Box>
                </Grid>
        </Box>
    );
}
