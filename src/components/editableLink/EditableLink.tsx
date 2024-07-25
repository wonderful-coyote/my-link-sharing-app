// components/EditableLink.tsx
import React, { useContext } from "react";
import { DataContext } from "@/context/DataContext";
import Select from "@/components/editableLink/components/Select";
import useForm from "@/hooks/useForm";
import { generateMatchExp } from "@/lib/urlValidator";
import { PlatformType, Link } from "@/types";
import DragIcon from "@/assets/platformicons/DragIcon";
import LinkIcon from "@/assets/platformicons/LinkIcon"; // Make sure to import this

interface EditableLinkProps {
  link: Link;
  index: number;
}

export default function EditableLink({ link, index }: EditableLinkProps) {
  const { id, linkUrl, platform } = link;
  const { removeLink, updateLink } = useContext(DataContext);
  const { validateInput } = useForm(null);

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
    <div className="p-5 w-full bg-gray-50 rounded-lg mb-6">
      <div className="flex items-center w-full text-sm font-bold mb-3">
        <DragIcon className="cursor-grab mr-2" />
        <span>Link #{index + 1}</span>
        <button
          className="ml-auto text-base text-gray-400 bg-transparent border-none hover:text-gray-700"
          onClick={() => removeLink(id)}
        >
          Remove
        </button>
      </div>
      <div className="grid gap-3">
        <div className="relative">
          <label
            htmlFor={`platform-${id}`}
            className="text-xs text-gray-500 mb-1 block"
          >
            Platform
          </label>
          <Select selectedPlatform={platform} changePlatform={changePlatform} />
        </div>
        <div className="relative">
          <label
            htmlFor={`link-${id}`}
            className="text-xs text-gray-500 mb-1 block"
          >
            Link
          </label>
          <div className="relative">
            <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              name={`link-${id}`}
              id={`link-${id}`}
              placeholder={`e.g. ${generateMatchExp(platform)}johnappleseed`}
              value={linkUrl}
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
