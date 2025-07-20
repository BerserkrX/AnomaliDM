'use client';

import { useEffect, useRef, useState } from 'react';
import DiceBox from '@3d-dice/dice-box';

type Props = {
  socket: any;
  playerId: string;
  campaignId: string;
};

type DiceType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100';

export default function DiceRoller3D({ socket, playerId, campaignId }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const diceBoxRef = useRef<any>(null);
  const [diceQueue, setDiceQueue] = useState<{ type: DiceType; qty: number }[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Small timeout ensures DOM has painted the container
    const timeout = setTimeout(() => {
      if (!containerRef.current) return;

      const box = new DiceBox({
        element: '#dice-box-container',
        id: 'dice-canvas',
        assetPath: '/dice-assets/',
        theme: 'dark',
     });


      box.init().then(() => {
        diceBoxRef.current = box;
        console.log("✅ DiceBox initialized", box);
      });
    }, 50); // Give time for DOM paint

    return () => {
      clearTimeout(timeout);
      if (diceBoxRef.current) {
        diceBoxRef.current.destroy();
        diceBoxRef.current = null;
      }
    };
  }, []);

  const addDie = (type: DiceType) => {
    setDiceQueue((prev) => {
      const existing = prev.find((d) => d.type === type);
      if (existing) {
        return prev.map((d) => d.type === type ? { ...d, qty: d.qty + 1 } : d);
      } else {
        return [...prev, { type, qty: 1 }];
      }
    });
  };

  const clearDice = () => setDiceQueue([]);

  const rollDice = async () => {
    if (!diceBoxRef.current || diceQueue.length === 0) {
        console.warn("⚠️ No dice or DiceBox not ready");
        return;
    }

  console.log("🎲 Rolling dice:", diceQueue);
  const results = await diceBoxRef.current.roll(diceQueue);
  console.log("✅ Roll results:", results);

  const total = results.reduce((sum: number, die: any) => sum + die.value, 0);
    socket?.emit('player-roll', {
      playerId,
      campaignId,
      results,
      total,
    });

    clearDice();
  };

  return (
    <div className="w-full h-[460px] relative bg-black rounded">
      <div ref={containerRef} className="w-full h-full" />

      <div className="absolute top-2 left-2 flex gap-2 flex-wrap bg-zinc-800 p-2 rounded text-white z-10">
        {(['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'] as DiceType[]).map((type) => {
          const count = diceQueue.find((d) => d.type === type)?.qty || 0;
          return (
            <button
              key={type}
              onClick={() => addDie(type)}
              className="px-2 py-1 bg-zinc-700 rounded hover:bg-zinc-600"
            >
              +{type}{count > 0 ? ` (${count})` : ''}
            </button>
          );
        })}
        <button
          onClick={clearDice}
          className="px-2 py-1 bg-red-700 rounded hover:bg-red-600"
        >
          Clear
        </button>
        <button
          onClick={rollDice}
          className="px-4 py-1 bg-green-600 rounded hover:bg-green-500 font-bold"
        >
          ROLL
        </button>
      </div>
    </div>
  );
}
