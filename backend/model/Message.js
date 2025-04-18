const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    read: { type: Boolean, default: false }
  }, { timestamps: true });
  
  export default mongoose.model('Message', messageSchema);
  