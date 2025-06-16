// lib/ai/applyDMUpdates.ts
import { supabase } from '@/lib/supabaseClient';


interface UpdateInventoryAction {
  type: 'updateInventory';
  characterId: string;
  add?: string[];
  remove?: string[];
}

interface UseSpellSlotAction {
  type: 'useSpellSlot';
  characterId: string;
  spellLevel: number;
}

export async function applyDMUpdates(
  campaignId: string,
  actions: (UpdateInventoryAction | UseSpellSlotAction)[]
) {

  for (const action of actions) {
    if (action.type === 'updateInventory') {
      const { data: character } = await supabase
        .from('characters')
        .select('inventory')
        .eq('id', action.characterId)
        .single();

      let newInventory = character?.inventory || [];
      if (action.remove) newInventory = newInventory.filter((item: string) => !action.remove!.includes(item));
      if (action.add) newInventory = [...newInventory, ...action.add];

      await supabase.from('characters').update({ inventory: newInventory }).eq('id', action.characterId);
    }

    if (action.type === 'useSpellSlot') {
      const { data: character } = await supabase
        .from('characters')
        .select('spell_slots')
        .eq('id', action.characterId)
        .single();

      const spellSlots = character?.spell_slots || {};
      if (spellSlots[action.spellLevel] && spellSlots[action.spellLevel] > 0) {
        spellSlots[action.spellLevel] -= 1;
        await supabase.from('characters').update({ spell_slots: spellSlots }).eq('id', action.characterId);
      }
    }
  }
}
