import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Generar Token (La "llave" de acceso)
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "secretoseguro123", {
    expiresIn: "30d",
  });
};

// REGISTRO
export const register = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }
    const user = await User.create({ username, email, password, role });
    res.status(201).json({
      _id: user._id,
      username: user.username,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Credenciales inválidas" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
