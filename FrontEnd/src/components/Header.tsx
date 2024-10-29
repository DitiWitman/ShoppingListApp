import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../configuration/store';
import { AppBar, Toolbar, Typography, Badge, IconButton, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const Header: React.FC = ()=> {
    const totalItems = useSelector((state: RootState) => state.product.totalItems);

    return (
        <AppBar position="static">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <Typography variant="h6">
                        Shopping List - רשימת קניות
                    </Typography>
                </Box>
                <IconButton color="inherit">
                    <Badge badgeContent={totalItems} color="secondary">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
