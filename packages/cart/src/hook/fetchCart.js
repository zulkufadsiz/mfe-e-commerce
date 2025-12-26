import { useState, useEffect } from 'react';

const API_BASE_URL = 'https://fakestoreapi.com';

/**
 * Custom hook to fetch cart data from FakeStore API
 * @param {number} userId - The user ID to fetch cart for
 * @returns {Object} - { cart, loading, error, refetch }
 */
export const useFetchCart = (userId = 1) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch user's cart
      const cartResponse = await fetch(`${API_BASE_URL}/carts/user/${userId}`);
      
      if (!cartResponse.ok) {
        throw new Error(`Failed to fetch cart: ${cartResponse.statusText}`);
      }

      const cartData = await cartResponse.json();
      
      if (cartData.length === 0) {
        setCart({ products: [] });
        return;
      }

      // Get the most recent cart
      const latestCart = cartData[0];

      // Fetch product details for each item in the cart
      const productPromises = latestCart.products.map(async (item) => {
        const productResponse = await fetch(`${API_BASE_URL}/products/${item.productId}`);
        
        if (!productResponse.ok) {
          throw new Error(`Failed to fetch product ${item.productId}`);
        }

        const productData = await productResponse.json();
        return {
          ...productData,
          quantity: item.quantity,
          cartItemId: item.productId,
        };
      });

      const productsWithDetails = await Promise.all(productPromises);

      setCart({
        id: latestCart.id,
        userId: latestCart.userId,
        date: latestCart.date,
        products: productsWithDetails,
      });
    } catch (err) {
      setError(err.message || 'An error occurred while fetching cart');
      setCart({ products: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  return { 
    cart, 
    loading, 
    error, 
    refetch: fetchCart 
  };
};

export default useFetchCart;
