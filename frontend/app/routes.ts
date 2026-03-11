import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home/home.tsx"),
	route('sign-in' ,"routes/sign-in/sign-in.tsx"),
] satisfies RouteConfig;
