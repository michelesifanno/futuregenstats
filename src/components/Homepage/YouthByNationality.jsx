import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, useMediaQuery, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import { useNationalities } from '../../utils/useNationalities';

export default function YouthByNationality() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { nations, loading, error } = useNationalities();

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">Error: {error}</Typography>;

    console.log('Nations:', nations); // Debugging log

    return (
        <Accordion defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="nationalities-list"
                id="nationalities-list"
            >
                <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '14px' : '16px' }}>
                Young Players by Nations 🌍
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '0px' }}>
                <Grid container spacing={2}>
                    {nations.slice(0, 10).map((nation, index) => (
                        <Grid 
                        item 
                        xs={12} 
                        key={index} 
                        sx={{ 
                            padding: '10px 20px!important', 
                            borderBottom: index !== nations.length - 1 ? '1px solid #eee' : 'none',
                            '&:hover': {
                                backgroundColor: '#f5f5f5',
                                cursor: 'pointer',
                            },
                        }}                        >
                        <Link to={`/nation/${nation.image}`} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                            <img
                                src={nation.image}
                                alt={nation.name}
                                style={{ width: '25px', marginRight: '20px' }}
                            />
                            <Typography sx={{ fontWeight: 500, fontSize: '12px', color:'#333',
                            '&:hover': {
                                color: '#2047e4', 
                            },
}}>
                                {nation.name}
                            </Typography>
                        </Link>
                    </Grid>
                ))}
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
}
