import CodepenIcon from "@/assets/platformicons/CodepenIcon";
import CodewarsIcon from "@/assets/platformicons/CodewarsIcon";
import DevtoIcon from "@/assets/platformicons/DevtoIcon";
import FacebookIcon from "@/assets/platformicons/FacebookIcon";
import FreeCodeCampIcon from "@/assets/platformicons/FreeCodeCampIcon";
import FrontendMentorIcon from "@/assets/platformicons/FrontendMentorIcon";
import GitHubIcon from "@/assets/platformicons/GitHubIcon";
import GitLabIcon from "@/assets/platformicons/GitLabIcon";
import HashnodeIcon from "@/assets/platformicons/HashnodeIcon";
import LinkIcon from "@/assets/platformicons/LinkIcon";
import LinkedInIcon from "@/assets/platformicons/LinkedInIcon";
import StackOverflowIcon from "@/assets/platformicons/StackOverflowIcon";
import TwitchIcon from "@/assets/platformicons/TwitchIcon";
import TwitterIcon from "@/assets/platformicons/TwitterIcon";
import YouTubeIcon from "@/assets/platformicons/YouTubeIcon";
import { PLATFORMS } from "./platforms";

export const getPlatformIcon = (platform: string, color?: boolean) => {
  switch (platform) {
    case PLATFORMS.GITHUB:
      return <GitHubIcon color={color} />;

    case PLATFORMS.FRONTEND_MENTOR:
      return <FrontendMentorIcon color={color} />;

    case PLATFORMS.TWITTER:
      return <TwitterIcon color={color} />;

    case PLATFORMS.LINKEDIN:
      return <LinkedInIcon color={color} />;

    case PLATFORMS.YOUTUBE:
      return <YouTubeIcon color={color} />;

    case PLATFORMS.FACEBOOK:
      return <FacebookIcon color={color} />;

    case PLATFORMS.TWITCH:
      return <TwitchIcon color={color} />;

    case PLATFORMS.DEVTO:
      return <DevtoIcon color={color} />;

    case PLATFORMS.CODEWARS:
      return <CodewarsIcon color={color} />;

    case PLATFORMS.CODEPEN:
      return <CodepenIcon color={color} />;

    case PLATFORMS.FREE_CODE_CAMP:
      return <FreeCodeCampIcon color={color} />;

    case PLATFORMS.GITLAB:
      return <GitLabIcon color={color} />;

    case PLATFORMS.HASHNODE:
      return <HashnodeIcon color={color} />;

    case PLATFORMS.STACK_OVERFLOW:
      return <StackOverflowIcon color={color} />;

    default:
      return <LinkIcon />;
  }
};
