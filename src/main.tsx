import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'yxgui/styles.css';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Missing root element');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
