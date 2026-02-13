export type AppModule = 'diary' | 'timeline' | 'gallery' | 'wishes' | 'mood' | 'capsule';

export interface DiaryLog {
  id?: number;
  author: string;
  is_captain: boolean;
  text: string;
  created_at: string;
}

export interface SupabaseLogRecord {
  id: number;
  created_at: string;
  author: string;
  is_captain: boolean;
  text: string;
}

export interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  type: 'special' | 'normal';
}

export interface GalleryItem {
  id: number;
  imageUrl: string;
  caption: string;
  captainNote?: string;
  date: string;
}

export interface WishItem {
  id: number;
  title: string;
  status: 'pending' | 'approved' | 'rejected' | 'fulfilled';
  requester: string;
}

export interface TimeCapsuleItem {
  id: number;
  unlockDate: string;
  title: string;
  content: string;
  isLocked: boolean;
}

export interface MoodConfig {
  icon: string;
  label: string;
  response: string;
}