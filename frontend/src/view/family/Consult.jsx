// import React, { useEffect, useState } from 'react';
// import Layout from './layout/Layout';
// import axios from 'axios';
// import { toast } from 'react-toastify'
// import {
//   Button,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField
// } from '@mui/material';
// import { useSelector } from 'react-redux';

// function Consult() {
//   const [doctors, setDoctors] = useState([]);
//   const [elders, setElders] = useState([]);
//   const [selectedElder, setSelectedElder] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [appointmentDate, setAppointmentDate] = useState('');
//   const [modalOpen, setModalOpen] = useState(false);
//   const { user } = useSelector((s) => s.auth);

//   const fetchDoctors = async () => {
//     try {
//       const { data } = await axios.get(`http://localhost:3001/api/doctors`);
//       setDoctors(data);
//     } catch (err) {
//       toast.error('Failed to fetch doctors');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchElders = async () => {
//     try {
//       const { data } = await axios.get(`http://localhost:3001/api/elder/family/${user._id}`);
//       setElders(data);
//       if (data.length > 0) setSelectedElder(data[0]._id);
//     } catch (err) {
//       toast.error('Failed to fetch family members');
//     }
//   };

//   const openModal = (doctor) => {
//     setSelectedDoctor(doctor);
//     setAppointmentDate('');
//     setModalOpen(true);
//   };

//   const handleBook = async () => {
//     if (!selectedElder || !appointmentDate) {
//       toast.error('Please select all required fields');
//       return;
//     }

//     try {
//       const payload = {
//         patientId: selectedElder,
//         doctorId: selectedDoctor._id,
//         appointmentDate
//       };

//       await axios.post(`http://localhost:3001/api/appointments/book/${user._id}`, payload);
//       toast.success('Appointment booked successfully');
//       setModalOpen(false);
//     } catch (err) {
//       toast.error('Booking failed');
//     }
//   };

//   useEffect(() => {
//     fetchDoctors();
//     fetchElders();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4">
//       <div className="max-w-5xl mx-auto">
//         <h1 className="text-2xl font-bold mb-6 text-blue-700">Available Doctors</h1>

//         <div className="mb-4">
//           <FormControl fullWidth>
//             <InputLabel>Select Elderly Member</InputLabel>
//             <Select
//               value={selectedElder}
//               label="Select Elderly Member"
//               onChange={(e) => setSelectedElder(e.target.value)}
//             >
//               {elders.map((elder) => (
//                 <MenuItem key={elder._id} value={elder._id}>
//                   {elder.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </div>

//         {loading ? (
//           <div className="loader mx-auto" />
//         ) : doctors.length === 0 ? (
//           <p className="text-gray-600">No doctors found.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {doctors.map((doc) => (
//               <div
//                 key={doc._id}
//                 className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
//               >
//                 <h2 className="text-xl font-semibold text-gray-800">{doc.name}</h2>
//                 <p className="text-sm text-gray-600">{doc.email}</p>
//                 <p className="text-sm mb-4 text-gray-600 mt-1">Phone: {doc.phone || 'N/A'}</p>

//                 <div className="flex gap-2 flex-wrap">
//                   <Button
//                     variant="contained"
//                     sx={{ fontSize: 10 }}
//                     onClick={() => openModal(doc)}
//                     disabled={!selectedElder}
//                   >
//                     Book Appointment
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     sx={{ fontSize: 10 }}
//                     onClick={() => toast.success(`Chat with ${doc.name} coming soon!`)}
//                   >
//                     Chat
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Appointment Date Modal */}
//       <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
//         <DialogTitle>Choose Appointment Date</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Appointment Date"
//             type="datetime-local"
//             fullWidth
//             value={appointmentDate}
//             onChange={(e) => setAppointmentDate(e.target.value)}
//             InputLabelProps={{ shrink: true }}
//             sx={{ mt: 2 }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setModalOpen(false)}>Cancel</Button>
//           <Button onClick={handleBook} variant="contained">
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

