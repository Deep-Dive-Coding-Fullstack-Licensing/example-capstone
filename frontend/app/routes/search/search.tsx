import { ArrowLeft, Search as SearchIcon } from "lucide-react";
import { Link } from "react-router";
import Navigation from "../../components/Navigation";
import type { Route } from "./+types/search";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Search - Rethreads" },
    { name: "description", content: "Search for threads and users" },
  ];
}

export default function Search() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/feed" className="text-gray-900">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">Search</h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto bg-white min-h-[calc(100vh-73px)]">
        <div className="p-4">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="search"
              placeholder="Search"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent bg-white text-gray-900"
              autoFocus
            />
          </div>

          {/* Search Results would go here */}
          <div className="mt-8 text-center text-gray-500">
            <p>Search for threads, users, or hashtags</p>
          </div>
        </div>
      </main>

      {/* Navigation */}
      <Navigation />
    </div>
  );
}
