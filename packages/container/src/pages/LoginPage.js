import React, { Suspense, lazy, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RemoteLogin = lazy(() => import('auth/LoginPage'));

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (userData) => {
    login(userData);
    navigate('/');
  };

  return (
    <Suspense
      fallback={
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
          }}
        >
          <CircularProgress size={60} />
        </Box>
      }
    >
      <RemoteLogin onLogin={handleLogin} />
    </Suspense>
  );
};

export default LoginPage;
