import React from "react";
import { useIdleTimer } from "../hooks/useIdleTimer";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

export default function AuthenticatedLayout({
  children,
}: AuthenticatedLayoutProps) {
  useIdleTimer();
  const { user } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!user) {
      router.push("/auth/signIn");
    }
  }, [user, router]);

  if (!user) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
}
