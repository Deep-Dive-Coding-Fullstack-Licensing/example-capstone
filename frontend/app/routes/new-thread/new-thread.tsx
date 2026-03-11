import { Link } from "react-router";
import { ArrowLeft, Paperclip, User as UserIcon } from "lucide-react";
import Navigation from "../../components/Navigation";
import type { Route } from "./+types/new-thread";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New Thread - Rethreads" },
    { name: "description", content: "Create a new thread" },
  ];
}

export default function NewThread() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/feed" className="text-gray-900">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">New Thread</h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto bg-white min-h-[calc(100vh-73px)]">
        <div className="p-4">
          {/* User Info */}
          <div className="flex items-start gap-3 mb-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-slate-400 rounded-full flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 mb-2">profileName</p>
            </div>
          </div>

          {/* Thread Input */}
          <form className="space-y-4">
            <textarea
              placeholder="Start a thread..."
              className="w-full min-h-[200px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none text-gray-900"
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
