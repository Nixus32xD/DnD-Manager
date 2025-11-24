import mongoose from "mongoose";
import dotenv from "dotenv";
// Importar Modelos
import Background from "./models/Background.js";
import Feat from "./models/Feat.js";

dotenv.config();

const seedBackgrounds = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🔌 Conectado a MongoDB...");

    // 1. Obtener todas las dotes para poder referenciarlas
    const allFeats = await Feat.find();

    // Helper para encontrar ID de dote por nombre (ignora mayúsculas/tildes si es necesario)
    const getFeatId = (featName) => {
      const feat = allFeats.find(
        (f) => f.name.toLowerCase() === featName.toLowerCase()
      );
      if (!feat) {
        console.warn(
          `⚠️ Cuidado: No se encontró la dote "${featName}". Asignando null.`
        );
        return null;
      }
      return feat._id;
    };

    // 2. Datos de los Trasfondos (Manual 2024 - Cap. 4)
    const backgroundsData = [
      {
        name: "Acólito",
        abilityScores: ["Sabiduría", "Inteligencia", "Carisma"],
        featName: "Iniciado en la Magia", // Clérigo
        skillProficiencies: ["Perspicacia", "Religión"],
        toolProficiencies: ["Útiles de caligrafía"],
        equipment: [
          "Símbolo sagrado",
          "Libro (plegarias)",
          "Varillas de incienso (5)",
          "Vestiduras",
          "8 PO",
        ],
        description:
          "Te has dedicado al servicio de un templo o dios. Realizas ritos sagrados y ofreces sacrificios.",
      },
      {
        name: "Animador",
        abilityScores: ["Carisma", "Destreza", "Sabiduría"], // Músico
        featName: "Músico",
        skillProficiencies: ["Acrobacias", "Interpretación"],
        toolProficiencies: ["Instrumento musical"],
        equipment: [
          "Instrumento musical",
          "Disfraz",
          "Espejo de acero",
          "Paquete de artista",
          "8 PO",
        ],
        description:
          "Vives para el aplauso. Tu arte es tu vida, ya seas músico, actor, bailarín o poeta.",
      },
      {
        name: "Artesano",
        abilityScores: ["Fuerza", "Destreza", "Inteligencia"],
        featName: "Fabricante",
        skillProficiencies: ["Investigación", "Persuasión"],
        toolProficiencies: ["Herramientas de artesano"],
        equipment: [
          "Herramientas de artesano",
          "Lámpara",
          "Aceite (frasco)",
          "Papel (5 hojas)",
          "Útiles de escritura",
          "25 PO",
        ],
        description:
          "Eres un creador. Comienzas con materias primas y terminas con objetos de belleza o utilidad.",
      },
      {
        name: "Charlatán",
        abilityScores: ["Carisma", "Destreza", "Constitución"],
        featName: "Habilidoso",
        skillProficiencies: ["Engaño", "Juego de Manos"],
        toolProficiencies: ["Kit de falsificación"],
        equipment: ["Ropa fina", "Kit de falsificación", "15 PO"],
        description:
          "Sabes lo que la gente quiere y se lo das, o al menos prometes dárselo. Eres un experto en la manipulación.",
      },
      {
        name: "Comerciante",
        abilityScores: ["Carisma", "Inteligencia", "Sabiduría"], // Mercader
        featName: "Afortunado",
        skillProficiencies: ["Persuasión", "Trato con Animales"],
        toolProficiencies: ["Herramientas de navegante"],
        equipment: ["Útiles de escritura", "Mula", "Carreta", "20 PO"], // "Mercader" en 2024 es "Merchant"
        description:
          "Te ganas la vida comprando y vendiendo, ya sea como tendero o viajando en caravanas.",
      },
      {
        name: "Criminal",
        abilityScores: ["Destreza", "Constitución", "Inteligencia"],
        featName: "Alerta",
        skillProficiencies: ["Juego de Manos", "Sigilo"],
        toolProficiencies: ["Herramientas de ladrón"],
        equipment: [
          "Herramientas de ladrón",
          "Daga (2)",
          "Ropa oscura con capucha",
          "16 PO",
        ],
        description:
          "Tienes un historial de infringir la ley y sobrevivir en los bajos fondos.",
      },
      {
        name: "Ermitaño",
        abilityScores: ["Sabiduría", "Constitución", "Carisma"],
        featName: "Sanador",
        skillProficiencies: ["Medicina", "Religión"],
        toolProficiencies: ["Útiles de herborista"],
        equipment: [
          "Útiles de herborista",
          "Libro (filosofía)",
          "Manta de viaje",
          "Lámpara",
          "Aceite",
          "10 PO",
        ],
        description:
          "Viviste en reclusión, ya sea en una comunidad protegida o en completa soledad, buscando iluminación.",
      },
      {
        name: "Escriba",
        abilityScores: ["Inteligencia", "Destreza", "Sabiduría"],
        featName: "Habilidoso",
        skillProficiencies: ["Historia", "Investigación"],
        toolProficiencies: ["Útiles de caligrafía"],
        equipment: [
          "Útiles de caligrafía",
          "Libro en blanco",
          "Tinta (frasco)",
          "Pluma",
          "Lámpara",
          "18 PO",
        ],
        description:
          "Pasas tus días documentando el mundo, copiando textos o trabajando en bibliotecas burocráticas.",
      },
      {
        name: "Granjero",
        abilityScores: ["Constitución", "Sabiduría", "Fuerza"],
        featName: "Duro",
        skillProficiencies: ["Naturaleza", "Trato con Animales"],
        toolProficiencies: ["Herramientas de carpintero"],
        equipment: [
          "Herramientas de carpintero",
          "Hoz",
          "Pala",
          "Olla de hierro",
          "20 PO",
        ],
        description:
          "Trabajas la tierra. Eres fuerte, resistente y conoces los ciclos de la naturaleza.",
      },
      {
        name: "Guardia",
        abilityScores: ["Fuerza", "Inteligencia", "Sabiduría"],
        featName: "Alerta",
        skillProficiencies: ["Athletics", "Percepción"], // Athletics = Atletismo
        toolProficiencies: ["Juego de dados"], // Gaming set
        equipment: [
          "Ballesta ligera",
          "Virotes (20)",
          "Cuerno",
          "Juego de dados",
          "Manillas",
          "12 PO",
        ],
        description:
          "Has servido en una milicia, ejército o guardia de la ciudad, protegiendo a la gente.",
      },
      {
        name: "Guía",
        abilityScores: ["Sabiduría", "Destreza", "Constitución"],
        featName: "Iniciado en la Magia", // Druida
        skillProficiencies: ["Sigilo", "Supervivencia"],
        toolProficiencies: ["Útiles de cartógrafo"],
        equipment: [
          "Arco corto",
          "Flechas (20)",
          "Útiles de cartógrafo",
          "Tienda de campaña",
          "2 PO",
        ],
        description:
          "Te sientes como en casa en la naturaleza, guiando a viajeros a través de terrenos peligrosos.",
      },
      {
        name: "Marinero",
        abilityScores: ["Destreza", "Fuerza", "Sabiduría"],
        featName: "Matón de Taberna",
        skillProficiencies: ["Acrobacias", "Percepción"],
        toolProficiencies: ["Herramientas de navegante"],
        equipment: [
          "Herramientas de navegante",
          "Cuerda de seda (15m)",
          "Daga",
          "10 PO",
        ],
        description:
          "Navegaste mares y océanos, enfrentando tormentas y monstruos de las profundidades.",
      },
      {
        name: "Noble",
        abilityScores: ["Carisma", "Inteligencia", "Sabiduría"],
        featName: "Habilidoso",
        skillProficiencies: ["Historia", "Persuasión"],
        toolProficiencies: ["Juego de ajedrez"], // Gaming set
        equipment: [
          "Ropa fina",
          "Sello (anillo)",
          "Juego de ajedrez",
          "Perfume",
          "24 PO",
        ],
        description:
          "Naciste con título y estatus. Tienes responsabilidades y privilegios que otros no.",
      },
      {
        name: "Sabio",
        abilityScores: ["Inteligencia", "Sabiduría", "Constitución"],
        featName: "Iniciado en la Magia", // Mago
        skillProficiencies: ["Arcanos", "Historia"],
        toolProficiencies: ["Útiles de caligrafía"], // En realidad 2024 permite elegir, pongo uno por defecto
        equipment: [
          "Libro (texto académico)",
          "Útiles de escritura",
          "Pergamino (4)",
          "8 PO",
        ],
        description:
          "Has pasado años aprendiendo el saber del multiverso, investigando manuscritos y escuchando a expertos.",
      },
      {
        name: "Soldado",
        abilityScores: ["Fuerza", "Destreza", "Constitución"],
        featName: "Atacante Salvaje",
        skillProficiencies: ["Atletismo", "Intimidación"],
        toolProficiencies: ["Juego de cartas"], // Gaming set
        equipment: [
          "Lanza",
          "Arco corto",
          "Flechas (20)",
          "Juego de cartas",
          "Estuche de mapas",
          "14 PO",
        ],
        description:
          "La guerra es tu vida. Has entrenado, luchado y sobrevivido en el campo de batalla.",
      },
      {
        name: "Viajero",
        abilityScores: ["Destreza", "Sabiduría", "Carisma"],
        featName: "Afortunado",
        skillProficiencies: ["Perspicacia", "Sigilo"],
        toolProficiencies: ["Herramientas de ladrón"],
        equipment: [
          "Herramientas de ladrón",
          "Daga (2)",
          "Juego de cartas",
          "16 PO",
        ],
        description:
          "Creciste en los caminos, viajando de pueblo en pueblo, aprendiendo a sobrevivir con ingenio.",
      },
    ];

    // 3. Transformar y Guardar
    const finalBackgrounds = backgroundsData.map((bg) => ({
      name: bg.name,
      abilityScores: bg.abilityScores,
      feat: getFeatId(bg.featName), // Convertimos nombre a ObjectId
      skillProficiencies: bg.skillProficiencies,
      toolProficiencies: bg.toolProficiencies,
      equipment: bg.equipment,
      description: bg.description,
    }));

    // Limpiar colección previa
    await Background.deleteMany({});
    console.log("🧹 Trasfondos anteriores eliminados.");

    // Insertar
    await Background.insertMany(finalBackgrounds);
    console.log(
      `✨ Insertados ${finalBackgrounds.length} Trasfondos exitosamente.`
    );

    process.exit();
  } catch (error) {
    console.error("🔥 Error en el seeder de Trasfondos:", error);
    process.exit(1);
  }
};

seedBackgrounds();
