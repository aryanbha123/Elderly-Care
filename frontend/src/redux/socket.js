import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    socketId: null,
};

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setSocketId: (state, action) => {
            state.socketId = action.payload;
        },
    },
});

export default socketSlice.reducer;
export const { setSocketId } = socketSlice.actions;
