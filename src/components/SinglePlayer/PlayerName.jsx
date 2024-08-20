import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

export default function PlayerName({ image, name, color, value, value_currency }) {
    console.log(color);
    
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sx={{ padding: '20px' }}>
                <Box
                    sx={{
                        position: 'relative',
                        padding: '20px',
                        backgroundColor: '#fff',
                        borderRadius: '5px',
                        overflow: 'hidden',
                        backgroundColor: color,
                    }}
                >
                    {/* Content */}
                    <Grid container spacing={2} sx={{ position: 'relative', zIndex: 2, alignItems: 'center' }}>
                        <Grid item xs={4} md={2}>
                            <img
                                src={image}
                                alt={name}
                                style={{
                                    width: '100px',
                                    borderRadius: '5px',
                                }}
                            />
                        </Grid>
                        <Grid item xs={8} md={10}>
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    fontSize: '30px',
                                    lineHeight:'36px',
                                    textAlign: 'left',
                                    color: '#fff',
                                }}
                            >
                                {name}
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: 500,
                                    fontSize: '20px',
                                    lineHeight:'30px',
                                    marginTop:'10px',
                                    textAlign: 'left',
                                    color: '#fff',
                                }}
                            >
                                {value_currency} {value}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
}