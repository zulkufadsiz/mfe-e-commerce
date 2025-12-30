import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './layout/ProductDetail';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const ProductListWrapper = () => {
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return <ProductList onProductClick={handleProductClick} />;
};

const ProductDetailWrapper = () => {
  const navigate = useNavigate();
  const productId = window.location.pathname.split('/').pop();

  const handleBack = () => {
    navigate('/products');
  };

  return <ProductDetail productId={productId} onBack={handleBack} />;
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductListWrapper />} />
          <Route path="/products" element={<ProductListWrapper />} />
          <Route path="/products/:id" element={<ProductDetailWrapper />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

const container = document.getElementById('dev-product');
const root = createRoot(container);

root.render(<App />);