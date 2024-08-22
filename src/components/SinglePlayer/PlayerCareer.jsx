import React, { useState, useEffect } from 'react';
import {
    Typography,
    CircularProgress,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Grid,
    useMediaQuery,
    Tabs,
    Tab,
    Box,
    Paper,
} from '@mui/material';
import { useTheme } from '@emotion/react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Componente PlayerCareer
export default function PlayerCareer({ careerHistory }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (careerHistory && careerHistory.careerItems) {
            console.log('Caricamento dati della carriera:', careerHistory);
            setLoading(false);
        } else {
            console.warn('Nessun dato della carriera disponibile o formato dati non corretto');
            setLoading(true);
        }
    }, [careerHistory]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    

    // Funzione per rendere il contenuto di ogni stagione
    const renderSeasonStats = (seasonEntries) => {
        if (!seasonEntries || !Array.isArray(seasonEntries)) {
            console.warn('seasonEntries non è un array o è undefined');
            return <Typography>Player History not found 😔</Typography>; // Visualizza "Null" se i dati non sono disponibili
        }

        const { senior, youth } = careerHistory.careerItems || {};

        return (
            <>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className='career-history'>Season</TableCell>
                                <TableCell className='career-history'>👕</TableCell>
                                <TableCell className='career-history'>⚽️</TableCell>
                                <TableCell className='career-history'>👟</TableCell>
                                <TableCell className='career-history'>⭐️</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {seasonEntries.map((season, index) => (
                                <TableRow
                                    key={index}
                                    style={{ verticalAlign: 'middle', padding: isMobile ? '0px!important' : '20px!important', fontSize: '14px!important' }}
                                >
                                    <TableCell className='career-history'>
                                        <Grid container spacing={2}>
                                            <Grid item xs={4}>
                                                <img
                                                    src={`https://www.fotmob.com/_next/image?url=https://images.fotmob.com/image_resources/logo/teamlogo/${season.teamId}_small.png&w=96&q=75`}
                                                    alt={season.team}
                                                    style={{ width: '30px' }}
                                                />
                                            </Grid>
                                            <Grid item xs={8}>
                                                {season.team}<br />
                                                <span style={{ color: '#aaa', fontSize: '10px' }}>{season.seasonName}</span>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                    <TableCell className='career-history'>
                                        {season.appearances}
                                    </TableCell>
                                    <TableCell className='career-history'>
                                        {season.goals}
                                    </TableCell>
                                    <TableCell className='career-history'>
                                        {season.assists}
                                    </TableCell>
                                    <TableCell className='career-history'>
                                        <span style={{ border: `1px solid ${season.rating.bgcolor}`, backgroundColor: season.rating.bgcolor, padding: '2px 4px', borderRadius: '5px', color:'#fff' }}>
                                            {season.rating.num}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        )
    };

    if (loading) {
        return <CircularProgress />;
    }

    const { senior, nationalTeam, youth } = careerHistory.careerItems || {};

    return (
        <Accordion defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="career-stats"
                id="career-stats"
            >
                <Typography sx={{ fontWeight: 500, fontSize: isMobile ? '14px' : '16px' }}>
                    Player History
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box>
                    <Tabs value={value} onChange={handleChange} aria-label="career tabs">
                        {senior && <Tab label="Senior Career" sx={{fontSize:'12px!important', padding:'10px', width:'50%!important', textAlign:'center'}}/>}
                        {youth && <Tab label="Youth Career" sx={{fontSize:'12px!important', padding:'10px', width:'50%!important', textAlign:'center'}} />}
                    </Tabs>
                    <Box sx={{padding:'0px!important'}}>
                        {value === 0 && senior && renderSeasonStats(senior.seasonEntries)}
                        {value === 1 && youth && renderSeasonStats(youth.seasonEntries)}
                    </Box>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
}
