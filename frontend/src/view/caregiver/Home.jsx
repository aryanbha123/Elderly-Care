import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
} from '@mui/material';
import { CalendarToday, History, Person } from '@mui/icons-material';
import Layout from './layout/Layout';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Home() {
  const [todayCount, setTodayCount] = useState(0);
  const [todayBookings, setTodayBookings] = useState([]);
  const { user } = useSelector((s) => s.auth);
  const caregiverId = user._id;

  useEffect(() => {
    const fetchTodayAppointments = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/careTakerBookings/bookings/today/${caregiverId}`);
        setTodayBookings(res.data);
        setTodayCount(res.data.length);
      } catch (err) {
        console.error('Failed to fetch today’s bookings:', err);
      }
    };

    fetchTodayAppointments();
  }, [caregiverId]);

  const handleUpdateStatus = async (bookingId) => {
    try {
      await axios.put(`http://localhost:3001/api/careTakerBookings/bookings/${bookingId}/status`, {
        status: 'Completed',
      });

      setTodayBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId ? { ...booking, status: 'Completed' } : booking
        )
      );
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  return (
    <Box sx={{ paddingTop: '90px', paddingLeft: '30px', paddingRight: '30px' }}>
      {/* Welcome Message */}
      <Typography variant="h4" gutterBottom>
        Hello, <span style={{ color: '#1976d2' }}>{user.name || 'Caregiver'}</span> 👋
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Welcome back to your caregiver dashboard. Here's what you can manage today:
      </Typography>

      {/* Dashboard Cards */}
      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ minHeight: 150 }}>
            <CardContent>
              <CalendarToday color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="h6" mt={2}>
                Today's Appointments
              </Typography>
              <Typography variant="h4" mt={1} sx={{ color: '#1976d2' }}>
                {todayCount}
              </Typography>
              <Typography variant="body2" mt={1} color="text.secondary">
                Check scheduled appointments and get prepared.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

</Grid>
      {/* Today's Booking Table */}
      <Box mt={5}>
        <Typography variant="h5" gutterBottom>
          Today's Bookings
        </Typography>
        {todayBookings.length === 0 ? (
          <Typography color="text.secondary">No bookings for today.</Typography>
        ) : (
          <Paper elevation={3} sx={{ overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User Name</TableCell>
                  <TableCell>Service Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todayBookings.map((booking) => (
                  <TableRow key={booking._id}>
                    <TableCell>{booking.userId?.name || 'N/A'}</TableCell>
                    <TableCell>{booking.serviceType}</TableCell>
                    <TableCell>{booking.status}</TableCell>
                    <TableCell>
                      {booking.status === 'Pending' ? (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleUpdateStatus(booking._id)}
                        >
                          Mark Completed
                        </Button>
                      ) : (
                        <Typography color="green">Completed</Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Box>
    </Box>
  );
}

export default Layout(Home);
