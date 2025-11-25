import mongoose from "mongoose";

const SpeciesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  creatureType: { type: String, default: 'Humanoid' },
  size: { type: String, enum: ['Small', 'Medium'], default: 'Medium' },
  speed: { type: Number, default: 9 },
  darkvision: { type: Number, default: 0 },
  
  // Rasgos normales
  traits: [{
    name: String,
    description: String,
  }],

  // --- NUEVO: Tabla de Referencia (Opcional) ---
  table: {
    title: String,      // Ej: "Ancestros Dracónicos"
    headers: [String],  // Ej: ["Dragón", "Tipo de Daño"]
    rows: [[String]]    // Matriz de datos: [ ["Rojo", "Fuego"], ["Azul", "Rayo"] ]
  }
});

export default mongoose.model("Species", SpeciesSchema);