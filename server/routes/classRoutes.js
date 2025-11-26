import express from "express";
import { getAllClasses, getClassById } from "../controllers/classController.js";

const router = express.Router();

router.get("/", getAllClasses);
router.get("/:id", getClassById);

export default router;