// src/mcp.ts

export async function handlePlayerMessage(data: {
  content: string;
  campaignId?: string;
  playerId?: string;
}): Promise<string> {
  // In the future, you'll:
  // - look up campaign state
  // - add the player's message to the conversation
  // - call OpenAI for a response
  // - update Supabase, etc.

  const { content } = data;

  // Placeholder logic for now
  return `📖 The AI DM considers your words: "${content}"...`;
}
