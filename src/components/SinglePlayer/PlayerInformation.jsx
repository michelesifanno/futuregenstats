import React, { useState, useEffect } from 'react';
import { useMediaQuery, Box, Grid, Typography, CircularProgress } from '@mui/material';
import { useTheme } from '@emotion/react';
import { usePlayer } from '../../utils/usePlayer';
import NationFlag from '../General/NationFlag';
import SoccerShirt from '../General/SoccerShirt';


// Funzione per trasformare il nome nel formato corretto
const formatNameForUrl = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
};

const ClubComponent = ({ name, id }) => {
    // Costruisci l'URL dell'immagine
    const formattedName = formatNameForUrl(name);
    const imageUrl = `https://res.cloudinary.com/dfe8fzdna/image/upload/v1724882443/${id}/${formattedName}.png`;

    return (
        <span
            style={{
                width: '36px',
                height: '36px',
                backgroundColor: '#fff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                border: '1px solid #f8f8f8'
            }}
        >
            <img
                src={imageUrl}
                alt={name || 'Team Logo'}
                style={{
                    width: '30px',
                    height: '30px',
                    objectFit: 'contain',
                }}
            />
        </span>
    );
};

export default function PlayerInformation({ playerId }) {
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
                    <Grid container spacing={2} sx={{ alignItems: 'top' }}>

                        {/* Main Content Grid */}
                        <Grid item xs={12} md={6} sx={{ padding: isMobile ? '20px!important' : '40px!important' }}>
                            <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Grid item xs={6} md={5}>
                                    <Typography
                                        sx={{
                                            fontWeight: 500,
                                            fontSize: '12px',
                                            textAlign: 'left',
                                            textTransform: 'uppercase',
                                            color: '#fff',
                                            letterSpacing: '0.5px'
                                        }}
                                    >
                                        <span style={{ backgroundColor: '#2047e4', padding: '5px 5px', borderRadius: '2px' }}>
                                            {(player.positions || 'Unavailable')}
                                        </span>
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} md={6}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <NationFlag nation={player.nationalities} />
                                        {(isMobile || isTablet) ?
                                            (null)
                                            :
                                            (
                                                <Typography
                                                    sx={{
                                                        fontWeight: 400,
                                                        fontSize: '10px',
                                                        textAlign: 'left',
                                                        color: '#fff',
                                                        marginLeft: '5px'
                                                    }}
                                                >
                                                    {player.nationalities || 'Unavailable'}
                                                </Typography>
                                            )
                                        }
                                    </Box>
                                </Grid>
                                <Grid item xs={3} md={1}>
                                    <ClubComponent
                                        name={club.name}
                                        id={club.competition_id}
                                    />
                                </Grid>

                                <Grid item xs={12} sx={{ marginTop: isMobile ? '20px!important' : '40px!important' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography
                                            sx={{
                                                fontWeight: 700,
                                                fontSize: '36px',
                                                lineHeight: '46px',
                                                textAlign: 'left',
                                                color: '#fff',
                                            }}
                                        >
                                            {player.name}
                                        </Typography>
                                    </Box>
                                </Grid>


                                <Grid item xs={4} sx={{ marginTop:'20px!important' }}>
                                    <Typography
                                        sx={{
                                            fontWeight: 500,
                                            fontSize: '22px',
                                            lineHeight: '36px',
                                            textAlign: 'left',
                                            color: '#fff',
                                        }}
                                    >
                                        {player.age}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontWeight: 500,
                                            fontSize: '10px',
                                            textAlign: 'left',
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                        }}
                                    >
                                        years old
                                    </Typography>
                                </Grid>

                                <Grid item xs={4} sx={{ marginTop:'20px!important' }}>
                                    <Typography
                                        sx={{
                                            fontWeight: 500,
                                            fontSize: '22px',
                                            lineHeight: '32px',
                                            textAlign: 'left',
                                            color: '#fff',
                                        }}
                                    >
                                        {player.height} <span style={{ fontSize: '14px' }}>m.</span>
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontWeight: 500,
                                            fontSize: '10px',
                                            textAlign: 'left',
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                        }}
                                    >
                                        Height
                                    </Typography>
                                </Grid>

                                <Grid item xs={4} sx={{ marginTop:'20px!important'}}>
                                    <Typography
                                        sx={{
                                            fontWeight: 500,
                                            fontSize: '22px',
                                            lineHeight: '36px',
                                            textAlign: 'left',
                                            color: '#fff',
                                            textTransform: 'capitalize'
                                        }}
                                    >
                                        {player.foot || '//'}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontWeight: 500,
                                            fontSize: '10px',
                                            textAlign: 'left',
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                        }}
                                    >
                                        Preferred Foot
                                    </Typography>
                                </Grid>

                                <Grid item xs={4} sx={{ marginTop: '20px!important' }}>
                                    <Typography
                                        sx={{
                                            fontWeight: 500,
                                            fontSize: '22px',
                                            lineHeight: '36px',
                                            textAlign: 'left',
                                            color: '#fff',
                                        }}
                                    >
                                        X
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontWeight: 500,
                                            fontSize: '10px',
                                            textAlign: 'left',
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                        }}
                                    >
                                        Goals
                                    </Typography>
                                </Grid>

                                <Grid item xs={4} sx={{ marginTop: '20px!important' }}>
                                    <Typography
                                        sx={{
                                            fontWeight: 500,
                                            fontSize: '22px',
                                            lineHeight: '36px',
                                            textAlign: 'left',
                                            color: '#fff',
                                        }}
                                    >
                                        X
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontWeight: 500,
                                            fontSize: '10px',
                                            textAlign: 'left',
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                        }}
                                    >
                                        Assist
                                    </Typography>
                                </Grid>

                                <Grid item xs={4} sx={{ marginTop: '20px!important' }}>
                                    <Typography
                                        sx={{
                                            fontWeight: 500,
                                            fontSize: '22px',
                                            lineHeight: '36px',
                                            textAlign: 'left',
                                            color: '#fff',
                                            textTransform: 'capitalize'
                                        }}
                                    >
                                        X
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontWeight: 500,
                                            fontSize: '10px',
                                            textAlign: 'left',
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                        }}
                                    >
                                        Matches
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} sx={{ marginTop: isMobile ? '20px!important' : '40px!important' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography
                                            sx={{
                                                fontWeight: 400,
                                                fontSize: '20px',
                                                lineHeight: '30px',
                                                textAlign: 'left',
                                                color: '#fff',
                                            }}
                                        >
                                            Value Market: <b> € {player.marketvalue}</b>
                                        </Typography>
                                    </Box>
                                </Grid>


                            </Grid>
                        </Grid>

                        {/* Image Grid */}
                        <Grid item xs={12} md={6} sx={{ padding: isMobile ? '0px!important' : '20px 20px 0px 20px!important' }}>
                            <img
                                src='https://res.cloudinary.com/dfe8fzdna/image/upload/v1725706798/updating_nytpd4.png'
                                alt='Player image'
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    objectFit: 'contain',
                                }}
                            />
                        </Grid>
                    </Grid>
                </Box>
            )}
        </>
    );
}