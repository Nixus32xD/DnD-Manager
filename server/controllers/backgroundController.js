import Background from '../models/background.js';

export const getBackgrounds = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        // Importante: populate('feat') rellena la info de la Dote relacionada
        const backgrounds = await Background.find(query)
            .populate('feat') 
            .sort({ name: 1 });

        res.status(200).json(backgrounds);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al recuperar los orígenes." });
    }
};

export const getBackgroundById = async (req, res) => {
    try {
        const background = await Background.findById(req.params.id).populate('feat');
        if (!background) return res.status(404).json({ message: "Trasfondo no encontrado." });
        res.status(200).json(background);
    } catch (error) {
        res.status(500).json({ message: "Error al buscar el trasfondo." });
    }
};