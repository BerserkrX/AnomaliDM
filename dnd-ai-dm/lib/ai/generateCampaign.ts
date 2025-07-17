import OpenAI from 'openai';
import { CampaignParams, CampaignOutline } from '@/app/api/campaign/generate/route';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const SYSTEM_MESSAGE = {
  role: 'system',
  content: `You are a world-building Dungeon Master AI. Your task is to generate a rich fantasy campaign setting based on a few user preferences.

Always respond with a valid JSON object containing the following keys:
- worldName (string)
- summary (string)
- majorNPCs (string[])
- hooks (string[])
- towns (string[])
- cities (string[])
- villages (string[])
- factions (string[])
- geography (string[])
- climates (string[])
- religions (string[])
- beliefSystems (string[])
- magicLaws (string)
- politicalStructures (string[])
- majorConflicts (string[])
- pointsOfInterest (string[])
- campaignLog (string[]) ← start this as an empty list

The campaignLog will be used throughout the game to track key discoveries, locations visited, and NPCs encountered. It should be referenced in future narrative responses to maintain continuity.

Do not include any explanation or formatting outside of the JSON response.`
};

export async function generateCampaign(params: CampaignParams): Promise<CampaignOutline> {
  const messages = [
    SYSTEM_MESSAGE,
    {
      role: 'user',
      content: `Create a fantasy campaign setting with these preferences:

Tone: ${params.tone}
Theme: ${params.theme}
Magic Style: ${params.magicOption}
Religion Handling: ${params.religionHandling}
Leveling Method: ${params.levelingMethod}
Use Material Components: ${params.materialComponents ? 'Yes' : 'No'}
Track Carry Weight: ${params.carryWeightEnabled ? 'Yes' : 'No'}
Track Rations: ${params.trackRations ? 'Yes' : 'No'}

The user would like to include: ${params.includeElements || 'None'}
The user would like to avoid: ${params.avoidElements || 'None'}

Respond only with the required JSON structure.`
    }
  ];

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    temperature: 0.8,
    messages: [
      { role: 'system', content: 'You are a world-building AI for D&D campaigns.' },
    ],
  });

  const choice = response.choices?.[0]?.message?.content;
  return JSON.parse(choice || '{}') as CampaignOutline;
}