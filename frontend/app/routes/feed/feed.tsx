import Navigation from "../../components/Navigation";
import ThreadCard from "../../components/ThreadCard";
import type { Route } from "./+types/feed";
import {
  mockThreads,
  getProfileById,
  getLikeCountByThreadId,
  getReplyCountByThreadId,
  getTimeAgo,
} from "../../data/mock-data";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home - Rethreads" },
    { name: "description", content: "Your thread feed" },
  ];
}

export default function Feed() {
  // Get only top-level threads (not replies)
  const feedThreads = mockThreads
    .filter((thread) => !thread.replyThreadId)
    .map((thread) => {
      const profile = getProfileById(thread.profileId);
      return {
        id: thread.id,
        username: profile?.name || "Unknown",
        timeAgo: getTimeAgo(thread.datetime),
        content: thread.content,
        imageUrl: thread.imageUrl,
        likes: getLikeCountByThreadId(thread.id),
        replies: getReplyCountByThreadId(thread.id),
      };
    });

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold text-gray-900">Home</h1>
        </div>
      </header>

      {/* Thread Feed */}
      <main className="max-w-2xl mx-auto">
        {feedThreads.map((thread) => (
          <ThreadCard key={thread.id} {...thread} />
        ))}
      </main>

      {/* Navigation */}
      <Navigation />
    </div>
  );
}
