'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (type: 'sign-in' | 'sign-up') => {
    setLoading(true);
    setError('');

  let data, error;

if (type === 'sign-in') {
  ({ data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  }));
} else {
  ({ data, error } = await supabase.auth.signUp({
    email,
    password,
  }));
}

    if (error) {
      setError(error.message);
    } else {
      router.push('/account'); // or a dashboard
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d1117] text-white">
      <div className="bg-[#111827] p-8 rounded-lg w-full max-w-sm shadow-lg space-y-4">
        <h2 className="text-2xl font-bold text-center">Login to RealmWright</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
        />

        {error && <p className="text-red-400">{error}</p>}

        <div className="flex gap-2">
          <button onClick={() => handleLogin('sign-in')} className="flex-1 bg-blue-600 p-2 rounded">
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <button onClick={() => handleLogin('sign-up')} className="flex-1 bg-green-600 p-2 rounded">
            {loading ? 'Creating...' : 'Register'}
          </button>
        </div>
      </div>
    </div>
  );
}
