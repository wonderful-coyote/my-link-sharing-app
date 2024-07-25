// src/types.ts
import { RefObject } from "react";

export type PlatformType =
  | "GITHUB"
  | "FRONTEND_MENTOR"
  | "TWITTER"
  | "LINKEDIN"
  | "YOUTUBE"
  | "FACEBOOK"
  | "TWITCH"
  | "DEVTO"
  | "CODEWARS"
  | "CODEPEN"
  | "FREE_CODE_CAMP"
  | "GITLAB"
  | "HASHNODE"
  | "STACK_OVERFLOW";

export interface Link {
  id: string;
  inputRef: RefObject<HTMLInputElement> | null;
  platform: PlatformType;
  linkUrl: string;
  listIndex: number;
}

export interface UserData {
  userInfo: {
    firstName: string;
    lastName: string;
    email: string;
    profileImg?: string;
  };
  links: Link[];
  slug: string;
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  profileImg?: string;
}

export interface AuthContextType {
  user: { id: string } | null;
  // Add other properties and methods as needed
}

export interface DataContextType {
  links: Link[];
  userInfo: UserInfo;
  slug: string;
  imgPreviewPath: string;
  addLink: () => void;
  removeLink: (id: string) => void;
  updateLink: (updatedLink: Link) => void;
  addRef: (id: string, ref: RefObject<HTMLInputElement>) => void;
  reorderLinks: (targetId: string, newIdx: number) => void;
  updateUserInfo: (field: keyof UserInfo, value: string) => void;
  previewImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveLinksToDb: () => Promise<null>;
  saveUserInfoToDb: () => Promise<null>;
}
