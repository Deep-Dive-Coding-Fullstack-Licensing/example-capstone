import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // Home - redirects to sign-up
  index("routes/index.tsx"),

  // Auth routes
  route("sign-up", "routes/sign-up/sign-up.tsx"),
  route("sign-in", "routes/sign-in/sign-in.tsx"),

  // Thread routes
  route("feed", "routes/feed/feed.tsx"),
  route("new-thread", "routes/new-thread/new-thread.tsx"),
  route("thread/:id", "routes/thread/thread.tsx"),
  route("thread/:id/reply", "routes/thread/reply.tsx"),

  // Search
  route("search", "routes/search/search.tsx"),

  // User routes
  route("user/:username", "routes/user/user.tsx"),

  // Profile routes
  route("profile", "routes/profile/profile.tsx"),
  route("profile/edit", "routes/profile/edit.tsx"),
  route("profile/connections", "routes/profile/connections.tsx"),
] satisfies RouteConfig;
