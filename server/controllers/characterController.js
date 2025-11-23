// server/controllers/characterController.js
import Character from "../models/Character.js";

// 1. Listar Personajes
export const getCharacters = async (req, res) => {
    try {
        const characters = await Character.find();
        res.json(characters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Crear Personaje
export const createCharacter = async (req, res) => {
    try {
        const newCharacter = new Character(req.body);
        const savedCharacter = await newCharacter.save();
        res.status(201).json(savedCharacter);
    } catch (error) {
        res.status(400).json({ message: "Error al crear el personaje", error: error.message });
    }
};