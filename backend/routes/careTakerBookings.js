import express from 'express';
import CaregiverBooking from '../models/CaregiverBooking.js';
import mongoose from 'mongoose';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newBooking = new CaregiverBooking(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedBooking = await CaregiverBooking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) return res.status(404).json({ error: 'Booking not found' });
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:caregiverId', async (req, res) => {
  try {
    const { caregiverId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(caregiverId)) {
      return res.status(400).json({ error: 'Invalid caregiver ID' });
    }

    const bookings = await CaregiverBooking.find({ caregiverId }).populate('userId', 'name email');
    res.json(bookings);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error });
  }
});

router.get('/bookings/today/:caregiverId', async (req, res) => {
  try {
    const { caregiverId } = req.params;
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const bookings = await CaregiverBooking.find({
      caregiverId,
      createdAt: { $gte: start, $lte: end }
    }).populate('userId', 'name email');

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch today\'s bookings' });
  }
});

router.put('/bookings/:bookingId/status', async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    if (!['Pending', 'Completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const updatedBooking = await CaregiverBooking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update booking status' });
  }
});

export default router;
