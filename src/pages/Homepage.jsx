import React, { useState } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Grid, useMediaQuery } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@emotion/react';
import { Helmet } from 'react-helmet-async';
import BestPlayersByCompetition from '../components/BestPlayersByCompetition';
import MostExperiencedPlayers from '../components/MostExperiencedPlayers';
import BestGK from '../components/BestGK';
import BestDF from '../components/BestDF';
import BestMF from '../components/BestMF';
import BestFW from '../components/BestFW';
import AdBanner from '../components/AdBanner';


function Homepage() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const [filter, setFilter] = useState('matches'); // Imposta il filtro predefinito

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const pageTitle = `Future Gen Stats | Analisi dei Migliori Giovani Talenti di Calcio`;
    const metaDescription = `Future Gen Stats è la piattaforma per monitorare e analizzare i migliori giovani talenti calcistici. Dati aggiornati e algoritmi avanzati per valutare i migliori prospetti.`;


    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={metaDescription} />
            </Helmet>
            <Box sx={{ background: theme.palette.secondary.main, padding: isMobile ? '100px 10px' : '120px 20px', minHeight: '100vh' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box sx={{ padding: isMobile ? '0px' : '20px 40px' }}>
                            <Accordion defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon sx={{ fontSize: '20px' }} />}
                                    aria-controls="most-experienced-players"
                                    id="most-experienced-players"
                                    sx={{ padding: '4px 20px' }}
                                >
                                    <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '16px' : '18px' }}>Giovani con più esperienza 👴🏻</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ padding: '0px' }}>
                                    <MostExperiencedPlayers />
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    </Grid>
                    <AdBanner
                        adClient="ca-pub-1316608172290883"
                        adSlot="1186890591"
                        adFormat="auto"
                        fullWidthResponsive={true} />
                    <Grid item xs={12}>
                        <Box sx={{ padding: isMobile ? '0px' : '20px 40px' }}>
                            <Accordion defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon sx={{ fontSize: '20px' }} />}
                                    aria-controls="best-players-competition"
                                    id="best-players-competition"
                                    sx={{ padding: '4px 20px' }}
                                >
                                    <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '16px' : '18px' }}>Migliori giovani per competizione 🏆</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ padding: '0px' }}>
                                    <BestPlayersByCompetition />
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    </Grid>
                    <AdBanner
                        adClient="ca-pub-1316608172290883"
                        adSlot="1186890591"
                        adFormat="auto"
                        fullWidthResponsive={true} />
                    <Grid item xs={12} md={6}>
                        <Box id="best-gk" sx={{ padding: isMobile ? '0px' : '20px 40px', paddingRight: isMobile ? '0px' : '20px' }}>
                            <Accordion defaultExpanded={isDesktop}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon sx={{ fontSize: '20px' }} />}
                                    aria-controls="best-gk"
                                    id="best-gk"
                                    sx={{ padding: '4px 20px' }}
                                >
                                    <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '16px' : '18px' }}>Migliori giovani portieri 🧤</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ padding: '0px' }}>
                                    <BestGK />
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box id="best-df" sx={{ padding: isMobile ? '0px' : '20px 40px', paddingLeft: isMobile ? '0px' : '20px' }}>
                            <Accordion defaultExpanded={isDesktop}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon sx={{ fontSize: '20px' }} />}
                                    aria-controls="best-df"
                                    id="best-df"
                                    sx={{ padding: '4px 20px' }}
                                >
                                    <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '16px' : '18px' }}>Migliori giovani difensori 🧱</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ padding: '0px' }}>
                                    <BestDF />
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box id="best-mf" sx={{ padding: isMobile ? '0px' : '20px 40px', paddingRight: isMobile ? '0px' : '20px' }}>
                            <Accordion defaultExpanded={isDesktop}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon sx={{ fontSize: '20px' }} />}
                                    aria-controls="best-mf"
                                    id="best-mf"
                                    sx={{ padding: '4px 20px' }}
                                >
                                    <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '16px' : '18px' }}>Migliori giovani centrocampisti 👟</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ padding: '0px' }}>
                                    <BestMF />
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box id="best-fw" sx={{ padding: isMobile ? '0px' : '20px 40px', paddingLeft: isMobile ? '0px' : '20px' }}>
                            <Accordion defaultExpanded={isDesktop}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon sx={{ fontSize: '20px' }} />}
                                    aria-controls="best-fw"
                                    id="best-fw"
                                    sx={{ padding: '4px 20px' }}
                                >
                                    <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '16px' : '18px' }}>Migliori giovani attaccanti ⚽️</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ padding: '0px' }}>
                                    <BestFW />
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    </Grid>
                    <AdBanner
                        adClient="ca-pub-1316608172290883"
                        adSlot="1186890591"
                        adFormat="auto"
                        fullWidthResponsive={true} />
                </Grid>
            </Box>
        </>
    );
}

export default Homepage;