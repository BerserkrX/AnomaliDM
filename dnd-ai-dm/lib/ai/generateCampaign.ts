import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat';
import { CampaignParams, CampaignOutline } from '@/app/api/campaign/generate/route';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function generateCampaign(params: CampaignParams): Promise<CampaignOutline> {
  const messages: ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content: `You are an API assistant that generates D&D campaign settings for a web application.
You must always return structured JSON using the defined function schema. Never return prose, markdown, or commentary.`
    },
    {
      role: 'user',
      content: `Create a fantasy campaign setting with the following preferences:

Tone: ${params.tone}
Theme: ${params.theme}
Magic Style: ${params.magicOption}
Religion Handling: ${params.religionHandling}
Leveling Method: ${params.levelingMethod}
Use Material Components: ${params.materialComponents ? 'Yes' : 'No'}
Track Carry Weight: ${params.carryWeightEnabled ? 'Yes' : 'No'}
Track Rations: ${params.trackRations ? 'Yes' : 'No'}

The user would like to include: ${params.includeElements || 'None'}
The user would like to avoid: ${params.avoidElements || 'None'}`
    }
  ];

  const response = await openai.chat.completions.create({
    model: 'gpt-4-1106-preview',
    temperature: 0.8,
    messages,
    functions: [
      {
        name: 'generate_campaign',
        description: 'Generate a full campaign outline in JSON format.',
        parameters: {
          type: 'object',
          properties: {
            worldName: { type: 'string' },
            summary: { type: 'string' },
            factions: { type: 'array', items: { type: 'string' } },
            majorNPCs: { type: 'array', items: { type: 'string' } },
            hooks: { type: 'array', items: { type: 'string' } },
            towns: { type: 'array', items: { type: 'string' } },
            cities: { type: 'array', items: { type: 'string' } },
            villages: { type: 'array', items: { type: 'string' } },
            geography: { type: 'array', items: { type: 'string' } },
            climates: { type: 'array', items: { type: 'string' } },
            religions: { type: 'array', items: { type: 'string' } },
            beliefSystems: { type: 'array', items: { type: 'string' } },
            magicLaws: { type: 'string' },
            politicalStructures: { type: 'array', items: { type: 'string' } },
            majorConflicts: { type: 'array', items: { type: 'string' } },
            pointsOfInterest: { type: 'array', items: { type: 'string' } },
            campaignLog: { type: 'array', items: { type: 'string' } }
          },
          required: [
            'worldName',
            'summary',
            'factions',
            'majorNPCs',
            'hooks',
            'towns',
            'cities',
            'villages',
            'geography',
            'climates',
            'religions',
            'beliefSystems',
            'magicLaws',
            'politicalStructures',
            'majorConflicts',
            'pointsOfInterest',
            'campaignLog'
          ]
        }
      }
    ],
    function_call: { name: 'generate_campaign' }
  });

  const fnCall = response.choices[0].message?.function_call;
  if (!fnCall || !fnCall.arguments) {
    console.error('❌ Missing function call or arguments in AI response:', response);
    throw new Error('AI response missing structured JSON');
  }

  try {
    return JSON.parse(fnCall.arguments) as CampaignOutline;
  } catch (e) {
    console.error('❌ JSON parse error:', e, fnCall.arguments);
    throw new Error('AI returned invalid JSON format');
  }
}
