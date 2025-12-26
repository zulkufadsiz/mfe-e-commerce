import React from 'react';
import { createRoot } from 'react-dom/client';
import CartPage from './layouts/CartPage';

const container = document.getElementById('dev-cart');
const root = createRoot(container);

root.render(<CartPage />);