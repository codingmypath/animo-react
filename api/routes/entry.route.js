import express from 'express';
import { createEntry, deleteEntry, updateEntry, } from '../controllers/entry.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createEntry);
router.delete('/delete/:id', verifyToken, deleteEntry);
router.post('/update/:id', verifyToken, updateEntry);


export default router;