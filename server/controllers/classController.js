import Class from "../models/Class.js";

export const getAllClasses = async (req, res) => {
  try {
    // Traemos todo, ordenado por nombre
    const classes = await Class.find().sort({ name: 1 });
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getClassById = async (req, res) => {
  try {
    const singleClass = await Class.findById(req.params.id);
    if (!singleClass) return res.status(404).json({ message: "Clase no encontrada" });
    res.json(singleClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};