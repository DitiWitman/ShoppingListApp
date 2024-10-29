import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client'; 
import { Provider } from 'react-redux';
import store from '../src/configuration/store';
import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!); // root

root.render(
  <Provider store={store}> 
    <App />
  </Provider>
);
