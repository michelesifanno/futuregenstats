import React from 'react';
import { Box, Typography, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';


export default function PlayerInfo({ club_name, club_image, dateofbirth, age, height, nationalities, foot, shirtnumber, positions }) {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


    return (
        <Box
            sx={{
                backgroundColor: '#fff',
                borderRadius: '5px',
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ borderBottom: '1px solid #eee', padding: '20px!important', display: 'flex', alignItems: 'center' }}>
                    <img
                        src={club_image}
                        alt={club_name}
                        style={{
                            width: '50px',
                            height: 'auto', // Mantiene le proporzioni dell'immagine
                            marginRight: '20px' // Spazio tra l'immagine e il testo
                        }}
                    />
                    <Typography
                        sx={{
                            fontWeight: 500,
                            fontSize: '18px',
                            textAlign: 'left',
                        }}
                    >
                        {club_name}
                    </Typography>
                </Grid>

                <Grid item xs={6} md={4} sx={{ padding: '20px!important', borderRight: '1px solid #eee', borderBottom: '1px solid #eee' }}>
                    <Typography
                        sx={{
                            fontWeight: 500,
                            fontSize: '12px',
                            textAlign: 'left',
                            color: '#aaa',
                            textTransform: 'uppercase',
                        }}
                    >
                        Nazionalità
                    </Typography>
                    <Typography
                        sx={{
                            fontWeight: 400,
                            fontSize: '16px',
                            textAlign: 'left',
                        }}
                    >
                        {nationalities}
                    </Typography>

                </Grid>
                <Grid item xs={6} md={4} sx={{ padding: '20px!important', borderRight: isMobile ? 'none' : '1px solid #eee', borderBottom: '1px solid #eee' }}>
                    <Typography
                        sx={{
                            fontWeight: 500,
                            fontSize: '12px',
                            textAlign: 'left',
                            color: '#aaa',
                            textTransform: 'uppercase',
                        }}
                    >
                        {dateofbirth}
                    </Typography>
                    <Typography
                        sx={{
                            fontWeight: 400,
                            fontSize: '16px',
                            textAlign: 'left',
                        }}
                    >
                        {age} anni
                    </Typography>

                </Grid>
                <Grid item xs={6} md={4} sx={{ padding: '20px!important', borderBottom: '1px solid #eee', borderRight: '1px solid #eee' }}>
                    <Typography
                        sx={{
                            fontWeight: 500,
                            fontSize: '12px',
                            textAlign: 'left',
                            color: '#aaa',
                            textTransform: 'uppercase',
                        }}
                    >
                        Altezza
                    </Typography>
                    <Typography
                        sx={{
                            fontWeight: 400,
                            fontSize: '16px',
                            textAlign: 'left',
                        }}
                    >
                        {height} m.
                    </Typography>

                </Grid>
                <Grid item xs={6} md={4} sx={{ padding: '20px!important', borderRight: isMobile ? 'none' : '1px solid #eee', borderBottom: isMobile ? '1px solid #eee' : 'none' }}>
                    <Typography
                        sx={{
                            fontWeight: 500,
                            fontSize: '12px',
                            textAlign: 'left',
                            color: '#aaa',
                            textTransform: 'uppercase',
                        }}
                    >
                        Piede preferito
                    </Typography>
                    <Typography
                        sx={{
                            fontWeight: 400,
                            fontSize: '16px',
                            textAlign: 'left',
                            textTransform: 'capitalize',
                        }}
                    >
                        {foot}
                    </Typography>
                </Grid>

                <Grid item xs={6} md={4} sx={{ padding: '20px!important', borderRight: '1px solid #eee' }}>
                    <Typography
                        sx={{
                            fontWeight: 500,
                            fontSize: '12px',
                            textAlign: 'left',
                            color: '#aaa',
                            textTransform: 'uppercase',
                        }}
                    >
                        Nr. maglia
                    </Typography>
                    <Typography
                        sx={{
                            fontWeight: 400,
                            fontSize: '16px',
                            textAlign: 'left',
                        }}
                    >
                        {shirtnumber}
                    </Typography>
                </Grid>

                <Grid item xs={6} md={4} sx={{ padding: '20px!important' }}>
                    <Typography
                        sx={{
                            fontWeight: 500,
                            fontSize: '12px',
                            textAlign: 'left',
                            color: '#aaa',
                            textTransform: 'uppercase',
                        }}
                    >
                        Ruolo
                    </Typography>
                    <Typography
                        sx={{
                            fontWeight: 400,
                            fontSize: '16px',
                            textAlign: 'left',
                        }}
                    >
                        {positions}
                    </Typography>
                </Grid>


            </Grid>
        </Box>
    );
}