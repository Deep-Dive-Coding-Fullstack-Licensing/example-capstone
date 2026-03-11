import { Link, useParams } from "react-router";
import { ArrowLeft, Heart, MessageCircle, User as UserIcon } from "lucide-react";
import Navigation from "../../components/Navigation";
import type { Route } from "./+types/thread";
import {
  getThreadById,
  getProfileById,
  getRepliesByThreadId,
  getLikeCountByThreadId,
  getReplyCountByThreadId,
  getTimeAgo,
} from "../../data/mock-data";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Thread - Rethreads" },
    { name: "description", content: "View thread and replies" },
  ];
}

export default function Thread() {
  const params = useParams();
  const threadId = params.id || "t2";

  const thread = getThreadById(threadId);
  const threadProfile = thread ? getProfileById(thread.profileId) : null;
  const replies = getRepliesByThreadId(threadId);

  if (!thread || !threadProfile) {
    return <div>Thread not found</div>;
  }

  const threadData = {
    id: thread.id,
    username: threadProfile.name,
    timeAgo: getTimeAgo(thread.datetime),
    content: thread.content,
    imageUrl: thread.imageUrl,
    likes: getLikeCountByThreadId(thread.id),
    replies: getReplyCountByThreadId(thread.id),
  };

  const replyData = replies.map((reply) => {
    const profile = getProfileById(reply.profileId);
    return {
      id: reply.id,
      username: profile?.name || "Unknown",
      timeAgo: getTimeAgo(reply.datetime),
      content: reply.content,
      likes: getLikeCountByThreadId(reply.id),
      replies: 0,
    };
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/feed" className="text-gray-900">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">Thread</h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto bg-white">
        {/* Main Thread */}
        <div className="px-4 py-4 border-b border-gray-200">
          <div className="flex gap-3">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-slate-400 rounded-full flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium text-gray-900">
                  {threadData.username}
                </span>
                <span className="text-gray-500 text-sm">
                  {threadData.timeAgo}
                </span>
              </div>

              <p className="text-gray-900 mb-3 whitespace-pre-wrap">
                {threadData.content}
              </p>

              {/* Image if present */}
              {threadData.imageUrl && (
                <div className="mb-3 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={threadData.imageUrl}
                    alt="Thread attachment"
                    className="w-full h-auto"
                  />
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-6 text-gray-500">
                <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm">{threadData.likes}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">{threadData.replies}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Replies */}
        <div className="divide-y divide-gray-200">
          {replyData.map((reply) => (
            <div key={reply.id} className="px-4 py-4">
              <div className="flex gap-3">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-slate-400 rounded-full flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-gray-900">
                      {reply.username}
                    </span>
                    <span className="text-gray-500 text-sm">{reply.timeAgo}</span>
                  </div>

                  <p className="text-gray-900 mb-3 whitespace-pre-wrap">
                    {reply.content}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-6 text-gray-500">
                    <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
                      <Heart className="w-5 h-5" />
                      <span className="text-sm">{reply.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm">{reply.replies}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reply Button */}
        <div className="px-4 py-4 border-t border-gray-200">
          <Link
            to={`/thread/${params.id}/reply`}
            className="block w-full bg-slate-600 text-white text-center py-3 px-4 rounded-lg font-medium hover:bg-slate-700 transition-colors duration-200"
          >
            Reply to {threadData.username}'s thread
          </Link>
        </div>
      </main>

      {/* Navigation */}
      <Navigation />
    </div>
  );
}
