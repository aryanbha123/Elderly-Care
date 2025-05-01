import { useEffect, useState, useRef } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import axios from "axios";
import socket from "../../socket";
import { useSelector } from "react-redux";

function ChatModal({ doctor,userId,  onClose }) {
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const createOrFetchChat = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/chat/create", {
          participant1: userId,
          participant2: doctor._id,
        });

        const chatId = res.data._id;
        setChatId(chatId);
        socket.emit("joinChat", chatId);

        const messagesRes = await axios.get(`http://localhost:5000/api/chat/${chatId}/messages`);
        setMessages(messagesRes.data);
      } catch (error) {
        console.error("Error setting up chat:", error);
      }
    };

    createOrFetchChat();
  }, [doctor, userId]);

  useEffect(() => {
    const handleNewMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("receiveMessage", handleNewMessage);

    return () => {
      socket.off("receiveMessage", handleNewMessage);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!newMsg.trim() || !chatId) return;

    const messageData = {
      chatId,
      senderId: userId,
      content: newMsg,
      type: "text",
    };

    try {
      // Save the message to the backend
    //   await axios.post(`http://localhost:5000/api/chat/${chatId}/messages`, messageData);

      // Emit the message via socket to broadcast to the other user (this should be done only once)
      socket.emit("sendMessage", messageData);

      setNewMsg(""); // Clear the input after sending the message
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <Paper elevation={4} sx={{ p: 2, maxWidth: 500, margin: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Chat with Dr. {doctor?.name}
      </Typography>

      <Box
        sx={{
          height: 300,
          overflowY: "auto",
          border: "1px solid #ccc",
          borderRadius: 2,
          p: 1,
          mb: 2,
          bgcolor: "#f9f9f9",
        }}
      >
        {messages.map((msg) => (
          <Box
            key={msg._id}
            sx={{
              textAlign: (msg.sender._id == userId || msg.sender == userId) ? "right" : "left",
              mb: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                display: "inline-block",
                bgcolor: (msg.sender._id == userId || msg.sender == userId)? "#1976d2" : "#e0e0e0",
                color: (msg.sender._id == userId || msg.sender == userId) ? "#fff" : "#000",
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
              }}
            >
              {msg.content}
            </Typography>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      <Box display="flex" gap={1}>
        <TextField
          fullWidth
          size="small"
          placeholder="Type a message..."
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
        />
        <Button variant="contained" onClick={handleSend}>
          Send
        </Button>
      </Box>

      <Button variant="text" color="error" onClick={onClose} sx={{ mt: 2 }}>
        Close
      </Button>
    </Paper>
  );
}

export default ChatModal;
