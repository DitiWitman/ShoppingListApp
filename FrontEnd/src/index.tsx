import React from 'react';
import { createRoot } from 'react-dom/client'; // ייבוא של createRoot
import { Provider } from 'react-redux';
import store from '../src/configuration/store';
import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!); // יצירת root

root.render(
  <Provider store={store}> {/* עטיפת האפליקציה ב-Provider */}
    <App />
  </Provider>
);
