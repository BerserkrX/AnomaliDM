'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function VerifyEmailPage() {
  const router = useRouter();

  useEffect(() => {
    // Check for an active session — email confirmation does NOT auto-sign-in
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.push('/account');
      }
    });

    // Redirect if they sign in elsewhere in the app
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.push('/account');
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="bg-card p-8 rounded-2xl max-w-sm text-center shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
        <p className="mb-4">
          A confirmation link has been sent to your email address.<br />
          Please check your inbox (and spam folder) and click the link to confirm your account.
        </p>
        <p>
          Once confirmed, <a href="/login" className="text-primary hover:underline">log in</a> to access your dashboard.
        </p>
      </div>
    </div>
  );
}
