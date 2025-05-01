import React from 'react';
import Layout from './layout/Layout';
import {
  Box,
  Typography,
  Paper,
  Container,
  Stack,
} from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Welcome, Family Member 👨‍👩‍👧
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          This platform helps you take better care of your elderly loved ones by allowing you to manage their medical and personal care digitally.
        </Typography>

        <Stack spacing={3}>
          <Box sx={{ borderLeft: '6px solid #1976d2', bgcolor: '#e3f2fd', p: 2, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="medium">🩺 Consult a Doctor</Typography>
            <Typography variant="body2" color="text.secondary">
              Book appointments with verified doctors on behalf of your elderly family members.
            </Typography>
          </Box>

          <Box sx={{ borderLeft: '6px solid #2e7d32', bgcolor: '#e8f5e9', p: 2, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="medium">➕ Add Elderly Profiles</Typography>
            <Typography variant="body2" color="text.secondary">
              Manage one or more elderly individuals under your care. Create their profiles easily.
            </Typography>
          </Box>

          <Box sx={{ borderLeft: '6px solid #6a1b9a', bgcolor: '#f3e5f5', p: 2, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="medium">🧹 Book Caregivers</Typography>
            <Typography variant="body2" color="text.secondary">
              Schedule support services like cleaning, cooking, or daily assistance.
            </Typography>
          </Box>

          <Box sx={{ borderLeft: '6px solid #f9a825', bgcolor: '#fff8e1', p: 2, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="medium">💬 Stay Connected</Typography>
            <Typography variant="body2" color="text.secondary">
              Chat with assigned doctors and caregivers for updates and coordination.
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Layout(Home);
