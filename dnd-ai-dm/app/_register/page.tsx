// app/register/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob]           = useState({ month: '', day: '', year: '' });
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string>('');

  const months = [
    { value: '01', label: 'January' }, { value: '02', label: 'February' },
    { value: '03', label: 'March' },   { value: '04', label: 'April' },
    { value: '05', label: 'May' },     { value: '06', label: 'June' },
    { value: '07', label: 'July' },    { value: '08', label: 'August' },
    { value: '09', label: 'September' }, { value: '10', label: 'October' },
    { value: '11', label: 'November' },  { value: '12', label: 'December' },
  ];
  const days   = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
  const years  = Array.from({ length: 100 }, (_, i) => String(new Date().getFullYear() - i));

  // Real-time username check
  const checkUsername = async (name: string) => {
    if (!name) return setUsernameAvailable(null);
    setCheckingUsername(true);
    const { count, error } = await supabase
      .from('profiles')
      .select('id', { count: 'exact', head: true })
      .eq('username', name);
    setCheckingUsername(false);
    if (error) {
      console.error(error);
      return setUsernameAvailable(null);
    }
    setUsernameAvailable(count === 0);
  };

  const handleSignUp = async () => {
    setError('');
    // 1) Ensure all fields filled
    if (!username || !email || !password || !dob.month || !dob.day || !dob.year) {
      setError('All fields are required.');
      return;
    }
    if (usernameAvailable === false) {
      setError('Username is already taken.');
      return;
    }

    setLoading(true);
    // 2) Sign up with metadata only
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          date_of_birth: `${dob.year}-${dob.month}-${dob.day}`,
          avatar_url: ''
        }
      }
    });
    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // 3) Redirect to email verification page
    setLoading(false);
    router.push('/verify-email');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="bg-card p-8 rounded-2xl w-full max-w-sm shadow-lg space-y-4">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>

        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={() => checkUsername(username)}
            required
            className="w-full p-2 rounded-lg bg-muted text-muted-foreground border border-border focus:outline-none"
          />
          {checkingUsername && <p className="text-sm">Checking username…</p>}
          {usernameAvailable === false && <p className="text-destructive text-sm">Username is taken.</p>}
          {usernameAvailable === true  && <p className="text-success text-sm">Username is available!</p>}
        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 rounded-lg bg-muted text-muted-foreground border border-border focus:outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 rounded-lg bg-muted text-muted-foreground border border-border focus:outline-none"
        />

        <div className="flex space-x-2">
          <select
            value={dob.month}
            onChange={(e) => setDob({ ...dob, month: e.target.value })}
            required
            className="flex-1 p-2 rounded-lg bg-muted text-muted-foreground border border-border focus:outline-none"
          >
            <option value="">Month</option>
            {months.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
          </select>
          <select
            value={dob.day}
            onChange={(e) => setDob({ ...dob, day: e.target.value })}
            required
            className="flex-1 p-2 rounded-lg bg-muted text-muted-foreground border border-border focus:outline-none"
          >
            <option value="">Day</option>
            {days.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <select
            value={dob.year}
            onChange={(e) => setDob({ ...dob, year: e.target.value })}
            required
            className="flex-1 p-2 rounded-lg bg-muted text-muted-foreground border border-border focus:outline-none"
          >
            <option value="">Year</option>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        {error && <p className="text-destructive text-sm">{error}</p>}

        <button
          onClick={handleSignUp}
          disabled={loading || usernameAvailable === false}
          className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:opacity-90 transition"
        >
          {loading ? 'Signing up…' : 'Sign Up'}
        </button>

        <p className="text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
