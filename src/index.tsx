import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { StoryProvider } from './context/StoryContext.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <StoryProvider>
      <App /> 
    </StoryProvider>
  </React.StrictMode>
);


