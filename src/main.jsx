import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ConfigurationProvider } from './context/Configuration';
import { HashRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>  
      <ConfigurationProvider>
        <App />
      </ConfigurationProvider>
    </HashRouter>
  </React.StrictMode>
);
