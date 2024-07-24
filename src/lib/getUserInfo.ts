import { createClient } from "@supabase/supabase-js";
import { UserInfo } from "../types"; // Adjust the path as necessary
import { dataIsUserInfo } from "./typeCheck";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const getUserInfo = async (userId: string): Promise<UserInfo | null> => {
  if (!userId) {
    return null;
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching user info:", error);
    return null;
  }

  if (dataIsUserInfo(data)) {
    return data;
  }

  return null;
};
