import React, { useState, useEffect } from 'react';
import { useMediaQuery, Box, Grid, Typography, CircularProgress } from '@mui/material';
import { useTheme } from '@emotion/react';

export default function PlayerInformation({
    id,
    name,
    birthDate,
    isCaptain,
    primaryTeam,
    positionDescription,
    injuryInformation,
    internationalDuty,
    playerInformation,
    mainLeague,
    trophies,
    recentMatches,
    careerHistory,
    traits,
    meta,
}) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    const playerInfoMap = new Map(playerInformation?.map(item => [item.title, item]));
    const [imgSrc, setImgSrc] = useState(`https://www.fotmob.com/_next/image?url=https://images.fotmob.com/image_resources/playerimages/${id}.png&w=256&q=75`);

    const handleError = () => {
        setImgSrc('/player.png'); // Percorso del fallback
    };

    // Stato di caricamento
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simula il caricamento dei dati
        const timer = setTimeout(() => {
            setLoading(false); // I dati sono stati caricati
        }, 1000); // Intervallo di 1 secondo

        return () => clearTimeout(timer); // Pulizia del timer
    }, [id]);

    useEffect(() => {
        // Simula il caricamento dei dati
        if (id) {
            setLoading(false); // I dati sono stati caricati
        } else {
            setLoading(true); // I dati non sono ancora disponibili
        }
    }, [id]);

    const formatDate = (dateStr) => {
        if (!dateStr) return 'unavailable';
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Mesi sono 0-indexed
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const getTeamLogo = (teamId) => {
        return teamId
            ? `https://www.fotmob.com/_next/image?url=https://images.fotmob.com/image_resources/logo/teamlogo/${teamId}.png&w=48&q=75`
            : '/team-logo.png'; // Percorso dell'immagine di fallback
    };

    return (
        <>
            {loading ? (
                <CircularProgress />
            ) : (
                <Box
                    sx={{
                        backgroundColor: primaryTeam?.teamColors?.color || '#000', // Imposta un colore di fallback se non disponibile
                        borderRadius: '5px',
                    }}
                >
                    <Grid container spacing={2} sx={{ alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.2)', padding: '10px 20px 0px 20px!important' }}>
                        <Grid item xs={1}>
                            <img
                                src={imgSrc}
                                alt={name || 'Player image'}
                                onError={handleError}
                                style={{ width: '70px', height: 'auto' }} // Dimensiona l'immagine
                            />
                        </Grid>
                        <Grid item xs={8} sx={{ paddingLeft: (isMobile || isTablet) ? '60px!important' : '20px!important' }}>
                            <div>
                                <Typography
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: '20px',
                                        textAlign: 'left',
                                        color: '#fff',
                                    }}
                                >
                                    {name || 'Unavailable'}
                                </Typography>
                            </div>
                            <div>
                                <Typography
                                    sx={{
                                        fontWeight: 400,
                                        fontSize: '16px',
                                        textAlign: 'left',
                                        color: 'rgba(255, 255, 255, 0.7)',
                                    }}
                                >
                                    {(positionDescription?.primaryPosition?.label || 'Unavailable').charAt(0).toUpperCase() + (positionDescription?.primaryPosition?.label || 'Unavailable').slice(1)}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center!important', justifyContent: 'flex-end!important' }}>
                            <img
                                src={getTeamLogo(primaryTeam?.teamId)}
                                alt={primaryTeam?.teamName || 'Team Logo'}
                                style={{
                                    width: '30px',
                                    height: 'auto', // Mantiene le proporzioni dell'immagine
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
                                    {primaryTeam?.teamName || 'Unavailable'}
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
                                    marginBottom: '8px', // Spazio tra il titolo e l'elemento successivo
                                }}
                            >
                                Nationality
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <img
                                    src={`https://www.fotmob.com/_next/image?url=https://images.fotmob.com/image_resources/logo/teamlogo/${playerInfoMap.get("Country")?.icon?.id.toLowerCase()}.png&w=32&q=75`}
                                    alt={playerInfoMap.get("Country")?.value?.fallback || 'Country Logo'}
                                    style={{
                                        width: '20px',
                                        height: 'auto', // Mantiene le proporzioni dell'immagine
                                        marginRight: '10px',
                                    }}
                                />
                                <Typography
                                    sx={{
                                        fontWeight: 400,
                                        fontSize: '14px',
                                        textAlign: 'left',
                                        color: '#fff',
                                    }}
                                >
                                    {playerInfoMap.get("Country")?.value?.fallback || 'Unavailable'}
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
                                    marginBottom: '8px', // Spazio tra il titolo e l'elemento successivo
                                }}
                            >
                                Date of Birth
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: 400,
                                    fontSize: '14px',
                                    textAlign: 'left',
                                    color: '#fff',
                                }}
                            >
                                {formatDate(birthDate?.utcTime)}
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
                                    marginBottom: '8px', // Spazio tra il titolo e l'elemento successivo
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
                                {playerInfoMap.get("Height")?.value?.fallback || 'Unavailable'}
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
                                    marginBottom: '8px', // Spazio tra il titolo e l'elemento successivo
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
                                }}
                            >
                                {playerInfoMap.get("Preferred foot")?.value?.fallback || 'Unavailable'}
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
                                    marginBottom: '8px', // Spazio tra il titolo e l'elemento successivo
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
                                #{playerInfoMap.get("Shirt")?.value?.fallback || 'Unavailable'}
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
                                    marginBottom: '8px', // Spazio tra il titolo e l'elemento successivo
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
                                {playerInfoMap.get("Market value")?.value?.fallback || 'Unavailable'}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            )}
        </>
    );
}
