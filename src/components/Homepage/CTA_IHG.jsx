import { Box, Grid, Typography, useMediaQuery, IconButton } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import { Link } from 'react-router-dom';

// Stili aggiuntivi per l'immagine
const StyledImage = styled('img')(({ theme }) => ({
    width: '100%', // Imposta la larghezza al 100% del contenitore
    height: 'auto', // Mantiene le proporzioni dell'immagine
    display: 'block',
    margin: '0', // Centro l'immagine orizzontalmente
}));

export default function CTA_IHG() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Grid container sx={{ backgroundColor: 'primary.main', borderRadius: '5px' }}>
            <Grid item xs={12}>
            <Grid item xs={12} container justifyContent="flex-start" sx={{ padding: '30px 30px 0px 30px!important' }}>
                <Typography variant='h1' sx={{ fontSize: '20px', lineHeight:'26px', fontWeight: 500, color: '#fff', marginBottom: '20px' }}>
                    Unlock the<br/>
                    Future of Italian Football 💎
                </Typography>
                <Typography variant='body2' sx={{ fontSize: '16px', fontWeight: 400, color: '#fff' }}>
                    Dive into the 'Italian Hidden Gems' section to discover and analyze the brightest young talents from Serie B, Serie C, and Primavera.
                    <br /> <br />
                    <b>Discover who will shine next! 🌟 </b>
                </Typography>
                </Grid>
                <Grid item xs={12} container justifyContent="flex-end" sx={{ padding: '0px 30px 30px 0px!important' }}>
                    <Link to="/italian-hidden-gems">
                        <IconButton
                            color="inherit"
                            aria-label="search"
                            sx={{ padding: '0px', margin: '0px!important', color: '#fff' }}
                        >
                            <ArrowOutwardIcon sx={{ fontSize: '30px' }} />
                        </IconButton>
                    </Link>
                </Grid>
                <Grid item xs={12} container justifyContent="center" sx={{ padding: '0px!important' }}>
                    <StyledImage src='/ihg-cta.png' alt='Italian Hidden Gems CTA' style={{borderRadius:'5px'}} />
                </Grid>
            </Grid>
        </Grid>
    );
}
