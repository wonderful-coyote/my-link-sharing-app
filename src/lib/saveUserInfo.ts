import { createClient } from "@supabase/supabase-js";
import { UserInfo } from "../types"; // Adjust the path as necessary

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const saveUserInfo = async (
  userId: string,
  userInfo: UserInfo,
): Promise<boolean> => {
  if (!userId || !userInfo) {
    return false;
  }

  const { error } = await supabase
    .from("users") // Assuming your table is named "users"
    .update(userInfo)
    .eq("id", userId);

  if (error) {
    console.error("Error saving user info:", error);
    return false;
  }

  return true;
};
