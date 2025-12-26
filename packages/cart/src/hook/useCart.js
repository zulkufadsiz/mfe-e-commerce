import { useState, useEffect } from 'react';

/**
 * Custom hook for managing shopping cart state
 * Provides cart operations like add, remove, update quantity, and clear
 * @returns {Object} - Cart state and operations
 */
export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('shopping_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        setCartItems([]);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('shopping_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  /**
   * Add item to cart or increase quantity if already exists
   * @param {Object} product - Product to add
   * @param {number} quantity - Quantity to add (default: 1)
   */
  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item to cart
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  /**
   * Remove item from cart
   * @param {number} productId - ID of product to remove
   */
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  /**
   * Update quantity of item in cart
   * @param {number} productId - ID of product to update
   * @param {number} newQuantity - New quantity (removes if 0 or less)
   */
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  /**
   * Clear all items from cart
   */
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('shopping_cart');
  };

  /**
   * Get cart item by product ID
   * @param {number} productId - ID of product to find
   * @returns {Object|undefined} - Cart item or undefined
   */
  const getCartItem = (productId) => {
    return cartItems.find(item => item.id === productId);
  };

  /**
   * Check if product is in cart
   * @param {number} productId - ID of product to check
   * @returns {boolean}
   */
  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  /**
   * Calculate total number of items in cart
   * @returns {number}
   */
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  /**
   * Calculate subtotal (before tax and discounts)
   * @returns {number}
   */
  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  /**
   * Calculate tax amount
   * @param {number} taxRate - Tax rate (default: 0.08 for 8%)
   * @returns {number}
   */
  const getTax = (taxRate = 0.08) => {
    return getSubtotal() * taxRate;
  };

  /**
   * Calculate total amount (subtotal + tax)
   * @param {number} taxRate - Tax rate (default: 0.08 for 8%)
   * @param {number} discount - Discount amount (default: 0)
   * @returns {number}
   */
  const getTotal = (taxRate = 0.08, discount = 0) => {
    const subtotal = getSubtotal();
    const tax = (subtotal - discount) * taxRate;
    return subtotal - discount + tax;
  };

  return {
    // State
    cartItems,
    isLoading,
    
    // Operations
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItem,
    isInCart,
    
    // Calculations
    getTotalItems,
    getSubtotal,
    getTax,
    getTotal,
  };
};

export default useCart;
