import React from "react";
import RightArrowIcon from "@/assets/platformicons/RightArrowIcon";
import { PLATFORMS, PlatformKey } from "@/lib/platforms";
import { generateBackgroundColor } from "@/lib/platformColors";
import { getPlatformIcon } from "@/lib/platformIcons";

interface Link {
  platform: string;
  linkUrl: string;
}

interface PreviewLinkProps {
  link: Link;
  bare?: boolean;
}

const PreviewLink: React.FC<PreviewLinkProps> = ({ link, bare }) => {
  const isFrontEndMentor = link.platform === PLATFORMS.FRONTEND_MENTOR;
  const backgroundColor = generateBackgroundColor(link.platform as PlatformKey);

  return (
    <a
      href={link.linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2 w-[237px] p-4 rounded-[var(--border-radius)]`}
      style={{
        backgroundColor,
        border: isFrontEndMentor ? "1px solid var(--clr-border)" : "none",
        height: bare ? "44px" : "56px",
      }}
    >
      <div className="w-5 h-auto">
        {getPlatformIcon(link.platform as PlatformKey, true)}
      </div>
      <span
        className="flex-grow text-left"
        style={{
          color: isFrontEndMentor
            ? "var(--clr-dark-grey)"
            : "var(--clr-white-pri)",
        }}
      >
        {link.platform}
      </span>
      <RightArrowIcon grey={isFrontEndMentor} />
    </a>
  );
};

export default PreviewLink;
