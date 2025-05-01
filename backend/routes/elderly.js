// routes/elderlyRoutes.js
import express from 'express';
import {
  createElderly,
  getAllElderly,
  getElderlyById,
  getElderlyByFamilyId,
  updateElderly,
  deleteElderly
} from '../controllers/elderly.js';

const router = express.Router();

router.post('/', createElderly);                // Create
router.get('/', getAllElderly);                 // Read All
router.get('/:id', getElderlyById);             // Read One
router.get('/family/:familyId', getElderlyByFamilyId); // Read by Family ID
router.put('/:id', updateElderly);              // Update
router.delete('/:id', deleteElderly);           // Delete

export default router;
