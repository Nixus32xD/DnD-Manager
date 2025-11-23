import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ["Weapon", "Armor", "Gear", "Tool", "Mount"],
    required: true,
  },
  rarity: { type: String, default: "Common" },
  cost: { quantity: Number, unit: String }, // ej: 15 po
  weight: Number, // En kg
  description: String,

  // Específico de Armas (Reglas 2024)
  weaponCategory: String, // "Simple", "Marcial"
  damage: { dice: String, type: String }, // "1d8", "Cortante"
  properties: [String], // ["Sutil", "Ligera", "Arrojadiza"]
  masteryProperty: String, // NUEVO 2024: "Mellar", "Empujar", "Hender", "Ralentizar"
  range: { normal: Number, long: Number },

  // Específico de Armaduras
  armorCategory: String, // "Ligera", "Media", "Pesada", "Escudo"
  ac: { base: Number, addDex: Boolean, maxDex: Number }, // maxDex 2 para media, null para ligera
  strengthReq: Number,
  stealthDisadvantage: Boolean,
});

export default mongoose.model("Item", ItemSchema);
