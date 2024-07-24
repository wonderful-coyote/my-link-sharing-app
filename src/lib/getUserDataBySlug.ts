import { createClient } from "@supabase/supabase-js";
import { UserData, UserInfo, Link, PlatformType } from "../types"; // Adjust the path as necessary
import { dataIsLink, dataIsUserInfo } from "./typeCheck";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const getUserDataBySlug = async (
  userSlug: string | undefined,
): Promise<UserData | null> => {
  if (!userSlug) {
    return null;
  }

  const userData: UserData = {
    userInfo: {
      firstName: "",
      lastName: "",
      email: "",
      profileImg: "",
    },
    links: [],
    slug: userSlug,
  };

  // Fetch user info
  const { data: userInfo, error: userInfoError } = await supabase
    .from("users")
    .select("*")
    .eq("slug", userSlug)
    .single();

  if (userInfoError) {
    console.error("Error fetching user info:", userInfoError);
    return null;
  }

  if (dataIsUserInfo(userInfo)) {
    userData.userInfo = userInfo as UserInfo;
  }

  // Fetch links
  const { data: links, error: linksError } = await supabase
    .from("links")
    .select("*")
    .eq("user_slug", userSlug);

  if (linksError) {
    console.error("Error fetching links:", linksError);
    return null;
  }

  if (links && links.length > 0) {
    userData.links = links
      .map((link: unknown): Link | null => {
        if (dataIsLink(link)) {
          return {
            ...link,
            id: crypto.randomUUID(),
            inputRef: null,
            platform: link.platform as PlatformType,
            listIndex: 0, // You might want to set this properly
          };
        }
        return null;
      })
      .filter((link): link is Link => link !== null);
  }

  return userData;
};
