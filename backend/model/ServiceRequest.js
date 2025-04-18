const serviceRequestSchema = new mongoose.Schema({
    elderly: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    caregiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    serviceType: { type: String, enum: ['cleaning', 'cooking', 'bathing', 'companion'] },
    date: Date,
    time: String,
    status: { type: String, enum: ['requested', 'accepted', 'completed', 'cancelled'], default: 'requested' },
    notes: String
  }, { timestamps: true });
  
  export default mongoose.model('ServiceRequest', serviceRequestSchema);
  