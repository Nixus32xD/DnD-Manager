import mongoose from "mongoose";
import dotenv from "dotenv";
import Class from "../models/Class.js";

dotenv.config();

const barbarianData = {
  name: "Bárbaro",
  description:
    "Un guerrero feroz de origen primitivo que puede entrar en una furia de batalla impulsada por las fuerzas de la naturaleza.",
  hitDie: 12,
  primaryAbility: ["Fuerza"],
  savingThrows: ["Fuerza", "Constitución"],
  proficiencies: {
    armor: ["Ligeras", "Medias", "Escudos"],
    weapons: ["Sencillas", "Marciales"],
    tools: [],
  },
  skillChoices: {
    count: 2,
    list: [
      "Atletismo",
      "Intimidación",
      "Naturaleza",
      "Percepción",
      "Supervivencia",
      "Trato con animales",
    ],
  },
  startingEquipment: [
    "Hacha a dos manos",
    "Cuatro hachas de mano",
    "Paquete de explorador",
    "15 po",
  ],
  tableMetadata: {
    columns: [
      { label: "Furias", dataKey: "rages" },
      { label: "Daño Furia", dataKey: "rageDmg" },
      { label: "Maestría", dataKey: "weaponMastery" },
    ],
  },
  progression: [
    {
      level: 1,
      proficiencyBonus: 2,
      features: [
        {
          name: "Furia",
          description:
            "Puedes imbuirte de un poder primigenio llamado furia, que te otorga una fuerza y resistencia extraordinarias.\n\nPuedes dejarte llevar por ella como acción adicional si no llevas puesta una armadura pesada. Puedes dejarte llevar por la furia tantas veces como se indica para tu nivel de bárbaro en la columna de furias. Recuperas uno de los usos gastados tras finalizar un descanso corto y todos tras finalizar un descanso largo.\n\nMientras estés enfurecido, usa las siguientes reglas:\n\n<strong>Resistencia al daño.</strong> Tienes resistencia al daño contundente, cortante y perforante.\n\n<strong>Daño por furia.</strong> Cuando llevas a cabo un ataque que use la Fuerza (ya sea con un arma o un ataque sin armas) y causas daño al objetivo, obtienes un bonificador al daño que aumenta conforme subes de nivel de bárbaro, como se muestra en la columna “Daño por furia” de la tabla “Rasgos de bárbaro”.\n\n<strong>Ventaja en Fuerza.</strong> Tienes ventaja en las pruebas de Fuerza y en las tiradas de salvación de Fuerza.\n\n<strong>Sin concentración ni conjuros.</strong> No puedes mantener la concentración ni lanzar conjuros.\n\n<strong>Duración.</strong> La furia dura hasta el final de tu siguiente turno y termina antes si te pones una armadura pesada o recibes el estado de incapacitado. Si la furia sigue activa en tu siguiente turno, puedes prolongarla otro asalto de una de las siguientes formas: \n• Haces una tirada de ataque contra un enemigo.\n• Obligas a un enemigo a hacer una tirada de salvación.\n• Empleas una acción adicional para prolongar tu furia.\n\nCada vez que prolongues la furia, durará hasta el final de tu siguiente turno. Puedes mantener una furia hasta 10 minutos.",
        },
        {
          name: "Defensa sin Armadura",
          description:
            "Mientras no lleves armadura alguna, tu clase de armadura base será igual a 10 más tus modificadores por Destreza y Constitución. Obtienes este beneficio aunque lleves un escudo. ",
        },
        {
          name: "Maestría con Armas",
          description:
            "Tu entrenamiento con armas te permite utilizar las propiedades de maestría con dos tipos de armas cuerpo a cuerpo sencillas o marciales de tu elección, como las hachas a dos manos y las hachas de mano. Tras finalizar un descanso largo, puedes llevar a cabo ejercicios con armas y cambiar una de dichas elecciones. \nCuando alcances ciertos niveles de bárbaro, adquirirás la capacidad de usar las propiedades de maestría con más tipos de armas, como se muestra en la columna “Maestría con armas” ",
        },
      ],
      classSpecific: { rages: "2", rageDmg: "+2", weaponMastery: "2" },
    },
    {
      level: 2,
      proficiencyBonus: 2,
      features: [
        {
          name: "Ataque Temerario",
          description:
            "Puedes abandonar por completo tu defensa para atacar con una mayor fiereza. Cuando vayas a realizar la primera tirada de ataque de tu turno, puedes decidir atacar temerariamente. Si lo haces, tendrás ventaja en las tiradas de ataque que utilicen la Fuerza hasta el principio de tu siguiente turno, pero las tiradas de ataque contra ti también tendrán ventaja durante ese tiempo.",
        },
        {
          name: "Sentir el Peligro",
          description:
            "Eres capaz de percibir de forma casi sobrenatural cuándo las cosas no son como deberían. Gracias a ello, se te da bien evitar el peligro. Tienes ventaja en las tiradas de salvación de Destreza salvo que tengas el estado de incapacitado. ",
        },
      ],
      classSpecific: { rages: "2", rageDmg: "+2", weaponMastery: "2" },
    },
    {
      level: 3,
      proficiencyBonus: 2,
      features: [
        {
          name: "Subclase de Bárbaro",
          description:
            "Consigues una subclase de bárbaro de tu elección. Las subclases de la senda del Árbol del Mundo, la senda del berserker, la senda del corazón salvaje y la senda del fanático se detallan tras la descripción de esta clase. \nUna subclase es una especialización que te proporciona rasgos cuando alcanzas ciertos niveles de bárbaro. De aquí en adelante, obtienes todos los rasgos de tu subclase que sean de tu nivel de bárbaro e inferiores.",
        },
        {
          name: "Conocimiento Primigenio",
          description:
            "Ganas competencia en otra habilidad de tu elección de la lista de habilidades disponibles para los bárbaros en el nivel 1. \n\nAdemás, mientras estés enfurecido, puedes canalizar el poder primigenio cuando intentes determinadas tareas. Siempre que hagas una prueba de característica con una de las siguientes habilidades, podrás hacerla como una prueba de Fuerza incluso si normalmente utiliza otra característica: Acrobacias, Intimidación, Percepción, Sigilo o Supervivencia. Cuando utilizas esta capacidad, tu Fuerza representa el poder primigenio que fluye por ti y agudiza tu agilidad, porte y sentidos.",
        },
      ],
      classSpecific: { rages: "3", rageDmg: "+2", weaponMastery: "2" },
    },
    {
      level: 4,
      proficiencyBonus: 2,
      features: [
        {
          name: "Mejora de Característica",
          description:
            "Obtienes la dote Mejora de característica u otra dote de tu elección para la que cumplas las condiciones. Vuelves a obtener este rasgo en los niveles de bárbaro 8, 12 y 16.",
        },
      ],
      classSpecific: { rages: "3", rageDmg: "+2", weaponMastery: "3" },
    },
    {
      level: 5,
      proficiencyBonus: 3,
      features: [
        {
          name: "Ataque Adicional",
          description:
            "Cuando lleves a cabo la acción de atacar en tu turno, podrás hacer dos ataques en lugar de uno. ",
        },
        {
          name: "Movimiento Rápido",
          description:
            "Tu velocidad aumenta en 3 m si no llevas armadura pesada.",
        },
      ],
      classSpecific: { rages: "3", rageDmg: "+2", weaponMastery: "3" },
    },
    {
      level: 6,
      proficiencyBonus: 3,
      features: [
        {
          name: "Rasgo de Subclase",
          description: "Obtienes un rasgo de tu subclase.",
        },
      ],
      classSpecific: { rages: "4", rageDmg: "+2", weaponMastery: "3" },
    },
    {
      level: 7,
      proficiencyBonus: 3,
      features: [
        {
          name: "Instinto Salvaje",
          description:
            "Tus instintos están tan afinados que tienes ventaja en las tiradas de iniciativa. ",
        },
        {
          name: "Salto Instintivo",
          description:
            "Como parte de la acción adicional para dejarte llevar por la furia, puedes moverte hasta la mitad de tu velocidad.",
        },
      ],
      classSpecific: { rages: "4", rageDmg: "+2", weaponMastery: "3" },
    },
    {
      level: 8,
      proficiencyBonus: 3,
      features: [
        {
          name: "Mejora de Característica",
          description:
            "Obtienes la dote Mejora de característica u otra dote de tu elección para la que cumplas las condiciones. Vuelves a obtener este rasgo en los niveles de bárbaro 8, 12 y 16.",
        },
      ],
      classSpecific: { rages: "4", rageDmg: "+2", weaponMastery: "3" },
    },
    {
      level: 9,
      proficiencyBonus: 4,
      features: [
        {
          name: "Golpe Brutal",
          description:
            "Si utilizas Ataque temerario, puedes renunciar a cualquier ventaja en una tirada de ataque de tu elección basada en la Fuerza en tu turno. La tirada de ataque elegida no debe tener desventaja. Si la tirada de ataque elegida acierta, el objetivo sufre 1d10 de daño adicional del mismo tipo que inflija el arma o el ataque sin armas y puedes causar un efecto de Golpe brutal de tu elección. Tienes las siguientes opciones de efectos. \n<strong>Golpe enérgico:</strong> El objetivo es empujado 4,5 m respecto a ti en línea recta. Luego puedes moverte hasta la mitad de tu velocidad directamente hacia el objetivo sin provocar ataques de oportunidad. \n<strong>Golpe ralentizador:</strong> La velocidad del objetivo se reduce en 4,5 m hasta el principio de tu siguiente turno. Un objetivo solo puede sufrir un golpe ralentizador cada vez: el más reciente.",
        },
      ],
      classSpecific: { rages: "4", rageDmg: "+3", weaponMastery: "3" },
    },
    {
      level: 10,
      proficiencyBonus: 4,
      features: [
        {
          name: "Rasgo de Senda",
          description: "Obtienes un rasgo de tu subclase.",
        },
      ],
      classSpecific: { rages: "4", rageDmg: "+3", weaponMastery: "4" },
    },
    {
      level: 11,
      proficiencyBonus: 4,
      features: [
        {
          name: "Furia Implacable",
          description:
            "Tu furia te permite seguir luchando incluso tras sufrir heridas graves. Si tus puntos de golpe se reducen a O mientras estas enfurecido, pero no mueres inmediatamente, puedes hacer una tirada de salvación de Constitución con CD 10. Si la superas, tus puntos de golpe pasarán a ser una cantidad igual al doble de tu nivel de bárbaro. \nSiempre que uses este rasgo después de la primera vez, la CD aumenta en 5. Tras finalizar un descanso corto o largo, la CD vuelve a ser 10. ",
        },
      ],
      classSpecific: { rages: "4", rageDmg: "+3", weaponMastery: "4" },
    },
    {
      level: 12,
      proficiencyBonus: 4,
      features: [
        {
          name: "Mejora de Característica",
          description:
            "Obtienes la dote Mejora de característica u otra dote de tu elección para la que cumplas las condiciones. Vuelves a obtener este rasgo en los niveles de bárbaro 8, 12 y 16.",
        },
      ],
      classSpecific: { rages: "5", rageDmg: "+3", weaponMastery: "4" },
    },
    {
      level: 13,
      proficiencyBonus: 5,
      features: [
        {
          name: "Golpe Brutal Mejorado ++",
          description:
            "Has perfeccionado tus formas de atacar con fiereza. Entre las opciones de Golpe brutal se encuentran ahora los siguientes efectos: \n<strong>Golpe abrumador:</strong> El objetivo tiene desventaja en la siguiente tirada de salvación que haga y no puede llevar a cabo ataques de oportunidad hasta el principio de tu siguiente turno.\n<strong>Golpe desgarrador:</strong> Antes del principio de tu siguiente turno, la próxima tirada de ataque realizada por otra criatura contra el objetivo obtiene un bonificador de +5. Una tirada de ataque puede obtener solo un bonificador de un golpe desgarrador. ",
        },
      ],
      classSpecific: { rages: "5", rageDmg: "+3", weaponMastery: "4" },
    },
    {
      level: 14,
      proficiencyBonus: 5,
      features: [
        {
          name: "Rasgo de Senda",
          description: "Obtienes un rasgo de tu subclase.",
        },
      ],
      classSpecific: { rages: "5", rageDmg: "+3", weaponMastery: "4" },
    },
    {
      level: 15,
      proficiencyBonus: 5,
      features: [
        {
          name: "Furia Persistente",
          description:
            "Cuando tires iniciativa, puedes recuperar todos los usos gastados de la furia. Tras recuperar los usos de la furia de esta manera, no podrás volver a hacerlo hasta que finalices un descanso largo. \nAdemás, tu furia es tan intensa que ahora dura 10 minutos sin necesidad de hacer nada para prolongarla de un asalto a otro. Tu furia termina antes si recibes el estado de inconsciente (no solo el de incapacitado) o te pones una armadura pesada.",
        },
      ],
      classSpecific: { rages: "5", rageDmg: "+3", weaponMastery: "4" },
    },
    {
      level: 16,
      proficiencyBonus: 5,
      features: [
        {
          name: "Mejora de Característica",
          description:
            "Obtienes la dote Mejora de característica u otra dote de tu elección para la que cumplas las condiciones. Vuelves a obtener este rasgo en los niveles de bárbaro 8, 12 y 16.",
        },
      ],
      classSpecific: { rages: "5", rageDmg: "+4", weaponMastery: "4" },
    },
    {
      level: 17,
      proficiencyBonus: 6,
      features: [
        {
          name: "Golpe Brutal Mejorado +++",
          description:
            "El daño adicional de tu Golpe brutal aumenta a 2d10. Además, puedes utilizar dos efectos diferentes de Golpe brutal siempre que uses tu rasgo Golpe brutal. ",
        },
      ],
      classSpecific: { rages: "6", rageDmg: "+4", weaponMastery: "4" },
    },
    {
      level: 18,
      proficiencyBonus: 6,
      features: [
        {
          name: "Poderío Indómito",
          description:
            "Si tu resultado en una prueba de Fuerza o una tirada de salvación de Fuerza es inferior a tu puntuación de Fuerza, puedes usar esa puntuación en lugar del resultado.",
        },
      ],
      classSpecific: { rages: "6", rageDmg: "+4", weaponMastery: "4" },
    },
    {
      level: 19,
      proficiencyBonus: 6,
      features: [
        {
          name: "Don Épico",
          description:
            "Obtienes una dote de don épico u otra dote de tu elección para la que cumplas las condiciones. Se recomienda Don del ataque imparable.",
        },
      ],
      classSpecific: { rages: "6", rageDmg: "+4", weaponMastery: "4" },
    },
    {
      level: 20,
      proficiencyBonus: 6,
      features: [
        {
          name: "Campeón Primordial",
          description:
            "Encarnas un poder primigenio. Tus puntuaciones de Fuerza y Constitución aumentan en 4, hasta un máximo de 25. ",
        },
      ],
      classSpecific: { rages: "6", rageDmg: "+4", weaponMastery: "4" },
    },
  ],
  subclasses: [
    {
      name: "Senda del Árbol del Mundo",
      description:
        "Los bárbaros que siguen la senda del Árbol del Mundo conectan con el árbol cósmico Yggdrasil a través de su furia. Este árbol crece entre los Planos Exteriores, a los que vincula entre sí además de con el Plano Material. Estos bárbaros recurren a la magia del árbol para obtener vitalidad y como medio de transporte dimensional.",
      features: [
        {
          level: 3,
          name: "Vitalidad del Árbol",
          description:
            "Tu furia se nutre de la fuerza vital del Árbol del Mundo. Obtienes los siguientes beneficios:\n <strong>Oleada de vitalidad:</strong> Cuando te enfurezcas, obtendrás una cantidad de puntos de golpe temporales igual a tu nivel de bárbaro. \n<strong>Fuerza revitalizante:</strong> Al principio de cada uno de tus turnos mientras estés enfurecido, puedes elegir a otra criatura a 3 m 0 menos de ti para que obtenga puntos de golpe temporales. \nPara determinarlos, tira una cantidad de d6 igual a tu bonificación de daño por furia y suma los resultados. Si algunos de estos puntos de golpe temporales permanecen cuando dejes de estar enfurecido, se desvanecerán.",
        },
        {
          level: 6,
          name: "Ramas del Árbol",
          description:
            "Cuando una criatura que puedas ver comience su turno a 9 mo menos de ti mientras estás enfurecido, podrás llevar a cabo una reacción para invocar unas ramas espectrales del Árbol del Mundo a su alrededor. El objetivo deberá superar una tirada de salvación de Fuerza (CD 8 más tu modificador por Fuerza y tu bonificador por competencia) o se teletransportará a un espacio sin ocupar que puedas ver a 1,5 m de ti o al espacio sin ocupar más cercano que puedas ver. Después de que el objetivo se teletransporte, puedes reducir su velocidad a O hasta el final del turno actual.",
        },
        {
          level: 10,
          name: "Raíces Apaleadoras",
          description:
            "Durante tu turno, tu alcance es 3 m superior con cualquier arma cuerpo a cuerpo que tenga la propiedad de pesada o versátil, ya que los zarcillos del Árbol del Mundo se prolongan desde tu cuerpo. Cuando aciertes con un arma así en tu turno, podrás activar la propiedad de maestría de derribar o empujar, además de otra propiedad de maestría diferente que utilices con ese arma.",
        },
        {
          level: 14,
          name: "Viajar por el Árbol",
          description:
            "Cuando te enfureces y como acción adicional mientras estés enfurecido, puedes teletransportarte hasta 18 m a un espacio sin ocupar que puedas ver. \nAsimismo, una vez por furia, puedes aumentar el alcance del teletransporte a 45 m. Si lo haces, también puedes transportar hasta seis criaturas voluntarias que estén a 3 mo menos de ti. Cada criatura se teletransportará a un espacio sin ocupar de tu elección a 3 m o menos de tu espacio de destino.",
        },
      ],
    },
    {
      name: "Senda del Berserker",
      description:
        "Los bárbaros que recorren la senda del berserker ponen su furia principalmente al servicio de la violencia. Su senda se asienta en una rabia sin cortapisas y estos bárbaros se embriagan del caos del combate mientras dejan que su furia se apodere de ellos y los fortalezca.",
      features: [
        {
          level: 3,
          name: "Frenesí",
          description:
            "Si utilizas Ataque temerario mientras estás enfurecido, causarás daño adicional al primer objetivo al que aciertes en tu turno con un ataque basado en la Fuerza. Para determinar el daño adicional, tira una cantidad de d6 igual a tu bonificación de daño por furia y suma los resultados. El daño será del mismo tipo que el del arma o ataque sin armas utilizado para el ataque.",
        },
        {
          level: 6,
          name: "Furia Irracional",
          description:
            "Tienes inmunidad a los estados de asustado y hechizado mientras estés enfurecido. Si estás asustado o hechizado cuando te dejes llevar por la furia, el estado terminará para ti.",
        },
        {
          level: 10,
          name: "Represalia",
          description:
            "Cuando recibas daño de una criatura que esté a 1,5 m o menos de ti, puedes llevar a cabo una reacción para hacer un ataque cuerpo a cuerpo contra esa criatura usando un arma o un ataque sin armas.",
        },
        {
          level: 14,
          name: "Presencia Intimidante",
          description:
            "Como acción adicional, puedes sembrar el terror en los demás con tu mera presencia amenazadora y tu poder primigenio. Cuando lo hagas, todas las criaturas de tu elección situadas en una emanación de 9 m originada en ti deberá hacer una tirada de salvación de Sabiduría (CD 8 más tu modificador por Fuerza y tu bonificador por competencia). Si la fallan, tendrán el estado de asustadas durante 1 minuto. Al final de cada uno de sus turnos, las criaturas asustadas repiten la tirada de salvación y, si tienen éxito, se librarán del efecto. \nCuando uses este rasgo, no podrás volver a hacerlo hasta que finalices un descanso largo, a menos que gastes un uso de tu furia (no requiere acción) para restablecer su USO.",
        },
      ],
    },
    {
      name: "Senda del Corazón Salvaje",
      description:
        "Los bárbaros que siguen la senda del corazón salvaje sienten afinidad por los animales. Aprenden métodos mágicos de comunicarse con ellos y su furia aumenta su conexión, ya que los imbuye de una fuerza sobrenatural. ",
      features: [
        {
          level: 3,
          name: "Furia de lo Salvaje",
          description:
            "Tu furia se sirve del poder primigenio de los animales. Cuando te enfurezcas, obtendrás una de las siguientes opciones, a tu elección.\n <strong>Águila</strong> Cuando te enfurezcas, podrás llevar a cabo las acciones de destrabarse y correr como parte de esa acción adicional. Mientras estés enfurecido, puedes usar una acción adicional para llevar a cabo ambas acciones. \n<strong>Lobo:</strong> Mientras estés enfurecido, tus aliados tendrán ventaja en las tiradas de ataque contra cualquiera de tus enemigos que se encuentre a 1,5 m o menos de ti. \n<strong>Oso:</strong> Mientras estés enfurecido, tendrás resistencia a todos los tipos de daño salvo de fuerza, necrótico, psíquico y radiante.",
        },
        {
          level: 3,
          name: "Portavoz de los Animales",
          description:
            "Puedes lanzar los conjuros hablar con los animales y sentidos de la bestia, pero solo como rituales. La Sabiduría es tu aptitud mágica para lanzarlos.",
        },
        {
          level: 6,
          name: "Aspecto de lo Salvaje",
          description:
            "Obtienes una de las siguientes opciones, a tu elección. Tras finalizar un descanso largo, puedes cambiar de opción. \n<strong>Búho:</strong> Tienes visión en la oscuridad hasta 18 m. Si ya posees visión en la oscuridad, su alcance aumenta en 18 m. \n<strong>Pantera:</strong> Tienes una velocidad trepando igual a tu velocidad. \n<strong>Salmón:</strong> Tienes una velocidad nadando igual a tu velocidad. ",
        },
        {
          level: 10,
          name: "Hablante de la Naturaleza",
          description:
            "Puedes lanzar el conjuro comunión con la naturaleza, pero solo como ritual. La Sabiduría es tu aptitud mágica para lanzarlo. ",
        },
        {
          level: 14,
          name: "Poder de lo Salvaje",
          description:
            "Cuando te enfurezcas, obtendrás una de las siguientes opciones, a tu elección. \n<strong>Carnero</strong> Mientras estés enfurecido, podrás hacer que una criatura Grande o más pequeña sufra el estado de derribada si la aciertas con un ataque cuerpo a cuerpo. \n<strong>Halcón:</strong> Mientras estés enfurecido, tendrás una velocidad volando igual a tu velocidad si no llevas ninguna armadura. <strong>León</strong> Mientras estés enfurecido, cualquier enemigo que esté a 1,5 m o menos de ti tendrá desventaja en las tiradas de ataque contra otros objetivos que no seáis tú u otro bárbaro que tenga esta opción activa.",
        },
      ],
    },
    {
      name: "Senda del Fanático",
      description:
        "Expresa tu furia en una eufórica unión con una divinidad. Los bárbaros que siguen la senda del fanático reciben beneficios de un dios o panteón. Estos bárbaros experimentan su furia como un episodio eufórico de unión divina que les imbuye de poder. Habitualmente, se alían con sacerdotes y otros seguidores de su dios o panteón.",
      features: [
        {
          level: 3,
          name: "Furia Divina",
          description:
            "Puedes canalizar el poder divino hacia tus ataques. En cada uno de tus turnos mientras estés enfurecido, la primera criatura a la que aciertes con un arma o un ataque sin armas sufrirá una cantidad de daño adicional igual a 1d6 más la mitad de tu nivel de bárbaro (redondeando hacia abajo). El daño adicional es necrótico o radiante, que eliges cada vez que lo causas. ",
        },
        {
          level: 3,
          name: "Guerrero de los Dioses",
          description:
            "Una entidad divina ayuda a garantizar que continúes la batalla. Cuentas con una reserva de cuatro d12 que puedes gastar para curarte. Como acción adicional, puedes gastar dados de la reserva, tirarlos y recuperar una cantidad de puntos de golpe igual al resultado total de la tirada. \nTu reserva recupera todos los dados gastados tras finalizar un descanso largo. \nEl número máximo de dados de la reserva aumenta en uno cuando alcanzas los niveles 6 (5 dados), 12 (6 dados) y 17 (7 dados) de bárbaro.",
        },
        {
          level: 6,
          name: "Foco Fanático",
          description:
            "Una vez por furia, si fallas una tirada de salvación, podrás repetirla con un bonificador igual a tu bonificación de daño por furia y deberás utilizar el nuevo resultado.",
        },
        {
          level: 10,
          name: "Presencia Ferviente",
          description:
            "Como acción adicional, profieres un grito de guerra imbuido de energía divina. Hasta diez criaturas de tu elección que estén a 18 m o menos de ti obtendrán ventaja en las tiradas de ataque y tiradas de salvación hasta el principio de tu siguiente turno. \nCuando uses este rasgo, no podrás volver a hacerlo hasta que finalices un descanso largo, 'a menos que gastes un uso de tu furia (no requiere acción) para restablecer su uso.",
        },
        {
          level: 14,
          name: "Furia de los Dioses",
          description:
            "Cuando te enfureces, puedes adoptar la forma de un guerrero divino. Esta forma dura 1 minuto o hasta que tus puntos de golpe se reduzcan a 0. Cuando uses este rasgo, no podrás volver a hacerlo hasta que finalices un descanso largo. \nMientras tengas esta forma, obtendrás los siguientes beneficios: \n<strong>Resistencia:</strong> Tienes resistencia al daño necrótico, psíquico y radiante. \n<strong>Revitalización:</strong> Cuando los puntos de golpe de una criatura que esté a 9 m o menos de ti fueran a reducirse a O, puedes llevar a cabo una reacción para gastar un uso de tu furia y hacer que los puntos de golpe del objetivo cambien a una cantidad igual a tu nivel de bárbaro. \n<strong>Vuelo</strong> Tienes una velocidad volando igual a tu velocidad y puedes levitar. ",
        },
      ],
    },
  ],
};

