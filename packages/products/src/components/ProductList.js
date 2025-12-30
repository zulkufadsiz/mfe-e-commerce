import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  CircularProgress,
  Box,
  Alert,
  TextField,
  MenuItem,
  Pagination,
  Chip,
  Stack,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useFetchProducts } from '../hook/fetchProducts';
import ProductItem from './ProductItem';

const CATEGORIES = ['electronics', 'jewelery', 'men\'s clothing', 'women\'s clothing'];
const ITEMS_PER_PAGE = 8;

const ProductList = ({ onProductClick }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { products, loading, error } = useFetchProducts(selectedCategory || null);

  // Filter products based on category
  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product);
    // TODO: Integrate with global cart state/context
  };

  const handleProductClick = (productId) => {
    if (onProductClick) {
      onProductClick(productId);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: { xs: 2, sm: 4, md: 6 },
      }}
    >
      <Container maxWidth="xl" sx={{ height: '100%' }}>
        {/* Header Section */}
        <Box sx={{ mb: 6 }}>
          <Stack spacing={3}>
            <Box>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 800,
                  mb: 1,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                }}
              >
                Explore Our Products
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '0.95rem', md: '1.1rem' },
                  maxWidth: 600,
                }}
              >
                Discover a curated collection of high-quality products
              </Typography>
            </Box>

            {/* Filter Bar */}
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap',
                alignItems: 'center',
                p: 2.5,
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: 2,
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FilterListIcon sx={{ color: 'primary.main' }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Filter:
                </Typography>
              </Box>
              <TextField
                select
                label="Select Category"
                value={selectedCategory}
                onChange={handleCategoryChange}
                sx={{
                  minWidth: { xs: '100%', sm: 280 },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1.5,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 2px 8px rgba(102, 126, 234, 0.15)',
                    },
                  },
                }}
                variant="outlined"
                size="small"
              >
                <MenuItem value="">
                  <em>All Categories</em>
                </MenuItem>
                {CATEGORIES.map(category => (
                  <MenuItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </MenuItem>
                ))}
              </TextField>
              {selectedCategory && (
                <Chip
                  label={`Active: ${selectedCategory}`}
                  onDelete={() => setSelectedCategory('')}
                  color="primary"
                  icon={<FilterListIcon />}
                  sx={{ fontWeight: 500, ml: 'auto' }}
                />
              )}
            </Box>
          </Stack>
        </Box>

        {/* Error State */}
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 4,
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(244, 67, 54, 0.15)',
              backgroundColor: 'rgba(244, 67, 54, 0.05)',
            }}
          >
            {error}
          </Alert>
        )}

      {/* Loading State */}
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="500px"
          flexDirection="column"
          gap={2}
        >
          <CircularProgress size={80} sx={{ color: 'primary.main' }} />
          <Typography variant="body1" color="text.secondary">
            Loading products...
          </Typography>
        </Box>
      ) : paginatedProducts.length === 0 ? (
        <Alert
          severity="info"
          sx={{
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(33, 150, 243, 0.15)',
            backgroundColor: 'rgba(33, 150, 243, 0.05)',
            py: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="body1">No products found. Try a different category.</Typography>
        </Alert>
      ) : (
        <>
          {/* Product Count Info */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              Showing <Typography component="span" sx={{ fontWeight: 700, color: 'primary' }}>{paginatedProducts.length}</Typography> of{' '}
              <Typography component="span" sx={{ fontWeight: 700, color: 'primary' }}>{filteredProducts.length}</Typography> products
            </Typography>
          </Box>

          {/* Product Grid */}
          <Grid container spacing={{ xs: 2, sm: 2.5, md: 3, lg: 3.5 }} sx={{ mb: 6 }}>
            {paginatedProducts.map(product => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={4} 
                lg={3} 
                key={product.id} 
                sx={{ 
                  display: 'flex',
                  '& > *': {
                    width: '100%',
                  }
                }}
              >
                <ProductItem 
                  product={product} 
                  onAddToCart={handleAddToCart}
                  onProductClick={handleProductClick}
                />
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={2}
              sx={{
                mt: 6,
                p: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: 2.5,
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
              }}
            >
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                size="large"
                color="primary"
                sx={{
                  '& .MuiPaginationItem-root': {
                    fontWeight: 600,
                    borderRadius: 1,
                    transition: 'all 0.3s ease',
                  },
                  '& .MuiPaginationItem-root.Mui-selected': {
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                  },
                }}
              />
              <Typography variant="caption" color="text.secondary">
                Page {currentPage} of {totalPages}
              </Typography>
            </Box>
          )}
        </>
      )}
      </Container>
    </Box>
  );
};

export default ProductList;
