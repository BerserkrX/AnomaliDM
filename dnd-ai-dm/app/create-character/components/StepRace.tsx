'use client';

import { useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import { raceData, RaceOption, SubraceOption } from '@/lib/data/raceData';
import { allLanguages } from '@/lib/data/languages';
import type { Character } from '../page';

interface StepRaceProps {
  data: Character;
  onChange: (updates: Partial<Character>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepRace({
  data,
  onChange,
  onNext,
  onBack,
}: StepRaceProps) {
  // Base six stats
  const BASE_STATS = { STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 };

  const [selectedRace, setSelectedRace] = useState<string>(data.race || '');
  const [selectedSubrace, setSelectedSubrace] = useState<string>(
    data.subrace || ''
  );

  // Track only the “extra” languages chosen here
  const [chosenExtra, setChosenExtra] = useState<string[]>(() => {
    if (!data.languages?.length || !data.race) return [];
    // slice off the base count
    const r = raceData.find((r) => r.name === data.race)!;
    const baseCount =
      r.languages.length +
      (r.subraces && data.subrace
        ? r.subraces.find((s) => s.name === data.subrace)?.extraLanguageCount ||
          0
        : r.extraLanguageCount || 0);
    return data.languages.slice(baseCount);
  });

  // for scrolling the race list
  const listRef = useRef<HTMLUListElement>(null);
  const scrollUp = () =>
    listRef.current?.scrollBy({ top: -200, behavior: 'smooth' });
  const scrollDown = () =>
    listRef.current?.scrollBy({ top: +200, behavior: 'smooth' });

  const race = useMemo<RaceOption | undefined>(
    () => raceData.find((r) => r.name === selectedRace),
    [selectedRace]
  );
  const subraces = race?.subraces || [];
  const subraceObj = useMemo<SubraceOption | undefined>(
    () => subraces.find((s) => s.name === selectedSubrace),
    [selectedSubrace, subraces]
  );

  // how many extras allowed
  const allowedExtraCount = useMemo(() => {
    if (subraces.length) {
      return subraceObj?.extraLanguageCount || 0;
    }
    return race?.extraLanguageCount || 0;
  }, [race, subraces, subraceObj]);

  // stable copy of the base langs
  const raceBaseLanguages = race?.languages || [];

  // helper: apply a modifiers map onto a fresh base‐stats
  function applyMods(
    base: typeof BASE_STATS,
    mods: Record<string, number>
  ): typeof BASE_STATS {
    const out: any = { ...base };
    for (const [k, v] of Object.entries(mods)) {
      out[k] = (out[k] || 10) + v;
    }
    return out;
  }

  function chooseRace(r: RaceOption) {
    setSelectedRace(r.name);
    setSelectedSubrace('');
    setChosenExtra([]);

    // write race, blank subrace, carry only raw modifiers + langs
    onChange({
      race: r.name,
      subrace: undefined,
      modifiers: r.modifiers,
      languages: [...r.languages],
    });
  }

  function chooseSubrace(s: SubraceOption) {
    if (!race) return;
    setSelectedSubrace(s.name);
    setChosenExtra([]);

    // combine race.mods + subrace.mods
    const combined = { ...race.modifiers };
    for (const [st, v] of Object.entries(s.modifiers)) {
      combined[st] = (combined[st] || 0) + v;
    }

    onChange({
      subrace: s.name,
      modifiers: combined,
      // still only base langs here
      languages: [...race.languages],
    });
  }

  function setExtraLanguageAt(idx: number, lang: string) {
    const extras = [...chosenExtra];
    extras[idx] = lang;
    setChosenExtra(extras);

    onChange({
      languages: [...raceBaseLanguages, ...extras],
    });
  }

 // ─────── RENDER ───────
  return (
    <div className="absolute inset-x-0 top-12 bottom-0 flex">
      {/* ─── LEFT SIDEBAR: Race Icons ─── */}
      <aside className="w-1/6 flex flex-col items-center bg-black/40 backdrop-blur p-2">
        <button onClick={scrollUp} className="text-gray-400 hover:text-white pb-2" aria-label="↑">
          ▲
        </button>

        <ul
          ref={listRef}
          className="flex-1 w-full overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-600"
        >
          {raceData.map((r) => (
            <li key={r.name} className="flex justify-center">
              <button
                onClick={() => chooseRace(r)}
                aria-label={r.name}
                className={`relative w-3/4 aspect-square overflow-hidden rounded-lg transition ${
                  selectedRace === r.name
                    ? 'ring-2 ring-blue-400'
                    : 'ring-0 hover:ring-2 hover:ring-gray-500'
                }`}
              >
                <Image src={r.emblem} alt={`${r.name} emblem`} fill className="object-contain" />
              </button>
            </li>
          ))}
        </ul>

        <button onClick={scrollDown} className="text-gray-400 hover:text-white pt-2" aria-label="↓">
          ▼
        </button>
      </aside>

      {/* ─── MAIN CANVAS: Race Art + Subraces + Language Pickers + Overlays ─── */}
      <section className="flex-1 relative overflow-hidden">
        {!race ? (
          <div className="flex h-full items-center justify-center text-gray-500">
            Select a race from the left
          </div>
        ) : (
          <>
            {/* Full-screen race image */}
            <img
              src={race.image}
              alt={race.name}
              className="absolute inset-0 w-full h-full object-contain"
            />

            {/* ─── RIGHT SIDEBAR: Subrace Icons + Known + Extra Languages ─── */}
            <aside className="absolute top-0 right-0 bottom-0 w-1/6 flex flex-col bg-black/40 backdrop-blur p-2 overflow-y-auto">
              <h2 className="text-xl font-bold text-white mb-4">{race.name}</h2>

              {/* 1) Subraces, if any */}
              {subraces.length > 0 && (
                <>
                  <p className="text-gray-300 mb-2">Subraces</p>
                  <ul className="space-y-2 mb-4">
                    {subraces.map((s) => (
                      <li key={s.name} className="flex justify-center">
                        <button
                          onClick={() => chooseSubrace(s)}
                          aria-label={s.name}
                          className={`aspect-square w-3/4 flex items-center justify-center p-2 rounded-lg transition ${
                            selectedSubrace === s.name
                              ? 'bg-purple-600 text-white ring-2 ring-purple-400'
                              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                          }`}
                        >
                          {s.emblem ? (
                            <Image 
                            src={s.emblem} 
                            alt={`${s.name} emblem`} 
                            width={120} height={120}
                            className="object-contain" 
                            />
                          ) : (
                            <span className="text-sm">{s.name}</span>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* 2) Show race‐base Known Languages */}
              <div className="mb-4 text-white text-sm">
                <p className="font-semibold">Known Languages:</p>
                <p className="italic">{race.languages.join(', ')}</p>
              </div>

              {/* 3) Extra‐language dropdowns */}
              {allowedExtraCount > 0 && (
                <div className="mb-4">
                  <p className="font-semibold text-white">
                    Choose {allowedExtraCount} Extra Language
                    {allowedExtraCount > 1 ? 's' : ''}
                  </p>
                  {Array.from({ length: allowedExtraCount }).map((_, idx) => {
                    // Build set of alreadyPicked = raceBaseLanguages + other chosenExtra
                    const alreadyPicked = new Set<string>([
                      ...raceBaseLanguages,
                      ...chosenExtra.filter((_, i) => i !== idx),
                    ]);
                    // Filter out anything in alreadyPicked
                    const dropdownOpts = allLanguages.filter((lang) => !alreadyPicked.has(lang));

                    return (
                        <select
                        key={`raceLang-${idx}-${raceBaseLanguages.join(',')}`}
                        value={chosenExtra[idx] || ''}
                        onChange={(e) => setExtraLanguageAt(idx, e.target.value)}
                        className="mt-1 w-full rounded bg-gray-800 px-2 py-1 text-white text-sm"
                      >
                          <option value="" disabled>
                          -- pick a language --
                          </option>
                        {dropdownOpts.map((lang) => (
                          <option key={lang} value={lang}>
                            {lang}
                          </option>
                        ))}
                        </select>
                    );
                  })}
                </div>
              )}
            </aside>


            {/* ↓ race/subrace modifiers overlay */}
            <div className="absolute bottom-20 left-0 w-5/6 bg-black/30 p-6 text-white h-64 overflow-hidden">
              <h2 className="text-3xl font-bold mb-4">
                {race.name}
                {selectedSubrace ? `: ${selectedSubrace}` : ''}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-200 mb-4">
                {(data.modifiers ? Object.entries(data.modifiers) : []).map(
                  ([stat, bonus]) => (
                    <div key={stat}>
                      <strong>{stat}</strong>: {bonus >= 0 ? `+${bonus}` : bonus}
                    </div>
                  )
                )}
              </div>
            </div>


            {/* ← Back / Next */}
            <div className="absolute bottom-0 left-0 w-5/6 p-6 flex justify-between">
              <button
                onClick={onBack}
                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 text-white"
              >
                Back
              </button>
              <button
                onClick={onNext}
                disabled={
                  !race ||
                  (subraces.length > 0 && !selectedSubrace) ||
                  chosenExtra.filter((x) => x).length !== allowedExtraCount
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
