import { getPlatformIcon } from "../../../lib/platformIcons";

export default function Option({
  platform,
  onClick,
}: {
  platform: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 py-3 cursor-pointer transition-all duration-300 ease-in-out hover:text-purple-600 focus:text-purple-600 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-gray-200 [&:not(:nth-of-type(8)):hover_path]:fill-purple-600 [&:not(:nth-of-type(8)):focus_path]:fill-purple-600 [&:nth-of-type(8):hover_path:first-child]:fill-purple-600 [&:nth-of-type(8):focus_path:first-child]:fill-purple-600"
    >
      {getPlatformIcon(platform)}
      {platform}
    </div>
  );
}
