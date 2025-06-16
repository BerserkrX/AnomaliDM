"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

interface Character {
  id: string;
  name: string;
}

interface Participant {
  user_id: string;
  character_id: string;
  is_present: boolean;
}

interface Campaign {
  id: string;
  owner_id: string;
  members: string[];
  campaignLog: string[];
}

export default function CampaignLobbyPage() {
  const router = useRouter();
  const { id } = useParams();

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [journal, setJournal] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);
  const [isPresent, setIsPresent] = useState(false);

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push('/login');
      setUser(user);

      const { data: campaignData } = await supabase.from('campaigns').select('*').eq('id', id).single();
      if (!campaignData || (!campaignData.members.includes(user.id) && campaignData.owner_id !== user.id)) {
        return router.push('/unauthorized');
      }

      setCampaign(campaignData);
      setJournal(campaignData.campaignLog || []);

      const { data: chars } = await supabase.from('characters').select('*').eq('user_id', user.id);
      setCharacters(chars || []);

      const { data: participantList } = await supabase.from('campaign_participants').select('*').eq('campaign_id', id);
      setParticipants(participantList || []);

      const present = participantList?.find((p) => p.user_id === user.id)?.is_present;
      setIsPresent(present);
    }

    loadData();
  }, [id]);

  const assignCharacter = async () => {
    if (!selectedCharacterId || !user) return;

    await supabase.from('campaign_participants').upsert({
      campaign_id: id,
      user_id: user.id,
      character_id: selectedCharacterId,
      is_present: true,
    });

    const { data: updatedParticipants } = await supabase.from('campaign_participants').select('*').eq('campaign_id', id);
    setParticipants(updatedParticipants || []);
    setIsPresent(true);
  };

  const handleKick = async (kickUserId: string) => {
    if (!confirm(`Are you sure you want to remove this character from the campaign?`)) return;

    await supabase
      .from('campaign_participants')
      .delete()
      .eq('campaign_id', id)
      .eq('user_id', kickUserId);

    const { data: updatedParticipants } = await supabase.from('campaign_participants').select('*').eq('campaign_id', id);
    setParticipants(updatedParticipants || []);
  };

  const allReady = participants.every(p => p.is_present && p.character_id);

  const startSession = () => {
    router.push(`/campaign/${id}/room`);
  };

  const assignedCharId = participants.find((p) => p.user_id === user?.id)?.character_id;

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Campaign Lobby</h1>

      <section className="grid grid-cols-5 gap-4">
        {/* Journal */}
        <div className="col-span-2 bg-card p-4 rounded shadow border border-border">
          <h2 className="text-xl font-semibold mb-2">Journal</h2>
          <ul className="list-disc pl-5 text-sm text-muted-foreground">
            {journal.length > 0 ? journal.map((entry, idx) => <li key={idx}>{entry}</li>) : <li>No entries yet.</li>}
          </ul>
        </div>

        {/* Character Sheet */}
        <div className="col-span-2 bg-card p-4 rounded shadow border border-border">
          <h2 className="text-xl font-semibold mb-2">Your Character Sheet</h2>
          {assignedCharId ? (
            <div className="text-sm">
              {characters.find((c) => c.id === assignedCharId)?.name}
            </div>
          ) : (
            <p className="text-muted-foreground">No character assigned yet.</p>
          )}
        </div>

        {/* Right Panel: Ready Check + Assign + Kick */}
        <div className="col-span-1 bg-card p-4 rounded shadow border border-border h-fit space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Ready Check</h2>
            <ul className="space-y-1 text-sm">
              {participants
                .filter(p => p.is_present && p.character_id)
                .map((p) => {
                  const char = characters.find((c) => c.id === p.character_id);
                  return (
                    <li key={p.user_id} className="flex justify-between items-center">
                      <span className="flex items-center space-x-2">
                        <span className="block w-2 h-2 bg-green-500 rounded-full" />
                        <span>{char?.name}</span>
                      </span>
                      {user?.id === campaign?.owner_id && (
                        <button
                          onClick={() => handleKick(p.user_id)}
                          className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500"
                        >
                          Kick
                        </button>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>

          <div>
            <h2 className="text-md font-medium mb-1">Select Your Character</h2>
            <select
              onChange={(e) => setSelectedCharacterId(e.target.value)}
              value={selectedCharacterId || ''}
              className="w-full p-2 border rounded text-black"
            >
              <option value="">-- Choose a character --</option>
              {characters.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <button
              onClick={assignCharacter}
              className="mt-2 w-full bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-yellow-400 hover:text-black"
            >
              Assign
            </button>
          </div>

          {user?.id === campaign?.owner_id && (
            <button
              onClick={startSession}
              disabled={!allReady}
              className={`w-full px-4 py-2 rounded text-sm ${
                allReady
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-400 text-gray-200 cursor-not-allowed'
              }`}
            >
              Start Session
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
