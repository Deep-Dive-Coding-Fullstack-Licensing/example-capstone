import { Link, useParams } from "react-router";
import { ArrowLeft, User as UserIcon } from "lucide-react";
import Navigation from "../../components/Navigation";
import ThreadCard from "../../components/ThreadCard";
import type { Route } from "./+types/user";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Profile - Rethreads" },
    { name: "description", content: "User profile" },
  ];
}

// Mock data
const mockProfile = {
  username: "profileName",
  bio: "Equity innovator buyer. Bandwidth growth hacking startup beta direct mailing business model canvas",
  isFollowing: false,
};

const mockThreads = [
  {
    id: "1",
    username: "profileName",
    timeAgo: "6hr",
    content:
      "Agile development holy grail series A financing gen-z iPad product management channels. Termsheet MVP deployment crowdsource ecosystem disruptive business-to-consumer learning curve mass market agile development.",
    likes: 17,
    replies: 4,
  },
  {
    id: "2",
    username: "profileName",
    timeAgo: "8hr",
    content:
      "Equity innovator buyer. Bandwidth growth hacking startup beta direct mailing business model canvas",
    likes: 33,
    replies: 9,
  },
];

export default function UserProfile() {
  const params = useParams();

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/feed" className="text-gray-900">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">Profile</h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto bg-white">
        {/* Profile Header */}
        <div className="px-4 py-6 border-b border-gray-200">
          {/* Avatar and Username */}
          <div className="flex flex-col items-center mb-4">
            <div className="w-24 h-24 bg-slate-400 rounded-full flex items-center justify-center mb-3">
              <UserIcon className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              {mockProfile.username}
            </h2>
          </div>

          {/* Bio */}
          <p className="text-gray-600 text-center mb-6 px-4">
            {mockProfile.bio}
          </p>

          {/* Follow Button */}
          <div className="flex justify-center">
            <button className="bg-slate-600 text-white px-8 py-2 rounded-lg font-medium hover:bg-slate-700 transition-colors duration-200">
              Follow
            </button>
          </div>
        </div>

        {/* User Threads */}
        <div>
          {mockThreads.map((thread) => (
            <ThreadCard key={thread.id} {...thread} />
          ))}
        </div>
      </main>

      {/* Navigation */}
      <Navigation />
    </div>
  );
}
