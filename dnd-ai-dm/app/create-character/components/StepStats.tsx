'use client';

import { useState, useRef, useMemo, useEffect } from 'react';
import Lottie from 'lottie-react';
import { Character } from '@/app/create-character/page'; // adjust path as needed

interface StepStatsProps {
  data: Character;
  onChange: (updates: Partial<Character>) => void;
  onNext: () => void;
  onBack: () => void;
}

const methods = ['Standard Array', 'Point Buy', 'Dice Roll'] as const;
type Method = typeof methods[number];
const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];
const POINT_BUY_POINTS = 27;
const COST_MAP: Record<number, number> = {
  8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9,
};
const STAT_KEYS = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'] as const;

function getModifier(n: number) {
  return Math.floor((n - 10) / 2);
}
function roll4d6dropLowest(): number {
  const rolls = Array.from({ length: 4 }, () => 1 + Math.floor(Math.random() * 6));
  rolls.sort((a, b) => a - b);
  return rolls.slice(1).reduce((sum, v) => sum + v, 0);
}

export default function StepStats({ data, onChange, onNext, onBack }: StepStatsProps) {
  // ─── INITIAL METHOD ───
  const initialMethod: Method =
    methods.find((m) => m === data.generationMethod) ?? methods[0];

  // ─── PER-METHOD ASSIGNED STATE ───
  const [assignedMap, setAssignedMap] = useState<Record<Method, Record<string, number>>>({
    'Standard Array': {},
    'Point Buy': {},
    'Dice Roll': {},
  });

  // ─── OTHER STATE ───
  const [method, setMethod] = useState<Method>(initialMethod);
  const [rolled, setRolled] = useState<number[]>(data.lastRolled ?? []);
  const [attempts, setAttempts] = useState(data.diceRollAttemptsUsed ?? 0);
  const [rolling, setRolling] = useState(false);
  const [animData, setAnimData] = useState<any>(null);

  // racial/subrace bonuses
  const bonus: Record<string, number> = data.modifiers ?? {};

  // pick out the assigned for the current method
  const assigned = assignedMap[method];

  // ─── DERIVED VALUES ───
  // final stats = assigned + bonus
  const totalStats = useMemo(() => {
    const out: Record<string, number> = {};
    STAT_KEYS.forEach((k) => {
      out[k] = (assigned[k] ?? 0) + (bonus[k] ?? 0);
    });
    return out;
  }, [assigned, bonus]);

  // Standard Array pool
  const availableSA = useMemo(
    () => STANDARD_ARRAY.filter((v) => !Object.values(assigned).includes(v)),
    [assigned]
  );

  // Point Buy budget
  const spentPB = useMemo(
    () =>
      STAT_KEYS.reduce((sum, k) => {
        const base = assigned[k] ?? 8;
        return sum + (COST_MAP[base] ?? 0);
      }, 0),
    [assigned]
  );
  const remainingPB = POINT_BUY_POINTS - spentPB;

  // ─── SCROLLING ───
  const listRef = useRef<HTMLUListElement>(null);
  const scrollBy = (dy: number) =>
    listRef.current?.scrollBy({ top: dy, behavior: 'smooth' });

  // ─── LOAD ANIMATION ───
  useEffect(() => {
    if (method === 'Dice Roll') {
      fetch('/animations/diceRoll.json')
        .then((r) => r.json())
        .then(setAnimData);
    }
  }, [method]);

  // ─── SYNC BACK TO PARENT ───
  const notifyParent = () => {
    onChange({
      generationMethod: method,
      stats: totalStats as Character['stats'],
      lastRolled: rolled,
      diceRollAttemptsUsed: attempts,
    });
  };
  useEffect(() => {
    notifyParent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignedMap, rolled, attempts, method]);

  // ─── HANDLERS ───
  function chooseMethod(m: Method) {
    setMethod(m);
    // note: we do NOT clear assignedMap[m], rolled, or attempts here
  }

  function handleDrop(e: React.DragEvent, key: string) {
    e.preventDefault();
    const v = Number(e.dataTransfer.getData('text/plain'));
    if (!isNaN(v)) {
      setAssignedMap((prev) => {
        const copy = { ...prev };
        copy[method] = { ...copy[method], [key]: v };
        return copy;
      });
      if (method === 'Dice Roll') {
        // remove one instance from dice pool
        setRolled((prev) => {
          const idx = prev.indexOf(v);
          if (idx >= 0) {
            const nxt = [...prev];
            nxt.splice(idx, 1);
            return nxt;
          }
          return prev;
        });
      }
    }
  }

  function removeAssigned(key: string) {
    setAssignedMap((prev) => {
      // shallow-copy the outer map…
      const copy = { ...prev };
      // …then *replace* this method’s nested object with a new one
      const nested = copy[method];
      const filteredEntries = Object.entries(nested).filter(
        ([k]) => k !== key
      );
      copy[method] = Object.fromEntries(filteredEntries);
      return copy;
    });

    // put the dice back if you’re in Dice Roll mode
    const val = assigned[key];
    if (method === 'Dice Roll' && val !== undefined) {
      setRolled((r) => [...r, val]);
    }
  }

  function changePB(key: string, delta: number) {
    const old = assigned[key] ?? 8;
    const nw = old + delta;
    if (nw < 8 || nw > 15) return;
    const costDelta = (COST_MAP[nw] ?? 0) - (COST_MAP[old] ?? 0);
    if (remainingPB - costDelta < 0) return;
    setAssignedMap((prev) => {
      const copy = { ...prev };
      copy['Point Buy'] = { ...copy['Point Buy'], [key]: nw };
      return copy;
    });
  }

  function doRoll() {
    if (attempts >= 3) return;
    setRolling(true);
    setTimeout(() => {
      const pool = Array.from({ length: 6 }, () => roll4d6dropLowest());
      setRolled(pool);
      setAttempts((a) => a + 1);
      setRolling(false);
    }, 1200);
  }

  // ─── RENDER ───
  return (
    <div className="absolute inset-x-0 top-12 bottom-0 flex overflow-hidden">
      {/* ─── METHOD SIDEBAR ─── */}
      <aside className="w-1/6 flex flex-col items-center bg-black/40 p-2">
        <button onClick={() => scrollBy(-200)} className="pb-2 text-gray-400 hover:text-white">
          ▲
        </button>
        <ul
          ref={listRef}
          className="flex-1 w-full overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-600"
        >
          {methods.map((m) => (
            <li key={m} className="flex justify-center">
              <button
                onClick={() => chooseMethod(m)}
                className={`w-3/4 px-2 py-1 rounded-lg text-center transition ${
                  method === m
                    ? 'bg-green-600 text-white ring-2 ring-green-400'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {m}
              </button>
            </li>
          ))}
        </ul>
        <button onClick={() => scrollBy(200)} className="pt-2 text-gray-400 hover:text-white">
          ▼
        </button>
      </aside>

      {/* ─── MAIN PANEL ─── */}
      <section className="flex-1 relative overflow-hidden">
        {/* ─ POINT BUY COUNTER AT TOP ─ */}
        {method === 'Point Buy' && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white font-semibold z-10">
            Points Left: {remainingPB}
          </div>
        )}

        {/* ─ STANDARD ARRAY POOL ─ */}
        {method === 'Standard Array' && (
          <div className="absolute top-28 left-1/2 flex -translate-x-1/2 space-x-2 z-10">
            {availableSA.map((v) => (
              <div
                key={v}
                draggable
                onDragStart={(e) => e.dataTransfer.setData('text/plain', String(v))}
                className="px-3 py-1 bg-blue-600 text-white rounded cursor-grab"
              >
                {v}
              </div>
            ))}
          </div>
        )}

        {/* ─ DICE ROLL POOL ─ */}
        {method === 'Dice Roll' && (
          <>
            <div className="absolute top-14 left-1/2 flex -translate-x-1/2 flex-col items-center z-10">
              <button
                onClick={doRoll}
                disabled={rolling || attempts >= 3}
                className="mb-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {rolling ? 'Rolling…' : 'Roll Ability Scores'}
              </button>
              <div className="text-sm text-white">Attempts: {attempts} / 3</div>
              {!rolling && rolled.length > 0 && (
                <div className="mt-2 flex space-x-2">
                  {rolled.map((v, i) => (
                    <div
                      key={i}
                      draggable
                      onDragStart={(e) => e.dataTransfer.setData('text/plain', String(v))}
                      className="cursor-grab rounded bg-purple-600 px-3 py-1 text-white"
                    >
                      {v}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {rolling && animData && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="w-64">
                  <Lottie animationData={animData} loop={false} />
                </div>
              </div>
            )}
          </>
        )} 

        {/* ─ STAT PANELS ─ */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-8">
            {STAT_KEYS.map((key) => {
              const base = assigned[key] ?? 0;
              const rac = bonus[key] ?? 0;
              const total = base + rac;
              const mod = total ? getModifier(total) : 0;

              return (
                <div key={key} className="flex flex-col items-center">
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, key)}
                    className="w-60 overflow-hidden rounded bg-black/80"
                  >
                    <div className="bg-gray-900 py-2 text-center font-semibold text-white">
                      {key}
                    </div>
                    <div className="space-y-2 bg-black/40 p-6 text-sm text-white">
                      <div className="flex justify-between"><span>Total</span><span>{total || '-'}</span></div>
                      <div className="flex justify-between"><span>Base</span>{
                        method === 'Point Buy' ? (
                          <div className="flex items-center space-x-1">
                            <button onClick={() => changePB(key, -1)} className="px-1">–</button>
                            <span>{base || '-'}</span>
                            <button onClick={() => changePB(key, 1)} className="px-1">+</button>
                          </div>
                        ) : <span>{base || '-'}</span>
                      }</div>
                      <div className="flex justify-between"><span>Bonus</span><span className={rac >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {rac ? (rac > 0 ? `+${rac}` : rac) : '-'}
                      </span></div>
                      <div className="flex justify-between"><span>Modifier</span><span className={mod >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {total ? (mod >= 0 ? `+${mod}` : mod) : '-'}
                      </span></div>
                    </div>
                  </div>
                  {/* fixed-height remove slot so panels don’t jump */}
                  <div className="mt-1 h-4">
                    {method !== 'Point Buy' && assigned[key] !== undefined ? (
                      <button
                        onClick={() => removeAssigned(key)}
                        className="text-xs text-red-400 hover:underline"
                      >
                        Remove
                      </button>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─ NAV BUTTONS ─ */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between p-6">
          <button onClick={onBack} className="rounded bg-gray-700 px-4 py-2 text-white hover:bg-gray-600">
            Back
          </button>
          <button onClick={onNext} className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-500">
            Next
          </button>
        </div>
      </section>
    </div>
  );
}
