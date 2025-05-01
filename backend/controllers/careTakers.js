// controllers/doctorController.js
import User from '../models/User.js';

export const getAllCareTakers = async (req, res) => {
  try {
    const doctors = await User.find({ role: 'caregiver' }).select('-password');
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch doctors', error: err.message });
  }
};
