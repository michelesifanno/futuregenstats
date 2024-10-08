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
            logo: 'https://res.cloudinary.com/dfe8fzdna/image/upload/v1725534050/competitions/IT1.png',
            id: 'IT1',
        },
        {
            name: 'Premier League',
            logo: 'https://res.cloudinary.com/dfe8fzdna/image/upload/v1725534050/competitions/GB1.png',
            id: 'GB1',
        },
        {
            name: 'Bundesliga',
            logo: 'https://res.cloudinary.com/dfe8fzdna/image/upload/v1725534050/competitions/L1.png',
            id: 'L1',
        },
        {
            name: 'La Liga',
            logo: 'https://res.cloudinary.com/dfe8fzdna/image/upload/v1725534050/competitions/ES1.png',
            id: 'ES1',
        },
        {
            name: 'Ligue 1',
            logo: 'https://res.cloudinary.com/dfe8fzdna/image/upload/v1725534050/competitions/FR1.png',
            id: 'FR1',
        },
        {
            name: 'Serie B',
            logo: 'https://res.cloudinary.com/dfe8fzdna/image/upload/v1725534050/competitions/IT2.png',
            id: 'IT2',
        },
        {
            name: 'Serie C',
            logo: 'https://res.cloudinary.com/dfe8fzdna/image/upload/v1725534050/competitions/IT3A.png',
            id: 'IT3A',
        },
        {
            name: 'Primavera',
            logo: 'https://res.cloudinary.com/dfe8fzdna/image/upload/v1725534050/competitions/IJ1.png',
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
                <Typography sx={{ fontWeight: 600, fontSize: isMobile ? '18px' : '20px' }}>
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
                                padding: '12px 20px!important',
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
                                    style={{ width: '25px', height: '32.5px', marginRight: '20px' }}
                                />
                                <Typography sx={{
                                    fontWeight: 500, fontSize: isMobile ? '14px' : '16px', color: '#333',
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