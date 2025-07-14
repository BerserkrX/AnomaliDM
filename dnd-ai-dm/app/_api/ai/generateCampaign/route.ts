import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getCampaignContext } from '@/lib/ai/getCampaignContext';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  const { campaignId, userInput, } = await req.json();
  const context = await getCampaignContext(campaignId);

  const systemPrompt = `
You are the Dungeon Master AI. You run the world based on the current campaign state. Maintain consistency with the world skeleton and log. You can update character inventories, spells, and the campaign log.

World:
- Skeleton: ${JSON.stringify(context.skeleton)}
- Log: ${JSON.stringify(context.log)}

Players:
${JSON.stringify(context.players)}
`;

  const chat = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userInput },
    ],
    model: 'gpt-4',
  });

  const response = chat.choices[0].message.content;
  return NextResponse.json({ response });
}
