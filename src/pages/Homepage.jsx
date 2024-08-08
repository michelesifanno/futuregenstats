import React, { useState } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Grid, useMediaQuery } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@emotion/react';
import TopPlayers from '../components/TopPlayers';
import TopCompetitions from '../components/TopCompetitions';

function Homepage() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [filter, setFilter] = useState('matches'); // Imposta il filtro predefinito

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <Box sx={{ background: theme.palette.secondary.main, padding: '160px 20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                    <Box sx={{ padding: isMobile ? '0px' : '10px' }}>
                        <Accordion defaultExpanded>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="experience"
                                id="experience"
                            >
                                <Typography sx={{ fontWeight: 500, fontSize: '18px' }}>Most experienced players</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TopPlayers filter={'matches'} />
                            </AccordionDetails>
                        </Accordion>

                        <Accordion defaultExpanded>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="goals"
                                id="goals"
                            >
                                <Typography sx={{ fontWeight: 500, fontSize: '18px' }}>Top Scorer</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TopPlayers filter={'goals'} />
                            </AccordionDetails>
                        </Accordion>

                        <Accordion defaultExpanded>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="assist"
                                id="assist"
                            >
                                <Typography sx={{ fontWeight: 500, fontSize: '18px' }}>Assistman</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TopPlayers filter={'assists'} />
                            </AccordionDetails>
                        </Accordion>

                        <Accordion defaultExpanded>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="assist"
                                id="goals"
                            >
                                <Typography sx={{ fontWeight: 500, fontSize: '18px' }}>First choice</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TopPlayers filter={'starting_xi'} />
                            </AccordionDetails>
                        </Accordion>

                    </Box>

                </Grid>
                <Grid item xs={12} sm={4}>
                    <Box sx={{ padding: isMobile ? '0px' : '10px' }}>
                        <Accordion defaultExpanded>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="players-competitions"
                                id="players-competition"
                            >
                                <Typography sx={{ fontWeight: 500, fontSize: '18px' }}>Players for Competitions</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TopCompetitions filter={'num_players'} />
                            </AccordionDetails>
                        </Accordion>

                        <Accordion defaultExpanded>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="matches-competitions"
                                id="matches-competition"
                            >
                                <Typography sx={{ fontWeight: 500, fontSize: '18px' }}>Matches for Competitions</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TopCompetitions filter={'total_matches'} />
                            </AccordionDetails>
                        </Accordion>

                        <Accordion defaultExpanded>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="goals-competitions"
                                id="goals-competition"
                            >
                                <Typography sx={{ fontWeight: 500, fontSize: '18px' }}>Goals for Competitions</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TopCompetitions filter={'total_goals'} />
                            </AccordionDetails>
                        </Accordion>

                        <Accordion defaultExpanded>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="assists-competitions"
                                id="assists-competition"
                            >
                                <Typography sx={{ fontWeight: 500, fontSize: '18px' }}>Assists for Competitions</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TopCompetitions filter={'total_assists'} />
                            </AccordionDetails>
                        </Accordion>


                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Homepage;