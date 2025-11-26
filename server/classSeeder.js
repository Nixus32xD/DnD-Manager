import mongoose from "mongoose";
import dotenv from "dotenv";
import Class from "./models/Class.js";

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
    "Hacha a dos manos (o arma marcial)",
    "Dos hachas de mano",
    "Paquete de explorador",
    "4 Jabalinas",
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
            "Acción adicional. Resistencia a daño físico, ventaja en Fuerza y daño extra. Dura 1 min o hasta que te incapaciten/pongas armadura pesada.",
        },
        {
          name: "Defensa sin Armadura",
          description:
            "Tu CA es 10 + DES + CON si no llevas armadura (puedes usar escudo).",
        },
        {
          name: "Maestría con Armas",
          description:
            "Puedes usar las propiedades de maestría de 2 tipos de armas.",
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
            "Tienes ventaja en ataques de Fuerza, pero te atacan con ventaja hasta tu próximo turno.",
        },
        {
          name: "Sentir el Peligro",
          description:
            "Ventaja en salvaciones de Destreza contra efectos que puedas ver.",
        },
      ],
      classSpecific: { rages: "2", rageDmg: "+2", weaponMastery: "2" },
    },
    {
      level: 3,
      proficiencyBonus: 2,
      features: [
        {
          name: "Senda Primordial",
          description:
            "Eliges tu Subclase (Árbol del Mundo, Berserker, Corazón Salvaje o Fanático).",
        },
        {
          name: "Conocimiento Primigenio",
          description:
            "Ganas competencia en una habilidad extra. Puedes usar Fuerza para ciertas habilidades mientras estás en Furia.",
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
          description: "Aumenta una característica o elige una Dote.",
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
            "Puedes atacar dos veces cuando realizas la acción de Atacar.",
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
          name: "Rasgo de Senda",
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
          description: "Tienes ventaja en tiradas de Iniciativa.",
        },
        {
          name: "Salto Instintivo",
          description:
            "Como parte de la acción de entrar en Furia, puedes moverte la mitad de tu velocidad.",
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
          description: "Aumenta una característica o elige una Dote.",
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
            "Si atacas con Temerario, puedes sacrificar la ventaja para ganar 1d10 de daño extra y aplicar un efecto (Empujar o Ralentizar).",
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
            "Si caes a 0 PG en furia, puedes hacer una salvación de CON (CD 10) para volver con tantos PG como tu nivel de bárbaro x2.",
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
          description: "Aumenta una característica o elige una Dote.",
        },
      ],
      classSpecific: { rages: "5", rageDmg: "+3", weaponMastery: "4" },
    },
    {
      level: 13,
      proficiencyBonus: 5,
      features: [
        {
          name: "Golpe Brutal Mejorado",
          description:
            "Nuevas opciones para Golpe Brutal: Abrumar (desventaja en salvaciones) y Desgarrar (bonificador al ataque de aliados).",
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
            "Recuperas todos los usos de Furia al tirar iniciativa. La furia dura 10 minutos sin necesidad de atacar.",
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
          description: "Aumenta una característica o elige una Dote.",
        },
      ],
      classSpecific: { rages: "5", rageDmg: "+4", weaponMastery: "4" },
    },
    {
      level: 17,
      proficiencyBonus: 6,
      features: [
        {
          name: "Golpe Brutal Mejorado (2)",
          description:
            "El daño extra aumenta a 2d10 y puedes aplicar dos efectos a la vez.",
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
            "Si el total de una prueba de Fuerza es menor que tu puntuación de Fuerza, puedes usar tu puntuación en su lugar.",
        },
      ],
      classSpecific: { rages: "6", rageDmg: "+4", weaponMastery: "4" },
    },
    {
      level: 19,
      proficiencyBonus: 6,
      features: [{ name: "Don Épico", description: "Eliges una Dote Épica." }],
      classSpecific: { rages: "6", rageDmg: "+4", weaponMastery: "4" },
    },
    {
      level: 20,
      proficiencyBonus: 6,
      features: [
        {
          name: "Campeón Primordial",
          description:
            "Tus puntuaciones de Fuerza y Constitución aumentan en 4 (Máximo 25).",
        },
      ],
      classSpecific: { rages: "6", rageDmg: "+4", weaponMastery: "4" },
    },
  ],
  subclasses: [
    {
      name: "Senda del Árbol del Mundo",
      description:
        "Conectas con Yggdrasil para obtener vitalidad y teletransportarte.",
      features: [
        {
          level: 3,
          name: "Vitalidad del Árbol",
          description:
            "Ganas PG temporales al entrar en furia y puedes dárselos a aliados.",
        },
        {
          level: 6,
          name: "Ramas del Árbol",
          description:
            "Reacción para teletransportar enemigos o reducir su velocidad.",
        },
        {
          level: 10,
          name: "Raíces Apaleadoras",
          description:
            "Aumenta el alcance de tus armas y activa propiedades de maestría extra.",
        },
        {
          level: 14,
          name: "Viajar por el Árbol",
          description:
            "Teletransporte para ti y tus aliados al entrar en furia o como acción adicional.",
        },
      ],
    },
    {
      name: "Senda del Berserker",
      description: "La violencia pura desatada.",
      features: [
        {
          level: 3,
          name: "Frenesí",
          description:
            "Causas daño extra (d6s de furia) al atacar temerariamente.",
        },
        {
          level: 6,
          name: "Furia Irracional",
          description:
            "Inmunidad a asustado y hechizado mientras estás en furia.",
        },
        {
          level: 10,
          name: "Represalia",
          description: "Reacción para atacar a quien te daña cuerpo a cuerpo.",
        },
        {
          level: 14,
          name: "Presencia Intimidante",
          description: "Aterroriza a enemigos cercanos como acción adicional.",
        },
      ],
    },
    {
      name: "Senda del Corazón Salvaje",
      description: "Afinidad con animales y espíritus bestiales (antes Tótem).",
      features: [
        {
          level: 3,
          name: "Furia de lo Salvaje",
          description:
            "Elige un estilo animal (Oso, Águila, Lobo) al entrar en furia.",
        },
        {
          level: 3,
          name: "Portavoz de los Animales",
          description: "Puedes lanzar Hablar con Animales como ritual.",
        },
        {
          level: 6,
          name: "Aspecto de lo Salvaje",
          description: "Elige un beneficio pasivo (Búho, Pantera, Salmón).",
        },
        {
          level: 10,
          name: "Hablante de la Naturaleza",
          description: "Lanzas Comunión con la Naturaleza como ritual.",
        },
        {
          level: 14,
          name: "Poder de lo Salvaje",
          description:
            "Elige un beneficio de combate (León, Halcón, Carnero) al entrar en furia.",
        },
      ],
    },
    {
      name: "Senda del Fanático",
      description: "Furia divina impulsada por un dios.",
      features: [
        {
          level: 3,
          name: "Furia Divina",
          description:
            "Daño extra necrótico o radiante en el primer golpe del turno.",
        },
        {
          level: 3,
          name: "Guerrero de los Dioses",
          description:
            "Reserva de dados d12 para curarte como acción adicional.",
        },
        {
          level: 6,
          name: "Foco Fanático",
          description: "Si fallas una salvación, puedes repetirla con un bono.",
        },
        {
          level: 10,
          name: "Presencia Ferviente",
          description: "Grito de guerra que da ventaja a aliados.",
        },
        {
          level: 14,
          name: "Furia de los Dioses",
          description: "Resistencia a daños y puedes evitar caer a 0 PG.",
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
            "Acción bonus para inspirar (d6). Usos igual a Mod. Carisma 901].",
        },
        {
          name: "Lanzamiento de Conjuros",
          description:
            "Usas Carisma. Puedes cambiar un conjuro preparado al subir de nivel.",
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
            "Suma la mitad de tu bono de competencia a pruebas donde no seas competente.",
        },
        {
          name: "Pericia",
          description:
            "Elige 2 de tus habilidades para duplicar tu bono de competencia.",
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
          name: "Colegio de Bardo",
          description:
            "Elige tu Subclase (Danza, Conocimiento, Glamour o Valor).",
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
          description: "Aumenta una característica o elige una Dote.",
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
            "Recuperas usos de Inspiración en descanso corto. Puedes gastar espacios para recuperar usos.",
        },
        {
          name: "Dado Bárdico (d8)",
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
          name: "Rasgo de Colegio",
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
            "Reacción para repetir salvaciones contra hechizado o asustado (con ventaja).",
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
          description: "Aumenta una característica o elige una Dote.",
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
          name: "Pericia (x2)",
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
            "Puedes preparar conjuros de las listas de Clérigo, Druida y Mago.",
        },
        {
          name: "Dado Bárdico (d10)",
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
          description: "Aumenta una característica o elige una Dote.",
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
          name: "Rasgo de Colegio",
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
          name: "Dado Bárdico (d12)",
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
          description: "Aumenta una característica o elige una Dote.",
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
            "Si al tirar iniciativa tienes menos de 2 usos de Inspiración, recuperas hasta tener 2.",
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
      features: [{ name: "Don Épico", description: "Eliges una Dote Épica." }],
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
            "Siempre tienes preparados Palabra de Poder: Sanar y Matar. Puedes afectar a un segundo objetivo.",
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
        "Practican una forma de armonía con el cosmos que enfatiza la agilidad y la velocidad.",
      features: [
        {
          level: 3,
          name: "Juego de Pies Deslumbrante",
          description:
            "Defensa sin armadura (10+DES+CAR) y ataques sin armas usando Inspiración Bárdica.",
        },
        {
          level: 6,
          name: "Juego de Pies Conjunto",
          description:
            "Gasta inspiración al tirar iniciativa para bonificar a aliados.",
        },
        {
          level: 6,
          name: "Movimiento Inspirador",
          description:
            "Reacción para moverte tú y un aliado cuando un enemigo termina turno cerca.",
        },
        {
          level: 14,
          name: "Evasión Dirigida",
          description:
            "Compartes Evasión (mitad de daño en salvaciones DES) con aliados cercanos.",
        },
      ],
    },
    {
      name: "Colegio del Conocimiento",
      description:
        "Recaban conjuros y secretos de diversas fuentes, como tratados intelectuales y ritos místicos.",
      features: [
        {
          level: 3,
          name: "Palabras Cortantes",
          description:
            "Usa tu reacción y un dado de inspiración para restar a la tirada de un enemigo.",
        },
        {
          level: 3,
          name: "Competencias Adicionales",
          description: "Ganas 3 habilidades a elección.",
        },
        {
          level: 6,
          name: "Descubrimientos Mágicos",
          description:
            "Aprendes 2 conjuros de cualquier clase (Clérigo, Druida o Mago).",
        },
        {
          level: 14,
          name: "Habilidad Sin Parangón",
          description:
            "Usa inspiración para mejorar tus propias pruebas de habilidad.",
        },
      ],
    },
    {
      name: "Colegio del Glamour",
      description:
        "Tejen hilos de belleza y terror en sus canciones con magia de los Parajes Feéricos.",
      features: [
        {
          level: 3,
          name: "Manto de Inspiración",
          description:
            "Otorga PG temporales y movimiento libre a aliados gastando inspiración.",
        },
        {
          level: 3,
          name: "Magia Cautivadora",
          description:
            "Siempre tienes preparados Hechizar Persona e Imagen Múltiple.",
        },
        {
          level: 6,
          name: "Manto de Majestad",
          description:
            "Lanzas Orden Imperiosa como acción adicional gratis durante 1 minuto.",
        },
        {
          level: 14,
          name: "Majestad Inquebrantable",
          description:
            "Los enemigos no pueden atacarte sin superar una salvación de Carisma.",
        },
      ],
    },
    {
      name: "Colegio del Valor",
      description:
        "Narradores osados que conservan el recuerdo de los grandes héroes y combaten en primera línea.",
      features: [
        {
          level: 3,
          name: "Entrenamiento Marcial",
          description:
            "Competencia con armas marciales, armaduras medias y escudos.",
        },
        {
          level: 3,
          name: "Inspiración en Combate",
          description:
            "El dado de inspiración puede sumar al daño o a la CA de un aliado.",
        },
        {
          level: 6,
          name: "Ataque Adicional",
          description:
            "Atacas dos veces. Puedes cambiar un ataque por un truco.",
        },
        {
          level: 14,
          name: "Magia de Batalla",
          description:
            "Tras lanzar un conjuro de acción, puedes atacar como acción adicional.",
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
    "Canalizador arcano",
    "Paquete de explorador de mazmorras y 15 po",
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
            "Tus espacios de conjuro son siempre del máximo nivel posible y se recuperan en descanso corto",
        },
        {
          name: "Invocaciones Sobrenaturales",
          description:
            "Obtienes 1 invocación a nivel 1. Fragmentos de conocimiento prohibido que otorgan capacidades mágicas",
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
            "Acción de 1 minuto para recuperar la mitad de tus espacios de conjuro (1 vez por descanso largo)",
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
          name: "Patrón Sobrenatural",
          description:
            "Eliges tu Subclase (Celestial, Feérico, Infernal o Primigenio)",
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
          description: "Aumenta una característica o elige una Dote",
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
          name: "Invocaciones de Nivel 5",
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
          name: "Rasgo de Patrón",
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
          name: "Invocaciones de Nivel 7",
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
          description: "Aumenta una característica o elige una Dote.",
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
            "Puedes lanzar Contactar con otro plano sin gastar espacio y superas automáticamente la salvación (1/día)",
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
          name: "Rasgo de Patrón",
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
          name: "Arcanum Místico (Nv 6)",
          description:
            "Eliges un conjuro de nivel 6. Puedes lanzarlo una vez por día sin gastar espacio de conjuro",
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
          description: "Aumenta una característica o elige una Dote.",
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
          description: "Eliges un conjuro de nivel 7 (1/día).",
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
          name: "Rasgo de Patrón",
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
          description: "Eliges un conjuro de nivel 8 (1/día).",
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
          description: "Aumenta una característica o elige una Dote.",
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
          name: "Invocación Final",
          description: "Obtienes tu décima invocación.",
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
          description: "Eliges una Dote Épica (Recomendado: Don del Destino).",
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
            "Cuando usas Astucia Mágica, recuperas TODOS tus espacios de Magia del Pacto.",
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

  subclasses: [
    {
      name: "Patrón Celestial",
      description:
        "Pacto con un ser de los Planos Superiores (Empíreo, Couatl, Unicornio).",
      features: [
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
