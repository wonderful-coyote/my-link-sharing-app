import { createClient } from "@supabase/supabase-js";
import { UserData, UserInfo, Link, PlatformType } from "../types"; // Adjust the path as necessary
import { dataIsLink, dataIsUserInfo } from "./typeCheck";

// New interface
interface UserInfoWithSlug extends UserInfo {
  slug?: string;
}

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const getUserData = async (
  userId: string | undefined,
): Promise<UserData | null> => {
  if (!userId) {
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
    slug: "",
  };

  // Fetch user info
  const { data: userInfoData, error: userInfoError } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (userInfoError) {
    console.error("Error fetching user info:", userInfoError);
    return null;
  }

  if (dataIsUserInfo(userInfoData)) {
    const userInfoWithSlug = userInfoData as UserInfoWithSlug;
    userData.userInfo = userInfoWithSlug;
    userData.slug = userInfoWithSlug.slug || "";
  }

  // Fetch links
  const { data: linksData, error: linksError } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", userId);

  if (linksError) {
    console.error("Error fetching links:", linksError);
    return null;
  }

  if (linksData && linksData.length > 0) {
    userData.links = linksData
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
