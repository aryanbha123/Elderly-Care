import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  age: Number,
  phone: String,
  address: String,
  role: { type: String, enum: ['elderly', 'caregiver', 'doctor', 'family', 'admin'], required: true },
  medicalHistory: [String], // Optional for elderly
  profileImage: String,
}, { timestamps: true });

export default mongoose.model('User', userSchema);