const bardData = {
  name: "Bardo",
  description:
    "Un artista inspirador cuya magia resuena con la música de la creación.",
  hitDie: 8,
  primaryAbility: ["Carisma"],
  savingThrows: ["Destreza", "Carisma"],
  proficiencies: {
    armor: ["Ligeras"],
    weapons: ["Sencillas"],
    tools: ["Tres instrumentos musicales a tu elección"],
  },
  skillChoices: {
    count: 3,
    list: ["Cualquiera"], // Los bardos pueden elegir 3 habilidades cualesquiera
  },
  startingEquipment: [
    "Armadura de cuero, 2 dagas",
    "Instrumento musical",
    "Paquete de artista",
    "19 po",
    "O 90 po",
  ],

  // Configuración de la tabla visual
  tableMetadata: {
    columns: [
      { label: "Dado Bárdico", dataKey: "bardicDie" },
      { label: "Trucos", dataKey: "cantrips" },
      { label: "Preparados", dataKey: "prepared" },
      { label: "I", dataKey: "slots1" },
      { label: "II", dataKey: "slots2" },
      { label: "III", dataKey: "slots3" },
      { label: "IV", dataKey: "slots4" },
      { label: "V", dataKey: "slots5" },
      { label: "VI", dataKey: "slots6" },
      { label: "VII", dataKey: "slots7" },
      { label: "VIII", dataKey: "slots8" },
      { label: "IX", dataKey: "slots9" },
    ],
  },

  progression: [
    {
      level: 1,
      proficiencyBonus: 2,
      features: [
        {
          name: "Inspiración Bárdica",
          description:
            "Puedes recurrir a tus palabras, música o danza para inspirar de forma sobrenatural a los demás. Esta inspiración se representa con tu dado de Inspiración bárdica, que es un d6. \n<strong>Utilizar la Inspiración bárdica:</strong> Como acción adicional, puedes inspirar a otra criatura que esté a 18 m o menos de ti y que te pueda ver u oír. Esa criatura obtiene uno de tus dados de Inspiración bárdica. Cada criatura no puede tener más de un dado de Inspiración bárdica. \nUna sola vez durante la siguiente hora, cuando la criatura falle una prueba con d20, podrá tirar el dado de Inspiración bárdica y sumar el resultado al 420, lo que podría hacerle superar la prueba. Un dado de Inspiración bárdica se gasta al tirarlo. \n<strong>Número de usos:</strong> Puedes conceder un dado de Inspiración bárdica una cantidad de veces igual a tu modificador por Carisma (mínimo una vez) y recuperas todos sus usos tras finalizar un descanso largo. \n<strong>A niveles superiores</strong> Tu dado de Inspiración bárdica cambia cuando alcanzas ciertos niveles de bardo, como se muestra en la columna “Dado bárdico” de la tabla “Rasgos de bardo”. El dado se convierte en un d8 en el nivel 5, un dl0 en el nivel 10 y un d12 en el nivel 15.",
        },
        {
          name: "Lanzamiento de Conjuros",
          description:
            "Has aprendido a lanzar conjuros mediante tus artes bárdicas. Consulta el capítulo 7 para ver las reglas sobre el lanzamiento de conjuros. La información presentada a continuación detalla cómo usar esas reglas con los conjuros de bardo, que encontrarás más adelante en la lista de conjuros de bardo de la descripción de la clase. \n<strong>Trucos:</strong> Conoces dos trucos de tu elección escogidos de entre los de la lista de conjuros de bardo. Se recomiendan burla dañina y luces danzantes. \nCada vez que subas un nivel de bardo, puedes sustituir uno de tus trucos por otro truco de tu elección de la lista de conjuros de bardo. \nCuando alcances los niveles 4 y 10 de bardo, aprenderás otro truco de tu elección de la lista de conjuros de bardo, como se muestra en la columna “Trucos” de la tabla “Rasgos de bardo”. \n<strong>Espacios de conjuro:</strong> La tabla “Rasgos de bardo” muestra cuántos espacios de conjuro tienes para lanzar tus conjuros de nivel 1 y superiores. Recuperas todos los espacios utilizados tras finalizar un descanso largo. \n<strong>Conjuros preparados de nivel 1 y superiores:</strong> Preparas una serie de conjuros de nivel 1 y superiores, que son los que podrás lanzar con este rasgo. Para empezar, elige cuatro conjuros de nivel 1 de la lista de conjuros de bardo. ",
        },
      ],
      classSpecific: {
        bardicDie: "d6",
        cantrips: "2",
        prepared: "4",
        slots1: "2",
        slots2: "-",
        slots3: "-",
        slots4: "-",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 2,
      proficiencyBonus: 2,
      features: [
        {
          name: "Aprendiz de Mucho",
          description:
            "Puedes sumar la mitad de tu bonificador por competencia (redondeando hacia abajo) a cualquier prueba de característica que hagas que utilice una habilidad en la que no seas competente y que no use de otro modo tu bonificador por competencia. \nPor ejemplo, si haces una prueba de Fuerza (Atletismo) y no eres competente en Atletismo, puedes sumar la mitad de tu bonificador por competencia a la prueba.",
        },
        {
          name: "Pericia",
          description:
            "Ganas pericia en dos de tus competencias en habilidades de tu elección. Se recomiendan Interpretación y Persuasión si eres competente en ellas. En el nivel 9 de bardo ganas pericia en otras dos competencias de tu elección.",
        },
      ],
      classSpecific: {
        bardicDie: "d6",
        cantrips: "2",
        prepared: "5",
        slots1: "3",
        slots2: "-",
        slots3: "-",
        slots4: "-",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 3,
      proficiencyBonus: 2,
      features: [
        {
          name: "Sublcase de Bardo",
          description:
            "Consigues una subclase de bardo de tu elección. Las subclases del colegio de la danza, el colegio del conocimiento, el colegio del glamour y el colegio del valor se detallan tras la descripción de esta clase. Una subclase es una especialización que te proporciona rasgos cuando alcanzas ciertos niveles de bardo. De aquí en adelante, obtienes todos los rasgos de tu subclase que sean de tu nivel de bardo e inferiores. ",
        },
      ],
      classSpecific: {
        bardicDie: "d6",
        cantrips: "2",
        prepared: "6",
        slots1: "4",
        slots2: "2",
        slots3: "-",
        slots4: "-",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 4,
      proficiencyBonus: 2,
      features: [
        {
          name: "Mejora de Característica",
          description:
            "Obtienes la dote Mejora de característica u otra dote de tu elección para la que cumplas las condiciones. Vuelves a obtener este rasgo en los niveles 8, 12 y 16 de bardo. ",
        },
      ],
      classSpecific: {
        bardicDie: "d6",
        cantrips: "3",
        prepared: "7",
        slots1: "4",
        slots2: "3",
        slots3: "-",
        slots4: "-",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 5,
      proficiencyBonus: 3,
      features: [
        {
          name: "Fuente de Inspiración",
          description:
            "Ahora recuperas todos los usos de Inspiración bárdica tras finalizar un descanso corto o largo. \nAdemás, puedes gastar un espacio de conjuro (no requiere acción) para recuperar un uso gastado de Inspiración bárdica.",
        },
        {
          name: "Dado Bárdico ++",
          description: "Tu dado de inspiración aumenta a d8.",
        },
      ],
      classSpecific: {
        bardicDie: "d8",
        cantrips: "3",
        prepared: "9",
        slots1: "4",
        slots2: "3",
        slots3: "2",
        slots4: "-",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 6,
      proficiencyBonus: 3,
      features: [
        {
          name: "Rasgo de Subclase",
          description: "Obtienes un rasgo de tu subclase.",
        },
      ],
      classSpecific: {
        bardicDie: "d8",
        cantrips: "3",
        prepared: "10",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "-",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 7,
      proficiencyBonus: 3,
      features: [
        {
          name: "Contraencantamiento",
          description:
            "Puedes emplear notas musicales o palabras de poder para interrumpir los efectos que afectan a la mente. Si tú o una criatura que esté a 9 m o menos de ti falláis una tirada de salvación contra un efecto que aplique el estado de asustado o hechizado, puedes llevar a cabo una reacción para que se repita la tirada de salvación, y la nueva tirada tendrá ventaja.",
        },
      ],
      classSpecific: {
        bardicDie: "d8",
        cantrips: "3",
        prepared: "11",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "1",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 8,
      proficiencyBonus: 3,
      features: [
        {
          name: "Mejora de Característica",
          description:
            "Obtienes la dote Mejora de característica u otra dote de tu elección para la que cumplas las condiciones. Vuelves a obtener este rasgo en los niveles 8, 12 y 16 de bardo. ",
        },
      ],
      classSpecific: {
        bardicDie: "d8",
        cantrips: "3",
        prepared: "12",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "2",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 9,
      proficiencyBonus: 4,
      features: [
        {
          name: "Pericia ++",
          description:
            "Elige 2 habilidades más para duplicar tu bono de competencia.",
        },
      ],
      classSpecific: {
        bardicDie: "d8",
        cantrips: "3",
        prepared: "14",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "1",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 10,
      proficiencyBonus: 4,
      features: [
        {
          name: "Secretos Mágicos",
          description:
            "Has aprendido secretos de diversas tradiciones mágicas. Cada vez que alcances un nivel de bardo (incluido este) y aumente la cantidad de conjuros preparados de la tabla “Rasgos de bardo”, podrás elegir cualquiera de los nuevos conjuros preparados de entre las listas de conjuros de bardo, clérigo, druida y mago. Los conjuros elegidos contarán como conjuros de bardo para ti (consulta las listas de conjuros en la sección de la clase correspondiente). Además, cuando sustituyas un conjuro preparado para esta clase, podrás hacerlo con un conjuro de esas listas.",
        },
        {
          name: "Dado Bárdico +++",
          description: "Tu dado de inspiración aumenta a d10.",
        },
      ],
      classSpecific: {
        bardicDie: "d10",
        cantrips: "4",
        prepared: "15",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 11,
      proficiencyBonus: 4,
      features: [],
      classSpecific: {
        bardicDie: "d10",
        cantrips: "4",
        prepared: "16",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "1",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 12,
      proficiencyBonus: 4,
      features: [
        {
          name: "Mejora de Característica",
          description:
            "Obtienes la dote Mejora de característica u otra dote de tu elección para la que cumplas las condiciones. Vuelves a obtener este rasgo en los niveles 8, 12 y 16 de bardo. ",
        },
      ],
      classSpecific: {
        bardicDie: "d10",
        cantrips: "4",
        prepared: "16",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "1",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 13,
      proficiencyBonus: 5,
      features: [],
      classSpecific: {
        bardicDie: "d10",
        cantrips: "4",
        prepared: "17",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "1",
        slots7: "1",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 14,
      proficiencyBonus: 5,
      features: [
        {
          name: "Rasgo de Subclase",
          description: "Obtienes un rasgo de tu subclase.",
        },
      ],
      classSpecific: {
        bardicDie: "d10",
        cantrips: "4",
        prepared: "17",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "1",
        slots7: "1",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 15,
      proficiencyBonus: 5,
      features: [
        {
          name: "Dado Bárdico ++++",
          description: "Tu dado de inspiración aumenta a d12.",
        },
      ],
      classSpecific: {
        bardicDie: "d12",
        cantrips: "4",
        prepared: "18",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "1",
        slots7: "1",
        slots8: "1",
        slots9: "-",
      },
    },
    {
      level: 16,
      proficiencyBonus: 5,
      features: [
        {
          name: "Mejora de Característica",
          description:
            "Obtienes la dote Mejora de característica u otra dote de tu elección para la que cumplas las condiciones. Vuelves a obtener este rasgo en los niveles 8, 12 y 16 de bardo. ",
        },
      ],
      classSpecific: {
        bardicDie: "d12",
        cantrips: "4",
        prepared: "18",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "1",
        slots7: "1",
        slots8: "1",
        slots9: "-",
      },
    },
    {
      level: 17,
      proficiencyBonus: 6,
      features: [],
      classSpecific: {
        bardicDie: "d12",
        cantrips: "4",
        prepared: "19",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "1",
        slots7: "1",
        slots8: "1",
        slots9: "1",
      },
    },
    {
      level: 18,
      proficiencyBonus: 6,
      features: [
        {
          name: "Inspiración Superior",
          description:
            "Cuando tires iniciativa, recuperarás usos gastados de Inspiración bárdica hasta que tengas dos, si tuvieras menos de esta cifra. ",
        },
      ],
      classSpecific: {
        bardicDie: "d12",
        cantrips: "4",
        prepared: "20",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "3",
        slots6: "1",
        slots7: "1",
        slots8: "1",
        slots9: "1",
      },
    },
    {
      level: 19,
      proficiencyBonus: 6,
      features: [
        {
          name: "Don Épico",
          description:
            "Obtienes una dote de don épico u otra dote de tu elección para la que cumplas las condiciones. Se recomienda Don del recuerdo de conjuros.",
        },
      ],
      classSpecific: {
        bardicDie: "d12",
        cantrips: "4",
        prepared: "21",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "3",
        slots6: "2",
        slots7: "1",
        slots8: "1",
        slots9: "1",
      },
    },
    {
      level: 20,
      proficiencyBonus: 6,
      features: [
        {
          name: "Palabras de Creación",
          description:
            "Ahora dominas dos de las palabras de creación: las palabras de la vida y de la muerte. Por tanto, siempre tienes preparados los conjuros palabra de poder: sanar y palabra de poder: matar. Cuando lances uno de estos conjuros, podrás hacer objetivo a una segunda criatura si esta se encuentra a 3 m o menos del primer objetivo. ",
        },
      ],
      classSpecific: {
        bardicDie: "d12",
        cantrips: "4",
        prepared: "22",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "3",
        slots6: "2",
        slots7: "2",
        slots8: "1",
        slots9: "1",
      },
    },
  ],

  subclasses: [
    {
      name: "Colegio de la Danza",
      description:
        "Los bardos del colegio de la danza saben que las palabras de creación no pueden encerrarse en un discurso o una canción: las palabras se pronuncian a través del desplazamiento de los cuerpos celestes y fluyen por los movimientos de las criaturas menores. Estos bardos practican una forma de permanecer en armonía con la vorágine del cosmos que enfatiza la agilidad, la velocidad y la elegancia.",
      features: [
        {
          level: 3,
          name: "Juego de Pies Deslumbrante",
          description:
            "Mientras no lleves armadura ni portes un escudo, obtienes los siguientes beneficios. \n<strong>Virtuoso de la danza:</strong> Tienes ventaja en cualquier prueba de Carisma (Interpretación) que hagas que implique bailar. \n<strong>Defensa sin armadura:</strong> Tu clase de armadura base es igual a 10 más tus modificadores por Destreza y Carisma. \n<strong>Ataques ágiles:</strong> Cuando gastes un uso de tu Inspiración bárdica como parte de una acción, una acción adicional o una reacción, puedes realizar un ataque sin armas como parte de esa acción, acción adicional o reacción. \n<strong>Daño Bardico:</strong> Puedes usar tu Destreza en lugar de tu Fuerza para las tiradas de ataque de tus ataques sin armas. Cuando causas daño con un ataque sin armas, puedes infligir una cantidad de daño contundente igual al resultado de una tirada con tu dado de Inspiración bárdica más tu modificador por Destreza, en lugar del daño normal del ataque. No gastas el dado con esta tirada. ",
        },
        {
          level: 6,
          name: "Juego de Pies Conjunto",
          description:
            "Cuando tires iniciativa, puedes gastar un uso de tu Inspiración bárdica si no tienes el estado de incapacitado. Cuando lo hagas, tira tu dado de Inspiración bárdica; tú y todos los aliados que estén a 9 m o menos de ti que puedan verte u oírte ganaréis un bonificador a la iniciativa igual al resultado.",
        },
        {
          level: 6,
          name: "Movimiento Inspirador",
          description:
            "Cuando un enemigo que puedas ver termine su turno a 1,5 m o menos de ti, puedes llevar a cabo una reacción y gastar un uso de tu Inspiración bárdica para moverte hasta la mitad de tu velocidad. Después, un aliado que elijas que esté a 9 m o menos de ti también podrá moverse hasta la mitad de su velocidad usando su reacción. \nLos movimientos realizados con este rasgo no provocan ataques de oportunidad",
        },
        {
          level: 14,
          name: "Evasión Dirigida",
          description:
            "Cuando sufras un efecto que te permita hacer una tirada de salvación de Destreza para sufrir solo la mitad de daño, no recibes daño alguno si la superas y solo sufres la mitad si la fallas. Si cualquier criatura que esté a 1,5 m de ti hace la misma tirada de salvación de Destreza, puedes compartir este beneficio con ella para la tirada. \nNo puedes usar este rasgo si tienes el estado de incapacitado.",
        },
      ],
    },
    {
      name: "Colegio del Conocimiento",
      description:
        "Explora las profundidades del conocimiento mágico. Los bardos del colegio del conocimiento recaban conjuros y secretos de diversas fuentes, como tratados intelectuales, ritos místicos y cuentos de campesinos. Los miembros del colegio se reúnen en bibliotecas y universidades para intercambiar sus conocimientos. También se encuentran en festivales o reuniones de Estado, donde pueden sacar a la luz casos de corrupción, desvelar mentiras o reírse de los vanidosos representantes de la autoridad.",
      features: [
        {
          level: 3,
          name: "Palabras Cortantes",
          description:
            "Aprendes a usar tu astucia para distraer, confundir y minar la confianza y las aptitudes de los demás de manera sobrenatural. Cuando una criatura que puedas ver a 18 m o menos de ti haga una tirada de daño o tenga éxito en una prueba de característica o una tirada de ataque, puedes llevar a cabo una reacción para gastar un uso de tu Inspiración bárdica; tira tu dado de Inspiración bárdica y resta el número obtenido al resultado de la tirada de la criatura, lo que reducirá el dañoo quizá convierta el éxito en un fallo.",
        },
        {
          level: 3,
          name: "Competencias Adicionales",
          description: "Ganas competencia en tres habilidades de tu elección.",
        },
        {
          level: 6,
          name: "Descubrimientos Mágicos",
          description:
            "Aprendes dos conjuros de tu elección. Estos conjuros pueden proceder de las listas de conjuros de clérigo, druida o mago, o de cualquier combinación de estas (consulta la lista de conjuros en la sección de la clase). Los conjuros que elijas deben ser trucos o conjuros para los que tengas espacios de conjuro, como se muestra en la tabla “Rasgos de bardo”. \nSiempre tienes preparados los conjuros elegidos y, cada vez que subas un nivel de bardo, podrás reemplazar uno de los conjuros por otro conjuro que cumpla estos requisitos.",
        },
        {
          level: 14,
          name: "Habilidad Sin Parangón",
          description:
            "Cuando hagas una prueba de característica o una tirada de ataque y falles, podrás gastar un uso de Inspiración bárdica; tira el dado de Inspiración bárdica y suma el resultado al d20, lo que podría convertir un fallo en un éxito. Si fallas la tirada, la Inspiración bárdica no se gasta. ",
        },
      ],
    },
    {
      name: "Colegio del Glamour",
      description:
        "El colegio del glamour se originó con la magia cautivadora de los Parajes Feéricos. Los bardos que estudian esta magia tejen hilos de belleza y terror en sus canciones e historias y los más poderosos de ellos pueden envolverse en una majestuosidad sobrenatural. Sus actuaciones suscitan el anhelo nostálgico de una inocencia olvidada, evocan los recuerdos inconscientes de temores arraigados y apelan a las emociones incluso de los oyentes más insensibles. ",
      features: [
        {
          level: 3,
          name: "Manto de Inspiración",
          description:
            "Puedes urdir la magia feérica en una canción o danza que insufle energía a los demás. Como acción adicional, puedes gastar un uso de tu Inspiración Bárdica y tirar un dado de Inspiración bárdica. Cuando lo hagas, elige una cantidad de otras criaturas a 18 m o menos de ti, hasta un máximo igual a tu modificador por Carisma (mínimo una criatura). \nCada una de esas criaturas obtendrá una cantidad de puntos de golpe temporales igual al doble del resultado del dado de Inspiración bárdica y luego podrá usar su reacción para moverse hasta su velocidad sin provocar ataques de oportunidad. ",
        },
        {
          level: 3,
          name: "Magia Cautivadora",
          description:
            "Siempre tienes los conjuros hechizar persona e imagen múltiple preparados. \nAsimismo, inmediatamente después de que lances un conjuro de encantamiento o ilusionismo mediante un espacio de conjuro, podrás hacer que una criatura que puedas ver a 18 m o menos de ti realice una tirada de salvación de Sabiduría contra tu CD de salvación de conjuros. Si la fálla, el objetivo tendrá el estado de asustado o hechizado (a tu elección) durante 1 minuto. El objetivo repetirá la tirada de salvación al final de cada uno de sus turnos y, si tiene éxito, se librará del efecto. \nCuando uses este beneficio, no podrás volver a hacerlo hasta que finalices un descanso largo. También puedes restablecer su uso gastando un uso de tu Inspiración bárdica (no requiere acción).",
        },
        {
          level: 6,
          name: "Manto de Majestad",
          description:
            "Siempre tienes el conjuro orden imperiosa preparado. \nComo acción adicional, puedes lanzar orden imperiosa sin gastar un espacio de conjuro y adoptar una apariencia sobrenatural durante 1 minuto o hasta que pierdas la concentración. Durante este tiempo, puedes lanzar orden imperiosa como acción adicional sin gastar un espacio de conjuro. \nCualquier criatura a la que hayas hechizado fallará automáticamente su tirada de salvación contra la orden imperiosa que lances con este rasgo. \nCuando uses este rasgo, no podrás volver a hacerlo hasta que finalices un descanso largo. También puedes restablecer su uso gastando un espacio de conjuro de nivel 3 o superior (no requiere acción). ",
        },
        {
          level: 14,
          name: "Majestad Inquebrantable",
          description:
            "Como acción adicional, puedes adoptar un aspecto majestuoso mágico durante 1 minuto o hasta que tengas el estado de incapacitado. Durante ese tiempo, cuando una criatura te acierte con una tirada de ataque por primera vez en un turno, el atacante deberá superar una tirada de salvación de Carisma contra tu CD de salvación de conjuros o el ataque fallará, puesto que la criatura se amedrentará por tu majestuosidad. \nCuando adoptes este especto majestuoso, no podrás volver a hacerlo hasta que finalices un descanso corto o largo. ",
        },
      ],
    },
    {
      name: "Colegio del Valor",
      description:
        "Los bardos del colegio del valor son narradores osados cuyos relatos conservan el recuerdo de los grandes héroes del pasado. Estos bardos cantan las hazañas de sus ídolos en salones abovedados o ante un público reunido en torno a refulgentes hogueras. Viajan para presenciar los grandes acontecimientos de primera mano y asegurarse de que su recuerdo no cae en el olvido. Con sus canciones, inspiran alas nuevas generaciones a lograr hitos similares a los de los héroes de antaño.",
      features: [
        {
          level: 3,
          name: "Entrenamiento Marcial",
          description:
            "Ganas competencia con armas marciales y entrenamiento con armaduras medias y escudos. \nAdemás, puedes utilizar un arma sencilla o marcial como canalizador mágico para lanzar tus conjuros de bardo. ",
        },
        {
          level: 3,
          name: "Inspiración en Combate",
          description:
            "Puedes emplear tu ingenio para cambiar las tornas de la batalla. Una criatura que tenga uno de tus dados de Inspiración bárdica podrá usarlo para lograr uno de los siguientes efectos. \n<strong>Defensa:</strong> Cuando una tirada de ataque acierte a la criatura, esta podrá usar su reacción para tirar el dado de Inspiración bárdica y sumar el resultado a su CA contra ese ataque, lo que podría hacer que falle. \n<strong>Ofensiva:</strong> Inmediatamente después de que la criatura acierte a un objetivo con una tirada de ataque, podrá tirar el dado de Inspiración bárdica y sumar el resultado al daño del ataque contra el objetivo.",
        },
        {
          level: 6,
          name: "Ataque Adicional",
          description:
            "Cuando lleves a cabo la acción de atacar en tu turno, podrás hacer dos ataques en lugar de uno. \nAdemás, podrás lanzar uno de tus trucos que tenga un tiempo de lanzamiento de una acción en vez de realizar uno de esos ataques.",
        },
        {
          level: 14,
          name: "Magia de Batalla",
          description:
            "Tras lanzar un conjuro que tenga un tiempo de lanzamiento de una acción, podrás hacer un ataque con un arma como acción adicional.",
        },
      ],
    },
  ],
};

const warlockData = {
  name: "Brujo",
  description:
    "Un lanzador de conjuros que obtiene poder mediante un pacto con una entidad extraplanar.",
  hitDie: 8,
  primaryAbility: ["Carisma"],
  savingThrows: ["Sabiduría", "Carisma"],
  proficiencies: {
    armor: ["Ligeras"],
    weapons: ["Sencillas"],
    tools: [],
  },
  skillChoices: {
    count: 2,
    list: [
      "Conocimiento arcano",
      "Engaño",
      "Historia",
      "Intimidación",
      "Investigación",
      "Naturaleza",
      "Religión",
    ],
  },
  startingEquipment: [
    "Armadura de cuero",
    "Hoz y 2 dagas",
    "Canalizador arcano (Orbe)",
    "Libro (de conocimiento oculto)",
    "Paquete de erudito",
    "15 po",
    "O 100 po",
  ],

  // Tabla visual para el frontend
  tableMetadata: {
    columns: [
      { label: "Invocaciones", dataKey: "invocations" },
      { label: "Trucos", dataKey: "cantrips" },
      { label: "Preparados", dataKey: "prepared" },
      { label: "Espacios", dataKey: "slots" },
      { label: "Nivel", dataKey: "slotLevel" },
    ],
  },

  progression: [
    {
      level: 1,
      proficiencyBonus: 2,
      features: [
        {
          name: "Magia del Pacto",
          description:
            "Has sellado un pacto con una entidad misteriosa mediante una ceremonia ocultista para obtener poderes mágicos. Ese ente es una voz en las sombras y no tienes clara su identidad, pero el don que te ofrece sí que lo conoces: te ha dado la capacidad de lanzar conjuros. \n<strong>Espacios de conjuro:</strong> La tabla “Rasgos de brujo” muestra cuántos espacios de conjuro tienes para lanzar tus conjuros de brujo de los niveles 1 a 5. La tabla también te indica de qué nivel son dichos espacios, todos los cuales son del mismo nivel. Recuperas todos los espacios utilizados de Magia del pacto tras finalizar un descanso corto o largo. \nEl número de conjuros de tu lista aumenta conforme subes de nivel de brujo, como se muestra en la columna “Conjuros preparados” de la tabla “Rasgos de brujo”. Cuando ese número aumente, elige conjuros de brujo adicionales hasta que el número de conjuros de tu lista coincida con el número de la tabla. Los conjuros que elijas deben ser de un nivel igual o inferior al que aparece en la columna “Nivel de los espacios” para tu nivel. \nSi otro rasgo de brujo te proporciona conjuros que siempre tienes preparados, esos conjuros no cuentan para el total que puedes preparar con este rasgo, pero sí que cuentan como conjuros de brujo para ti. \n<strong>Cambiar los conjuros preparados:</strong> Cada vez que subas un nivel de brujo, puedes sustituir un conjuro de tu lista por otro conjuro de brujo de un nivel adecuado. \n<strong>Aptitud mágica:</strong> El Carisma es tu aptitud mágica en lo que respecta a tus conjuros de brujo. \n<strong>Canalizador mágico:</strong> Puedes utilizar un canalizador arcano como canalizador mágico para tus conjuros de brujo.",
        },
        {
          name: "Invocaciones Sobrenaturales",
          description:
            "Has desenterrado invocaciones sobrenaturales, fragmentos de conocimiento prohibido que te imbuyen de una capacidad mágica perpetua o de otros saberes. Obtienes una invocación de tu elección, como Pacto del grimorio. Las invocaciones se detallan más adelante en la descripción de esta clase, en el apartado “Opciones de invocación sobrenatural”. \n<strong>Requisitos:</strong> Si una invocación tiene un requisito, debes cumplirlo para poder aprenderla. Por ejemplo, si una invocación te pide un nivel 5 o superior de brujo, podrás seleccionar esa invocación cuando alcances ese nivel de brujo. \n<strong>Sustituir y conseguir invocaciones:</strong> Cada vez que subas un nivel de brujo, puedes sustituir una de tus invocaciones por otra para la que cumplas las condiciones. No puedes sustituir una invocación si es un requisito de otra invocación que tengas. \nObtienes más invocaciones de tu elección cuando alcanzas ciertos niveles de brujo, como se muestra en la columna “Invocaciones” de la tabla “Rasgos de brujo”. \nNo puedes elegir la misma invocación más de una vez salvo que la descripción indique algo diferente. ",
        },
      ],
      classSpecific: {
        invocations: "1",
        cantrips: "2",
        prepared: "2",
        slots: "1",
        slotLevel: "1",
      },
    },
    {
      level: 2,
      proficiencyBonus: 2,
      features: [
        {
          name: "Astucia Mágica",
          description:
            "Puedes llevar a cabo un rito esotérico durante 1 minuto. Al terminarlo, recuperas una cantidad de espacios de conjuro utilizados de Magia del pacto igual o inferior a la mitad de tu máximo (redondeando hacia arriba). Cuando uses este rasgo, no podrás volver a hacerlo hasta que finalices un descanso largo. ",
        },
        {
          name: "Invocaciones de Nivel ++",
          description: "Accedes a invocaciones más poderosas.",
        },
      ],
      classSpecific: {
        invocations: "3",
        cantrips: "2",
        prepared: "3",
        slots: "2",
        slotLevel: "1",
      },
    },
    {
      level: 3,
      proficiencyBonus: 2,
      features: [
        {
          name: "Subclase de Brujo",
          description:
            "Consigues una subclase de brujo de tu elección. Las subclases del patrón celestial, el patrón feérico, el patrón infernal y el patrón primigenio se detallan tras la descripción de esta clase. Una subclase es una especialización que te proporciona rasgos cuando alcanzas ciertos niveles de brujo. De aquí en adelante, obtienes todos los rasgos de tu subclase que sean de tu nivel de brujo e inferiores.",
        },
      ],
      classSpecific: {
        invocations: "3",
        cantrips: "2",
        prepared: "4",
        slots: "2",
        slotLevel: "2",
      },
    },
    {
      level: 4,
      proficiencyBonus: 2,
      features: [
        {
          name: "Mejora de Característica",
          description:
            "Obtienes la dote Mejora de característica u otra dote de tu elección para la que cumplas las condiciones. Vuelves a obtener este rasgo en los niveles 8, 12 y 16 de brujo. ",
        },
      ],
      classSpecific: {
        invocations: "3",
        cantrips: "3",
        prepared: "5",
        slots: "2",
        slotLevel: "2",
      },
    },
    {
      level: 5,
      proficiencyBonus: 3,
      features: [
        {
          name: "Invocaciones de Nivel +++",
          description: "Accedes a invocaciones más poderosas.",
        },
      ],
      classSpecific: {
        invocations: "5",
        cantrips: "3",
        prepared: "6",
        slots: "2",
        slotLevel: "3",
      },
    },
    {
      level: 6,
      proficiencyBonus: 3,
      features: [
        {
          name: "Rasgo de Subclase",
          description: "Obtienes un rasgo de tu subclase.",
        },
      ],
      classSpecific: {
        invocations: "5",
        cantrips: "3",
        prepared: "7",
        slots: "2",
        slotLevel: "3",
      },
    },
    {
      level: 7,
      proficiencyBonus: 3,
      features: [
        {
          name: "Invocaciones de Nivel ++++",
          description: "Accedes a invocaciones de mayor nivel.",
        },
      ],
      classSpecific: {
        invocations: "6",
        cantrips: "3",
        prepared: "8",
        slots: "2",
        slotLevel: "4",
      },
    },
    {
      level: 8,
      proficiencyBonus: 3,
      features: [
        {
          name: "Mejora de Característica",
          description:
            "Obtienes la dote Mejora de característica u otra dote de tu elección para la que cumplas las condiciones. Vuelves a obtener este rasgo en los niveles 8, 12 y 16 de brujo. ",
        },
      ],
      classSpecific: {
        invocations: "6",
        cantrips: "3",
        prepared: "9",
        slots: "2",
        slotLevel: "4",
      },
    },
    {
      level: 9,
      proficiencyBonus: 4,
      features: [
        {
          name: "Contactar Patrón",
          description:
            "Antes solías ponerte en contacto con tu patrón a través de intermediarios. Ahora puedes comunicarte directamente, ya que siempre tienes el conjuro contactar con otro plano preparado. Con este rasgo, puedes lanzar el conjuro sin gastar un espacio de conjuro para contactar con tu patrón y superas automáticamente la tirada de salvación del conjuro. \nCuando lances el conjuro con este rasgo, no podrás volver a hacerlo de esta forma hasta que finalices un descanso largo.",
        },
        {
          name: "Invocaciones de Nivel +++++",
          description: "Accedes a invocaciones de mayor nivel.",
        },
      ],
      classSpecific: {
        invocations: "7",
        cantrips: "3",
        prepared: "10",
        slots: "2",
        slotLevel: "5",
      },
    },
    {
      level: 10,
      proficiencyBonus: 4,
      features: [
        {
          name: "Rasgo de Subclase",
          description: "Obtienes un rasgo de tu subclase.",
        },
      ],
      classSpecific: {
        invocations: "7",
        cantrips: "4",
        prepared: "10",
        slots: "2",
        slotLevel: "5",
      },
    },
    {
      level: 11,
      proficiencyBonus: 4,
      features: [
        {
          name: "Arcanum Místico",
          description:
            "Tu patrón te recompensa con un secreto mágico denominado arcanum. Escoge uno de los conjuros de brujo de nivel 6 como este arcanum. Puedes lanzar tu conjuro de arcanum una vez sin gastar un espacio de conjuro y debes finalizar un descanso largo antes de poder volver a lanzarlo de este modo. Obtendrás más conjuros de brujo de tu elección que podrás lanzar de esta forma cuando alcances los niveles 13 (conjuro de nivel 7), 15 (conjuro de nivel 8) y 17 (conjuro de nivel 9) de brujo, como se muestra en la tabla “Rasgos de brujo”. Recuperas todos los usos de tu Arcanum místico tras finalizar un descanso largo. Siempre que subas un nivel de brujo, puedes sustituir uno de tus conjuros de arcanum por otro conjuro de brujo del mismo nivel. ",
        },
        {
          name: "Arcanum Místico (Nv 6)",
          description:
            "Eliges un conjuro de nivel 6, que puedes lanzar 1 vez cada descanso largo sin gastar un espacio de conjuro.",
        },
      ],
      classSpecific: {
        invocations: "7",
        cantrips: "4",
        prepared: "11",
        slots: "3",
        slotLevel: "5",
      },
    },
    {
      level: 12,
      proficiencyBonus: 4,
      features: [
        {
          name: "Mejora de Característica",
          description:
            "Obtienes la dote Mejora de característica u otra dote de tu elección para la que cumplas las condiciones. Vuelves a obtener este rasgo en los niveles 8, 12 y 16 de brujo. ",
        },
        {
          name: "Invocaciones de Nivel ++++++",
          description: "Accedes a invocaciones de mayor nivel.",
        },
      ],
      classSpecific: {
        invocations: "8",
        cantrips: "4",
        prepared: "11",
        slots: "3",
        slotLevel: "5",
      },
    },
    {
      level: 13,
      proficiencyBonus: 5,
      features: [
        {
          name: "Arcanum Místico (Nv 7)",
          description:
            "Eliges un conjuro de nivel 7, que puedes lanzar 1 vez cada descanso largo sin gastar un espacio de conjuro.",
        },
      ],
      classSpecific: {
        invocations: "8",
        cantrips: "4",
        prepared: "12",
        slots: "3",
        slotLevel: "5",
      },
    },
    {
      level: 14,
      proficiencyBonus: 5,
      features: [
        {
          name: "Rasgo de Subclase",
          description: "Obtienes un rasgo de tu subclase.",
        },
      ],
      classSpecific: {
        invocations: "8",
        cantrips: "4",
        prepared: "12",
        slots: "3",
        slotLevel: "5",
      },
    },
    {
      level: 15,
      proficiencyBonus: 5,
      features: [
        {
          name: "Arcanum Místico (Nv 8)",
          description:
            "Eliges un conjuro de nivel 8, que puedes lanzar 1 vez cada descanso largo sin gastar un espacio de conjuro.",
        },
        {
          name: "Invocaciones de Nivel +++++++",
          description: "Accedes a invocaciones de mayor nivel.",
        },
      ],
      classSpecific: {
        invocations: "9",
        cantrips: "4",
        prepared: "13",
        slots: "3",
        slotLevel: "5",
      },
    },
    {
      level: 16,
      proficiencyBonus: 5,
      features: [
        {
          name: "Mejora de Característica",
          description:
            "Obtienes la dote Mejora de característica u otra dote de tu elección para la que cumplas las condiciones. Vuelves a obtener este rasgo en los niveles 8, 12 y 16 de brujo. ",
        },
      ],
      classSpecific: {
        invocations: "9",
        cantrips: "4",
        prepared: "13",
        slots: "3",
        slotLevel: "5",
      },
    },
    {
      level: 17,
      proficiencyBonus: 6,
      features: [
        {
          name: "Arcanum Místico (Nv 9)",
          description: "Eliges un conjuro de nivel 9 (1/día).",
        },
      ],
      classSpecific: {
        invocations: "9",
        cantrips: "4",
        prepared: "14",
        slots: "4",
        slotLevel: "5",
      },
    },
    {
      level: 18,
      proficiencyBonus: 6,
      features: [
        {
          name: "Invocaciones de Nivel ++++++++",
          description: "Accedes a invocaciones de mayor nivel.",
        },
      ],
      classSpecific: {
        invocations: "10",
        cantrips: "4",
        prepared: "14",
        slots: "4",
        slotLevel: "5",
      },
    },
    {
      level: 19,
      proficiencyBonus: 6,
      features: [
        {
          name: "Don Épico",
          description:
            "Obtienes una dote de don épico u otra dote de tu elección para la que cumplas las condiciones. Se recomienda Don del destino.",
        },
      ],
      classSpecific: {
        invocations: "10",
        cantrips: "4",
        prepared: "15",
        slots: "4",
        slotLevel: "5",
      },
    },
    {
      level: 20,
      proficiencyBonus: 6,
      features: [
        {
          name: "Maestro Sobrenatural",
          description:
            "Cuando empleas tu rasgo Astucia mágica, recuperas todos los espacios de conjuro utilizados de Magia del pacto.",
        },
      ],
      classSpecific: {
        invocations: "10",
        cantrips: "4",
        prepared: "15",
        slots: "4",
        slotLevel: "5",
      },
    },
  ],

  // --- REEMPLAZÁ EL BLOQUE optionalFeatures CON ESTO ---
  optionalFeatures: [
    {
      title: "Invocaciones Sobrenaturales",
      description:
        "Fragmentos de conocimiento prohibido que te imbuyen de una capacidad mágica perpetua.",
      items: [
        // --- SIN REQUISITO DE NIVEL (Nivel 1+) ---
        {
          name: "Armadura de Sombras",
          requirements: "-",
          description:
            "Puedes lanzar armadura de mago sobre ti sin gastar un espacio de conjuro. ",
        },
        {
          name: "Mente Sobrenatural",
          requirements: "-",
          description:
            "Tienes ventaja en las tiradas de salvación de Constitución que realices para mantener la concentración. ",
        },
        {
          name: "Pacto de la Cadena",
          requirements: "-",
          description:
            "Aprendes el conjuro encontrar familiar y puedes lanzarlo como acción de magia sin gastar un espacio de conjuro. \nCuando lo lances, escoge entre una de las formas habituales para tu familiar o una de las siguientes formas especiales: <strong>diablillo, duende, esfinge de las maravillas, esqueleto, pseudodragón, quasit, renacuajo slaad o serpiente venenosa</strong>. \nAsimismo, cuando realizas la acción de atacar, puedes renunciar a uno de tus propios ataques para que el familiar realice un ataque propio con su reacción. ",
        },
        {
          name: "Pacto del Filo",
          requirements: "-",
          description:
            "Como acción adicional, puedes conjurar en tu mano un arma de pacto, un arma cuerpo a cuerpo sencilla o marcial de tu elección con la que estableces un vínculo. Como alternativa, puedes vincularte con un arma mágica que toques, pero no podrás hacerlo si otra criatura está sintonizada con ella o si otro brujo está vinculado con ella. \nHasta que termine el vínculo, tendrás competencia con esa arma y podrás usarla como canalizador mágico. \nSiempre que ataques con el arma vinculada, puedes usar tu modificador por Carisma para las tiradas de ataque y de daño en lugar del modificador por Fuerza o Destreza. Además, puedes hacer que cause daño necrótico, psíquico o radiante en lugar de su tipo de daño normal. \nTu vínculo con el arma se rompe si vuelves a usar la acción adicional de este rasgo, si el arma está a más de 1,5 m de ti durante 1 minuto o más o si mueres. Un arma conjurada desaparece cuando termina el vínculo. ",
        },
        {
          name: "Pacto del Grimorio",
          requirements: "-",
          description:
            "Uniendo hebras de sombras, conjuras un libro en tu mano al terminar un descanso corto o largo. Este Libro de las sombras (tú eliges su aspecto) contiene magia sobrenatural a la que solo tú puedes acceder y que te proporciona los beneficios presentados a continuación. El libro desaparece si conjuras otro con este rasgo o si mueres. \n<strong>Trucos y rituales:</strong> Cuando aparezca el libro, elige tres trucos y dos conjuros de nivel 1 que estén marcados como “ritual”. Los conjuros pueden ser de la lista de cualquier clase y deben ser conjuros que no tengas ya preparados. Mientras lleves el libro contigo, tendrás preparados los conjuros elegidos y funcionarán como conjuros de brujo para ti. \n<strong>Canalizador mágico:</strong> Puedes usar el libro como canalizador mágico. ",
        },

        // --- NIVEL 2 ---
        {
          name: "Descarga Agónica",
          requirements: "Nivel 2, Truco de daño",
          description:
            "Elige uno de tus trucos de brujo que conozcas y cause daño. Puedes sumar tu modificador por Carisma a las tiradas de daño del conjuro. \n<strong>Repetible:</strong> Puedes obtener esta invocación más de una vez. Cada vez que lo hagas, elige un truco distinto que cumpla las condiciones. ",
        },
        {
          name: "Descarga Ahuyentadora",
          requirements: "Nivel 2, Truco de ataque",
          description:
            "Elige uno de tus trucos de brujo que conozcas y requiera una tirada de ataque. Cuando aciertes a una criatura Grande o más pequeña con ese truco, puedes empujarla hasta 3 m respecto a ti en línea recta. \n<strong>Repetible:</strong> Puedes obtener esta invocación más de una vez. Cada vez que lo hagas, elige un truco distinto que cumpla las condiciones.",
        },
        {
          name: "Lanza Sobrenatural",
          requirements: "Nivel 2, Truco de daño",
          description:
            "Elige uno de tus trucos de brujo que conozcas, cause daño y tenga un alcance de 3 m o más. Cuando lances ese conjuro, su alcance aumenta una cantidad de metros igual a 10 veces tu nivel de brujo. \n<strong>Repetible:</strong> Puedes obtener esta invocación más de una vez. Cada vez que lo hagas, elige un truco distinto que cumpla las condiciones.",
        },
        {
          name: "Lecciones de los Primeros",
          requirements: "Nivel 2",
          description:
            "Has obtenido conocimientos de un ente anciano del multiverso, lo que te permite obtener una dote de origen de tu elección. \n<strong>Repetible:</strong> Puedes obtener esta invocación más de una vez. Cada vez que lo hagas, elige una dote de origen distinta. ",
        },
        {
          name: "Máscara de los Mil Rostros",
          requirements: "Nivel 2",
          description:
            "Puedes lanzar disfrazarse sin gastar un espacio de conjuro. ",
        },
        {
          name: "Salto Sobrenatural",
          requirements: "Nivel 2",
          description:
            "Puedes lanzar salto sobre ti sin gastar un espacio de conjuro.",
        },
        {
          name: "Vigor Infernal",
          requirements: "Nivel 2",
          description:
            "Puedes lanzar falsa vida sobre ti sin gastar un espacio de conjuro. Si lanzas el conjuro con este rasgo, no tiras el dado para los puntos de golpe temporales; en su lugar, obtienes automáticamente el número más alto en el dado.",
        },
        {
          name: "Visiones Brumosas",
          requirements: "Nivel 2",
          description:
            "Puedes lanzar imagen silenciosa sin gastar un espacio de conjuro. ",
        },
        {
          name: "Vista del Diablo",
          requirements: "Nivel 2",
          description:
            "Puedes ver con normalidad en luz tenue y en la oscuridad, tanto si son mágicas como si no, a una distancia de 36 m o menos de ti. ",
        },

        // --- NIVEL 5 ---
        {
          name: "Castigo Arcano",
          requirements: "Nivel 5, Pacto del Filo",
          description:
            "Una vez por turno, cuando aciertes a una criatura con tu arma de pacto, puedes gastar un espacio de conjuro de Magia del pacto para causar 1d8 de daño de fuerza adicional al objetivo más 1d8 por cada nivel del espacio de conjuro. Además, puedes imponerle el estado de derribado al objetivo si es Enorme o más pequeño.",
        },
        {
          name: "Don de las Profundidades",
          requirements: "Nivel 5",
          description:
            "Puedes respirar bajo el agua y obtienes una velocidad nadando igual a tu velocidad. \nTambién puedes lanzar respirar bajo el agua una vez sin gastar un espacio de conjuro. Recuperas la capacidad de lanzarlo de este modo tras finalizar un descanso largo. ",
        },
        {
          name: "Filo Sediento",
          requirements: "Nivel 5, Pacto del Filo",
          description:
            "Obtienes el rasgo Ataque adicional, pero solo para tu arma de pacto. Este rasgo te permite hacer dos ataques con esa arma en lugar de uno cuando lleves a cabo la acción de atacar en tu turno. ",
        },
        {
          name: "Inversión del Amo de las Cadenas",
          requirements: "Nivel 5, Pacto de la Cadena",
          description:
            "Cuando lanzas encontrar familiar, imbuyes al familiar invocado de una cierta cantidad de tu poder sobrenatural, lo que le otorga a la criatura los siguientes beneficios. \n<strong>Acuático</strong> o <strong>aéreo:</strong> El familiar obtiene una velocidad nadando o una velocidad volando (a tu elección) de 12 m. \n<strong>Ataque rápido:</strong> Como acción adicional, puedes ordenar al familiar que realice la acción de atacar. \n<strong>Daño necrótico</strong> o <strong>radiante:</strong> Siempre que el familiar haga daño contundente, cortante o perforante, puedes hacer que cause daño necrótico o radiante en su lugar. \n<strong>Tu CD de salvación:</strong> Si el familiar obliga a una criatura a realizar una tirada de salvación, esta utiliza tu CD de salvación de conjuros. \n<strong>Resistencia:</strong> Cuando el familiar recibe daño, puedes usar una reacción para otorgarle resistencia contra ese daño. ",
        },
        {
          name: "Maestro de las Formas Innumerables",
          requirements: "Nivel 5",
          description:
            "Puedes lanzar alterar el propio aspecto sin gastar un espacio de conjuro. ",
        },
        {
          name: "Mirada de las Dos Mentes",
          requirements: "Nivel 5",
          description:
            "Puedes usar una acción adicional para tocar a una criatura voluntaria y percibir el mundo a través de sus sentidos hasta el final de tu siguiente turno. Mientras la criatura permanezca en el mismo plano de existencia que tú, podrás utilizar una acción adicional en cada uno de los turnos posteriores para mantener esta conexión y alargar la duración de este efecto hasta el final de tu siguiente turno. \nLa conexión termina si no la mantienes de esta forma. \nMientras percibes el mundo a través de los ojos de la otra criatura, te beneficias de cualquier sentido especial que tenga y puedesllanzar conjuros como si estuvieras en tu espacio o en el espacio de la otra criatura si estáis a 18 m o menos de distancia. ",
        },
        {
          name: "Paso Ascendente",
          requirements: "Nivel 5",
          description:
            "Puedes lanzar levitar sobre ti sin gastar un espacio de conjuro.",
        },
        {
          name: "Uno con las Sombras",
          requirements: "Nivel 5",
          description:
            "Mientras estés en una zona de luz tenue u oscuridad, puedes lanzar invisibilidad sobre ti sin gastar un espacio de conjuro. ",
        },

        // --- NIVEL 7 ---
        {
          name: "Susurros del Sepulcro",
          requirements: "Nivel 7",
          description:
            "Puedes lanzar hablar con los muertos sin gastar un espacio de conjuro. ",
        },

        // --- NIVEL 9 ---
        {
          name: "Devorador de Vida",
          requirements: "Nivel 9, Pacto del Filo",
          description:
            "Una vez por turno, cuando aciertes a una criatura con tu arma de pacto, puedes causarle 1d6 de daño necrótico, psíquico o radiante adicional (a tu elección) a esa criatura y gastar uno de tus dados de puntos de golpe para tirarlo y recuperar una cantidad de puntos de golpe igual al resultado más tu modificador por Constitución (mínimo 1 punto de golpe). ",
        },
        {
          name: "Don de los Protectores",
          requirements: "Nivel 9, Pacto del Grimorio",
          description:
            "Aparece una nueva página en el Libro de las sombras cuando lo conjuras. Con tu permiso, una criatura puede usar una acción para escribir su nombre en esa página, que puede contener una cantidad de nombres igual a tu modificador por Carisma (mínimo un nombre). \nCuando los puntos de golpe de cualquier criatura cuyo nombre esté en la página se reduzcan a O, pero no muera, en vez de eso pasará a tener 1 punto de golpe mágicamente. Cuando esta magia se active, ninguna criatura podrá beneficiarse de ella hasta que finalices un descanso largo. \nComo acción de magia, puedes borrar un nombre de la página tocándolo.",
        },
        {
          name: "Visiones de Reinos Remotos",
          requirements: "Nivel 9",
          description:
            "Puedes lanzar ojo arcano sin gastar un espacio de conjuro.",
        },

        // --- NIVEL 12 ---
        {
          name: "Hoja Devoradora",
          requirements: "Nivel 12, Filo Sediento",
          description:
            "El rasgo Ataque adicional de tu invocación Filo sediento otorga dos ataques adicionales en vez de uno.",
        },

        // --- NIVEL 15 ---
        {
          name: "Visión Bruja",
          requirements: "Nivel 15",
          description: "Tienes visión verdadera hasta 9 m.",
        },
      ],
    },
  ],

  subclasses: [
    {
      name: "Patrón Celestial",
      description:
        "Pacto con un ser de los Planos Superiores (Empíreo, Couatl, Unicornio).",
      expandedSpells: [
         // Nota: Auxilio es nivel 2 en 2014, pero en la imagen del 2024 aparece en la lista de nivel de brujo 3. Revisando reglas: Auxilio es nv 2. La imagen agrupa por nivel de brujo. Ajustaré por nivel de conjuro real.
        // CORRECCIÓN BASADA EN REGLAS 5e (La imagen agrupa por Nivel de Brujo, no de Conjuro):
        // Nivel Brujo 3 = Conjuros de Nivel 1 y 2.
        // Nivel Brujo 5 = Conjuros de Nivel 3.
        // Nivel Brujo 7 = Conjuros de Nivel 4.
        // Nivel Brujo 9 = Conjuros de Nivel 5.
        { spellLevel: 3, list: ["Auxilio","Curar heridas", "Saeta guía","Llama sagrada","Luz","Restablecimiento menor"] },
        { spellLevel: 5, list: ["Luz del día", "Revivir"] },
        { spellLevel: 7, list: ["Guardián de la fe", "Muro de fuego"] },
        { spellLevel: 5, list: ["Invocar celestial", "Restablecimiento mayor"],},
      ],
      features: [
        {
          level: 3,
          name: "Conjuros del Celestial",
          description:
            "La magia de tu patrón garantiza que siempre tengas ciertos conjuros preparados. Cuando alcances un nivel de brujo especificado en la tabla “Conjuros del celestial”, a partir de entonces siempre tendrás preparados los conjuros que se indican. ",
        },
        {
          level: 3,
          name: "Luz Sanadora",
          description:
            "Reserva de dados d6 (1+Nivel) para curar a 18m como acción adicional.",
        },
        {
          level: 6,
          name: "Alma Radiante",
          description:
            "Resistencia radiante. Sumas Carisma al daño radiante/fuego de conjuros.",
        },
        {
          level: 10,
          name: "Resiliencia Celestial",
          description:
            "Ganas PG temporales (Nivel + CAR) al descansar o usar Astucia Mágica. Aliados ganan la mitad.",
        },
        {
          level: 14,
          name: "Venganza Ardiente",
          description:
            "Al hacer salvación de muerte, te levantas con mitad de vida, ciegas y dañas a enemigos cercanos.",
        },
      ],
    },
    {
      name: "Patrón Feérico",
      description:
        "Pacto con un señor de los Parajes Feéricos (Titania, Oberon, Reina del Aire y la Oscuridad).",
      expandedSpells: [
        { spellLevel: 3, list: ["Dormir", "Fuego feérico","Calmar emociones", "Fuerza fantasmal", "Paso brumoso"] },
        { spellLevel: 5, list: ["Crecimiento vegetal", "Desplazamiento"] },
        { spellLevel: 7, list: ["Dominar bestia", "Invisibilidad mejorada"] },
        { spellLevel: 9, list: ["Apariencia", "Dominar persona"] },
      ],
      features: [
        {
          level: 3,
          name: "Pasos Feéricos",
          description:
            "Lanzas Paso Brumoso gratis (Usos = CAR). Añades efectos: Burlón (desventaja ataques) o Refrescante (cura).",
        },
        {
          level: 6,
          name: "Escape Brumoso",
          description:
            "Paso Brumoso como reacción al recibir daño. Nuevos efectos: Aterrador (daño psíquico) o Desvanecedor (invisible).",
        },
        {
          level: 10,
          name: "Defensas Seductoras",
          description:
            "Inmune a Hechizado. Reacción para reducir daño a la mitad y devolverlo como psíquico.",
        },
        {
          level: 14,
          name: "Magia Embrujadora",
          description:
            "Al lanzar Encantamiento/Ilusión, lanzas Paso Brumoso gratis.",
        },
      ],
    },
    {
      name: "Patrón Infernal",
      description:
        "Pacto con un demonio, diablo o yugoloth de los Planos Inferiores.",
      expandedSpells: [
        { spellLevel: 3, list: ["Manos ardientes", "Orden imperiosa","Rayo abrasador", "Sugestión"] },
        { spellLevel: 5, list: ["Bola de fuego", "Nube apestosa"] },
        { spellLevel: 7, list: ["Escudo de fuego", "Muro de fuego"] },
        { spellLevel: 9, list: ["Geas", "Plaga de insectos"] },
      ],
      features: [
        {
          level: 3,
          name: "Bendición del Oscuro",
          description:
            "Cuando reduces a 0 a un enemigo, ganas PG temporales (CAR + Nivel).",
        },
        {
          level: 6,
          name: "La Suerte del Oscuro",
          description:
            "Sumas 1d10 a una prueba de característica o salvación (Usos = CAR).",
        },
        {
          level: 10,
          name: "Resistencia Infernal",
          description:
            "Eliges resistencia a un tipo de daño tras cada descanso.",
        },
        {
          level: 14,
          name: "Arrastrar por el Infierno",
          description:
            "Al acertar ataque, destierras al objetivo. Al volver sufre 8d10 psíquico.",
        },
      ],
    },
    {
      name: "Patrón Primigenio",
      description:
        "Pacto con una entidad antigua e incomprensible del Reino Lejano (Cthulhu, Hadar).",
      expandedSpells: [
        { spellLevel: 3, list: ["Risa horrible de Tasha", "Susurros discordantes","Detectar pensamientos", "Fuerza fantasmal"] },
        { spellLevel: 5, list: ["Clarividencia", "Hambre de Hadar"] },
        { spellLevel: 7, list: ["Confusión", "Invocar aberración"] },
        { spellLevel: 9, list: ["Alterar los recuerdos", "Telequinesis"] },
      ],
      features: [
        {
          level: 3,
          name: "Mente Iluminada",
          description:
            "Telepatía 1.5km. Puedes cambiar daño de conjuros a psíquico. Encantamiento/Ilusión sin componentes V/S.",
        },
        {
          level: 6,
          name: "Combatiente Clarividente",
          description:
            "Al conectar mente, fuerzas salvación: si falla, tienes ventaja contra él y él desventaja contra ti.",
        },
        {
          level: 10,
          name: "Escudo Mental",
          description:
            "Pensamientos ilegibles. Resistencia psíquica y reflejas daño psíquico.",
        },
        {
          level: 10,
          name: "Maleficio Sobrenatural",
          description:
            "Siempre tienes Maleficio. Impone desventaja en salvaciones de la característica elegida.",
        },
        {
          level: 14,
          name: "Crear Siervo",
          description:
            "Invocar Aberración sin concentración (1 min). Gana PG temporales y hace daño extra a objetivos con Maleficio.",
        },
      ],
    },
  ],
};

const clericData = {
  name: "Clérigo",
  description:
    "Un sacerdote milagroso que canaliza el poder divino para obrar maravillas y castigar enemigos.",
  hitDie: 8,
  primaryAbility: ["Sabiduría"],
  savingThrows: ["Sabiduría", "Carisma"],
  proficiencies: {
    armor: ["Ligeras", "Medias", "Escudos"],
    weapons: ["Sencillas"],
    tools: [],
  },
  skillChoices: {
    count: 2,
    list: ["Historia", "Medicina", "Perspicacia", "Persuasión", "Religión"],
  },
  startingEquipment: [
    "Camisa de malla (o Armadura de cuero/Cota de escamas si no tienes fuerza)",
    "Escudo",
    "Maza",
    "Símbolo Sagrado",
    "Paquete de sacerdote y 7 po",
  ],

  // Configuración visual de la tabla
  tableMetadata: {
    columns: [
      { label: "Canalizar Divinidad", dataKey: "channelDivinity" },
      { label: "Trucos", dataKey: "cantrips" },
      { label: "Preparados", dataKey: "prepared" },
      { label: "I", dataKey: "slots1" },
      { label: "II", dataKey: "slots2" },
      { label: "III", dataKey: "slots3" },
      { label: "IV", dataKey: "slots4" },
      { label: "V", dataKey: "slots5" },
      { label: "VI", dataKey: "slots6" },
      { label: "VII", dataKey: "slots7" },
      { label: "VIII", dataKey: "slots8" },
      { label: "IX", dataKey: "slots9" },
    ],
  },

  progression: [
    {
      level: 1,
      proficiencyBonus: 2,
      features: [
        {
          name: "Lanzamiento de Conjuros",
          description:
            "Usas Sabiduría. Puedes cambiar tus conjuros preparados tras un descanso largo.",
        },
        {
          name: "Orden Divina",
          description:
            "Elige: Protector (Armadura Pesada/Armas Marciales) o Taumaturgo (Truco extra/Bono Religión).",
        },
      ],
      classSpecific: {
        channelDivinity: "-",
        cantrips: "3",
        prepared: "4",
        slots1: "2",
        slots2: "-",
        slots3: "-",
        slots4: "-",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 2,
      proficiencyBonus: 2,
      features: [
        {
          name: "Canalizar Divinidad",
          description:
            "Usos por descanso corto/largo. Opciones: Chispa Divina (Curar/Dañar) o Expulsar Muertos Vivientes.",
        },
      ],
      classSpecific: {
        channelDivinity: "2",
        cantrips: "3",
        prepared: "5",
        slots1: "3",
        slots2: "-",
        slots3: "-",
        slots4: "-",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 3,
      proficiencyBonus: 2,
      features: [
        {
          name: "Subclase de Clérigo",
          description: "Elige tu Dominio (Guerra, Luz, Vida o Engaño).",
        },
      ],
      classSpecific: {
        channelDivinity: "2",
        cantrips: "3",
        prepared: "6",
        slots1: "4",
        slots2: "2",
        slots3: "-",
        slots4: "-",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 4,
      proficiencyBonus: 2,
      features: [
        {
          name: "Mejora de Característica",
          description: "Aumenta una característica o elige una Dote.",
        },
      ],
      classSpecific: {
        channelDivinity: "2",
        cantrips: "4",
        prepared: "7",
        slots1: "4",
        slots2: "3",
        slots3: "-",
        slots4: "-",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 5,
      proficiencyBonus: 3,
      features: [
        {
          name: "Abrasar Muertos Vivientes",
          description:
            "Cuando usas Expulsar, los muertos vivientes fallidos sufren daño radiante (d8s = Mod SAB).",
        },
      ],
      classSpecific: {
        channelDivinity: "2",
        cantrips: "4",
        prepared: "9",
        slots1: "4",
        slots2: "3",
        slots3: "2",
        slots4: "-",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 6,
      proficiencyBonus: 3,
      features: [
        {
          name: "Rasgo de Dominio",
          description: "Obtienes un rasgo de tu subclase.",
        },
      ],
      classSpecific: {
        channelDivinity: "3",
        cantrips: "4",
        prepared: "10",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "-",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 7,
      proficiencyBonus: 3,
      features: [
        {
          name: "Golpes Benditos",
          description:
            "Elige: Golpe Divino (1d8 extra con armas) o Lanzamiento Potente (Suma SAB a trucos).",
        },
      ],
      classSpecific: {
        channelDivinity: "3",
        cantrips: "4",
        prepared: "11",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "1",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 8,
      proficiencyBonus: 3,
      features: [
        {
          name: "Mejora de Característica",
          description: "Aumenta una característica o elige una Dote.",
        },
      ],
      classSpecific: {
        channelDivinity: "3",
        cantrips: "4",
        prepared: "12",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "2",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 9,
      proficiencyBonus: 4,
      features: [],
      classSpecific: {
        channelDivinity: "3",
        cantrips: "4",
        prepared: "14",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "1",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 10,
      proficiencyBonus: 4,
      features: [
        {
          name: "Intercesión Divina",
          description:
            "Una vez por descanso largo, lanza cualquier conjuro de Clérigo (nv 5 o menos) sin gastar espacio ni componentes.",
        },
      ],
      classSpecific: {
        channelDivinity: "3",
        cantrips: "5",
        prepared: "15",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 11,
      proficiencyBonus: 4,
      features: [],
      classSpecific: {
        channelDivinity: "3",
        cantrips: "5",
        prepared: "16",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "1",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 12,
      proficiencyBonus: 4,
      features: [
        {
          name: "Mejora de Característica",
          description: "Aumenta una característica o elige una Dote.",
        },
      ],
      classSpecific: {
        channelDivinity: "3",
        cantrips: "5",
        prepared: "16",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "1",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 13,
      proficiencyBonus: 5,
      features: [],
      classSpecific: {
        channelDivinity: "3",
        cantrips: "5",
        prepared: "17",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "1",
        slots7: "1",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 14,
      proficiencyBonus: 5,
      features: [
        {
          name: "Golpes Benditos Mejorados",
          description:
            "Golpe Divino sube a 2d8 o Lanzamiento Potente otorga PG temporales al dañar.",
        },
      ],
      classSpecific: {
        channelDivinity: "3",
        cantrips: "5",
        prepared: "17",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "1",
        slots7: "1",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 15,
      proficiencyBonus: 5,
      features: [],
      classSpecific: {
        channelDivinity: "3",
        cantrips: "5",
        prepared: "18",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "1",
        slots7: "1",
        slots8: "1",
        slots9: "-",
      },
    },
    {
      level: 16,
      proficiencyBonus: 5,
      features: [
        {
          name: "Mejora de Característica",
          description: "Aumenta una característica o elige una Dote.",
        },
      ],
      classSpecific: {
        channelDivinity: "3",
        cantrips: "5",
        prepared: "18",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "1",
        slots7: "1",
        slots8: "1",
        slots9: "-",
      },
    },
    {
      level: 17,
      proficiencyBonus: 6,
      features: [
        {
          name: "Rasgo de Dominio",
          description: "Obtienes el rasgo final de tu subclase.",
        },
      ],
      classSpecific: {
        channelDivinity: "3",
        cantrips: "5",
        prepared: "19",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "1",
        slots7: "1",
        slots8: "1",
        slots9: "1",
      },
    },
    {
      level: 18,
      proficiencyBonus: 6,
      features: [],
      classSpecific: {
        channelDivinity: "4",
        cantrips: "5",
        prepared: "20",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "3",
        slots6: "1",
        slots7: "1",
        slots8: "1",
        slots9: "1",
      },
    },
    {
      level: 19,
      proficiencyBonus: 6,
      features: [
        {
          name: "Don Épico",
          description: "Eliges una Dote Épica (Recomendado: Don del Destino).",
        },
      ],
      classSpecific: {
        channelDivinity: "4",
        cantrips: "5",
        prepared: "21",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "3",
        slots6: "2",
        slots7: "1",
        slots8: "1",
        slots9: "1",
      },
    },
    {
      level: 20,
      proficiencyBonus: 6,
      features: [
        {
          name: "Intercesión Divina Mayor",
          description:
            "Puedes usar Deseo con tu Intercesión Divina (recarga 2d4 días).",
        },
      ],
      classSpecific: {
        channelDivinity: "4",
        cantrips: "5",
        prepared: "22",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "3",
        slots6: "2",
        slots7: "2",
        slots8: "1",
        slots9: "1",
      },
    },
  ],
  subclasses: [
    {
      name: "Dominio de la Guerra",
      description:
        "Inspiran valor y castigan a los enemigos en el frente de batalla.",
      features: [
        {
          level: 3,
          name: "Golpe Guiado",
          description:
            "Reacción +10 a un ataque (tuyo o aliado) usando Canalizar Divinidad.",
        },
        {
          level: 3,
          name: "Sacerdote Guerrero",
          description:
            "Ataque con arma como acción adicional (Usos = Mod SAB).",
        },
        {
          level: 6,
          name: "Bendición del Dios de la Guerra",
          description:
            "Lanzas Arma Espiritual o Escudo de Fe sin concentración usando Canalizar Divinidad.",
        },
        {
          level: 17,
          name: "Avatar de la Batalla",
          description: "Resistencia a daño contundente, cortante y perforante.",
        },
      ],
    },
    {
      name: "Dominio de la Luz",
      description: "Ahuyentan la oscuridad con fuego abrasador y revelaciones.",
      features: [
        {
          level: 3,
          name: "Fulgor Protector",
          description: "Reacción para imponer desventaja a un ataque enemigo.",
        },
        {
          level: 3,
          name: "Resplandor del Amanecer",
          description:
            "Acción para disipar oscuridad y causar daño radiante en área.",
        },
        {
          level: 6,
          name: "Fulgor Mejorado",
          description:
            "Otorga PG temporales al objetivo que proteges con Fulgor.",
        },
        {
          level: 17,
          name: "Halo de Luz",
          description:
            "Emites luz solar que da desventaja a enemigos contra tus conjuros de fuego/radiante.",
        },
      ],
    },
    {
      name: "Dominio de la Vida",
      description: "Maestros de la curación y la energía positiva.",
      features: [
        {
          level: 3,
          name: "Discípulo de la Vida",
          description:
            "Curación extra (2 + nivel de conjuro) al lanzar conjuros.",
        },
        {
          level: 3,
          name: "Preservar Vida",
          description:
            "Canalizar Divinidad para curar a múltiples aliados (5 x Nivel).",
        },
        {
          level: 6,
          name: "Sanador Bendito",
          description: "Te curas a ti mismo cuando curas a otros.",
        },
        {
          level: 17,
          name: "Sanación Suprema",
          description: "Tus dados de curación siempre sacan el máximo.",
        },
      ],
    },
    {
      name: "Dominio del Engaño",
      description: "Maestros de las ilusiones, el sigilo y la subversión.",
      features: [
        {
          level: 3,
          name: "Bendición del Embaucador",
          description: "Otorga ventaja en Sigilo a ti o a un aliado.",
        },
        {
          level: 3,
          name: "Invocar Duplicidad",
          description:
            "Creas una ilusión perfecta. Puedes lanzar conjuros desde ella y da ventaja en ataques.",
        },
        {
          level: 6,
          name: "Transposición",
          description:
            "Puedes teletransportarte para cambiar lugar con tu ilusión.",
        },
        {
          level: 17,
          name: "Duplicidad Mejorada",
          description:
            "La ilusión cura a aliados cercanos cuando desaparece y da ventaja a ataques.",
        },
      ],
    },
  ],
};

const druidData = {
  name: "Druida",
  description:
    "Un sacerdote de la Antigua Fe, que canaliza los poderes de la naturaleza (luz de luna, crecimiento vegetal, fuego, rayo) y adopta formas animales.",
  hitDie: 8,
  primaryAbility: ["Sabiduría"],
  savingThrows: ["Inteligencia", "Sabiduría"],
  proficiencies: {
    armor: ["Ligeras", "Medias", "Escudos"],
    weapons: ["Sencillas"],
    tools: ["Útiles de herborista"],
  },
  skillChoices: {
    count: 2,
    list: [
      "Conocimiento arcano",
      "Medicina",
      "Naturaleza",
      "Percepción",
      "Perspicacia",
      "Religión",
      "Supervivencia",
      "Trato con animales",
    ],
  },
  startingEquipment: [
    "Armadura de cuero y Escudo",
    "Hoz",
    "Canalizador druídico",
    "Paquete de explorador y Útiles de herborista",
    "9 po",
  ],

  // Configuración de la tabla visual
  tableMetadata: {
    columns: [
      { label: "Forma Salvaje", dataKey: "wildShape" },
      { label: "Trucos", dataKey: "cantrips" },
      { label: "Preparados", dataKey: "prepared" },
      { label: "I", dataKey: "slots1" },
      { label: "II", dataKey: "slots2" },
      { label: "III", dataKey: "slots3" },
      { label: "IV", dataKey: "slots4" },
      { label: "V", dataKey: "slots5" },
      { label: "VI", dataKey: "slots6" },
      { label: "VII", dataKey: "slots7" },
      { label: "VIII", dataKey: "slots8" },
      { label: "IX", dataKey: "slots9" },
    ],
  },

  progression: [
    {
      level: 1,
      proficiencyBonus: 2,
      features: [
        {
          name: "Druídico",
          description:
            "Conoces el idioma secreto y siempre tienes preparado Hablar con Animales.",
        },
        {
          name: "Lanzamiento de Conjuros",
          description:
            "Usas Sabiduría. Puedes cambiar conjuros preparados tras un descanso largo.",
        },
        {
          name: "Orden Primigenia",
          description:
            "Elige: Guardián (Armadura Media/Armas Marciales) o Naturalista (Truco extra/Bono Naturaleza).",
        },
      ],
      classSpecific: {
        wildShape: "-",
        cantrips: "2",
        prepared: "4",
        slots1: "2",
        slots2: "-",
        slots3: "-",
        slots4: "-",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 2,
      proficiencyBonus: 2,
      features: [
        {
          name: "Compañero Salvaje",
          description:
            "Puedes gastar un uso de Forma Salvaje para lanzar Encontrar Familiar (forma feérica/bestia).",
        },
        {
          name: "Forma Salvaje",
          description:
            "Acción adicional para transformarte en bestia. Ganas PG temporales (Nivel). Dura Nivel/2 horas.",
        },
      ],
      classSpecific: {
        wildShape: "2",
        cantrips: "2",
        prepared: "5",
        slots1: "3",
        slots2: "-",
        slots3: "-",
        slots4: "-",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 3,
      proficiencyBonus: 2,
      features: [
        {
          name: "Círculo Druídico",
          description: "Elige tu Subclase (Luna, Tierra, Estrellas o Mar).",
        },
      ],
      classSpecific: {
        wildShape: "2",
        cantrips: "2",
        prepared: "6",
        slots1: "4",
        slots2: "2",
        slots3: "-",
        slots4: "-",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 4,
      proficiencyBonus: 2,
      features: [
        {
          name: "Mejora de Característica",
          description: "Aumenta una característica o elige una Dote.",
        },
      ],
      classSpecific: {
        wildShape: "2",
        cantrips: "3",
        prepared: "7",
        slots1: "4",
        slots2: "3",
        slots3: "-",
        slots4: "-",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 5,
      proficiencyBonus: 3,
      features: [
        {
          name: "Resurgimiento Salvaje",
          description:
            "Puedes convertir espacios de conjuro en usos de Forma Salvaje (y viceversa, 1/día para espacio nv1).",
        },
      ],
      classSpecific: {
        wildShape: "2",
        cantrips: "3",
        prepared: "9",
        slots1: "4",
        slots2: "3",
        slots3: "2",
        slots4: "-",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 6,
      proficiencyBonus: 3,
      features: [
        {
          name: "Rasgo de Círculo",
          description: "Obtienes un rasgo de tu subclase.",
        },
      ],
      classSpecific: {
        wildShape: "3",
        cantrips: "3",
        prepared: "10",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "-",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 7,
      proficiencyBonus: 3,
      features: [
        {
          name: "Furia Elemental",
          description:
            "Elige: Golpe Primordial (1d8 daño extra con armas/bestia) o Lanzamiento Potente (Suma SAB a trucos).",
        },
      ],
      classSpecific: {
        wildShape: "3",
        cantrips: "3",
        prepared: "11",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "1",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 8,
      proficiencyBonus: 3,
      features: [
        {
          name: "Mejora de Característica",
          description: "Aumenta una característica o elige una Dote.",
        },
      ],
      classSpecific: {
        wildShape: "3",
        cantrips: "3",
        prepared: "12",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "2",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 9,
      proficiencyBonus: 4,
      features: [],
      classSpecific: {
        wildShape: "3",
        cantrips: "3",
        prepared: "14",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "1",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 10,
      proficiencyBonus: 4,
      features: [
        {
          name: "Rasgo de Círculo",
          description: "Obtienes un rasgo de tu subclase.",
        },
      ],
      classSpecific: {
        wildShape: "3",
        cantrips: "4",
        prepared: "15",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 11,
      proficiencyBonus: 4,
      features: [],
      classSpecific: {
        wildShape: "3",
        cantrips: "4",
        prepared: "16",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "1",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 12,
      proficiencyBonus: 4,
      features: [
        {
          name: "Mejora de Característica",
          description: "Aumenta una característica o elige una Dote.",
        },
      ],
      classSpecific: {
        wildShape: "3",
        cantrips: "4",
        prepared: "16",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "1",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 13,
      proficiencyBonus: 5,
      features: [],
      classSpecific: {
        wildShape: "3",
        cantrips: "4",
        prepared: "17",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "1",
        slots7: "1",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 14,
      proficiencyBonus: 5,
      features: [
        {
          name: "Rasgo de Círculo",
          description: "Obtienes un rasgo de tu subclase.",
        },
      ],
      classSpecific: {
        wildShape: "3",
        cantrips: "4",
        prepared: "17",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "1",
        slots7: "1",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 15,
      proficiencyBonus: 5,
      features: [
        {
          name: "Furia Elemental Mejorada",
          description:
            "Golpe Primordial sube a 2d8 o Lanzamiento Potente aumenta alcance de trucos en 90m.",
        },
      ],
      classSpecific: {
        wildShape: "3",
        cantrips: "4",
        prepared: "18",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "1",
        slots7: "1",
        slots8: "1",
        slots9: "-",
      },
    },
    {
      level: 16,
      proficiencyBonus: 5,
      features: [
        {
          name: "Mejora de Característica",
          description: "Aumenta una característica o elige una Dote.",
        },
      ],
      classSpecific: {
        wildShape: "3",
        cantrips: "4",
        prepared: "18",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "1",
        slots7: "1",
        slots8: "1",
        slots9: "-",
      },
    },
    {
      level: 17,
      proficiencyBonus: 6,
      features: [],
      classSpecific: {
        wildShape: "4",
        cantrips: "4",
        prepared: "19",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "1",
        slots7: "1",
        slots8: "1",
        slots9: "1",
      },
    },
    {
      level: 18,
      proficiencyBonus: 6,
      features: [
        {
          name: "Conjurar como Bestia",
          description:
            "Puedes lanzar conjuros (sin componentes materiales con coste) mientras estás en Forma Salvaje.",
        },
      ],
      classSpecific: {
        wildShape: "4",
        cantrips: "4",
        prepared: "20",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "3",
        slots6: "1",
        slots7: "1",
        slots8: "1",
        slots9: "1",
      },
    },
    {
      level: 19,
      proficiencyBonus: 6,
      features: [
        {
          name: "Don Épico",
          description:
            "Eliges una Dote Épica (Recomendado: Don del Viaje Dimensional).",
        },
      ],
      classSpecific: {
        wildShape: "4",
        cantrips: "4",
        prepared: "21",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "3",
        slots6: "2",
        slots7: "1",
        slots8: "1",
        slots9: "1",
      },
    },
    {
      level: 20,
      proficiencyBonus: 6,
      features: [
        {
          name: "Archidruida",
          description:
            "Recuperas 1 uso de Forma Salvaje al tirar iniciativa. Envejeces 1 año por cada 10.",
        },
      ],
      classSpecific: {
        wildShape: "4",
        cantrips: "4",
        prepared: "22",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "3",
        slots6: "2",
        slots7: "2",
        slots8: "1",
        slots9: "1",
      },
    },
  ],
  subclasses: [
    {
      name: "Círculo de la Luna",
      description:
        "Defensores que adoptan formas de combate poderosas bajo la luz de la luna.",
      features: [
        {
          level: 3,
          name: "Formas de Círculo",
          description:
            "Forma Salvaje de combate (CA mejorada, PG temporales x3). Acción adicional para transformarte.",
        },
        {
          level: 3,
          name: "Conjuros de Círculo",
          description:
            "Siempre tienes Curar Heridas, Rayo de Luna, etc. preparados.",
        },
        {
          level: 6,
          name: "Formas Mejoradas",
          description:
            "Ataques causan daño radiante opcional. Sumas SAB a salvaciones CON.",
        },
        {
          level: 10,
          name: "Paso de la Luz Lunar",
          description:
            "Teletransporte 9m como acción adicional (con ventaja en ataque).",
        },
        {
          level: 14,
          name: "Forma Lunar",
          description:
            "Teletransportas aliados. Daño radiante extra en forma salvaje.",
        },
      ],
    },
    {
      name: "Círculo de la Tierra",
      description:
        "Guardianes de la magia ancestral vinculada a un tipo de terreno (Árido, Polar, Templado, Tropical).",
      features: [
        {
          level: 3,
          name: "Ayuda de la Tierra",
          description: "Gasta Forma Salvaje para curar y dañar en área.",
        },
        {
          level: 3,
          name: "Conjuros de Círculo",
          description:
            "Ganas conjuros según el terreno elegido (se elige tras descanso largo).",
        },
        {
          level: 6,
          name: "Recuperación Natural",
          description:
            "Lanza conjuros de círculo gratis y recupera espacios en descanso corto.",
        },
        {
          level: 10,
          name: "Protección de la Naturaleza",
          description:
            "Inmune a veneno/envenenado y resistencia elemental según terreno.",
        },
        {
          level: 14,
          name: "Santuario de la Naturaleza",
          description:
            "Creas una zona de cobertura y resistencia para aliados.",
        },
      ],
    },
    {
      name: "Círculo de las Estrellas",
      description:
        "Astudiosos del cosmos que adoptan una forma estelar luminosa.",
      features: [
        {
          level: 3,
          name: "Mapa Estelar",
          description: "Canalizador que te da Guía y Saeta Guía gratis.",
        },
        {
          level: 3,
          name: "Forma Estelar",
          description:
            "Gasta Forma Salvaje para brillar. Elige constelación: Arquero (ataque extra), Cáliz (cura extra) o Dragón (concentración asegurada).",
        },
        {
          level: 6,
          name: "Presagio Cósmico",
          description:
            "Tira 1d6 tras descanso. Par = bonificar, Impar = penalizar d20s.",
        },
        {
          level: 10,
          name: "Constelaciones Centelleantes",
          description:
            "Mejoran los efectos de Forma Estelar (vuelo, más daño).",
        },
        {
          level: 14,
          name: "Colmado de Luz Estelar",
          description: "Resistencia a daño físico en forma estelar.",
        },
      ],
    },
    {
      name: "Círculo del Mar",
      description: "Druidas que canalizan las mareas y tormentas oceánicas.",
      features: [
        {
          level: 3,
          name: "Ira de los Mares",
          description:
            "Gasta Forma Salvaje para crear aura de espuma. Daña y empuja enemigos como acción adicional.",
        },
        {
          level: 6,
          name: "Afinidad Acuática",
          description: "Velocidad de nado. Aura aumenta a 3m.",
        },
        {
          level: 10,
          name: "Nacido de la Tempestad",
          description: "Resistencia a Frío, Rayo, Trueno. Velocidad de Vuelo.",
        },
        {
          level: 14,
          name: "Obsequio Oceánico",
          description:
            "Puedes compartir tu aura de Ira de los Mares con un aliado.",
        },
      ],
    },
  ],
};

const rangerData = {
  name: "Explorador",
  description:
    "Un luchador errante que combina la maestría marcial con la magia primigenia de la naturaleza para cazar monstruos y proteger las tierras salvajes.",
  hitDie: 10,
  primaryAbility: ["Destreza", "Sabiduría"],
  savingThrows: ["Fuerza", "Destreza"],
  proficiencies: {
    armor: ["Ligeras", "Medias", "Escudos"],
    weapons: ["Sencillas", "Marciales"],
    tools: [],
  },
  skillChoices: {
    count: 3,
    list: [
      "Atletismo",
      "Investigación",
      "Naturaleza",
      "Percepción",
      "Perspicacia",
      "Sigilo",
      "Supervivencia",
      "Trato con animales",
    ],
  },
  startingEquipment: [
    "Armadura de cuero tachonado",
    "Cimitarra y Espada corta",
    "Arco largo y 20 flechas",
    "Canalizador druídico (rama de muérdago)",
    "Paquete de explorador y 7 po",
  ],

  // Configuración de la tabla visual
  tableMetadata: {
    columns: [
      { label: "Enemigo Predilecto", dataKey: "favoredEnemy" },
      { label: "Preparados", dataKey: "prepared" },
      { label: "I", dataKey: "slots1" },
      { label: "II", dataKey: "slots2" },
      { label: "III", dataKey: "slots3" },
      { label: "IV", dataKey: "slots4" },
      { label: "V", dataKey: "slots5" },
    ],
  },

  progression: [
    {
      level: 1,
      proficiencyBonus: 2,
      features: [
        {
          name: "Lanzamiento de Conjuros",
          description:
            "Usas Sabiduría. Puedes cambiar conjuros preparados tras un descanso largo.",
        },
        {
          name: "Enemigo Predilecto",
          description:
            "Siempre tienes Marca del Cazador preparado. Puedes lanzarlo gratis (ver tabla).",
        },
        {
          name: "Maestría con Armas",
          description: "Elige 2 armas para usar sus propiedades de maestría.",
        },
      ],
      classSpecific: {
        favoredEnemy: "2",
        prepared: "2",
        slots1: "2",
        slots2: "-",
        slots3: "-",
        slots4: "-",
        slots5: "-",
      },
    },
    {
      level: 2,
      proficiencyBonus: 2,
      features: [
        {
          name: "Estilo de Combate",
          description:
            "Elige una Dote de Estilo de Combate o Guerrero Druídico (2 trucos).",
        },
        {
          name: "Explorador Hábil",
          description: "Obtienes 2 idiomas y Pericia en una habilidad.",
        },
      ],
      classSpecific: {
        favoredEnemy: "2",
        prepared: "3",
        slots1: "2",
        slots2: "-",
        slots3: "-",
        slots4: "-",
        slots5: "-",
      },
    },
    {
      level: 3,
      proficiencyBonus: 2,
      features: [
        {
          name: "Subclase de Explorador",
          description:
            "Elige: Acechador en la Penumbra, Cazador, Errante Feérico o Señor de las Bestias.",
        },
      ],
      classSpecific: {
        favoredEnemy: "2",
        prepared: "4",
        slots1: "3",
        slots2: "-",
        slots3: "-",
        slots4: "-",
        slots5: "-",
      },
    },
    {
      level: 4,
      proficiencyBonus: 2,
      features: [
        {
          name: "Mejora de Característica",
          description: "Aumenta una característica o elige una Dote.",
        },
      ],
      classSpecific: {
        favoredEnemy: "2",
        prepared: "5",
        slots1: "3",
        slots2: "-",
        slots3: "-",
        slots4: "-",
        slots5: "-",
      },
    },
    {
      level: 5,
      proficiencyBonus: 3,
      features: [
        {
          name: "Ataque Adicional",
          description:
            "Puedes atacar dos veces cuando realizas la acción de Atacar.",
        },
      ],
      classSpecific: {
        favoredEnemy: "3",
        prepared: "6",
        slots1: "4",
        slots2: "2",
        slots3: "-",
        slots4: "-",
        slots5: "-",
      },
    },
    {
      level: 6,
      proficiencyBonus: 3,
      features: [
        {
          name: "Errante",
          description:
            "+3m de velocidad. Ganas velocidad de nado y trepado igual a tu velocidad.",
        },
      ],
      classSpecific: {
        favoredEnemy: "3",
        prepared: "6",
        slots1: "4",
        slots2: "2",
        slots3: "-",
        slots4: "-",
        slots5: "-",
      },
    },
    {
      level: 7,
      proficiencyBonus: 3,
      features: [
        {
          name: "Rasgo de Subclase",
          description: "Obtienes un rasgo de tu subclase.",
        },
      ],
      classSpecific: {
        favoredEnemy: "3",
        prepared: "7",
        slots1: "4",
        slots2: "3",
        slots3: "-",
        slots4: "-",
        slots5: "-",
      },
    },
    {
      level: 8,
      proficiencyBonus: 3,
      features: [
        {
          name: "Mejora de Característica",
          description: "Aumenta una característica o elige una Dote.",
        },
      ],
      classSpecific: {
        favoredEnemy: "3",
        prepared: "7",
        slots1: "4",
        slots2: "3",
        slots3: "-",
        slots4: "-",
        slots5: "-",
      },
    },
    {
      level: 9,
      proficiencyBonus: 4,
      features: [
        {
          name: "Pericia (x2)",
          description:
            "Elige 2 habilidades más para duplicar tu bono de competencia.",
        },
      ],
      classSpecific: {
        favoredEnemy: "4",
        prepared: "9",
        slots1: "4",
        slots2: "3",
        slots3: "2",
        slots4: "-",
        slots5: "-",
      },
    },
    {
      level: 10,
      proficiencyBonus: 4,
      features: [
        {
          name: "Infatigable",
          description:
            "Acción para ganar PG temporales (1d8+SAB). Reduce cansancio en descanso corto.",
        },
      ],
      classSpecific: {
        favoredEnemy: "4",
        prepared: "9",
        slots1: "4",
        slots2: "3",
        slots3: "2",
        slots4: "-",
        slots5: "-",
      },
    },
    {
      level: 11,
      proficiencyBonus: 4,
      features: [
        {
          name: "Rasgo de Subclase",
          description: "Obtienes un rasgo de tu subclase.",
        },
      ],
      classSpecific: {
        favoredEnemy: "4",
        prepared: "10",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "-",
        slots5: "-",
      },
    },
    {
      level: 12,
      proficiencyBonus: 4,
      features: [
        {
          name: "Mejora de Característica",
          description: "Aumenta una característica o elige una Dote.",
        },
      ],
      classSpecific: {
        favoredEnemy: "4",
        prepared: "10",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "-",
        slots5: "-",
      },
    },
    {
      level: 13,
      proficiencyBonus: 5,
      features: [
        {
          name: "Cazador Persistente",
          description:
            "El daño no rompe tu concentración en Marca del Cazador.",
        },
      ],
      classSpecific: {
        favoredEnemy: "5",
        prepared: "11",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "1",
        slots5: "-",
      },
    },
    {
      level: 14,
      proficiencyBonus: 5,
      features: [
        {
          name: "Velo de la Naturaleza",
          description:
            "Acción adicional para volverte invisible hasta el final de tu siguiente turno (Usos = SAB).",
        },
      ],
      classSpecific: {
        favoredEnemy: "5",
        prepared: "11",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "1",
        slots5: "-",
      },
    },
    {
      level: 15,
      proficiencyBonus: 5,
      features: [
        {
          name: "Rasgo de Subclase",
          description: "Obtienes un rasgo de tu subclase.",
        },
      ],
      classSpecific: {
        favoredEnemy: "5",
        prepared: "12",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "2",
        slots5: "-",
      },
    },
    {
      level: 16,
      proficiencyBonus: 5,
      features: [
        {
          name: "Mejora de Característica",
          description: "Aumenta una característica o elige una Dote.",
        },
      ],
      classSpecific: {
        favoredEnemy: "5",
        prepared: "12",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "2",
        slots5: "-",
      },
    },
    {
      level: 17,
      proficiencyBonus: 6,
      features: [
        {
          name: "Cazador Preciso",
          description:
            "Ventaja en ataques contra objetivos de tu Marca del Cazador.",
        },
      ],
      classSpecific: {
        favoredEnemy: "6",
        prepared: "14",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "1",
      },
    },
    {
      level: 18,
      proficiencyBonus: 6,
      features: [
        {
          name: "Sentidos Salvajes",
          description: "Obtienes Visión Ciega hasta 9m.",
        },
      ],
      classSpecific: {
        favoredEnemy: "6",
        prepared: "14",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "1",
      },
    },
    {
      level: 19,
      proficiencyBonus: 6,
      features: [{ name: "Don Épico", description: "Eliges una Dote Épica." }],
      classSpecific: {
        favoredEnemy: "6",
        prepared: "15",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
      },
    },
    {
      level: 20,
      proficiencyBonus: 6,
      features: [
        {
          name: "Azote de Enemigos",
          description: "El daño de tu Marca del Cazador aumenta a 1d10.",
        },
      ],
      classSpecific: {
        favoredEnemy: "6",
        prepared: "15",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
      },
    },
  ],
  subclasses: [
    {
      name: "Acechador en la Penumbra",
      description: "Maestros de las sombras que emboscan desde la oscuridad.",
      features: [
        {
          level: 3,
          name: "Conjuros de Acechador",
          description: "Disfrazarse, Truco de la Cuerda, Terror, etc.",
        },
        {
          level: 3,
          name: "Emboscador Pavoroso",
          description:
            "+SAB a Iniciativa. Daño extra (2d6 psíquico) en primer turno. +3m velocidad primer turno.",
        },
        {
          level: 3,
          name: "Visión en la Umbra",
          description:
            "Visión en oscuridad 18m. Invisible para visión oscura en tinieblas.",
        },
        {
          level: 7,
          name: "Mente de Hierro",
          description: "Competencia en salvaciones de Sabiduría (o INT/CAR).",
        },
        {
          level: 11,
          name: "Oleada del Acechador",
          description:
            "Daño extra sube a 2d8. Puedes hacer otro ataque o aterrorizar en área.",
        },
        {
          level: 15,
          name: "Esquiva de las Sombras",
          description:
            "Reacción para imponer desventaja a un ataque y teletransportarte.",
        },
      ],
    },
    {
      name: "Cazador",
      description:
        "Protectores de la naturaleza especializados en matar presas.",
      features: [
        {
          level: 3,
          name: "El Cazador y la Presa",
          description:
            "Elige: Azote de Colosos (daño extra a heridos) o Destructor de Hordas (ataque extra adyacente).",
        },
        {
          level: 3,
          name: "Sabiduría del Cazador",
          description: "Conoces inmunidades/resistencias de tu presa marcada.",
        },
        {
          level: 7,
          name: "Tácticas Defensivas",
          description:
            "Elige: Defensa vs Multiataque o Escapar de la Horda (desventaja op. attacks).",
        },
        {
          level: 11,
          name: "Cazador Experto",
          description:
            "El daño de Marca del Cazador se aplica también a otro enemigo cercano.",
        },
        {
          level: 15,
          name: "Defensa de Cazador Experto",
          description: "Reacción para ganar resistencia al daño recibido.",
        },
      ],
    },
    {
      name: "Errante Feérico",
      description: "Guerreros imbuidos con la magia y alegría de los feéricos.",
      features: [
        {
          level: 3,
          name: "Conjuros de Errante",
          description: "Hechizar Persona, Paso Brumoso, Invocar Feérico, etc.",
        },
        {
          level: 3,
          name: "Glamur Sobrenatural",
          description:
            "Suma SAB a pruebas de Carisma. Competencia social extra.",
        },
        {
          level: 3,
          name: "Golpes Pavorosos",
          description: "1d4 daño psíquico extra por turno (sube a 1d6 al 11).",
        },
        {
          level: 7,
          name: "Giro Seductor",
          description:
            "Ventaja vs hechizado/asustado. Reacción para encantar/asustar enemigos.",
        },
        {
          level: 11,
          name: "Refuerzos Feéricos",
          description:
            "Lanzas Invocar Feérico gratis y sin concentración (1 min).",
        },
        {
          level: 15,
          name: "Errante Brumoso",
          description:
            "Paso Brumoso gratis (usos = SAB). Puedes llevar a un aliado.",
        },
      ],
    },
    {
      name: "Señor de las Bestias",
      description: "Un ranger unido místicamente a una bestia primigenia.",
      features: [
        {
          level: 3,
          name: "Compañero Primigenio",
          description:
            "Invoca bestia (Tierra, Mar o Cielo). Actúa en tu turno (Esquivar o mandada con acción bonus). Puedes sacrificar ataque.",
        },
        {
          level: 7,
          name: "Entrenamiento Excepcional",
          description:
            "Acción bonus para que bestia ayude/corra/destrabe. Sus ataques son mágicos.",
        },
        {
          level: 11,
          name: "Furia Bestial",
          description:
            "Bestia ataca 2 veces. Daño extra si objetivo tiene Marca del Cazador.",
        },
        {
          level: 15,
          name: "Compartir Conjuros",
          description:
            "Tus conjuros personales afectan también a tu bestia cercana.",
        },
      ],
    },
  ],
};

const fighterData = {
  name: "Guerrero",
  description:
    "Un maestro del combate marcial, experto en el uso de todas las armas y armaduras.",
  hitDie: 10,
  primaryAbility: ["Fuerza", "Destreza"],
  savingThrows: ["Fuerza", "Constitución"],
  proficiencies: {
    armor: ["Ligeras", "Medias", "Pesadas", "Escudos"],
    weapons: ["Sencillas", "Marciales"],
    tools: [],
  },
  skillChoices: {
    count: 2,
    list: [
      "Acrobacias",
      "Atletismo",
      "Historia",
      "Intimidación",
      "Percepción",
      "Perspicacia",
      "Persuasión",
      "Supervivencia",
      "Trato con animales",
    ],
  },
  startingEquipment: [
    "Cota de malla (o Armadura de cuero + Arco largo)",
    "Espadón (o arma marcial + escudo)",
    "Ballesta ligera (o dos hachas de mano)",
    "Paquete de explorador de mazmorras",
  ],

  // Configuración de la tabla visual
  tableMetadata: {
    columns: [
      { label: "Tomar Aliento", dataKey: "secondWind" },
      { label: "Maestría Armas", dataKey: "weaponMastery" },
    ],
  },

  progression: [
    {
      level: 1,
      proficiencyBonus: 2,
      features: [
        {
          name: "Estilo de Combate",
          description:
            "Eliges una Dote de Estilo de Combate (ej. Defensa, Duelista, Tiro con Arco).",
        },
        {
          name: "Maestría con Armas",
          description:
            "Desbloqueas propiedades de maestría para 3 armas a elección.",
        },
        {
          name: "Tomar Aliento",
          description:
            "Acción adicional para recuperar 1d10 + Nivel PG. Usos recuperados en descanso corto.",
        },
      ],
      classSpecific: { secondWind: "2", weaponMastery: "3" },
    },
    {
      level: 2,
      proficiencyBonus: 2,
      features: [
        {
          name: "Acción Súbita",
          description:
            "Una vez por descanso corto/largo, puedes realizar una acción adicional en tu turno.",
        },
        {
          name: "Mente Táctica",
          description:
            "Si fallas una prueba de habilidad, puedes gastar un uso de Tomar Aliento para sumar 1d10 a la tirada.",
        },
      ],
      classSpecific: { secondWind: "2", weaponMastery: "3" },
    },
    {
      level: 3,
      proficiencyBonus: 2,
      features: [
        {
          name: "Arquetipo Marcial",
          description:
            "Elige tu Subclase (Caballero Arcano, Campeón, Guerrero Psiónico o Maestro del Combate).",
        },
      ],
      classSpecific: { secondWind: "2", weaponMastery: "3" },
    },
    {
      level: 4,
      proficiencyBonus: 2,
      features: [
        {
          name: "Mejora de Característica",
          description: "Aumenta una característica o elige una Dote.",
        },
      ],
      classSpecific: { secondWind: "3", weaponMastery: "4" },
    },
    {
      level: 5,
      proficiencyBonus: 3,
      features: [
        {
          name: "Ataque Adicional",
          description:
            "Puedes atacar dos veces cuando realizas la acción de Atacar.",
        },
        {
          name: "Desplazamiento Táctico",
          description:
            "Cuando usas Tomar Aliento, puedes moverte la mitad de tu velocidad sin provocar ataques de oportunidad.",
        },
      ],
      classSpecific: { secondWind: "3", weaponMastery: "4" },
    },
    {
      level: 6,
      proficiencyBonus: 3,
      features: [
        {
          name: "Mejora de Característica",
          description: "Aumenta una característica o elige una Dote.",
        },
      ],
      classSpecific: { secondWind: "3", weaponMastery: "4" },
    },
    {
      level: 7,
      proficiencyBonus: 3,
      features: [
        {
          name: "Rasgo de Arquetipo",
          description: "Obtienes un rasgo de tu subclase.",
        },
      ],
      classSpecific: { secondWind: "3", weaponMastery: "4" },
    },
    {
      level: 8,
      proficiencyBonus: 3,
      features: [
        {
          name: "Mejora de Característica",
          description: "Aumenta una característica o elige una Dote.",
        },
      ],
      classSpecific: { secondWind: "3", weaponMastery: "4" },
    },
    {
      level: 9,
      proficiencyBonus: 4,
      features: [
        {
          name: "Indómito",
          description:
            "Si fallas una salvación, puedes repetirla con un bono igual a tu nivel de Guerrero (1 uso).",
        },
        {
          name: "Maestro Táctico",
          description:
            "Puedes sustituir propiedades de maestría de tus armas por Debilitar, Empujar o Ralentizar.",
        },
      ],
      classSpecific: { secondWind: "3", weaponMastery: "4" },
    },
    {
      level: 10,
      proficiencyBonus: 4,
      features: [
        {
          name: "Rasgo de Arquetipo",
          description: "Obtienes un rasgo de tu subclase.",
        },
      ],
      classSpecific: { secondWind: "4", weaponMastery: "5" },
    },
    {
      level: 11,
      proficiencyBonus: 4,
      features: [
        {
          name: "Dos Ataques Adicionales",
          description:
            "Ahora atacas tres veces cuando realizas la acción de Atacar.",
        },
      ],
      classSpecific: { secondWind: "4", weaponMastery: "5" },
    },
    {
      level: 12,
      proficiencyBonus: 4,
      features: [
        {
          name: "Mejora de Característica",
          description: "Aumenta una característica o elige una Dote.",
        },
      ],
      classSpecific: { secondWind: "4", weaponMastery: "5" },
    },
    {
      level: 13,
      proficiencyBonus: 5,
      features: [
        {
          name: "Ataques Estudiados",
          description:
            "Si fallas un ataque contra una criatura, tienes ventaja en el siguiente ataque contra ella.",
        },
        {
          name: "Indómito (2 usos)",
          description: "Puedes usar Indómito dos veces entre descansos largos.",
        },
      ],
      classSpecific: { secondWind: "4", weaponMastery: "5" },
    },
    {
      level: 14,
      proficiencyBonus: 5,
      features: [
        {
          name: "Mejora de Característica",
          description: "Aumenta una característica o elige una Dote.",
        },
      ],
      classSpecific: { secondWind: "4", weaponMastery: "5" },
    },
    {
      level: 15,
      proficiencyBonus: 5,
      features: [
        {
          name: "Rasgo de Arquetipo",
          description: "Obtienes un rasgo de tu subclase.",
        },
      ],
      classSpecific: { secondWind: "4", weaponMastery: "5" },
    },
    {
      level: 16,
      proficiencyBonus: 5,
      features: [
        {
          name: "Mejora de Característica",
          description: "Aumenta una característica o elige una Dote.",
        },
      ],
      classSpecific: { secondWind: "4", weaponMastery: "6" },
    },
    {
      level: 17,
      proficiencyBonus: 6,
      features: [
        {
          name: "Acción Súbita (2 usos)",
          description:
            "Puedes usar Acción Súbita dos veces entre descansos (pero solo una por turno).",
        },
        {
          name: "Indómito (3 usos)",
          description:
            "Puedes usar Indómito tres veces entre descansos largos.",
        },
      ],
      classSpecific: { secondWind: "4", weaponMastery: "6" },
    },
    {
      level: 18,
      proficiencyBonus: 6,
      features: [
        {
          name: "Rasgo de Arquetipo",
          description: "Obtienes un rasgo de tu subclase.",
        },
      ],
      classSpecific: { secondWind: "4", weaponMastery: "6" },
    },
    {
      level: 19,
      proficiencyBonus: 6,
      features: [
        {
          name: "Don Épico",
          description:
            "Eliges una Dote Épica (Recomendado: Don de la Pericia en Combate).",
        },
      ],
      classSpecific: { secondWind: "4", weaponMastery: "6" },
    },
    {
      level: 20,
      proficiencyBonus: 6,
      features: [
        {
          name: "Tres Ataques Adicionales",
          description:
            "Ahora atacas cuatro veces cuando realizas la acción de Atacar.",
        },
      ],
      classSpecific: { secondWind: "4", weaponMastery: "6" },
    },
  ],

  subclasses: [
    {
      name: "Caballero Arcano",
      description:
        "Combina la maestría marcial con el estudio de la magia para lanzar conjuros de protección y ataque.",
      features: [
        {
          level: 3,
          name: "Lanzamiento de Conjuros",
          description:
            "Ganas espacios de conjuro y trucos de Mago (INT). Preparas conjuros.",
        },
        {
          level: 3,
          name: "Vínculo de Guerra",
          description:
            "Puedes invocar tu arma a tu mano como acción adicional y no te pueden desarmar.",
        },
        {
          level: 7,
          name: "Magia de Guerra",
          description: "Puedes sustituir uno de tus ataques por un Truco.",
        },
        {
          level: 10,
          name: "Golpe Sobrenatural",
          description:
            "Tus ataques con arma imponen desventaja en la siguiente salvación del objetivo contra tus conjuros.",
        },
        {
          level: 15,
          name: "Carga Arcana",
          description: "Puedes teletransportarte 9m al usar Acción Súbita.",
        },
        {
          level: 18,
          name: "Magia de Guerra Mejorada",
          description:
            "Puedes sustituir dos ataques por un conjuro de nivel 1 o 2.",
        },
      ],
    },
    {
      name: "Campeón",
      description:
        "Un guerrero que se centra en la excelencia física pura y el poder crítico.",
      features: [
        {
          level: 3,
          name: "Crítico Mejorado",
          description: "Tus ataques hacen crítico con 19 o 20.",
        },
        {
          level: 3,
          name: "Atleta Sobresaliente",
          description:
            "Ventaja en Iniciativa y Atletismo. Al hacer crítico, te mueves sin provocar ataques de oportunidad.",
        },
        {
          level: 7,
          name: "Estilo de Combate Adicional",
          description: "Ganas otra Dote de Estilo de Combate.",
        },
        {
          level: 10,
          name: "Guerrero Heroico",
          description:
            "Ganas Inspiración Heroica al inicio de tu turno si no tienes.",
        },
        {
          level: 15,
          name: "Crítico Superior",
          description: "Tus ataques hacen crítico con 18, 19 o 20.",
        },
        {
          level: 18,
          name: "Superviviente",
          description:
            "Ventaja en salvaciones de muerte. Si estás maltrecho, regeneras 5+CON PG por turno.",
        },
      ],
    },
    {
      name: "Guerrero Psiónico",
      description:
        "Despierta el poder de su mente para mejorar sus ataques y defensas.",
      features: [
        {
          level: 3,
          name: "Poder Psiónico",
          description:
            "Reserva de dados (d6 -> d12) para reducir daño, golpear más fuerte o mover objetos.",
        },
        {
          level: 7,
          name: "Adepto Telequinético",
          description: "Empuja enemigos con tus ataques o vuela temporalmente.",
        },
        {
          level: 10,
          name: "Mente Robusta",
          description:
            "Resistencia psíquica y puedes eliminar efectos de miedo/hechizo.",
        },
        {
          level: 15,
          name: "Bastión de Fuerza",
          description: "Das cobertura media a aliados cercanos.",
        },
        {
          level: 18,
          name: "Maestro Telequinético",
          description:
            "Lanzas Telequinesis sin componentes y puedes atacar mientras lo mantienes.",
        },
      ],
    },
    {
      name: "Maestro del Combate",
      description:
        "Un estratega que utiliza maniobras especiales para controlar el campo de batalla.",
      features: [
        {
          level: 3,
          name: "Supremacía en Combate",
          description: "Ganas 3 Maniobras y 4 dados de supremacía (d8 -> d12).",
        },
        {
          level: 3,
          name: "Estudioso de la Guerra",
          description:
            "Competencia en una herramienta de artesano y una habilidad.",
        },
        {
          level: 7,
          name: "Conoce a tu Enemigo",
          description:
            "Acción adicional para saber resistencias/vulnerabilidades de una criatura.",
        },
        {
          level: 10,
          name: "Supremacía Mejorada",
          description: "Tus dados de supremacía suben a d10.",
        },
        {
          level: 15,
          name: "Incansable",
          description:
            "Una vez por turno, puedes tirar 1d8 gratis en lugar de gastar un dado de supremacía.",
        },
        {
          level: 18,
          name: "Supremacía Definitiva",
          description: "Tus dados de supremacía suben a d12.",
        },
      ],
    },
  ],
};

const sorcererData = {
  name: "Hechicero",
  description:
    "Un lanzador de conjuros que emplea una magia innata derivada de un don o un linaje.",
  hitDie: 6,
  primaryAbility: ["Carisma"],
  savingThrows: ["Constitución", "Carisma"],
  proficiencies: {
    armor: [],
    weapons: ["Sencillas"],
    tools: [],
  },
  skillChoices: {
    count: 2,
    list: [
      "Conocimiento arcano",
      "Engaño",
      "Intimidación",
      "Perspicacia",
      "Persuasión",
      "Religión",
    ],
  },
  startingEquipment: [
    "Lanza",
    "Dos dagas",
    "Canalizador arcano (cristal)",
    "Paquete de explorador de mazmorras",
    "28 po",
  ],

  // Configuración visual de la tabla
  tableMetadata: {
    columns: [
      { label: "Puntos Hechicería", dataKey: "sorceryPoints" },
      { label: "Trucos", dataKey: "cantrips" },
      { label: "Preparados", dataKey: "prepared" },
      { label: "I", dataKey: "slots1" },
      { label: "II", dataKey: "slots2" },
      { label: "III", dataKey: "slots3" },
      { label: "IV", dataKey: "slots4" },
      { label: "V", dataKey: "slots5" },
      { label: "VI", dataKey: "slots6" },
      { label: "VII", dataKey: "slots7" },
      { label: "VIII", dataKey: "slots8" },
      { label: "IX", dataKey: "slots9" },
    ],
  },

  progression: [
    {
      level: 1,
      proficiencyBonus: 2,
      features: [
        {
          name: "Lanzamiento de Conjuros",
          description:
            "Usas Carisma. Preparas conjuros de la lista de Hechicero.",
        },
        {
          name: "Hechicería Innata",
          description:
            "Acción bonus (1 min): +1 a la CD de tus conjuros y Ventaja en tus ataques de conjuro.",
        },
      ],
      classSpecific: {
        sorceryPoints: "-",
        cantrips: "4",
        prepared: "2",
        slots1: "2",
        slots2: "-",
        slots3: "-",
        slots4: "-",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 2,
      proficiencyBonus: 2,
      features: [
        {
          name: "Fuente de Magia",
          description:
            "Obtienes Puntos de Hechicería para crear espacios de conjuro o viceversa.",
        },
        {
          name: "Metamagia",
          description:
            "Obtienes 2 opciones para alterar tus conjuros (ej. Sutil, Gemelo, Acelerado).",
        },
      ],
      classSpecific: {
        sorceryPoints: "2",
        cantrips: "4",
        prepared: "4",
        slots1: "3",
        slots2: "-",
        slots3: "-",
        slots4: "-",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 3,
      proficiencyBonus: 2,
      features: [
        {
          name: "Subclase de Hechicero",
          description: "Elige: Aberrante, Magia Salvaje, Dracónica o Mecánica.",
        },
      ],
      classSpecific: {
        sorceryPoints: "3",
        cantrips: "4",
        prepared: "6",
        slots1: "4",
        slots2: "2",
        slots3: "-",
        slots4: "-",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 4,
      proficiencyBonus: 2,
      features: [
        {
          name: "Mejora de Característica",
          description: "Aumenta una característica o elige una Dote.",
        },
      ],
      classSpecific: {
        sorceryPoints: "4",
        cantrips: "5",
        prepared: "7",
        slots1: "4",
        slots2: "3",
        slots3: "-",
        slots4: "-",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 5,
      proficiencyBonus: 3,
      features: [
        {
          name: "Recuperación Mágica",
          description:
            "Recuperas puntos de hechicería (mitad de tu nivel) en un descanso corto.",
        },
      ],
      classSpecific: {
        sorceryPoints: "5",
        cantrips: "5",
        prepared: "9",
        slots1: "4",
        slots2: "3",
        slots3: "2",
        slots4: "-",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 6,
      proficiencyBonus: 3,
      features: [
        {
          name: "Rasgo de Subclase",
          description: "Obtienes un rasgo de tu subclase.",
        },
      ],
      classSpecific: {
        sorceryPoints: "6",
        cantrips: "5",
        prepared: "10",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "-",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 7,
      proficiencyBonus: 3,
      features: [
        {
          name: "Encarnación Mágica",
          description:
            "Puedes usar Hechicería Innata gastando 2 puntos. Mientras está activa, puedes usar 2 metamagias por conjuro.",
        },
      ],
      classSpecific: {
        sorceryPoints: "7",
        cantrips: "5",
        prepared: "11",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "1",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 8,
      proficiencyBonus: 3,
      features: [
        {
          name: "Mejora de Característica",
          description: "Aumenta una característica o elige una Dote.",
        },
      ],
      classSpecific: {
        sorceryPoints: "8",
        cantrips: "5",
        prepared: "12",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "2",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 9,
      proficiencyBonus: 4,
      features: [],
      classSpecific: {
        sorceryPoints: "9",
        cantrips: "5",
        prepared: "14",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "1",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 10,
      proficiencyBonus: 4,
      features: [
        {
          name: "Metamagia Adicional",
          description: "Ganas 2 nuevas opciones de metamagia.",
        },
      ],
      classSpecific: {
        sorceryPoints: "10",
        cantrips: "6",
        prepared: "15",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 11,
      proficiencyBonus: 4,
      features: [],
      classSpecific: {
        sorceryPoints: "11",
        cantrips: "6",
        prepared: "16",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "1",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 12,
      proficiencyBonus: 4,
      features: [
        {
          name: "Mejora de Característica",
          description: "Aumenta una característica o elige una Dote.",
        },
      ],
      classSpecific: {
        sorceryPoints: "12",
        cantrips: "6",
        prepared: "16",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "1",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 13,
      proficiencyBonus: 5,
      features: [],
      classSpecific: {
        sorceryPoints: "13",
        cantrips: "6",
        prepared: "17",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "1",
        slots7: "1",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 14,
      proficiencyBonus: 5,
      features: [
        {
          name: "Rasgo de Subclase",
          description: "Obtienes un rasgo de tu subclase.",
        },
      ],
      classSpecific: {
        sorceryPoints: "14",
        cantrips: "6",
        prepared: "17",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "1",
        slots7: "1",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 15,
      proficiencyBonus: 5,
      features: [],
      classSpecific: {
        sorceryPoints: "15",
        cantrips: "6",
        prepared: "18",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "1",
        slots7: "1",
        slots8: "1",
        slots9: "-",
      },
    },
    {
      level: 16,
      proficiencyBonus: 5,
      features: [
        {
          name: "Mejora de Característica",
          description: "Aumenta una característica o elige una Dote.",
        },
      ],
      classSpecific: {
        sorceryPoints: "16",
        cantrips: "6",
        prepared: "18",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "1",
        slots7: "1",
        slots8: "1",
        slots9: "-",
      },
    },
    {
      level: 17,
      proficiencyBonus: 6,
      features: [
        {
          name: "Metamagia Adicional",
          description: "Ganas 2 nuevas opciones de metamagia (6 en total).",
        },
      ],
      classSpecific: {
        sorceryPoints: "17",
        cantrips: "6",
        prepared: "19",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "1",
        slots7: "1",
        slots8: "1",
        slots9: "1",
      },
    },
    {
      level: 18,
      proficiencyBonus: 6,
      features: [
        {
          name: "Rasgo de Subclase",
          description: "Obtienes el rasgo final de tu subclase.",
        },
      ],
      classSpecific: {
        sorceryPoints: "18",
        cantrips: "6",
        prepared: "20",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "3",
        slots6: "1",
        slots7: "1",
        slots8: "1",
        slots9: "1",
      },
    },
    {
      level: 19,
      proficiencyBonus: 6,
      features: [
        {
          name: "Don Épico",
          description:
            "Eliges una Dote Épica (Recomendado: Don del Viaje Dimensional).",
        },
      ],
      classSpecific: {
        sorceryPoints: "19",
        cantrips: "6",
        prepared: "21",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "3",
        slots6: "2",
        slots7: "1",
        slots8: "1",
        slots9: "1",
      },
    },
    {
      level: 20,
      proficiencyBonus: 6,
      features: [
        {
          name: "Apoteosis Arcana",
          description:
            "Mientras usas Hechicería Innata, puedes usar una metamagia por turno sin gastar puntos.",
        },
      ],
      classSpecific: {
        sorceryPoints: "20",
        cantrips: "6",
        prepared: "22",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "3",
        slots6: "2",
        slots7: "2",
        slots8: "1",
        slots9: "1",
      },
    },
  ],
  subclasses: [
    {
      name: "Hechicería Aberrante",
      description:
        "Poder psiónico proveniente de una influencia alienígena o del Reino Lejano.",
      features: [
        {
          level: 3,
          name: "Habla Telepática",
          description: "Conexión mental con criaturas a 1.5 km.",
        },
        {
          level: 6,
          name: "Hechicería Psiónica",
          description:
            "Lanza conjuros psiónicos con puntos de hechicería sin componentes (sutiles).",
        },
        {
          level: 14,
          name: "Revelación en Carne",
          description:
            "Gasta puntos para volar, ver invisible, respirar agua o colarte por grietas.",
        },
        {
          level: 18,
          name: "Implosión Deformadora",
          description:
            "Te teletransportas y dañas/arrastras enemigos en tu origen.",
        },
      ],
    },
    {
      name: "Hechicería de Magia Salvaje",
      description: "Magia del caos que provoca efectos impredecibles.",
      features: [
        {
          level: 3,
          name: "Mareas del Caos",
          description:
            "Gana ventaja en una tirada. Se recarga al causar una Sobrecarga.",
        },
        {
          level: 3,
          name: "Sobrecarga de Magia Salvaje",
          description:
            "Posibilidad de efecto aleatorio al lanzar conjuros (o forzado).",
        },
        {
          level: 6,
          name: "Doblegar la Suerte",
          description:
            "Gasta puntos para bonificar/penalizar d20 de otros con 1d4.",
        },
        {
          level: 18,
          name: "Sobrecarga Domada",
          description:
            "Elige el efecto de la tabla de magia salvaje en lugar de tirar.",
        },
      ],
    },
    {
      name: "Hechicería Dracónica",
      description: "Magia en la sangre derivada de un ancestro dragón.",
      features: [
        {
          level: 3,
          name: "Resistencia Dracónica",
          description: "CA 10+DES+CAR sin armadura. +1 PG por nivel.",
        },
        {
          level: 6,
          name: "Afinidad Elemental",
          description:
            "Resistencia a tu elemento y sumas CAR al daño de ese tipo.",
        },
        {
          level: 14,
          name: "Alas de Dragón",
          description: "Te crecen alas (vel 18m) como acción adicional.",
        },
        {
          level: 18,
          name: "Compañero Dragón",
          description:
            "Invocas un dragón (sin concentración) gastando 5 puntos.",
        },
      ],
    },
    {
      name: "Hechicería Mecánica",
      description: "Poder del orden absoluto proveniente de Mechanus.",
      features: [
        {
          level: 3,
          name: "Restablecer Equilibrio",
          description:
            "Reacción para anular ventaja/desventaja de una criatura.",
        },
        {
          level: 6,
          name: "Bastión de la Ley",
          description:
            "Gasta puntos para crear un escudo de d8s que reduce daño.",
        },
        {
          level: 14,
          name: "Trance de Orden",
          description:
            "Tus tiradas de 9 o menos se tratan como 10. Enemigos no tienen ventaja contra ti.",
        },
        {
          level: 18,
          name: "Cabalgata Mecánica",
          description:
            "Cura, repara objetos y disipa conjuros en un cubo de 9m.",
        },
      ],
    },
  ],
};

const wizardData = {
  name: "Mago",
  description:
    "Un estudioso usuario de magia capaz de manipular la estructura de la realidad.",
  hitDie: 6,
  primaryAbility: ["Inteligencia"],
  savingThrows: ["Inteligencia", "Sabiduría"],
  proficiencies: {
    armor: [],
    weapons: ["Sencillas"],
    tools: [],
  },
  skillChoices: {
    count: 2,
    list: [
      "Conocimiento arcano",
      "Historia",
      "Investigación",
      "Medicina",
      "Naturaleza",
      "Perspicacia",
      "Religión",
    ],
  },
  startingEquipment: [
    "Dos dagas",
    "Canalizador arcano (bastón)",
    "Libro de conjuros",
    "Paquete de erudito",
    "Túnica y 5 po",
  ],

  // Configuración visual de la tabla
  tableMetadata: {
    columns: [
      { label: "Trucos", dataKey: "cantrips" },
      { label: "Preparados", dataKey: "prepared" },
      { label: "I", dataKey: "slots1" },
      { label: "II", dataKey: "slots2" },
      { label: "III", dataKey: "slots3" },
      { label: "IV", dataKey: "slots4" },
      { label: "V", dataKey: "slots5" },
      { label: "VI", dataKey: "slots6" },
      { label: "VII", dataKey: "slots7" },
      { label: "VIII", dataKey: "slots8" },
      { label: "IX", dataKey: "slots9" },
    ],
  },

  progression: [
    {
      level: 1,
      proficiencyBonus: 2,
      features: [
        {
          name: "Lanzamiento de Conjuros",
          description:
            "Usas un Libro de Conjuros. Preparas conjuros (INT + Nivel)[cite: 1344].",
        },
        {
          name: "Adepto en Rituales",
          description:
            "Puedes lanzar rituales desde tu libro sin prepararlos[cite: 1345].",
        },
        {
          name: "Recuperación Arcana",
          description:
            "Recuperas espacios de conjuro (Nivel/2) en un descanso corto[cite: 1345].",
        },
      ],
      classSpecific: {
        cantrips: "3",
        prepared: "4",
        slots1: "2",
        slots2: "-",
        slots3: "-",
        slots4: "-",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 2,
      proficiencyBonus: 2,
      features: [
        {
          name: "Académico",
          description:
            "Ganas Pericia en una habilidad académica (Arcana, Historia, Naturaleza o Religión)[cite: 1345].",
        },
      ],
      classSpecific: {
        cantrips: "3",
        prepared: "5",
        slots1: "3",
        slots2: "-",
        slots3: "-",
        slots4: "-",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 3,
      proficiencyBonus: 2,
      features: [
        {
          name: "Subclase de Mago",
          description:
            "Elige tu Escuela Arcana (Abjurador, Adivino, Evocador o Ilusionista)[cite: 1345].",
        },
      ],
      classSpecific: {
        cantrips: "3",
        prepared: "6",
        slots1: "4",
        slots2: "2",
        slots3: "-",
        slots4: "-",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 4,
      proficiencyBonus: 2,
      features: [
        {
          name: "Mejora de Característica",
          description:
            "Aumenta una característica o elige una Dote[cite: 1345].",
        },
      ],
      classSpecific: {
        cantrips: "4",
        prepared: "7",
        slots1: "4",
        slots2: "3",
        slots3: "-",
        slots4: "-",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 5,
      proficiencyBonus: 3,
      features: [
        {
          name: "Memorizar Conjuro",
          description:
            "En un descanso corto, puedes cambiar un conjuro preparado por otro de tu libro[cite: 1346].",
        },
      ],
      classSpecific: {
        cantrips: "4",
        prepared: "9",
        slots1: "4",
        slots2: "3",
        slots3: "2",
        slots4: "-",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 6,
      proficiencyBonus: 3,
      features: [
        {
          name: "Rasgo de Escuela",
          description: "Obtienes un rasgo de tu subclase[cite: 1345].",
        },
      ],
      classSpecific: {
        cantrips: "4",
        prepared: "10",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "-",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 7,
      proficiencyBonus: 3,
      features: [],
      classSpecific: {
        cantrips: "4",
        prepared: "11",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "1",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 8,
      proficiencyBonus: 3,
      features: [
        {
          name: "Mejora de Característica",
          description:
            "Aumenta una característica o elige una Dote[cite: 1345].",
        },
      ],
      classSpecific: {
        cantrips: "4",
        prepared: "12",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "2",
        slots5: "-",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 9,
      proficiencyBonus: 4,
      features: [],
      classSpecific: {
        cantrips: "4",
        prepared: "14",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "1",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 10,
      proficiencyBonus: 4,
      features: [
        {
          name: "Rasgo de Escuela",
          description: "Obtienes un rasgo de tu subclase[cite: 1345].",
        },
      ],
      classSpecific: {
        cantrips: "5",
        prepared: "15",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "-",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 11,
      proficiencyBonus: 4,
      features: [],
      classSpecific: {
        cantrips: "5",
        prepared: "16",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "1",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 12,
      proficiencyBonus: 4,
      features: [
        {
          name: "Mejora de Característica",
          description:
            "Aumenta una característica o elige una Dote[cite: 1345].",
        },
      ],
      classSpecific: {
        cantrips: "5",
        prepared: "16",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "1",
        slots7: "-",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 13,
      proficiencyBonus: 5,
      features: [],
      classSpecific: {
        cantrips: "5",
        prepared: "17",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "1",
        slots7: "1",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 14,
      proficiencyBonus: 5,
      features: [
        {
          name: "Rasgo de Escuela",
          description: "Obtienes un rasgo de tu subclase[cite: 1345].",
        },
      ],
      classSpecific: {
        cantrips: "5",
        prepared: "18",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "1",
        slots7: "1",
        slots8: "-",
        slots9: "-",
      },
    },
    {
      level: 15,
      proficiencyBonus: 5,
      features: [],
      classSpecific: {
        cantrips: "5",
        prepared: "19",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "1",
        slots7: "1",
        slots8: "1",
        slots9: "-",
      },
    },
    {
      level: 16,
      proficiencyBonus: 5,
      features: [
        {
          name: "Mejora de Característica",
          description:
            "Aumenta una característica o elige una Dote[cite: 1345].",
        },
      ],
      classSpecific: {
        cantrips: "5",
        prepared: "21",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "1",
        slots7: "1",
        slots8: "1",
        slots9: "-",
      },
    },
    {
      level: 17,
      proficiencyBonus: 6,
      features: [],
      classSpecific: {
        cantrips: "5",
        prepared: "22",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
        slots6: "1",
        slots7: "1",
        slots8: "1",
        slots9: "1",
      },
    },
    {
      level: 18,
      proficiencyBonus: 6,
      features: [
        {
          name: "Maestría sobre Conjuros",
          description:
            "Elige un conjuro de nv1 y otro de nv2. Puedes lanzarlos a voluntad sin gastar espacio[cite: 1346].",
        },
      ],
      classSpecific: {
        cantrips: "5",
        prepared: "23",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "3",
        slots6: "1",
        slots7: "1",
        slots8: "1",
        slots9: "1",
      },
    },
    {
      level: 19,
      proficiencyBonus: 6,
      features: [
        {
          name: "Don Épico",
          description:
            "Eliges una Dote Épica (Recomendado: Don del Recuerdo de Conjuros)[cite: 1346].",
        },
      ],
      classSpecific: {
        cantrips: "5",
        prepared: "24",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "3",
        slots6: "2",
        slots7: "1",
        slots8: "1",
        slots9: "1",
      },
    },
    {
      level: 20,
      proficiencyBonus: 6,
      features: [
        {
          name: "Conjuros Característicos",
          description:
            "Elige dos conjuros de nv3. Siempre preparados y lanzas 1/descanso gratis[cite: 1346].",
        },
      ],
      classSpecific: {
        cantrips: "5",
        prepared: "25",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "3",
        slots6: "2",
        slots7: "2",
        slots8: "1",
        slots9: "1",
      },
    },
  ],

  subclasses: [
    {
      name: "Abjurador",
      description:
        "Especialista en protección, destierro y anulación de magia.",
      features: [
        {
          level: 3,
          name: "Experto en Abjuración",
          description:
            "Copias conjuros de Abjuración a mitad de precio y tiempo[cite: 1351].",
        },
        {
          level: 3,
          name: "Salvaguarda Arcana",
          description:
            "Creas un escudo mágico con PG al lanzar abjuración. Absorbe daño por ti[cite: 1351].",
        },
        {
          level: 6,
          name: "Salvaguarda Proyectada",
          description:
            "Puedes usar tu reacción para que tu Salvaguarda absorba daño de un aliado[cite: 1351].",
        },
        {
          level: 10,
          name: "Rompeconjuros",
          description:
            "Tienes Contrahechizo y Disipar Magia. Puedes disipar como acción bonus (con bono)[cite: 1352].",
        },
        {
          level: 14,
          name: "Resistencia a Conjuros",
          description:
            "Ventaja en salvaciones contra magia y resistencia al daño de conjuros[cite: 1352].",
        },
      ],
    },
    {
      name: "Adivino",
      description:
        "Maestro de la visión remota, la profecía y la manipulación del destino.",
      features: [
        {
          level: 3,
          name: "Experto en Adivinación",
          description:
            "Copias conjuros de Adivinación a mitad de precio y tiempo[cite: 1352].",
        },
        {
          level: 3,
          name: "Presagio",
          description:
            "Tiras 2d20 al amanecer. Puedes sustituir tiradas durante el día por esos valores[cite: 1352].",
        },
        {
          level: 6,
          name: "Adivino Avezado",
          description:
            "Recuperas un espacio de conjuro menor al lanzar adivinación (hasta nivel 5)[cite: 1352].",
        },
        {
          level: 10,
          name: "El Tercer Ojo",
          description:
            "Acción bonus para ganar Visión en la Oscuridad, Ver Invisibilidad o Leer Idiomas[cite: 1352].",
        },
        {
          level: 14,
          name: "Presagio Mayor",
          description:
            "Tiras 3d20 para tu rasgo de Presagio en lugar de dos[cite: 1352].",
        },
      ],
    },
    {
      name: "Evocador",
      description:
        "Experto en la magia destructiva elemental y el control de la energía.",
      features: [
        {
          level: 3,
          name: "Experto en Evocación",
          description:
            "Copias conjuros de Evocación a mitad de precio y tiempo[cite: 1353].",
        },
        {
          level: 3,
          name: "Truco Potente",
          description:
            "Tus trucos de daño hacen mitad de daño si fallan o el enemigo salva[cite: 1353].",
        },
        {
          level: 6,
          name: "Esculpir Conjuros",
          description:
            "Tus aliados no reciben daño de tus conjuros de área de Evocación[cite: 1353].",
        },
        {
          level: 10,
          name: "Evocación Potenciada",
          description:
            "Sumas tu modificador de INT al daño de tus conjuros de evocación[cite: 1353].",
        },
        {
          level: 14,
          name: "Sobrecanalizar",
          description:
            "Maximizas el daño de un conjuro (nv 1-5). Usarlo de nuevo causa daño necrótico[cite: 1353].",
        },
      ],
    },
    {
      name: "Ilusionista",
      description:
        "Manipulador de la realidad y los sentidos mediante engaños mágicos.",
      features: [
        {
          level: 3,
          name: "Experto en Ilusionismo",
          description:
            "Copias conjuros de Ilusión a mitad de precio y tiempo[cite: 1354].",
        },
        {
          level: 3,
          name: "Ilusiones Mejoradas",
          description:
            "Ilusión Menor es acción bonus. Puedes lanzar ilusiones sin componente verbal[cite: 1354].",
        },
        {
          level: 6,
          name: "Criaturas Fantasmales",
          description:
            "Puedes invocar bestias/feéricos ilusorios (con mitad de PG) gratis[cite: 1354].",
        },
        {
          level: 10,
          name: "Yo Ilusorio",
          description:
            "Reacción para anular un ataque; una ilusión recibe el golpe por ti[cite: 1354].",
        },
        {
          level: 14,
          name: "Realidad Ilusoria",
          description:
            "Haces real un objeto inanimado de tu ilusión por 1 minuto[cite: 1354].",
        },
      ],
    },
  ],
};

const monkData = {
  name: "Monje",
  description:
    "Un maestro de las artes marciales que utiliza el poder de su cuerpo y su mente para realizar hazañas físicas sobrenaturales.",
  hitDie: 8,
  primaryAbility: ["Destreza", "Sabiduría"],
  savingThrows: ["Fuerza", "Destreza"],
  proficiencies: {
    armor: [],
    weapons: ["Sencillas", "Armas Marciales con la propiedad Ligera"],
    tools: ["Un tipo de herramienta de artesano o instrumento musical"],
  },
  skillChoices: {
    count: 2,
    list: [
      "Acrobacias",
      "Atletismo",
      "Historia",
      "Perspicacia",
      "Religión",
      "Sigilo",
    ],
  },
  startingEquipment: [
    "Lanza",
    "5 Dagas",
    "Herramienta de artesano o instrumento musical",
    "Paquete de explorador y 9 po",
  ],

  // Configuración de la tabla visual
  tableMetadata: {
    columns: [
      { label: "Artes Marciales", dataKey: "martialArts" },
      { label: "Puntos Concentración", dataKey: "focusPoints" },
      { label: "Movimiento Extra", dataKey: "unarmoredMovement" },
    ],
  },

  progression: [
    {
      level: 1,
      proficiencyBonus: 2,
      features: [
        {
          name: "Artes Marciales",
          description:
            "Puedes usar DES en vez de FUE. Tu daño desarmado es 1d6. Puedes realizar un ataque desarmado como acción adicional.",
        },
        {
          name: "Defensa sin Armadura",
          description:
            "Tu CA es 10 + DES + SAB si no llevas armadura ni escudo.",
        },
      ],
      classSpecific: {
        martialArts: "1d6",
        focusPoints: "-",
        unarmoredMovement: "-",
      },
    },
    {
      level: 2,
      proficiencyBonus: 2,
      features: [
        {
          name: "Concentración del Monje",
          description:
            "Obtienes puntos para potenciar habilidades (Ráfaga de Golpes, Defensa Paciente, Paso del Viento).",
        },
        {
          name: "Movimiento sin Armadura",
          description: "Tu velocidad aumenta si no llevas armadura.",
        },
        {
          name: "Metabolismo Extraordinario",
          description:
            "Una vez al día, recuperas todos tus puntos de concentración y PG al tirar iniciativa.",
        },
      ],
      classSpecific: {
        martialArts: "1d6",
        focusPoints: "2",
        unarmoredMovement: "+3 m",
      },
    },
    {
      level: 3,
      proficiencyBonus: 2,
      features: [
        {
          name: "Subclase de Monje",
          description:
            "Elige: Guerrero de la Mano Abierta, de la Misericordia, de la Sombra o de los Elementos.",
        },
        {
          name: "Desviar Ataques",
          description:
            "Reacción para reducir el daño de ataques contundentes, cortantes o perforantes. Si reduces a 0, puedes devolver el golpe.",
        },
      ],
      classSpecific: {
        martialArts: "1d6",
        focusPoints: "3",
        unarmoredMovement: "+3 m",
      },
    },
    {
      level: 4,
      proficiencyBonus: 2,
      features: [
        {
          name: "Mejora de Característica",
          description: "Aumenta una característica o elige una Dote.",
        },
        {
          name: "Caída Lenta",
          description: "Reacción para reducir el daño de caída (Nivel x 5).",
        },
      ],
      classSpecific: {
        martialArts: "1d6",
        focusPoints: "4",
        unarmoredMovement: "+3 m",
      },
    },
    {
      level: 5,
      proficiencyBonus: 3,
      features: [
        {
          name: "Ataque Adicional",
          description: "Atacas dos veces por acción.",
        },
        {
          name: "Golpe Aturdidor",
          description:
            "Una vez por turno, puedes gastar un punto para intentar aturdir a un enemigo (Salvación CON).",
        },
      ],
      classSpecific: {
        martialArts: "1d8",
        focusPoints: "5",
        unarmoredMovement: "+3 m",
      },
    },
    {
      level: 6,
      proficiencyBonus: 3,
      features: [
        {
          name: "Rasgo de Guerrero",
          description: "Obtienes un rasgo de tu subclase.",
        },
        {
          name: "Golpes Potenciados",
          description:
            "Tus ataques desarmados cuentan como mágicos y puedes cambiar el daño a Fuerza.",
        },
      ],
      classSpecific: {
        martialArts: "1d8",
        focusPoints: "6",
        unarmoredMovement: "+4.5 m",
      },
    },
    {
      level: 7,
      proficiencyBonus: 3,
      features: [
        {
          name: "Evasión",
          description:
            "No recibes daño si superas una salvación de DES para medio daño, y solo la mitad si fallas.",
        },
      ],
      classSpecific: {
        martialArts: "1d8",
        focusPoints: "7",
        unarmoredMovement: "+4.5 m",
      },
    },
    {
      level: 8,
      proficiencyBonus: 3,
      features: [
        {
          name: "Mejora de Característica",
          description: "Aumenta una característica o elige una Dote.",
        },
      ],
      classSpecific: {
        martialArts: "1d8",
        focusPoints: "8",
        unarmoredMovement: "+4.5 m",
      },
    },
    {
      level: 9,
      proficiencyBonus: 4,
      features: [
        {
          name: "Movimiento Acrobático",
          description:
            "Puedes moverte por superficies verticales y sobre líquidos sin caer.",
        },
      ],
      classSpecific: {
        martialArts: "1d8",
        focusPoints: "9",
        unarmoredMovement: "+4.5 m",
      },
    },
    {
      level: 10,
      proficiencyBonus: 4,
      features: [
        {
          name: "Autorrestauración",
          description:
            "Puedes usar una acción adicional para eliminar los estados de hechizado, asustado o envenenado.",
        },
        {
          name: "Cuerpo Inmortal",
          description:
            "No sufres los efectos de la vejez (aunque mueres de viejo) y no necesitas comida ni agua.",
        },
      ],
      classSpecific: {
        martialArts: "1d10",
        focusPoints: "10",
        unarmoredMovement: "+6 m",
      },
    },
    {
      level: 11,
      proficiencyBonus: 4,
      features: [
        {
          name: "Rasgo de Guerrero",
          description: "Obtienes un rasgo de tu subclase.",
        },
      ],
      classSpecific: {
        martialArts: "1d10",
        focusPoints: "11",
        unarmoredMovement: "+6 m",
      },
    },
    {
      level: 12,
      proficiencyBonus: 4,
      features: [
        {
          name: "Mejora de Característica",
          description: "Aumenta una característica o elige una Dote.",
        },
      ],
      classSpecific: {
        martialArts: "1d10",
        focusPoints: "12",
        unarmoredMovement: "+6 m",
      },
    },
    {
      level: 13,
      proficiencyBonus: 5,
      features: [
        {
          name: "Desviar Energía",
          description:
            "Ahora puedes usar Desviar Ataques contra cualquier tipo de daño (Fuego, Rayo, etc.).",
        },
      ],
      classSpecific: {
        martialArts: "1d10",
        focusPoints: "13",
        unarmoredMovement: "+6 m",
      },
    },
    {
      level: 14,
      proficiencyBonus: 5,
      features: [
        {
          name: "Superviviente Disciplinado",
          description:
            "Obtienes competencia en todas las tiradas de salvación. Puedes gastar concentración para repetir una salvación fallida.",
        },
      ],
      classSpecific: {
        martialArts: "1d10",
        focusPoints: "14",
        unarmoredMovement: "+7.5 m",
      },
    },
    {
      level: 15,
      proficiencyBonus: 5,
      features: [
        {
          name: "Disciplina Perfecta",
          description:
            "Si al tirar iniciativa tienes menos de 4 puntos de concentración, recuperas hasta tener 4.",
        },
      ],
      classSpecific: {
        martialArts: "1d10",
        focusPoints: "15",
        unarmoredMovement: "+7.5 m",
      },
    },
    {
      level: 16,
      proficiencyBonus: 5,
      features: [
        {
          name: "Mejora de Característica",
          description: "Aumenta una característica o elige una Dote.",
        },
      ],
      classSpecific: {
        martialArts: "1d10",
        focusPoints: "16",
        unarmoredMovement: "+7.5 m",
      },
    },
    {
      level: 17,
      proficiencyBonus: 6,
      features: [
        {
          name: "Rasgo de Guerrero",
          description: "Obtienes el rasgo final de tu subclase.",
        },
      ],
      classSpecific: {
        martialArts: "1d12",
        focusPoints: "17",
        unarmoredMovement: "+9 m",
      },
    },
    {
      level: 18,
      proficiencyBonus: 6,
      features: [
        {
          name: "Defensa Superior",
          description:
            "Acción adicional para ganar resistencia a todo el daño (menos Fuerza) durante 1 minuto.",
        },
      ],
      classSpecific: {
        martialArts: "1d12",
        focusPoints: "18",
        unarmoredMovement: "+9 m",
      },
    },
    {
      level: 19,
      proficiencyBonus: 6,
      features: [{ name: "Don Épico", description: "Eliges una Dote Épica." }],
      classSpecific: {
        martialArts: "1d12",
        focusPoints: "19",
        unarmoredMovement: "+9 m",
      },
    },
    {
      level: 20,
      proficiencyBonus: 6,
      features: [
        {
          name: "Cuerpo y Mente",
          description:
            "Tu Destreza y Sabiduría aumentan en 4. El máximo para estas características es 26.",
        },
      ],
      classSpecific: {
        martialArts: "1d12",
        focusPoints: "20",
        unarmoredMovement: "+9 m",
      },
    },
  ],
  subclasses: [
    {
      name: "Guerrero de la Mano Abierta",
      description:
        "Maestros del combate desarmado que manipulan el flujo de energía de sus enemigos.",
      features: [
        {
          level: 3,
          name: "Técnica de la Mano Abierta",
          description:
            "Al usar Ráfaga de Golpes, aplicas efectos extra: Derribar, Empujar (4.5m) o impedir Reacciones.",
        },
        {
          level: 6,
          name: "Integridad Corporal",
          description:
            "Acción adicional para curarte (dado Artes Marciales + SAB). Usos por descanso largo.",
        },
        {
          level: 11,
          name: "Paso de Flota",
          description:
            "Puedes usar Paso del Viento como parte de una acción adicional para moverte con otro rasgo.",
        },
        {
          level: 17,
          name: "Palma Trémula",
          description:
            "Golpe letal. Gasta 4 puntos. El objetivo salva CON o recibe 10d12 de daño (o la mitad si supera).",
        },
      ],
    },
    {
      name: "Guerrero de la Sombra",
      description:
        "Espías y asesinos que manipulan la oscuridad para confundir a sus enemigos.",
      features: [
        {
          level: 3,
          name: "Artes de la Sombra",
          description:
            "Ganas visión en oscuridad (18m). Puedes lanzar Oscuridad gastando puntos y ves dentro de ella.",
        },
        {
          level: 6,
          name: "Paso de las Sombras",
          description:
            "Teletransporte 18m de una sombra a otra como acción adicional. Ganas ventaja en el siguiente ataque.",
        },
        {
          level: 11,
          name: "Golpe de Sombra",
          description:
            "Puedes teletransportarte al atacar a un enemigo para golpearlo desde las sombras.",
        },
        {
          level: 17,
          name: "Capa de Sombras",
          description:
            "Si estás en luz tenue u oscuridad, puedes volverte invisible y parcialmente incorpóreo.",
        },
      ],
    },
    {
      name: "Guerrero de los Elementos",
      description:
        "Canalizan el poder elemental en sus golpes, extendiendo su alcance con ráfagas de fuego, frío, rayo o ácido.",
      features: [
        {
          level: 3,
          name: "Sintonía Elemental",
          description:
            "Tus ataques desarmados tienen alcance 4.5m y hacen daño elemental a elección. Empujas enemigos.",
        },
        {
          level: 6,
          name: "Estallido Ambiental",
          description:
            "Causas daño elemental en área (esfera 6m) gastando 2 puntos de concentración.",
        },
        {
          level: 11,
          name: "Zancada Elemental",
          description: "Ganas velocidad de vuelo y nado igual a tu velocidad.",
        },
        {
          level: 17,
          name: "Epítome Elemental",
          description:
            "Ganas resistencia al tipo de daño elegido y aumentas el daño de tus golpes y estallidos.",
        },
      ],
    },
    {
      name: "Guerrero de la Misericordia",
      description:
        "Manipuladores de la fuerza vital que pueden sanar a los aliados o dañar a los enemigos con un toque.",
      features: [
        {
          level: 3,
          name: "Manos Curativas",
          description:
            "Gasta 1 punto para curar a un aliado con tus golpes (Dado AM + SAB).",
        },
        {
          level: 3,
          name: "Manos Dañinas",
          description:
            "Gasta 1 punto para infligir daño necrótico extra con tus golpes.",
        },
        {
          level: 6,
          name: "Toque del Médico",
          description:
            "Curas estados (cegado, ensordecido, etc) y puedes envenenar enemigos sin gastar puntos extra.",
        },
        {
          level: 11,
          name: "Ráfaga de Curación y Daño",
          description:
            "Puedes usar Manos Curativas/Dañinas sin gastar puntos al usar Ráfaga de Golpes.",
        },
        {
          level: 17,
          name: "Mano de la Resurrección",
          description:
            "Puedes revivir a los muertos gastando 5 puntos de concentración.",
        },
      ],
    },
  ],
};
const paladinData = {
  name: "Paladín",
  description:
    "Un guerrero sagrado unido a un juramento solemne que le otorga poder divino para proteger a los débiles y castigar a los malvados.",
  hitDie: 10,
  primaryAbility: ["Fuerza", "Carisma"],
  savingThrows: ["Sabiduría", "Carisma"],
  proficiencies: {
    armor: ["Ligeras", "Medias", "Pesadas", "Escudos"],
    weapons: ["Sencillas", "Marciales"],
    tools: [],
  },
  skillChoices: {
    count: 2,
    list: [
      "Atletismo",
      "Intimidación",
      "Medicina",
      "Perspicacia",
      "Persuasión",
      "Religión",
    ],
  },
  startingEquipment: [
    "Cota de malla y Escudo",
    "Espada larga (o arma marcial)",
    "6 Jabalinas",
    "Símbolo sagrado",
    "Paquete de sacerdote y 10 po",
  ],

  // Configuración visual de la tabla
  tableMetadata: {
    columns: [
      { label: "Imposición Manos", dataKey: "layOnHands" },
      { label: "Canalizar Divinidad", dataKey: "channelDivinity" },
      { label: "Preparados", dataKey: "prepared" },
      { label: "I", dataKey: "slots1" },
      { label: "II", dataKey: "slots2" },
      { label: "III", dataKey: "slots3" },
      { label: "IV", dataKey: "slots4" },
      { label: "V", dataKey: "slots5" },
    ],
  },

  progression: [
    {
      level: 1,
      proficiencyBonus: 2,
      features: [
        {
          name: "Imposición de Manos",
          description:
            "Reserva de curación (5 x Nivel). Puedes curar o gastar 5 puntos para curar veneno.",
        },
        {
          name: "Lanzamiento de Conjuros",
          description:
            "Usas Carisma. Preparas conjuros tras un descanso largo.",
        },
        {
          name: "Maestría con Armas",
          description: "Elige 2 armas para usar sus propiedades de maestría.",
        },
      ],
      classSpecific: {
        layOnHands: "5",
        channelDivinity: "-",
        prepared: "2",
        slots1: "2",
        slots2: "-",
        slots3: "-",
        slots4: "-",
        slots5: "-",
      },
    },
    {
      level: 2,
      proficiencyBonus: 2,
      features: [
        {
          name: "Estilo de Combate",
          description:
            "Elige una Dote de Estilo de Combate (ej. Defensa, Protección, Duelo).",
        },
        {
          name: "Castigo del Paladín",
          description:
            "Siempre tienes preparado Castigo Divino. Puedes lanzarlo una vez gratis por descanso largo.",
        },
      ],
      classSpecific: {
        layOnHands: "10",
        channelDivinity: "-",
        prepared: "3",
        slots1: "2",
        slots2: "-",
        slots3: "-",
        slots4: "-",
        slots5: "-",
      },
    },
    {
      level: 3,
      proficiencyBonus: 2,
      features: [
        {
          name: "Juramento Sagrado",
          description:
            "Elige tu Subclase (Antiguos, Devoción, Gloria o Venganza).",
        },
        {
          name: "Canalizar Divinidad",
          description:
            "Ganas usos para activar efectos divinos o de tu juramento.",
        },
      ],
      classSpecific: {
        layOnHands: "15",
        channelDivinity: "2",
        prepared: "4",
        slots1: "3",
        slots2: "-",
        slots3: "-",
        slots4: "-",
        slots5: "-",
      },
    },
    {
      level: 4,
      proficiencyBonus: 2,
      features: [
        {
          name: "Mejora de Característica",
          description: "Aumenta una característica o elige una Dote.",
        },
      ],
      classSpecific: {
        layOnHands: "20",
        channelDivinity: "2",
        prepared: "5",
        slots1: "3",
        slots2: "-",
        slots3: "-",
        slots4: "-",
        slots5: "-",
      },
    },
    {
      level: 5,
      proficiencyBonus: 3,
      features: [
        {
          name: "Ataque Adicional",
          description:
            "Puedes atacar dos veces cuando realizas la acción de Atacar.",
        },
        {
          name: "Montura Fiel",
          description:
            "Siempre tienes preparado Encontrar Montura y puedes lanzarlo una vez gratis por descanso largo.",
        },
      ],
      classSpecific: {
        layOnHands: "25",
        channelDivinity: "2",
        prepared: "6",
        slots1: "4",
        slots2: "2",
        slots3: "-",
        slots4: "-",
        slots5: "-",
      },
    },
    {
      level: 6,
      proficiencyBonus: 3,
      features: [
        {
          name: "Aura de Protección",
          description:
            "Tú y aliados a 3m ganan un bono a todas las salvaciones igual a tu modificador de CAR.",
        },
      ],
      classSpecific: {
        layOnHands: "30",
        channelDivinity: "2",
        prepared: "6",
        slots1: "4",
        slots2: "2",
        slots3: "-",
        slots4: "-",
        slots5: "-",
      },
    },
    {
      level: 7,
      proficiencyBonus: 3,
      features: [
        {
          name: "Rasgo de Juramento",
          description:
            "Obtienes un rasgo de tu subclase (generalmente un Aura).",
        },
      ],
      classSpecific: {
        layOnHands: "35",
        channelDivinity: "2",
        prepared: "7",
        slots1: "4",
        slots2: "3",
        slots3: "-",
        slots4: "-",
        slots5: "-",
      },
    },
    {
      level: 8,
      proficiencyBonus: 3,
      features: [
        {
          name: "Mejora de Característica",
          description: "Aumenta una característica o elige una Dote.",
        },
      ],
      classSpecific: {
        layOnHands: "40",
        channelDivinity: "2",
        prepared: "7",
        slots1: "4",
        slots2: "3",
        slots3: "-",
        slots4: "-",
        slots5: "-",
      },
    },
    {
      level: 9,
      proficiencyBonus: 4,
      features: [
        {
          name: "Abjurar Enemigos",
          description:
            "Usa Canalizar Divinidad para asustar e incapacitar enemigos (Fuerzas salvación de SAB).",
        },
      ],
      classSpecific: {
        layOnHands: "45",
        channelDivinity: "2",
        prepared: "9",
        slots1: "4",
        slots2: "3",
        slots3: "2",
        slots4: "-",
        slots5: "-",
      },
    },
    {
      level: 10,
      proficiencyBonus: 4,
      features: [
        {
          name: "Aura de Coraje",
          description: "Tú y aliados a 3m sois inmunes a ser asustados.",
        },
      ],
      classSpecific: {
        layOnHands: "50",
        channelDivinity: "2",
        prepared: "9",
        slots1: "4",
        slots2: "3",
        slots3: "2",
        slots4: "-",
        slots5: "-",
      },
    },
    {
      level: 11,
      proficiencyBonus: 4,
      features: [
        {
          name: "Golpes Radiantes",
          description:
            "Todos tus ataques con arma infligen 1d8 de daño radiante adicional.",
        },
      ],
      classSpecific: {
        layOnHands: "55",
        channelDivinity: "3",
        prepared: "10",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "-",
        slots5: "-",
      },
    },
    {
      level: 12,
      proficiencyBonus: 4,
      features: [
        {
          name: "Mejora de Característica",
          description: "Aumenta una característica o elige una Dote.",
        },
      ],
      classSpecific: {
        layOnHands: "60",
        channelDivinity: "3",
        prepared: "10",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "-",
        slots5: "-",
      },
    },
    {
      level: 13,
      proficiencyBonus: 5,
      features: [],
      classSpecific: {
        layOnHands: "65",
        channelDivinity: "3",
        prepared: "11",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "1",
        slots5: "-",
      },
    },
    {
      level: 14,
      proficiencyBonus: 5,
      features: [
        {
          name: "Toque Restaurador",
          description:
            "Acción para finalizar un efecto de conjuro en ti o en un aliado (elimina estados como Paralizado, etc).",
        },
      ],
      classSpecific: {
        layOnHands: "70",
        channelDivinity: "3",
        prepared: "11",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "1",
        slots5: "-",
      },
    },
    {
      level: 15,
      proficiencyBonus: 5,
      features: [
        {
          name: "Rasgo de Juramento",
          description: "Obtienes un rasgo de tu subclase.",
        },
      ],
      classSpecific: {
        layOnHands: "75",
        channelDivinity: "3",
        prepared: "12",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "2",
        slots5: "-",
      },
    },
    {
      level: 16,
      proficiencyBonus: 5,
      features: [
        {
          name: "Mejora de Característica",
          description: "Aumenta una característica o elige una Dote.",
        },
      ],
      classSpecific: {
        layOnHands: "80",
        channelDivinity: "3",
        prepared: "12",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "2",
        slots5: "-",
      },
    },
    {
      level: 17,
      proficiencyBonus: 6,
      features: [
        {
          name: "Expansión de Aura",
          description:
            "El alcance de tus Auras de Protección, Coraje y de Subclase aumenta a 9m.",
        },
      ],
      classSpecific: {
        layOnHands: "85",
        channelDivinity: "3",
        prepared: "14",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "1",
      },
    },
    {
      level: 18,
      proficiencyBonus: 6,
      features: [],
      classSpecific: {
        layOnHands: "90",
        channelDivinity: "3",
        prepared: "14",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "1",
      },
    },
    {
      level: 19,
      proficiencyBonus: 6,
      features: [{ name: "Don Épico", description: "Eliges una Dote Épica." }],
      classSpecific: {
        layOnHands: "95",
        channelDivinity: "3",
        prepared: "15",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
      },
    },
    {
      level: 20,
      proficiencyBonus: 6,
      features: [
        {
          name: "Rasgo de Juramento (Avatar)",
          description:
            "Te transformas en un avatar de tu juramento (Capstone). Recuperas uso de Canalizar Divinidad al tirar iniciativa.",
        },
      ],
      classSpecific: {
        layOnHands: "100",
        channelDivinity: "3",
        prepared: "15",
        slots1: "4",
        slots2: "3",
        slots3: "3",
        slots4: "3",
        slots5: "2",
      },
    },
  ],

  subclasses: [
    {
      name: "Juramento de los Antiguos",
      description:
        "Caballeros feéricos que protegen la luz y la vida natural contra la oscuridad.",
      features: [
        {
          level: 3,
          name: "Ira de la Naturaleza",
          description:
            "Canalizar Divinidad para apresar enemigos con enredaderas espectrales.",
        },
        {
          level: 7,
          name: "Aura de Protección contra Magia",
          description:
            "Resistencia al daño de conjuros para ti y aliados en el aura.",
        },
        {
          level: 15,
          name: "Centinela Inmortal",
          description:
            "Si caes a 0 PG, quedas a 1 PG (1/día). No envejeces mágicamente.",
        },
        {
          level: 20,
          name: "Campeón Antiguo",
          description:
            "Transformación en fuerza de la naturaleza: Regeneras 10 PG/turno, lanzas conjuros de paladín como acción bonus.",
        },
      ],
    },
    {
      name: "Juramento de Devoción",
      description:
        "El arquetipo del caballero de brillante armadura, dedicado al honor, la justicia y el bien.",
      features: [
        {
          level: 3,
          name: "Arma Sagrada",
          description:
            "Canalizar Divinidad para sumar CAR al ataque y convertir arma en mágica/luz.",
        },
        {
          level: 7,
          name: "Aura de Devoción",
          description: "Inmunidad a Hechizado para ti y aliados en el aura.",
        },
        {
          level: 15,
          name: "Castigo de Protección",
          description:
            "Cuando golpeas con Castigo Divino, das media cobertura a aliados cercanos.",
        },
        {
          level: 20,
          name: "Nimbo Sagrado",
          description:
            "Emanas luz solar. Daño radiante a enemigos. Ventaja en salvaciones contra conjuros de infernales/no muertos.",
        },
      ],
    },
    {
      name: "Juramento de Gloria",
      description:
        "Creen que el destino llama a la grandeza y a las hazañas heroicas.",
      features: [
        {
          level: 3,
          name: "Atleta Inigualable",
          description:
            "Canalizar Divinidad para tener ventaja en Atletismo/Acrobacias y saltar más.",
        },
        {
          level: 3,
          name: "Golpe Inspirador",
          description:
            "Tras usar Castigo Divino, otorgas PG temporales a aliados.",
        },
        {
          level: 7,
          name: "Aura de Celeridad",
          description: "Velocidad aumentada para ti y aliados en el aura.",
        },
        {
          level: 15,
          name: "Defensa Gloriosa",
          description:
            "Reacción para bonificar CA. Si el ataque falla, puedes contraatacar.",
        },
        {
          level: 20,
          name: "Leyenda Viviente",
          description:
            "Ventaja en pruebas de Carisma. Puedes convertir fallos en impactos.",
        },
      ],
    },
    {
      name: "Juramento de Venganza",
      description:
        "Castigadores implacables que sacrifican su propia pureza para destruir el mal.",
      features: [
        {
          level: 3,
          name: "Voto de Enemistad",
          description:
            "Canalizar Divinidad para ganar Ventaja en ataques contra una criatura (Acción Bonus).",
        },
        {
          level: 7,
          name: "Vengador Implacable",
          description:
            "Si golpeas con oportunidad, puedes moverte sin provocar ataques.",
        },
        {
          level: 15,
          name: "Alma de Venganza",
          description:
            "Si tu objetivo de Voto de Enemistad ataca, puedes usar reacción para atacarle.",
        },
        {
          level: 20,
          name: "Ángel Vengador",
          description: "Te crecen alas (Vuelo). Emites aura de miedo.",
        },
      ],
    },
  ],
};
const rogueData = {
  name: "Pícaro",
  description:
    "Un bribón que utiliza el sigilo, la astucia y la precisión para superar obstáculos y enemigos.",
  hitDie: 8,
  primaryAbility: ["Destreza"],
  savingThrows: ["Destreza", "Inteligencia"],
  proficiencies: {
    armor: ["Ligeras"],
    weapons: ["Sencillas", "Marciales con la propiedad Sutil o Ligera"],
    tools: ["Herramientas de ladrón"],
  },
  skillChoices: {
    count: 4,
    list: [
      "Acrobacias",
      "Atletismo",
      "Engaño",
      "Intimidación",
      "Investigación",
      "Juego de manos",
      "Percepción",
      "Perspicacia",
      "Persuasión",
      "Sigilo",
    ],
  },
  startingEquipment: [
    "Armadura de cuero",
    "Dos dagas",
    "Espada corta",
    "Arco corto y 20 flechas",
    "Herramientas de ladrón",
    "Paquete de ladrón y 8 po",
  ],

  // Configuración de la tabla visual
  tableMetadata: {
    columns: [{ label: "Ataque Furtivo", dataKey: "sneakAttack" }],
  },

  progression: [
    {
      level: 1,
      proficiencyBonus: 2,
      features: [
        {
          name: "Ataque Furtivo",
          description:
            "Infliges daño extra (ver tabla) una vez por turno si tienes ventaja o un aliado cerca del enemigo.",
        },
        {
          name: "Maestría con Armas",
          description: "Elige 2 armas para usar sus propiedades de maestría.",
        },
        {
          name: "Jerga de Ladrones",
          description:
            "Conoces el idioma secreto del hampa y obtienes un idioma adicional.",
        },
      ],
      classSpecific: { sneakAttack: "1d6" },
    },
    {
      level: 2,
      proficiencyBonus: 2,
      features: [
        {
          name: "Acción Astuta",
          description:
            "Acción adicional para Correr, Destrabarse o Esconderse.",
        },
      ],
      classSpecific: { sneakAttack: "1d6" },
    },
    {
      level: 3,
      proficiencyBonus: 2,
      features: [
        {
          name: "Arquetipo de Pícaro",
          description:
            "Elige tu Subclase (Asesino, Cuchillo del Alma, Embaucador Arcano o Ladrón).",
        },
        {
          name: "Puntería Estable",
          description:
            "Acción adicional para ganar ventaja en tu siguiente ataque (si no te mueves ese turno).",
        },
      ],
      classSpecific: { sneakAttack: "2d6" },
    },
    {
      level: 4,
      proficiencyBonus: 2,
      features: [
        {
          name: "Mejora de Característica",
          description: "Aumenta una característica o elige una Dote.",
        },
      ],
      classSpecific: { sneakAttack: "2d6" },
    },
    {
      level: 5,
      proficiencyBonus: 3,
      features: [
        {
          name: "Esquiva Asombrosa",
          description: "Reacción para reducir el daño de un ataque a la mitad.",
        },
        {
          name: "Golpe Astuto",
          description:
            "Puedes sacrificar d6s de Ataque Furtivo para añadir efectos: Desarmar (1d6), Envenenar (1d6), Retirarse (1d6) o Derribar (2d6).",
        },
      ],
      classSpecific: { sneakAttack: "3d6" },
    },
    {
      level: 6,
      proficiencyBonus: 3,
      features: [
        {
          name: "Pericia",
          description:
            "Elige 2 habilidades más (o herramientas de ladrón) para duplicar tu bono.",
        },
      ],
      classSpecific: { sneakAttack: "3d6" },
    },
    {
      level: 7,
      proficiencyBonus: 3,
      features: [
        {
          name: "Talento Fiable",
          description:
            "En pruebas de habilidad con las que seas competente, cualquier 9 o menos se trata como un 10.",
        },
      ],
      classSpecific: { sneakAttack: "4d6" },
    },
    {
      level: 8,
      proficiencyBonus: 3,
      features: [
        {
          name: "Mejora de Característica",
          description: "Aumenta una característica o elige una Dote.",
        },
      ],
      classSpecific: { sneakAttack: "4d6" },
    },
    {
      level: 9,
      proficiencyBonus: 4,
      features: [
        {
          name: "Rasgo de Arquetipo",
          description: "Obtienes un rasgo de tu subclase.",
        },
      ],
      classSpecific: { sneakAttack: "5d6" },
    },
    {
      level: 10,
      proficiencyBonus: 4,
      features: [
        {
          name: "Mejora de Característica",
          description: "Aumenta una característica o elige una Dote.",
        },
      ],
      classSpecific: { sneakAttack: "5d6" },
    },
    {
      level: 11,
      proficiencyBonus: 4,
      features: [
        {
          name: "Golpe Astuto Mejorado",
          description:
            "Puedes usar dos opciones de Golpe Astuto a la vez en un solo ataque.",
        },
      ],
      classSpecific: { sneakAttack: "6d6" },
    },
    {
      level: 12,
      proficiencyBonus: 4,
      features: [
        {
          name: "Mejora de Característica",
          description: "Aumenta una característica o elige una Dote.",
        },
      ],
      classSpecific: { sneakAttack: "6d6" },
    },
    {
      level: 13,
      proficiencyBonus: 5,
      features: [
        {
          name: "Rasgo de Arquetipo",
          description: "Obtienes un rasgo de tu subclase.",
        },
      ],
      classSpecific: { sneakAttack: "7d6" },
    },
    {
      level: 14,
      proficiencyBonus: 5,
      features: [
        {
          name: "Sentido Ciego",
          description:
            "Si puedes oír, eres consciente de la ubicación de cualquier criatura escondida o invisible a 3m.",
        },
        {
          name: "Golpes Astutos Ladinos",
          description:
            "Nuevas opciones para Golpe Astuto: Aturdir (6d6), Inconsciente (6d6) u Oscurecer (3d6).",
        },
      ],
      classSpecific: { sneakAttack: "7d6" },
    },
    {
      level: 15,
      proficiencyBonus: 5,
      features: [
        {
          name: "Mente Escurridiza",
          description:
            "Ganas competencia en las tiradas de salvación de Sabiduría y Carisma.",
        },
      ],
      classSpecific: { sneakAttack: "8d6" },
    },
    {
      level: 16,
      proficiencyBonus: 5,
      features: [
        {
          name: "Mejora de Característica",
          description: "Aumenta una característica o elige una Dote.",
        },
      ],
      classSpecific: { sneakAttack: "8d6" },
    },
    {
      level: 17,
      proficiencyBonus: 6,
      features: [
        {
          name: "Rasgo de Arquetipo",
          description: "Obtienes el rasgo final de tu subclase.",
        },
      ],
      classSpecific: { sneakAttack: "9d6" },
    },
    {
      level: 18,
      proficiencyBonus: 6,
      features: [
        {
          name: "Escurridizo",
          description:
            "Ninguna tirada de ataque tiene ventaja contra ti mientras no estés incapacitado.",
        },
      ],
      classSpecific: { sneakAttack: "9d6" },
    },
    {
      level: 19,
      proficiencyBonus: 6,
      features: [{ name: "Don Épico", description: "Eliges una Dote Épica." }],
      classSpecific: { sneakAttack: "10d6" },
    },
    {
      level: 20,
      proficiencyBonus: 6,
      features: [
        {
          name: "Golpe de Suerte",
          description:
            "Una vez por descanso corto, puedes convertir un fallo en un crítico (ataque) o un 20 automático (prueba).",
        },
      ],
      classSpecific: { sneakAttack: "10d6" },
    },
  ],

  subclasses: [
    {
      name: "Asesino",
      description:
        "Maestro en el arte de dar muerte de forma rápida y silenciosa.",
      features: [
        {
          level: 3,
          name: "Asesinar",
          description:
            "Ventaja en iniciativa. Ventaja en ataques contra enemigos que no han actuado. Daño extra igual a nivel de pícaro en el primer turno.",
        },
        {
          level: 3,
          name: "Kit de Infiltración",
          description:
            "Competencia con kit de disfraz y de envenenador. Creas identidades falsas.",
        },
        {
          level: 9,
          name: "Infiltración Experta",
          description: "Ventaja en Engaño para hacerte pasar por otro.",
        },
        {
          level: 13,
          name: "Impostor",
          description:
            "Puedes imitar el habla y escritura de otra persona perfectamente.",
        },
        {
          level: 17,
          name: "Golpe Mortal",
          description:
            "Si golpeas a un enemigo sorprendido, debe salvar CON o recibir el doble de daño.",
        },
      ],
    },
    {
      name: "Cuchillo del Alma",
      description: "Asesinos psiónicos que atacan con hojas de energía mental.",
      features: [
        {
          level: 3,
          name: "Hojas Psíquicas",
          description:
            "Creas dagas psíquicas (1d6/1d4). Daño psíquico, no dejan marcas. Se pueden lanzar.",
        },
        {
          level: 3,
          name: "Poder Psiónico",
          description:
            "Dados de energía psíquica para mejorar pruebas de habilidad o comunicarte telepáticamente.",
        },
        {
          level: 9,
          name: "Hojas del Alma",
          description:
            "Puedes teletransportarte lanzando tu hoja o sumar dados al ataque para no fallar.",
        },
        {
          level: 13,
          name: "Velo Psíquico",
          description:
            "Te vuelves invisible (1 hora). Recuperas el uso con dados psíquicos.",
        },
        {
          level: 17,
          name: "Desgarrar la Mente",
          description:
            "Golpe Astuto para aturdir (3d6 de costo). Si falla la salvación, aturdido 1 minuto.",
        },
      ],
    },
    {
      name: "Embaucador Arcano",
      description:
        "Combina la agilidad con la magia de ilusión y encantamiento.",
      features: [
        {
          level: 3,
          name: "Lanzamiento de Conjuros",
          description:
            "Ganas espacios de conjuro y trucos de Mago (INT). Especialidad en Ilusión/Encantamiento.",
        },
        {
          level: 3,
          name: "Mano de Mago Mejorada",
          description:
            "Tu mano es invisible, puede robar o poner objetos y la controlas con acción astuta.",
        },
        {
          level: 9,
          name: "Emboscada Mágica",
          description:
            "Si estás escondido, los enemigos tienen desventaja en salvaciones contra tus conjuros.",
        },
        {
          level: 13,
          name: "Embaucador Versátil",
          description:
            "Tu mano de mago puede distraer enemigos para darte ventaja (Ataque Furtivo).",
        },
        {
          level: 17,
          name: "Ladrón de Conjuros",
          description:
            "Reacción para negar un conjuro enemigo y poder lanzarlo tú después.",
        },
      ],
    },
    {
      name: "Ladrón",
      description:
        "El arquetipo clásico, experto en robar, trepar y usar objetos.",
      features: [
        {
          level: 3,
          name: "Manos Rápidas",
          description:
            "Acción astuta para hacer pruebas de Juego de Manos, usar herramientas de ladrón o usar un Objeto.",
        },
        {
          level: 3,
          name: "Trabajo en el Segundo Piso",
          description:
            "Ganas velocidad de trepado igual a tu velocidad. Saltas más lejos (DES).",
        },
        {
          level: 9,
          name: "Sigilo Supremo",
          description:
            "Tienes ventaja en pruebas de Sigilo si te mueves a la mitad de tu velocidad.",
        },
        {
          level: 13,
          name: "Usar Objeto Mágico",
          description:
            "Puedes ignorar requisitos de clase, raza y nivel para usar objetos mágicos.",
        },
        {
          level: 17,
          name: "Reflejos de Ladrón",
          description:
            "Puedes tener dos turnos en la primera ronda de combate.",
        },
      ],
    },
  ],
};

const seedClasses = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🔌 Conectado a MongoDB...");

    // Borramos clases previas para evitar duplicados o mezclas
    await Class.deleteMany();

    await Class.insertMany(barbarianData);
    await Class.insertMany(bardData);
    await Class.insertMany(warlockData);
    await Class.insertMany(clericData);
    await Class.insertMany(druidData);
    await Class.insertMany(rangerData);
    await Class.insertMany(fighterData);
    await Class.insertMany(sorcererData);
    await Class.insertMany(wizardData);
    await Class.insertMany(monkData);
    await Class.insertMany(paladinData);
    await Class.insertMany(rogueData);

    console.log("⚔️ Clases (2024) cargada.");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedClasses();
