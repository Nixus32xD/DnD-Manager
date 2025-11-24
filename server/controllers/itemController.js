import Item from '../models/Item.js'; // Asumiendo que exportaste el modelo desde un archivo separado o lo definiste ahí mismo.

export const getItems = async (req, res) => {
    try {
        const { category, subcategory, search } = req.query;
        let query = {};

        if (category) query.category = category;
        if (subcategory) query.subcategory = subcategory;
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        const items = await Item.find(query).sort({ name: 1 });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: "Error al recuperar el equipo." });
    }
};

export const getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "Objeto no encontrado." });
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: "Error al buscar el objeto." });
    }
};