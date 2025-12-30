import React, { Suspense, lazy, useRef, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';

const DashboardPage = () => {
  const ref = useRef(null);

  useEffect(() => {
    // Dynamically load Vue and the dashboard component
    import('dashboard/DashboardPage')
      .then((module) => {
        import('vue').then(({ createApp }) => {
          if (ref.current) {
            const app = createApp(module.default);
            app.mount(ref.current);
          }
        });
      })
      .catch((err) => console.error('Failed to load dashboard:', err));
  }, []);

  return (
    <Box sx={{ minHeight: '80vh' }}>
      <div ref={ref}></div>
    </Box>
  );
};

export default DashboardPage;
