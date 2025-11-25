import Species from "../models/Species.js"

export const getSpecies = async (req, res) => {
    try {
        const species = await Species.find();
        res.json(species);       
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// 2. Obtener una Especie por ID
export const getSpeciesById = async (req, res) => {
    try {
        const species = await Species.findById(req.params.id);
        if (!species) {
            return res.status(404).json({ message: "Especie no encontrada" });
        }   
        res.json(species);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};