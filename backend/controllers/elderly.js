import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// 1. Create a new elderly (by family)
export const createElderly = async (req, res) => {
  try {
    const { name, email, phone, address, createdBy } = req.body;

    // check if email already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Elderly with this email already exists' });
    }

    const defaultPassword = await bcrypt.hash('Elderly@123', 10);

    const elderly = await User.create({
      name,
      email,
      phone,
      address,
      password: defaultPassword,
      role: 'elderly',
      createdBy,
    });

    res.status(201).json(elderly);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create elderly', error: err.message });
  }
};

// 2. Get all elderly (for admin use, optional)
export const getAllElderly = async (req, res) => {
  try {
    const elderlyList = await User.find({ role: 'elderly' }).select('-password');
    res.status(200).json(elderlyList);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch elderly', error: err.message });
  }
};

// 3. Get one elderly by ID
export const getElderlyById = async (req, res) => {
  try {
    const elderly = await User.findOne({ _id: req.params.id, role: 'elderly' }).select('-password');
    if (!elderly) {
      return res.status(404).json({ message: 'Elderly not found' });
    }
    res.status(200).json(elderly);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch elderly', error: err.message });
  }
};

// 4. Get all elderly by family ID
export const getElderlyByFamilyId = async (req, res) => {
  try {
    const family = await User.findById(req.params.familyId);
    if (!family || family.role !== 'family') {
      return res.status(400).json({ message: 'Invalid family ID' });
    }

    const elderlyList = await User.find({ role: 'elderly', createdBy: family._id }).select('-password');
    res.status(200).json(elderlyList);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch elderly', error: err.message });
  }
};

// 5. Update elderly (name, phone, address)
export const updateElderly = async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    const elderly = await User.findOneAndUpdate(
      { _id: req.params.id, role: 'elderly' },
      { name, phone, address },
      { new: true }
    ).select('-password');

    if (!elderly) {
      return res.status(404).json({ message: 'Elderly not found' });
    }

    res.status(200).json(elderly);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update elderly', error: err.message });
  }
};

// 6. Delete elderly
export const deleteElderly = async (req, res) => {
  try {
    const result = await User.findOneAndDelete({ _id: req.params.id, role: 'elderly' });

    if (!result) {
      return res.status(404).json({ message: 'Elderly not found' });
    }

    res.status(200).json({ message: 'Elderly deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete elderly', error: err.message });
  }
};
