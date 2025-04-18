import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import {corsConfig} from './lib/config.js';
import { connectDb } from './lib/conn.js';
configDotenv();
const app = express();
const PORT = process.env.PORT;
const URI = process.env.URI;

// ----------- Database Conn -------------------
connectDb(URI);

// ----------- Middleware Setup ----------------
app.use(express.json());
app.use(cors(corsConfig))

// ----------- Route Setup ---------------------



app.listen(PORT , () => {
    console.log("Server live on  " + PORT );
})