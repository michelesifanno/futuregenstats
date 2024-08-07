import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, InputBase, Grid, Typography, Button, Drawer, IconButton, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CloseIcon from '@mui/icons-material/Close';
import useCompetitions from '../utils/useCompetitions';

const drawerWidth = '100%';

const logoMap = {
    'Premier League': '/premier-league.png',
    'Serie A': '/serie-a.png',
    'Bundesliga': '/bundesliga.png',
    'La Liga': '/la-liga.png',
    'Ligue 1': '/ligue-1.png',
    'Brasileirão': '/brasilerao.png',
    'Primeira Liga': '/primeira-liga.png',
};

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#fff',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.third.main,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'third.main',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function AppNavbar() {
    const theme = useTheme();
    const { competitions, error, loading } = useCompetitions();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    return (
        <Box sx={{ flexGrow: 1, position: 'fixed', width: '100%' }}>
            <AppBar sx={{ alignItems: 'center' }}>
                <Grid container spacing={2} alignItems="center" sx={{ padding: '20px' }}>
                    <Grid item xs sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                        <img src="/logo.png" alt="Future Gen Stats Logo" style={{ maxWidth: '200px' }} />
                    </Grid>
                    {!isMobile && (
                        <Grid item xs={4}>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search Player"
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
                        </Grid>
                    )}
                    <Grid item xs sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                    <Typography variant="body1">
                        <strong>Updated on: </strong>
                        04/08/2024
                    </Typography> 
                    </Grid>
                </Grid>
                {/* Drawer per la barra di ricerca mobile */}
                <Drawer
                    anchor="top"
                    open={drawerOpen}
                    onClose={handleDrawerClose}
                    sx={{
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            padding: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            boxSizing: 'border-box',
                            backgroundColor: '#fff',
                        },
                    }}
                >
                    <IconButton color="inherit" onClick={handleDrawerClose}>
                        <CloseIcon />
                    </IconButton>
                    <Search sx={{ width: '100%' }}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search Player"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                </Drawer>

                {/* Sezione loghi competizioni */}
                <Grid container spacing={0} alignItems="center" sx={{ backgroundColor: theme.palette.third.main }}>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error}</p>}
                    {!loading && !error && competitions.length === 0 && <p>No competitions found</p>}
                    {competitions.map((competition, index) => (
                        <Grid
                            item
                            xs
                            key={index}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRight: index < competitions.length - 1 ? '1px solid #f8f8f81c' : 'none',
                                '&:hover': {
                                    backgroundColor: '#2130a2',
                                    color: '#fff',
                                },
                                transition: 'background-color 0.3s ease',
                            }}
                        >
                            <img src={logoMap[competition]} alt={competition} width="40px" height="40px" style={{ marginRight: isMobile ? '0px' : '5px', padding: '5px' }} />
                            <Typography
                                sx={{
                                    fontSize: '10px',
                                    textTransform: 'uppercase',
                                    fontWeight: '500',
                                    display: isMobile ? 'none' : 'block',
                                }}
                            >
                                {competition}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </AppBar>
        </Box>
    );
}
