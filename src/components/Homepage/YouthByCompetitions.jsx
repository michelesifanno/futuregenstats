import { Accordion, AccordionSummary, AccordionDetails, Typography, useMediaQuery, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

export default function YouthByCompetition() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const competitions = [
        {
            name: 'Serie A',
            logo: 'https://tmssl.akamaized.net/images/logo/normal/it1.png?lm=1656073460',
            id:'IT1',
        },
        {
            name: 'Premier League',
            logo: 'https://tmssl.akamaized.net/images/logo/normal/gb1.png?lm=1521104656',
            id:'GB1',
        },
        {
            name: 'Bundesliga',
            logo: 'https://tmssl.akamaized.net/images/logo/normal/l1.png?lm=1666789901',
            id:'L1',
        },
        {
            name: 'La Liga',
            logo: 'https://tmssl.akamaized.net/images/logo/normal/es1.png?lm=1521104657',
            id:'ES1',
        },
        {
            name: 'Ligue 1',
            logo: 'https://tmssl.akamaized.net/images/logo/normal/fr1.png?lm=1656073465',
            id: 'FR1',
        },
        {
            name: 'Serie B',
            logo: 'https://tmssl.akamaized.net/images/logo/normal/it2.png?lm=1720690779',
            id: 'IT2',
        },
        {
            name: 'Serie C - Girone A',
            logo: 'https://tmssl.akamaized.net/images/logo/normal/it3a.png?lm=1720690779',
            id: 'IT3A',
        },
        {
            name: 'Serie C - Girone B',
            logo: 'https://tmssl.akamaized.net/images/logo/normal/it3b.png?lm=1720690779',
            id: 'IT3B',
        },
        {
            name: 'Serie C - Girone C',
            logo: 'https://tmssl.akamaized.net/images/logo/normal/it3c.png?lm=1720690779',
            id: 'IT3C',
        },
        {
            name: 'Primavera',
            logo: 'https://tmssl.akamaized.net/images/logo/normal/ij1.png?lm=1720690779',
            id: 'IJ1',
        },
    ];

    return (
        <Accordion defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="youth-by-competitions"
                id="youth-by-competitions"
            >
                <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '14px' : '16px' }}>
                Young Players by League 🏆
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '0px' }}>
                <Grid container spacing={2}>
                    {competitions.map((competition, index) => (
                        <Grid 
                            item 
                            xs={12} 
                            key={index} 
                            sx={{ 
                                padding: '10px 20px!important', 
                                borderBottom: index !== competitions.length - 1 ? '1px solid #eee' : 'none',
                                '&:hover': {
                                    backgroundColor: '#f5f5f5',
                                    cursor: 'pointer',
                                },
                            }}                        >
                            <Link to={`/league/${competition.id}`} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                                <img
                                    src={competition.logo}
                                    alt={competition.name}
                                    style={{ width: '25px', marginRight: '20px' }}
                                />
                                <Typography sx={{ fontWeight: 500, fontSize: '12px', color:'#333',
                                '&:hover': {
                                    color: '#2047e4', 
                                },
 }}>
                                    {competition.name}
                                </Typography>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
}