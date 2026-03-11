import { Link, useLocation } from "react-router";
import { Home, Search, Edit, User } from "lucide-react";

export default function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
      <div className="flex justify-around items-center h-16">
        <Link
          to="/feed"
          className={`flex flex-col items-center justify-center flex-1 h-full ${
            isActive("/feed") ? "text-slate-700" : "text-gray-400"
          }`}
        >
          <Home size={24} />
        </Link>
        <Link
          to="/search"
          className={`flex flex-col items-center justify-center flex-1 h-full ${
            isActive("/search") ? "text-slate-700" : "text-gray-400"
          }`}
        >
          <Search size={24} />
        </Link>
        <Link
          to="/new-thread"
          className={`flex flex-col items-center justify-center flex-1 h-full ${
            isActive("/new-thread") ? "text-slate-700" : "text-gray-400"
          }`}
        >
          <Edit size={24} />
        </Link>
        <Link
          to="/profile"
          className={`flex flex-col items-center justify-center flex-1 h-full ${
            isActive("/profile") ? "text-slate-700" : "text-gray-400"
          }`}
        >
          <User size={24} />
        </Link>
      </div>
    </nav>
  );
}
