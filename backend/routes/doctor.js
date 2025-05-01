// routes/doctorRoutes.js
import express from 'express';
import { getAllAppointments, getAllDoctors, getTodaysAppointments, getUpcomingAppointments, updateAppointmentStatus } from '../controllers/doctor.js';
const router = express.Router();

router.get('/', getAllDoctors);
router.get('/:id' ,getAllAppointments);

router.get('/today/:id', getTodaysAppointments);        // id = ID
router.get('/upcoming/:id', getUpcomingAppointments);   // id = ID
router.put('/status/:id', updateAppointmentStatus); 
export default router;
