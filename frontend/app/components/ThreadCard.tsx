import { Link } from "react-router";
import { Heart, MessageCircle, User as UserIcon } from "lucide-react";

interface ThreadCardProps {
  id: string;
  username: string;
  timeAgo: string;
  content: string;
  imageUrl?: string;
  likes: number;
  replies: number;
}

export default function ThreadCard({
  id,
  username,
  timeAgo,
  content,
  imageUrl,
  likes,
  replies,
}: ThreadCardProps) {
  return (
    <Link to={`/thread/${id}`} className="block">
      <div className="bg-white border-b border-gray-200 px-4 py-4 hover:bg-gray-50 transition-colors">
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
              <span className="font-medium text-gray-900">{username}</span>
              <span className="text-gray-500 text-sm">{timeAgo}</span>
            </div>

            <p className="text-gray-900 mb-3 whitespace-pre-wrap">{content}</p>

            {/* Image if present */}
            {imageUrl && (
              <div className="mb-3 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={imageUrl}
                  alt="Thread attachment"
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-6 text-gray-500">
              <button
                className="flex items-center gap-2 hover:text-red-500 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  // Handle like
                }}
              >
                <Heart className="w-5 h-5" />
                <span className="text-sm">{likes}</span>
              </button>
              <button
                className="flex items-center gap-2 hover:text-blue-500 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  // Handle reply
                }}
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm">{replies}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
