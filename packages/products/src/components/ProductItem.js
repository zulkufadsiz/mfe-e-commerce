import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Rating,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

/**
 * ProductItem Component
 * Displays individual product card with image, details, and actions
 * @param {Object} product - Product data object
 * @param {number} product.id - Product ID
 * @param {string} product.title - Product title
 * @param {string} product.image - Product image URL
 * @param {string} product.category - Product category
 * @param {number} product.price - Product price
 * @param {string} product.description - Product description
 * @param {Object} product.rating - Rating object with rate and count
 * @param {Function} onAddToCart - Callback when add to cart is clicked
 * @param {Function} onProductClick - Callback when product card is clicked
 */
const ProductItem = ({ product, onAddToCart, onProductClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
    setNotificationMessage(`${product.title.substring(0, 30)}... added to cart!`);
    setShowNotification(true);
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    setNotificationMessage(isFavorite ? 'Removed from favorites' : 'Added to favorites!');
    setShowNotification(true);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    console.log('View Details clicked, productId:', product.id);
    console.log('onProductClick function:', onProductClick);
    if (onProductClick) {
      onProductClick(product.id);
    } else {
      console.warn('onProductClick is not defined');
    }
  };

  return (
    <>
      <Card
        sx={{
          width: 550,
          minHeight: 520,
          maxHeight: 520,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: 2.5,
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          position: 'relative',
          boxSizing: 'border-box',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(240, 46, 170, 0.1) 100%)',
            opacity: 0,
            transition: 'opacity 0.4s ease',
            pointerEvents: 'none',
          },
          '&:hover': {
            transform: 'translateY(-12px)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
            '&::before': {
              opacity: 1,
            },
          },
        }}
      >
        {/* Product Image Container */}
        <Box
          sx={{
            pt: 2.5,
            pb: 2,
            px: 2,
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 220,
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}
        >
          {/* Favorite Button */}
          <Tooltip title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
            <IconButton
              size="small"
              onClick={handleToggleFavorite}
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                zIndex: 10,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: isFavorite ? 'rgba(244, 67, 54, 0.2)' : 'rgba(255, 255, 255, 1)',
                  transform: 'scale(1.1)',
                },
              }}
            >
              {isFavorite ? (
                <FavoriteIcon sx={{ color: '#f44336', fontSize: '1.3rem' }} />
              ) : (
                <FavoriteBorderIcon sx={{ fontSize: '1.3rem' }} />
              )}
            </IconButton>
          </Tooltip>

          {/* Product Image */}
          <img
            src={product.image}
            alt={product.title}
            style={{
              maxWidth: '85%',
              maxHeight: '85%',
              objectFit: 'contain',
              transition: 'transform 0.4s ease',
            }}
            onError={(e) => (e.target.src = 'https://via.placeholder.com/200')}
          />
        </Box>

        {/* Product Content */}
        <CardContent sx={{ flexGrow: 1, pt: 2, pb: 1.5, display: 'flex', flexDirection: 'column', px: 2, width: '100%', boxSizing: 'border-box' }}>
          {/* Category Chip */}
          <Chip
            label={product.category}
            size="small"
            sx={{
              mb: 1.5,
              textTransform: 'capitalize',
              fontWeight: 500,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              fontSize: '0.75rem',
              width: 'fit-content',
            }}
          />

          {/* Product Title */}
          <Typography
            variant="h6"
            component="h2"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mb: 1.5,
              height: '56px',
              fontWeight: 600,
              fontSize: { xs: '0.95rem', sm: '1rem' },
              color: '#1a1a1a',
              lineHeight: 1.4,
            }}
          >
            {product.title}
          </Typography>

          {/* Product Description */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              fontSize: '0.875rem',
              lineHeight: 1.5,
              height: '52px',
            }}
          >
            {product.description.length > 80
              ? product.description.substring(0, 80) + '...'
              : product.description}
          </Typography>

          {/* Rating Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 'auto' }}>
            <Rating value={product.rating?.rate || 0} precision={0.5} readOnly size="small" />
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
              ({product.rating?.count || 0})
            </Typography>
          </Box>
        </CardContent>

        {/* Product Actions */}
        <CardActions sx={{ pt: 1, px: 2, pb: 2, display: 'flex', flexDirection: 'column', gap: 1.5, width: '100%', boxSizing: 'border-box' }}>
          {/* Price */}
          <Box sx={{ width: '100%' }}>
            <Typography
              variant="h5"
              sx={{
                mb: 1.5,
                fontWeight: 700,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ${product.price?.toFixed(2)}
            </Typography>

            {/* Add to Cart Button */}
            <Button
              variant="contained"
              fullWidth
              size="medium"
              startIcon={<ShoppingCartIcon />}
              onClick={handleAddToCart}
              sx={{
                borderRadius: 1.5,
                fontWeight: 600,
                textTransform: 'capitalize',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
                },
              }}
            >
              Add to Cart
            </Button>

            {/* View Details Button */}
            <Button
              variant="outlined"
              fullWidth
              size="medium"
              onClick={handleViewDetails}
              sx={{
                mt: 1.5,
                borderRadius: 1.5,
                fontWeight: 600,
                textTransform: 'capitalize',
                borderColor: '#667eea',
                color: '#667eea',
                borderWidth: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderWidth: 2,
                  borderColor: '#764ba2',
                  backgroundColor: 'rgba(102, 126, 234, 0.05)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              View Details
            </Button>
          </Box>
        </CardActions>
      </Card>

      {/* Toast Notification */}
      <Snackbar
        open={showNotification}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleCloseNotification} severity="success" sx={{ width: '100%' }}>
          {notificationMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductItem;
