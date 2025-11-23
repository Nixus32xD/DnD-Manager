import mongoose from "mongoose";

const SpeciesSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Humano, Elfo, Orco, etc.
  creatureType: { type: String, default: 'Humanoid' },
  size: { type: String, enum: ['Small', 'Medium'], default: 'Medium' },
  speed: { type: Number, default: 9 }, // Metros (30 ft -> 9 m)
  darkvision: { type: Number, default: 0 }, // Metros
  traits: [{
    name: String,
    description: String,
    // Ej: "Linaje Feérico", "Aguante Incansable"
  }]
});

export default mongoose.model("Species", SpeciesSchema);