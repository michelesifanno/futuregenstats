import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, InputBase, Grid, Drawer, IconButton, useMediaQuery, Button, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = '100%';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#fff',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: '100%', // Assicurati che la larghezza sia impostata al 100%
    },
    display: 'flex',
    alignItems: 'center',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize:'20px!important',
    color: theme.palette.third.main,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'third.main',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: '14px',
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width')
    },
}));

export default function AppNavbar() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    return (
        <Box sx={{ flexGrow: 1, position: 'fixed', width: '100%', zIndex: '1', height: 'auto' }}>
            <AppBar sx={{ alignItems: 'center', height: isMobile ? '70px' : '80px' }}>
                <Grid container spacing={2} alignItems="center" sx={{ height: '100%' }}>
                    <Grid item xs={isMobile ? 5 : 3} sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', padding: isMobile ? '0px 10px!important' : '0px 20px!important' }}>
                        <img src="/logo.png" alt="Future Gen Stats Logo" style={{ maxWidth: isMobile ? '180px' : '220px' }} />
                    </Grid>
                    {!isMobile && (
                        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
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
                    <Grid item xs={1} />
                    {isMobile && (
                        <Grid item xs={isMobile ? 2 : 1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: isMobile ? '0px 10px!important' : '0px 20px!important', backgroundColor: '#202cb7', height: '100%' }}>
                            <IconButton
                                color="inherit"
                                aria-label="search"
                                onClick={toggleDrawer}
                                sx={{ ml: 2, padding: '0px', margin: '0px!important' }}
                            >
                                <SearchIcon sx={{ fontSize: isMobile ? '26px' : '34px' }} />
                            </IconButton>
                        </Grid>
                    )}
                    <Grid
                        item
                        xs={isMobile ? 2 : 1}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: isMobile ? '0px 10px!important' : '0px 20px!important',
                            backgroundColor: '#00e8da',
                            height: '100%',
                        }}
                    >
                        <IconButton
                            color="inherit"
                            aria-label="search"
                            onClick={toggleDrawer}
                            sx={{ ml: 2, padding: '0px', margin: '0px!important', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        >
                            <DiamondOutlinedIcon sx={{ color:'third.main', fontSize: isMobile ? '26px' : '30px' }} />
                            <Typography
                                sx={{
                                    fontSize: '14px',
                                    color: 'third.main',
                                    fontWeight:'500',
                                    display: isMobile ? 'none' : 'block',
                                }}
                            >
                                IHG
                            </Typography>
                        </IconButton>
                    </Grid>
                    <Grid
                        item
                        xs={isMobile ? 2 : 1}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: isMobile ? '0px 10px!important' : '0px 20px!important',
                            backgroundColor: '#171d8d',
                            height: '100%',
                        }}
                    >
                        <IconButton
                            color="inherit"
                            aria-label="search"
                            onClick={toggleDrawer}
                            sx={{ ml: 2, padding: '0px', margin: '0px!important', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        >
                            <MenuIcon sx={{ fontSize: isMobile ? '26px' : '30px' }} />
                            {/* Visualizza il testo solo su desktop */}
                            <Typography
                                sx={{
                                    fontSize: '14px',
                                    color: 'secondary.main',
                                    fontWeight:'500',
                                    display: isMobile ? 'none' : 'block',
                                }}
                            >
                                MENU
                            </Typography>
                        </IconButton>
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
                            zIndex: '2',
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
            </AppBar>
        </Box>
    );
}
