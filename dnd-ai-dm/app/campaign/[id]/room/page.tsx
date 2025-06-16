'use client';

import { useEffect, useRef, useState } from 'react';
import React from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import AiChatPanel from '@/components/ai/AiChatPanel';


type PanelKey = 'Ch.' | 'Inv.' | 'Spell' | 'Roll' | 'Pl.' | 'AI';

export default function CampaignRoomPage() {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [campaign, setCampaign] = useState<any>(null);
  const [activePanel, setActivePanel] = useState<PanelKey | null>(null);

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

  const togglePanel = (panel: PanelKey) => {
    setActivePanel((prev) => (prev === panel ? null : panel));
  };

  const [aiMessages, setAiMessages] = useState<string[]>([]);

    const handleAiSend = async (msg: string) => {
    const res = await fetch('/api/ai/respond', {
        method: 'POST',
        body: JSON.stringify({ campaignId: id, userInput: msg }),
    });
    const data = await res.json();
    setAiMessages(prev => [...prev, data.response]);
    };

  const [userInput, setUserInput] = useState('');

  const handleSendAiMessage = async () => {
  if (!userInput.trim()) return;

  const userMsg = { sender: 'user', text: userInput.trim() };
  setAiMessages((prev) => [...prev, userInput]);
    setUserInput('');
  }
  
  // Move panelContent and return outside of handleSendAiMessage
  const panelContent: Record<PanelKey, React.ReactElement> = {
    'Ch.': <div>Character Sheet goes here.</div>,
    'Inv.': <div>Inventory content goes here.</div>,
    'Spell': <div>Spell list and spell slots go here.</div>,
    'Roll': <div>Dice roller goes here.</div>,
    'Pl.': <div>Players in session info goes here.</div>,
  
    'AI': (
      <>
        <AiChatPanel campaignId={id as string} userId={user?.id} />
      </>
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
