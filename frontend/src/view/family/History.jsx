import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from './layout/Layout';
import { useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

function History() {
  const { user } = useSelector((s) => s.auth);
  const [elderlyList, setElderlyList] = useState([]);
  const [selectedElderly, setSelectedElderly] = useState('');
  const [historyData, setHistoryData] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchElderly = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/elder/family/${user._id}`);
        setElderlyList(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchElderly();
  }, []);

  useEffect(() => {
    if (!selectedElderly) return;

    const fetchHistory = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/history/${selectedElderly}`);
        setHistoryData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHistory();
  }, [selectedElderly]);

  return (
    <Container sx={{ py: "90px" }}>
      <Typography variant="h4" gutterBottom>
        Elderly History
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Select Elderly</InputLabel>
        <Select
          value={selectedElderly}
          label="Select Elderly"
          onChange={(e) => setSelectedElderly(e.target.value)}
        >
          <MenuItem value="">-- Choose --</MenuItem>
          {elderlyList.map((elder) => (
            <MenuItem key={elder._id} value={elder._id}>
              {elder.name} ({elder.email})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {historyData && (
        <>
          <Box sx={{ display: 'flex', gap: 2, my: 3 }}>
            <Button
              variant={filter === 'all' ? 'contained' : 'outlined'}
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'bookings' ? 'contained' : 'outlined'}
              onClick={() => setFilter('bookings')}
            >
              Caregiver Bookings
            </Button>
            <Button
              variant={filter === 'appointments' ? 'contained' : 'outlined'}
              onClick={() => setFilter('appointments')}
            >
              Appointments
            </Button>
          </Box>

          {(filter === 'all' || filter === 'bookings') && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Caregiver Bookings
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Caregiver</TableCell>
                      <TableCell>Service</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Booked On</TableCell>
                      <TableCell>Appointment</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {historyData.caregiverBookings.map((b) => (
                      <TableRow key={b._id}>
                        <TableCell>{b.caregiverId?.name}</TableCell>
                        <TableCell>{b.serviceType}</TableCell>
                        <TableCell>{b.status}</TableCell>
                        <TableCell>{new Date(b.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(b.appointmentDate).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {(filter === 'all' || filter === 'appointments') && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Appointments
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Doctor</TableCell>
                      <TableCell>Specialization</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {historyData.appointments.map((a) => (
                      <TableRow key={a._id}>
                        <TableCell>{a.doctorId?.name}</TableCell>
                        <TableCell>{a.doctorId?.specialization}</TableCell>
                        <TableCell>{a.status}</TableCell>
                        <TableCell>{new Date(a.appointmentDate).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </>
      )}
    </Container>
  );
}

export default Layout(History);
