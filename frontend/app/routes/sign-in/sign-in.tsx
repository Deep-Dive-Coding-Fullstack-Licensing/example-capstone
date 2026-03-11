import { Link } from "react-router";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { Route } from "./+types/sign-in";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sign In - Rethreads" },
    { name: "description", content: "Sign in to your Rethreads account" },
  ];
}

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome.</h1>
          <p className="text-gray-600 mb-8">Sign In</p>

          <form className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent bg-gray-50"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent bg-gray-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-slate-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-slate-700 transition-colors duration-200"
            >
              Sign In
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <Link
              to="/sign-up"
              className="text-sm text-gray-600 hover:text-gray-900 underline"
            >
              Don't have an account... Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
