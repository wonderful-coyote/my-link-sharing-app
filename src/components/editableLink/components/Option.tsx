import React from "react";
import { getPlatformIcon } from "../../../lib/platformIcons";
import { PlatformType } from "@/types";

interface OptionProps {
  platform: PlatformType;
  onClick: () => void;
}

export default function Option({ platform, onClick }: OptionProps) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
    >
      {getPlatformIcon(platform)}
      <span>{platform}</span>
    </div>
  );
}
