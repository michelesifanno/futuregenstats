import React from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { Box, Typography, Grid, CircularProgress, useMediaQuery } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useCompetitions } from '../utils/useCompetitions';
import CompetitionInfo from '../components/League/CompetitionInfo';
import BestPlayersInCompetition from '../components/League/BestPlayerInCompetition';
import CTA_IHG from '../components/Homepage/CTA_IHG';
import MostMatchesByCompetition from '../components/League/MostMatchesByCompetition';

export default function Competition() {
    const { slug } = useParams();
    const { competitions, loading: compLoading, error: compError } = useCompetitions();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    // Trova la competizione giusta usando lo slug
    const competition = competitions?.find(comp => comp.id === slug);

    // Gestione del caricamento e degli errori
    if (compLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (compError) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h6" color="error">
                    Error: {compError}
                </Typography>
            </Box>
        );
    }

    // Gestione del caso in cui non venga trovata la competizione
    if (!competition) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h6">
                    Competition not found
                </Typography>
            </Box>
        );
    }

    const pageTitle = `${competition?.competitionname} - Details & Stats | Future Gen Stats`;
    const metaDescription = `Explore detailed information and key stats of ${competition?.competitionname}. Stay updated with the latest achievements and highlights of this competition.`;

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={metaDescription} />
            </Helmet>
            <Box sx={{
                background: theme.palette.secondary.main,
                padding: isMobile ? '80px 10px' : '100px 20px',
                minHeight: '100vh',
            }}>
                <Grid container spacing={2}>
                    {/* Colonna principale di larghezza 9 */}
                    <Grid item xs={12} md={9}>
                        <Grid container spacing={2}>
                            {/* Componente CompetitionInfo */}
                            <Grid item xs={12}>
                                <Box sx={{ padding: isMobile ? '10px 0px' : '10px' }}>
                                    <CompetitionInfo
                                        id={slug}
                                        competitionName={competition?.competitionname}
                                        competitionCountry={competition?.competitioncountryname}
                                        competitionImage={competition?.competitionimage}
                                    />
                                </Box>
                            </Grid>
                            {/* Componente MostMatchesByCompetition */}
                            <Grid item xs={12} md={4}>
                                <Box sx={{ padding: isMobile ? '0px 0px 10px 0px' : '10px' }}>
                                    <MostMatchesByCompetition
                                        competitionId={competition?.id}
                                    />
                                </Box>
                            </Grid>
                            {/* Componente BestPlayersInCompetition */}
                            <Grid item xs={12} md={8}>
                                <Box sx={{ padding: isMobile ? '10px 0px' : '10px' }}>
                                    <BestPlayersInCompetition
                                        competitionId={competition?.id}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Colonna laterale di larghezza 3 */}
                    <Grid item xs={12} md={3} sx={{ position: isDesktop ? 'sticky' : 'static', top: 0 }}>
                        <Box sx={{ padding: isMobile ? '10px 0px' : '10px', position: isDesktop ? 'sticky' : 'static', top: '90px' }}>
                            <CTA_IHG />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
