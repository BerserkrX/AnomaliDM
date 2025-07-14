'use client';

import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#111827]/90 backdrop-blur border-b border-white/10 px-4 py-3 flex items-center justify-between">
      <div className="font-bold text-lg tracking-wide">Anomali DM</div>
      <div className="flex gap-6 text-sm font-medium">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/campaign/test-room" className="hover:underline">Campaign</Link>
        <Link href="/account" className="hover:underline">Account</Link>
        <Link href="/faq" className="hover:underline">FAQ</Link>
      </div>
    </nav>
  );
}
