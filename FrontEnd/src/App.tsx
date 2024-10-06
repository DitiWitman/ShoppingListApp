// src/App.tsx

import React from 'react';
import { Container } from '@mui/material';
import CategoryList from './components/CategoryList';

const App: React.FC = () => {
  return (
    <Container>
      <CategoryList />
    </Container>
  );
};

export default App;
