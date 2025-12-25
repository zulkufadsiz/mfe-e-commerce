import { useState, useEffect } from 'react';

const API_BASE_URL = 'https://fakestoreapi.com';

export const useFetchProducts = (category = null) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Build the URL based on whether a category is provided
        let url = `${API_BASE_URL}/products`;
        if (category) {
          url = `${API_BASE_URL}/products/category/${category}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return { products, loading, error };
};

export default useFetchProducts;
