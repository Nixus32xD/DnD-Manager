import Feat from '../models/Feat.js';

// 1. Listar Dotes
export const getFeats = async (req, res) => {
    try {
        const feats = await Feat.find();
        res.json(feats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}