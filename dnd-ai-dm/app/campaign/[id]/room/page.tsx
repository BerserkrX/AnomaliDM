'use client';

import { useEffect, useRef, useState } from 'react';
import React from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import io from 'socket.io-client';
import DiceRoller3D from '@/components/ai/diceRoller3D';

type PanelKey = 'Ch.' | 'Inv.' | 'Spell' | 'Roll' | 'Pl.' | 'AI';

export default function CampaignRoomPage() {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [campaign, setCampaign] = useState<any>(null);
  const [activePanel, setActivePanel] = useState<PanelKey | null>(null);
  const [aiMessages, setAiMessages] = useState<string[]>([]);
  const [userInput, setUserInput] = useState('');
  const socketRef = useRef<any>(null);

  const togglePanel = (panel: PanelKey) => {
    setActivePanel((prev) => (prev === panel ? null : panel));
  };

  useEffect(() => {
    async function fetchInitialData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUser(user);

      const { data: campaignData } = await supabase
        .from('campaigns')
        .select('*')
        .eq('id', id)
        .single();

      if (!campaignData) return;
      setCampaign(campaignData);
    }
    fetchInitialData();
  }, [id]);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_MCP_URL ?? 'http://localhost:4000');
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('✅ Connected to MCP server');
    });

    socket.on('ai-response', (data: { text: string }) => {
      console.log('🤖 AI Response:', data.text);
      setAiMessages((prev) => [...prev, `AI: ${data.text}`]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendAiMessage = () => {
    const trimmed = userInput.trim();
    if (!trimmed || !user?.id || !id) return;

    setAiMessages((prev) => [...prev, `You: ${trimmed}`]);

    socketRef.current?.emit('player-message', {
      content: trimmed,
      playerId: user.id,
      campaignId: id,
    });

    setUserInput('');
  };

  const panelContent: Record<PanelKey, React.ReactElement> = {
    'Ch.': <div>Character Sheet goes here.</div>,
    'Inv.': <div>Inventory content goes here.</div>,
    'Spell': <div>Spell list and spell slots go here.</div>,
    'Roll': <DiceRoller3D socket={socketRef.current} playerId={user?.id} campaignId={typeof id === 'string' ? id : ''} />,
    'Pl.': <div>Players in session info goes here.</div>,
    'AI': (
      <div className="flex flex-col h-[460px] w-full p-4 space-y-3 bg-zinc-900 text-white rounded shadow-lg overflow-hidden">
        <div className="flex-1 overflow-y-auto pr-1 space-y-2">
          {aiMessages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded text-sm ${
                msg.startsWith('You:')
                  ? 'bg-zinc-700 text-green-200 self-end'
                  : 'bg-zinc-800 text-yellow-100 self-start'
              }`}
            >
              {msg}
            </div>
          ))}
        </div>
        <div className="flex gap-2 pt-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendAiMessage()}
            className="flex-1 p-2 rounded border border-zinc-600 bg-zinc-800 text-white placeholder-gray-400"
            placeholder="What do you do?"
          />
          <button
            onClick={handleSendAiMessage}
            className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400"
          >
            Send
          </button>
        </div>
      </div>
    ),
  };

  return (
    <div className="fixed top-16 left-0 w-screen h-[calc(100vh-4rem)] overflow-hidden bg-background">
      {/* Grid and Map */}
      <div className="relative w-full h-full overflow-hidden rounded-lg">
        <div className="absolute inset-0 z-0 rounded-lg overflow-hidden">
          <Image
            src="/images/placeholder-map.jpg"
            alt="Map"
            fill
            className="object-contain opacity-70 rounded-lg"
          />
        </div>
        <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] rounded-lg" />
      </div>

      {/* Left-side Icons */}
      <div className="absolute top-24 left-6 z-20 flex flex-col space-y-4">
        {(['Ch.', 'Inv.', 'Spell', 'Roll'] as PanelKey[]).map((label) => (
          <button
            key={label}
            onClick={() => togglePanel(label)}
            className={`w-12 h-12 rounded-full bg-card text-card-foreground shadow border border-border hover:bg-primary hover:text-primary-foreground ${activePanel === label ? 'ring-2 ring-primary' : ''}`}
            title={label}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Right-side Icons */}
      <div className="absolute top-24 right-6 z-20 flex flex-col space-y-4">
        {(['Pl.', 'AI'] as PanelKey[]).map((label) => (
          <button
            key={label}
            onClick={() => togglePanel(label)}
            className={`w-12 h-12 rounded-full bg-card text-card-foreground shadow border border-border hover:bg-primary hover:text-primary-foreground ${activePanel === label ? 'ring-2 ring-primary' : ''}`}
            title={label}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Animated Panel */}
      <AnimatePresence>
        {activePanel && (
          <motion.div
            key={activePanel}
            className={`absolute top-28 ${
              activePanel === 'Pl.' || activePanel === 'AI' ? 'right-20' : 'left-20'
            } bg-white bg-opacity-90 rounded shadow-lg p-4 w-[600px] h-[500px] p-6 z-50`}
            initial={{
              opacity: 0,
              scale: 0.8,
              x: activePanel === 'Pl.' || activePanel === 'AI' ? 300 : -300,
            }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{
              opacity: 0,
              scale: 0.8,
              x: activePanel === 'Pl.' || activePanel === 'AI' ? 300 : -300,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-lg font-bold mb-2">{activePanel} Panel</div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-lg font-semibold">{activePanel}</h4>
              <button
                onClick={() => setActivePanel(null)}
                className="text-sm text-muted-foreground hover:underline"
              >
                Close
              </button>
            </div>
            <div className="text-sm text-muted-foreground max-h-96 overflow-y-auto">
              {panelContent[activePanel]}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
