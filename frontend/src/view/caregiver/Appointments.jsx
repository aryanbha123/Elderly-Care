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
  Button,
  Box,
} from '@mui/material';

const CareTakerBookings = () => {
  const { user } = useSelector((state) => state.auth);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/careTakerBookings/${user._id}`);
      setBookings(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (bookingId) => {
    try {
      await axios.put(`http://localhost:3001/api/careTakerBookings/bookings/${bookingId}/status`, {
        status: 'Completed',
      });
      toast.success('Status updated');
      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status: 'Completed' } : b))
      );
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  useEffect(() => {
    if (user?._id) fetchBookings();
  }, [user]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
        <CircularProgress />
      </Box>
    );
  }

  const pendingBookings = bookings.filter((b) => b.status === 'Pending');

  return (
    <Container sx={{ paddingTop: '80px' }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Your Bookings
      </Typography>

      {pendingBookings.length === 0 ? (
        <Typography>No pending bookings found.</Typography>
      ) : (
        <Paper elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>User</strong></TableCell>
                <TableCell><strong>Service Type</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingBookings.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell>{booking.userId?.name || 'N/A'}</TableCell>
                  <TableCell>{booking.serviceType}</TableCell>
                  <TableCell>{booking.status}</TableCell>
                  <TableCell>{booking.appointmentDate}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => updateStatus(booking._id)}
                    >
                      Mark as Completed
                    </Button>
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

export default Layout(CareTakerBookings);
