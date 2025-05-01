import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Layout from './layout/Layout';
import dayjs from 'dayjs';

import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
  Chip,
  Box,
  TableContainer,
} from '@mui/material';

const STATUS = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  CANCELLED: 'Cancelled',
};

const Appointments = () => {
  const { user } = useSelector((state) => state.auth);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/doctors/upcoming/${user._id}`);
      setAppointments(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error('Error fetching appointments');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      await axios.put(`http://localhost:3001/api/doctors/status/${id}`, {
        status: newStatus,
      });
      toast.success(`Appointment marked as ${newStatus}`);
      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: newStatus } : a))
      );
    } catch (err) {
      toast.error('Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    if (user?._id) fetchAppointments();
  }, [user]);

  const getChipColor = (status) => {
    switch (status) {
      case STATUS.PENDING:
        return 'warning';
      case STATUS.CONFIRMED:
        return 'info';
      case STATUS.CANCELLED:
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
         <Typography variant="h4" gutterBottom>
           All Upcoming
         </Typography>
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : appointments.length === 0 ? (
          <Typography color="text.secondary" fontStyle="italic">
            No appointments found.
          </Typography>
        ) : (
          <TableContainer>
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
                    <TableCell>{dayjs(appt.appointmentDate).format('MMM D, YYYY h:mm A')}</TableCell>
                    <TableCell>
                      <Chip
                        label={appt.status}
                        color={getChipColor(appt.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      {appt.status === STATUS.PENDING ? (
                        <>
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                            sx={{ mr: 1 }}
                            disabled={updatingId === appt._id}
                            onClick={() => updateStatus(appt._id, STATUS.CONFIRMED)}
                            aria-label="Confirm appointment"
                          >
                            Confirm
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            disabled={updatingId === appt._id}
                            onClick={() => updateStatus(appt._id, STATUS.CANCELLED)}
                            aria-label="Cancel appointment"
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Typography color="text.secondary">{appt.status}</Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Container>
  );
};

export default Layout(Appointments);
