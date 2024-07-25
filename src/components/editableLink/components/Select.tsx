import React, { useState } from "react";
import { PLATFORMS } from "../../../lib/platforms";
import { getPlatformIcon } from "../../../lib/platformIcons";
import { PlatformType } from "@/types";
import Option from "./Option";
import Chevron from "../../../assets/platformicons/Chevron";

interface SelectProps {
  selectedPlatform: PlatformType;
  changePlatform: (platform: PlatformType) => void;
}

export default function Select({
  selectedPlatform,
  changePlatform,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handlePlatformSelect = (platform: PlatformType) => {
    changePlatform(platform);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-4 bg-white border border-gray-300 rounded-lg cursor-pointer"
      >
        <div className="flex items-center">
          {getPlatformIcon(selectedPlatform)}
          <span className="ml-3 text-gray-700">{selectedPlatform}</span>
        </div>
        <Chevron
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </div>
      {isOpen && (
        <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
          {(Object.keys(PLATFORMS) as PlatformType[]).map((platform) => (
            <Option
              key={platform}
              platform={platform}
              onClick={() => handlePlatformSelect(platform)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
