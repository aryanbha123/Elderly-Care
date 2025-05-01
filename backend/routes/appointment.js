// routes/appointmentRoutes.js
import express from 'express';
import { bookAppointment } from '../controllers/appointment.js';

const router = express.Router();

router.post('/book/:id', bookAppointment);
export default router;
