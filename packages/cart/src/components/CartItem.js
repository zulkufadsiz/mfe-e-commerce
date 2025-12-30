import React from 'react';
import {
  Card,
  CardContent,
  IconButton,
  Typography,
  Box,
  Grid,
  Chip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

/**
 * CartItem Component
 * Displays individual cart item with image, details, quantity controls, and remove button
 * @param {Object} item - Cart item object
 * @param {number} item.id - Item ID
 * @param {string} item.title - Item title
 * @param {string} item.image - Item image URL
 * @param {number} item.price - Item price
 * @param {number} item.quantity - Item quantity
 * @param {string} item.category - Item category
 * @param {Function} onUpdateQuantity - Callback when quantity is updated
 * @param {Function} onRemove - Callback when item is removed
 */
const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const handleIncrement = () => {
    if (onUpdateQuantity) {
      onUpdateQuantity(item.id, item.quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (onUpdateQuantity) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove(item.id);
    }
  };

  return (
    <Card
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: 2.5,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
        },
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Grid container spacing={2} alignItems="center">
          {/* Product Image */}
          <Grid item xs={3} sm={2}>
            <Box
              sx={{
                width: '100%',
                height: { xs: 80, sm: 100 },
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 1,
                overflow: 'hidden',
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                }}
                onError={(e) => (e.target.src = 'https://via.placeholder.com/100')}
              />
            </Box>
          </Grid>

          {/* Product Details */}
          <Grid item xs={9} sm={10}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <Box sx={{ flex: 1, pr: 2 }}>
                {/* Category Chip */}
                <Chip
                  label={item.category}
                  size="small"
                  sx={{
                    mb: 1,
                    textTransform: 'capitalize',
                    fontSize: '0.7rem',
                    height: 20,
                    background: 'linear-gradient(135deg, #2563eb 0%, #0891b2 100%)',
                    color: 'white',
                  }}
                />

                {/* Product Title */}
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: '0.95rem', sm: '1.1rem' },
                    fontWeight: 600,
                    mb: 1,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    lineHeight: 1.3,
                  }}
                >
                  {item.title}
                </Typography>

                {/* Price */}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #2563eb 0%, #0891b2 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 2,
                    fontSize: { xs: '1rem', sm: '1.25rem' },
                  }}
                >
                  ${item.price.toFixed(2)}
                </Typography>

                {/* Quantity Controls */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={handleDecrement}
                    disabled={item.quantity <= 1}
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      width: 32,
                      height: 32,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: 'primary.main',
                        backgroundColor: 'primary.lighter',
                      },
                      '&:disabled': {
                        opacity: 0.5,
                      },
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>

                  <Typography
                    sx={{
                      minWidth: 40,
                      textAlign: 'center',
                      fontWeight: 600,
                      fontSize: '1rem',
                    }}
                  >
                    {item.quantity}
                  </Typography>

                  <IconButton
                    size="small"
                    onClick={handleIncrement}
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      width: 32,
                      height: 32,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: 'primary.main',
                        backgroundColor: 'primary.lighter',
                      },
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>

              {/* Remove Button */}
              <IconButton
                onClick={handleRemove}
                sx={{
                  color: 'error.main',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>

            {/* Item Subtotal */}
            <Box
              sx={{
                mt: 2,
                pt: 2,
                borderTop: '1px dashed',
                borderColor: 'divider',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Subtotal:
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: 'primary.main',
                  }}
                >
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CartItem;
