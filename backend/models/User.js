import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String, // can be auto-generated or optional for elderly
  role: {
    type: String,
    enum: ['elderly', 'caregiver', 'doctor', 'family'],
    required: true
  },
  phone: String,
  address: String,
  degree: {
    type: String,
    required: function () {
      return this.role === 'doctor';
    }
  },
  specialization: {
    type: String,
    required: function () {
      return this.role === 'doctor';
    }
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // elder 
}, { timestamps: true });

userSchema.pre('save', function (next) {
  if (this.role === 'doctor' && (!this.degree || !this.specialization)) {
    return next(new Error('Doctor must have degree and specialization.'));
  }
  next();
});

const User = mongoose.model('User', userSchema);
export default User;
