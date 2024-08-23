import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, InputBase, Grid, Drawer, IconButton, Typography, useMediaQuery, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItems from './Menu/MenuItems'


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#fff',
    width: '100%',
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
    fontSize: '20px!important',
    color: theme.palette.third.main,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'third.main',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: '14px',
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
    },
}));

export default function AppNavbar() {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const drawerWidth = (isMobile || isTablet ) ? '70%' : '400px';
    const [searchDrawerOpen, setSearchDrawerOpen] = useState(false);
    const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);


    const toggleSearchDrawer = () => {
        setSearchDrawerOpen(!searchDrawerOpen);
    };

    const toggleMenuDrawer = () => {
        setMenuDrawerOpen(!menuDrawerOpen);
    };

    const handleDrawerClose = () => {
        setSearchDrawerOpen(false);
        setMenuDrawerOpen(false);
    };


    return (
        <Box sx={{ flexGrow: 1, position: 'fixed', width: '100%', zIndex: 4, height: 'auto' }}>
            <AppBar sx={{ alignItems: 'center', height: isMobile ? '70px' : '80px' }}>
                <Grid container alignItems="center" sx={{ height: '100%' }}>
                    {/* Logo */}
                    <Grid
                        item
                        xs={6}
                        sm={4}
                        md={2}
                        sx={{
                            display: 'flex',
                            justifyContent: 'start',
                            alignItems: 'center',
                            padding: isMobile ? '10px!important' : '0px 20px!important',
                        }}
                    >
                        <Link to="/" style={{ textDecoration: 'none', marginBottom:'-5px!important' }}>
                            <img
                                src="/logo.png"
                                alt="Future Gen Stats Logo"
                                style={{ maxWidth: isMobile ? '160px' : '200px' }}
                                href="/"
                            />
                        </Link>
                    </Grid>

                    {/* Search bar (visible on tablets and desktops) */}
                    {!isMobile && (
                        <Grid
                            item
                            sm={6}
                            md={8}
                            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: isTablet ? '0px 20px!important' : '0px 120px!important' }}
                        >
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

                    {/* Mobile search icon */}
                    {isMobile && (
                        <Grid
                            item
                            xs={2}
                            sx={{
                                display: 'flex',
                                justifyContent: 'end',
                                alignItems: 'center',
                                padding: '0px!important',
                                backgroundColor: (isMobile || isTablet) ? 'none' : '#202cb7',
                                height: '100%',
                            }}
                        >
                            <IconButton
                                color="inherit"
                                aria-label="search"
                                onClick={toggleSearchDrawer}
                                sx={{ padding: '0px', margin: '0px!important' }}
                            >
                                <SearchIcon sx={{ fontSize: '26px' }} />
                            </IconButton>
                        </Grid>
                    )}

                    {/* IHG Icon and text */}
                    <Grid
                        item
                        xs={2}
                        sm={1}
                        md={1}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '0px!important',
                            backgroundColor: (isMobile || isTablet) ? 'none' : '#00e8da',
                            height: '100%',
                        }}
                    >
                        <IconButton
                            color="inherit"
                            aria-label="ihg"
                            onClick={toggleSearchDrawer}
                            sx={{
                                padding: '0px',
                                margin: '0px!important',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <DiamondOutlinedIcon
                                sx={{
                                    color: (isMobile || isTablet) ? 'secondary.main' : 'third.main',
                                    fontSize: (isMobile || isTablet) ? '26px' : '30px',
                                }}
                            />
                        </IconButton>
                    </Grid>

                    {/* Menu Icon */}
                    <Grid
                        item
                        xs={2}
                        sm={1}
                        md={1}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '0px!important',
                            height:'100%',
                            borderLeft:'1px solid rgba(255,255,255,0.2)'
                        }}
                    >
                        <IconButton
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleMenuDrawer}
                            sx={{
                                padding: '0px',
                                margin: '0px!important',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <MenuIcon sx={{ fontSize: '30px' }} />
                            <Typography
                                sx={{
                                    fontSize: '12px',
                                    color: 'secondary.main',
                                    fontWeight: '500',
                                    display: (isMobile || isTablet) ? 'none' : 'block',
                                    marginTop: '1px',
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
                    open={searchDrawerOpen}
                    onClose={handleDrawerClose}
                    sx={{
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            padding: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            boxSizing: 'border-box',
                            backgroundColor: '#fff',
                            zIndex: 5,
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

                <Drawer
                anchor='right'
                open={menuDrawerOpen}
                onClose={handleDrawerClose}
                sx={{ width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' } }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        padding: '10px',
                        backgroundColor:'#171d8d',
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <IconButton onClick={handleDrawerClose} sx={{marginLeft:'auto', color:'#00e8da'}}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Divider sx={{ marginY: '10px' }} />
                    <MenuItems />
                </Box>
            </Drawer>


            </AppBar>
        </Box>
    );
}
