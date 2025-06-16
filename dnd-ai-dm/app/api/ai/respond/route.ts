import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getCampaignContext } from '@/lib/ai/getCampaignContext';
import { updateCampaignLog } from '@/lib/ai/updateCampaignLog';
import { applyDMUpdates } from '@/lib/ai/applyDMUpdates';
import { z } from 'zod';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  const body = await req.json();

  const schema = z.object({
    campaignId: z.string(),
    userInput: z.string(),
  });

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { campaignId, userInput } = parsed.data;

  const context = await getCampaignContext(campaignId);
  if (!context) {
    return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
  }

  const systemPrompt = `
You are the Dungeon Master AI running a Dungeons & Dragons campaign.
You maintain story continuity and can modify game state like inventory, spells, and campaign log.

World Skeleton:
${JSON.stringify(context.skeleton)}

Campaign Log:
${JSON.stringify(context.log)}

Players and Characters:
${JSON.stringify(context.players)}

When responding:
- Provide narration, dialogue, or description to move the story.
- If needed, include a JSON block to request state updates in this format:

\`\`\`json
{
  "logUpdate": "string describing what to add to campaign log",
  "actions": [
    {
      "type": "updateInventory",
      "characterId": "xxx",
      "add": ["item A"],
      "remove": ["item B"]
    },
    {
      "type": "useSpellSlot",
      "characterId": "xxx",
      "spellLevel": 2
    }
  ]
}
\`\`\`
`;

  const chat = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userInput },
    ],
    model: 'gpt-4',
    temperature: 0.8,
  });

  const message = chat.choices[0].message.content || '';

  const jsonMatch = message.match(/```json([\s\S]*?)```/);
  let parsedUpdates = null;

  if (jsonMatch) {
    try {
      parsedUpdates = JSON.parse(jsonMatch[1].trim());
      await applyDMUpdates(campaignId, parsedUpdates.actions || []);
      if (parsedUpdates.logUpdate) {
        await updateCampaignLog(campaignId, parsedUpdates.logUpdate);
      }
    } catch (err) {
      console.error('Failed to parse or apply DM update JSON block:', err);
    }
  }

  return NextResponse.json({
    response: message.replace(jsonMatch?.[0] || '', '').trim(),
    updates: parsedUpdates,
  });
}
