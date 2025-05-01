import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import doctorRoutes from './routes/doctor.js';
import appointmentRoutes from './routes/appointment.js';
import careBookings from './routes/careTakerBookings.js';
import careRoutes from './routes/careTakers.js';
import elderRouter from './routes/elderly.js';
import cors from 'cors';
import CaregiverBooking from './models/CaregiverBooking.js';
import Appointment from './models/Appointment.js';
dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  }));
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/care', careRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/careTakerBookings' ,careBookings)
app.use('/api/elder',elderRouter)




app.get('/api/history/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const caregiverBookings = await CaregiverBooking.find({ userId: id })
      .populate('caregiverId', 'name email phone')
      .sort({ createdAt: -1 });

    const appointments = await Appointment.find({ userId: id })
      .populate('doctorId', 'name email specialization')
      .sort({ appointmentDate: -1 });

    res.status(200).json({
      caregiverBookings,
      appointments
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });
}).catch(err => console.log(err));
