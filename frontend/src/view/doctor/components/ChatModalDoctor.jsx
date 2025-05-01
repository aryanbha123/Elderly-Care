import { useEffect, useState, useRef } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import axios from "axios";
import socket from "../../socket";
import { useSelector } from "react-redux";

function DoctorChatModal({ elderly, onClose }) {
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const messagesEndRef = useRef(null);
  const { user } = useSelector(s => s.auth);

  useEffect(() => {
    const createOrFetchChat = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/chat/create", {
          participant2: user._id,
          participant1: elderly._id,
        });

        const chatId = res.data._id;
        setChatId(chatId);
        socket.emit("joinChat", chatId); // Doctor joins chat room

        const messagesRes = await axios.get(`http://localhost:5000/api/chat/${chatId}/messages`);
        setMessages(messagesRes.data);
      } catch (error) {
        console.error("Error setting up chat:", error);
      }
    };

    createOrFetchChat();
  }, [elderly, user]);

  useEffect(() => {
    const handleNewMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("receiveMessage", handleNewMessage);

    return () => {
      socket.off("receiveMessage", handleNewMessage); // Unsubscribe from the event on component unmount
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!newMsg.trim() || !chatId) return;

    const messageData = {
      chatId,
      senderId: user._id,
      content: newMsg,
      type: "text",
    };

    try {
    

      socket.emit("sendMessage", messageData);

      setNewMsg(""); 
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <Paper elevation={4} sx={{ p: 2, maxWidth: 500, margin: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Chat with {elderly?.name}
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
              textAlign: (msg.sender._id == user._id || msg.sender == user._id) ? "right" : "left",
              mb: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                display: "inline-block",
                bgcolor:  (msg.sender._id == user._id || msg.sender == user._id)? "#1976d2" : "#e0e0e0",
                color:  (msg.sender._id == user._id || msg.sender == user._id)? "#fff" : "#000",
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

export default DoctorChatModal;
