'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { classData, type ClassOption } from '@/lib/data/classData';
import { raceData, type RaceOption } from '@/lib/data/raceData';
import { spellsData, type Spell } from '@/lib/data/spellsData';
import { SKILLS_LIST, SKILL_TO_ABILITY } from '@/lib/data/skills';

interface StepReviewProps {
  data: {
    // basics
    name: string;
    age: string;
    height: string;
    weight: string;
    race: string;
    subrace?: string;
    background: string;
    alignment: string;
    languages: string[];

    // class & progression
    className: string;
    level: number;

    // core mechanics
    stats: Record<string, number>;      // e.g. { STR: 15, DEX: 14, … }
    skills: string[];                   // chosen proficiencies
    proficiencies: string[];            // armor/weapons/tools from class
    profBonus: number;
    ac: number;
    initiativeBonus: number;
    speed: number;
    hitPoints: number;

    // equipment & wealth
    equipment: string[];
    inventory: string[];
    gold: number;

    // spells
    spellAttackBonus: number;
    spellSaveDC: number;
    spellsKnown: {
      cantrips: string[];
      level1: string[];
    };

    // role‐play / backstory
    backstory: string;
    personalityTraits?: string;
    ideals?: string;
    bonds?: string;
    flaws?: string;
    allies?: string;
    enemies?: string;

    // ranger extras
    favoredEnemy?: string;
    favoredTerrain?: string;
  };
  onBack: () => void;
  onCreate: () => void;
  creating: boolean;
}

