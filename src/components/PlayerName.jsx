import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

export default function PlayerName({ image, name, position, club_image, value, value_currency }) {
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
                    }}
                >
                    {/* Background Image with Blur */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: `url(${club_image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'blur(10px)',
                            zIndex: 0,
                            opacity: 0.7,
                        }}
                    />
                    {/* Dark Overlay */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            zIndex: 1,
                        }}
                    />
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