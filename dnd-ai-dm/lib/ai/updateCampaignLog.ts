// lib/ai/updateCampaignLog.ts
import { supabase } from '@/lib/supabaseClient';

export async function updateCampaignLog(campaignId: string, newEntry: string) {

  const { data: campaign, error } = await supabase
    .from('campaigns')
    .select('campaign_log')
    .eq('id', campaignId)
    .single();

  if (error || !campaign) throw new Error('Campaign not found');

  const log = campaign.campaign_log || [];
  log.push({ entry: newEntry, timestamp: new Date().toISOString() });

  const { error: updateError } = await supabase
    .from('campaigns')
    .update({ campaign_log: log })
    .eq('id', campaignId);

  if (updateError) throw new Error('Failed to update campaign log');
}
