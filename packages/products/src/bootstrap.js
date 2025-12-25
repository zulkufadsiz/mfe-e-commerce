import App from './layout/App';
import { createRoot } from 'react-dom/client';
import React from 'react';

const container = document.getElementById('dev-product');
const root = createRoot(container);

root.render(<App />);