// src/components/ProtectedRoute.tsx
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      // If there's no user, redirect to the login page
      router.push("/authentication/signIn");
    } else {
      setIsLoading(false);
    }
  }, [user, router]);

  // Show nothing while checking authentication
  if (isLoading) {
    return null;
  }

  return <>{children}</>;
}
