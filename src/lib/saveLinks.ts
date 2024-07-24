import { createClient } from "@supabase/supabase-js";
import { Link } from "../types"; // Adjust the path as necessary

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const saveLinks = async (
  userId: string,
  links: Link[],
): Promise<boolean> => {
  if (!userId) {
    return false;
  }

  const { error } = await supabase.from("links").upsert(
    links.map((link) => ({
      user_id: userId,
      platform: link.platform,
      linkUrl: link.linkUrl, // Changed from 'url' to 'linkUrl'
    })),
    { onConflict: "user_id,platform" },
  );

  if (error) {
    console.error("Error saving links:", error);
    return false;
  }

  return true;
};
