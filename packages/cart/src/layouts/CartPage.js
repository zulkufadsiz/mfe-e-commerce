import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
  Divider,
  TextField,
  Grid,
  Paper,
  Chip,
  Alert,
  Snackbar,
} from '@mui/material';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import useCart from '../hook/useCart';
import CartItem from '../components/CartItem';

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getSubtotal,
    getTax,
    getTotal,
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleRemoveItem = (id) => {
    removeFromCart(id);
    setNotificationMessage('Item removed from cart');
    setShowNotification(true);
  };

  const applyPromoCode = () => {
    if (promoCode.trim()) {
      setPromoApplied(true);
      setNotificationMessage('Promo code applied successfully!');
      setShowNotification(true);
    }
  };

  const calculateDiscount = () => {
    return promoApplied ? getSubtotal() * 0.1 : 0;
  };

  const calculateFinalTotal = () => {
    const discount = calculateDiscount();
    return getTotal(0.08, discount);
  };

  const handleCheckout = () => {
    setNotificationMessage('Proceeding to checkout...');
    setShowNotification(true);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: { xs: 3, sm: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <ShoppingCartIcon
              sx={{
                fontSize: 40,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            />
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
              }}
            >
              Shopping Cart
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.95rem', md: '1.1rem' } }}>
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </Typography>
        </Box>

        {cartItems.length === 0 ? (
          // Empty Cart State
          <Paper
            elevation={0}
            sx={{
              p: 6,
              textAlign: 'center',
              borderRadius: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <ShoppingBagIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Your cart is empty
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Add some products to get started!
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'capitalize',
                fontWeight: 600,
              }}
            >
              Continue Shopping
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {/* Cart Items */}
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </Box>
            </Grid>

            {/* Order Summary */}
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  position: { md: 'sticky' },
                  top: { md: 24 },
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 2.5,
                  overflow: 'hidden',
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                    Order Summary
                  </Typography>

                  {/* Promo Code */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        disabled={promoApplied}
                        InputProps={{
                          startAdornment: <LocalOfferIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                        }}
                      />
                      <Button
                        variant="outlined"
                        onClick={applyPromoCode}
                        disabled={promoApplied}
                        sx={{ minWidth: 80 }}
                      >
                        Apply
                      </Button>
                    </Box>
                    {promoApplied && (
                      <Chip
                        label="10% Discount Applied"
                        color="success"
                        size="small"
                        onDelete={() => setPromoApplied(false)}
                      />
                    )}
                  </Box>

                  <Divider sx={{ mb: 2 }} />

                  {/* Price Breakdown */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        Subtotal
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        ${getSubtotal().toFixed(2)}
                      </Typography>
                    </Box>

                    {promoApplied && (
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="success.main">
                          Discount (10%)
                        </Typography>
                        <Typography variant="body2" color="success.main" sx={{ fontWeight: 600 }}>
                          -${calculateDiscount().toFixed(2)}
                        </Typography>
                      </Box>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        Tax (8%)
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        ${getTax().toFixed(2)}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        Shipping
                      </Typography>
                      <Typography variant="body2" color="success.main" sx={{ fontWeight: 600 }}>
                        FREE
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ mb: 2 }} />

                  {/* Total */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Total
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      ${calculateFinalTotal().toFixed(2)}
                    </Typography>
                  </Box>

                  {/* Checkout Button */}
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={handleCheckout}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'capitalize',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
                      },
                    }}
                  >
                    Proceed to Checkout
                  </Button>

                  {/* Continue Shopping */}
                  <Button
                    variant="text"
                    fullWidth
                    sx={{
                      mt: 2,
                      textTransform: 'capitalize',
                      fontWeight: 500,
                    }}
                  >
                    Continue Shopping
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>

      {/* Notification Snackbar */}
      <Snackbar
        open={showNotification}
        autoHideDuration={3000}
        onClose={() => setShowNotification(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={() => setShowNotification(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CartPage;
