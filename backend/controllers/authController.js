import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// SIGNUP
export const registerUser = async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    phone,
    address,
    degree,
    specialization
  } = req.body;

  try {
    console.log("req received");

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      address,
    };

    if (role === 'doctor') {
      if (!degree || !specialization) {
        return res.status(400).json({ message: 'Degree and specialization are required for doctors' });
      }
      userData.degree = degree;
      userData.specialization = specialization;
    }

    const user = await User.create(userData);

    const token = generateToken(user._id);
    res.status(201).json({ user, token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};


// LOGIN
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = generateToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};


// controllers/authController.js
export const getProfile = async (req, res) => {
    try {
      res.status(200).json(req.user); // req.user set by authMiddleware
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch profile', error: err.message });
    }
  };
  