// export default Layout(Consult);
import React, { useEffect, useState } from 'react'
import Layout from './layout/Layout'
import axios from 'axios'
import { toast } from 'react-toastify'
import {
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material'
import { useSelector } from 'react-redux'
import useSocket from '../../SocketContext'
import ChatModal from './components/ChatModal'

function Consult () {
  const [doctors, setDoctors] = useState([])
  const [elders, setElders] = useState([])
  const [selectedElder, setSelectedElder] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [appointmentDate, setAppointmentDate] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [chatModalOpen, setChatModalOpen] = useState(false) // New state for the chat modal
  const [chatDoctor, setChatDoctor] = useState(null) // New state for the selected doctor for chat
  const { user } = useSelector(s => s.auth)

  const fetchDoctors = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/api/doctors`)
      setDoctors(data)
    } catch (err) {
      toast.error('Failed to fetch doctors')
    } finally {
      setLoading(false)
    }
  }

  const fetchElders = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/elder/family/${user._id}`
      )
      setElders(data)
      if (data.length > 0) setSelectedElder(data[0]._id)
    } catch (err) {
      toast.error('Failed to fetch family members')
    }
  }

  const openModal = doctor => {
    setSelectedDoctor(doctor)
    setAppointmentDate('')
    setModalOpen(true)
  }

  const handleBook = async () => {
    if (!selectedElder || !appointmentDate) {
      toast.error('Please select all required fields')
      return
    }

    try {
      const payload = {
        patientId: selectedElder,
        doctorId: selectedDoctor._id,
        appointmentDate
      }

      await axios.post(
        `http://localhost:3001/api/appointments/book/${user._id}`,
        payload
      )
      toast.success('Appointment booked successfully')
      setModalOpen(false)
    } catch (err) {
      toast.error('Booking failed')
    }
  }

  // Open Chat Modal
  const handleOpenChat = doctor => {
    setChatDoctor(doctor)
    setChatModalOpen(true)
  }

  useEffect(() => {
    fetchDoctors()
    fetchElders()
  }, [])

  return (
    <div className='min-h-screen bg-gray-100 py-8 px-4'>
      <div className='max-w-5xl mx-auto'>
        <h1 className='text-2xl font-bold mb-6 text-blue-700'>
          Available Doctors
        </h1>

        <div className='mb-4'>
          <FormControl fullWidth>
            <InputLabel>Select Elderly Member</InputLabel>
            <Select
              value={selectedElder}
              label='Select Elderly Member'
              onChange={e => setSelectedElder(e.target.value)}
            >
              {elders.map(elder => (
                <MenuItem key={elder._id} value={elder._id}>
                  {elder.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {loading ? (
          <div className='loader mx-auto' />
        ) : doctors.length === 0 ? (
          <p className='text-gray-600'>No doctors found.</p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {doctors.map(doc => (
              <div
                key={doc._id}
                className='bg-white p-6 rounded-xl shadow hover:shadow-lg transition'
              >
                <h2 className='text-xl font-semibold text-gray-800'>
                  {doc.name}
                </h2>
                <p className='text-sm text-gray-600'>{doc.email}</p>
                <p className='text-sm mb-4 text-gray-600 mt-1'>
                  Phone: {doc.phone || 'N/A'}
                </p>

                <div className='flex gap-2 flex-wrap'>
                  <Button
                    variant='contained'
                    sx={{ fontSize: 10 }}
                    onClick={() => openModal(doc)}
                    disabled={!selectedElder}
                  >
                    Book Appointment
                  </Button>
                  <Button
                    variant='outlined'
                    sx={{ fontSize: 10 }}
                    onClick={() => handleOpenChat(doc)} // Open chat modal
                  >
                    Chat
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Appointment Date Modal */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>Choose Appointment Date</DialogTitle>
        <DialogContent>
          <TextField
            label='Appointment Date'
            type='datetime-local'
            fullWidth
            value={appointmentDate}
            onChange={e => setAppointmentDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button onClick={handleBook} variant='contained'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Chat Modal */}
      <Dialog open={chatModalOpen} onClose={() => setChatModalOpen(false)}>
        <ChatModal
          doctor={chatDoctor}
          userId={selectedElder}
          onClose={() => setChatModalOpen(false)}
        />
      </Dialog>
    </div>
  )
}

export default Layout(Consult)
