// app/campaign/generate/route.ts
//links with lib/ai/generateCampaign.ts and campaign/create/page.tsx

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { generateCampaign } from "@/lib/ai/generateCampaign"

export interface CampaignParams {
  tone: string
  theme: string
  magicOption: string
  religionHandling: string
  levelingMethod: string
  materialComponents: boolean;
  carryWeightEnabled: boolean;
  trackRations: boolean;
  includeElements: string;
  avoidElements: string;
  // …any additional fields your form sends…
}

export interface CampaignOutline {
  worldName: string;
  summary: string;
  majorNPCs: string[];
  hooks: string[];
  towns: string[];
  cities: string[];
  villages: string[];
  factions: string[];
  geography: string[];
  climates: string[];
  religions: string[];
  beliefSystems: string[];
  magicLaws: string;
  politicalStructures: string[];
  majorConflicts: string[];
  pointsOfInterest: string[];
  campaignLog: string[];
  // …add more keys if your AI helper supplies them…
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('🧾 API Received:', body);
    const outline = await generateCampaign(body); 
    return NextResponse.json({ outline });
  } catch (err: any) {
      console.error('AI generation failed', err);
      return NextResponse.json(
        { error: err.message || 'Unknown error' },
        { status: 500 }
      );
  }
}