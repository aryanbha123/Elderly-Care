import React, { useEffect, useState } from 'react';
import Layout from './layout/Layout';
import axios from 'axios';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import DoctorChatModal from './components/ChatModalDoctor';

function Patients() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null); // For storing the selected appointment for chat
  const { user } = useSelector(s => s.auth);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/doctors/${user._id}`);
        
        // Filter unique appointments for each doctor
        const uniqueAppointments = res.data.filter((appointment, index, self) =>
          index === self.findIndex((t) => t.doctorId === appointment.doctorId && t.appointmentDate === appointment.appointmentDate)
        );

        setAppointments(uniqueAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    if (user._id) {
      fetchAppointments();
    }
  }, [user._id]);

  const handleChatOpen = (appointment) => {
    setSelectedAppointment(appointment); // Store the selected appointment
  };

  const handleCloseChat = () => {
    setSelectedAppointment(null); // Close the chat modal
  };

  return (
    <div className='py-[100px] px-5'>
      <Typography variant="h4" gutterBottom>
        Patient Appointments
      </Typography>

      {appointments.length === 0 ? (
        <Typography>No appointments found.</Typography>
      ) : (
        appointments.map((appointment) => (
          <Card key={appointment._id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">
                Appointment with Doctor {appointment.doctorId}
              </Typography>
              <Typography variant="body1">
                Appointment Date: {new Date(appointment.appointmentDate).toLocaleString()}
              </Typography>
              <Typography variant="body1" color="error">
                Status: {appointment.status}
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                sx={{ mt: 2 }}
                onClick={() => handleChatOpen(appointment)} // Open chat for the selected appointment
              >
                Chat with Doctor
              </Button>
            </CardContent>
          </Card>
        ))
      )}

      {selectedAppointment && (
       <div className="fixed top-[100px] z-50 w-[60vw]">
         <DoctorChatModal
          elderly={selectedAppointment.userId}
          onClose={handleCloseChat} 
        />
       </div>
      )}
    </div>
  );
}

export default Layout(Patients);
