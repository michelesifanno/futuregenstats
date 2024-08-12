import React, { useState } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Grid, useMediaQuery } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@emotion/react';
import BestPlayersByCompetition from '../components/BestPlayersByCompetition';

function Homepage() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const [filter, setFilter] = useState('matches'); // Imposta il filtro predefinito

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <Box sx={{ background: theme.palette.secondary.main, padding: isMobile ? '100px 10px' : '120px 20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box>
                        <Accordion defaultExpanded>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{fontSize:'20px'}} />}
                                aria-controls="best-players-by-competition"
                                id="best-players-by-competition"
                                sx={{padding:'4px 20px'}}
                            >
                                <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '16px' : '18px' }}>Migliori giovani calciatori per competizione</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{padding: '0px'}}>
                                <BestPlayersByCompetition />
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Homepage;