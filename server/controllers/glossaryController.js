import Class from "../models/Class.js";
import Species from "../models/Species.js";

export const searchGlossaryTerm = async (req, res) => {
  const { term } = req.query;

  if (!term)
    return res.status(400).json({ message: "Falta el término de búsqueda" });

  try {
    // Cremaos una expresión regular para buscar sin importar mayúsculas/minúsculas
    // El ^ y $ aseguran que busque la frase exacta (ej: "Furia" y no "Furia de la naturaleza")
    const regex = new RegExp(`^${term}$`, "i");

    // --- 1. BUSCAR EN CLASES (Rasgos) ---
    // Buscamos una clase que tenga un feature con ese nombre en su progresión
    const classDoc = await Class.findOne({
      "progression.features.name": regex,
    });

    if (classDoc) {
      // Mongo devuelve todo el documento, así que filtramos en JS para sacar solo el rasgo
      let foundFeature = null;

      // Recorremos los niveles para encontrar el feature específico
      classDoc.progression.forEach((level) => {
        const feat = level.features.find((f) => regex.test(f.name));
        if (feat) foundFeature = feat;
      });

      if (foundFeature) {
        return res.json({
          name: foundFeature.name,
          type: "Rasgo de Clase",
          source: classDoc.name, // Ej: "Bárbaro"
          description: foundFeature.description,
        });
      }
    }

    // --- 2. BUSCAR EN ESPECIES (Rasgos Raciales) ---
    const speciesDoc = await Species.findOne({ "traits.name": regex });

    if (speciesDoc) {
      const trait = speciesDoc.traits.find((t) => regex.test(t.name));

      if (trait) {
        return res.json({
          name: trait.name,
          type: "Rasgo de Especie",
          source: speciesDoc.name, // Ej: "Elfo"
          description: trait.description,
        });
      }
    }

    // Si no encuentra nada
    return res.status(404).json({ message: "Definición no encontrada" });
  } catch (error) {
    console.error("Error en glosario:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};
