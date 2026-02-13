import { DiaryLog, TimelineEvent, GalleryItem, WishItem, TimeCapsuleItem, MoodConfig } from './types';

// Supabase Configuration from user input
export const SUPABASE_URL = "https://pyolgdozmrktoklozpgi.supabase.co";
export const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5b2xnZG96bXJrdG9rbG96cGdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5NjE1MDUsImV4cCI6MjA4NjUzNzUwNX0.gGa4_7htVWy0dfyX_vp-YNmSamPS3wV468a1L9GTgHc";

// Background Music URL (Replace with your own MP3 link if needed)
// Using Erik Satie - Gymnopedie No.1 (Public Domain/Creative Commons) as a placeholder for space vibe
export const BGM_URL = "https://pyolgdozmrktoklozpgi.supabase.co/storage/v1/object/public/bgm/0213.MP3";

// Hardcoded Captain Logs
export const CAPTAIN_HARDCODED_LOGS: DiaryLog[] = [
  { 
      author: "月球队长", 
      is_captain: true, 
      created_at: "2026-02-14T00:00:00Z", 
      text: "无论距离远近，我都想着你。无论阴晴圆缺，我都陪在你身边。" 
  },
  { 
      author: "月球队长", 
      is_captain: true, 
      created_at: "2026-02-14T00:01:00Z", 
      text: "这个基站是跨设备同步的，以后有悄悄话可以直接发这里。" 
  }
];

// Start Date for the timer
export const START_SYNC_DATE = new Date('2026-02-10T00:00:00');

// --- New Feature Mock Data ---

export const MOCK_TIMELINE: TimelineEvent[] = [
  { id: 1, date: '2026-02-10', title: '第一次探测到地球信号', description: '在茫茫宇宙中，雷达突然响了一声。', type: 'special' },
  { id: 2, date: '2026-02-13', title: '停止自转', description: '地球是那么美，那些深夜的话让我脸红。', type: 'special' },
];

export const MOCK_GALLERY: GalleryItem[] = [
  { 
    id: 1, 
    imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
    caption: '深夜的炸鸡补给', 
    date: '2026-02-20',
    captainNote: '警告：该区域热量严重超标，作为惩罚，下次见面要多抱十分钟。'
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    caption: '新做的星空美甲',
    date: '2026-02-25',
    captainNote: '很好看，像把银河抓在了手里。'
  }
];

export const MOCK_WISHES: WishItem[] = [
  { id: 1, title: '想喝一点点波霸奶茶', status: 'pending', requester: '地球' },
  { id: 2, title: '周末想连麦看电影', status: 'approved', requester: '地球' },
  { id: 3, title: '想要天上的星星', status: 'rejected', requester: '地球' },
];

export const MOCK_CAPSULES: TimeCapsuleItem[] = [
  { id: 1, title: '致22岁的你', unlockDate: '2027-05-20', content: '...', isLocked: true },
  { id: 2, title: '见面日备忘录', unlockDate: '2026-06-01', content: '...', isLocked: true },
  { id: 3, title: '测试解锁', unlockDate: '2024-01-01', content: '这是一条来自过去的引力波信号：记得按时吃饭。', isLocked: false },
];

export const MOOD_OPTIONS: MoodConfig[] = [
  { icon: '☀️', label: '阳光明媚', response: '收到晴朗信号！今天也是被太阳偏爱的一天，保持开心！' },
  { icon: '🌧️', label: '引力波动', response: '检测到心情低压。没关系，月球引力会帮你分担潮汐，抱抱。' },
  { icon: '☄️', label: '小行星撞击', response: '警报！是谁惹队员生气了？队长正在赶来的路上，准备发射光波打击！' },
];