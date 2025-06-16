"use client";

import { useState } from "react";

interface Props {
  campaignId: string;
  userId: string;
}

export default function AiChatPanel({ campaignId, userId }: Props) {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async (msg: string) => {
    setMessages((prev) => [...prev, `You: ${msg}`]);

    const res = await fetch("/api/ai/respond", {
      method: "POST",
      body: JSON.stringify({ campaignId, userInput: msg, userId }),
    });

    const data = await res.json();
    setMessages((prev) => [...prev, `DM: ${data.response}`]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full w-full p-2 space-y-2 bg-white/80 rounded">
      <div className="flex-1 overflow-y-auto space-y-1 text-sm">
        {messages.map((m, i) => (
          <div key={i} className="text-foreground">
            {m}
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim()) sendMessage(input.trim());
        }}
        className="flex space-x-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 rounded border bg-background text-foreground"
          placeholder="Ask your DM..."
        />
        <button
          type="submit"
          className="px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Send
        </button>
      </form>
    </div>
  );
}
