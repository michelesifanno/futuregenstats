import React, { useState, useEffect } from 'react';
import { useMediaQuery, Box, Grid, Typography, CircularProgress, Divider } from '@mui/material';
import { useTheme } from '@emotion/react';
import { usePlayer } from '../../utils/usePlayer';
import { useScoreAndTrends } from '../../utils/useScoreAndTrends';
import NationFlag from '../General/NationFlag';
import ClubComponent from '../General/ClubComponent'
import PlayerComponent from '../General/PlayerComponent';
import { useTotalPerformance } from '../../utils/useTotalPerformance';
import { useCurrentStats } from '../../utils/useCurrentStats';


const getTalentScoreColor = (score) => {
    if (score > 100) return '#C78E34';
    if (score > 80) return '#C73473';
    if (score > 60) return '#33C771';
    if (score > 40) return '#3482C7';
    if (score > 20) return '#C76434';
    if (20 < score) return '#C73434';
};

export default function PlayerInformation({ playerId }) {
    const { player, club, error: playerError, loading: playerLoading } = usePlayer(playerId);
    const { score, trends, error: scoreError, loading: scoreLoading } = useScoreAndTrends(playerId);
    const { performance, loading: performanceLoading, error: performanceError } = useTotalPerformance(playerId);
    const [loading, setLoading] = useState(true);


    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));


    useEffect(() => {
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
        window.scrollTo(0, 0);
    }, [playerId]);

    return (
        <>
            {playerLoading ? (
                <CircularProgress />
            ) : playerError ? (
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
                        <Grid item xs={12} sx={{ padding: isMobile ? '40px 20px!important' : '40px!important' }}>
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

                                <Grid item xs={12} md={1} sx={{ marginTop: isMobile ? '20px!important' : '40px!important' }}>
                                    <PlayerComponent
                                        id={playerId}
                                        width={60}
                                        height={65}
                                    />
                                </Grid>
                                <Grid item xs={12} md={9} sx={{ marginTop: isMobile ? '20px!important' : '40px!important' }}>
                                    <Typography
                                        sx={{
                                            fontWeight: 700,
                                            fontSize: '36px',
                                            lineHeight: '36px',
                                            textAlign: 'left',
                                            color: '#fff',
                                        }}
                                    >
                                        {player.name}
                                    </Typography>
                                </Grid>

                                {isDesktop ? (
                                    <Grid item xs={2} md={2} sx={{ marginTop: isMobile ? '20px!important' : '40px!important', paddingLeft: '10px!important' }}>
                                        <Typography sx={{ padding: '7px 0px', borderRadius: '5px', maxWidth: '40px', fontWeight: 600, fontSize: '18px', textAlign: 'center', color: '#fff', backgroundColor: getTalentScoreColor(score?.normalized_talent_score) }}>
                                            {score?.normalized_talent_score}
                                        </Typography>
                                    </Grid>

                                ) : (null)}
                                <Grid item sx={12}>
                                <Divider sx={{ margin: '20px 0 10px 0', borderColor: 'rgba(255, 255, 255, 0.4)!important' }} />
                                </Grid>
                                {isMobile || isTablet ? (
                                    <Grid item xs={4} md={3} sx={{ marginTop: '30px!important', padding: '0px!important' }}>
                                        <Typography
                                            sx={{
                                                fontWeight: 500,
                                                fontSize: '22px',
                                                lineHeight: '36px',
                                                textAlign: 'left',
                                                color: getTalentScoreColor(score?.normalized_talent_score)
                                            }}
                                        >
                                            {score?.normalized_talent_score}
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
                                            FGS Score
                                        </Typography>

                                    </Grid>
                                ) : (null)}

                                <Grid item xs={4} md={3} sx={{ marginTop: '30px!important', padding: '0px!important' }}>
                                    <Typography
                                        sx={{
                                            fontWeight: 500,
                                            fontSize: '22px',
                                            lineHeight: '36px',
                                            textAlign: 'left',
                                            color: '#fff',
                                        }}
                                    >
                                        {player.age || '//'}
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

                                <Grid item xs={4} md={3} sx={{ marginTop: '30px!important', padding: '0px!important' }}>
                                    <Typography
                                        sx={{
                                            fontWeight: 500,
                                            fontSize: '22px',
                                            lineHeight: '32px',
                                            textAlign: 'left',
                                            color: '#fff',
                                        }}
                                    >
                                        {player.height ? (
                                            <>
                                                {player.height} <span style={{ fontSize: '14px' }}>m.</span>
                                            </>
                                        ) : (
                                            '//'
                                        )}

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

                                <Grid item xs={4} md={3} sx={{ marginTop: '30px!important', padding: '0px!important' }}>
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
                                        Pref. Foot
                                    </Typography>
                                </Grid>

                                <Grid item xs={4} md={3} sx={{ marginTop: '30px!important', padding: '0px!important' }}>
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
                                        {player.shirtnumber || '//'}
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
                                        Shirt Num.
                                    </Typography>
                                </Grid>

                                <Grid item xs={4} md={3} sx={{ marginTop: '30px!important', padding: '0px!important' }}>
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
                                        {player.marketvalue || '//'}
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
                                        Value Mkt
                                    </Typography>
                                </Grid>

                                <Grid item xs={4} md={3} sx={{ marginTop: '30px!important', padding: '0px!important' }}>
                                    <Typography
                                        sx={{
                                            fontWeight: 500,
                                            fontSize: '22px',
                                            lineHeight: '36px',
                                            textAlign: 'left',
                                            color: '#fff',
                                        }}
                                    >
                                        {(performance?.goals) || '//'}
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

                                <Grid item xs={4} md={3} sx={{ marginTop: '30px!important', padding: '0px!important' }}>
                                    <Typography
                                        sx={{
                                            fontWeight: 500,
                                            fontSize: '22px',
                                            lineHeight: '36px',
                                            textAlign: 'left',
                                            color: '#fff',
                                        }}
                                    >
                                        {(performance?.assists) || '//'}
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

                                <Grid item xs={4} md={3} sx={{ marginTop: '30px!important', padding: '0px!important' }}>
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
                                        {(performance?.matches) || '//'}
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


                            </Grid>
                        </Grid>

                        {/* Image Grid */}
                        {/* <Grid item xs={12} md={6} sx={{ padding: isMobile ? '0px!important' : '20px 20px 0px 20px!important' }}>
                            <img
                                src='https://res.cloudinary.com/dfe8fzdna/image/upload/v1725706798/updating_nytpd4.png'
                                alt='Player image'
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    objectFit: 'contain',
                                }}
                            />
                        </Grid> */}
                    </Grid>
                </Box >
            )
            }
        </>
    );
}