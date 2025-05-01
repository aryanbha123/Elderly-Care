import { createSlice } from "@reduxjs/toolkit";
import { getProfile } from "./thunks/userThunk";

const initialState = {
  user: null,
  loading: true,
  error: null
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = action.payload || "Failed to fetch profile";
      });
  }
});

export const { setUser, setLoading } = userSlice.actions;
export default userSlice.reducer;
