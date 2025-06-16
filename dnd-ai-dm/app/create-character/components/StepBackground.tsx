'use client';

import { useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import { backgroundData, BackgroundOption } from '@/lib/data/backgroundData';
import { classData } from '@/lib/data/classData';
import { allLanguages } from '@/lib/data/languages';

interface StepBackgroundProps {
  data: {
    background?: string;
    features?: string[];
    equipment?: string[];
    languages?: string[];
    personalityTrait?: string;
    ideal?: string;
    bond?: string;
    flaw?: string;
    className?: string;
    skills?: string[];
  };
  onChange: (updates: {
    background?: string;
    features?: string[];
    equipment?: string[];
    languages?: string[];
    personalityTrait?: string;
    ideal?: string;
    bond?: string;
    flaw?: string;
    skills?: string[];
  }) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepBackground({
  data,
  onChange,
  onNext,
  onBack,
}: StepBackgroundProps) {
  // ─────── STATE ───────
  const [selectedBg, setSelectedBg] = useState<string>(data.background || '');
  const [traitChoice, setTraitChoice] = useState<string>(
    data.personalityTrait || ''
  );
  const [idealChoice, setIdealChoice] = useState<string>(data.ideal || '');
  const [bondChoice, setBondChoice] = useState<string>(data.bond || '');
  const [flawChoice, setFlawChoice] = useState<string>(data.flaw || '');
  const [extraChosen, setExtraChosen] = useState<string[]>([]);



  // track class‐based skill picks here instead of StepClass
  const currentClass = classData.find((c) => c.name === data.className);
  const [chosenClassSkills, setChosenClassSkills] = useState<string[]>(data.skills || []);

  function toggleClassSkill(skill: string) {
    if (!currentClass) return;
    const has = chosenClassSkills.includes(skill);
    let next: string[];
    if (has) {
      next = chosenClassSkills.filter((s) => s !== skill);
    } else {
      if (chosenClassSkills.length >= currentClass.skillLimit) return;
      next = [...chosenClassSkills, skill];
    }
    setChosenClassSkills(next);
    onChange({ skills: next });
  }


  // (1) Sorted list of backgrounds for left sidebar
  const sortedBackgrounds = useMemo(
    () => backgroundData.slice().sort((a, b) => a.name.localeCompare(b.name)),
    []
  );
  // (2) Currently selected background
  const currentBg: BackgroundOption | undefined = useMemo(
    () => sortedBackgrounds.find((bg) => bg.name === selectedBg),
    [selectedBg, sortedBackgrounds]
  );

  // get the fixed grants from the BG
  const backgroundSkills = currentBg?.skills || [];

  // (3) Extra languages to pick
  const extraLangCount = currentBg?.languageCount || 0;

  // (4) Sidebar scrolling
  const listRef = useRef<HTMLUListElement>(null);
  const scrollUp = () =>
    listRef.current?.scrollBy({ top: -200, behavior: 'smooth' });
  const scrollDown = () =>
    listRef.current?.scrollBy({ top: 200, behavior: 'smooth' });

  // ─────── HANDLERS ───────
  function chooseBackground(bg: BackgroundOption) {
    setSelectedBg(bg.name);
    setTraitChoice('');
    setIdealChoice('');
    setBondChoice('');
    setFlawChoice('');
    setExtraChosen([]);
    onChange({
      background: bg.name,
      features: bg.features,
      equipment: bg.equipment,
      // leave data.languages untouched
    });
  }
  function pickTrait(t: string) {
    setTraitChoice(t);
    onChange({ personalityTrait: t });
  }
  function pickIdeal(i: string) {
    setIdealChoice(i);
    onChange({ ideal: i });
  }
  function pickBond(b: string) {
    setBondChoice(b);
    onChange({ bond: b });
  }
  function pickFlaw(f: string) {
    setFlawChoice(f);
    onChange({ flaw: f });
  }
  function setLanguageAt(idx: number, lang: string) {
    const copy = [...extraChosen];
    copy[idx] = lang;
    setExtraChosen(copy);
    onChange({ languages: [...baseKnown, ...copy] });
  }

  // baseKnown = race/subrace languages from StepRace
  const baseKnown: string[] = useMemo(() => data.languages || [], []);

  // ─────── RENDER ───────
  return (
    <div className="absolute inset-x-0 top-12 bottom-0 flex overflow-hidden">
      {/* ─── LEFT SIDEBAR: Background Icons ─── */}
      <aside className="w-1/6 flex flex-col items-center bg-black/40 backdrop-blur p-2">
        <button
          onClick={scrollUp}
          className="text-gray-400 hover:text-white pb-2"
          aria-label="Scroll up"
        >
          ▲
        </button>
        <ul
          ref={listRef}
          className="flex-1 w-full overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-600"
        >
          {sortedBackgrounds.map((bg) => (
            <li key={bg.name} className="flex justify-center">
              <button
                onClick={() => chooseBackground(bg)}
                aria-label={bg.name}
                className={`relative w-3/4 aspect-square overflow-hidden rounded-lg transition ${
                  selectedBg === bg.name
                    ? 'ring-2 ring-blue-400'
                    : 'ring-0 hover:ring-2 hover:ring-gray-500'
                }`}
              >
                <Image
                  src={bg.emblem}
                  alt={`${bg.name} emblem`}
                  fill
                  className="object-contain"
                />
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={scrollDown}
          className="text-gray-400 hover:text-white pt-2"
          aria-label="Scroll down"
        >
          ▼
        </button>
      </aside>

      {/* ─── MAIN CANVAS: Background Art + Right Sidebar + Footer ─── */}
      <section className="flex-1 relative overflow-hidden">
        {!currentBg ? (
          <div className="flex h-full items-center justify-center text-gray-500">
            Select a background from the left
          </div>
        ) : (
          <>
            {/* full-screen art */}
            <img
              src={currentBg.image}
              alt={currentBg.name}
              className="absolute inset-0 w-full h-full object-contain"
            />

            {/* right sidebar (traits, languages) */}
            <aside className="absolute top-0 right-0 bottom-0 w-1/6 flex flex-col bg-black/40 backdrop-blur p-4 overflow-y-auto">
              <h2 className="text-xl font-bold text-white mb-4">
                {currentBg.name}
              </h2>

              {/* ── Background Skills (granted) ── */}
              <div className="mb-4">
                <h3 className="font-semibold text-white">Background Skills</h3>
                <ul className="list-disc list-inside text-sm text-gray-200">
                  {backgroundSkills.map((sk) => (
                    <li key={sk}>{sk}</li>
                  ))}
                </ul>
              </div>

              {/* ── Class Skills ── */}
              {currentClass && (
                <div className="mb-4">
                  <h3 className="font-semibold text-white">
                    Class Skills (choose up to {currentClass.skillLimit})
                  </h3>
                  {currentClass.skillChoices.map((sk) => {
                    const disabled =
                      (!chosenClassSkills.includes(sk) &&
                      chosenClassSkills.length >= currentClass.skillLimit) ||
                      backgroundSkills.includes(sk);
                    return (
                      <label key={sk} className="flex items-center space-x-2 mb-1">
                        <input
                          type="checkbox"
                          checked={chosenClassSkills.includes(sk)}
                          disabled={disabled}
                          onChange={() => toggleClassSkill(sk)}
                          className="h-4 w-4 accent-indigo-500"
                        />
                        <span className={disabled ? 'text-gray-400' : 'text-white'}>
                          {sk}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}

              {/* trait */}
              <div className="mb-4">
                <label
                  htmlFor="trait-select"
                  className="block font-semibold text-white"
                >
                  Personality Trait
                </label>
                <select
                  id="trait-select"
                  value={traitChoice}
                  onChange={(e) => pickTrait(e.target.value)}
                  className="mt-1 w-full rounded bg-gray-800 px-2 py-1 text-white text-sm"
                >
                  <option value="">-- choose or skip --</option>
                  {currentBg.personalityTraits.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* ideal */}
              <div className="mb-4">
                <label
                  htmlFor="ideal-select"
                  className="block font-semibold text-white"
                >
                  Ideal
                </label>
                <select
                  id="ideal-select"
                  value={idealChoice}
                  onChange={(e) => pickIdeal(e.target.value)}
                  className="mt-1 w-full rounded bg-gray-800 px-2 py-1 text-white text-sm"
                >
                  <option value="">-- choose or skip --</option>
                  {currentBg.ideals.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>

              {/* bond */}
              <div className="mb-4">
                <label
                  htmlFor="bond-select"
                  className="block font-semibold text-white"
                >
                  Bond
                </label>
                <select
                  id="bond-select"
                  value={bondChoice}
                  onChange={(e) => pickBond(e.target.value)}
                  className="mt-1 w-full rounded bg-gray-800 px-2 py-1 text-white text-sm"
                >
                  <option value="">-- choose or skip --</option>
                  {currentBg.bonds.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* flaw */}
              <div className="mb-4">
                <label
                  htmlFor="flaw-select"
                  className="block font-semibold text-white"
                >
                  Flaw
                </label>
                <select
                  id="flaw-select"
                  value={flawChoice}
                  onChange={(e) => pickFlaw(e.target.value)}
                  className="mt-1 w-full rounded bg-gray-800 px-2 py-1 text-white text-sm"
                >
                  <option value="">-- choose or skip --</option>
                  {currentBg.flaws.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>

              {/* languages (required) */}
              <div className="mb-4">
                <label className="block font-semibold text-white">
                  Languages *
                </label>
                <p className="text-xs text-gray-400 mb-2">
                  Pick exactly {extraLangCount}
                </p>
                {Array.from({ length: extraLangCount }).map((_, idx) => {
                  const already = new Set<string>([
                    ...baseKnown,
                    ...extraChosen.filter((_, i) => i !== idx),
                  ]);
                  const opts = allLanguages.filter((lang) => !already.has(lang));
                  return (
                    <select
                      key={`bgLang-${idx}-${extraChosen[idx] || ''}`}
                      value={extraChosen[idx] || ''}
                      onChange={(e) => setLanguageAt(idx, e.target.value)}
                      className="mt-1 w-full rounded bg-gray-800 px-2 py-1 text-white text-sm"
                    >
                      <option value="" disabled>
                        -- choose a language --
                      </option>
                      {opts.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>
                  );
                })}
              </div>
            </aside>

            {/* bottom overlay: features & equipment */}
            <div className="absolute left-0 w-5/6 bg-black/30 p-6 text-white h-64 bottom-20 overflow-hidden">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold">Features</h4>
                  <ul className="list-disc list-inside">
                    {currentBg.features.map((ft) => (
                      <li key={ft}>{ft}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold">Equipment</h4>
                  <ul className="list-disc list-inside">
                    {currentBg.equipment.map((eq) => (
                      <li key={eq}>{eq}</li>
                    ))}
                  </ul>
                </div>
                <div />
                <div />
              </div>
            </div>

            {/* bottom navbar */}
            <div className="absolute bottom-0 left-0 w-5/6 bg-transparent p-6 flex justify-between">
              <button
                onClick={onBack}
                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 text-white"
              >
                Back
              </button>
              <button
                onClick={onNext}
                disabled={
                  !currentBg || extraChosen.filter((x) => x).length !== extraLangCount
                }
                className="px-4 py-2 bg-green-600 rounded hover:bg-green-500 disabled:opacity-50 text-white"
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
