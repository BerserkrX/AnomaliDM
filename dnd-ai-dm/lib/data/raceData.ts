export interface SubraceOption {
  name: string;
  emblem: string;
  modifiers: Record<string, number>;
  traits: string[];
  extraLanguageCount?: number;
}

export interface RaceOption {
  name: string;
  emblem: string;
  image: string;
  modifiers: Record<string, number>;
  traits: string[];
  languages: string[];
    // extraLanguageCount for Humans
  extraLanguageCount?: number;
  speed: number;
  subraces?: SubraceOption[];
}

export const raceData: RaceOption[] = [
  {
    name: 'Dwarf',
    emblem: '/images/races/emblems/dwarf.png',
    image: '/images/races/dwarf.png',
    modifiers: { STR: 0, DEX: 0, CON: 2, INT: 0, WIS: 0, CHA: 0 },
    traits: ['Darkvision', 'Dwarven Resilience', 'Dwarven Combat Training', 'Tool Proficiency', 'Stonecunning'],
    languages: ['Common', 'Dwarvish'],
    speed: 25,
    subraces: [
      {
        name: 'Hill Dwarf',
        emblem: '/images/races/emblems/hill-dwarf.png',
        modifiers: { WIS: 1 },
        traits: ['Dwarven Toughness'],
        extraLanguageCount: 0
      },
      {
        name: 'Mountain Dwarf',
        emblem: '/images/races/emblems/mountain-dwarf.png',
        modifiers: { STR: 2 },
        traits: ['Dwarven Armor Training'],
        extraLanguageCount: 0
      }
    ]
  },
  {
    name: 'Elf',
    emblem: '/images/races/emblems/elf.png',
    image: '/images/races/elf.png',
    modifiers: { STR: 0, DEX: 2, CON: 0, INT: 0, WIS: 0, CHA: 0 },
    traits: ['Darkvision', 'Keen Senses', 'Fey Ancestry', 'Trance'],
    languages: ['Common', 'Elvish'],
    speed: 30,    
    subraces: [
      {
        name: 'High Elf',
        emblem: '/images/races/emblems/high-elf.png',
        modifiers: { INT: 1 },
        traits: ['Elf Weapon Training', 'Cantrip'],
        extraLanguageCount: 1
      },
      {
        name: 'Wood Elf',
        emblem: '/images/races/emblems/wood-elf.png',
        modifiers: { WIS: 1 },
        traits: ['Elf Weapon Training', 'Fleet of Foot', 'Mask of the Wild'],
        extraLanguageCount: 0
      },
      {
        name: 'Drow (Dark Elf)',
        emblem: '/images/races/emblems/drow.png',
        modifiers: { CHA: 1 },
        traits: ['Superior Darkvision', 'Sunlight Sensitivity', 'Drow Magic'],
        extraLanguageCount: 0
      }
    ]
  },
  {
    name: 'Halfling',
    emblem: '/images/races/emblems/halfling.png',
    image: '/images/races/halfling.png',
    modifiers: { STR: 0, DEX: 2, CON: 0, INT: 0, WIS: 0, CHA: 0 },
    traits: ['Lucky', 'Brave', 'Halfling Nimbleness'],
    languages: ['Common', 'Halfling'],
    speed: 25,   
    subraces: [
      {
        name: 'Lightfoot Halfling',
        emblem: '/images/races/emblems/lightfoot.png',
        modifiers: { CHA: 1 },
        traits: ['Naturally Stealthy'],
        extraLanguageCount: 0
      },
      {
        name: 'Stout Halfling',
        emblem: '/images/races/emblems/stout.png',
        modifiers: { CON: 1 },
        traits: ['Stout Resilience'],
        extraLanguageCount: 0
      }
    ]
  },
  {
    name: 'Gnome',
    emblem: '/images/races/emblems/gnome.png',
    image: '/images/races/gnome.png',
    modifiers: { STR: 0, DEX: 0, CON: 0, INT: 2, WIS: 0, CHA: 0 },
    traits: ['Darkvision', 'Gnome Cunning'],
    languages: ['Common', 'Gnomish'],
    speed: 25,    
    subraces: [
      {
        name: 'Forest Gnome',
        emblem: '/images/races/emblems/forest-gnome.png',
        modifiers: { DEX: 1 },
        traits: ['Natural Illusionist', 'Speak with Small Beasts'],
        extraLanguageCount: 0
      },
      {
        name: 'Rock Gnome',
        emblem: '/images/races/emblems/rock-gnome.png',
        modifiers: { CON: 1 },
        traits: ['Artificer’s Lore', 'Tinker'],
        extraLanguageCount: 0
      }
    ]
  },
  {
    name: 'Human',
    emblem: '/images/races/emblems/human.png',
    image: '/images/races/human.png',
    modifiers: { STR: 1, DEX: 1, CON: 1, INT: 1, WIS: 1, CHA: 1 },
    traits: ['Extra Language'],
    languages: ['Common'],
    extraLanguageCount: 1,
    speed: 30,    
    subraces: [],
      
  },
  {
    name: 'Dragonborn',
    emblem: '/images/races/emblems/dragonborn.png',
    image: '/images/races/dragonborn.png',
    modifiers: { STR: 2, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 1 },
    traits: ['Draconic Ancestry', 'Breath Weapon', 'Damage Resistance'],
    languages: ['Common', 'Draconic'],
    speed: 30    
    
  },
  {
    name: 'Half-Elf',
    emblem: '/images/races/emblems/half-elf.png',
    image: '/images/races/half-elf.png',
    modifiers: { STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 1, CHA: 2 },
    traits: ['Darkvision', 'Fey Ancestry', 'Skill Versatility'],
    languages: ['Common', 'Elvish'],
    speed: 30    
  },
  {
    name: 'Half-Orc',
    emblem: '/images/races/emblems/half-orc.png',
    image: '/images/races/half-orc.png',
    modifiers: { STR: 2, DEX: 0, CON: 1, INT: 0, WIS: 0, CHA: 0 },
    traits: ['Darkvision', 'Menacing', 'Relentless Endurance', 'Savage Attacks'],
    languages: ['Common', 'Orc'],
    speed: 30  
  },
  {
    name: 'Tiefling',
    emblem: '/images/races/emblems/tiefling.png',
    image: '/images/races/tiefling.png',
    modifiers: { STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 2 },
    traits: ['Darkvision', 'Hellish Resistance', 'Infernal Legacy'],
    languages: ['Common', 'Infernal'],
    speed: 30  
  }
];
