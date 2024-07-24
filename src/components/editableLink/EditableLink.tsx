import React, { useContext, useEffect, useRef } from "react";
import DragIcon from "@/assets/platformicons/DragIcon";
import LinkIcon from "@/assets/platformicons/LinkIcon";
import { DataContext } from "@/context/DataContext";
import Select from "@/components/editableLink/components/Select";
import useForm from "@/hooks/useForm";
import { generateMatchExp } from "@/lib/urlValidator";
import { PlatformType } from "@/types";

interface EditableLinkProps {
  index: number;
  id: string;
  linkUrl: string;
  platform: PlatformType;
  inputRef: React.RefObject<HTMLInputElement> | null;
  listIndex: number;
  initialTop?: number;
  startDrag: (id: string, top: number) => void;
  isDragging: boolean;
  copyRef?: React.RefObject<HTMLDivElement>;
}

export default function EditableLink({
  index,
  id,
  linkUrl,
  platform,
  inputRef,
  listIndex,
  initialTop,
  startDrag,
  isDragging,
  copyRef,
}: EditableLinkProps) {
  const { removeLink, updateLink, addRef } = useContext(DataContext);
  const divRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const { validateInput } = useForm(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateInput(e);
    updateLink({
      id,
      linkUrl: e.target.value,
      platform,
      inputRef,
      listIndex,
    });
  };

  const changePlatform = (newPlatform: PlatformType) => {
    updateLink({
      id,
      linkUrl,
      platform: newPlatform,
      inputRef,
      listIndex,
    });
  };

  const handleMouseDown = () => {
    if (divRef.current && startDrag) {
      const { top } = divRef.current.getBoundingClientRect();
      startDrag(id, top);
    }
  };

  useEffect(() => {
    if (linkRef.current && !inputRef) {
      addRef(id, linkRef);
    }
  }, [id, inputRef, addRef]);

  return (
    <div
      className={`p-5 w-full bg-white ${copyRef ? "absolute opacity-80 z-5" : ""}`}
      ref={copyRef || divRef}
      data-copy={typeof copyRef !== "undefined"}
      style={{
        top: initialTop !== undefined ? `${initialTop}px` : undefined,
        opacity: isDragging ? 0.3 : 1,
      }}
      id={id}
    >
      <div className="flex items-center w-full text-sm font-bold">
        <button
          className="flex items-center border-none bg-transparent pr-2 h-full cursor-grab"
          onMouseDown={handleMouseDown}
        >
          <DragIcon />
        </button>
        <span>Link #{index + 1}</span>
        <button
          className="ml-auto text-base text-gray-400 bg-transparent border-none"
          onClick={() => removeLink(id)}
        >
          Remove
        </button>
      </div>
      <div className="grid gap-3 mt-3">
        <Select selectedPlatform={platform} changePlatform={changePlatform} />
        <label
          htmlFor={`link-${id}`}
          className="relative flex items-center overflow-hidden pl-11 text-base text-gray-700 h-12 transition-all duration-300 ease-in-out cursor-pointer border border-gray-300 rounded-lg hover:border-purple-600 focus:border-purple-600 focus:shadow-lg focus:shadow-purple-200"
        >
          <LinkIcon className="absolute right-4 bottom-4.5 transform-origin-center" />
          <span className="sr-only">Link</span>
          <input
            type="text"
            name={`link-${id}`}
            id={`link-${id}`}
            placeholder={`e.g. ${generateMatchExp(platform)}johnappleseed`}
            value={linkUrl}
            onChange={handleChange}
            ref={linkRef}
            data-url
            className="w-full h-full bg-transparent outline-none"
          />
        </label>
      </div>
    </div>
  );
}
