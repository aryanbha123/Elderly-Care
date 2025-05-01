import React, { useEffect, useState } from 'react';
import Layout from './layout/Layout';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, MenuItem, Select, FormControl, InputLabel, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

function Appointments() {
  const [careTakers, setCareTakers] = useState([]);
  const [elders, setElders] = useState([]);
  const [selectedElder, setSelectedElder] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [serviceType, setServiceType] = useState('Cleaning');
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((s) => s.auth);

  const serviceOptions =  ['Cleaning', 'Cooking', 'Assistance']

  const fetchCareTakers = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/api/care`);
      setCareTakers(data);
    } catch (err) {
      toast.error('Failed to fetch caretakers');
    } finally {
      setLoading(false);
    }
  };

  const fetchElders = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/api/elder/family/${user._id}`);
      setElders(data);
      if (data.length > 0) setSelectedElder(data[0]._id);
    } catch (err) {
      toast.error('Failed to fetch family members');
    }
  };

  const handleBook = async (caregiverId) => {
    if (!selectedElder || !appointmentDate || !serviceType) {
      return toast.error('Please fill all fields');
    }

    try {
      const payload = {
        userId: selectedElder,
        caregiverId,
        serviceType,
        appointmentDate,
      };

      await axios.post(`http://localhost:3001/api/careTakerBookings`, payload);
      toast.success('Appointment booked successfully');
    } catch (err) {
      toast.error('Booking failed');
    }
  };

  useEffect(() => {
    fetchCareTakers();
    fetchElders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-blue-700">Book Caretaker Appointment</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Elder Select */}
          <FormControl fullWidth>
            <InputLabel>Select Elderly Member</InputLabel>
            <Select
              value={selectedElder}
              label="Select Elderly Member"
              onChange={(e) => setSelectedElder(e.target.value)}
            >
              {elders.map((elder) => (
                <MenuItem key={elder._id} value={elder._id}>
                  {elder.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Service Type Select */}
          <FormControl fullWidth>
            <InputLabel>Service Type</InputLabel>
            <Select
              value={serviceType}
              label="Service Type"
              onChange={(e) => setServiceType(e.target.value)}
            >
              {serviceOptions.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Appointment Date Picker */}
          <TextField
            fullWidth
            type="datetime-local"
            label="Appointment Date"
            InputLabelProps={{ shrink: true }}
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="loader mx-auto" />
        ) : careTakers.length === 0 ? (
          <p className="text-gray-600">No caretakers found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {careTakers.map((doc) => (
              <div
                key={doc._id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold text-gray-800">{doc.name}</h2>
                <p className="text-sm text-gray-600">{doc.email}</p>
                <p className="text-sm mb-4 text-gray-600 mt-1">Phone: {doc.phone || 'N/A'}</p>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{ fontSize: 12 }}
                  onClick={() => handleBook(doc._id)}
                  disabled={!selectedElder || !appointmentDate}
                >
                  Book Appointment
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Layout(Appointments);
