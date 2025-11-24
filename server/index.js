// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// 1. Importamos el archivo de rutas nuevo
import characterRoutes from "./routes/characterRoutes.js";
import spellRoutes from "./routes/spellsRoutes.js";
import featRoutes from "./routes/featRoutes.js"
import itemRoutes from "./routes/itemRoutes.js";
import backgroundRoutes from "./routes/backgroundRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// --- CONEXIÓN A MONGODB ---
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Conectado exitosamente");
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error.message);
    process.exit(1);
  }
};
connectDB();
// --------------------------

// Rutas Base
app.get('/', (req, res)=>{
    res.send({ message: "Backend de D&D 2024 funcionando 🎲" })
});

// 2. Usamos las rutas modulares
// Esto significa: "Cualquier petición que empiece con /api/characters, mandala al archivo characterRoutes"
app.use("/api/characters", characterRoutes);
app.use("/api/spells", spellRoutes);
app.use("/api/feats", featRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/backgrounds", backgroundRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});