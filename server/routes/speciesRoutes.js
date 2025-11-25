import express from "express"
import { getSpecies, getSpeciesById } from "../controllers/speciesController.js"

const router = express.Router();

router.get("/", getSpecies)
router.get("/:id", getSpeciesById)

export default router;