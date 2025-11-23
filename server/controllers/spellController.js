import Spell from "../models/Spell.js";

// 1. Listar Hechizos
export const getSpells = async (req, res) => {
    try {
        const spells = await Spell.find();
        res.json(spells);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};