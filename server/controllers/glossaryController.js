import Class from "../models/Class.js";
import Species from "../models/Species.js";
import Spell from "../models/Spell.js"; // <--- Importamos el modelo de Conjuros

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
              source: `${cls.name} (Nivel ${level.level})`,
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
        
        // Buscar en opciones de clase (ej: Invocaciones del Brujo)
        if (cls.optionalFeatures) {
            for (const opt of cls.optionalFeatures) {
                for (const item of opt.items) {
                    if (normalize(item.name) === normalizedTerm) {
                        return res.json({
                            name: item.name,
                            type: opt.title, // Ej: "Invocación Sobrenatural"
                            source: cls.name,
                            description: item.description
                        });
                    }
                }
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
    // 🔍 3. BUSCAR EN CONJUROS (Spells)
    // -----------------------------------------------
    // Traemos todos para poder usar la función normalize en JS
    // (Si la base crece a miles, esto se debería optimizar con índices de texto en Mongo)
    const spells = await Spell.find({}); 

    for (const spell of spells) {
        if (normalize(spell.name) === normalizedTerm) {
            return res.json({
                name: spell.name,
                // Mostramos si es Truco o el Nivel
                type: spell.level === 0 ? "Truco" : `Conjuro Nivel ${spell.level}`,
                source: spell.school, // Ej: "Evocación"
                description: spell.description
            });
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