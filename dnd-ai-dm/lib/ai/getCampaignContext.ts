import { createServerClient } from '@/utils/supabase/server';

export async function getCampaignContext(campaignId: string) {
  const supabase = createServerClient();

  const { data: campaign } = await supabase
    .from('campaigns')
    .select('*, campaign_participants(*, characters(*, inventory(*), spells(*)))')
    .eq('id', campaignId)
    .single();

  if (!campaign) throw new Error('Campaign not found');

  return {
    skeleton: campaign.skeleton,
    log: campaign.campaignLog,
    players: campaign.campaign_participants.map(p => ({
      name: p.characters?.name,
      stats: p.characters,
      inventory: p.characters?.inventory || [],
      spells: p.characters?.spells || [],
      is_present: p.is_present,
    })),
  };
}
