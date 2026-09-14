import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { MomentumProvider } from './context/MomentumContext';
import { RevenueCatProvider } from './integrations/RevenueCatProvider';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RevenueCatProvider>
      <MomentumProvider>
        <App />
      </MomentumProvider>
    </RevenueCatProvider>
  </React.StrictMode>
);
