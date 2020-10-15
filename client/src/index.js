import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, } from 'react-router-dom';
import SocketProvider from './providers/SocketProvider';

ReactDOM.render(
  <React.StrictMode>
    <SocketProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SocketProvider>
  </React.StrictMode>,
  document.getElementById('root')
);