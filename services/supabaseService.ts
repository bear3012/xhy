import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_KEY } from '../constants';
import { DiaryLog, SupabaseLogRecord } from '../types';

let supabase: SupabaseClient | null = null;

export const getSupabaseClient = () => {
  if (!supabase) {
    supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  }
  return supabase;
};

export const fetchRemoteLogs = async (): Promise<DiaryLog[]> => {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from('earth_logs')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error("Sync failed:", error);
    return [];
  }

  return (data as SupabaseLogRecord[]) || [];
};

export const sendLog = async (text: string): Promise<boolean> => {
  const client = getSupabaseClient();
  const { error } = await client
    .from('earth_logs')
    .insert([{ 
        author: "地球队员", 
        is_captain: false, 
        text: text 
    }]);

  if (error) {
    console.error("Send failed:", error);
    return false;
  }
  return true;
};