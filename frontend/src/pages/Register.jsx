import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {Button} from '@mui/material'
const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'elderly',
    phone: '',
    address: '',
    degree: '',
    specialization: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/auth/signup', formData);
      toast.success('Registration successful!');
      console.log(res.data);
    } catch (err) {
      toast.error('Registration failed!');
      console.error(err.response?.data || err.message);
    }
  };

  const degreeOptions = ['MBBS', 'MD', 'DO', 'BAMS', 'BHMS'];
  const specializationOptions = ['Cardiologist', 'Dermatologist', 'General Physician', 'Neurologist', 'Pediatrician'];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>

        <input
          name="name"
          onChange={handleChange}
          required
          placeholder="Name"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
        />

        <select
          name="role"
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
        >
          <option value="elderly">Elderly</option>
          <option value="doctor">Doctor</option>
          <option value="family">Family</option>
          <option value="caregiver">Caregiver</option>
        </select>

        {formData.role === 'doctor' && (
          <>
            <select
              name="degree"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
            >
              <option value="">Select Degree</option>
              {degreeOptions.map((deg, idx) => (
                <option key={idx} value={deg}>{deg}</option>
              ))}
            </select>

            <select
              name="specialization"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
            >
              <option value="">Select Specialization</option>
              {specializationOptions.map((spec, idx) => (
                <option key={idx} value={spec}>{spec}</option>
              ))}
            </select>
          </>
        )}

        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
        />

        <input
          name="address"
          placeholder="Address"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded"
        />

        <Button
          type="submit"
          fullWidth
          variant='contained'
          sx={{
            fontSize:9
          }}
        >
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
