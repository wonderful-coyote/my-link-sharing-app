import { Link, UserInfo } from "../types"; // Adjust the path as necessary

export const dataIsLink = (data: unknown): data is Link => {
  if (!data || typeof data !== "object") return false;
  return (
    "linkUrl" in data &&
    "platform" in data &&
    typeof (data as Link).linkUrl === "string" &&
    typeof (data as Link).platform === "string"
  );
};

export const dataIsUserInfo = (data: unknown): data is UserInfo => {
  if (!data || typeof data !== "object") return false;
  return (
    "firstName" in data &&
    "lastName" in data &&
    typeof (data as UserInfo).firstName === "string" &&
    typeof (data as UserInfo).lastName === "string"
  );
};
