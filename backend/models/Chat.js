// models/Chat.js
import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  participants: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  ],
  latestMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  },
  chatName: { type: String, default: '' }, // only used if group
}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;
