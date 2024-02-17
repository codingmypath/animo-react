import express from 'express';
import { createEntry, deleteEntry, updateEntry, getEntry } from '../controllers/entry.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createEntry);
router.delete('/delete/:id', verifyToken, deleteEntry);
router.post('/update/:id', verifyToken, updateEntry);
router.get('/get/:id', getEntry);


export default router;