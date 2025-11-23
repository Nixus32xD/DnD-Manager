import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Bárbaro, Bardo...
  hitDie: Number, // 6, 8, 10, 12
  primaryAbility: [String], // ["Fuerza"] o ["Destreza", "Sabiduría"]
  savingThrows: [String],
  skillChoices: {
    count: Number,
    list: [String]
  },
  // Tabla de progresión
  progression: [{
    level: Number,
    proficiencyBonus: Number,
    features: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feature' }],
    spellSlots: [Number], // [4, 3, 3, 1...] para casters
    classSpecific: Object // Ej: Puntos de Furia, Daño de Furia, Dado de Artes Marciales
  }],
  subclasses: [{
    name: String, // Berserker, Árbol del Mundo...
    description: String,
    features: [{ 
        level: Number, 
        name: String, 
        description: String 
    }]
  }]
});

export default mongoose.model("Class", ClassSchema);