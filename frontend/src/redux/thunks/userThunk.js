import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
          return rejectWithValue("No token found");
        }
        console.log("Token")  

      const res = await axios.get("http://localhost:3001/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true // 
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Unknown error");
    }
  }
);
