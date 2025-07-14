'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  email: string;
  user_metadata: {
    username?: string;
    avatar_url?: string;
    subscription?: 'free' | 'standard' | 'premium';
  };
}

interface Character {
  id: string;
  name: string;
}

interface Campaign {
  id: string;
  name: string;
  banner_url?: string;
  owner_id: string;
  is_owner?: boolean;
}

interface Friend {
  id: string;
  username: string;
  avatar_url?: string;
  online: boolean;
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [slides] = useState<string[]>(['/slides/news1.jpg', '/slides/news2.jpg', '/slides/news3.jpg']);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [inviteCode, setInviteCode] = useState('');
  const { toast } = useToast();

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({ title: 'Logout Failed', description: error.message, variant: 'destructive' });
    } else {
      window.location.href = '/login'; // or redirect as needed
    }
  }

  useEffect(() => {
    const t = setInterval(() => {
      setCurrentSlide((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(t);
  }, [slides.length]);

  useEffect(() => {
    async function load() {
      const {
        data: { user: u },
      } = await supabase.auth.getUser();
      if (!u) return;
      setUser(u as UserProfile);

      console.log("👤 Authenticated user ID:", u.id);
    

      const [
        { data: chars },
        { data: ownedCamps, error: ownedError },
        { data: joinedCamps, error: joinedError },
        { data: fr },
      ] = await Promise.all([
        supabase.from('characters').select('id,name').eq('user_id', u.id),

        // ✅ campaigns where the user is the owner
        supabase.from('campaigns').select('id,name,owner_id').eq('owner_id', u.id),

        // ✅ campaigns where the user is a member (uuid[] contains user.id)
        supabase.from('campaigns').select('id,name,owner_id,members,invite_code').filter('members', 'cs', `{${u.id}}`),

        supabase.from('friends').select('id,username,avatar_url,online').eq('user_id', u.id),
      ]);

      const camps = [...(ownedCamps || []), ...(joinedCamps || [])];
      console.log("🧪 Raw campaign fetch result:", camps);
      if (ownedError || joinedError) {
        console.error("⚠️ Supabase fetch error:", ownedError || joinedError);
      }


      const campaignsWithOwnerFlag = (camps || []).map(c => ({
        ...c,
        is_owner: c.owner_id === u.id,
      }));

      setCharacters(chars || []);
      setCampaigns(campaignsWithOwnerFlag);
      setFriends(fr || []);
    }
    load();
  }, []);

  async function handleJoinCampaign() {
    if (!inviteCode) return;

    const {
      data: { user },
      error: userErr,
    } = await supabase.auth.getUser();

    if (userErr || !user) {
      toast({
        title: 'Auth Error',
        description: 'You must be logged in.',
        variant: 'destructive',
      });
      return;
    }

    const { data: campaign, error } = await supabase
      .from('campaigns')
      .select('id, name, members')
      .eq('invite_code', inviteCode)
      .single();

    if (error || !campaign) {
      toast({
        title: 'Invalid Code',
        description: 'Campaign not found.',
        variant: 'destructive',
      });
      return;
    }

    // Ensure the user is not already a member
    const currentMembers = campaign.members || [];
    if (currentMembers.includes(user.id)) {
      toast({
        title: 'Already Joined',
        description: 'You are already a member of this campaign.',
      });
      return;
    }

    const { error: updateErr } = await supabase
      .from('campaigns')
      .update({
        members: [...currentMembers, user.id],
      })
      .eq('id', campaign.id);

    if (updateErr) {
      toast({
        title: 'Join Failed',
        description: 'Could not join campaign.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Joined Campaign!',
        description: `You've joined ${campaign.name}`,
      });
      setInviteCode('');
      window.location.reload();
    }
  }

  if (!user) return <div className="p-8 text-center">Loading dashboard…</div>;

  const { username, avatar_url, subscription = 'free' } = user.user_metadata;
  const displayName = username || user.email;
  const charLimit = subscription === 'premium' ? 20 : subscription === 'standard' ? 10 : 5;

  const createdCamps = campaigns.filter((c) => c.is_owner).slice(0, charLimit);
  const memberCamps = campaigns.filter((c) => !c.is_owner);
  const allCamps = [...createdCamps, ...memberCamps];

  return (
      <div className="grid grid-cols-5 grid-rows-4 gap-4 p-4 pr-6 pb-6 h-full">
        <aside className="col-start-1 row-span-4 bg-card text-card-foreground p-4 flex flex-col items-center border-r border-border">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-2">
            {avatar_url ? (
              <Image src={avatar_url} alt="avatar" width={96} height={96} />
            ) : (
              <div className="w-full h-full bg-muted" />
            )}
          </div>
          <h2 className="text-xl font-semibold mb-1"> {displayName}</h2>
          <p className="text-sm mb-4 capitalize text-muted-foreground">{subscription} subscriber</p>
          <Link href="/account/settings" className="text-primary hover:underline mb-4">
            Profile Settings
          </Link>

          <div className="mt-auto w-full">
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded text-sm"
            >
              Logout
            </button>
          </div>
        </aside>

        <main className="col-start-2 col-span-4 row-start-1 row-span-2 bg-card p-4 rounded-lg shadow border border-border overflow-hidden">
          <h3 className="text-2xl font-semibold mb-2 text-foreground">News & Updates</h3>
          <div className="relative h-full overflow-hidden rounded">
            {slides.map((src, i) => (
              <Image key={i} src={src} alt={`slide ${i + 1}`} fill className={`object-cover transition-opacity duration-1000 ${i === currentSlide ? 'opacity-100' : 'opacity-0'}`} />
            ))}
          </div>
        </main>

        <section className="col-start-2 col-span-3 row-start-3 bg-card p-4 rounded-lg shadow border border-border h-full flex flex-col">
          <h3 className="text-2xl font-semibold mb-2 text-foreground">Characters</h3>
          <div className="flex-1 overflow-x-auto overflow-y-hidden">
            <div className="flex space-x-4 h-full pb-2 items-start w-max">
              <Link href="/create-character" className="w-36 h-28 bg-muted rounded-lg p-3 text-muted-foreground flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition">+ Create Character</Link>
              {characters.slice(0, charLimit).map((ch) => (
                <Link key={ch.id} href={`/campaign/?character=${ch.id}`} className="relative group w-36 h-30 bg-muted rounded-lg p-3 text-muted-foreground flex flex-col items-center justify-center">
                  <button onClick={async (e) => { e.preventDefault(); if (!confirm('Really delete this character?')) return; await supabase.from('characters').delete().eq('id', ch.id); setCharacters((prev) => prev.filter((x) => x.id !== ch.id)); }} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-red-600 hover:bg-red-500 px-2 py-1 text-xs rounded">Delete</button>
                  <div className="w-16 h-16 bg-muted-foreground rounded-full mb-2" />
                  <span className="font-medium text-sm text-center break-words">{ch.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="col-start-2 col-span-3 row-start-4 bg-card p-4 rounded-lg shadow border border-border h-full flex flex-col">
          <h3 className="text-2xl font-semibold mb-2 text-foreground">Campaigns</h3>
          <div className="flex-1 overflow-x-auto overflow-y-hidden">
            <div className="flex space-x-4 h-full pb-2 items-start w-max">
              <Link href="/campaign/create" className="w-44 h-28 bg-muted rounded-lg p-3 text-muted-foreground flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition">+ Create Campaign</Link>
              {allCamps.map((c) => (
                <Link key={c.id} href={`/campaign/${c.id}/lobby`} className="w-44 h-30 bg-muted rounded-lg p-3 text-muted-foreground flex flex-col justify-between">
                  {c.banner_url ? (
                    <Image src={c.banner_url ?? '/images/default-campaign-banner.jpg'} alt={c.name} width={192} height={64} className="rounded mb-1 object-cover" />
                  ) : (
                    <div className="w-full h-16 bg-muted-foreground rounded mb-1" />
                  )}
                  <span className="font-medium text-sm text-center break-words">{c.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="col-start-5 row-start-3 row-span-2 bg-card p-4 rounded-lg shadow border border-border">
          <h3 className="text-2xl font-semibold mb-4 text-foreground">Friends Online</h3>
          <div>
            <h4 className="font-medium mb-1">Online</h4>
            <ul className="space-y-2 mb-4 max-h-[180px] overflow-y-auto">
              {friends.filter((f) => f.online).map((f) => (
                <li key={f.id} className="flex items-center space-x-2">
                  {f.avatar_url ? (
                    <Image src={f.avatar_url} alt={f.username} width={32} height={32} className="rounded-full" />
                  ) : (
                    <div className="w-8 h-8 bg-muted rounded-full" />
                  )}
                  <span>{f.username}</span>
                </li>
              ))}
              {friends.filter((f) => f.online).length === 0 && <li className="text-muted-foreground">No one online</li>}
            </ul>
            <div>
              <h4 className="font-medium mb-1">Join Campaign</h4>
              <input
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                placeholder="Enter invite code"
                className="w-full p-2 rounded border border-border bg-background text-foreground"
              />
              <button
                onClick={handleJoinCampaign}
                className="w-full bg-primary text-primary-foreground py-2 rounded hover:bg-yellow-400 hover:text-black mt-2"
              >
                Join
              </button>
            </div>
          </div>
        </section>
      </div>

  );
}

