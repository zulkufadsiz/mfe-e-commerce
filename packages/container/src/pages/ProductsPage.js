import React, { Suspense, lazy } from 'react';
import { Box, CircularProgress } from '@mui/material';

const RemoteProductsPage = lazy(() => import('products/ProductList'));
console.log('RemoteProductsPage:', RemoteProductsPage);
const ProductsPage = () => {
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
      <RemoteProductsPage />
    </Suspense>
  );
};

export default ProductsPage;
