import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LiveRateProvider } from './context/LiveRateContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LiveRateProvider>
      <App />
    </LiveRateProvider>
  </React.StrictMode>
);
