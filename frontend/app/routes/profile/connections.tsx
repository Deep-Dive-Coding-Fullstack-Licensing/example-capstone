import { Link, useSearchParams } from "react-router";
import { User as UserIcon, UserX } from "lucide-react";
import { useState, useEffect } from "react";
import Navigation from "../../components/Navigation";
import type { Route } from "./+types/connections";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Following & Followers - Rethreads" },
    { name: "description", content: "Your connections" },
  ];
}

// Mock data
const mockFollowing = [
  { id: "1", username: "profileName" },
  { id: "2", username: "profileName2" },
  { id: "3", username: "profileName3" },
  { id: "4", username: "profileName4" },
  { id: "5", username: "profileName5" },
  { id: "6", username: "profileName6" },
  { id: "7", username: "profileName7" },
  { id: "8", username: "profileName8" },
];

const mockFollowers = [
  { id: "11", username: "follower1" },
  { id: "12", username: "follower2" },
  { id: "13", username: "follower3" },
  { id: "14", username: "follower4" },
  { id: "15", username: "follower5" },
];

export default function ProfileConnections() {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<"following" | "followers">(
    tabParam === "followers" ? "followers" : "following"
  );

  useEffect(() => {
    if (tabParam === "followers") {
      setActiveTab("followers");
    } else {
      setActiveTab("following");
    }
  }, [tabParam]);

  const users = activeTab === "following" ? mockFollowing : mockFollowers;

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto">
          {/* Tabs */}
          <div className="flex">
            <button
              onClick={() => setActiveTab("following")}
              className={`flex-1 py-4 text-center font-medium border-b-2 transition-colors ${
                activeTab === "following"
                  ? "border-slate-600 text-slate-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Following
            </button>
            <button
              onClick={() => setActiveTab("followers")}
              className={`flex-1 py-4 text-center font-medium border-b-2 transition-colors ${
                activeTab === "followers"
                  ? "border-slate-600 text-slate-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Followers
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto bg-white min-h-[calc(100vh-73px)]">
        <div className="divide-y divide-gray-200">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors"
            >
              <Link
                to={`/user/${user.username}`}
                className="flex items-center gap-3 flex-1"
              >
                <div className="w-10 h-10 bg-slate-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <UserIcon className="w-6 h-6 text-white" />
                </div>
                <span className="font-medium text-gray-900">
                  {user.username}
                </span>
              </Link>
              <button
                className="text-gray-500 hover:text-red-500 transition-colors"
                aria-label="Unfollow"
              >
                <UserX className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Navigation */}
      <Navigation />
    </div>
  );
}
