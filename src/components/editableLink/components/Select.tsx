import { useState } from "react";
import { PLATFORMS } from "../../../lib/platforms";
import Option from "./Option";
import { getPlatformIcon } from "../../../lib/platformIcons";
import Chevron from "../../../assets/platformicons/Chevron";
import { PlatformType } from "@/types";

interface SelectProps {
  selectedPlatform: PlatformType;
  changePlatform: (platform: PlatformType) => void;
}

export default function Select({
  selectedPlatform,
  changePlatform,
}: SelectProps) {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = (platform: PlatformType) => {
    changePlatform(platform);
    setIsVisible(false);
  };

  return (
    <label className="relative">
      {getPlatformIcon(selectedPlatform)}

      <span className="sr-only">Platform</span>

      <div
        className="flex items-center overflow-hidden pl-11 text-base text-gray-700 h-12 transition-all duration-300 ease-in-out cursor-pointer border border-gray-300 rounded-lg hover:border-purple-600 hover:shadow-lg hover:shadow-purple-200 focus:border-purple-600 focus:shadow-lg focus:shadow-purple-200"
        onClick={() => setIsVisible(!isVisible)}
      >
        {selectedPlatform}

        <Chevron className="absolute right-4 bottom-4.5 transform origin-center transition-transform duration-300 ease-in-out" />
      </div>

      <div
        className={`absolute w-full top-[86px] overflow-hidden px-4 bg-white transition-all duration-300 ease-in-out z-2 ${isVisible ? "h-[690px] shadow-lg" : "h-0"}`}
        aria-hidden={!isVisible}
      >
        {(Object.values(PLATFORMS) as PlatformType[]).map((platform) => (
          <Option
            key={crypto.randomUUID()}
            platform={platform}
            onClick={() => handleClick(platform)}
          />
        ))}
      </div>
    </label>
  );
}
