// src/components/MenuItems.js

import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItemButton, Divider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components
const MenuLink = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
}));

const MenuItemText = styled(Typography)(({ theme }) => ({
    fontFamily: 'Bai Jamjuree, sans-serif',
    fontSize: '30px',
    fontWeight: 600,
    color: '#fff',
    textTransform: 'uppercase',
    margin: 0,
    letterSpacing: '-0.5px',
    transition: 'color 0.3s', // Smooth color transition
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
    '&:hover': {
        backgroundColor: 'transparent',
    },
    '&:hover .menu-item-text': {
        color: '#00e8da', // Change text color on hover
    },
}));

export default function MenuItems() {
    return (
        <List>
            <MenuLink to="/best-under-18">
                <StyledListItemButton>
                    <MenuItemText className="menu-item-text">Under 18</MenuItemText>
                </StyledListItemButton>
            </MenuLink>
            <MenuLink to="/best-under-19">
                <StyledListItemButton>
                    <MenuItemText className="menu-item-text">Under 19</MenuItemText>
                </StyledListItemButton>
            </MenuLink>
            <MenuLink to="/best-under-20">
                <StyledListItemButton>
                    <MenuItemText className="menu-item-text">Under 20</MenuItemText>
                </StyledListItemButton>
            </MenuLink>
            <MenuLink to="/best-under-21">
                <StyledListItemButton>
                    <MenuItemText className="menu-item-text">Under 21</MenuItemText>
                </StyledListItemButton>
            </MenuLink>
            <MenuLink to="/best-under-22">
                <StyledListItemButton>
                    <MenuItemText className="menu-item-text">Under 22</MenuItemText>
                </StyledListItemButton>
            </MenuLink>
            <MenuLink to="/best-under-23">
                <StyledListItemButton>
                    <MenuItemText className="menu-item-text">Under 23</MenuItemText>
                </StyledListItemButton>
            </MenuLink>
        </List>
    );
}
