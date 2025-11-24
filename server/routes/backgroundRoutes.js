import express from 'express';
import { getBackgrounds, getBackgroundById } from '../controllers/backgroundController.js';

const router = express.Router();

router.get('/', getBackgrounds);
router.get('/:id', getBackgroundById);

export default router;