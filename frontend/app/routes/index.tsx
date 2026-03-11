import { useEffect } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Rethreads - Social Media Platform" },
    { name: "description", content: "Welcome to Rethreads!" },
  ];
}

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/sign-up");
  }, [navigate]);

  return null;
}
