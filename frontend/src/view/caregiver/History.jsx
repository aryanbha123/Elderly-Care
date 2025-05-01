import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Layout from './layout/Layout';

import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  CircularProgress,
  Container,
  Box,
} from '@mui/material';

const CareTakerHistory = () => {
  const { user } = useSelector((state) => state.auth);
  const [completedBookings, setCompletedBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCompletedBookings = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/careTakerBookings/${user._id}`);
      const allBookings = Array.isArray(res.data) ? res.data : [];
      const filtered = allBookings.filter((b) => b.status === 'Completed');
      setCompletedBookings(filtered);
    } catch (error) {
      toast.error('Failed to fetch history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) fetchCompletedBookings();
  }, [user]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ paddingTop: '80px' }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Completed Bookings History
      </Typography>

      {completedBookings.length === 0 ? (
        <Typography>No completed bookings found.</Typography>
      ) : (
        <Paper elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>User</strong></TableCell>
                <TableCell><strong>Service Type</strong></TableCell>
                <TableCell><strong>Completed On</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {completedBookings.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell>{booking.userId?.name || 'N/A'}</TableCell>
                  <TableCell>{booking.serviceType}</TableCell>
                  <TableCell>
                    {new Date(booking.updatedAt || booking.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Container>
  );
};

export default Layout(CareTakerHistory);
