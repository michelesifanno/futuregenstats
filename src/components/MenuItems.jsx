// src/components/MenuAccordion.js

import React from 'react';
import { Link } from 'react-router-dom';
import { Accordion, AccordionSummary, AccordionDetails, Typography, List, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SportsSoccer, People, School, Star, AccessAlarm, TrendingUp } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled components
const MenuLink = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
}));

const MenuItemText = styled(ListItemText)(({ theme }) => ({
    '& .MuiTypography-root': {
        fontSize: '16px',
        fontWeight: 600,
        color: '#fff',
        textTransform: 'uppercase',
        margin: 0,
        letterSpacing: '-0.5px',
        transition: 'color 0.3s',
    },
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
    '&:hover': {
        backgroundColor: 'transparent',
    },
    '&:hover .MuiTypography-root': {
        color: '#00e8da',
    },
    '&:hover .MuiListItemIcon-root': {
        color: '#00e8da',
    },
}));

const accordionStyles = {
    boxShadow: 'none',
    border: '1px solid rgba(0, 0, 0, 0.125)',
    '&:before': {
        display: 'none',
    },
};

export default function MenuAccordion() {
    return (
        <Accordion defaultExpanded sx={accordionStyles}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="menu-content"
                id="menu-header"
            >
                <Typography variant="h6">Giovani per Età</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <List>
                    <MenuLink to="/best-under-18">
                        <StyledListItemButton>
                            <ListItemIcon>
                                <SportsSoccer sx={{ color: '#fff' }} />
                            </ListItemIcon>
                            <MenuItemText primary="Under 18" />
                        </StyledListItemButton>
                    </MenuLink>
                    <Divider />
                    <MenuLink to="/best-under-19">
                        <StyledListItemButton>
                            <ListItemIcon>
                                <People sx={{ color: '#fff' }} />
                            </ListItemIcon>
                            <MenuItemText primary="Under 19" />
                        </StyledListItemButton>
                    </MenuLink>
                    <Divider />
                    <MenuLink to="/best-under-20">
                        <StyledListItemButton>
                            <ListItemIcon>
                                <School sx={{ color: '#fff' }} />
                            </ListItemIcon>
                            <MenuItemText primary="Under 20" />
                        </StyledListItemButton>
                    </MenuLink>
                    <Divider />
                    <MenuLink to="/best-under-21">
                        <StyledListItemButton>
                            <ListItemIcon>
                                <Star sx={{ color: '#fff' }} />
                            </ListItemIcon>
                            <MenuItemText primary="Under 21" />
                        </StyledListItemButton>
                    </MenuLink>
                    <Divider />
                    <MenuLink to="/best-under-22">
                        <StyledListItemButton>
                            <ListItemIcon>
                                <AccessAlarm sx={{ color: '#fff' }} />
                            </ListItemIcon>
                            <MenuItemText primary="Under 22" />
                        </StyledListItemButton>
                    </MenuLink>
                    <Divider />
                    <MenuLink to="/best-under-23">
                        <StyledListItemButton>
                            <ListItemIcon>
                                <TrendingUp sx={{ color: '#fff' }} />
                            </ListItemIcon>
                            <MenuItemText primary="Under 23" />
                        </StyledListItemButton>
                    </MenuLink>
                </List>
            </AccordionDetails>
        </Accordion>
    );
}
