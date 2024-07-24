import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import { createClient } from "../../utils/supabase/client";

const IDLE_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds

export function useIdleTimer() {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const logoutUser = useCallback(async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/signIn");
  }, [router]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(logoutUser, IDLE_TIMEOUT);
  }, [logoutUser]);

  useEffect(() => {
    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
    ];

    const onEvent = () => {
      resetTimer();
    };

    events.forEach((event) => {
      window.addEventListener(event, onEvent);
    });

    resetTimer();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      events.forEach((event) => {
        window.removeEventListener(event, onEvent);
      });
    };
  }, [resetTimer]);
}
