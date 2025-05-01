// models/EmergencyAlert.js
import mongoose from 'mongoose';

const emergencyAlertSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, default: Date.now },
  location: { type: String, required: true }, // e.g., GPS coordinates
  status: {
    type: String,
    enum: ['Alerted', 'Resolved'],
    default: 'Alerted',
  },
}, { timestamps: true });

const EmergencyAlert = mongoose.model('EmergencyAlert', emergencyAlertSchema);
export default EmergencyAlert;
