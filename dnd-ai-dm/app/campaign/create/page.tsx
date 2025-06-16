//links with api/campaign/generate/route.ts and lib/ai/generateCampaign.ts

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabaseClient';

export default function CreateCampaignPage() {
  const router = useRouter();
  const { toast } = useToast();

  function generateInviteCode(length = 8) {
    return Math.random().toString(36).substring(2, 2 + length).toUpperCase();
  }

  const [tone, setTone] = useState('Classic Fantasy');
  const [theme, setTheme] = useState('Survival');
  const [magicStyle, setMagicStyle] = useState('Standard Magic');
  const [religion, setReligion] = useState('Polytheistic');
  const [leveling, setLeveling] = useState('Milestone');
  const [materialComponents, setMaterialComponents] = useState(true);
  const [carryWeightEnabled, setCarryWeightEnabled] = useState(true);
  const [trackRations, setTrackRations] = useState(true);
  const [includeElements, setIncludeElements] = useState('');
  const [avoidElements, setAvoidElements] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const {
      data: { user },
      error: userErr,
    } = await supabase.auth.getUser();
    if (userErr || !user) {
      console.error('Could not fetch user', userErr);
      setLoading(false);
      return;
    }

    const aiRes = await fetch('/api/campaign/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        tone,
        theme,
        magicOption: magicStyle,
        religionHandling: religion,
        levelingMethod: leveling,
        materialComponents,
        carryWeightEnabled,
        trackRations,
        includeElements,
        avoidElements,
      }),
    });

    if (!aiRes.ok) {
      console.error('AI generation failed', await aiRes.text());
      setLoading(false);
      return;
    }

    const { outline } = await aiRes.json();
    const generatedName = outline.worldName;

    const inviteCode = generateInviteCode();

    const { data: campaign, error: insertError } = await supabase
      .from('campaigns')
      .insert({
        owner_id: user.id,
        invite_code: inviteCode,
        name: generatedName,
        tone,
        theme,
        magic_style: magicStyle,
        religion,
        leveling,
        include_elements: includeElements,
        avoid_elements: avoidElements,
        skeleton: outline,
      })
      .select('id')
      .single();

    if (insertError || !campaign?.id) {
      console.error('❌ Campaign insert failed:', insertError);
      toast({ title: 'Insert Failed 😢', description: 'Check console logs for details.', variant: 'destructive' });
      setLoading(false);
      return;
    }

    toast({
      title: 'Campaign Created 🎉',
      description: `Your new campaign "${generatedName}" has been added successfully.`,
    });
    setTimeout(() => {
      router.push('/account');
    }, 2500);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Create New Campaign</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-300">Tone</span>
            <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full mt-1 p-2 bg-gray-800 rounded">
              <option>Classic Fantasy</option>
              <option>Dark+Gritty</option>
              <option>High Magic</option>
              <option>Mysterious+Creepy</option>
              <option>Heroic+Epic</option>
              <option>Lighthearted+Whimsical</option>
              <option>Grimdark+Tragic</option>
              <option>Something Else</option>
            </select>
          </label>

          <label className="block">
            <span className="text-gray-300">Theme</span>
            <select value={theme} onChange={(e) => setTheme(e.target.value)} className="w-full mt-1 p-2 bg-gray-800 rounded">
              <option>Survival</option>
              <option>Revolution</option>
              <option>Lost Knowledge</option>
              <option>Divine Powers</option>
              <option>Moral Corruption</option>
              <option>War+Conquest</option>
              <option>Cosmic Forces</option>
              <option>Exploration</option>
              <option>Corruption+Power</option>
              <option>Legacy+Bloodlines</option>
            </select>
          </label>

          <label className="block">
            <span className="text-gray-300">Magic Style</span>
            <select value={magicStyle} onChange={(e) => setMagicStyle(e.target.value)} className="w-full mt-1 p-2 bg-gray-800 rounded">
              <option>Low Magic (Rare or Dangerous)</option>
              <option>Standard Magic</option>
              <option>High Magic (Magitek Cities/Spellpunk)</option>
              <option>Forgotten Magic (Lost or Forbidden)</option>
              <option>Divine Miracles Only (Arcane Banned or Extinct)</option>
            </select>
          </label>

          <label className="block">
            <span className="text-gray-300">Religion</span>
            <select value={religion} onChange={(e) => setReligion(e.target.value)} className="w-full mt-1 p-2 bg-gray-800 rounded">
              <option>Polytheistic</option>
              <option>Monotheistic</option>
              <option>Atheistic</option>
              <option>Animistic</option>
            </select>
          </label>

          <label className="block">
            <span className="text-gray-300">Leveling Method</span>
            <select value={leveling} onChange={(e) => setLeveling(e.target.value)} className="w-full mt-1 p-2 bg-gray-800 rounded">
              <option>Milestone</option>
              <option>XP</option>
            </select>
          </label>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-300">Use Material Components?</span>
            <select value={materialComponents ? 'yes' : 'no'} onChange={(e) => setMaterialComponents(e.target.value === 'yes')} className="w-full mt-1 p-2 bg-gray-800 rounded">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>

          <label className="block">
            <span className="text-gray-300">Track Carry Weight?</span>
            <select value={carryWeightEnabled ? 'yes' : 'no'} onChange={(e) => setCarryWeightEnabled(e.target.value === 'yes')} className="w-full mt-1 p-2 bg-gray-800 rounded">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>

          <label className="block">
            <span className="text-gray-300">Track Rations?</span>
            <select value={trackRations ? 'yes' : 'no'} onChange={(e) => setTrackRations(e.target.value === 'yes')} className="w-full mt-1 p-2 bg-gray-800 rounded">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>

          <label className="block">
            <span className="text-gray-300">Include these elements</span>
            <textarea rows={3} value={includeElements} onChange={(e) => setIncludeElements(e.target.value)} className="w-full mt-1 p-2 bg-gray-800 rounded resize-none" placeholder="e.g. an ancient lost library, political intrigue, desert ruins…" />
          </label>

          <label className="block">
            <span className="text-gray-300">Avoid these elements</span>
            <textarea rows={3} value={avoidElements} onChange={(e) => setAvoidElements(e.target.value)} className="w-full mt-1 p-2 bg-gray-800 rounded resize-none" placeholder="e.g. undead, piracy, planar travel…" />
          </label>
        </div>
      </div>

      <div className="pt-4">
        <Button type="submit" disabled={loading}>
          {loading ? 'Generating…' : 'Create Campaign'}
        </Button>
      </div>
    </form>
  );
}
