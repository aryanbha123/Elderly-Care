const notificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: String,
    read: { type: Boolean, default: false }
  }, { timestamps: true });
  
  export default mongoose.model('Notification', notificationSchema);
  