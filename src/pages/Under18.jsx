import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Grid, useMediaQuery } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@emotion/react';
import { Helmet } from 'react-helmet-async';
import BestPlayersByAge from '../components/BestPlayersByAge';

function Under18() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const pageTitle = `I migliori Giovani Calciatori Under 18 | Future Gen Stats`;
    const metaDescription = `I migliori per ruolo e tutte le statistiche generali dei giovani calciatori Under 18 dei top 5 campionati europei.`;

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
                                    <BestPlayersByAge
                                        role={'Porta'}
                                        age_category={'Under 18'}
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

export default Under18;
