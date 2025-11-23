import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hash
    role: { type: String, enum: ["user", "admin", "dm"], default: "user" },
    // Para guardar configuraciones de UI o favoritos
    settings: { type: Object, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
