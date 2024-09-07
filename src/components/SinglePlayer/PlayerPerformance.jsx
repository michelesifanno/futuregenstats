import React from 'react';
import { useMediaQuery, Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, CircularProgress } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useCurrentStats } from '../../utils/useCurrentStats';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NationFlag from '../General/NationFlag';
import { flagCodes } from '../../utils/flagCodes';


export default function PlayerPerformance({ playerId }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    const { performance, loading, error } = useCurrentStats({ id: playerId });

    return (
        <>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">Error: {error.message || 'An error occurred'}</Typography>
            ) : (
                <Accordion defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="general-stats-content" id="general-stats-header">
                        <Typography sx={{ fontWeight: 600, fontSize: '18px' }}>
                            Current Season Performance
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: '0px!important' }}>
                        {performance.length === 0 ? (
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    fontSize: '20px',
                                    lineHeight: '30px',
                                    textAlign: 'left',
                                }}
                            >
                                No performance data available.</Typography>
                        ) : (
                            <>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 500,
                                                        fontSize: '14px',
                                                        lineHeight: '14px',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    👕
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 500,
                                                        fontSize: '14px',
                                                        lineHeight: '14px',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    ⚽️
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 500,
                                                        fontSize: '14px',
                                                        lineHeight: '14px',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    👟
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 500,
                                                        fontSize: '14px',
                                                        lineHeight: '14px',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    ⏱️
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {performance.competitionPerformanceSummery.map((competition, index) =>
                                        competition.clubs.map((club, idx) => (
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <img
                                                                src={club.image}
                                                                style={{
                                                                    width: '20px',
                                                                    height: '20px',
                                                                    objectFit: 'contain',
                                                                    marginRight: '10px'
                                                                }}
                                                            />
                                                            <Typography
                                                                sx={{
                                                                    fontWeight: 600,
                                                                    fontSize: '12px',
                                                                    lineHeight: '14px',
                                                                    textAlign: 'left',
                                                                }}
                                                            >
                                                                {club.name}<br />
                                                                <span style={{
                                                                    fontWeight: 400,
                                                                    fontSize: '10px',
                                                                    lineHeight: '10px',
                                                                    textAlign: 'left',
                                                                    color: '#8a8a8a',
                                                                }}>
                                                                    {competition.competition.name}
                                                                </span>
                                                            </Typography>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography
                                                            sx={{
                                                                fontWeight: 500,
                                                                fontSize: '12px',
                                                                lineHeight: '12px',
                                                                textAlign: 'center',
                                                            }}
                                                        >
                                                            {(competition.performance.matches) || '//'}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography
                                                            sx={{
                                                                fontWeight: 500,
                                                                fontSize: '12px',
                                                                lineHeight: '12px',
                                                                textAlign: 'center',
                                                            }}
                                                        >
                                                            {(competition.performance.goals) || '//'}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography
                                                            sx={{
                                                                fontWeight: 500,
                                                                fontSize: '12px',
                                                                lineHeight: '12px',
                                                                textAlign: 'center',
                                                            }}
                                                        >
                                                            {(competition.performance.assists) || '//'}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography
                                                            sx={{
                                                                fontWeight: 500,
                                                                fontSize: '12px',
                                                                lineHeight: '12px',
                                                                textAlign: 'center',
                                                            }}
                                                        >
                                                            {competition.performance.minutesPlayed ? `${competition.performance.minutesPlayed}'` : '//'}                                                    </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        ))
                                    )}
                                </Table>
                            </>
                        )}
                    </AccordionDetails>
                </Accordion>
            )}
        </>
    );
}