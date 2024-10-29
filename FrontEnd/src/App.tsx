import React from 'react';
import { Container } from 'react-bootstrap';
import ShoppingDashboard from '../src/components/ShoppingDashboard';
import './App.css';

const App: React.FC = () => {
  return (
    <Container fluid className="p-3">
      {/* <Header itemCount={5} /> */}
      <ShoppingDashboard />
    </Container>
  );
};

export default App;
