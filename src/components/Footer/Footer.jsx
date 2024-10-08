import { useTheme } from '@mui/material/styles';
import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';


export default function Footer() {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));


    return (
        <>
            <Box sx={{ backgroundColor: 'third.main' }}>
                <Grid container alignItems="center">
                    {/* Logo */}
                    <Grid
                        item
                        xs={12}
                        md={1}
                        sx={{
                            display: 'flex',
                            justifyContent: 'start',
                            alignItems: 'center',
                            padding: isMobile ? '20px!important' : '40px!important',
                        }}
                    >
                        <Link to="/" style={{ textDecoration: 'none', marginBottom: '-5px!important' }}>
                            <img
                                src="/favicon.jpg"
                                alt="Future Gen Stats Logo"
                                style={{ width: isMobile ? '40px' : '60px' }}
                                href="/"
                            />
                        </Link>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={11}
                        sx={{
                            display: 'flex',
                            justifyContent: isMobile ? 'center' : 'start',
                            alignItems: 'center',
                            padding: isMobile ? '0px 20px 20px 20px!important' : '40px!important',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: isMobile ? '10px' : '12px',
                                color: '#fff',
                            }}
                        >
                            FutureGenStats is an educational project aimed at exploring the potential of data analytics in football. While the platform gathers and analyzes performance data of young football players, its primary purpose is to serve as a learning tool for developing advanced skills in data aggregation, analysis, and web development. The insights generated are part of a broader educational exercise and are not intended for professional use. Through this project, we aim to deepen our understanding of the football industry while enhancing technical expertise in data-driven solutions.
                        </Typography>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ backgroundColor: '#1b2a99' }}>
                <Grid container alignItems="center">
                    {/* Logo */}
                    <Grid
                        item
                        xs={6}
                        sx={{
                            display: 'flex',
                            justifyContent: 'start',
                            alignItems: 'center',
                            padding: isMobile ? '10px 20px!important' : '20px 40px!important',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: isMobile ? '10px' : '12px',
                                color: '#fff',
                            }}
                        >
                            © 2024 Future Gen Stats – All Rights Reserved.
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            padding: isMobile ? '10px 20px!important' : '20px 40px!important',
                        }}
                    >
                        <Link to="/privacy-policy" style={{ textDecoration: 'none', marginBottom: '-5px!important' }} onClick={() => window.scrollTo(0, 0)}>
                            <Typography
                                sx={{
                                    fontSize: isMobile ? '10px' : '12px',
                                    color: '#fff',
                                }}
                            >
                                Privacy Policy
                            </Typography>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
