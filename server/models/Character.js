// server/models/Character.js
import mongoose from "mongoose";

const CharacterSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  level: { type: Number, default: 1 },
  image: String, // URL de imagen
  
  // Referencias Core (Elecciones de creación)
  species: { type: mongoose.Schema.Types.ObjectId, ref: 'Species' },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  subclass: { type: String }, // Nombre de la subclase elegida (ej: "Evocador")
  background: { type: mongoose.Schema.Types.ObjectId, ref: 'Background' },
  
  // Stats (Base + Modificadores)
  stats: {
    strength: { value: Number, mod: Number, save: Boolean },
    dexterity: { value: Number, mod: Number, save: Boolean },
    constitution: { value: Number, mod: Number, save: Boolean },
    intelligence: { value: Number, mod: Number, save: Boolean },
    wisdom: { value: Number, mod: Number, save: Boolean },
    charisma: { value: Number, mod: Number, save: Boolean }
  },

  // Combate
  hp: { current: Number, max: Number, temp: Number },
  ac: Number,
  initiative: Number,
  speed: Number,
  hitDice: { total: Number, current: Number, die: String },
  deathSaves: { successes: Number, failures: Number },

  // Capacidades
  proficiencies: {
    skills: [String], // ["Atletismo", "Sigilo"]
    tools: [String],
    languages: [String],
    weapons: [String],
    armor: [String]
  },

  // Magia
  spellcasting: {
    ability: String, // "Inteligencia"
    saveDC: Number,
    attackBonus: Number,
    slots: {
      1: { max: Number, current: Number },
      2: { max: Number, current: Number },
      // ... hasta 9
    },
    prepared: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Spell' }],
    known: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Spell' }]
  },

  // Inventario y Equipo
  inventory: [{
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    quantity: { type: Number, default: 1 },
    equipped: { type: Boolean, default: false },
    customName: String // Por si le pone nombre a su espada
  }],
  
  wallet: {
    cp: Number,
    sp: Number,
    ep: Number,
    gp: Number,
    pp: Number
  },

  // Rasgos y Dotes (Acumulativo de Especie + Clase + Trasfondo)
  features: [{
    name: String,
    source: String, // "Clase", "Dote", "Especie"
    description: String,
    uses: { max: Number, current: Number, reset: String } // "Largo", "Corto"
  }],

  // Lore
  alignment: String,
  appearance: String,
  backstory: String,
  notes: String

}, { timestamps: true });

export default mongoose.model("Character", CharacterSchema);
