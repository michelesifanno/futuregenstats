import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Grid, useMediaQuery } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@emotion/react';
import { Helmet } from 'react-helmet-async';
import BestUnderByRoleByAge from '../components/BestUnderByRoleByAge';
import PlayerTable from '../components/PlayerTable';
import AdBanner from '../components/AdBanner';



function Under20() {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const pageTitle = `Migliori Giovani Calciatori Under 20 | Future Gen Stats`;
    const metaDescription = `I migliori calciatori Under 20 per ruolo. Scopri tutte le statistiche generali dei giovani Under 20 dei top 5 campionati europei.`;

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={metaDescription} />
            </Helmet>
            <Box sx={{ background: theme.palette.secondary.main, padding: isMobile ? '100px 10px' : '120px 20px', minHeight: '100vh' }}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                        <Box sx={{ padding: isMobile ? '0px' : '20px 40px', paddingRight: isMobile ? '0px' : '20px' }}>
                            <Accordion defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon sx={{ fontSize: '20px' }} />}
                                    aria-controls="best-df"
                                    id="best-df"
                                    sx={{ padding: '4px 20px' }}
                                >
                                    <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '16px' : '18px' }}>Tutti i calciatori Under 20 📌</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ padding: '0px' }}>
                                    <PlayerTable
                                        ageCategory={"Under 20"}
                                    />
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box sx={{ padding: isMobile ? '0px' : '20px 40px', paddingRight: isMobile ? '0px' : '20px' }}>
                            <Accordion defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon sx={{ fontSize: '20px' }} />}
                                    aria-controls="best-df"
                                    id="best-df"
                                    sx={{ padding: '4px 20px' }}
                                >
                                    <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '16px' : '18px' }}>Migliori Portieri Under 20 🧤</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ padding: '0px' }}>
                                    <BestUnderByRoleByAge
                                        role={"Porta"}
                                        ageCategory={"Under 20"}
                                    />
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ padding: isMobile ? '0px' : '20px 40px', paddingLeft: isMobile ? '0px' : '20px' }}>
                            <Accordion defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon sx={{ fontSize: '20px' }} />}
                                    aria-controls="best-df"
                                    id="best-df"
                                    sx={{ padding: '4px 20px' }}
                                >
                                    <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '16px' : '18px' }}>Migliori Difensori Under 20 🧱</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ padding: '0px' }}>
                                    <BestUnderByRoleByAge
                                        role={"Difesa"}
                                        ageCategory={"Under 20"}
                                    />
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
                        <Box sx={{ padding: isMobile ? '0px' : '20px 40px', paddingRight: isMobile ? '0px' : '20px' }}>
                            <Accordion defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon sx={{ fontSize: '20px' }} />}
                                    aria-controls="best-df"
                                    id="best-df"
                                    sx={{ padding: '4px 20px' }}
                                >
                                    <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '16px' : '18px' }}>Migliori Centrocampisti Under 20 👟</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ padding: '0px' }}>
                                    <BestUnderByRoleByAge
                                        role={"Centrocampo"}
                                        ageCategory={"Under 20"}
                                    />
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ padding: isMobile ? '0px' : '20px 40px', paddingLeft: isMobile ? '0px' : '20px' }}>
                            <Accordion defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon sx={{ fontSize: '20px' }} />}
                                    aria-controls="best-df"
                                    id="best-df"
                                    sx={{ padding: '4px 20px' }}
                                >
                                    <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '16px' : '18px' }}>Migliori Attaccanti Under 20 ⚽️</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ padding: '0px' }}>
                                    <BestUnderByRoleByAge
                                        role={"Attacco"}
                                        ageCategory={"Under 20"}
                                    />
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default Under20;