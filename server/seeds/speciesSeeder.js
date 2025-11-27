import mongoose from "mongoose";
import dotenv from "dotenv";
import Species from "../models/Species.js";

dotenv.config();

const speciesData = [
  // 1. AASIMAR
  {
    name: "Aasimar",
    creatureType: "Humanoide",
    size: "Medium",
    speed: 9,
    darkvision: 18,
    description:
      "Mortales cuyas almas albergan una chispa de los Planos Superiores. Pueden encender esa chispa para traer la luz, la curación y la furia divina.",
    traits: [
      {
        name: "Manos Curativas",
        description:
          " Como acción de magia, tocas a una criatura y tiras una cantidad de d4 igual a tu bonificador por competencia. La criatura recupera una cantidad de puntos de golpe igual al resultado total de la tirada. Cuando uses este atributo, no podrás volver a hacerlo hasta que finalices un descanso largo. ",
      },
      {
        name: "Portador de Luz",
        description: "Conoces el truco luz. El Carisma es tu aptitud mágica para lanzarlo.",
      },
      {
        name: "Resistencia Celestial",
        description: "Resistencia al daño necrótico y al radiante.",
      },
      {
        name: "Revelación Celestial",
        description:
          "Cuando alcanzas el nivel 3 de personaje, puedes transformarte como acción adicional y usar una de las opciones que aparecen a continuación (elige la opción cada vez que te transformes). La transformación dura 1 minuto o hasta que le pongas fin (no requiere acción). Cuando te transformes, no podrás volver a hacerlo hasta que finalices un descanso largo. Una vez en cada uno de tus turnos hasta que finalice la transformación, puedes infligir daño adicional a un objetivo cuando le hagas daño con un ataque o un conjuro. El daño adicional es igual a tu bonificador por competencia y el tipo es necrótico para Mortaja necrótica o radiante para Alas celestiales y Fulgor interior. ",
      },
    ],
    table: {
      title: "Revelaciones Celestiales",
      headers: ["Opción", "Descripción"],
      rows: [
        [
          "Mortaja necrótica",
          "Tus ojos se vuelven brevemente pozos de oscuridad y unas alas que no te permiten volar brotan temporalmente de tu espalda. Las criaturas que no sean tus aliados y estén a 3 m o menos de ti deberán superar una tirada de salvación de Carisma (CD 8 más tu modificador por Carisma y tu bonificador por competencia) o tendrán el estado de asustadas hasta el final de tu siguiente turno.",
        ],
        [
          "Alas celestiales",
          " Dos alas espectrales brotan temporalmente de tu espalda. Hasta que la transformación termine, tienes una velocidad volando igual a tu velocidad. ",
        ],
        [
          "Fulgor interior",
          " De tus ojos y tu boca surge temporalmente una luz abrasadora. Durante este tiempo, emites luz brillante en un radio de 3 m y luz tenue 3 m más allá y, al final de cada uno de tus turnos, cada criatura a 3 m o menos de ti recibirá una cantidad de daño radiante igual a tu bonificador por competencia. ",
        ],
      ],
    },
  },

  // 2. DRACÓNIDO
  {
    name: "Dracónido",
    creatureType: "Humanoide",
    size: "Medium",
    speed: 9,
    darkvision: 18,
    description:
      "Sus antepasados eclosionaron de huevos de dragón. Tienen piel escamosa, cuernos y un aliento elemental.",
    traits: [
      {
        name: "Ataque de Aliento",
        description:
          " Cuando lleves a cabo la acción de atacar en tu turno, puedes sustituir uno de tus ataques por una exhalación de energía mágica en un cono de 4,5 m o en una línea de 9 m de largo y 1,5 m de ancho (elige la forma cada vez). Todas las criaturas situadas en esa zona deberán hacer una tirada de salvación de Destreza (CD 8 más tu modificador por Constitución y tu bonificador por competencia). Si la fallan, sufrirán 1d10 de daño del tipo determinado por tu atributo Linaje dracónico. Si la superan, recibirán la mitad de ese daño. El daño aumenta en 1d10 cuando alcanzas los niveles 5 (2d10), 11 (3d10) y 17 (4d10) de personaje. Puedes utilizar este ataque de aliento una cantidad de veces igual a tu bonificador por competencia y recuperas todos los usos tras finalizar un descanso largo. ",
      },
      {
        name: "Resistencia al Daño",
        description: "Tienes resistencia al tipo de daño determinado por tu atributo Linaje dracónico.",
      },
      {
        name: "Vuelo Dracónico",
        description:
          "Cuando alcanzas el nivel 5 de personaje, puedes canalizar la magia dracónica para volar de forma temporal. Como acción adicional, haces que en la espalda te broten unas alas espectrales que duran 10 minutos o hasta que las repliegues (no requiere acción) o tengas el estado de incapacitado. Durante ese tiempo, tendrás una velocidad volando igual a tu velocidad. Tus alas parecen hechas de la misma energía que tu ataque de aliento. Cuando uses este atributo, no podrás volver a hacerlo hasta que finalices un descanso largo. ",
      },
      {
        name: "Linaje dracónico",
        description:
          " Tu linaje proviene de un progenitor dragón. Elige el tipo de dragón en la tabla “Ancestros dracónicos”. Tu elección afectará a tus atributos Ataque de aliento y Resistencia al daño además de a tu aspecto.",
      },
    ],
    table: {
      title: "Ancestros Dracónicos",
      headers: ["Dragón", "Tipo de Daño"],
      rows: [
        ["Azul", "Relámpago"],
        ["Blanco", "Frío"],
        ["Bronce", "Relámpago"],
        ["Cobre", "Ácido"],
        ["Negro", "Ácido"],
        ["Oro", "Fuego"],
        ["Oropel", "Fuego"],
        ["Plata", "Frío"],
        ["Rojo", "Fuego"],
        ["Verde", "Veneno"],
      ],
    },
  },

  // 3. ELFO
  {
    name: "Elfo",
    creatureType: "Humanoide",
    size: "Medium",
    speed: 9,
    darkvision: 18, // Nota: Drow tiene 36m, se aclara en la tabla/rasgo
    description:
      "Seres mágicos de larga vida vinculados a los Parajes Feéricos. No duermen, entran en trance para descansar.",
    traits: [
      {
        name: "Sentidos Agudos",
        description: "Tienes competencia en la habilidad de Percepción, Perspicacia o Supervivencia..",
      },
      {
        name: "Trance",
        description: " No necesitas dormir y la magia no puede dormirte. Puedes finalizar un descanso largo en 4 horas si las pasas en una meditación similar a un trance, tiempo durante el cual conservas la consciencia.",
      },
      {
        name: "Linaje Feérico",
        description: "Tienes ventaja en las tiradas de salvación para evitar o poner fin al estado de hechizado.",
      },
      {
        name: "Linaje Élficos",
        description: " Formas parte de un linaje que te otorga capacidades sobrenaturales. Elige un linaje de la tabla “Linajes élficos”. Obtienes el beneficio de nivel 1 de ese linaje. Cuando alcanzas los niveles 3 y 5 de personaje, aprendes un conjuro de nivel superior, como se muestra en la tabla. Siempre tienes ese conjuro preparado. Puedes lanzarlo una vez sin gastar un espacio de conjuro y recuperas la capacidad de hacerlo de esta forma tras finalizar un descanso largo. También puedes lanzar el conjuro usando cualquier espacio de conjuro que tengas del nivel apropiado. La Inteligencia, la Sabiduría o el Carisma es tu aptitud mágica para los conjuros que lances con este atributo (elige la característica al seleccionar el linaje).",
      },
    ],
    table: {
      title: "Linajes Élficos",
      headers: ["Linaje", "Beneficio de Nivel 1", "Beneficio de Nivel 3", "Beneficio de Nivel 5"],
      rows: [
        ["Alto Elfo", "Conoces el truco prestidigitación. Tras finalizar un descanso largo, puedes sustituir ese truco por otro truco diferente de la lista de conjuros de mago. ", "Detectar Magia", "Paso Brumoso"],
        ["Drow", "El alcance de tu visión en la oscuridad aumenta a 36 m. También conoces el truco luces danzantes.", "Fuego Feérico", "Oscuridad"],
        [
          "Elfo de los Bosques", "Tu velocidad aumenta a 10,5 m. También conoces el truco saber druídico. ","Zancada Prodigiosa", "Pasar sin Rastro"],
      ],
    },
  },

  // 4. ENANO
  {
    name: "Enano",
    creatureType: "Humanoide",
    size: "Medium",
    speed: 9,
    darkvision: 36, // 120 pies
    description:
      "Firmes como las montañas, forjados por los dioses de la tierra y el metal. Viven en clanes subterráneos o en las colinas.",
    traits: [
      {
        name: "Afinidad con la Piedra",
        description:
          " Como acción adicional, ganas la capacidad de sentir vibraciones con un alcance de 18 m durante 10 minutos. Debes encontrarte sobre una superficie de piedra o en contacto con una superficie de piedra para usar esta capacidad. La piedra puede ser natural o labrada. Puedes usar esta acción adicional una cantidad de veces igual a tu bonificador por competencia y recuperas todos los usos tras finalizar un descanso largo.",
      },
      { name: "Aguante Enano", description: "Tus puntos de golpe máximos se incrementan en 1 y aumentarán en 1 más cada vez que subas un nivel." },
      {
        name: "Resistencia Enana",
        description:
          " Tienes resistencia al daño de veneno. También tienes ventaja en las tiradas de salvación para evitar o poner fin al estado de envenenado.",
      },
    ],
  },

  // 5. GNOMO
  {
    name: "Gnomo",
    creatureType: "Humanoide",
    size: "Small",
    speed: 9,
    darkvision: 18,
    description:
      "Pueblo pequeño e ingenioso, creados por dioses de la invención. Famosos por su astucia y magia oculta.",
    traits: [
      {
        name: "Astucia Gnoma",
        description:
          "Tienes ventaja en las tiradas de salvación de Inteligencia, Sabiduría y Carisma.",
      },
      {
        name: "Linaje gnomo",
        description:
          " Formas parte de un linaje que te otorga capacidades sobrenaturales. Escoge una de las siguientes opciones; elijas la que elijas, la Inteligencia, la Sabiduría o el Carisma es tu aptitud mágica para los conjuros que lances con este atributo (elige la característica al seleccionar el linaje): ",
      },
    ],
    table: {
      title: "Linajes Gnomos",
      headers: ["Linaje", "Beneficios Mágicos"],
      rows: [
        [
          "Gnomo de las Rocas",
          " Conoces los trucos prestidigitación y reparar. Además, puedes pasar 10 minutos lanzando prestidigitación para crear un dispositivo mecánico Diminuto (CA 5, 1 pg), como un juguete, un encendedor o una caja de música. Cuando crees el dispositivo, determinarás su función eligiendo un efecto de prestidigitación. El dispositivo producirá ese efecto cada vez que otra criatura o tú empleéis una acción adicional para activarlo con un toque. Si el efecto elegido tiene varias opciones, escoges una de ellas para el dispositivo cuando lo crees. Por ejemplo, si eliges el efecto de encender o apagar del conjuro, determinas si el dispositivo enciende o apaga los fuegos: el dispositivo no hace ambas cosas. Puedes tener tres de estos dispositivos activos al mismo tiempo y se desarman 8 horas después de crearlos o cuando los desmontes con un toque como acción de utilizar. ",
        ],
        [
          "Gnomo de los Bosques",
          " Conoces el truco ilusión menor. Además, siempre tienes el conjuro hablar con los animales preparado. Puedes lanzarlo sin gastar un espacio de conjuro una cantidad de veces igual a tu bonificador por competencia y recuperas todos los usos tras finalizar un descanso largo. También puedes usar cualquier espacio de conjuro que tengas para lanzarlo.",
        ],
      ],
    },
  },

  // 6. GOLIAT
  {
    name: "Goliat",
    creatureType: "Humanoide",
    size: "Medium",
    speed: 10.5, // 35 pies
    darkvision: 0,
    description:
      "Descendientes lejanos de los gigantes. Dominan las cumbres y poseen una fuerza colosal.",
    traits: [
      {
        name: "Constitución Poderosa",
        description:
          " Tienes ventaja en cualquier prueba de característica que hagas para poner fin al estado de agarrado. Además, al determinar tu capacidad de carga, cuentas como si tuvieras un tamaño una categoría superior.",
      },
      {
        name: "Forma Grande",
        description:
          " A partir del nivel 5 de personaje, puedes cambiar de tamaño a Grande como acción adicional si estás en un lugar lo bastante espacioso. Esta transformación dura 10 minutos o hasta que le pongas fin (no requiere acción). Durante ese tiempo, tendrás ventaja en las pruebas de Fuerza y tu velocidad aumentará en 3 m. Cuando uses este atributo, no podrás volver a hacerlo hasta que finalices un descanso largo.",
      },
      {
        name: "Linaje Gigante",
        description:
          " Desciendes de los gigantes. Elige uno de los siguientes beneficios sobrenaturales que te concede tu linaje; podrás usar el beneficio elegido una cantidad de veces igual a tu bonificador por competencia y recuperas todos los usos tras finalizar un descanso largo: ",
      },
    ],
    table: {
        title: "Linaje Gigante",
      headers: ["Ancestro", "Beneficio Sobrenatural"],
      rows: [
        ["Excursión de las nubes (gigante de las nubes)", "Como acción adicional, te teletransportas mágicamente hasta 9 m a un espacio sin ocupar que puedas ver. "],
        ["Abrasión del fuego (gigante de fuego)", "Cuando aciertes a un objetivo con una tirada de ataque y le causes daño, también puedes causarle 1d10 de daño de fuego."],
        ["Frío de la escarcha (gigante de escarcha)", "Cuando aciertes a un objetivo con una tirada de ataque y le causes daño, también puedes causarle 1d6 de daño de frío y reducir su velocidad en 3 m hasta el principio de tu siguiente turno."],
        ["Caída de las colinas (gigante de las colinas)", "Cuando aciertes a una criatura Grande o más pequeña con una tirada de ataque y le causes daño, también puedes infligirle el estado de derribada."],
        ["Resistencia de la piedra (gigante de piedra)", "Cuando recibas daño, puedes usar una reacción para tirar 1d12. Suma tu modificador por Constitución al resultado y reduce el daño en ese total."],
        ["Trueno de la tormenta (gigante de las tormentas)", "Cuando una criatura que esté a 18 m o menos de ti te cause daño, puedes usar una reacción para infligirle 1d8 de daño de trueno."],
      ],
    },
  },

  // 7. HUMANO
  {
    name: "Humano",
    creatureType: "Humanoide",
    size: "Medium", // El manual dice que se elige al crear, ponemos Medium por defecto
    speed: 9,
    darkvision: 0,
    description:
      "Ambiciosos e ingeniosos, se han dispersado por todo el multiverso logrando grandes hazañas en sus cortas vidas.",
    traits: [
      {
        name: "Diestro",
        description: "Ganas competencia en una habilidad de tu elección.",
      },
      {
        name: "Ingenioso",
        description:
          "Obtienes Inspiración Heroica tras finalizar un descanso largo.",
      },
      {
        name: "Versátil",
        description:
          "Obtienes una Dote de Origen de tu elección",
      },
    ],
  },

  // 8. MEDIANO
  {
    name: "Mediano",
    creatureType: "Humanoide",
    size: "Small",
    speed: 9,
    darkvision: 0,
    description:
      "Gente pequeña, amable y valiente. Suelen pasar desapercibidos y tienen una suerte sobrenatural.",
    traits: [
      {
        name: "Agilidad de Mediano",
        description:
          "Puedes moverte a través del espacio ocupado por cualquier criatura de tamaño superior al tuyo, pero no puedes detenerte en el mismo espacio. ",
      },
      {
        name: "Fortuna",
        description:
          "Cuando saques un 1 en una prueba con d20, podrás repetir la tirada y deberás utilizar el nuevo resultado. ",
      },
      {
        name: "Sigiloso por Naturaleza",
        description: " Puedes llevar a cabo la acción de esconderte incluso tras una criatura cuyo tamaño sea, al menos, una categoría superior al tuyo.",
      },
      {
        name: "Valiente",
        description: "Tienes ventaja en las tiradas de salvación que hagas para evitar o poner fin al estado de asustado. ",
      },
    ],
  },

  // 9. ORCO
  {
    name: "Orco",
    creatureType: "Humanoide",
    size: "Medium",
    speed: 9,
    darkvision: 36, // 120 pies
    description:
      "Creados por Gruumsh para resistir y recorrer las tierras más duras. Son incansables y determinados.",
    traits: [
      {
        name: "Aguante Incansable",
        description:
          "Cuando tus puntos de golpe se reducen a O pero no mueres inmediatamente, puedes recuperar 1 punto de golpe. Cuando uses este atributo, no podrás volver a hacerlo hasta que finalices un descanso largo.",
      },
      {
        name: "Descarga de Adrenalina",
        description:
          "Puedes llevar a cabo la acción de correr como acción adicional. Cuando lo hagas, obtendrás una cantidad de puntos de golpe temporales igual a tu bonificador por competencia. Puedes usar este atributo una cantidad de veces igual a tu bonificador por competencia y recuperas todos los usos tras finalizar un descanso corto o largo. ",
      },
    ],
  },

  // 10. TIEFLING
  {
    name: "Tiefling",
    creatureType: "Humanoide",
    size: "Medium",
    speed: 9,
    darkvision: 18,
    description:
      "Mortales con un legado infernal vinculado a los Planos Inferiores (Abismo, Gehenna o Nueve Infiernos).",
    traits: [
      {
        name: "Presencia Sobrenatural",
        description: "Conoces el truco taumaturgia. Cuando lo lances con este atributo, el conjuro utiliza la misma aptitud mágica que la de tu atributo Legado infernal.",
      },
      {
        name: "Legado Infernal",
        description:
          "Eres el destinatario de un legado que te otorga capacidades sobrenaturales. Elige un legado de la tabla “Legados infernales”. Obtienes el beneficio de nivel 1 del legado elegido. Cuando alcanzas los niveles 3 y 5 de personaje, aprendes un conjuro de nivel superior, como se muestra en la tabla. ",
      },
    ],
    table: {
      title: "Legados Infernales",
      headers: ["Legado", "Resistencia", "Truco (Nv 1)", "Nv 3", "Nv 5"],
      rows: [
        ["Abisal", "Veneno", "Rociada Venenosa", "Rayo Nauseabundo", "Inmovilizar Persona"],
        ["Ctónico", "Necrótico", "Toque Helado", "Falsa Vida", "Rayo debilitador"],
        ["Infernal", "Fuego", "Descarga de Fuego", "Represension Infernal", "Oscuridad"],
      ],
    },
  },
];

const seedSpecies = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🔌 Conectado a MongoDB...");

    // Limpiamos la colección para evitar duplicados
    await Species.deleteMany();
    console.log("🧹 Colección de especies limpiada.");

    // Insertamos los nuevos datos
    await Species.insertMany(speciesData);
    console.log("🌱 10 Especies Oficiales D&D 2024 cargadas exitosamente.");

    process.exit();
  } catch (error) {
    console.error("❌ Error en el seeder:", error);
    process.exit(1);
  }
};

seedSpecies();
