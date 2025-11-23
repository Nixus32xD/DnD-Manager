import mongoose from "mongoose";

const SpellSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  level: { type: Number, required: true }, // 0 para Trucos
  school: { type: String, required: true }, // Evocación, Abjuración, etc.
  castingTime: { type: String, required: true }, // "1 Acción", "Acción Adicional"
  range: { type: String, required: true }, // "18 m", "Toque"
  components: {
    verbal: { type: Boolean, default: false },
    somatic: { type: Boolean, default: false },
    material: { type: Boolean, default: false },
    materialDescription: String, // "Una perla que valga al menos 100 po"
    cost: Number, // Para calcular gastos
    consumed: Boolean, // Si el material se gasta
  },
  duration: { type: String, required: true },
  concentration: { type: Boolean, default: false },
  ritual: { type: Boolean, default: false },
  description: { type: String, required: true }, // Texto completo
  higherLevels: String, // Descripción de escalado
  classes: [String], // ["Mago", "Hechicero"] - Importante para filtros de creación
  source: { type: String, default: "PHB 2024" },
});

export default mongoose.model("Spell", SpellSchema);