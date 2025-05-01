// controllers/appointmentController.js
import Appointment from '../models/Appointment.js';

export const bookAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, appointmentDate } = req.body;

    const newAppointment = await Appointment.create({
      userId: patientId,
      doctorId,
      appointmentDate,
      status: 'Pending',
      bookedBy: req.params.id, // family member ID
    });

    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(500).json({ message: 'Failed to book appointment', error: err.message });
  }
};
