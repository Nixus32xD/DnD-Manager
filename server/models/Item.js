import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ["Weapon", "Armor", "Gear", "Tool", "Mount"],
    required: true,
  },
  rarity: { type: String, default: "Common" },
  cost: { 
    quantity: Number, 
    unit: String 
  }, 
  weight: Number, // En kg
  description: String,

  // Específico de Armas (Reglas 2024)
  weaponCategory: String, // "Simple", "Marcial"
  
  // --- CORRECCIÓN AQUÍ ---
  damage: { 
    dice: { type: String }, // ej: "1d8"
    type: { type: String }  // ej: "Cortante". IMPORTANTE: Se define así porque 'type' es palabra reservada
  },
  // -----------------------

  properties: [String], // ["Sutil", "Ligera", "Arrojadiza"]
  masteryProperty: String, // "Mellar", "Empujar", etc.
  
  range: { 
    normal: Number, 
    long: Number 
  },

  // Específico de Armaduras
  armorCategory: String, // "Ligera", "Media", "Pesada", "Escudo"
  
  ac: { 
    base: Number, 
    addDex: Boolean, 
    maxDex: Number 
  }, 
  
  strengthReq: Number,
  stealthDisadvantage: Boolean,
});

// Índices para búsquedas rápidas
ItemSchema.index({ name: 'text' });
ItemSchema.index({ type: 1 });

export default mongoose.model("Item", ItemSchema);