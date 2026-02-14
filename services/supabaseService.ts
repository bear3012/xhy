import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_KEY } from '../constants';
import { DiaryLog, SupabaseLogRecord, TimelineEvent } from '../types';

let supabase: SupabaseClient | null = null;

export const getSupabaseClient = () => {
  if (!supabase) {
    supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  }
  return supabase;
};

// --- Diary Logs ---

export const fetchRemoteLogs = async (): Promise<DiaryLog[]> => {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from('earth_logs')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error("Sync logs failed:", error);
    return [];
  }

  return (data as SupabaseLogRecord[]) || [];
};

export const sendLog = async (text: string, isCaptain: boolean): Promise<{ success: boolean; error?: string }> => {
  const client = getSupabaseClient();
  const { error } = await client
    .from('earth_logs')
    .insert([{ 
        author: isCaptain ? "月球队长" : "地球队员", 
        is_captain: isCaptain, 
        text: text 
    }]);

  if (error) {
    console.error("Send log failed:", error);
    return { success: false, error: error.message };
  }
  return { success: true };
};

// --- Timeline Events ---

export const fetchTimelineEvents = async (): Promise<TimelineEvent[]> => {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from('timeline_events')
    .select('*')
    .order('date', { ascending: true }); // 按日期排序

  if (error) {
    console.error("Sync timeline failed:", error);
    return [];
  }

  return (data as TimelineEvent[]) || [];
};

export const addTimelineEvent = async (event: Omit<TimelineEvent, 'id'>): Promise<{ success: boolean; error?: string }> => {
  const client = getSupabaseClient();
  const { error } = await client
    .from('timeline_events')
    .insert([{
      date: event.date,
      title: event.title,
      description: event.description,
      type: event.type,
      is_captain: event.is_captain
    }]);

  if (error) {
    console.error("Add event failed:", error);
    return { success: false, error: error.message };
  }
  return { success: true };
};