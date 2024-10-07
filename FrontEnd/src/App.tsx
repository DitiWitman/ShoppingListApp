import React from 'react';
import { Container, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingDashboard from '../src/components/ShoppingDashboard';
import './App.css';

const App: React.FC = () => {
  return (
    <Container>
      <ShoppingDashboard />
    </Container>
  );
};

export default App;
