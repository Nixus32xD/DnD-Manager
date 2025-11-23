import mongoose from "mongoose";

const FeatSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['Origin', 'General', 'Fighting Style', 'Epic Boon'], required: true },
  prerequisites: {
    level: Number,
    stat: { name: String, value: Number },
    classFeature: String // Ej: "Lanzamiento de Conjuros"
  },
  description: String,
  benefits: [{ type: String }] // Lista de efectos mecánicos
});

export default mongoose.model("Feat", FeatSchema);