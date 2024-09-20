import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import { LukupaivakirjaProvider } from './context/LukupaivakirjaContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <LukupaivakirjaProvider>
      <App />
    </LukupaivakirjaProvider>
    </BrowserRouter>
  </React.StrictMode>
);
