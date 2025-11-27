// server/seeder.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Importamos los modelos
import Character from '../models/Character.js';
import User from '../models/User.js';
import Species from '../models/Species.js';
import Class from '../models/Class.js';
import Background from '../models/Background.js';

dotenv.config();

// Datos de prueba (Hardcodeados para el ejemplo)
const seedCharacters = async () => {
  try {
    // 1. Conectar a la DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🔌 Conectado a MongoDB para sembrar...');

    // 2. Limpiar colección de Personajes (Opcional: borra lo anterior)
    await Character.deleteMany();
    console.log('🧹 Personajes anteriores eliminados.');

    // -------------------------------------------------------------------
    // PASO PREVIO: Crear dependencias (Necesitamos IDs reales para las refs)
    // -------------------------------------------------------------------
    
    // Crear un Usuario Dummy
    let user = await User.findOne({ email: 'test@dnd.com' });
    if (!user) {
      user = await User.create({ 
        username: 'DungeonMaster', 
        email: 'test@dnd.com', 
        password: 'password123' 
      });
    }

    // Crear Especies Dummy (Si no existen, las crea para tener el ID)
    const human = await Species.create({ name: 'Humano', speed: 9, size: 'Medium' });
    const elf = await Species.create({ name: 'Elfo', speed: 9, size: 'Medium', darkvision: 18 });
    const halfling = await Species.create({ name: 'Mediano', speed: 7.5, size: 'Small' });

    // Crear Clases Dummy
    const fighter = await Class.create({ name: 'Guerrero', hitDie: 10 });
    const wizard = await Class.create({ name: 'Mago', hitDie: 6 });
    const rogue = await Class.create({ name: 'Pícaro', hitDie: 8 });

    // Crear Trasfondos Dummy
    const soldier = await Background.create({ name: 'Soldado' });
    const sage = await Background.create({ name: 'Erudito' });
    const criminal = await Background.create({ name: 'Criminal' });

    console.log('✅ Dependencias (User, Clases, Razas) creadas/cargadas.');

    // -------------------------------------------------------------------
    // AHORA SÍ: CREAMOS LOS 3 PERSONAJES
    // -------------------------------------------------------------------

    const characters = [
      // 1. EL TANQUE (GUERRERO HUMANO)
      {
        user: user._id,
        name: "Valeros",
        level: 1,
        image: "https://placehold.co/400",
        species: human._id,
        class: fighter._id,
        background: soldier._id,
        stats: {
          strength: { value: 16, mod: 3, save: true },
          dexterity: { value: 12, mod: 1, save: false },
          constitution: { value: 14, mod: 2, save: true },
          intelligence: { value: 10, mod: 0, save: false },
          wisdom: { value: 11, mod: 0, save: false },
          charisma: { value: 10, mod: 0, save: false }
        },
        hp: { current: 12, max: 12, temp: 0 }, // 10 (d10) + 2 (CON)
        ac: 16, // Cota de malla
        initiative: 1,
        speed: 9,
        hitDice: { total: 1, current: 1, die: "1d10" },
        proficiencies: {
          skills: ["Atletismo", "Intimidación", "Supervivencia"],
          languages: ["Común", "Enano"],
          armor: ["Todas las armaduras", "Escudos"],
          weapons: ["Armas Marciales", "Armas Simples"]
        },
        inventory: [], // Se puede poblar luego
        wallet: { gp: 10, sp: 0, cp: 0 },
        features: [
          { name: "Estilo de Combate", source: "Clase", description: "Defensa: +1 a la CA con armadura." },
          { name: "Tomar Aliento", source: "Clase", description: "Recupera 1d10+Nivel PG como acción bonus." }
        ],
        alignment: "Legal Neutral",
        backstory: "Veterano de la guerra del norte, busca fortuna para reconstruir su hogar."
      },

      // 2. LA MAGA (ELFA ERUDITA)
      {
        user: user._id,
        name: "Lyra",
        level: 1,
        image: "https://placehold.co/400",
        species: elf._id,
        class: wizard._id,
        background: sage._id,
        stats: {
          strength: { value: 8, mod: -1, save: false },
          dexterity: { value: 14, mod: 2, save: false },
          constitution: { value: 12, mod: 1, save: false },
          intelligence: { value: 17, mod: 3, save: true }, // +3 mod
          wisdom: { value: 13, mod: 1, save: true },
          charisma: { value: 10, mod: 0, save: false }
        },
        hp: { current: 7, max: 7, temp: 0 }, // 6 (d6) + 1 (CON)
        ac: 12, // 10 + 2 (DEX)
        initiative: 2,
        speed: 9,
        hitDice: { total: 1, current: 1, die: "1d6" },
        proficiencies: {
          skills: ["Arcana", "Historia", "Investigación"],
          languages: ["Común", "Elfo", "Dracónico"],
          weapons: ["Dagas", "Bastones"]
        },
        spellcasting: {
          ability: "intelligence",
          saveDC: 13, // 8 + 2 (prof) + 3 (int)
          attackBonus: 5, // 2 + 3
          slots: { 1: { max: 2, current: 2 } }
        },
        features: [
          { name: "Recuperación Arcana", source: "Clase", description: "Recupera espacios de conjuro en descanso corto." },
          { name: "Sentidos Agudos", source: "Especie", description: "Proficiencia en Percepción." }
        ],
        alignment: "Caótico Bueno",
        backstory: "Expulsada de la academia por experimentos prohibidos."
      },

      // 3. EL LADRÓN (PÍCARO MEDIANO)
      {
        user: user._id,
        name: "Milo Manoligera",
        level: 1,
        image: "https://placehold.co/400",
        species: halfling._id,
        class: rogue._id,
        background: criminal._id,
        stats: {
          strength: { value: 10, mod: 0, save: false },
          dexterity: { value: 18, mod: 4, save: true }, // +4 mod
          constitution: { value: 12, mod: 1, save: false },
          intelligence: { value: 13, mod: 1, save: true },
          wisdom: { value: 10, mod: 0, save: false },
          charisma: { value: 14, mod: 2, save: false }
        },
        hp: { current: 9, max: 9, temp: 0 }, // 8 (d8) + 1 (CON)
        ac: 15, // 11 (Cuero) + 4 (DEX)
        initiative: 4,
        speed: 7.5,
        hitDice: { total: 1, current: 1, die: "1d8" },
        proficiencies: {
          skills: ["Sigilo", "Juego de Manos", "Acrobacias", "Engaño"],
          tools: ["Herramientas de Ladrón"],
          languages: ["Común", "Mediano", "Jerga de Ladrones"],
          armor: ["Armadura Ligera"]
        },
        features: [
          { name: "Ataque Furtivo", source: "Clase", description: "1d6 extra de daño si tenés ventaja." },
          { name: "Suerte", source: "Especie", description: "Podés repetir un 1 natural en d20." }
        ],
        alignment: "Neutral",
        backstory: "Debe mucho dinero al gremio equivocado."
      }
    ];

    await Character.insertMany(characters);
    console.log('🌱 3 Personajes sembrados exitosamente!');

    process.exit();
  } catch (error) {
    console.error('❌ Error al sembrar:', error);
    process.exit(1);
  }
};

seedCharacters();