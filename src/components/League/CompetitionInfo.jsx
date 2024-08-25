import React from 'react';
import { useTheme } from '@emotion/react';
import { Box, Typography, Grid, CircularProgress, useMediaQuery } from '@mui/material';
import { useCompetitions } from '../../utils/useCompetitions';
import { useYouthByCompetitionByNationality } from '../../utils/useYouthByCompetitionByNationality';

export default function CompetitionInfo({ id, competitionName, competitionCountry, competitionImage }) {
    
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Chiama l'hook per i dati dei giovani giocatori sempre, ma gestisci la logica condizionale più tardi
    const { data: youthData, loading: youthLoading, error: youthError } = useYouthByCompetitionByNationality(competitionName, competitionCountry);

    // Determina se mostrare i dati dei giovani giocatori
    const showYouthData = id !== 'CL' && id !== 'EL';

    return (
        <Grid container spacing={2} sx={{ backgroundColor: '#fff', borderRadius: '5px', display: 'flex', alignItems: 'center!important', justifyContent: 'center!important', padding: '10px' }}>
            <Grid item xs={3} sx={{ padding: '10px!important', maxWidth: isMobile ? 'auto' : '6%!important' }}>
                <img
                    src={competitionImage}
                    alt={competitionName}
                    style={{ width: isMobile ? '36px' : '40px' }}
                />
            </Grid>
            {isMobile ? (null) : (
                <Grid item xs={3} md={2} sx={{ padding: '10px!important' }}>
                    <Typography
                        sx={{
                            fontWeight: 500,
                            fontSize: isMobile ? '14px' : '16px',
                            textAlign: 'left',
                        }}
                    >
                        {competitionName}
                    </Typography>
                    <Typography
                        sx={{
                            fontWeight: 500,
                            fontSize: isMobile ? '10px' : '12px',
                            textAlign: 'left',
                            color: 'rgba(0, 0, 0, 0.7)',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                        }}
                    >
                        {(id === 'CL' || id === 'EL') ? (
                            null
                        ) : (
                            competitionCountry
                        )}
                    </Typography>
                </Grid>
            )}

            {showYouthData && (
                <>
                    <Grid item xs={3} sx={{ padding: '10px!important', textAlign: 'center!important' }}>
                        <Typography
                            sx={{
                                fontWeight: 500,
                                fontSize: isMobile ? '14px' : '16px',
                            }}
                        >
                            {youthData.totalPlayers || 0}
                        </Typography>
                        <Typography
                            sx={{
                                fontWeight: 500,
                                fontSize: isMobile ? '10px' : '12px',
                                color: 'rgba(0, 0, 0, 0.7)',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                            }}
                        >
                            YOUTHS
                        </Typography>
                    </Grid>

                    <Grid item xs={3} sx={{ padding: '10px!important', textAlign: 'center!important' }}>
                        <Typography
                            sx={{
                                fontWeight: 500,
                                fontSize: isMobile ? '14px' : '16px',
                            }}
                        >
                            {youthData.nationalPlayers || 0}
                        </Typography>
                        <Typography
                            sx={{
                                fontWeight: 500,
                                fontSize: isMobile ? '10px' : '12px',
                                color: 'rgba(0, 0, 0, 0.7)',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                            }}
                        >
                            NATIONAL
                        </Typography>
                    </Grid>

                    <Grid item xs={3} sx={{ padding: '10px!important', textAlign: 'center!important' }}>
                        <Typography
                            sx={{
                                fontWeight: 500,
                                fontSize: isMobile ? '14px' : '16px',
                            }}
                        >
                            {youthData.foreignPlayers || 0}
                        </Typography>
                        <Typography
                            sx={{
                                fontWeight: 500,
                                fontSize: isMobile ? '10px' : '12px',
                                color: 'rgba(0, 0, 0, 0.7)',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                            }}
                        >
                            FOREIGN
                        </Typography>
                    </Grid>
                </>
            )}
        </Grid>
    );
}