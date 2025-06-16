// lib/utils/randomGen.ts
export interface RaceRandomData {
  age: { min: number; max: number };
  // height: base in inches, then roll X dY inches
  height: { baseInches: number; diceCount: number; diceSides: number };
  // weight: base + (heightRoll * weightRoll), where weightRoll = roll Dice
  weight: { baseWeight: number; diceCount: number; diceSides: number };
  // optional: name lists
  maleNames?: string[];
  femaleNames?: string[];
  surnames?: string[];
}

export const randomGen: Record<string, RaceRandomData> = {
  Dwarf: {
    age: { min: 50, max: 425 },
    height: { baseInches: 48, diceCount: 2, diceSides: 4 },    // 4'0" + 2d4"
    weight: { baseWeight: 115, diceCount: 2, diceSides: 6 },   // 2d6, multiplied by heightRoll
    //maleNames: ['Alton','Ander','Cade','Corrin','Eldon','Errich'],
    //femaleNames: ['Andry','Bree','Callie','Cora','Euphemia','Jillian'],
    //surnames: ['Brushgather','Goodbarrel','Greenbottle','High-hill','Hilltopple','Tealeaf'],
  },
  Elf: {
    age: { min: 100, max: 750 },
    height: { baseInches: 54, diceCount: 2, diceSides: 10 },   // 4'6" + 2d10"
    weight: { baseWeight: 90, diceCount: 1, diceSides: 4 },   // 1d4, multiplied by heightRoll
    maleNames: ['Adran','Aelar','Aramil','Arannis','Aust','Beiro'],
    femaleNames: ['Adrie','Althaea','Anastrianna','Andraste','Antinua','Bethrynna'],
    surnames: ['Amakiir','Galanodel','Holimion','Ilphelkiir','Liadon','Siannodel'],
  },
  Halfling: {
    age: { min: 20, max: 150 },
    height: { baseInches: 31, diceCount: 2, diceSides: 4 },    // 2'7" + 2d4"
    weight: { baseWeight: 35, diceCount: 1, diceSides: 1 },   // 1d1 -> always 1, so weight = 35 + heightRoll * 1
    maleNames: ['Alton','Ander','Cade','Corrin','Eldon','Errich'],
    femaleNames: ['Andry','Bree','Callie','Cora','Euphemia','Jillian'],
    surnames: ['Brushgather','Goodbarrel','Greenbottle','High-hill','Hilltopple','Tealeaf'],
  },
  Human: {
    age: { min: 15, max: 100 },
    height: { baseInches: 56, diceCount: 2, diceSides: 10 },   // 4'8" + 2d10"
    weight: { baseWeight: 110, diceCount: 2, diceSides: 4 },   // 2d4, multiplied by heightRoll
    //maleNames: ['Adran','Aelar','Aramil','Arannis','Aust','Beiro'],
    //femaleNames: ['Adrie','Althaea','Anastrianna','Andraste','Antinua','Bethrynna'],
    //surnames: ['Amakiir','Galanodel','Holimion','Ilphelkiir','Liadon','Siannodel'],
  },
  Dragonborn: {
    age: { min: 15, max: 80 },
    height: { baseInches: 66, diceCount: 2, diceSides: 8 },   // 5'6" + 2d8"
    weight: { baseWeight: 175, diceCount: 2, diceSides: 6 },   // 2d6, multiplied by heightRoll
    //maleNames: ['Adran','Aelar','Aramil','Arannis','Aust','Beiro'],
    //femaleNames: ['Adrie','Althaea','Anastrianna','Andraste','Antinua','Bethrynna'],
    //surnames: ['Amakiir','Galanodel','Holimion','Ilphelkiir','Liadon','Siannodel'],
  },
  Gnome: {
    age: { min: 35, max: 450 },
    height: { baseInches: 35, diceCount: 2, diceSides: 4 },   // 2'11" + 2d4"
    weight: { baseWeight: 35, diceCount: 1, diceSides: 1 },   // x1lb multiplied by heightRoll
    //maleNames: ['Adran','Aelar','Aramil','Arannis','Aust','Beiro'],
    //femaleNames: ['Adrie','Althaea','Anastrianna','Andraste','Antinua','Bethrynna'],
    //surnames: ['Amakiir','Galanodel','Holimion','Ilphelkiir','Liadon','Siannodel'],
  },
  HalfElf: {
    age: { min: 18, max: 180 },
    height: { baseInches: 57, diceCount: 2, diceSides: 8 },    // 4'9" + 2d8"
    weight: { baseWeight: 110, diceCount: 2, diceSides: 4 },   // 2d4, multiplied by heightRoll
    //maleNames: ['Adran','Aelar','Aramil','Arannis','Aust','Beiro'],
    //femaleNames: ['Adrie','Althaea','Anastrianna','Andraste','Antinua','Bethrynna'],
    //surnames: ['Amakiir','Galanodel','Holimion','Ilphelkiir','Liadon','Siannodel'],
  },
  HalfOrc: {
    age: { min: 14, max: 75 },
    height: { baseInches: 58, diceCount: 2, diceSides: 10 },   // 4'10" + 2d10"
    weight: { baseWeight: 140, diceCount: 2, diceSides: 6 },   // 2d6, multiplied by heightRoll
    //maleNames: ['Adran','Aelar','Aramil','Arannis','Aust','Beiro'],
    //femaleNames: ['Adrie','Althaea','Anastrianna','Andraste','Antinua','Bethrynna'],
    //surnames: ['Amakiir','Galanodel','Holimion','Ilphelkiir','Liadon','Siannodel'],
  },
  Tiefling: {
    age: { min: 15, max: 120 },
    height: { baseInches: 57, diceCount: 2, diceSides: 8 },    // 4'9" + 2d8"
    weight: { baseWeight: 110, diceCount: 2, diceSides: 4 },   // 2d4, multiplied by heightRoll
    //maleNames: ['Adran','Aelar','Aramil','Arannis','Aust','Beiro'],
    //femaleNames: ['Adrie','Althaea','Anastrianna','Andraste','Antinua','Bethrynna'],
    //surnames: ['Amakiir','Galanodel','Holimion','Ilphelkiir','Liadon','Siannodel'],
  },
};

/** roll N dY, sum result */
export function rollDice(count: number, sides: number): number {
  let total = 0;
  for (let i = 0; i < count; i++) {
    total += 1 + Math.floor(Math.random() * sides);
  }
  return total;
}

/** generate a random detail set for a given race */
export function generateRandomDetails(race: string) {
  const d = randomGen[race];
  if (!d) return {};

  // age
  const age = d.age.min + Math.floor(Math.random() * (d.age.max - d.age.min + 1));

  // height
  const heightRoll = rollDice(d.height.diceCount, d.height.diceSides);
  const totalHeightIn = d.height.baseInches + heightRoll;
  const feet = Math.floor(totalHeightIn / 12);
  const inches = totalHeightIn % 12;

  // weight: roll weight dice, then multiply by heightRoll
  const weightRoll = rollDice(d.weight.diceCount, d.weight.diceSides);
  const weight = d.weight.baseWeight + heightRoll * weightRoll;

  // name: pick random male or female + surname
  const male = Math.random() < 0.5;
  const firstList = male ? d.maleNames! : d.femaleNames!;
  const first = firstList[Math.floor(Math.random() * firstList.length)];
  const surname = d.surnames![Math.floor(Math.random() * d.surnames!.length)];

  return {
    name: `${first} ${surname}`,
    age: String(age),
    height: `${feet}' ${inches}"`,
    weight: `${weight} lbs`,
  };
}
