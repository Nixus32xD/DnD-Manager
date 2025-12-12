import express from "express";
import {
  getCharacters,
  levelUpCharacter,
  createCharacter,
  getCharacterById,
  updateCharacter, // <--- Asegurate de importar esto
  deleteCharacter, // <--- Y esto
} from "../controllers/characterController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Todas las rutas protegidas con 'protect' para asegurar que hay usuario logueado
router.get("/", protect, getCharacters); // Listar (Solo los míos)
router.post("/", protect, createCharacter); // Crear (Asignado a mí)

router.get("/:id", protect, getCharacterById); // Ver Uno (Si es mío)
router.put("/:id", protect, updateCharacter); // Editar (Si es mío)
router.delete("/:id", protect, deleteCharacter); // Borrar (Si es mío)
router.patch("/:id/level-up", protect, levelUpCharacter);

export default router;
