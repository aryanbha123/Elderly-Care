import express from 'express';
import Chat from './models/Chat.js';
import Message from './models/Message.js';
import User from './models/User.js';

const router = express.Router();

// Create or get a chat between two participants (Family & Doctor)
router.post('/create', async (req, res) => {
  const { participant1, participant2 } = req.body;

  try {
    // Check if chat already exists between these two participants
    let chat = await Chat.findOne({
      participants: { $all: [participant1, participant2] }
    });

    if (!chat) {
        console.log("NEW CHAT CREATED")
      chat = new Chat({
        participants: [participant1, participant2],
        chatName: 'Family-Doctor Chat',
      });
      await chat.save();
    }

    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json({ message: 'Error creating chat', error: err });
  }
});

// Fetch chat history
router.get('/:chatId/messages', async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await Message.find({ chatId })
      .populate('sender', 'name') // Populate sender's name
      .sort({ timestamp: 1 }); // Sort by timestamp to get messages in order
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching messages', error: err });
  }
});

// Add a new message to a chat
router.post('/:chatId/messages', async (req, res) => {
  const { chatId } = req.params;
  const { senderId, content, type = 'text' } = req.body;

  try {
    // Create a new message
    const message = new Message({
      chatId,
      sender: senderId,
      content,
      type,
    });

    // Save the message to the database
    await message.save();

    // Update the latest message in the chat document
    await Chat.findByIdAndUpdate(chatId, { latestMessage: message._id });

    // Send the new message as a response
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: 'Error sending message', error: err });
  }
});

// Fetch a chat based on chat ID
router.get('/:chatId', async (req, res) => {
  const { chatId } = req.params;

  try {
    const chat = await Chat.findById(chatId).populate('participants');
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching chat', error: err });
  }
});

export default router;
