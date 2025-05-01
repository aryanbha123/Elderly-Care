// routes/doctorRoutes.js
import express from 'express';
import { getAllCareTakers } from '../controllers/careTakers.js';
const router = express.Router();

router.get('/', getAllCareTakers);
export default router;
