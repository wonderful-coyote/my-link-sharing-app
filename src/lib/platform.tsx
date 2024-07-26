import React from "react";
import CodepenIcon from "../assets/platformicons/CodepenIcon";
import CodewarsIcon from "../assets/platformicons/CodewarsIcon";
import DevtoIcon from "../assets/platformicons/DevtoIcon";
import FacebookIcon from "../assets/platformicons/FacebookIcon";
import FreeCodeCampIcon from "../assets/platformicons/FreeCodeCampIcon";
import FrontendMentorIcon from "../assets/platformicons/FrontendMentorIcon";
import GitHubIcon from "../assets/platformicons/GitHubIcon";
import GitLabIcon from "../assets/platformicons/GitLabIcon";
import HashnodeIcon from "../assets/platformicons/HashnodeIcon";
import LinkIcon from "../assets/platformicons/LinkIcon";
import LinkedInIcon from "../assets/platformicons/LinkedInIcon";
import StackOverflowIcon from "../assets/platformicons/StackOverflowIcon";
import TwitchIcon from "../assets/platformicons/TwitchIcon";
import TwitterIcon from "../assets/platformicons/TwitterIcon";
import YouTubeIcon from "../assets/platformicons/YouTubeIcon";
import { generateMatchExp } from "@/lib/urlValidator";

export interface PlatformInfo {
  name: string;
  icon: (color?: boolean) => React.ReactElement;
  color: string;
  url: string;
}

export const PLATFORMS: Record<string, PlatformInfo> = {
  GITHUB: {
    name: "GitHub",
    icon: (color?: boolean) => <GitHubIcon color={color} />,
    color: "#1A1A1A",
    url: generateMatchExp("GITHUB"),
  },
  FRONTEND_MENTOR: {
    name: "Frontend Mentor",
    icon: (color?: boolean) => <FrontendMentorIcon color={color} />,
    color: "#FFFFFF",
    url: generateMatchExp("FRONTEND_MENTOR"),
  },
  TWITTER: {
    name: "Twitter",
    icon: (color?: boolean) => <TwitterIcon color={color} />,
    color: "#43B7E9",
    url: generateMatchExp("TWITTER"),
  },
  LINKEDIN: {
    name: "LinkedIn",
    icon: (color?: boolean) => <LinkedInIcon color={color} />,
    color: "#2D68FF",
    url: generateMatchExp("LINKEDIN"),
  },
  YOUTUBE: {
    name: "YouTube",
    icon: (color?: boolean) => <YouTubeIcon color={color} />,
    color: "#EE3939",
    url: generateMatchExp("YOUTUBE"),
  },
  FACEBOOK: {
    name: "Facebook",
    icon: (color?: boolean) => <FacebookIcon color={color} />,
    color: "#2442AC",
    url: generateMatchExp("FACEBOOK"),
  },
  TWITCH: {
    name: "Twitch",
    icon: (color?: boolean) => <TwitchIcon color={color} />,
    color: "#EE3FC8",
    url: generateMatchExp("TWITCH"),
  },
  DEVTO: {
    name: "Dev.to",
    icon: (color?: boolean) => <DevtoIcon color={color} />,
    color: "#333333",
    url: generateMatchExp("DEVTO"),
  },
  CODEWARS: {
    name: "Codewars",
    icon: (color?: boolean) => <CodewarsIcon color={color} />,
    color: "#8A1A50",
    url: generateMatchExp("CODEWARS"),
  },
  CODEPEN: {
    name: "Codepen",
    icon: (color?: boolean) => <CodepenIcon color={color} />,
    color: "#333333",
    url: generateMatchExp("CODEPEN"),
  },
  FREE_CODE_CAMP: {
    name: "freeCodeCamp",
    icon: (color?: boolean) => <FreeCodeCampIcon color={color} />,
    color: "#302267",
    url: generateMatchExp("FREE_CODE_CAMP"),
  },
  GITLAB: {
    name: "GitLab",
    icon: (color?: boolean) => <GitLabIcon color={color} />,
    color: "#EB4925",
    url: generateMatchExp("GITLAB"),
  },
  HASHNODE: {
    name: "Hashnode",
    icon: (color?: boolean) => <HashnodeIcon color={color} />,
    color: "#0330D1",
    url: generateMatchExp("HASHNODE"),
  },
  STACK_OVERFLOW: {
    name: "Stack Overflow",
    icon: (color?: boolean) => <StackOverflowIcon color={color} />,
    color: "#EC7100",
    url: generateMatchExp("STACK_OVERFLOW"),
  },
};

export type PlatformKey = keyof typeof PLATFORMS;
export type PlatformType = PlatformKey;

export const getPlatformIcon = (platform: PlatformKey, color?: boolean) => {
  return PLATFORMS[platform]?.icon(color) || <LinkIcon />;
};

export const generateBackgroundColor = (platform: PlatformKey) => {
  return PLATFORMS[platform]?.color || "var(--clr-purple-pri)";
};

export const getPlatformUrl = (platform: PlatformKey) => {
  return PLATFORMS[platform]?.url || "";
};
