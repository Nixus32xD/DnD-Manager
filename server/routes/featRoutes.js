import express from 'express';
import { getFeats } from '../controllers/featController.js';

const router = express.Router();
// Como en index.js vamos a definir que esto responde a '/api/feats',
// acá solo usamos '/'
router.get('/', getFeats);

export default router;