// models/CaregiverBooking.js
import mongoose from 'mongoose';

const caregiverBookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  caregiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceType: {
    type: String,
    enum: ['Cleaning', 'Cooking', 'Assistance'],
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending',
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

const CaregiverBooking = mongoose.model('CaregiverBooking', caregiverBookingSchema);
export default CaregiverBooking;
