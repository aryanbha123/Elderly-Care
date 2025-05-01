import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import {Server} from 'socket.io';
import dotenv from 'dotenv';
import chatRoutes from './chat.js';
import Message from './models/Message.js';
import Chat from './models/Chat.js';

// Initialize environment variables
dotenv.config();

// Initialize Express
const app = express();

// Set up HTTP server for Socket.io
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server ,  {
    cors : {
        origin: 'http://localhost:5173', // replace with your frontend origin
        methods: ['GET', 'POST'],
        credentials: true,
      }
});

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Use routes
app.use('/api/chat', chatRoutes);

// Socket.IO connection for real-time messaging
const users = {}; // To store connected users

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle user joining (identify user by chatId or userId)
  socket.on('joinChat', (chatId) => {
    users[socket.id] = chatId;
    console.log(`Socket ${socket.id} joined chat: ${chatId}`);
    socket.join(chatId); // Join the specific room for the chatId
  });

  // Handle incoming message event
  socket.on('sendMessage', async (data) => {
    const { chatId, senderId, content, type } = data;

    // Save the message to the database
    const newMessage = new Message({
      chatId,
      sender: senderId,
      content,
      type,
    });

    try {
      await newMessage.save();
      // Emit the new message to the specific chat room
      io.to(chatId).emit('receiveMessage', newMessage);
      // Optionally, update the latestMessage in the chat document
      await Chat.findByIdAndUpdate(chatId, { latestMessage: newMessage._id });
    } catch (err) {
      console.log('Error sending message:', err);
    }
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
    delete users[socket.id];
  });
});

// Server listening
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
