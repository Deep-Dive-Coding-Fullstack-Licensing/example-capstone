import { Link, useParams } from "react-router";
import { ArrowLeft, Paperclip, Heart, MessageCircle, User as UserIcon } from "lucide-react";
import Navigation from "../../components/Navigation";
import type { Route } from "./+types/reply";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Reply - Rethreads" },
    { name: "description", content: "Reply to thread" },
  ];
}

// Mock data for the thread being replied to
const mockThread = {
  id: "1",
  username: "profileName1",
  timeAgo: "6hr",
  content:
    "Equity innovator buyer. Bandwidth growth hacking startup beta direct mailing business model canvas",
  imageUrl: "https://via.placeholder.com/400x300/e2e8f0/64748b?text=Image+Placeholder",
  likes: 33,
  replies: 9,
};

export default function ReplyToThread() {
  const params = useParams();

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link to={`/thread/${params.id}`} className="text-gray-900">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">Reply</h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto bg-white min-h-[calc(100vh-73px)]">
        <div className="p-4">
          {/* Original Thread */}
          <div className="mb-6 pb-6 border-b border-gray-200">
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
                    {mockThread.username}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {mockThread.timeAgo}
                  </span>
                </div>

                <p className="text-gray-900 mb-3 whitespace-pre-wrap">
                  {mockThread.content}
                </p>

                {/* Image if present */}
                {mockThread.imageUrl && (
                  <div className="mb-3 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={mockThread.imageUrl}
                      alt="Thread attachment"
                      className="w-full h-auto"
                    />
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-6 text-gray-500">
                  <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                    <span className="text-sm">{mockThread.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">{mockThread.replies}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Reply Section */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-slate-400 rounded-full flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 mb-2">profileName</p>
            </div>
          </div>

          {/* Reply Input */}
          <form className="space-y-4 mt-4">
            <textarea
              placeholder={`Reply to ${mockThread.username}'s thread`}
              className="w-full min-h-[150px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none text-gray-900"
              name="content"
            />

            {/* Attachment Button */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Attach file"
              >
                <Paperclip className="w-6 h-6" />
              </button>
            </div>

            {/* Post Button */}
            <div className="flex justify-start">
              <button
                type="submit"
                className="bg-slate-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-700 transition-colors duration-200"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Navigation */}
      <Navigation />
    </div>
  );
}
