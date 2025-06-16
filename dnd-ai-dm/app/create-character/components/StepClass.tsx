// app/create-character/components/StepClass.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { classData, type ClassOption } from '@/lib/data/classData';
import {
  simpleWeapons,
  simpleMeleeWeapons,
  martialWeapons,
  martialMeleeWeapons,
} from '@/lib/data/weaponData';
import { Character } from '../page';

interface StepClassProps {
  data: {
    className?: string;
    skills?: string[];
    equipment?: string[];
    favoredTerrain?: string;
    favoredEnemy?: string;
  };
  onChange: (updates: Partial<Pick<
    Character,
    'className' | 'skills' | 'equipment' | 'favoredTerrain' | 'favoredEnemy'
  >>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepClass({
  data,
  onChange,
  onNext,
  onBack,
}: StepClassProps) {
  // ─────── CLASS SELECTION ───────
  const [selectedClass, setSelectedClass] = useState<string>(
    data.className || ''
  );
  const current = classData.find((c) => c.name === selectedClass);

  // ─────── SKILLS ───────


  // ─────── ARMOR ───────
  const [chosenArmor, setChosenArmor] = useState<string>('');
  const [armorSingleDetail, setArmorSingleDetail] = useState<string>('');
  const [armorDualDetail, setArmorDualDetail] = useState<[string, string]>([
    '',
    '',
  ]);

  // ─────── WEAPONS ───────
  const [chosenWeapons, setChosenWeapons] = useState<string>('');
  const [weaponSingleDetail, setWeaponSingleDetail] = useState<string>('');
  const [weaponDualDetail, setWeaponDualDetail] = useState<[string, string]>([
    '',
    '',
  ]);

  // ─────── RANGER EXTRAS ───────
  const [favoredTerrain, setFavoredTerrain] = useState<string>(
    data.favoredTerrain || ''
  );
  const [favoredEnemy, setFavoredEnemy] = useState<string>(
    data.favoredEnemy || ''
  );

  // list scrolling
  const listRef = useRef<HTMLUListElement>(null);
  const scrollBy = (dy: number) =>
    listRef.current?.scrollBy({ top: dy, behavior: 'smooth' });

  // whenever the parent `data.className` changes (e.g. going Back → Re‐render)
  useEffect(() => {
    setSelectedClass(data.className || '');
  }, [data.className]);

  // push a change up to parent
  function selectClass(cls: ClassOption) {
    setSelectedClass(cls.name);
    // reset all dependent choices:
    const resetSkills: string[] = [];
    setChosenArmor('');
    setArmorSingleDetail('');
    setArmorDualDetail(['', '']);
    setChosenWeapons('');
    setWeaponSingleDetail('');
    setWeaponDualDetail(['', '']);
    setFavoredTerrain('');
    setFavoredEnemy('');

    // inform parent
    onChange({
      className: cls.name,
      skills: resetSkills,
      equipment: cls.defaultGear, // start with just the defaults
      favoredTerrain: undefined,
      favoredEnemy: undefined,
    });
  }

  // build the full equipment array and push up
  function updateEquipment() {
    if (!current) return;
    const eq: string[] = [];
    // 1) default gear
    eq.push(...current.defaultGear);

    // 2) armor choice
    if (chosenArmor) {
      // single‐detail or dual
      if (armorSingleDetail) {
        eq.push(`${chosenArmor}: ${armorSingleDetail}`);
      } else if (armorDualDetail.some((d) => d)) {
        eq.push(...armorDualDetail.filter(Boolean));
      } else {
        eq.push(chosenArmor);
      }
    }

    // 3) weapon choice
    if (chosenWeapons) {
      if (weaponSingleDetail) {
        eq.push(`${chosenWeapons}: ${weaponSingleDetail}`);
      } else if (weaponDualDetail.some((d) => d)) {
        eq.push(...weaponDualDetail.filter(Boolean));
      } else {
        eq.push(chosenWeapons);
      }
    }

    onChange({ equipment: eq });
  }

  function pickArmor(opt: string) {
    setChosenArmor(opt);
    setArmorSingleDetail('');
    setArmorDualDetail(['', '']);
    onChange({});            // placeholder so React batches
    setTimeout(updateEquipment, 0);
  }
  function pickArmorSingleDetail(detail: string) {
    setArmorSingleDetail(detail);
    setArmorDualDetail(['', '']);
    onChange({});
    setTimeout(updateEquipment, 0);
  }
  function pickArmorDualDetail(idx: 0 | 1, detail: string) {
    const copy: [string, string] = [...armorDualDetail];
    copy[idx] = detail;
    setArmorDualDetail(copy);
    setArmorSingleDetail('');
    onChange({});
    setTimeout(updateEquipment, 0);
  }

  function pickWeapons(opt: string) {
    setChosenWeapons(opt);
    setWeaponSingleDetail('');
    setWeaponDualDetail(['', '']);
    onChange({});
    setTimeout(updateEquipment, 0);
  }
  function pickWeaponSingleDetail(detail: string) {
    setWeaponSingleDetail(detail);
    setWeaponDualDetail(['', '']);
    onChange({});
    setTimeout(updateEquipment, 0);
  }
  function pickWeaponDualDetail(idx: 0 | 1, detail: string) {
    const copy: [string, string] = [...weaponDualDetail];
    copy[idx] = detail;
    setWeaponDualDetail(copy);
    setWeaponSingleDetail('');
    onChange({});
    setTimeout(updateEquipment, 0);
  }

  function pickTerrain(t: string) {
    setFavoredTerrain(t);
    onChange({ favoredTerrain: t });
  }
  function pickEnemy(e: string) {
    setFavoredEnemy(e);
    onChange({ favoredEnemy: e });
  }

  return (
    <div className="absolute inset-x-0 top-12 bottom-0 flex overflow-hidden">
      {/* ─── LEFT: class icons ─── */}
      <aside className="w-1/6 bg-black/40 backdrop-blur p-2 flex flex-col items-center">
        <button
          onClick={() => scrollBy(-200)}
          className="pb-2 text-gray-400 hover:text-white"
        >
          ▲
        </button>
        <ul ref={listRef} className="flex-1 w-full overflow-y-auto space-y-2">
          {classData.map((cls) => (
            <li key={cls.name} className="flex justify-center">
              <button
                onClick={() => selectClass(cls)}
                aria-label={cls.name}
                className={`relative w-3/4 aspect-square overflow-hidden rounded-lg transition
                  ${
                    selectedClass === cls.name
                      ? 'ring-2 ring-blue-400'
                      : 'hover:ring-2 hover:ring-gray-500'
                  }`}
              >
                <Image
                  src={cls.emblem}
                  alt={`${cls.name} emblem`}
                  fill
                  className="object-contain"
                />
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => scrollBy(200)}
          className="pt-2 text-gray-400 hover:text-white"
        >
          ▼
        </button>
      </aside>

      {/* ─── CENTER: art & description ─── */}
      <section className="flex-1 relative overflow-hidden">
        {!current ? (
          <div className="flex h-full items-center justify-center text-gray-500">
            Select a class from the left
          </div>
        ) : (
          <>
            <img
              src={current.image}
              alt={current.name}
              className="absolute inset-0 w-full h-full object-contain"
            />

            <div className="absolute left-0 w-5/6 bottom-20 p-6 bg-black/00 text-white h-64 overflow-hidden">
              <h2 className="text-3xl font-bold mb-2">{current.name}</h2>
              <div className="mb-4 text-sm">{current.description}</div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <strong>Hit Die</strong>
                  <p>{current.hitDie}</p>
                </div>
                <div>
                  <strong>Saving Throws</strong>
                  <p>{current.savingThrows.join(', ')}</p>
                </div>
                <div>
                  <strong>Proficiencies</strong>
                  <p>{current.proficiencies.join(', ')}</p>
                </div>
              </div>
            </div>

            {/* ─── RIGHT SIDEBAR ─── */}
            <aside className="absolute top-0 right-0 bottom-0 w-1/6 bg-black/40 backdrop-blur p-4 overflow-hidden">
              <hr className="border-gray-600 my-4" />
              <h3 className="text-lg font-bold text-white mb-3">Starting Gear</h3>
              <p className="text-sm font-semibold text-gray-300">Primary</p>
              {current.gearChoices.armor.map((opt) => (
                <div key={opt} className="mb-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="armor"
                      value={opt}
                      checked={chosenArmor === opt}
                      onChange={() => pickArmor(opt!)}
                      className="h-4 w-4 accent-indigo-500"
                    />
                    <span className="text-white">{opt}</span>
                  </label>
                  {opt === 'Any Martial Melee Weapon' &&
                    chosenArmor === opt && (
                      <select
                        value={armorSingleDetail}
                        onChange={(e) =>
                          pickArmorSingleDetail(e.target.value)
                        }
                        className="mt-1 w-full rounded bg-gray-800 px-2 py-1 text-white text-sm"
                      >
                        <option value="" disabled>
                          -- choose a martial melee weapon --
                        </option>
                        {martialMeleeWeapons.map((w) => (
                          <option key={w} value={w}>
                            {w}
                          </option>
                        ))}
                      </select>
                    )}
                  {opt === 'Martial Weapon + Shield' &&
                    chosenArmor === opt && (
                      <select
                        value={armorSingleDetail}
                        onChange={(e) =>
                          pickArmorSingleDetail(e.target.value)
                        }
                        className="mt-1 w-full rounded bg-gray-800 px-2 py-1 text-white text-sm"
                      >
                        <option value="" disabled>
                          -- choose a martial weapon --
                        </option>
                        {martialWeapons.map((w) => (
                          <option key={w} value={w}>
                            {w}
                          </option>
                        ))}
                      </select>
                    )}
                  {opt === 'Two Martial Weapons' &&
                    chosenArmor === opt && (
                      <div className="mt-1 space-y-1">
                        {[0, 1].map((i) => (
                          <select
                            key={i}
                            value={armorDualDetail[i]}
                            onChange={(e) =>
                              pickArmorDualDetail(i as 0 | 1, e.target.value)
                            }
                            className="w-full rounded bg-gray-800 px-2 py-1 text-white text-sm"
                          >
                            <option value="" disabled>
                              {i === 0
                                ? '-- first martial weapon --'
                                : '-- second martial weapon --'}
                            </option>
                            {martialWeapons.map((w) => (
                              <option key={w} value={w}>
                                {w}
                              </option>
                            ))}
                          </select>
                        ))}
                      </div>
                    )}
                </div>
              ))}

              <p className="mt-4 text-sm font-semibold text-gray-300">Secondary</p>
              {current.gearChoices.weapons.map((opt) => (
                <div key={opt} className="mb-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="weapons"
                      value={opt}
                      checked={chosenWeapons === opt}
                      onChange={() => pickWeapons(opt!)}
                      className="h-4 w-4 accent-indigo-500"
                    />
                    <span className="text-white">{opt}</span>
                  </label>
                  {opt === 'Any Simple Weapon' &&
                    chosenWeapons === opt && (
                      <select
                        value={weaponSingleDetail}
                        onChange={(e) =>
                          pickWeaponSingleDetail(e.target.value)
                        }
                        className="mt-1 w-full rounded bg-gray-800 px-2 py-1 text-white text-sm"
                      >
                        <option value="" disabled>
                          -- choose a simple weapon --
                        </option>
                        {simpleWeapons.map((w) => (
                          <option key={w} value={w}>
                            {w}
                          </option>
                        ))}
                      </select>
                    )}
                  {opt === 'Any Simple Melee Weapon' &&
                    chosenWeapons === opt && (
                      <select
                        value={weaponSingleDetail}
                        onChange={(e) =>
                          pickWeaponSingleDetail(e.target.value)
                        }
                        className="mt-1 w-full rounded bg-gray-800 px-2 py-1 text-white text-sm"
                      >
                        <option value="" disabled>
                          -- choose a simple melee weapon --
                        </option>
                        {simpleMeleeWeapons.map((w) => (
                          <option key={w} value={w}>
                            {w}
                          </option>
                        ))}
                      </select>
                    )}
                  {opt === 'Two Simple Melee Weapons' &&
                    chosenWeapons === opt && (
                      <div className="mt-1 space-y-1">
                        {[0, 1].map((i) => (
                          <select
                            key={i}
                            value={weaponDualDetail[i]}
                            onChange={(e) =>
                              pickWeaponDualDetail(i as 0 | 1, e.target.value)
                            }
                            className="w-full rounded bg-gray-800 px-2 py-1 text-white text-sm"
                          >
                            <option value="" disabled>
                              {i === 0
                                ? '-- first simple melee --'
                                : '-- second simple melee --'}
                            </option>
                            {simpleMeleeWeapons.map((w) => (
                              <option key={w} value={w}>
                                {w}
                              </option>
                            ))}
                          </select>
                        ))}
                      </div>
                    )}
                  {opt === 'Martial Weapon + Shield' &&
                    chosenWeapons === opt && (
                      <select
                        value={weaponSingleDetail}
                        onChange={(e) =>
                          pickWeaponSingleDetail(e.target.value)
                        }
                        className="mt-1 w-full rounded bg-gray-800 px-2 py-1 text-white text-sm"
                      >
                        <option value="" disabled>
                          -- choose a martial weapon --  
                        </option>
                        {martialWeapons.map((w) => (
                          <option key={w} value={w}>
                            {w}
                          </option>
                        ))}
                      </select>
                    )}
                  {opt === 'Two Martial Weapons' &&
                    chosenWeapons === opt && (
                      <div className="mt-1 space-y-1">
                        {[0, 1].map((i) => (
                          <select
                            key={i}
                            value={weaponDualDetail[i]}
                            onChange={(e) =>
                              pickWeaponDualDetail(i as 0 | 1, e.target.value)
                            }
                            className="w-full rounded bg-gray-800 px-2 py-1 text-white text-sm"
                          >
                            <option value="" disabled>
                              {i === 0
                                ? '-- first martial weapon --'
                                : '-- second martial weapon --'}
                            </option>
                            {martialWeapons.map((w) => (
                              <option key={w} value={w}>
                                {w}
                              </option>
                            ))}
                          </select>
                        ))}
                      </div>
                    )}
                </div>
              ))}

              <div className="mt-4 text-white text-sm">
                <strong>Always Starts With:</strong>
                <ul className="list-disc list-inside mt-1">
                  {current.defaultGear.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Ranger only */}
              {current.name === 'Ranger' && (
                <>
                  <hr className="border-gray-600 my-4" />
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-300">Favored Terrain</p>
                    <select
                      value={favoredTerrain}
                      onChange={(e) => pickTerrain(e.target.value)}
                      className="mt-1 w-full rounded bg-gray-800 px-2 py-1 text-white text-sm"
                    >
                      <option value="" disabled>
                        -- choose terrain --
                      </option>
                      {current.favoredTerrains?.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-300">Favored Enemy</p>
                    <select
                      value={favoredEnemy}
                      onChange={(e) => pickEnemy(e.target.value)}
                      className="mt-1 w-full rounded bg-gray-800 px-2 py-1 text-white text-sm"
                    >
                      <option value="" disabled>
                        -- choose enemy --
                      </option>
                      {current.favoredEnemies?.map((e) => (
                        <option key={e} value={e}>
                          {e}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </aside>
          </>
        )}

        {/* ─── NAVIGATION: Back & Next ─── */}
        <div className="absolute bottom-0 left-0 w-5/6 bg-black/0 p-6 flex justify-between">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 text-white"
          >
            Back
          </button>
          <button
            onClick={onNext}
            disabled={
              !current ||
              !chosenArmor ||
              ((chosenArmor === 'Any Martial Melee Weapon' ||
                chosenArmor === 'Martial Weapon + Shield') &&
                !armorSingleDetail) ||
              (chosenArmor === 'Two Martial Weapons' &&
                armorDualDetail.some((x) => x === '')) ||
              !chosenWeapons ||
              ((chosenWeapons === 'Any Simple Weapon' ||
                chosenWeapons === 'Any Simple Melee Weapon' ||
                chosenWeapons === 'Martial Weapon + Shield') &&
                !weaponSingleDetail) ||
              (chosenWeapons === 'Two Simple Melee Weapons' &&
                weaponDualDetail.some((x) => x === '')) ||
              (chosenWeapons === 'Two Martial Weapons' &&
                weaponDualDetail.some((x) => x === '')) ||
              (current.name === 'Ranger' && (!favoredTerrain || !favoredEnemy))
            }
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-500 disabled:opacity-50 text-white"
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
}
