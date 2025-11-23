// server/routes/characterRoutes.js
import express from "express";
import { getCharacters, createCharacter } from "../controllers/characterController.js";

const router = express.Router();

// Como en index.js vamos a definir que esto responde a '/api/characters',
// acá solo usamos '/'
router.get("/", getCharacters);
router.post("/", createCharacter);

export default router;