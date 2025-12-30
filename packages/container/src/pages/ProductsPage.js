import React, { Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

const RemoteProductsPage = lazy(() => import('products/ProductList'));

const ProductsPage = () => {
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <Suspense
      fallback={
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 'calc(100vh - 200px)',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          }}
        >
          <CircularProgress size={60} />
        </Box>
      }
    >
      <RemoteProductsPage onProductClick={handleProductClick} />
    </Suspense>
  );
};

export default ProductsPage;
