import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Barbarian, Bard...
  description: String, // Breve descripción de sabor
  hitDie: { type: Number, required: true }, // 6, 8, 10, 12

  // Requisitos y Stats
  primaryAbility: [String], // ["Strength"]
  savingThrows: [String], // ["Strength", "Constitution"]

  // Proficiencias fijas de nivel 1
  proficiencies: {
    armor: [String], // ["Light", "Medium", "Shields"]
    weapons: [String], // ["Simple", "Martial"]
    tools: [String], // ["Thieves' Tools", "Lute"]
  },

  // Elección de Habilidades (Skills)
  skillChoices: {
    count: { type: Number, default: 2 },
    list: [String], // ["Athletics", "Perception", "Survival"...]
  },

  // Equipo Inicial (Simplificado para mostrar opciones)
  startingEquipment: [String], // ["Explora's Pack", "Greataxe"]

  // --- CONFIGURACIÓN DE LA TABLA VISUAL ---
  // Esto le dice al frontend qué columnas dibujar aparte de Nivel y PB
  tableMetadata: {
    columns: [
      {
        label: String, // Ej: "Rage Damage" o "Sneak Attack"
        dataKey: String, // La clave para buscar en 'classSpecific' (ej: "rageDmg")
      },
    ],
  },

  // --- TABLA DE PROGRESIÓN (Lógica Nivel por Nivel) ---
  progression: [
    {
      level: { type: Number, required: true },
      proficiencyBonus: { type: Number, required: true },

      // Features que se ganan en este nivel
      features: [
        {
          name: String,
          description: String,
          ref: { type: mongoose.Schema.Types.ObjectId, ref: "Feature" }, // Opcional si ya las tenés en DB
        },
      ],

      // Espacios de Conjuro (Si es caster) - Array de 9 posiciones
      // Ej: [4, 2, 0, 0...] para nivel 3 de Mago
      spellSlots: { type: [Number], default: [] },

      // Datos dinámicos de la clase (Acá va la data de las columnas extra)
      // Ej: { rageDmg: "+2", rages: 2 } o { sneakAttack: "1d6" }
      classSpecific: { type: Map, of: mongoose.Schema.Types.Mixed },
    },
  ],

  // Subclases (Se eligen a nivel 3 normalmente)
  subclasses: [
    {
      name: String, // Path of the Berserker
      description: String,

      // --- NUEVO CAMPO: Lista de Conjuros Ampliada ---
      expandedSpells: [
        {
          spellLevel: Number, // Ej: 1, 2, 3, 4, 5
          list: [String], // Ej: ["Fuego Feérico", "Dormir"]
        },
      ],
      // -----------------------------------------------

      features: [
        {
          level: Number,
          name: String,
          description: String,
        },
      ],
    },
  ],
  // --- NUEVO CAMPO PARA LISTAS EXTRA (Invocaciones, Metamagia, etc.) ---
  optionalFeatures: [
    {
      title: String, // Ej: "Invocaciones Sobrenaturales"
      description: String, // Ej: "A nivel 2 ganas 2 invocaciones..."
      items: [
        {
          name: String,
          requirements: String, // Ej: "Nivel 5, Pacto del Filo"
          description: String,
        },
      ],
    },
  ],
});

export default mongoose.model("Class", ClassSchema);
