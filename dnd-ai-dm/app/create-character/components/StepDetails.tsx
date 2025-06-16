'use client';

import { useState, useEffect, useMemo, ChangeEvent } from 'react';
import { classData, type ClassOption } from '@/lib/data/classData';
import { spellsData, type Spell } from '@/lib/data/spellsData';
import { Character } from '../page';
import { randomGen, generateRandomDetails } from '@/lib/utils/randomGen';

interface StepDetailsProps {
  data: Partial<Character>;
  onChange: (updates: Partial<Character>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepDetails({
  data,
  onChange,
  onNext,
  onBack,
}: StepDetailsProps) {
  // ─── PERSONAL INFO WITH RANDOMIZER ───
  const [nameVal, setNameVal]       = useState(data.name || '');
  const [ageVal, setAgeVal]         = useState(data.age || '');
  const [heightVal, setHeightVal]   = useState(data.height || '');
  const [weightVal, setWeightVal]   = useState(data.weight || '');
  const [hair, setHair]             = useState(data.hair || '');
  const [eyes, setEyes]             = useState(data.eyes || '');
  const [skin, setSkin]             = useState(data.skin || '');
  const [gender, setGender]         = useState(data.gender || '');
  const [alignmentChoice, setAlignmentChoice] = useState(data.alignment || '');
  const [backstory, setBackstory]   = useState(data.backstory || '');

  // Alignment dropdown options
  const alignments = [
    'Lawful Good','Neutral Good','Chaotic Good',
    'Lawful Neutral','True Neutral','Chaotic Neutral',
    'Lawful Evil','Neutral Evil','Chaotic Evil'
  ];

  // Randomize button logic
  function handleRandomize() {
    const race = data.race ?? '';
    const rnd = generateRandomDetails(race);
    if (rnd.name)   setNameVal(rnd.name);
    if (rnd.age)    setAgeVal(rnd.age);
    if (rnd.height) setHeightVal(rnd.height);
    if (rnd.weight) setWeightVal(rnd.weight);
  }

  // ─── SPELL SELECTION ───
  const className = data.className || '';
  const chosenClass: ClassOption | undefined = useMemo(
    () => classData.find((c) => c.name === className),
    [className]
  );
  const stats = data.stats || { STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 };
  const level = data.level ?? 1;

  function abilityModifier(n: number) { return Math.floor((n - 10) / 2); }
  const spellAbility = chosenClass?.spellcastingAbility || 'INT';
  const mod = abilityModifier(stats[spellAbility] ?? 10);

  const cantripsCount = chosenClass?.cantripsKnown ?? 0;
  const level1Count = chosenClass?.spellcastingAbility 
    ? Math.max(0, mod + level) 
    : 0;

  const availableCantrips: Spell[] = useMemo(
    () => spellsData.filter((sp) => sp.level === 0 && sp.classes.includes(className)),
    [className]
  );
  const availableLevel1: Spell[] = useMemo(
    () => spellsData.filter((sp) => sp.level === 1 && sp.classes.includes(className)),
    [className]
  );

  const [cantripSelections, setCantripSelections] = useState<string[]>(Array(cantripsCount).fill(''));
  const [level1Selections, setLevel1Selections]   = useState<string[]>(Array(level1Count).fill(''));

  // reset when counts or class change
  useEffect(() => {
    setCantripSelections(Array(cantripsCount).fill(''));
    setLevel1Selections(Array(level1Count).fill(''));
  }, [cantripsCount, level1Count, className]);

  // bubble all changes up
  useEffect(() => {
    onChange({
      name: nameVal,
      age: ageVal,
      height: heightVal,
      weight: weightVal,
      hair,
      eyes,
      skin,
      gender,
      alignment: alignmentChoice,
      backstory,
      spellsKnown: {
        cantrips: cantripSelections.filter((s) => s),
        level1: level1Selections.filter((s) => s),
      },
    });
  }, [
    nameVal,
    ageVal,
    heightVal,
    weightVal,
    hair,
    eyes,
    skin,
    gender,
    alignmentChoice,
    backstory,
    cantripSelections.join('|'),
    level1Selections.join('|'),
    onChange,
  ]);

  function handleFileUpload(ev: ChangeEvent<HTMLInputElement>) {
    const file = ev.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setBackstory(reader.result as string);
    reader.readAsText(file);
  }

  return (
    <div className="absolute inset-x-0 top-12 bottom-0 flex">
      {/* LEFT SIDEBAR */}
      <aside className="w-1/6 flex flex-col bg-black/40 backdrop-blur p-4 space-y-3 overflow-y-auto text-white">
        <button
          onClick={handleRandomize}
          className="mb-2 rounded bg-indigo-600 px-3 py-1 text-sm hover:bg-indigo-500"
        >
          Randomize ▶
        </button>

        <label className="text-sm font-medium">Name</label>
        <input
          type="text"
          value={nameVal}
          onChange={(e) => setNameVal(e.target.value)}
          className="w-full rounded bg-gray-800 px-2 py-1 text-sm"
        />

        <label className="text-sm font-medium">Age</label>
        <input
          type="text"
          value={ageVal}
          onChange={(e) => setAgeVal(e.target.value)}
          className="w-full rounded bg-gray-800 px-2 py-1 text-sm"
        />

        <label className="text-sm font-medium">Height</label>
        <input
          type="text"
          value={heightVal}
          onChange={(e) => setHeightVal(e.target.value)}
          className="w-full rounded bg-gray-800 px-2 py-1 text-sm"
        />

        <label className="text-sm font-medium">Weight</label>
        <input
          type="text"
          value={weightVal}
          onChange={(e) => setWeightVal(e.target.value)}
          className="w-full rounded bg-gray-800 px-2 py-1 text-sm"
        />

        <label className="text-sm font-medium">Hair</label>
        <input
          type="text"
          value={hair}
          onChange={(e) => setHair(e.target.value)}
          className="w-full rounded bg-gray-800 px-2 py-1 text-sm"
        />

        <label className="text-sm font-medium">Eyes</label>
        <input
          type="text"
          value={eyes}
          onChange={(e) => setEyes(e.target.value)}
          className="w-full rounded bg-gray-800 px-2 py-1 text-sm"
        />

        <label className="text-sm font-medium">Skin</label>
        <input
          type="text"
          value={skin}
          onChange={(e) => setSkin(e.target.value)}
          className="w-full rounded bg-gray-800 px-2 py-1 text-sm"
        />

        <label className="text-sm font-medium">Gender</label>
        <input
          type="text"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full rounded bg-gray-800 px-2 py-1 text-sm"
        />

        <label className="block mb-2 text-sm font-medium text-gray-200">
          Alignment
          <select
            value={alignmentChoice}
            onChange={(e) => setAlignmentChoice(e.target.value)}
            className="mt-1 block w-full rounded bg-gray-800 p-2 text-white"
          >
            <option value="" disabled>Select alignment…</option>
            {alignments.map((al) => (
              <option key={al} value={al}>{al}</option>
            ))}
          </select>
        </label>
      </aside>

      {/* MAIN: Backstory & Instructions */}
      <section className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto p-6 text-white">
          <h2 className="text-lg font-semibold mb-2">Backstory (optional)</h2>
          <textarea
            rows={6}
            value={backstory}
            onChange={(e) => setBackstory(e.target.value)}
            className="w-full rounded bg-gray-800 p-2 text-sm"
            placeholder="Write or upload a backstory…"
          />
          <div className="mt-2">
            <input
              type="file"
              accept=".txt,.md"
              onChange={handleFileUpload}
              className="text-sm text-gray-300"
            />
          </div>

          <div className="mt-6">
            <h3 className="font-semibold">Starting Spells</h3>
            <p className="text-xs text-gray-400 mt-1">
              Pick {cantripsCount} cantrip{cantripsCount !== 1 ? 's' : ''} and {level1Count} 1st-level spell{level1Count !== 1 ? 's' : ''}.
            </p>
          </div>
        </div>

        {/* NAV */}
        <div className="flex justify-between bg-black/50 p-6">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 text-white"
          >
            Back
          </button>
          <button
            onClick={onNext}
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-500 text-white"
          >
            Next
          </button>
        </div>
      </section>

      {/* RIGHT SIDEBAR: Spell Dropdowns */}
      <aside className="w-1/6 flex flex-col bg-black/40 backdrop-blur p-4 space-y-4 overflow-y-auto text-white">
        {/* Cantrips */}
        {cantripsCount > 0 && (
          <div>
            <h4 className="font-medium">Cantrips ({cantripsCount})</h4>
            {cantripSelections.map((sel, idx) => (
              <select
                key={`cantrip-${idx}`}
                value={sel}
                onChange={(e) => {
                  const copy = [...cantripSelections];
                  copy[idx] = e.target.value;
                  setCantripSelections(copy);
                }}
                className="w-full rounded bg-gray-800 px-2 py-1 text-sm"
              >
                <option value="" disabled>Select cantrip…</option>
                {availableCantrips.map((sp) => (
                  <option key={sp.name} value={sp.name} title={sp.description}>
                    {sp.name}
                  </option>
                ))}
              </select>
            ))}
          </div>
        )}

        {/* 1st-Level */}
        {level1Count > 0 && (
          <div>
            <h4 className="font-medium">1st-Level ({level1Count})</h4>
            {level1Selections.map((sel, idx) => (
              <select
                key={`lvl1-${idx}`}
                value={sel}
                onChange={(e) => {
                  const copy = [...level1Selections];
                  copy[idx] = e.target.value;
                  setLevel1Selections(copy);
                }}
                className="w-full rounded bg-gray-800 px-2 py-1 text-sm"
              >
                <option value="" disabled>Select spell…</option>
                {availableLevel1.map((sp) => (
                  <option key={sp.name} value={sp.name} title={sp.description}>
                    {sp.name}
                  </option>
                ))}
              </select>
            ))}
          </div>
        )}
      </aside>
    </div>
  );
}
