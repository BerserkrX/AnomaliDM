'use client';

import { useEffect, useRef, useState } from 'react';

interface AiChatPanelProps {
  campaignId: string;
  userId: string;
}

export default function AiChatPanel({ campaignId, userId }: AiChatPanelProps) {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = `You: ${input}`;
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaignId, userInput: input, userId }),
      });

      const data = await res.json();
      const aiResponse = `DM: ${data.response}`;
      setMessages((prev) => [...prev, aiResponse]);
    } catch (err) {
      setMessages((prev) => [...prev, '❌ Error talking to DM.']);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="flex flex-col h-[600px] w-full p-4 space-y-3 bg-zinc-900 text-white rounded shadow-lg overflow-hidden">
      <div className="flex-1 overflow-y-auto pr-1 space-y-2">
        {messages.map((msg, index) => (
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
        {loading && (
          <div className="text-sm italic text-muted text-gray-400">
            DM is thinking...
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>
      <div className="flex gap-2 pt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 p-2 rounded border border-zinc-600 bg-zinc-800 text-white placeholder-gray-400"
          placeholder="Ask your DM..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400"
        >
          Send
        </button>
      </div>
    </div>
  );
}
