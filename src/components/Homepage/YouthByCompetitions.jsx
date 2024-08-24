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
            link: 'competition/serie-a',
            id:'IT1',
        },
        {
            name: 'Premier League',
            logo: 'https://tmssl.akamaized.net/images/logo/normal/gb1.png?lm=1521104656',
            link: 'competition/premier-league',
            id:'GB1',
        },
        {
            name: 'Bundesliga',
            logo: 'https://tmssl.akamaized.net/images/logo/normal/l1.png?lm=1666789901',
            link: 'competition/bundesliga',
            id:'L1',
        },
        {
            name: 'La Liga',
            logo: 'https://tmssl.akamaized.net/images/logo/normal/es1.png?lm=1521104657',
            link: 'competition/la-liga',
            id:'ES1',
        },
        {
            name: 'Ligue 1',
            logo: 'https://tmssl.akamaized.net/images/logo/normal/fr1.png?lm=1656073465',
            link: 'competition/ligue-1',
            id: 'FR1',
        },
        {
            name: 'Europa League',
            logo: 'https://tmssl.akamaized.net/images/logo/normal/el.png?lm=1721915137',
            link: 'competition/europa-league',
            id: 'EL',
        },
        {
            name: 'Champions League',
            logo: 'https://tmssl.akamaized.net/images/logo/normal/cl.png?lm=1626810555',
            link: 'competition/champions-league',
            id: 'CL',
        },
        {
            name: 'Serie B',
            logo: 'https://tmssl.akamaized.net/images/logo/normal/it2.png?lm=1720690779',
            link: 'competition/serie-b',
            id: 'IT2',
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
                Young Players by Competitions 🏆
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
                            <Link to={`/competition/${competition.id}`} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
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
