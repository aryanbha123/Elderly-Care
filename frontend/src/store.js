import { configureStore } from "@reduxjs/toolkit";
import authReducer from './redux/userSlice'
import socketReducer from './redux/socket';
const store = configureStore({
    reducer:{
        'auth' : authReducer,
        'socket' : socketReducer
    }
})

export default store;