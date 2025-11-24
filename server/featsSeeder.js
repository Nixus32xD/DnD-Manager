import mongoose from "mongoose";
import dotenv from "dotenv";
import Feat from "./models/Feat.js";

dotenv.config();

const seedFeats = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado a MongoDB para seedear dotes");

    // Primero, limpiamos la colección de dotes
    await Feat.deleteMany();
    console.log("🗑️  Colección de dotes limpiada");

    // Luego, insertamos los dotes desde el array featsData

    const feats = [
      // ===========================================================================
      // DOTES DE ORIGEN (ORIGIN FEATS) - Sin nivel mínimo, otorgadas por Trasfondo
      // ===========================================================================
      {
        name: "Afortunado",
        category: "Origin",
        description:
          "Tienes una suerte inexplicable que parece intervenir en los momentos justos.",
        benefits: [
          "Puntos de suerte: Tienes una cantidad de puntos de suerte igual a tu bonificador por competencia. Recuperas los puntos tras un descanso largo.",
          "Ventaja: Cuando tires 1d20 para una prueba, puedes gastar 1 punto de suerte para otorgarte ventaja.",
          "Desventaja: Cuando una criatura te ataque, puedes gastar 1 punto de suerte para imponerle desventaja.",
        ],
      },
      {
        name: "Alerta",
        category: "Origin",
        description: "Siempre estás atento al peligro.",
        benefits: [
          "Competencia en iniciativa: Puedes sumar tu bonificador por competencia a las tiradas de iniciativa.",
          "Intercambio de iniciativa: Justo después de tirar iniciativa, puedes cambiar tu resultado con el de un aliado dispuesto en el mismo combate.",
        ],
      },
      {
        name: "Atacante Salvaje",
        category: "Origin",
        description:
          "Te has preparado para asestar golpes especialmente dañinos.",
        benefits: [
          "Una vez por turno, cuando aciertes con un arma, puedes tirar dos veces los dados de daño y usar el resultado que prefieras.",
        ],
      },
      {
        name: "Duro",
        category: "Origin",
        description:
          "Tu piel es más gruesa y tu resistencia mayor que la media.",
        benefits: [
          "Tus puntos de golpe máximos aumentan en una cantidad igual al doble de tu nivel cuando adquieres esta dote.",
          "Cada vez que subas de nivel, tus puntos de golpe máximos aumentan en 2 adicionales.",
        ],
      },
      {
        name: "Fabricante",
        category: "Origin",
        description:
          "Eres un experto creando objetos útiles y consiguiendo buenos precios.",
        benefits: [
          "Competencia con herramientas: Ganas competencia con tres herramientas de artesano de tu elección (tabla Fabricación rápida).",
          "Descuento: Cuando compres un objeto no mágico, consigues un 20% de descuento.",
          "Fabricación rápida: Tras un descanso largo, puedes fabricar un objeto de la tabla si tienes las herramientas. Dura hasta el siguiente descanso largo.",
        ],
      },
      {
        name: "Habilidoso",
        category: "Origin",
        description:
          "Tienes un talento excepcional para aprender nuevas capacidades.",
        benefits: [
          "Ganas competencia en cualquier combinación de tres habilidades o herramientas que elijas.",
          "Esta dote puede elegirse más de una vez.",
        ],
      },
      {
        name: "Iniciado en la Magia",
        category: "Origin",
        description:
          "Has aprendido los rudimentos de una clase lanzadora de conjuros.",
        benefits: [
          "Dos trucos: Aprendes dos trucos de la lista de Clérigo, Druida o Mago.",
          "Conjuro de nivel 1: Elige un conjuro de nivel 1 de la misma lista. Puedes lanzarlo una vez gratis por descanso largo y también usando espacios de conjuro.",
          "Puedes cambiar el conjuro de nivel 1 cada vez que subas de nivel.",
        ],
      },
      {
        name: "Matón de Taberna",
        category: "Origin",
        description:
          "Estás acostumbrado a peleas sucias y a usar lo que tengas a mano.",
        benefits: [
          "Ataque sin armas mejorado: Tu daño sin armas es 1d4 + mod. Fuerza.",
          "Repetir daño: Puedes volver a tirar los 1s en el dado de daño de ataques sin armas.",
          "Armas improvisadas: Tienes competencia con armas improvisadas.",
          "Empujar: Cuando aciertes un ataque sin armas, puedes empujar al objetivo 1,5 m una vez por turno.",
        ],
      },
      {
        name: "Músico",
        category: "Origin",
        description: "Tu música inspira y fortalece a tus aliados.",
        benefits: [
          "Formación instrumental: Ganas competencia con tres instrumentos musicales.",
          "Canción alentadora: Al terminar un descanso, tocas una canción y otorgas Inspiración Heroica a una cantidad de aliados igual a tu bonificador por competencia.",
        ],
      },
      {
        name: "Sanador",
        category: "Origin",
        description:
          "Eres un médico de campo capaz de tratar heridas rápidamente.",
        benefits: [
          "Médico de batalla: Puedes gastar un uso de útiles de sanador y la acción de Utilizar para que una criatura gaste un dado de golpe y recupere pg igual a la tirada + tu bonificador por competencia.",
          "Repetir tiradas: Si sacas un 1 en un dado de curación de un conjuro o de este rasgo, puedes volver a tirarlo.",
        ],
      },

      // ===========================================================================
      // DOTES GENERALES (GENERAL FEATS) - Requieren Nivel 4+
      // ===========================================================================
      {
        name: "Acechador",
        category: "General",
        prerequisites: { level: 4, stat: { name: "Destreza", value: 13 } },
        description:
          "Eres un experto en moverte por las sombras y atacar sin ser visto.",
        benefits: [
          "Mejora de característica: +1 a Destreza (máx 20).",
          "Visión ciega: Tienes visión ciega hasta 3 m.",
          "Niebla de guerra: Tienes ventaja en Sigilo durante el combate.",
          "En la sombra: Si fallas un ataque estando escondido, la tirada no revela tu ubicación.",
        ],
      },
      {
        name: "Actor",
        category: "General",
        prerequisites: { level: 4, stat: { name: "Carisma", value: 13 } },
        description: "Dominas el arte de la suplantación y la imitación.",
        benefits: [
          "Mejora de característica: +1 a Carisma (máx 20).",
          "Suplantación: Ventaja en Carisma (Engaño/Interpretación) al hacerte pasar por otra persona.",
          "Imitación: Puedes imitar sonidos y voces de otras criaturas (CD Perspicacia 8 + mod + prof).",
        ],
      },
      {
        name: "Apresador",
        category: "General",
        prerequisites: {
          level: 4,
          stat: { name: "Fuerza o Destreza", value: 13 },
        },
        description:
          "Has desarrollado habilidades de lucha cuerpo a cuerpo centradas en el agarre.",
        benefits: [
          "Mejora de característica: +1 a Fuerza o Destreza (máx 20).",
          "Golpear y agarrar: Al acertar un ataque sin armas, puedes dañar y agarrar a la vez (una vez por turno).",
          "Ventaja al atacar: Tienes ventaja en ataques contra criaturas que tengas agarradas.",
          "Luchador rápido: Mover a una criatura agarrada de tu tamaño o menor no te cuesta movimiento extra.",
        ],
      },
      {
        name: "Atacante a la Carga",
        category: "General",
        prerequisites: {
          level: 4,
          stat: { name: "Fuerza o Destreza", value: 13 },
        },
        description: "Te lanzas al combate con un ímpetu arrollador.",
        benefits: [
          "Mejora de característica: +1 a Fuerza o Destreza (máx 20).",
          "Carrera mejorada: Al usar la acción de Correr, tu velocidad aumenta 3 m.",
          "Ataque con carga: Si te mueves 3 m en línea recta antes de atacar, puedes hacer 1d8 daño extra o empujar al objetivo 3 m.",
        ],
      },
      {
        name: "Atleta",
        category: "General",
        prerequisites: {
          level: 4,
          stat: { name: "Fuerza o Destreza", value: 13 },
        },
        description: "Has perfeccionado tu cuerpo para el movimiento físico.",
        benefits: [
          "Mejora de característica: +1 a Fuerza o Destreza (máx 20).",
          "Velocidad trepando: Obtienes velocidad de trepar igual a tu velocidad.",
          "Levantarse de un salto: Levantarte de estar derribado solo cuesta 1,5 m.",
          "Saltar: Puedes saltar con carrera moviéndote solo 1,5 m antes.",
        ],
      },
      {
        name: "Azote de Magos",
        category: "General",
        prerequisites: { level: 4 },
        description:
          "Te has entrenado para cazar y combatir a usuarios de magia.",
        benefits: [
          "Mejora de característica: +1 a Fuerza o Destreza (máx 20).",
          "Anticoncentración: Cuando dañas a una criatura que se concentra, tiene desventaja en la tirada de salvación.",
          "Mente robusta: Si fallas una salvación de Int, Sab o Car, puedes convertirla en éxito (1/descanso).",
        ],
      },
      {
        name: "Centinela",
        category: "General",
        prerequisites: {
          level: 4,
          stat: { name: "Fuerza o Destreza", value: 13 },
        },
        description:
          "Dominas las técnicas para aprovechar los descuidos de tus enemigos.",
        benefits: [
          "Mejora de característica: +1 a Fuerza o Destreza (máx 20).",
          "Guardián: Puedes hacer ataque de oportunidad incluso si el enemigo usa Destrabarse, o si ataca a un aliado a 1,5 m de ti.",
          "Detener: Si aciertas un ataque de oportunidad, la velocidad del objetivo se vuelve 0.",
        ],
      },
      {
        name: "Chef",
        category: "General",
        prerequisites: { level: 4 },
        description: "Sabes preparar comidas que reconfortan y sanan.",
        benefits: [
          "Mejora de característica: +1 a Constitución o Sabiduría (máx 20).",
          "Útiles de cocinero: Ganas competencia.",
          "Comida reconstituyente: En descanso corto, cocinas para recuperar 1d8 extra al gastar dados de golpe.",
          "Tentempiés tonificantes: Creas snacks que otorgan puntos de golpe temporales como acción adicional.",
        ],
      },
      {
        name: "Combatiente con Dos Armas",
        category: "General",
        prerequisites: {
          level: 4,
          stat: { name: "Fuerza o Destreza", value: 13 },
        },
        description: "Eres un maestro luchando con un arma en cada mano.",
        benefits: [
          "Mejora de característica: +1 a Fuerza o Destreza (máx 20).",
          "Manejo doble mejorado: Puedes usar el combate con dos armas incluso si una de las armas no es ligera.",
          "Desenvainar rápido: Puedes desenvainar o envainar dos armas a la vez.",
        ],
      },
      {
        name: "Combatiente Montado",
        category: "General",
        prerequisites: { level: 4 },
        description: "Eres un jinete experto, letal a lomos de una montura.",
        benefits: [
          "Mejora de característica: +1 a Fuerza, Destreza o Sabiduría (máx 20).",
          "Golpe montado: Ventaja en ataques contra criaturas a pie más pequeñas que tu montura.",
          "Esquivar de un salto: Tu montura recibe los beneficios de Evasión (mitad de daño o nada en salvaciones Des).",
          "Girar bruscamente: Puedes redirigir un ataque contra tu montura hacia ti.",
        ],
      },
      {
        name: "Duelista Defensivo",
        category: "General",
        prerequisites: { level: 4, stat: { name: "Destreza", value: 13 } },
        description: "Usas tu arma con agilidad para desviar ataques.",
        benefits: [
          "Mejora de característica: +1 a Destreza (máx 20).",
          "Parada: Si empuñas un arma sutil y te aciertan cuerpo a cuerpo, puedes usar tu reacción para sumar tu bonificador de competencia a la CA, pudiendo fallar el ataque.",
        ],
      },
      {
        name: "Entrenamiento con Armas Marciales",
        category: "General",
        prerequisites: { level: 4 },
        description:
          "Te has entrenado extensivamente en el uso de armas de guerra.",
        benefits: [
          "Mejora de característica: +1 a Fuerza o Destreza (máx 20).",
          "Competencia con armas: Obtienes competencia con todas las armas marciales.",
        ],
      },
      {
        name: "Envenenador",
        category: "General",
        prerequisites: { level: 4 },
        description: "Eres un experto en preparar y aplicar toxinas letales.",
        benefits: [
          "Mejora de característica: +1 a Destreza o Inteligencia (máx 20).",
          "Veneno potente: Tu daño de veneno ignora resistencia.",
          "Preparar veneno: Puedes crear dosis de veneno potente (2d8 daño y envenenado) con tus útiles.",
        ],
      },
      {
        name: "Experto en Ballestas",
        category: "General",
        prerequisites: { level: 4, stat: { name: "Destreza", value: 13 } },
        description:
          "Eres letal con la ballesta, disparando a gran velocidad y corta distancia.",
        benefits: [
          "Mejora de característica: +1 a Destreza (máx 20).",
          "Ignorar la recarga: Ignoras la propiedad de recarga de las ballestas.",
          "Disparar cuerpo a cuerpo: No tienes desventaja al disparar con enemigos a 1,5 m.",
          "Manejo doble: Si atacas con un arma ligera, puedes atacar con una ballesta ligera de mano como extra sumando tu modificador.",
        ],
      },
      {
        name: "Experto en Habilidades",
        category: "General",
        prerequisites: { level: 4 },
        description: "Has perfeccionado tus talentos hasta la maestría.",
        benefits: [
          "Mejora de característica: +1 a una característica a tu elección (máx 20).",
          "Competencia: Ganas competencia en una habilidad.",
          "Pericia: Elige una habilidad competente; ganas pericia (doble bonificador).",
        ],
      },
      {
        name: "Influencia Feérica",
        category: "General",
        prerequisites: { level: 4 },
        description:
          "Has sido tocado por la magia impredecible de los Parajes Feéricos.",
        benefits: [
          "Mejora de característica: +1 a Inteligencia, Sabiduría o Carisma (máx 20).",
          "Magia feérica: Aprendes Paso Brumoso y un conjuro de nivel 1 (Adivinación/Encantamiento). Puedes lanzarlos gratis 1/día.",
        ],
      },
      {
        name: "Influencia Sombría",
        category: "General",
        prerequisites: { level: 4 },
        description: "La oscuridad del Páramo Sombrío se aferra a ti.",
        benefits: [
          "Mejora de característica: +1 a Inteligencia, Sabiduría o Carisma (máx 20).",
          "Magia de las sombras: Aprendes Invisibilidad y un conjuro de nivel 1 (Ilusionismo/Nigromancia). Puedes lanzarlos gratis 1/día.",
        ],
      },
      {
        name: "Lanzador en Combate",
        category: "General",
        prerequisites: { level: 4, classFeature: "Lanzamiento de Conjuros" },
        description: "Eres capaz de usar magia en el fragor de la batalla.",
        benefits: [
          "Mejora de característica: +1 a Inteligencia, Sabiduría o Carisma (máx 20).",
          "Concentración: Ventaja en salvaciones de Constitución para mantener concentración.",
          "Conjuro reactivo: Puedes lanzar un conjuro como reacción en lugar de un ataque de oportunidad.",
          "Componentes somáticos: Puedes realizar gestos con armas/escudo en las manos.",
        ],
      },
      {
        name: "Lanzador Preciso",
        category: "General",
        prerequisites: { level: 4, classFeature: "Lanzamiento de Conjuros" },
        description:
          "Tu magia alcanza objetivos lejanos o cubiertos con precisión letal.",
        benefits: [
          "Mejora de característica: +1 a Inteligencia, Sabiduría o Carisma (máx 20).",
          "Sortear la cobertura: Ignoras cobertura media y tres cuartos con conjuros.",
          "Lanzar cuerpo a cuerpo: No tienes desventaja al atacar con conjuros a quemarropa.",
          "Alcance aumentado: Aumentas el alcance de conjuros de ataque en 18 m.",
        ],
      },
      {
        name: "Lanzador Ritual",
        category: "General",
        prerequisites: { level: 4, stat: { name: "Int/Sab/Car", value: 13 } },
        description: "Has aprendido a lanzar magia compleja mediante rituales.",
        benefits: [
          "Mejora de característica: +1 a Inteligencia, Sabiduría o Carisma (máx 20).",
          "Conjuros rituales: Aprendes conjuros rituales de nivel 1 igual a tu bonificador de competencia.",
          "Ritual rápido: Una vez por día, puedes lanzar un ritual con su tiempo normal (sin los 10 min extra).",
        ],
      },
      {
        name: "Líder Inspirador",
        category: "General",
        prerequisites: {
          level: 4,
          stat: { name: "Sabiduría o Carisma", value: 13 },
        },
        description: "Tus palabras infunden vigor y resolución a tus aliados.",
        benefits: [
          "Mejora de característica: +1 a Sabiduría o Carisma (máx 20).",
          "Interpretación fortalecedora: Tras un descanso, das puntos de golpe temporales (Nivel + Modificador) a hasta 6 aliados.",
        ],
      },
      {
        name: "Ligeramente Acorazado",
        category: "General",
        prerequisites: { level: 4 },
        description: "Has entrenado para moverte con armaduras ligeras.",
        benefits: [
          "Mejora de característica: +1 a Fuerza o Destreza (máx 20).",
          "Entrenamiento: Ganas competencia con armaduras ligeras y escudos.",
        ],
      },
      {
        name: "Maestro de Armas",
        category: "General",
        prerequisites: { level: 4 },
        description:
          "Te has especializado en el uso de técnicas avanzadas con armas.",
        benefits: [
          "Mejora de característica: +1 a Fuerza o Destreza (máx 20).",
          "Propiedad de maestría: Puedes usar la propiedad de maestría de un tipo de arma a tu elección.",
        ],
      },
      {
        name: "Maestro en Armaduras Medias",
        category: "General",
        prerequisites: { level: 4, classFeature: "Armadura Media" },
        description:
          "Te mueves con agilidad incluso llevando cota de escamas o coraza.",
        benefits: [
          "Mejora de característica: +1 a Fuerza o Destreza (máx 20).",
          "Portador diestro: Puedes sumar hasta +3 de Destreza a tu CA con armadura media (en lugar de +2).",
        ],
      },
      {
        name: "Maestro en Armaduras Pesadas",
        category: "General",
        prerequisites: { level: 4, classFeature: "Armadura Pesada" },
        description:
          "Usas tu armadura para desviar golpes que matarían a otros.",
        benefits: [
          "Mejora de característica: +1 a Constitución o Fuerza (máx 20).",
          "Reducción de daño: Reduces el daño contundente, cortante y perforante recibido en una cantidad igual a tu bonificador por competencia.",
        ],
      },
      {
        name: "Maestro en Armas de Asta",
        category: "General",
        prerequisites: {
          level: 4,
          stat: { name: "Fuerza o Destreza", value: 13 },
        },
        description: "Eres letal con alabardas, gujas, lanzas y bastones.",
        benefits: [
          "Mejora de característica: +1 a Fuerza o Destreza (máx 20).",
          "Golpe con asta: Acción adicional para golpear con el mango (1d4 daño).",
          "Golpe reactivo: Provocas ataque de oportunidad cuando entran en tu alcance.",
        ],
      },
      {
        name: "Maestro en Armas Pesadas",
        category: "General",
        prerequisites: { level: 4, stat: { name: "Fuerza", value: 13 } },
        description:
          "Usas el peso de tu arma para asestar golpes devastadores.",
        benefits: [
          "Mejora de característica: +1 a Fuerza (máx 20).",
          "Maestría: Sumas tu bonificador de competencia al daño con armas pesadas.",
          "Avasallar: Si haces crítico o matas, puedes hacer un ataque extra como acción adicional.",
        ],
      },
      {
        name: "Maestro en Escudos",
        category: "General",
        prerequisites: { level: 4, classFeature: "Escudos" },
        description:
          "Usas tu escudo tanto para atacar como para protegerte de explosiones.",
        benefits: [
          "Mejora de característica: +1 a Fuerza (máx 20).",
          "Golpe con escudo: Tras atacar, puedes empujar o derribar con el escudo.",
          "Interponer escudo: Reacción para no recibir daño en salvaciones de Destreza exitosas.",
        ],
      },
      {
        name: "Mejora de Característica",
        category: "General",
        prerequisites: { level: 4 },
        description: "Entrenas tu cuerpo o mente para superar tus límites.",
        benefits: [
          "Aumenta una puntuación en 2 o dos puntuaciones en 1 (máx 20).",
          "Esta dote puede elegirse múltiples veces.",
        ],
      },
      {
        name: "Mente Aguda",
        category: "General",
        prerequisites: { level: 4, stat: { name: "Inteligencia", value: 13 } },
        description: "Tienes una mente analítica y una memoria fotográfica.",
        benefits: [
          "Mejora de característica: +1 a Inteligencia (máx 20).",
          "Sabiduría popular: Ganas pericia en una habilidad de conocimiento (Arcanos, Historia, etc.).",
          "Estudio rápido: Puedes usar la acción de Estudiar como acción adicional.",
        ],
      },
      {
        name: "Moderadamente Acorazado",
        category: "General",
        prerequisites: { level: 4, classFeature: "Armadura Ligera" },
        description: "Te has entrenado para usar armaduras más resistentes.",
        benefits: [
          "Mejora de característica: +1 a Fuerza o Destreza (máx 20).",
          "Entrenamiento: Ganas competencia con armaduras medias.",
        ],
      },
      {
        name: "Muy Acorazado",
        category: "General",
        prerequisites: { level: 4, classFeature: "Armadura Media" },
        description: "Te has entrenado para usar las armaduras más pesadas.",
        benefits: [
          "Mejora de característica: +1 a Constitución o Fuerza (máx 20).",
          "Entrenamiento: Ganas competencia con armaduras pesadas.",
        ],
      },
      {
        name: "Observador",
        category: "General",
        prerequisites: {
          level: 4,
          stat: { name: "Inteligencia o Sabiduría", value: 13 },
        },
        description: "Notas detalles que a otros se les escapan.",
        benefits: [
          "Mejora de característica: +1 a Inteligencia o Sabiduría (máx 20).",
          "Observador perspicaz: Ganas pericia en Investigación, Percepción o Perspicacia.",
          "Búsqueda rápida: Puedes usar la acción de Buscar como acción adicional.",
        ],
      },
      {
        name: "Perforador",
        category: "General",
        prerequisites: { level: 4 },
        description: "Sabes encontrar los puntos débiles con armas punzantes.",
        benefits: [
          "Mejora de característica: +1 a Fuerza o Destreza (máx 20).",
          "Horadar: Puedes volver a tirar un dado de daño perforante por turno.",
          "Crítico potenciado: Añades un dado extra de daño en críticos perforantes.",
        ],
      },
      {
        name: "Rebanador",
        category: "General",
        prerequisites: { level: 4 },
        description: "Tus cortes merman la capacidad del enemigo.",
        benefits: [
          "Mejora de característica: +1 a Fuerza o Destreza (máx 20).",
          "Lacerar: Reduce la velocidad del enemigo en 3 m al acertar daño cortante (1/turno).",
          "Crítico potenciado: El objetivo tiene desventaja en ataques tras un crítico cortante.",
        ],
      },
      {
        name: "Resiliente",
        category: "General",
        prerequisites: { level: 4 },
        description:
          "Has desarrollado una resistencia mental o física superior.",
        benefits: [
          "Mejora de característica: +1 a una característica en la que no tengas competencia en salvaciones.",
          "Competencia: Ganas competencia en las tiradas de salvación de esa característica.",
        ],
      },
      {
        name: "Resistente",
        category: "General",
        prerequisites: { level: 4 },
        description: "Eres extraordinariamente difícil de matar.",
        benefits: [
          "Mejora de característica: +1 a Constitución (máx 20).",
          "Desafiar a la muerte: Ventaja en salvaciones contra muerte.",
          "Recuperación rápida: Puedes gastar un dado de golpe como acción adicional para curarte.",
        ],
      },
      {
        name: "Telepático",
        category: "General",
        prerequisites: { level: 4 },
        description: "Has despertado capacidades psiónicas latentes.",
        benefits: [
          "Mejora de característica: +1 a Inteligencia, Sabiduría o Carisma (máx 20).",
          "Habla telepática: Puedes hablar mentalmente a 18 m.",
          "Detectar pensamientos: Puedes lanzar este conjuro gratis una vez al día.",
        ],
      },
      {
        name: "Telequinético",
        category: "General",
        prerequisites: { level: 4 },
        description: "Puedes mover cosas con la mente.",
        benefits: [
          "Mejora de característica: +1 a Inteligencia, Sabiduría o Carisma (máx 20).",
          "Telequinesis menor: Aprendes Mano de Mago invisible y mejorada.",
          "Empellón: Acción adicional para empujar a una criatura 1,5 m (salvación Fuerza).",
        ],
      },
      {
        name: "Tirador de Primera",
        category: "General",
        prerequisites: { level: 4, stat: { name: "Destreza", value: 13 } },
        description: "Eres un maestro del combate a distancia.",
        benefits: [
          "Mejora de característica: +1 a Destreza (máx 20).",
          "Sortear cobertura: Ignoras cobertura media y tres cuartos.",
          "Disparar cuerpo a cuerpo: No tienes desventaja al disparar con enemigos cerca.",
          "Tiros lejanos: No tienes desventaja al disparar a largo alcance.",
        ],
      },
      {
        name: "Triturador",
        category: "General",
        prerequisites: { level: 4 },
        description:
          "Tus golpes contundentes desorientan y mueven a los enemigos.",
        benefits: [
          "Mejora de característica: +1 a Fuerza o Constitución (máx 20).",
          "Empujar: Mueves al objetivo 1,5 m al acertar con daño contundente (1/turno).",
          "Crítico potenciado: Los ataques contra el objetivo tienen ventaja tras un crítico contundente.",
        ],
      },
      {
        name: "Veloz",
        category: "General",
        prerequisites: {
          level: 4,
          stat: { name: "Destreza o Constitución", value: 13 },
        },
        description: "Eres excepcionalmente rápido y ágil.",
        benefits: [
          "Mejora de característica: +1 a Destreza o Constitución (máx 20).",
          "Aumento de velocidad: +3 m de velocidad.",
          "Correr por terreno difícil: Al usar Correr, ignoras terreno difícil.",
          "Movimiento ágil: No provocas ataques de oportunidad de criaturas a las que ataques.",
        ],
      },
      {
        name: "Versado en un Elemento",
        category: "General",
        prerequisites: { level: 4, classFeature: "Lanzamiento de Conjuros" },
        description: "Tu magia elemental es imparable.",
        benefits: [
          "Mejora de característica: +1 a Int/Sab/Car (máx 20).",
          "Dominio de la energía: Elige un tipo (ácido, frío, fuego, etc.). Tus conjuros ignoran resistencia a ese tipo.",
          "Potencia: Tratas los 1s en los dados de daño como 2s.",
        ],
      },

      // ===========================================================================
      // ESTILOS DE COMBATE (FIGHTING STYLE FEATS) - Requieren rasgo de clase
      // ===========================================================================
      {
        name: "Combate con Armas a Dos Manos",
        category: "Fighting Style",
        prerequisites: { classFeature: "Estilo de Combate" },
        description: "Eres experto en usar armas pesadas.",
        benefits: [
          "Cuando saques un 1 o 2 en el dado de daño con un arma a dos manos, puedes tratarlos como un 3.",
        ],
      },
      {
        name: "Combate con Armas Arrojadizas",
        category: "Fighting Style",
        prerequisites: { classFeature: "Estilo de Combate" },
        description: "Lanzas armas con fuerza letal.",
        benefits: ["+2 al daño con armas arrojadizas."],
      },
      {
        name: "Combate con Dos Armas",
        category: "Fighting Style",
        prerequisites: { classFeature: "Estilo de Combate" },
        description: "Luchas fluidamente con un arma en cada mano.",
        benefits: [
          "Puedes sumar tu modificador de característica al daño del segundo ataque.",
        ],
      },
      {
        name: "Combate sin Armas",
        category: "Fighting Style",
        prerequisites: { classFeature: "Estilo de Combate" },
        description: "Tu cuerpo es un arma letal.",
        benefits: [
          "Tus ataques sin armas causan 1d6 (o 1d8 si no llevas escudo/armas) + Fuerza.",
          "Causas 1d4 daño extra al agarrar a alguien.",
        ],
      },
      {
        name: "Defensa",
        category: "Fighting Style",
        prerequisites: { classFeature: "Estilo de Combate" },
        description: "Te especializas en protegerte.",
        benefits: ["+1 a la Clase de Armadura mientras lleves armadura."],
      },
      {
        name: "Duelo",
        category: "Fighting Style",
        prerequisites: { classFeature: "Estilo de Combate" },
        description: "Luchas mejor con una sola arma.",
        benefits: [
          "+2 al daño cuando usas un arma cuerpo a cuerpo en una mano y ninguna en la otra.",
        ],
      },
      {
        name: "Intercepción",
        category: "Fighting Style",
        prerequisites: { classFeature: "Estilo de Combate" },
        description: "Proteges a tus aliados cercanos.",
        benefits: [
          "Reacción para reducir el daño a un aliado adyacente en 1d10 + competencia.",
        ],
      },
      {
        name: "Lucha a Ciegas",
        category: "Fighting Style",
        prerequisites: { classFeature: "Estilo de Combate" },
        description: "Puedes combatir sin ver a tus enemigos.",
        benefits: ["Obtienes Visión Ciega en un radio de 3 m."],
      },
      {
        name: "Protección",
        category: "Fighting Style",
        prerequisites: { classFeature: "Estilo de Combate" },
        description: "Usas tu escudo para defender a otros.",
        benefits: [
          "Reacción para imponer desventaja en un ataque contra un aliado a 1,5 m de ti (requiere escudo).",
        ],
      },
      {
        name: "Tiro con Arco",
        category: "Fighting Style",
        prerequisites: { classFeature: "Estilo de Combate" },
        description: "Eres un experto tirador.",
        benefits: ["+2 a las tiradas de ataque con armas a distancia."],
      },

      // ===========================================================================
      // DONES ÉPICOS (EPIC BOON FEATS) - Requieren Nivel 19+
      // ===========================================================================
      {
        name: "Don de la Fortaleza",
        category: "Epic Boon",
        prerequisites: { level: 19 },
        description: "Tu salud es legendaria.",
        benefits: [
          "Mejora de característica: +1 (máx 30).",
          "Salud fortalecida: +40 Puntos de Golpe máximos.",
          "Curación mejorada: Recuperas Constitución extra al curarte (1/turno).",
        ],
      },
      {
        name: "Don de la Habilidad",
        category: "Epic Boon",
        prerequisites: { level: 19 },
        description: "Dominas todas las facetas de la aventura.",
        benefits: [
          "Mejora de característica: +1 (máx 30).",
          "Experto polifacético: Competencia en TODAS las habilidades.",
          "Pericia: Ganas pericia en una habilidad.",
        ],
      },
      {
        name: "Don de la Pericia en Combate",
        category: "Epic Boon",
        prerequisites: { level: 19 },
        description: "Tus ataques rara vez fallan.",
        benefits: [
          "Mejora de característica: +1 (máx 30).",
          "Precisión sin igual: Puedes convertir un fallo en un acierto (1/combate).",
        ],
      },
      {
        name: "Don de la Recuperación",
        category: "Epic Boon",
        prerequisites: { level: 19 },
        description: "Te niegas a morir.",
        benefits: [
          "Mejora de característica: +1 (máx 30).",
          "Última defensa: Una vez por descanso largo, si caes a 0 pg, recuperas la mitad de tus pg máximos.",
          "Recuperar vitalidad: Acción adicional para gastar dados de una reserva de 10d10 y curarte.",
        ],
      },
      {
        name: "Don de la Resistencia a Energías",
        category: "Epic Boon",
        prerequisites: { level: 19 },
        description: "Eres inmune a los elementos.",
        benefits: [
          "Mejora de característica: +1 (máx 30).",
          "Resistencias: Elige dos tipos de daño (fuego, frío, etc.) para tener resistencia.",
          "Redirigir energía: Reacción para absorber daño elemental y redirigirlo a un enemigo.",
        ],
      },
      {
        name: "Don de la Velocidad",
        category: "Epic Boon",
        prerequisites: { level: 19 },
        description: "Te mueves con velocidad divina.",
        benefits: [
          "Mejora de característica: +1 (máx 30).",
          "Celeridad: Tu velocidad aumenta en 9 m.",
          "Artista escapista: Puedes destrabarte y escapar de agarres como acción adicional.",
        ],
      },
      {
        name: "Don de la Visión Verdadera",
        category: "Epic Boon",
        prerequisites: { level: 19 },
        description: "Nada puede esconderse de tu mirada.",
        benefits: [
          "Mejora de característica: +1 (máx 30).",
          "Visión verdadera: Tienes visión verdadera hasta 18 m.",
        ],
      },
      {
        name: "Don del Ataque Imparable",
        category: "Epic Boon",
        prerequisites: { level: 19 },
        description: "Tus golpes atraviesan cualquier defensa.",
        benefits: [
          "Mejora de característica: +1 a Fuerza o Destreza (máx 30).",
          "Superar defensas: Tu daño físico ignora resistencia.",
          "Golpe arrollador: En crítico (nat 20), haces daño extra igual a tu puntuación de característica.",
        ],
      },
      {
        name: "Don del Destino",
        category: "Epic Boon",
        prerequisites: { level: 19 },
        description: "Puedes alterar la suerte de los demás.",
        benefits: [
          "Mejora de característica: +1 (máx 30).",
          "Mejorar el destino: Puedes sumar o restar 2d4 a la tirada de d20 de otra criatura (1/combate).",
        ],
      },
      {
        name: "Don del Espíritu de la Noche",
        category: "Epic Boon",
        prerequisites: { level: 19 },
        description: "Te fundes con las sombras.",
        benefits: [
          "Mejora de característica: +1 (máx 30).",
          "Fusionarse con las sombras: En oscuridad, puedes volverte invisible como acción adicional.",
          "Forma sombría: Tienes resistencia a todo daño (menos psíquico/radiante) en la oscuridad.",
        ],
      },
      {
        name: "Don del Recuerdo de Conjuros",
        category: "Epic Boon",
        prerequisites: { level: 19, classFeature: "Lanzamiento de Conjuros" },
        description: "Tu mente retiene la magia sin esfuerzo.",
        benefits: [
          "Mejora de característica: +1 a Int/Sab/Car (máx 30).",
          "Lanzamiento gratuito: 33% de probabilidad de no gastar espacio al lanzar conjuros de nivel 1-4.",
        ],
      },
      {
        name: "Don del Viaje Dimensional",
        category: "Epic Boon",
        prerequisites: { level: 19 },
        description: "Caminas entre dimensiones al atacar.",
        benefits: [
          "Mejora de característica: +1 (máx 30).",
          "Pasos desplazadores: Te teletransportas 9 m gratis después de atacar o lanzar un conjuro.",
        ],
      },
    ];

    await Feat.insertMany(feats);
    console.log("Dotes insertadas correctamente.");
    process.exit(0);
  } catch (error) {
    console.error("Error al insertar dotes:", error);
    process.exit(1);
  }
};

seedFeats();
