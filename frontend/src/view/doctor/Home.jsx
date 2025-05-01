import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Layout from './layout/Layout';

import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Button,
  CircularProgress,
  Box,
  Stack
} from '@mui/material';

const DoctorDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodaysAppointments = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/doctors/today/${user._id}`);
      setAppointments(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error("Error fetching today's appointments");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (appointmentId) => {
    try {
      await axios.put(`http://localhost:3001/api/doctors/status/${appointmentId}`, {
        status: 'Completed',
      });
      toast.success('Status updated successfully');
      setAppointments((prev) =>
        prev.map((a) =>
          a._id === appointmentId ? { ...a, status: 'Completed' } : a
        )
      );
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  useEffect(() => {
    if (user?._id) fetchTodaysAppointments();
  }, [user]);

  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
        Welcome, Dr. {user?.name}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Here's a summary of your day.
      </Typography>

      {/* Summary Box */}
      <Stack direction="row" spacing={2} sx={{ my: 3 }}>
        <Paper
          elevation={2}
          sx={{
            p: 3,
            borderLeft: '6px solid #1976d2',
            flex: 1,
            bgcolor: '#f0f4ff',
          }}
        >
          <Typography variant="subtitle2" color="text.secondary">
            Total Appointments Today
          </Typography>
          <Typography variant="h5" color="primary" fontWeight="bold">
            {appointments.length}
          </Typography>
        </Paper>
      </Stack>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          📅 Today's Appointments
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : appointments.length === 0 ? (
          <Typography color="text.secondary" fontStyle="italic">
            No appointments scheduled for today.
          </Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Patient</TableCell>
                <TableCell>Date & Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appt) => (
                <TableRow key={appt._id} hover>
                  <TableCell>{appt.userId?.name || 'N/A'}</TableCell>
                  <TableCell>{new Date(appt.appointmentDate).toLocaleString()}</TableCell>
                  <TableCell>
                    <Chip
                      label={appt.status}
                      color={appt.status === 'Pending' ? 'warning' : 'success'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    {appt.status === 'Pending' ? (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => updateStatus(appt._id)}
                      >
                        Mark as Completed
                      </Button>
                    ) : (
                      <Typography color="success.main" fontWeight="medium">
                        ✔ Done
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Container>
  );
};

export default Layout(DoctorDashboard);
