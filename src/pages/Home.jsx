import React, { useState } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Grid, useMediaQuery } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@emotion/react';
import { Helmet } from 'react-helmet-async';
import BestPlayersByCompetition from '../components/Homepage/BestPlayersByCompetition';
import MostExperiencedPlayers from '../components/Homepage/MostExperiencedPlayers';
import YouthByCompetition from '../components/Homepage/YouthByCompetitions';
import YouthByNationality from '../components/Homepage/YouthByNationality';
import BestPlayersByAge from '../components/BestPlayersByAge';
import BestGK from '../components/BestGK';
import BestDF from '../components/BestDF';
import BestMF from '../components/BestMF';
import BestFW from '../components/BestFW';
import AdBanner from '../components/AdBanner';


function Home() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const [filter, setFilter] = useState('matches'); // Imposta il filtro predefinito

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const pageTitle = `Future Gen Stats | Analysis of the Best Young Football Talents`;
    const metaDescription = `Future Gen Stats is the platform to monitor and analyze the best young football talents. Up-to-date data and advanced algorithms to evaluate top prospects.`;


    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={metaDescription} />
            </Helmet>
            <Box sx={{
                background: theme.palette.secondary.main,
                padding: isMobile ? '70px 10px 10px 10px' : '95px 10px 20px 10px',
                minHeight: '100vh',
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3} >
                        <Box sx={{ padding: isMobile ? '10px 0px' : '10px' }}>
                            <YouthByCompetition />
                        </Box>
                        <Box sx={{ padding: isMobile ? '10px 0px' : '10px' }}>
                            <YouthByNationality />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ padding: isMobile ? '10px 0px' : '10px' }}>
                            <MostExperiencedPlayers />
                        </Box>
                        <Box sx={{ padding: isMobile ? '10px 0px' : '10px' }}>
                            <BestPlayersByCompetition />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                    <Box sx={{ padding: isMobile ? '10px 0px' : '10px' }}>
                            <BestPlayersByAge
                            ageCategory={'Under 18'} />
                        </Box>
                        <Box sx={{ padding: isMobile ? '10px 0px' : '10px' }}>
                            <BestPlayersByAge
                            ageCategory={'Under 19'} />
                        </Box>
                        <Box sx={{ padding: isMobile ? '10px 0px' : '10px' }}>
                            <BestPlayersByAge
                            ageCategory={'Under 20'} />
                        </Box>
                        <Box sx={{ padding: isMobile ? '10px 0px' : '10px' }}>
                            <BestPlayersByAge
                            ageCategory={'Under 21'} />
                        </Box>
                        <Box sx={{ padding: isMobile ? '10px 0px' : '10px' }}>
                            <BestPlayersByAge
                            ageCategory={'Under 22'} />
                        </Box>
                        <Box sx={{ padding: isMobile ? '10px 0px' : '10px' }}>
                            <BestPlayersByAge
                            ageCategory={'Under 23'} />
                        </Box>

                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default Home;