// components/SortableLink.tsx
import React, { useContext, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DataContext } from "@/context/DataContext";
import useForm from "@/hooks/useForm";
import { generateMatchExp } from "@/lib/urlValidator";
import { PlatformType, Link } from "@/types";
import DragIcon from "@/assets/platformicons/DragIcon";
import LinkIcon from "@/assets/platformicons/LinkIcon";
import { PLATFORMS } from "@/lib/platforms";
import { getPlatformIcon } from "@/lib/platformIcons";
import Chevron from "@/assets/platformicons/Chevron";

interface SortableLinkProps {
  link?: Link;
  index: number;
}

function Select({
  selectedPlatform,
  changePlatform,
}: {
  selectedPlatform: PlatformType;
  changePlatform: (platform: PlatformType) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handlePlatformSelect = (platform: PlatformType) => {
    changePlatform(platform);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Select component content (unchanged) */}
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
              <div
                key={platform}
                onClick={() => handlePlatformSelect(platform)}
                className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
              >
                {getPlatformIcon(platform)}
                <span>{platform}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function SortableLink({ link, index }: SortableLinkProps) {
  const { removeLink, updateLink } = useContext(DataContext);
  const { validateInput } = useForm(null);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: link?.id ?? `placeholder-${index}`,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (!link) {
    return (
      <div ref={setNodeRef} style={style}>
        Loading...
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateInput(e);
    updateLink({
      ...link,
      linkUrl: e.target.value,
    });
  };

  const changePlatform = (newPlatform: PlatformType) => {
    updateLink({
      ...link,
      platform: newPlatform,
    });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-5 w-full bg-gray-50 rounded-lg mb-6"
    >
      <div className="flex items-center w-full text-sm font-bold mb-3">
        <DragIcon className="cursor-grab mr-2" />
        <span>Link #{index + 1}</span>
        <button
          className="ml-auto text-base text-gray-400 bg-transparent border-none hover:text-gray-700"
          onClick={() => removeLink(link.id)}
        >
          Remove
        </button>
      </div>
      <div className="grid gap-3">
        <div className="relative">
          <label
            htmlFor={`platform-${link.id}`}
            className="text-xs text-gray-500 mb-1 block"
          >
            Platform
          </label>
          <Select
            selectedPlatform={link.platform}
            changePlatform={changePlatform}
          />
        </div>
        <div className="relative">
          <label
            htmlFor={`link-${link.id}`}
            className="text-xs text-gray-500 mb-1 block"
          >
            Link
          </label>
          <div className="relative">
            <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              name={`link-${link.id}`}
              id={`link-${link.id}`}
              placeholder={`e.g. ${generateMatchExp(link.platform)}johnappleseed`}
              value={link.linkUrl}
              onChange={handleChange}
              data-url
              className="w-full h-12 pl-10 pr-3 text-base text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SortableLink;
