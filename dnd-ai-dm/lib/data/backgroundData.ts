// lib/data/backgroundData.ts

export interface BackgroundOption {
  name: string;
  emblem: string;
  image: string;
  features: string[];
  equipment: string[];
  languageCount: number;
  toolCount?: number;
  toolChoices?: string[];
  skills: string[];

  // NEW fields for role-play prompts:
  personalityTraits: string[];
  ideals: string[];
  bonds: string[];
  flaws: string[];
}

export const backgroundData: BackgroundOption[] = [
  {
    name: 'Acolyte',
    emblem: '/images/backgrounds/emblems/acolyte.png',
    image: '/images/backgrounds/acolyte.png',
    features: [
      'Shelter of the Faithful: You and your adventuring companions can expect help from those who share your faith.',
    ],
    equipment: [
      'Holy symbol',
      'Prayer book or prayer wheel',
      '5 sticks of incense',
      'Vestments',
      'Common clothes',
      'Pouch containing 15 gp',
    ],
    languageCount: 2,
    skills: ['Insight', 'Religion'],

    // Personality Traits (choose two)
    personalityTraits: [
      "I idolize a particular hero of my faith, and constantly refer to that person’s deeds and example.",
      "I can find common ground between the fiercest enemies, empathizing with them and always working toward peace.",
      "I see omens in every event and action. The gods try to speak to us; we just need to listen.",
      "Nothing can shake my optimistic attitude.",
      "I quote (or misquote) sacred texts and proverbs in almost every situation.",
      "I am tolerant (or intolerant) of other faiths and respect (or condemn) the worship of other gods.",
      "I’ve enjoyed fine food, drink, and high society among my temple’s elite. Rough living grates on me.",
      "I’ve spent so long in the temple that I have little practical understanding of the world outside.",
    ],

    // Ideals (choose one)
    ideals: [
      "Tradition. The ancient traditions of worship and sacrifice must be preserved and upheld. (Lawful)",
      "Charity. I always try to help those in need, no matter what the personal cost. (Good)",
      "Change. We must help bring about the changes the gods are constantly working in the world. (Chaotic)",
      "Power. I hope to one day rise to the top of my faith’s religious hierarchy. (Lawful)",
      "Faith. I trust that my deity will guide my actions. I have faith that if I work hard, things will go well. (Lawful/Neutral)",
      "Aspiration. I seek to prove myself worthy of my god’s favor by matching my actions against their teachings. (Any)",
    ],

    // Bonds (choose one)
    bonds: [
      "I would die to recover an ancient relic of my faith that was lost long ago.",
      "I will someday get revenge on the corrupt temple hierarchy who branded me a heretic.",
      "I owe my life to the priest who took me in when my parents died.",
      "Everything I do is for the common people.",
      "I will do anything to protect the temple where I served.",
      "I seek to preserve a sacred text that my enemies consider heretical and seek to destroy.",
    ],

    // Flaws (choose one)
    flaws: [
      "I judge others harshly, and myself even more severely.",
      "I put too much trust in those who wield power within my temple’s hierarchy.",
      "My piety sometimes leads me to blindly trust those that profess faith in my god.",
      "I am inflexible in my thinking.",
      "I am suspicious of strangers and expect the worst of them.",
      "Once I pick a goal, I become obsessed with it to the detriment of everything else in my life.",
    ],
  },

  {
    name: 'Charlatan',
    emblem: '/images/backgrounds/emblems/charlatan.png',
    image: '/images/backgrounds/charlatan.png',
    features: [
      'False Identity: You have created a second identity that includes documentation, established acquaintances, and disguises that allow you to assume that persona.',
    ],
    equipment: [
      'Fine clothes',
      'Disguise kit',
      'Tools of the con of your choice (e.g., forgery kit)',
      'Belt pouch containing 15 gp',
    ],
    languageCount: 0,
    skills: ['Deception', 'Sleight of Hand'],
    toolCount: 2,
    toolChoices: ['Diguise Kit', 'Forgery Kit'],

    personalityTraits: [
      "I fall in and out of love easily, and am always pursuing someone.",
      "I have a joke for every occasion, especially occasions where humor is inappropriate.",
      "Flattery is my preferred trick for getting what I want.",
      "I’m a born gambler who can’t resist taking a risk for a potential payoff.",
      "I lie about almost everything, even when there’s no good reason to.",
      "Sarcasm and insults are my weapons of choice.",
      "I keep multiple holy symbols on me and invoke whatever deity might come in useful at any given moment.",
      "I pocket anything I see that might have some value.",
    ],

    ideals: [
      "Independence. I am a free spirit—no one tells me what to do. (Chaotic)",
      "Fairness. I never target people who can’t afford to lose a few coins. (Lawful)",
      "Charity. I distribute the money I acquire to the people who really need it. (Good)",
      "Creativity. I never run the same con twice. (Chaotic)",
      "Friendship. Material goods come and go. Bonds of friendship last forever. (Good)",
      "Aspiration. I’m determined to make something of myself. (Any)",
    ],

    bonds: [
      "I fleeced the wrong person and must work to ensure that this individual never crosses paths with me or those I care about.",
      "I owe everything to my mentor—a horrible person who’s probably rotting in jail somewhere.",
      "Some of my old schemes still haunt me, and I’d like to put them behind me.",
      "I owe my daily dose of nicotine to a kindly old smoker who took pity on me.",
      "I can’t run from my past. It’s taught me too much. That’s why I’m still around.",
      "I’m trying to pay off an old debt I owe to a generous benefactor.",
    ],

    flaws: [
      "I can’t resist a pretty face.",
      "I’m always in debt. I can’t resist taking out a loan if I need some fast cash.",
      "I’m never satisfied with what I have—I always want more.",
      "I’m quick to put people down if they embarrass or displease me.",
      "I can’t resist swindling people who are more powerful than me.",
      "I hate to admit it (and will hate myself for it), but I’ll run and preserve my own hide if things go south.",
    ],
  },

  {
    name: 'Criminal',
    emblem: '/images/backgrounds/emblems/criminal.png',
    image: '/images/backgrounds/criminal.png',
    features: [
      'Criminal Contact: You have a reliable and trustworthy contact in the criminal underworld who acts as your liaison to a network of other criminals.',
    ],
    equipment: [
      'Crowbar',
      'Dark common clothes including a hood',
      'Belt pouch containing 15 gp',
    ],
    languageCount: 0,
    skills: ['Deception', 'Stealth'],
    toolCount: 2,
    toolChoices: ['One type of gaming set', "Thieves' Tools"],

    personalityTraits: [
      "I always have a plan for what to do when things go wrong.",
      "I am always calm, no matter what the situation. I never raise my voice or let my emotions control me.",
      "The first thing I do in a new place is note the locations of everything valuable—or where such things could be hidden.",
      "I would rather make a clever plan than fight any day.",
      "I am always polite and respectful.",
      "I am utterly calm under any pressure.",
      "I always let someone else keep the gold— I’m never the first to strike.",
      "I would rather sneak around than fight directly.",
    ],

    ideals: [
      "Honor. I don’t steal from others in the trade. (Lawful)",
      "Freedom. Chains are meant to be broken, as are those who would forge them. (Chaotic)",
      "Charity. I steal from the wealthy so that I can help people in need. (Good)",
      "Greed. I will do whatever it takes to become wealthy. (Evil)",
      "People. I’m loyal to my friends, not to any ideals, and everyone else can take a trip down the Styx for all I care. (Neutral)",
      "Redemption. There’s a spark of good in everyone. (Good)",
    ],

    bonds: [
      "I’m trying to pay off an old debt I owe to a generous benefactor.",
      "My ill-gotten gains go to support my family.",
      "Something important was taken from me, and I aim to steal it back.",
      "I will become the greatest thief that ever lived.",
      "I’m guilty of a terrible crime. I hope I can redeem myself for it.",
      "Someone I loved died because of a mistake I made. That will never happen again.",
    ],

    flaws: [
      "When I see something valuable, I can’t think about anything but how to steal it.",
      "When faced with a choice between money and my friends, I usually choose the money.",
      "If there’s a plan, I’ll forget it. If I don’t forget it, I’ll ignore it.",
      "I have a “tell” that reveals when I’m lying.",
      "I turn tail and run when things look bad.",
      "An innocent person is in prison for a crime that I committed. I’m okay with that.",
    ],
  },

  {
    name: 'Entertainer',
    emblem: '/images/backgrounds/emblems/entertainer.png',
    image: '/images/backgrounds/entertainer.png',
    features: [
      'By Popular Demand: You can always find a place to perform, usually in an inn or tavern but perhaps with a circus, at a theater, or even in a noble’s court. In return for your performance, you receive free lodging and food of a modest or comfortable standard (your choice) as long as you perform each night.',
    ],
    equipment: [
      'Musical instrument',
      'Disguise kit',
      'Favor of an admirer (trinket)',
      'Costume clothes',
      'Belt pouch containing 15 gp',
    ],
    languageCount: 0,
    skills: ['Acrobatics', 'Performance'],
    toolCount: 2,
    toolChoices: ['Disguise Kit', 'One type of musical instrument'],

    personalityTraits: [
      "I know a story relevant to almost every situation.",
      "Whenever I come to a new place, I collect local rumors and spread gossip.",
      "I’m a hopeless romantic, always in love with love.",
      "Nobody stays angry at me or around me for long, since I can defuse any amount of tension.",
      "I love a good insult, even one directed at me.",
      "I get bitter if I’m not the center of attention.",
      "I’ll settle for nothing less than perfection.",
      "I change my mood or my mind as quickly as I change key in a song.",
    ],

    ideals: [
      "Beauty. When I perform, I make the world better than it was. (Good)",
      "Tradition. The stories, legends, and songs of the past must never be forgotten, for they teach us who we are. (Lawful)",
      "Creativity. The world is in need of new ideas and bold action. (Chaotic)",
      "Greed. I’m only in it for the money and fame. (Evil)",
      "People. I’m committed to my crewmates, not to ideals. (Neutral)",
      "Honesty. Art should reflect the soul; it should come from within and reveal who we really are. (Any)",
    ],

    bonds: [
      "My instrument is my most treasured possession, and it reminds me of someone I love.",
      "Someone stole my precious instrument, and someday I’ll get it back.",
      "I want to be famous, whatever it takes.",
      "I idolize a hero of the old tales and measure my deeds against that person’s.",
      "I will do anything to prove myself superior to my hated rival.",
      "I would do anything for the other members of my old troupe.",
    ],

    flaws: [
      "I’ll do anything to win fame and renown.",
      "I’m a sucker for a pretty face.",
      "A scandal prevents me from ever going home again. That kind of trouble seems to follow me around.",
      "I once satirized a noble who still wants my head. It was a mistake that I will likely repeat.",
      "I have trouble keeping my true feelings hidden. My sharp tongue lands me in trouble.",
      "Despite my best efforts, I am unreliable to my friends.",
    ],
  },

  {
    name: 'Folk Hero',
    emblem: '/images/backgrounds/emblems/folkhero.png',
    image: '/images/backgrounds/folkhero.png',
    features: [
      'Rustic Hospitality: Since you come from the ranks of the common folk, you fit in among them. You can find a place to hide, rest, or recuperate among other commoners, unless you have shown yourself to be a danger to them. They will shield you from the law or anyone else searching for you, though they will not risk their lives to do so.',
    ],
    equipment: [
      "Set of artisan’s tools (one of your choice)",
      'Shovel',
      'Iron pot',
      'Common clothes',
      'Pouch containing 10 gp',
    ],
    languageCount: 0,
    skills: ['Animal Handling', 'Survival'],
    toolCount: 2,
    toolChoices: ["One type of artisan's tools", 'Vehicles (Land)'],

    personalityTraits: [
      "I judge people by their actions, not their words.",
      "If someone is in trouble, I’m always ready to lend help.",
      "When I set my mind to something, I follow through no matter what gets in my way.",
      "I have a strong sense of fair play and always try to find the most equitable solution to arguments.",
      "I’m confident in my own abilities and do what I can to instill confidence in others.",
      "Thinking is for other people. I prefer action.",
      "I misuse long words in an attempt to sound smarter.",
      "I get bored easily. When am I going to get on with my destiny?",
    ],

    ideals: [
      "Respect. People deserve to be treated with dignity and respect. (Good)",
      "Fairness. No one should get preferential treatment before the law, and no one is above the law. (Lawful)",
      "Freedom. Tyrants must not be tolerated. (Chaotic)",
      "Might. If I become strong, I can take what I want—what I deserve. (Evil)",
      "Sincerity. There's no good in pretending to be something I'm not. (Neutral)",
      "Destiny. Nothing and no one can steer me away from my higher calling. (Any)",
    ],

    bonds: [
      "I have a family, but I have no idea where they are. I have a plan to find them one day.",
      "I worked the land, I love the land, and I will protect the land.",
      "A proud noble once gave me a horrible beating, and I will take my revenge on any bully I encounter.",
      "My tools are symbols of my past life, and I carry them so that I will never forget my roots.",
      "I protect those who cannot protect themselves.",
      "I wish my childhood sweetheart had come with me to pursue my destiny.",
    ],

    flaws: [
      'The tyrant who rules my land will stop at nothing to see me killed.',
      'I’m convinced of the significance of my destiny, and blind to my shortcomings and the risk of failure.',
      'The people who knew me when I was young know my shameful secret, so I can never go home again.',
      'I have a weakness for the vices of the city, especially hard drink.',
      'Secretly, I believe that things would be better if I were a tyrant lording over the land.',
      'I have trouble trusting in my friends. It will take them long to gain my trust.',
    ],
  },

  {
    name: 'Guild Artisan',
    emblem: '/images/backgrounds/emblems/guildartisan.png',
    image: '/images/backgrounds/guildartisan.png',
    features: [
      'Guild Membership: Your guild will provide you with lodging and food if necessary and protect you at a modest level. You must pay dues to maintain this membership. ...',
    ],
    equipment: [
      "Set of artisan’s tools (one of your guild)",
      'Letter of introduction from your guild',
      "Traveler’s clothes",
      'Pouch containing 15 gp',
    ],
    languageCount: 1,
    skills: ['Insight', 'Persuasion'],
    toolCount: 1,
    toolChoices: ["One type of artisan's tools"],

    personalityTraits: [
      'I believe that anything worth doing is worth doing right. I can’t help it— I’m a perfectionist.',
      'I’m a snob who looks down on those who can’t appreciate fine art.',
      'I always want to know how things work and what makes people tick.',
      'I’m full of witty aphorisms and have a proverb for every occasion.',
      'I’m rude to people who lack my commitment to hard work and fair play.',
      'I like to talk at length about my profession.',
      'I don’t part with my money easily and will haggle tirelessly to get the best deal possible.',
      'I’m never satisfied with what I have—I always want more.',
    ],

    ideals: [
      'Community. It is the duty of all civilized people to strengthen the bonds of community and the security of civilization. (Lawful)',
      'Generosity. My talents were given to me so that I could use them to benefit the world. (Good)',
      'Freedom. Everyone should be free to pursue his or her own livelihood. (Chaotic)',
      'Greed. I’m only in it for the money. (Evil)',
      'People. I’m committed to the people I care about, not to ideals. (Neutral)',
      'Aspiration. I work hard to be the best there is at my craft. (Any)',
    ],

    bonds: [
      'The workshop where I learned my trade is the most important place in the world to me.',
      'I created a great work for a wealthy family, and I want to do so again someday.',
      'I owe my guild a great debt for forging me into the person I am today.',
      'I pursue wealth only to secure someone’s love.',
      'One day I will return to my guild and prove that I am the greatest artisan of them all.',
      'Someone saved my life, and I will repay the debt by serving them faithfully.',
    ],

    flaws: [
      'I’m quick to assume that someone is trying to cheat me.',
      'No one must ever learn that I once stole money from guild coffers.',
      'I’m never satisfied with what I have—I always want more.',
      'I would kill to acquire a noble title.',
      'I’m horribly jealous of anyone who can outshine my handiwork. Everywhere I go, I’m surrounded by rivals.',
      'I will do anything to get my hands on something rare or priceless.',
    ],
  },

  {
    name: 'Hermit',
    emblem: '/images/backgrounds/emblems/hermit.png',
    image: '/images/backgrounds/hermit.png',
    features: [
      'Discovery: The quiet seclusion of your extended hermitage gave you access to a unique and powerful discovery. The exact nature of this revelation depends on the nature of your seclusion.',
    ],
    equipment: [
      'Scroll case stuffed with notes from your studies',
      'Winter blanket',
      'Herbalism kit',
      'Common clothes',
      'Pouch containing 5 gp',
    ],
    languageCount: 1,
    skills: ['Medicine', 'Religion'],
    toolCount: 1,
    toolChoices: ['Herbalism Kit'],

    personalityTraits: [
      'I’ve been isolated for so long that I rarely speak, preferring gestures and the occasional grunt.',
      'I am utterly serene, even in the face of disaster.',
      'The leader of my community had something wise to say on every topic, and I am eager to share that wisdom.',
      'I feel tremendous empathy for all who suffer.',
      'I’m oblivious to etiquette and social expectations.',
      'I connect everything that happens to me to a grand, cosmic plan.',
      'I often get lost in my own thoughts and contemplation, becoming oblivious to my surroundings.',
      'I am working on a grand philosophical theory, and love sharing my ideas.',
    ],

    ideals: [
      'Greater Good. My gifts are meant to be shared with all, not used for my own benefit. (Good)',
      'Logic. Emotions must not cloud our sense of what is right and true, or our logical thinking. (Lawful)',
      'Free Thinking. Inquiry and curiosity are the pillars of progress. (Chaotic)',
      'Power. Solitude and contemplation are paths toward mystical or magical power. (Evil)',
      'Live and Let Live. Meddling in the affairs of others only causes trouble. (Neutral)',
      'Self-Knowledge. If you know yourself, there’s nothing left to know. (Any)',
    ],

    bonds: [
      'I entered seclusion to hide from the ones who might still be hunting me. I must someday confront them.',
      'I’m still seeking the enlightenment I pursued in my seclusion, and it still eludes me.',
      'I entered seclusion because I loved someone I could not have.',
      'Should my discovery come to light, it could bring ruin to the world.',
      'My isolation gave me great insight into a great evil that only I can destroy.',
      'I’ve been searching for a long-lost artifact of my faith, and it still eludes me.',
    ],

    flaws: [
      'Now that I have returned to the world, I enjoy its delights a little too much.',
      'I harbor dark, bloodthirsty thoughts that my isolation and meditation failed to quell.',
      'I am dogmatic in my thoughts and philosophy.',
      'I let my need to win arguments overshadow friendships and harmony.',
      'I’d do anything to get my hands on something rare or priceless.',
      'I feel no compassion for the dead. Life is life, after all.',
    ],
  },

  {
    name: 'Noble',
    emblem: '/images/backgrounds/emblems/noble.png',
    image: '/images/backgrounds/noble.png',
    features: [
      'Position of Privilege: Thanks to your noble birth, people are inclined to think the best of you. You are welcome in high society, and people assume you have the right to be wherever you are. The common folk make every effort to accommodate you, and you can secure an audience with a local noble if you need to.',
    ],
    equipment: [
      'Fine clothes',
      'Signet ring',
      'Scroll of pedigree',
      'Purse containing 25 gp',
    ],
    languageCount: 1,
    skills: ['History', 'Persuasion'],
    toolCount: 1,
    toolChoices: ['One type of gaming set'],

    personalityTraits: [
      'My eloquent flattery makes everyone I talk to feel like the most wonderful and important person in the world.',
      'The common folk love me for my kindness and generosity.',
      'No one could doubt by looking at my regal bearing that I am a cut above the unwashed masses.',
      'I take great pains to always look my best and follow the latest fashions.',
      'I don’t like to get my hands dirty, and I won’t be caught dead in unsuitable accommodations.',
      'Despite my noble birth, I do not place myself above other folk. We all have the same blood.',
      'My favor, once lost, is lost forever.',
      'If you do me an injury, I will crush you, ruin your name, and salt your fields.',
    ],

    ideals: [
      'Respect. Respect is due to me because of my position, but all people regardless of station deserve to be treated with dignity. (Good)',
      'Responsibility. It is my duty to respect the authority of those above me, just as those below me must respect mine. (Lawful)',
      'Independence. I must prove that I can handle myself without the coddling of my family. (Chaotic)',
      'Power. If I can attain more power, no one will tell me what to do. (Evil)',
      'Family. Blood runs thicker than water. (Any)',
      'Nobility. Birthright means everything. (Lawful)',
    ],

    bonds: [
      'My house’s alliance with another noble family must be sustained at all costs.',
      'Nothing is more important than the other members of my family. (Usually a spouse, a sibling, or a child.)',
      'I am in love with the heir of a family that my family despises.',
      'My loyalty to my sovereign is unwavering.',
      'The common folk must see me as a hero of the people.',
      'I will face any challenge to win the approval of my family.',
    ],

    flaws: [
      'I secretly believe that everyone is beneath me.',
      'I hide a truly scandalous secret that could ruin my family forever.',
      'I too often hear veiled insults and threats in every word addressed to me, and I’m quick to anger.',
      'I have an insatiable desire for carnal pleasures.',
      'In fact, the world does revolve around me.',
      'By my family’s name, I have always been afforded luxuries. I use them all indulgently.',
    ],
  },

  {
    name: 'Outlander',
    emblem: '/images/backgrounds/emblems/outlander.png',
    image: '/images/backgrounds/outlander.png',
    features: [
      'Wanderer: You have an excellent memory for maps and geography, and you can always recall the general layout of terrain, settlements, and other features around you. In addition, you can find food and fresh water for yourself and up to five others each day, provided that the land offers berries, small game, water, and so forth.',
    ],
    equipment: [
      'Staff',
      'Hunting trap',
      'Trophy from an animal you killed',
      "Traveler’s clothes",
      'Pouch containing 10 gp',
    ],
    languageCount: 1,
    skills: ['Athletics', 'Survival'],
    toolCount: 1,
    toolChoices: ['One type of musical instrument'],

    personalityTraits: [
      'I’m driven by a wanderlust that led me away from home.',
      'I watch over my friends as if they were a litter of newborn pups.',
      'I once ran twenty-five miles without stopping to warn my clan of an approaching orc horde. I still have the scars to prove it.',
      'I’m slow to trust members of other races, tribes, and societies.',
      'Violence is my answer to almost any challenge.',
      'Don’t expect me to save those who can’t save themselves. It is nature’s way that the strong survive.',
      'I’m terribly jealous of anyone who can outshine my prowess with a bow.',
      'I put no stock in wealthy or well-mannered folk. Money and manners won’t save you from a hungry owlbear.',
    ],

    ideals: [
      'Change. Life is like the seasons, in constant change, and we must change with it. (Chaotic)',
      'Greater Good. It is each person’s responsibility to make the most happiness for the whole tribe. (Good)',
      'Honor. If I dishonor myself, I dishonor my whole clan. (Lawful)',
      'Might. The strongest are meant to rule. (Evil)',
      'Nature. The natural world is more important than all the constructs of civilization. (Neutral)',
      'Glory. I must earn glory in battle, for myself and my clan. (Any)',
    ],

    bonds: [
      'My family, clan, or tribe is the most important thing in my life, even when they are far from me.',
      'An injury to the unspoiled wilderness of my home is an injury to me.',
      'I will bring terrible wrath down on the evildoers who destroyed my homeland.',
      'I am the last of my tribe, and it is up to me to ensure their names enter legend.',
      'I suffer awful visions of a coming disaster and will do anything to prevent it.',
      'It is my duty to provide children to sustain my tribe.',
    ],

    flaws: [
      'I remember every insult I’ve received and nurse a silent resentment toward anyone who’s ever wronged me.',
      'I am slow to trust members of other races, tribes, and societies.',
      'Violence is my answer to almost any challenge.',
      'Don’t expect me to save those who can’t save themselves. It is nature’s way that the strong survive.',
      'I flee that which is stronger than I, and lose all resolve if I’m outmatched.',
      'I watch over my friends as if they were a litter of newborn pups.',
    ],
  },

  {
    name: 'Sage',
    emblem: '/images/backgrounds/emblems/sage.png',
    image: '/images/backgrounds/sage.png',
    features: [
      "Researcher: If you don't know something, you often know where and from whom you can obtain it.",
    ],
    equipment: [
      'Bottle of black ink',
      'Quill',
      'Small knife',
      'Letter from a dead colleague posing a question you have not yet been able to answer',
      'Common clothes',
      'Pouch containing 10 gp',
    ],
    languageCount: 2,
    skills: ['Arcana', 'History'],

    personalityTraits: [
      'I use polysyllabic words that convey the impression of great erudition.',
      'I’ve read every book in the world’s greatest libraries—or I like to boast that I have.',
      'I’m used to helping out those who aren’t as smart as I am, and I patiently explain anything and everything to others.',
      'There’s nothing I like more than a good mystery.',
      'I’m willing to listen to every side of an argument before I make my own judgment.',
      'I . . . speak . . . slowly . . . when talking to idiots, which almost everyone is compared to me.',
      'I am horribly, horribly awkward in social situations.',
      'I’m convinced that people are always trying to steal my secrets.',
    ],

    ideals: [
      'Knowledge. The path to power and self-improvement is through knowledge. (Neutral)',
      'Beauty. What is beautiful points us beyond itself toward what is true. (Good)',
      'Logic. Emotions must not cloud our logical thinking. (Lawful)',
      'No Limits. Nothing should fetter the infinite possibility inherent in all existence. (Chaotic)',
      'Power. Knowledge is the path to power and domination. (Evil)',
      'Self-Improvement. The goal of a life of study is the betterment of oneself. (Any)',
    ],

    bonds: [
      'It is my duty to protect my students.',
      'I have an ancient text that holds terrible secrets that must not fall into the wrong hands.',
      'I work to preserve a library, university, scriptorium, or monastery.',
      'My life’s work is a series of tomes related to a specific field of lore.',
      'I’ve been searching my whole life for the answer to a certain question.',
      'I sold my soul for knowledge. I hope to do great deeds and win it back.',
    ],

    flaws: [
      'I am easily distracted by the promise of information.',
      'Most people scream and run when they see a demon. I stop and take notes on its anatomy.',
      'Unlocking an ancient mystery is worth the price of a civilization.',
      'I overlook obvious solutions in favor of complicated ones.',
      'I speak without really thinking through my words, invariably insulting others.',
      'I can’t keep a secret to save my life, or anyone else’s.',
    ],
  },

  {
    name: 'Sailor',
    emblem: '/images/backgrounds/emblems/sailor.png',
    image: '/images/backgrounds/sailor.png',
    features: [
      'Ship’s Passage: When you need to, you can secure free passage on a sailing ship for yourself and your companions. (You still must pay for food and other living expenses.) In addition, you can use your influence to obtain access to other ships for passage or minor work.',
    ],
    equipment: [
      'Belaying pin (club)',
      '50 ft. of hempen rope',
      'Lucky charm from shore',
      'Common clothes',
      'Pouch containing 10 gp',
    ],
    languageCount: 0,
    skills: ['Athletics', 'Perception'],
    toolCount: 2,
    toolChoices: ["Navigator's Tools", 'Vehicles (Water)'],

    personalityTraits: [
      'My friends know they can rely on me, no matter what.',
      'I work hard so that I can play hard when the work is done.',
      'I enjoy sailing into new ports and making new friends over a flagon of ale.',
      'I stretch the truth for the sake of a good story.',
      'To me, knowledge of the sea is knowledge of the world. (I am very curious.)',
      'I never pass up a friendly wager.',
      'My language is as foul as an otyugh nest.',
      'I like a good insult, even one directed at me.',
    ],

    ideals: [
      'Respect. The thing that keeps a ship together is mutual respect between captain and crew. (Good)',
      'Fairness. We all do the work, so we all share in the rewards. (Lawful)',
      'Freedom. The sea is freedom—the freedom to go anywhere and do anything. (Chaotic)',
      'Mastery. I’m a predator, and the other ships on the sea are my prey. (Evil)',
      'People. I’m committed to my ship and crew, not to ideals. (Neutral)',
      'Aspiration. Someday I’ll own my own ship and chart my own destiny. (Any)',
    ],

    bonds: [
      'I’m loyal to my captain first, everything else second.',
      'The ship is most important—crewmates and captains come and go.',
      'I’ll always remember my first ship.',
      'In a harbor town, I have a paramour whose eyes nearly stole me from the sea.',
      'I was cheated out of my fair share of the profits, and I want to get my due.',
      'Ruling a pod of orcas—my old rivals— taught me that the best defense is a swift offense.',
    ],

    flaws: [
      'I follow orders, even if I think they’re wrong.',
      'I’ll say anything to avoid having to do extra work.',
      'Once someone questions my courage, I never back down no matter how dangerous the situation.',
      'Once I start drinking, it’s hard for me to stop.',
      'I can’t help but pocket loose coins and trinkets I come across. (Sometimes they belong to someone else.)',
      'My pride will probably lead to my destruction.',
    ],
  },

  {
    name: 'Soldier',
    emblem: '/images/backgrounds/emblems/soldier.png',
    image: '/images/backgrounds/soldier.png',
    features: [
      'Military Rank: You have a military rank from your career as a soldier. Soldiers loyal to your former military organization still recognize your authority and influence, and they defer to you if they are of a lower rank. You know the drill, and you can take command of a battlefield if you are leading troops battle-ready. (You can also muster the soldiers of your former command if you are still in contact with them.)',
    ],
    equipment: [
      'Insignia of rank',
      'Trophy taken from a fallen enemy (e.g., a banner, a dagger, or a broken blade)',
      'Set of bone dice or deck of cards',
      'Common clothes',
      'Pouch containing 10 gp',
    ],
    languageCount: 0,
    skills: ['Athletics', 'Intimidation'],
    toolCount: 2,
    toolChoices: ['One type of gaming set', 'Vehicles (Land)'],

    personalityTraits: [
      'I’m always polite and respectful.',
      'I’m haunted by memories of war. I can’t get the images of violence out of my mind.',
      'I’ve lost too many friends, and I can’t look at the dead without feeling sorrow.',
      'I make friends easily, and I enjoy being around people.',
      'I’m always calm, no matter what the situation. I never raise my voice or let my emotions control me.',
      'I’m driven by a relentless sense of duty.',
      'I’ve lost too much. I aim to remain detached from everyone.',
      'I have little respect for anyone who is not a proven warrior.',
    ],

    ideals: [
      'Greater Good. Our lot is to lay down our lives in defense of others. (Good)',
      'Responsibility. I do what I must and obey just authority. (Lawful)',
      'Independence. When people follow orders blindly, they embrace a kind of tyranny. (Chaotic)',
      'Might. In life as in war, the stronger force takes what it wants. (Evil)',
      'Live and Let Live. Ideals aren’t worth killing over or going to war for. (Neutral)',
      'Nation. My city, nation, or people are all that matter. (Any)',
    ],

    bonds: [
      'I would still lay down my life for the people I served with.',
      'Someone saved my life on the battlefield. To this day, I will never leave a friend behind.',
      'My honor is my life.',
      'I’ll never forget the crushing defeat my company suffered or the enemies who dealt it.',
      'Those who fight beside me are those worth dying for.',
      'I fight for those who cannot fight for themselves.',
    ],

    flaws: [
      'The monstrous enemy we faced in battle still leaves me paranoid that anything could kill me.',
      'I have little respect for anyone who is not a proven warrior.',
      'I made a terrible mistake in battle that cost many lives—and I would do anything to keep that mistake secret.',
      'My hatred of my enemies is blind and unreasoning.',
      'I obey the law, even if the law causes misery.',
      'I’d rather eat my armor than admit when I’m wrong.',
    ],
  },

  {
    name: 'Urchin',
    emblem: '/images/backgrounds/emblems/urchin.png',
    image: '/images/backgrounds/urchin.png',
    features: [
      'City Secrets: You know the secret patterns and flow of cities and can find passages through the urban sprawl that others would miss. When you are not in combat, you (and companions you lead) can travel twice as fast as your speed would normally allow.',
    ],
    equipment: [
      'Small knife',
      'Map of your home town',
      'Pet mouse',
      'Token to remember your parents by',
      'Common clothes',
      'Pouch containing 10 gp',
    ],
    languageCount: 0,
    skills: ['Sleight of Hand', 'Stealth'],
    toolCount: 2,
    toolChoices: ['Disguise Kit', "Thieves' Tools"],

    personalityTraits: [
      'I hide scraps of food and trinkets away in my pockets.',
      'I ask a lot of questions.',
      'I like to squeeze into small places where no one else can get to me.',
      'I blurt out whatever comes to my mind.',
      'I idolize the heroes of old and play their deeds in my head like films.',
      'I often get lost in my own thoughts and daydreams.',
      'I use bits of chalk to draw intricate symbols in the dirt that tell a story about something that happened.',
      'I feel safe only when I am near the walls of a city.',
    ],

    ideals: [
      'Respect. All people, rich or poor, deserve respect. (Good)',
      'Community. My town or city is all that matters. (Lawful)',
      'Change. Life is like the seasons, in constant change, and we must change with it. (Chaotic)',
      'Retribution. The rich need to be shown what life and death are like in the gutters. (Evil)',
      'People. I help the people who help me—that is what keeps us alive. (Neutral)',
      'Aspiration. I’m going to prove that I’m worthy of a better life. (Any)',
    ],

    bonds: [
      'My town is my home, and I’ll fight to defend it.',
      'I sponsor an orphanage to keep others from enduring what I was forced to endure.',
      'I owe a debt I can never repay to the person who took pity on me.',
      'I’m trying to pay off an old debt I owe to a generous benefactor.',
      'My ill-gotten gains go to support my family.',
      'I will never forget the crushing defeat my company suffered or the enemies who slew my comrades.',
    ],

    flaws: [
      'I lose my temper easily, especially when I’m hungry.',
      'I can’t resist a pretty face.',
      'I would kill to acquire a noble title.',
      'I’m always picking pockets, even when it’s not necessary.',
      'I can’t resist taking an innocent person’s coin if it’s in my reach.',
      'People who can’t take care of themselves get what they deserve.',
    ],
  },
];
