'use client';

import { useState, ReactNode } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

import StepClass      from './components/StepClass';
import StepRace       from './components/StepRace';
import StepBackground from './components/StepBackground';
import StepStats      from './components/StepStats';
import StepDetails    from './components/StepDetails';
import StepReview     from './components/StepReview';

export type Character = {
  // Basic Info
  name: string;
  age: string;
  height: string;
  weight: string;
  hair: string;
  eyes: string;
  skin: string;
  gender: string;

  // Profile group
  race: string;
  subrace?: string;
  background: string;
  alignment: string;
  lifestyle: string;
  languages: string[];

  // Class group
  className: string;
  level: number;

  // Attributes group
  stats: { STR: number; DEX: number; CON: number; INT: number; WIS: number; CHA: number };
  modifiers?: Record<string, number>
  generationMethod?: string;
  lastRolled?: number[];
  diceRollAttemptsUsed?: number;
  skills: string[];
  savingThrows: string[];
  proficiencies: string[];
  profBonus: number;
  passivePerception: number;
  passiveInsight: number;
  ac: number;
  initiativeBonus: number;
  speed: number;
  hitPoints: number;

  // Equipment group
  equipment: string[];
  inventory: string[];
  gold: number;

  // Spells group
  spellAttackBonus: number;
  spellSaveDC: number;
  spellsKnown: { cantrips: string[]; level1: string[] };

  // Personality group
  backstory: string;
  personalityTraits: string;
  ideals: string;
  bonds: string;
  flaws: string;
  allies: string;
  enemies: string;

  // Ranger extras
  favoredEnemy?: string;
  favoredTerrain?: string;
};

export default function CreateCharacterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const campaignId = searchParams.get('campaign') ?? undefined;

  const [step, setStep] = useState(0);
  const [creating, setCreating] = useState(false);
  const [character, setCharacter] = useState<Character>({
    name: '',
    age: '',
    height: '',
    weight: '',
    hair: '',
    eyes: '',
    skin: '',
    gender: '',

    race: '',
    subrace: undefined,
    background: '',
    alignment: '',
    lifestyle: '',
    languages: [],

    className: '',
    level: 1,

    stats: { STR:10, DEX:10, CON:10, INT:10, WIS:10, CHA:10 },
    skills: [],
    savingThrows: [],
    proficiencies: [],
    profBonus: 0,
    passivePerception: 0,
    passiveInsight: 0,
    ac: 0,
    initiativeBonus: 0,
    speed: 0,
    hitPoints: 0,

    equipment: [],
    inventory: [],
    gold: 0,

    spellAttackBonus: 0,
    spellSaveDC: 0,
    spellsKnown: { cantrips: [], level1: [] },

    backstory: '',
    personalityTraits: '',
    ideals: '',
    bonds: '',
    flaws: '',
    allies: '',
    enemies: '',

    favoredEnemy: undefined,
    favoredTerrain: undefined,
  });

  const handleNext   = () => setStep(s => s + 1);
  const handleBack   = () => setStep(s => Math.max(0, s - 1));
  const handleChange = (updates: Partial<Character>) =>
    setCharacter(prev => ({ ...prev, ...updates }));

  const handleCreate = async () => {
    setCreating(true);

    // 1) get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error('Auth error:', userError);
      setCreating(false);
      return;
    }

    // 2) build payload
    const payload = {
      user_id:               user.id,
      campaign_id:           campaignId || null,
      name:                  character.name,
      class:                 character.className,
      level:                 character.level,
      profile: {
        age:        character.age,
        height:     character.height,
        weight:     character.weight,
        hair:       character.hair,
        eyes:       character.eyes,
        skin:       character.skin,
        gender:     character.gender,
        race:       character.race,
        subrace:    character.subrace,
        background: character.background,
        alignment:  character.alignment,
        lifestyle:  character.lifestyle,
        languages:  character.languages,
        favored_enemy:   character.favoredEnemy,
        favored_terrain: character.favoredTerrain,
      },
      attributes: {
        stats:              character.stats,
        skills:             character.skills,
        saving_throws:      character.savingThrows,
        proficiencies:      character.proficiencies,
        proficiency_bonus:  character.profBonus,
        passive_perception: character.passivePerception,
        passive_insight:    character.passiveInsight,
        ac:                 character.ac,
        initiative_bonus:   character.initiativeBonus,
        speed:              character.speed,
        hit_points:         character.hitPoints,
      },
      equipment: {
        items:     character.equipment,
        inventory: character.inventory,
        gold:      character.gold,
      },
      spells: {
        spell_attack_bonus: character.spellAttackBonus,
        spell_save_dc:       character.spellSaveDC,
        known:               character.spellsKnown,
      },
      personality: {
        backstory: character.backstory,
        traits:    character.personalityTraits,
        ideals:    character.ideals,
        bonds:     character.bonds,
        flaws:     character.flaws,
        allies:    character.allies,
        enemies:   character.enemies,
      },
    };

    // *** diagnostics ***
    console.log('⏳ Inserting character payload:', payload);

    // 3) insert and select returned row
    const { data: inserted, error: insertError } = await supabase
      .from('characters')
      .insert([payload])
      .select()
      .single();

    console.log(
      '❌ Full insert error:',
      JSON.stringify(insertError, null, 2)
    );

    if (insertError) {
      console.error('Insert failed:', insertError);
      setCreating(false);
      return;
    } else {
      // Success → send them back to their dashboard
      router.push('/account')
    }

    // 4) navigate on success
    router.push(campaignId ? `/campaign/${campaignId}` : '/campaign');
  };

  const steps: ReactNode[] = [
    <StepClass      key="class"      data={character} onChange={handleChange} onNext={handleNext} onBack={handleBack} />,
    <StepRace       key="race"       data={character} onChange={handleChange} onNext={handleNext} onBack={handleBack} />,
    <StepBackground key="background" data={character} onChange={handleChange} onNext={handleNext} onBack={handleBack} />,
    <StepStats      key="stats"      data={character} onChange={handleChange} onNext={handleNext} onBack={handleBack} />,
    <StepDetails    key="details"    data={character} onChange={handleChange} onNext={handleNext} onBack={handleBack} />,
    <StepReview     key="review"     data={character} onBack={handleBack} onCreate={handleCreate} creating={creating} />,
  ];

  return (
    <div className="min-h-screen bg-[#0d1117] text-white px-4 py-6">
      <div className="max-w-2xl mx-auto bg-[#1f2937] p-6 rounded shadow space-y-6">
        
        {steps[step]}
      </div>
    </div>
  );
}
