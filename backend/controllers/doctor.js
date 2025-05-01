// controllers/doctorController.js
import Appointment from '../models/Appointment.js';
import User from '../models/User.js';
import moment from 'moment/moment.js';
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' }).select('-password');
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch doctors', error: err.message });
  }
};



// Existing booking logic
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

// ✅ Get today's appointments for a doctor
export const getTodaysAppointments = async (req, res) => {
  try {
    const { id } = req.params; // doctorId
    const startOfDay = moment().startOf('day').toDate();
    const endOfDay = moment().endOf('day').toDate();

    const appointments = await Appointment.find({
      doctorId: id,
      appointmentDate: { $gte: startOfDay, $lte: endOfDay },
    }).populate('userId')

    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch today’s appointments', error: err.message });
  }
};

// ✅ Get all upcoming appointments for a doctor
export const getUpcomingAppointments = async (req, res) => {
  try {
    const { id } = req.params; // doctorId
    const now = new Date();

    const appointments = await Appointment.find({
      doctorId: id,
      appointmentDate: { $gt: now },
    }).populate('userId')

    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch upcoming appointments', error: err.message });
  }
};

// ✅ Update appointment status
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params; // appointmentId
    const { status } = req.body;

    const updated = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update appointment status', error: err.message });
  }
};


export const getAllAppointments = async (req,res) => {
  try {
    const { id } = req.params; // doctorId
    const now = new Date();

    const appointments = await Appointment.find({
      doctorId: id,
    }).populate('userId')

    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch upcoming appointments', error: err.message });
  }
}