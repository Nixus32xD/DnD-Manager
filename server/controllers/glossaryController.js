import Class from "../models/Class.js";
import Species from "../models/Species.js";

// Función para normalizar strings (quita acentos, pasa a minúsculas)
const normalize = (str = "") =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();

export const searchGlossaryTerm = async (req, res) => {
  let { term } = req.query;

  if (!term)
    return res.status(400).json({ message: "Falta el término de búsqueda" });

  // Normalizamos el término buscado
  const normalizedTerm = normalize(term);

  try {
    // -----------------------------------------------
    // 🔍 1. BUSCAR EN CLASES (Features y Subclases)
    // -----------------------------------------------
    const classes = await Class.find({});

    for (const cls of classes) {
      // Buscar en progression.features
      for (const level of cls.progression) {
        for (const feat of level.features) {
          if (normalize(feat.name) === normalizedTerm) {
            return res.json({
              name: feat.name,
              type: "Rasgo de Clase",
              source: cls.name,
              description: feat.description,
            });
          }
        }
      }

      // Buscar en subclases
      for (const subclass of cls.subclasses || []) {
        for (const feature of subclass.features || []) {
          if (normalize(feature.name) === normalizedTerm) {
            return res.json({
              name: feature.name,
              type: "Rasgo de Subclase",
              source: `${cls.name} - ${subclass.name}`,
              description: feature.description,
            });
          }
        }
      }
    }

    // -----------------------------------------------
    // 🔍 2. BUSCAR EN ESPECIES (Traits)
    // -----------------------------------------------
    const species = await Species.find({});

    for (const sp of species) {
      for (const trait of sp.traits) {
        if (normalize(trait.name) === normalizedTerm) {
          return res.json({
            name: trait.name,
            type: "Rasgo de Especie",
            source: sp.name,
            description: trait.description,
          });
        }
      }
    }

    // -----------------------------------------------
    // ❌ Si no encuentra nada
    // -----------------------------------------------
    return res.status(404).json({ message: "Definición no encontrada" });
  } catch (error) {
    console.error("Error en glosario:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};
