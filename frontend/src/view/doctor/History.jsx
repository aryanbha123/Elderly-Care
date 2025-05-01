import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Layout from './layout/Layout';

import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Button,
  CircularProgress,
  Paper,
} from '@mui/material';

const History = () => {
  const { user } = useSelector((state) => state.auth); // doctor
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/doctors/${user._id}`);
      setAppointments(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error('Error fetching appointments');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
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
    }
  };

  useEffect(() => {
    if (user?._id) fetchAppointments();
  }, [user]);

  return (
    <Box mt={10} p={3}>
      <Typography variant="h4" gutterBottom>
        All History
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : appointments.length === 0 ? (
        <Typography>No appointments found.</Typography>
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Patient</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appt) => (
                <TableRow key={appt._id}>
                  <TableCell>{appt.userId?.name || 'N/A'}</TableCell>
                  <TableCell>
                    {new Date(appt.appointmentDate).toLocaleString()}
                  </TableCell>
                  <TableCell>{appt.status}</TableCell>
                  <TableCell>
                    {appt.status === 'Pending' ? (
                      <>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          sx={{ mr: 1 }}
                          onClick={() => updateStatus(appt._id, 'Confirmed')}
                        >
                          Confirm
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => updateStatus(appt._id, 'Cancelled')}
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
        </Paper>
      )}
    </Box>
  );
};

export default Layout(History);
