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
          "Suministros de caligrafo",
          "Símbolo sagrado",
          "Libro (de Oraciones)",
          "Pergamino (10 Hojas)",
          "Tunica",
          "8 PO",
        ],
        description:
          "Dedicabas tu vida al servicio de un templo enclavado en un pueblo o apartado en un bosquecillo sagrado. En él, realizabas ceremonias en honor a un dios o panteón. Servías a las órdenes de un sacerdote y estudiaste la religión. Gracias a la tutela de ese sacerdote y a tu propia devoción, también aprendiste a canalizar un ápice de poder divino al servicio de tu lugar de culto y de la gente que rezaba en él. ",
      },
      {
        name: "Animador",
        abilityScores: ["Carisma", "Destreza", "Sabiduría"], // Músico
        featName: "Músico",
        skillProficiencies: ["Acrobacias", "Interpretación"],
        toolProficiencies: ["Instrumento musical"],
        equipment: [
          "Instrumento musical (el mismo de la competencia)",
          "2 Disfraces",
          "Espejo",
          "Perfume",
          "Ropa de Viaje",
          "11 PO",
        ],
        description:
          "Pasaste buena parte de tu juventud recorriendo ferias y festivales en los que desempeñabas tareas diversas para músicos y acróbatas a cambio de que te formaran. Quizá aprendiste a caminar sobre la cuerda floja, a tocar el laúd con un estilo particular o a recitar poesía con una dicción impecable. Aún hoy te creces con los aplausos y anhelas subir al escenario. ",
      },
      {
        name: "Artesano",
        abilityScores: ["Fuerza", "Destreza", "Inteligencia"],
        featName: "Fabricante",
        skillProficiencies: ["Investigación", "Persuasión"],
        toolProficiencies: ["Herramientas de artesano"],
        equipment: [
          "Herramientas de artesano",
          "2 Bolsas",
          "Ropa de Viaje",
          "32 PO",
        ],
        description:
          "Comenzaste barriendo suelos y fregando las mesas del taller de un artesano a cambio de unas monedas al día en cuanto tuviste fuerza suficiente para levantar un cubo. Cuando alcanzaste la edad necesaria para convertirte en aprendiz, empezaste a crear tus propias obras básicas, así como a camelarte a los clientes exigentes que de vez en cuando llamaban a vuestra puerta. Tu oficio te brindó también un buen ojo para los detalles. ",
      },
      {
        name: "Charlatán",
        abilityScores: ["Carisma", "Destreza", "Constitución"],
        featName: "Habilidoso",
        skillProficiencies: ["Engaño", "Juego de Manos"],
        toolProficiencies: ["Utiles para Falsificar"],
        equipment: ["Ropa de Calidad", "Utiles para Falsificar", "15 PO"],
        description:
          "En cuanto tuviste edad suficiente para pedir una pinta, no tardaste en apropiarte de un taburete en cada taberna a 10 km a la redonda del lugar en que naciste. Mientras recorrias bares. y antros, aprendiste a aprovecharte de los desafortunados que se dejaban colar alguna mentira reconfortante o dos, como una poción falsa o un árbol genealógico falsificado.",
      },
      {
        name: "Comerciante",
        abilityScores: ["Carisma", "Inteligencia", "Sabiduría"], // Mercader
        featName: "Afortunado",
        skillProficiencies: ["Persuasión", "Trato con Animales"],
        toolProficiencies: ["Herramientas de navegante"],
        equipment: ["Herramientas de navegante", "2 Bolsas", "Ropas de Viaje", "22 PO"], // "Mercader" en 2024 es "Merchant"
        description:
          "Fuiste aprendiz de un comerciante, caravanero o tendero y aprendiste los rudimentos del comercio. Viajabas por todas partes y te ganabas la vida comprando y vendiendo las materias primas que los artesanos necesitaban para sus creaciones o las obras acabadas de aquellos profesionales. Quizá transportabas mercancías de un lugar a otro en barco, carro o en caravana, o se las comprabas a mercaderes ambulantes y las vendías en tu propia tienda.",
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
          "Palanqueta",
          "Ropas de Viaje",
          "16 PO",
        ],
        description:
          "Te buscabas la vida en los callejones oscuros, birlando carteras o robando en comercios. Quizá formabas parte de una pequeña banda de malhechores con ideas afines y dispuestos a echarse una mano. O puede que fueras un lobo solitario que se desmarcaba del gremio de ladrones local y de otros delincuentes más temibles.",
      },
      {
        name: "Ermitaño",
        abilityScores: ["Sabiduría", "Constitución", "Carisma"],
        featName: "Sanador",
        skillProficiencies: ["Medicina", "Religión"],
        toolProficiencies: ["Útiles de herborista"],
        equipment: [
          "Útiles de herborista",
          "Baston",
          "Libro (filosofía)",
          "Ropas de Viaje",
          "Lámpara",
          "Aceite (3 frascos)",
          "Petate",
          "16 PO",
        ],
        description:
          "Te pasaste los años de juventud en un refugio o monasterio situado en medio de la nada. En aquella época, tu única compañía eran las criaturas del bosque y las visitas esporádicas que traían noticias del exterior y suministros. La soledad te permitió reflexionar durante muchas horas acerca de los misterios de la creación. ",
      },
      {
        name: "Erudito",
        abilityScores: ["Sabiduría", "Constitución", "Inteligencia"],
        featName: "Iniciado en la magia", // Mago
        skillProficiencies: ["Conocimiento Arcano", "Historia"],
        toolProficiencies: ["Suministro de caligrafo"],
        equipment: [
          "Suministros de caligrafo",
          "Baston",
          "Libro (de historia)",
          "Pergamino (8 hojas)",
          "Tunica",
          "8 PO",
        ],
        description:
          "Pasaste tus años formativos viajando entre palacetes y monasterios, desempeñando diversos oficios y servicios para que te dejaran acceder a sus bibliotecas. Dedicaste muchas tardes a estudiar libros y pergaminos para adquirir conocimientos acerca del multiverso e incluso los rudimientos de la magia, y tu mente ansía más ",
      },
      {
        name: "Escriba",
        abilityScores: ["Inteligencia", "Destreza", "Sabiduría"],
        featName: "Habilidoso",
        skillProficiencies: ["Percepcion", "Investigación"],
        toolProficiencies: ["Suministros de calígrafo"],
        equipment: [
          "Suministros de calígrafo",
          "Aceite (3 Frascos)",
          "Lampara",
          "Pergamino (12 Hojas)",
          "Ropas de Calidad",
          "23 PO",
        ],
        description:
          "Pasaste tus años de formación en un scriptorium, un monasterio consagrado a la conservación del conocimiento o un organismo gubernamental, donde aprendiste a escribir con letra clara y producir textos exquisitos. Quizá transcribías documentos of o copiabas tomos de literatura. Podrías tener ciert: cualidades para la poesía, la narrativa o la investiga: Sobre todo, prestas mucha atención a los detalles, lo que te impide cometer errores en los documentos que copias y creas. ",
      },
      {
        name: "Campesino",
        abilityScores: ["Constitución", "Sabiduría", "Fuerza"],
        featName: "Duro",
        skillProficiencies: ["Naturaleza", "Trato con Animales"],
        toolProficiencies: ["Herramientas de carpintero"],
        equipment: [
          "Herramientas de carpintero",
          "Utiles de Sanador",
          "Hoz",
          "Pala",
          "Olla de hierro",
          "Ropa de Viaje",
          "30 PO",
        ],
        description:
          "Te criaste en el campo. Los años cuidando animales y cultivando la tierra te recompensaron con paciencia y una salud de hierro. Sientes un gran aprecio por la generosidad de la naturaleza y un prudente respeto por suira. ",
      },
      {
        name: "Guardia",
        abilityScores: ["Fuerza", "Inteligencia", "Sabiduría"],
        featName: "Alerta",
        skillProficiencies: ["Athletics", "Percepción"], // Athletics = Atletismo
        toolProficiencies: ["Elige un tipo de Juego"], // Gaming set
        equipment: [
          "Ballesta ligera",
          "Virotes (20)",
          "Lanza",
          "Juego",
          "Aljaba",
          "Esposas",
          "Linterna sorda",
          "Ropas de viaje",
          "12 PO",
        ],
        description:
          "Te duelen los pies al recordar las innumerables horas pasadas en tu puesto de la torre. Te entrenaron para permanecer ojo avizor ante lo que acontecía extramuros, en busca de merodeadores ocultos en el bosque, a la par que estabas pendiente de los posibles rateros y pendencieros de intramuros.",
      },
      {
        name: "Guía",
        abilityScores: ["Sabiduría", "Destreza", "Constitución"],
        featName: "Iniciado en la Magia", // Druida
        skillProficiencies: ["Sigilo", "Supervivencia"],
        toolProficiencies: ["Herramientas de cartógrafo"],
        equipment: [
          "Arco corto",
          "Flechas (20)",
          "Herramientas de cartógrafo",
          "Petate",
          "Tienda",
          "Ropas de Viaje",
          "3 PO",
        ],
        description:
          "Alcanzaste la mayoría de edad en plena naturaleza, lejos de tierras pobladas. Tu hogar era cualquier sitio donde pudieras extender tu petate. Las tierras salvajes están llenas de maravillas (monstruos extraños, bosques y arroyos inmaculados, ruinas descuidadas de grandes salones otrora recorridos por gigantes) y aprendiste a valértelas por tu cuenta al explorarlas. De vez en cuando, servías de guía a sacerdotes de la naturaleza que te enseñaron los fundamentos para canalizar la magia de la tierra. ",
      },
      {
        name: "Marinero",
        abilityScores: ["Destreza", "Fuerza", "Sabiduría"],
        featName: "Matón de Taberna",
        skillProficiencies: ["Acrobacias", "Percepción"],
        toolProficiencies: ["Herramientas de navegante"],
        equipment: [
          "Herramientas de navegante",
          "Ropas de Viaje",
          "Daga",
          "20 PO",
        ],
        description:
          "Llevaste una vida en la mar, con el viento en popa y las cubiertas meciéndose bajo tus pies. Visitaste más tabernas de los puertos de escala de las que puedes recordar, te enfrentaste a grandes tormentas e intercambiaste anécdotas con gente que vivía bajo las olas.",
      },
      {
        name: "Noble",
        abilityScores: ["Carisma", "Inteligencia", "Fuerza"],
        featName: "Habilidoso",
        skillProficiencies: ["Historia", "Persuasión"],
        toolProficiencies: ["Elige un tipo de juego"], // Gaming set
        equipment: [
          "Ropa de Calidad",
          "Juego (El mismo de la competencia)",
          "Perfume",
          "29 PO",
        ],
        description:
          "Te criaste en un castillo entre riqueza, poder y privilegios. Tu familia de aristócratas menores procuró que recibieras la mejor educación, parte de la cual apreciabas y parte de la cual aborrecías. El tiempo que pasaste en el castillo, en especial las muchas horas que dedicabas a observar a tu familia en la corte, también te aportó amplios conocimientos sobre el liderazgo. ",
      },
      {
        name: "Soldado",
        abilityScores: ["Fuerza", "Destreza", "Constitución"],
        featName: "Atacante Salvaje",
        skillProficiencies: ["Atletismo", "Intimidación"],
        toolProficiencies: ["Elige un tipo de juego "], // Gaming set
        equipment: [
          "Lanza",
          "Arco corto",
          "Flechas (20)",
          "Aljaba",
          "Juego (el mismo de la competencia)",
          "Utiles de sanador",
          "Ropas de Viaje",
          "14 PO",
        ],
        description:
          "Comenzaste a entrenarte para la guerra nada más llegar a la edad adulta y tienes pocos recuerdos preciados de tu vida anterior a tomar las armas. Luchar es parte de tu identidad y a veces realizas sin darte cuenta los primeros ejercicios básicos de combate que aprendiste. En algún momento, sacaste partido a tu entrenamiento en el campo de batalla y protegiste el reino. ",
      },
      {
        name: "Vagabundo",
        abilityScores: ["Destreza", "Sabiduría", "Carisma"],
        featName: "Afortunado",
        skillProficiencies: ["Perspicacia", "Sigilo"],
        toolProficiencies: ["Herramientas de ladrón"],
        equipment: [
          "Herramientas de ladrón",
          "Daga (2)",
          "Bolsas (2)",
          "Petate",
          "Ropas de Viaje",
          "16 PO",
        ],
        description:
          "Creciste en las calles junto a personas con expectativas tan aciagas como las tuyas, entre las que había algunas amistades y algunos rivales. Dormías donde podías y hacías encargos ocasionales a cambio de comida. A veces, cuando el hambre se volvía insoportable, recurrías al robo. Sin embargo, nunca renunciaste a tu orgullo ni perdiste la esperanza. El destino aún tiene algo reservado para ti.",
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
