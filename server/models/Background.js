import mongoose from "mongoose";

const BackgroundSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Acólito, Criminal, Soldado...
  abilityScores: [String], // Las 3 opciones: ["Fuerza", "Constitución", "Carisma"]
  feat: { type: mongoose.Schema.Types.ObjectId, ref: 'Feat' }, // Dote de Origen obligatoria
  skillProficiencies: [String], // 2 Habilidades fijas
  toolProficiencies: [String], // 1 Herramienta fija
  equipment: [String], // Lista de IDs de items o strings
  description: String
});

export default mongoose.model("Background", BackgroundSchema);