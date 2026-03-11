// Mock data matching the SQL schema from .claude/documentation/project.sql

export interface Profile {
  id: string;
  about: string | null;
  activationToken: string | null;
  email: string;
  hash: string;
  imageUrl: string | null;
  name: string;
}

export interface Keyword {
  id: string;
  name: string;
}

export interface Thread {
  id: string;
  profileId: string;
  replyThreadId: string | null;
  content: string;
  datetime: string;
  imageUrl: string | null;
}

export interface Follow {
  followerId: string;
  followingId: string;
}

export interface Tag {
  keywordId: string;
  threadId: string;
}

export interface Like {
  profileId: string;
  threadId: string;
  datetime: string;
}

// Mock Profiles
export const mockProfiles: Profile[] = [
  {
    id: "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    name: "techguru",
    email: "techguru@example.com",
    about: "Passionate about agile development and product management. Love discussing innovation and startups.",
    hash: "mock_hash_1",
    imageUrl: null,
    activationToken: null,
  },
  {
    id: "2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
    name: "innovator",
    email: "innovator@example.com",
    about: "Equity innovator buyer. Building the future of tech one startup at a time.",
    hash: "mock_hash_2",
    imageUrl: null,
    activationToken: null,
  },
  {
    id: "3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f",
    name: "startupfan",
    email: "startupfan@example.com",
    about: "Startup enthusiast. Always learning about business models and growth hacking.",
    hash: "mock_hash_3",
    imageUrl: null,
    activationToken: null,
  },
  {
    id: "4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a",
    name: "currentUser",
    email: "currentuser@example.com",
    about: "iPad product management channels. Termsheet MVP deployment crowdsource ecosystem",
    hash: "mock_hash_4",
    imageUrl: null,
    activationToken: null,
  },
];

// Mock Keywords
export const mockKeywords: Keyword[] = [
  { id: "k1", name: "agile" },
  { id: "k2", name: "startup" },
  { id: "k3", name: "mvp" },
  { id: "k4", name: "tech" },
  { id: "k5", name: "innovation" },
];

// Mock Threads
export const mockThreads: Thread[] = [
  {
    id: "t1",
    profileId: "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    replyThreadId: null,
    content: "Agile development holy grail series A financing gen-z iPad product management channels. #agile #startup",
    datetime: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    imageUrl: null,
  },
  {
    id: "t2",
    profileId: "2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
    replyThreadId: null,
    content: "Equity innovator buyer. Bandwidth growth hacking startup beta direct mailing business model canvas #startup #innovation",
    datetime: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    imageUrl: "https://via.placeholder.com/400x300/e2e8f0/64748b?text=Startup+Image",
  },
  {
    id: "t3",
    profileId: "3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f",
    replyThreadId: null,
    content: "Business model canvas network effects #mvp #tech",
    datetime: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
    imageUrl: null,
  },
  {
    id: "t4",
    profileId: "2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
    replyThreadId: "t2",
    content: "business-to-consumer learning curve mass market agile development.",
    datetime: new Date(Date.now() - 3600000).toISOString(),
    imageUrl: null,
  },
  {
    id: "t5",
    profileId: "3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f",
    replyThreadId: "t2",
    content: "gen-z iPad product management",
    datetime: new Date(Date.now() - 1800000).toISOString(),
    imageUrl: null,
  },
];

// Mock Follows
export const mockFollows: Follow[] = [
  { followerId: "4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a", followingId: "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d" },
  { followerId: "4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a", followingId: "2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e" },
  { followerId: "4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a", followingId: "3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f" },
  { followerId: "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d", followingId: "4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a" },
  { followerId: "2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e", followingId: "4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a" },
];

// Mock Likes
export const mockLikes: Like[] = [
  { profileId: "4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a", threadId: "t1", datetime: new Date().toISOString() },
  { profileId: "4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a", threadId: "t2", datetime: new Date().toISOString() },
  { profileId: "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d", threadId: "t1", datetime: new Date().toISOString() },
  { profileId: "2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e", threadId: "t2", datetime: new Date().toISOString() },
  { profileId: "3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f", threadId: "t3", datetime: new Date().toISOString() },
];

// Mock Tags
export const mockTags: Tag[] = [
  { threadId: "t1", keywordId: "k1" },
  { threadId: "t1", keywordId: "k2" },
  { threadId: "t2", keywordId: "k2" },
  { threadId: "t2", keywordId: "k5" },
  { threadId: "t3", keywordId: "k3" },
  { threadId: "t3", keywordId: "k4" },
];

// Helper functions to get related data
export const getProfileById = (id: string): Profile | undefined => {
  return mockProfiles.find((p) => p.id === id);
};

export const getThreadById = (id: string): Thread | undefined => {
  return mockThreads.find((t) => t.id === id);
};

export const getThreadsByProfileId = (profileId: string): Thread[] => {
  return mockThreads.filter((t) => t.profileId === profileId && !t.replyThreadId);
};

export const getRepliesByThreadId = (threadId: string): Thread[] => {
  return mockThreads.filter((t) => t.replyThreadId === threadId);
};

export const getLikeCountByThreadId = (threadId: string): number => {
  return mockLikes.filter((l) => l.threadId === threadId).length;
};

export const getReplyCountByThreadId = (threadId: string): number => {
  return getRepliesByThreadId(threadId).length;
};

export const getFollowingByFollowerId = (followerId: string): Profile[] => {
  const followingIds = mockFollows
    .filter((f) => f.followerId === followerId)
    .map((f) => f.followingId);
  return mockProfiles.filter((p) => followingIds.includes(p.id));
};

export const getFollowersByFollowingId = (followingId: string): Profile[] => {
  const followerIds = mockFollows
    .filter((f) => f.followingId === followingId)
    .map((f) => f.followerId);
  return mockProfiles.filter((p) => followerIds.includes(p.id));
};

export const getFollowingCount = (profileId: string): number => {
  return mockFollows.filter((f) => f.followerId === profileId).length;
};

export const getFollowerCount = (profileId: string): number => {
  return mockFollows.filter((f) => f.followingId === profileId).length;
};

// Current logged-in user
export const CURRENT_USER_ID = "4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a";
export const getCurrentUser = (): Profile => {
  return getProfileById(CURRENT_USER_ID)!;
};

// Helper to format time ago
export const getTimeAgo = (datetime: string): string => {
  const now = new Date();
  const past = new Date(datetime);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) {
    return `${diffMins}m`;
  } else if (diffHours < 24) {
    return `${diffHours}h`;
  } else {
    return `${diffDays}d`;
  }
};
