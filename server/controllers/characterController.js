import Character from "../models/Character.js";
import Class from "../models/Class.js"; 

// HELPER: Calcular Modificador (se usa en varias funciones)
const getMod = (score) => Math.floor((score - 10) / 2);

// 1. LISTAR TODOS
export const getCharacters = async (req, res) => {
  try {
    const characters = await Character.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("class", "name hitDie")
      .populate("species", "name speed")
      .populate("background", "name");

    res.json(characters);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener personajes", error: error.message });
  }
};

// 2. OBTENER POR ID
export const getCharacterById = async (req, res) => {
  try {
    const character = await Character.findById(req.params.id)
      .populate("class")
      .populate("species")
      .populate("background");

    if (!character) return res.status(404).json({ message: "Personaje no encontrado" });

    if (character.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "No autorizado" });
    }

    res.json(character);
  } catch (error) {
    res.status(500).json({ message: "Error buscando personaje", error: error.message });
  }
};

// 3. CREAR PERSONAJE
export const createCharacter = async (req, res) => {
  try {
    const {
      name, level, class: classId, species, subspecies, background,
      stats, lore, savingThrows, proficiencies, features, speed
    } = req.body;

    // Validación rápida para evitar crash si faltan stats
    if (!stats) return res.status(400).json({ message: "Faltan las estadísticas" });

    // A. Procesamos STATS y SALVACIONES (Todo en Inglés)
    // savingThrows viene del front como ['strength', 'constitution']
    const processedStats = {
      strength: { 
        value: stats.strength, 
        mod: getMod(stats.strength), 
        save: savingThrows?.includes("strength") || false 
      },
      dexterity: { 
        value: stats.dexterity, 
        mod: getMod(stats.dexterity), 
        save: savingThrows?.includes("dexterity") || false 
      },
      constitution: { 
        value: stats.constitution, 
        mod: getMod(stats.constitution), 
        save: savingThrows?.includes("constitution") || false 
      },
      intelligence: { 
        value: stats.intelligence, 
        mod: getMod(stats.intelligence), 
        save: savingThrows?.includes("intelligence") || false 
      },
      wisdom: { 
        value: stats.wisdom, 
        mod: getMod(stats.wisdom), 
        save: savingThrows?.includes("wisdom") || false 
      },
      charisma: { 
        value: stats.charisma, 
        mod: getMod(stats.charisma), 
        save: savingThrows?.includes("charisma") || false 
      },
    };

    // B. Calculamos Vida Inicial (Hit Die + Con Mod)
    let initialHP = 10; // Valor seguro por defecto
    try {
        const classDataDB = await Class.findById(classId);
        const hitDie = classDataDB ? classDataDB.hitDie : 8; 
        const conMod = getMod(stats.constitution);
        initialHP = hitDie + conMod;
    } catch (err) {
        console.error("Error calculando HP:", err);
    }

    // C. Armamos el objeto final
    const characterData = {
      user: req.user._id,
      name,
      level: level || 1,
      class: classId,
      species,
      subspecies: subspecies || "",
      background,
      stats: processedStats,

      proficiencies: {
        skills: proficiencies?.skills || [],
        tools: [], languages: [], weapons: [], armor: [],
      },

      features: features || [],
      speed: speed || 9, // Si falla el cálculo del front, 9m base

      alignment: lore?.alignment || "Neutral",
      appearance: lore?.appearance || "",
      backstory: lore?.backstory || "",

      hp: { current: initialHP, max: initialHP, temp: 0 },
      ac: 10 + getMod(stats.dexterity),
      wallet: { gp: 0, sp: 0, cp: 0 },
    };

    const newCharacter = new Character(characterData);
    const savedCharacter = await newCharacter.save();

    res.status(201).json(savedCharacter);
  } catch (error) {
    console.error("❌ Error Backend:", error);
    res.status(400).json({ message: "Error al crear personaje", error: error.message });
  }
};

// 4. ACTUALIZAR
export const updateCharacter = async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) return res.status(404).json({ message: "No encontrado" });
    if (character.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const updatedCharacter = await Character.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );
    res.json(updatedCharacter);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar", error: error.message });
  }
};

// 5. ELIMINAR
export const deleteCharacter = async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) return res.status(404).json({ message: "No encontrado" });
    if (character.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "No autorizado" });
    }

    await character.deleteOne();
    res.json({ message: "Personaje eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar", error: error.message });
  }
};

// 6. LEVEL UP
export const levelUpCharacter = async (req, res) => {
  try {
    const char = await Character.findById(req.params.id);
    if (!char) return res.status(404).json({ message: "No encontrado" });

    // 1. Buscamos la clase para saber el dado de golpe
    const charClass = await Class.findById(char.class);
    const hitDie = charClass ? charClass.hitDie : 8;

    // 2. Calculamos HP ganado: Promedio (Dado/2 + 1) + Con Mod
    // Accedemos al valor dentro del objeto stats.constitution.value
    const conMod = getMod(char.stats.constitution.value); 
    const hpGain = (hitDie / 2) + 1 + conMod;
    
    const finalHpGain = Math.max(1, hpGain); // Mínimo 1 de vida

    // 3. Aplicamos
    char.level += 1;
    char.hp.max += finalHpGain;
    char.hp.current += finalHpGain;

    await char.save();
    
    // Repopulamos para devolver la data completa
    await char.populate(["class", "species", "background"]);
    
    res.json(char);
  } catch (error) {
    console.error("Error Level Up:", error);
    res.status(500).json({ message: error.message });
  }
};