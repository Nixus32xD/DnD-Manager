import express from "express";
import { getSpells} from "../controllers/spellController.js";

const router = express.Router();
// Como en index.js vamos a definir que esto responde a '/api/spells',
// acá solo usamos '/'
router.get("/", getSpells);

export default router;