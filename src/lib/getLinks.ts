import { createClient } from "@supabase/supabase-js";
import { Link } from "../types"; // Adjust the path as necessary
import { dataIsLink } from "./typeCheck";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const getLinks = async (userId: string): Promise<Link[]> => {
  if (!userId) {
    return [];
  }

  const { data, error } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching links:", error);
    return [];
  }

  const verifiedLinks: Link[] = [];

  data?.forEach((link: unknown) => {
    if (dataIsLink(link)) {
      verifiedLinks.push({
        ...link,
        id: crypto.randomUUID(),
        inputRef: null,
      });
    }
  });

  return verifiedLinks;
};
