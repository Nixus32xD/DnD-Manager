import express from "express";
import { searchGlossaryTerm } from "../controllers/glossaryController.js";

const router = express.Router();

// GET /api/glossary?term=Furia
router.get("/", searchGlossaryTerm);

export default router;