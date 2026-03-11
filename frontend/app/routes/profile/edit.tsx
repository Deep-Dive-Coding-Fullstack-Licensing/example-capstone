import { Link } from "react-router";
import { ArrowLeft, User as UserIcon } from "lucide-react";
import Navigation from "../../components/Navigation";
import type { Route } from "./+types/edit";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Edit Profile - Rethreads" },
    { name: "description", content: "Edit your profile" },
  ];
}

// Mock data
const mockProfile = {
  username: "profileName",
  bio: "iPad product management channels. Termsheet MVP deployment crowdsource ecosystem",
};

export default function EditProfile() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/profile" className="text-gray-900">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">Profile</h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto bg-white min-h-[calc(100vh-73px)]">
        <div className="p-4">
          <form className="space-y-6">
            {/* Avatar */}
            <div className="flex justify-center">
              <div className="w-24 h-24 bg-slate-400 rounded-full flex items-center justify-center">
                <UserIcon className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                defaultValue={mockProfile.username}
                placeholder="profileName"
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent bg-white text-gray-900"
              />
            </div>

            {/* About Field */}
            <div>
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                About
              </label>
              <textarea
                id="about"
                name="about"
                defaultValue={mockProfile.bio}
                placeholder="About"
                rows={5}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none bg-white text-gray-900"
              />
            </div>

            {/* Update Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="bg-slate-600 text-white px-8 py-2 rounded-lg font-medium hover:bg-slate-700 transition-colors duration-200"
              >
                Update
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
