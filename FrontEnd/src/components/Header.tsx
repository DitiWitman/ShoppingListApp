// src/components/Header.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header: React.FC<{ itemCount: number }> = ({ itemCount }) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    רשימת קניות
                </Typography>
                <IconButton color="inherit">
                    <Badge badgeContent={itemCount} color="secondary">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
