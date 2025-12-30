import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Box,
  Container,
  Typography,
  Button,
  Rating,
  Chip,
  CircularProgress,
  IconButton,
  Divider,
  CssBaseline,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

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

const ProductDetail = ({ productId, onBack }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleQuantityChange = (type) => {
    if (type === 'increment') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} item(s) to cart`);
    // Toast notification would go here
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    }
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          }}
        >
          <CircularProgress size={60} />
        </Box>
      </ThemeProvider>
    );
  }

  if (error || !product) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            py: 8,
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h4" color="error" align="center">
              {error || 'Product not found'}
            </Typography>
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Button
                variant="contained"
                startIcon={<ArrowBackIcon />}
                onClick={handleBack}
              >
                Back to Products
              </Button>
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          {/* Main Content */}
          <Box
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              p: 4,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: 6,
              }}
            >
              {/* Product Image */}
              <Box>
                <Box
                  sx={{
                    position: 'relative',
                    backgroundColor: 'white',
                    borderRadius: 3,
                    p: 4,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 400,
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '400px',
                      objectFit: 'contain',
                    }}
                  />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      backgroundColor: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      },
                    }}
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    {isFavorite ? (
                      <FavoriteIcon color="error" />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                </Box>
              </Box>

              {/* Product Info */}
              <Box>
                <Chip
                  label={product.category}
                  sx={{
                    mb: 2,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    fontWeight: 600,
                    textTransform: 'capitalize',
                  }}
                />

                <Typography
                  variant="h4"
                  component="h1"
                  gutterBottom
                  sx={{ fontWeight: 700, mb: 2 }}
                >
                  {product.title}
                </Typography>

                {/* Rating */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Rating
                    value={product.rating?.rate || 0}
                    precision={0.1}
                    readOnly
                    sx={{ mr: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    ({product.rating?.count || 0} reviews)
                  </Typography>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Price */}
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    mb: 3,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  ${product.price}
                </Typography>

                {/* Description */}
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 4, lineHeight: 1.8 }}
                >
                  {product.description}
                </Typography>

                <Divider sx={{ mb: 3 }} />

                {/* Quantity Selector */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                    Quantity
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '2px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                      }}
                    >
                      <IconButton
                        onClick={() => handleQuantityChange('decrement')}
                        disabled={quantity <= 1}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography
                        sx={{
                          minWidth: 40,
                          textAlign: 'center',
                          fontWeight: 600,
                        }}
                      >
                        {quantity}
                      </Typography>
                      <IconButton onClick={() => handleQuantityChange('increment')}>
                        <AddIcon />
                      </IconButton>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Total: ${(product.price * quantity).toFixed(2)}
                    </Typography>
                  </Box>
                </Box>

                {/* Add to Cart Button */}
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  startIcon={<AddShoppingCartIcon />}
                  onClick={handleAddToCart}
                  sx={{
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: 2,
                    textTransform: 'capitalize',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5568d3 0%, #6b3f91 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Add to Cart
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ProductDetail;