export default function StepReview({
  data,
  onBack,
  onCreate,
  creating,
}: StepReviewProps) {
  // Pull the full race + class objects if you need their icon/art
  const chosenRace = useMemo<RaceOption | undefined>(
    () => raceData.find((r) => r.name === data.race),
    [data.race]
  );
  const chosenClass = useMemo<ClassOption | undefined>(
    () => classData.find((c) => c.name === data.className),
    [data.className]
  );

  // Spell lookups
  const { cantrips: cantripSelections, level1: level1Selections } =
    data.spellsKnown;
  const cantrips = useMemo<Spell[]>(
    () =>
      spellsData.filter(
        (s) => s.level === 0 && cantripSelections.includes(s.name)
      ),
    [cantripSelections]
  );
  const spells1 = useMemo<Spell[]>(
    () =>
      spellsData.filter(
        (s) => s.level === 1 && level1Selections.includes(s.name)
      ),
    [level1Selections]
  );

  // Build skill summary
  const skillBonuses = SKILLS_LIST.map((skill) => {
    const ability = SKILL_TO_ABILITY[skill];
    const mod = Math.floor((data.stats[ability] - 10) / 2);
    const isProf = data.skills.includes(skill);
    return {
      name: skill,
      total: mod + (isProf ? data.profBonus : 0),
      isProf,
    };
  });

  return (
    <div className="absolute inset-x-0 top-12 bottom-0 overflow-auto p-6 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold text-center mb-6">
        Review Your Character
      </h1>

      <div className="flex space-x-6">
        {/* ── LEFT COLUMN ── */}
        <section className="w-1/3 flex flex-col space-y-4">
          {/* Basics */}
          <div className="bg-black/50 p-4 rounded-lg">
            <h2 className="font-semibold text-lg">Basics</h2>
            <p>
              <strong>Name:</strong> {data.name}
            </p>
            <p>
              <strong>Age:</strong> {data.age}
            </p>
            <p>
              <strong>Height:</strong> {data.height}
            </p>
            <p>
              <strong>Weight:</strong> {data.weight}
            </p>
            <p>
              <strong>Race:</strong> {data.race}
              {data.subrace && ` (${data.subrace})`}
            </p>
            <p>
              <strong>Background:</strong> {data.background}
            </p>
            <p>
              <strong>Alignment:</strong> {data.alignment}
            </p>
            <p>
              <strong>Languages:</strong> {data.languages.join(', ')}
            </p>
          </div>

          {/* Class & Stats */}
          <div className="bg-black/50 p-4 rounded-lg flex-1 flex flex-col">
            <h2 className="font-semibold text-lg mb-2">Class & Stats</h2>
            <div className="flex items-center mb-2">
              {chosenClass && (
                <Image
                  src={chosenClass.emblem}
                  alt={chosenClass.name}
                  width={40}
                  height={40}
                  className="mr-2"
                />
              )}
              <p>
                <strong>Class:</strong> {data.className} (Level {data.level})
              </p>
            </div>

            {/* Raw stats */}
            <div className="grid grid-cols-3 gap-2 text-sm mb-3">
              {Object.entries(data.stats).map(([abbr, val]) => (
                <div
                  key={abbr}
                  className="bg-gray-800 p-1 rounded text-center"
                >
                  <span className="font-bold">{abbr}</span>
                  <br />
                  <span>{val}</span>
                </div>
              ))}
            </div>

            {/* Skill list */}
            <div className="space-y-1 text-sm mb-3">
              <p>
                <strong>Skills:</strong>
              </p>
              <ul className="list-disc list-inside grid grid-cols-2 gap-1">
                {skillBonuses.map(({ name, total, isProf }) => (
                  <li key={name} className={isProf ? 'font-medium' : ''}>
                    {name}: {total >= 0 ? `+${total}` : total}
                  </li>
                ))}
              </ul>
            </div>

            {/* Core derived values */}
            <div className="space-y-1 text-sm">
              <p>
                <strong>Armor Class:</strong> {data.ac}
              </p>
              <p>
                <strong>Initiative:</strong>{' '}
                {data.initiativeBonus >= 0
                  ? `+${data.initiativeBonus}`
                  : data.initiativeBonus}
              </p>
              <p>
                <strong>Speed:</strong> {data.speed} ft
              </p>
              <p>
                <strong>Hit Points:</strong> {data.hitPoints}
              </p>
              {data.favoredTerrain && (
                <p>
                  <strong>Favored Terrain:</strong> {data.favoredTerrain}
                </p>
              )}
              {data.favoredEnemy && (
                <p>
                  <strong>Favored Enemy:</strong> {data.favoredEnemy}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ── MIDDLE COLUMN (Spells) ── */}
        {(cantrips.length > 0 || spells1.length > 0) && (
          <section className="w-1/3 flex flex-col space-y-4">
            <div className="bg-black/50 p-4 rounded-lg flex-1 flex flex-col">
              <h2 className="font-semibold text-lg mb-2">Spells</h2>

              {cantrips.length > 0 && (
                <div className="mb-3">
                  <h3 className="font-medium">Cantrips</h3>
                  <ul className="list-disc list-inside">
                    {cantrips.map((s) => (
                      <li key={s.name}>{s.name}</li>
                    ))}
                  </ul>
                </div>
              )}

              {spells1.length > 0 && (
                <div>
                  <h3 className="font-medium">1st-Level Spells</h3>
                  <ul className="list-disc list-inside">
                    {spells1.map((s) => (
                      <li key={s.name}>{s.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── RIGHT COLUMN (Backstory & Traits) ── */}
        <section className="w-1/3 flex flex-col space-y-4">
          <div className="bg-black/50 p-4 rounded-lg flex-1 flex flex-col">
            <h2 className="font-semibold text-lg mb-2">Backstory</h2>
            <div className="flex-1 overflow-auto whitespace-pre-wrap">
              {data.backstory || '—'}
            </div>
          </div>

          <div className="bg-black/50 p-4 rounded-lg space-y-1 text-sm">
            <h2 className="font-semibold text-lg mb-2">Personality</h2>
            {data.personalityTraits && (
              <p>
                <strong>Traits:</strong> {data.personalityTraits}
              </p>
            )}
            {data.ideals && (
              <p>
                <strong>Ideals:</strong> {data.ideals}
              </p>
            )}
            {data.bonds && (
              <p>
                <strong>Bonds:</strong> {data.bonds}
              </p>
            )}
            {data.flaws && (
              <p>
                <strong>Flaws:</strong> {data.flaws}
              </p>
            )}
            {data.allies && (
              <p>
                <strong>Allies & Enemies:</strong> {data.allies}
              </p>
            )}
          </div>
        </section>
      </div>

      {/* ── NAVIGATION BUTTONS ── */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={onBack}
          className="px-5 py-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          ← Back
        </button>
        <button
          onClick={onCreate}
          disabled={creating}
          className={`px-5 py-2 rounded text-white ${
            creating ? 'bg-green-700 opacity-50 cursor-wait' : 'bg-green-600 hover:bg-green-500'
          }`}
        >
          {creating ? 'Creating…' : 'Create Character'}
        </button>
      </div>
    </div>
  );
}
