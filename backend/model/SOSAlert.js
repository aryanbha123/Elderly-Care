const sosAlertSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    location: {
      lat: Number,
      lng: Number,
    },
    resolved: { type: Boolean, default: false },
    message: String,
  }, { timestamps: true });
  
  export default mongoose.model('SOSAlert', sosAlertSchema);
