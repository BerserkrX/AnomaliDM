// lib/data/classData.ts

export interface ClassOption {
  name: string;
  emblem: string;       // icon for selection buttons
  image: string;        // full-bleed artwork
  description: string;
  hitDie: string;
  savingThrows: string[];

  proficiencies: string[];    // flattened list of armor, weapons, tools
  skillLimit: number;
  skillChoices: string[];

  gearChoices: {
    armor: string[];   // primary armor/weapon combos
    weapons: string[]; // secondary weapon/pack options
  };

  defaultGear: string[];
  startingSpells: string[];

  favoredTerrains?: string[];
  favoredEnemies?: string[];

  spellcastingAbility?: 'INT' | 'WIS' | 'CHA';  // the ability that governs spell save DCs & slots
  cantripsKnown?: number;                       // number of cantrips at 1st level

}

export const classData: ClassOption[] = [
  {
    name: 'Barbarian',
    emblem: '/images/classes/emblems/barbarian.png',
    image:  '/images/classes/barbarian.png',
    description:
      'Barbarians are fierce warriors driven by raw emotion and primal instincts rather than polished technique.',
    hitDie: 'd12',
    savingThrows: ['STR', 'CON'],

    proficiencies: [
      'Light Armor',
      'Medium Armor',
      'Shields',
      'Simple Weapons',
      'Martial Weapons',
    ],
    skillLimit: 2,
    skillChoices: [
      'Animal Handling',
      'Athletics',
      'Intimidation',
      'Nature',
      'Perception',
      'Survival',
    ],

    gearChoices: {
      armor: ['Greataxe', 'Any Martial Melee Weapon'],
      weapons: ['Two Handaxes', 'Any Simple Weapon'],
    },

    defaultGear: ['Explorer’s Pack', '4 Javelins'],
    startingSpells: [],

  },

  {
    name: 'Bard',
    emblem: '/images/classes/emblems/bard.png',
    image:  '/images/classes/bard.png',
    description:
      'Bards are charismatic performers who use music, speech, and charm to influence the world around them—often with a magical twist.',
    hitDie: 'd8',
    savingThrows: ['DEX', 'CHA'],

    proficiencies: [
      'Light Armor',
      'Simple Weapons',
      'Hand Crossbow',
      'Longsword',
      'Rapier',
      'Shortsword',
      'Three Musical Instruments',
    ],
    skillLimit: 3,
    skillChoices: [
      'Acrobatics',
      'Deception',
      'Insight',
      'Performance',
      'Persuasion',
      'Sleight of Hand',
    ],

    gearChoices: {
      armor: ['Rapier', 'Longsword'],
      weapons: ['Diplomat’s Pack', 'Entertainer’s Pack'],
    },

    defaultGear: ['Leather Armor', 'Dagger'],
    startingSpells: [],

    spellcastingAbility: 'CHA',
    cantripsKnown: 2,
  },

  {
    name: 'Cleric',
    emblem: '/images/classes/emblems/cleric.png',
    image:  '/images/classes/cleric.png',
    description:
      'Clerics are divine champions who draw magical power from a god, ideal, or force of cosmic importance.',
    hitDie: 'd8',
    savingThrows: ['WIS', 'CHA'],

    proficiencies: [
      'Light Armor',
      'Medium Armor',
      'Shields',
      'Simple Weapons',
    ],
    skillLimit: 2,
    skillChoices: ['History', 'Insight', 'Medicine', 'Persuasion', 'Religion'],

    gearChoices: {
      armor: ['Mace', 'Warhammer (if proficient)'],
      weapons: ['Scale Mail', 'Leather Armor'],
    },

    defaultGear: ['Priest’s Pack'],
    startingSpells: [],

    spellcastingAbility: 'WIS',
    cantripsKnown: 3,
  },

  {
    name: 'Druid',
    emblem: '/images/classes/emblems/druid.png',
    image:  '/images/classes/druid.png',
    description:
      'Druids are caretakers of the natural world, drawing on primal magic to commune with nature and shapeshift into animal forms.',
    hitDie: 'd8',
    savingThrows: ['INT', 'WIS'],

    proficiencies: [
      'Light Armor (no metal)',
      'Medium Armor (no metal)',
      'Shields (no metal)',
      'Clubs',
      'Daggers',
      'Darts',
      'Javelins',
      'Maces',
      'Quarterstaffs',
      'Scimitars',
      'Slings',
      'Spears',
      'Herbalism Kit',
    ],
    skillLimit: 2,
    skillChoices: [
      'Arcana',
      'Animal Handling',
      'Insight',
      'Medicine',
      'Nature',
      'Perception',
      'Religion',
      'Survival',
    ],

    gearChoices: {
      armor: ['Scimitar + Leather Armor'],
      weapons: ['Wooden Shield', 'Druidic Focus'],
    },

    defaultGear: ['Explorer’s Pack', 'Leather Armor'],
    startingSpells: [],

    spellcastingAbility: 'WIS',
    cantripsKnown: 2,
  },

  {
    name: 'Fighter',
    emblem: '/images/classes/emblems/fighter.png',
    image:  '/images/classes/fighter.png',
    description:
      'Fighters are masters of martial combat, skilled with a variety of weapons and armor, and experts in tactics.',
    hitDie: 'd10',
    savingThrows: ['STR', 'CON'],

    proficiencies: [
      'All Armor',
      'Shields',
      'Simple Weapons',
      'Martial Weapons',
    ],
    skillLimit: 2,
    skillChoices: [
      'Acrobatics',
      'Animal Handling',
      'Athletics',
      'History',
      'Insight',
      'Intimidation',
      'Perception',
      'Survival',
    ],

    gearChoices: {
      armor: ['Chain Mail'],
      weapons: ['Martial Weapon + Shield', 'Two Martial Weapons'],
    },

    defaultGear: ['Dungeoneer’s Pack'],
    startingSpells: [],
  },

  {
    name: 'Monk',
    emblem: '/images/classes/emblems/monk.png',
    image:  '/images/classes/monk.png',
    description:
      'Monks are masters of martial arts, harnessing the power of ki to perform extraordinary feats of agility and strength.',
    hitDie: 'd8',
    savingThrows: ['STR', 'DEX'],

    proficiencies: ['Simple Weapons', 'Shortsword'],
    skillLimit: 2,
    skillChoices: [
      'Acrobatics',
      'Athletics',
      'History',
      'Insight',
      'Religion',
      'Stealth',
    ],

    gearChoices: {
      armor: ['Shortsword'],
      weapons: ['Any Simple Weapon'],
    },

    defaultGear: ['10 Darts'],
    startingSpells: [],
  },

  {
    name: 'Paladin',
    emblem: '/images/classes/emblems/paladin.png',
    image:  '/images/classes/paladin.png',
    description:
      'Paladins are holy warriors bound by an oath to serve justice and righteousness, combining martial prowess with divine magic.',
    hitDie: 'd10',
    savingThrows: ['WIS', 'CHA'],

    proficiencies: [
      'All Armor',
      'Shields',
      'Simple Weapons',
      'Martial Weapons',
    ],
    skillLimit: 2,
    skillChoices: [
      'Athletics',
      'Insight',
      'Intimidation',
      'Medicine',
      'Persuasion',
      'Religion',
    ],

    gearChoices: {
      armor: ['Martial Weapon + Shield', 'Two Martial Weapons'],
      weapons: ['Javelin', 'Any Simple Melee Weapon'],
    },

    defaultGear: ['Ritual Holy Symbol'],
    startingSpells: [],
  },

  {
    name: 'Ranger',
    emblem: '/images/classes/emblems/ranger.png',
    image:  '/images/classes/ranger.png',
    description:
      'Rangers are warriors of the wilderness, adept at tracking, hunting, and using nature magic to aid their journey.',
    hitDie: 'd10',
    savingThrows: ['STR', 'DEX'],

    proficiencies: [
      'Light Armor',
      'Medium Armor',
      'Shields',
      'Simple Weapons',
      'Martial Weapons',
    ],
    skillLimit: 3,
    skillChoices: [
      'Animal Handling',
      'Athletics',
      'Insight',
      'Investigation',
      'Nature',
      'Perception',
      'Stealth',
      'Survival',
    ],

    gearChoices: {
      armor: ['Leather Armor'],
      weapons: ['Two Shortswords', 'Two Simple Melee Weapons'],
    },

    defaultGear: ['Explorer’s Pack', 'Longbow + 20 Arrows'],
    startingSpells: [],

    favoredTerrains: [
      'Arctic',
      'Coast',
      'Desert',
      'Forest',
      'Grassland',
      'Mountain',
      'Swamp',
      'Underdark',
    ],
    favoredEnemies: [
      'Aberrations',
      'Beasts',
      'Celestials',
      'Constructs',
      'Dragons',
      'Elementals',
      'Fey',
      'Fiends',
      'Giants',
      'Humanoids',
      'Monstrosities',
      'Oozes',
      'Plants',
      'Undead',
    ],
  },

  {
    name: 'Rogue',
    emblem: '/images/classes/emblems/rogue.png',
    image:  '/images/classes/rogue.png',
    description:
      'Rogues are stealthy skill experts, adept at surprise attacks and clever maneuvers.',
    hitDie: 'd8',
    savingThrows: ['DEX', 'INT'],

    proficiencies: [
      'Light Armor',
      'Simple Weapons',
      'Hand Crossbow',
      'Longsword',
      'Rapier',
      'Shortsword',
      'Thieves’ Tools',
    ],
    skillLimit: 4,
    skillChoices: [
      'Acrobatics',
      'Athletics',
      'Deception',
      'Insight',
      'Intimidation',
      'Investigation',
      'Perception',
      'Performance',
      'Persuasion',
      'Sleight of Hand',
      'Stealth',
    ],

    gearChoices: {
      armor: ['Leather Armor'],
      weapons: ['Rapier', 'Shortsword'],
    },

    defaultGear: ['Dagger', 'Thieves’ Tools'],
    startingSpells: [],

  },

  {
    name: 'Sorcerer',
    emblem: '/images/classes/emblems/sorcerer.png',
    image:  '/images/classes/sorcerer.png',
    description:
      'Sorcerers have innate magical ability, born of a magical bloodline or extraordinary cosmic event.',
    hitDie: 'd6',
    savingThrows: ['CON', 'CHA'],

    proficiencies: [
      'Dagger',
      'Dart',
      'Sling',
      'Quarterstaff',
      'Light Crossbow',
    ],
    skillLimit: 2,
    skillChoices: [
      'Arcana',
      'Deception',
      'Insight',
      'Intimidation',
      'Persuasion',
      'Religion',
    ],

    gearChoices: {
      armor: [],
      weapons: ['Dagger', 'Component Pouch'],
    },

    defaultGear: ['Arcane Focus', 'Component Pouch'],
    startingSpells: [],

    spellcastingAbility: 'CHA',
    cantripsKnown: 4,
  },

  {
    name: 'Warlock',
    emblem: '/images/classes/emblems/warlock.png',
    image:  '/images/classes/warlock.png',
    description:
      'Warlocks gain power through pacts with otherworldly beings, trading service for supernatural abilities.',
    hitDie: 'd8',
    savingThrows: ['WIS', 'CHA'],

    proficiencies: [
      'Light Armor',
      'Simple Weapons',
    ],
    skillLimit: 2,
    skillChoices: [
      'Arcana',
      'Deception',
      'History',
      'Intimidation',
      'Investigation',
      'Nature',
      'Religion',
    ],

    gearChoices: {
      armor: ['Leather Armor'],
      weapons: ['Light Crossbow', 'Simple Weapon'],
    },

    defaultGear: ['Scholar’s Pack', 'Arcane Focus'],
    startingSpells: [],

    spellcastingAbility: 'CHA',
    cantripsKnown: 2,
  },

  {
    name: 'Wizard',
    emblem: '/images/classes/emblems/wizard.png',
    image:  '/images/classes/wizard.png',
    description:
      'Wizards are supreme magic-users, defined and united as a class by the spells they cast.',
    hitDie: 'd6',
    savingThrows: ['INT', 'WIS'],

    proficiencies: [
      'Dagger',
      'Dart',
      'Quarterstaff',
      'Light Crossbow',
    ],
    skillLimit: 2,
    skillChoices: [
      'Arcana',
      'History',
      'Insight',
      'Investigation',
      'Medicine',
      'Religion',
    ],

    gearChoices: {
      armor: [],
      weapons: ['Quarterstaff', 'Dagger'],
    },

    defaultGear: ['Spellbook', 'Scholar’s Pack'],
    startingSpells: [],

    spellcastingAbility: 'INT',
    cantripsKnown: 3,
  },
];
