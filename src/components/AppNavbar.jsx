import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Box, InputBase, Grid, Typography, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import useCompetitions from '../utils/useCompetitions';


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
    color:theme.palette.third.main
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'third.main',
    padding: '5px',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
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
    const { competitions, error, loading } = useCompetitions(); // Usa l'Hook qui

    console.log("Competitions:", competitions); // Aggiungi questo log per verificare i dati

    return (
        <Box sx={{ flexGrow: 1, position: 'fixed' }}>
            <AppBar sx={{ alignItems: 'center' }}>
                <Grid container spacing={2} alignItems="center" sx={{ padding: '20px' }}>
                    <Grid item xs sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                        <img src="/logo.png" alt="Future Gen Stats Logo" width="55%" />
                    </Grid>
                    <Grid item xs={6}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Grid>
                    <Grid item xs sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                        <Button
                            endIcon={<EmojiEventsIcon />}
                            sx={{
                                borderColor: '#fff',
                                color: '#fff',
                                '&:hover': {
                                    borderColor: '#fff',
                                    backgroundColor: '#2130a2',
                                },
                                fontSize:'16px'
                            }}
                        >
                            Best Under23
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={0} alignItems="center" sx={{ backgroundColor: 'third.main' }}>
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
                                    backgroundColor: '#2130a2', // Black background on hover
                                    color: '#fff', // White text color on hover
                                },
                                transition: 'background-color 0.3s ease', // Smooth transition for hover effect
                            }}
                        >
                            <img src={logoMap[competition]} alt={competition} width="30px" height="30px" style={{ marginRight: '5px', padding: '5px' }} />
                            <Typography sx={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: '500' }}>{competition}</Typography>
                        </Grid>
                    ))}
                </Grid>
            </AppBar>
        </Box>
    );
}
