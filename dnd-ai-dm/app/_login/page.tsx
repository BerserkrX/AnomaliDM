// app/login/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string>('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    router.push('/account');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="bg-card p-8 rounded-2xl w-full max-w-sm shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-center">Login to RealmWright</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded-lg bg-muted text-muted-foreground border border-border focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded-lg bg-muted text-muted-foreground border border-border focus:outline-none"
        />

        {error && <p className="text-destructive text-sm">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:opacity-90 transition"
        >
          {loading ? 'Logging in…' : 'Login'}
        </button>

        <p className="text-center text-sm">
          Don’t have an account?{' '}
          <Link href="/register" className="text-primary hover:underline">
            Register Here
          </Link>
        </p>
      </div>
    </div>
);
}
