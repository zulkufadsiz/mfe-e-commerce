import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import ProductList from '../components/ProductList';

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

const ProductsPage = ({ onProductClick }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProductList onProductClick={onProductClick} />
    </ThemeProvider>
  );
};

export default ProductsPage;