// components/Links.tsx
import React, { useContext } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import Button from "@/components/button";
import NoLinks from "./NoLinks";
import SortableLink from "./SortableLink";
import { DataContext } from "@/context/DataContext";
import useForm from "../../../hooks/useForm";
import SavedIcon from "@/assets/platformicons/SavedIcon";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "@/types";

export default function Links() {
  const { links, addLink, saveLinksToDb, reorderLinks } =
    useContext(DataContext) || {};
  const { validateURL, submitForm } = useForm(saveLinksToDb);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleAddLink = () => {
    if (addLink) {
      addLink();
    } else {
      console.error("addLink function is not available in the context");
    }
  };

  const handleSave = () => {
    if (!links) return;

    let isValid = true;
    links.forEach((link) => {
      if (!validateURL(link)) {
        isValid = false;
      }
    });
    if (!isValid) {
      return;
    }
    submitForm();
    toast.success(
      <div className="flex items-center">
        <SavedIcon />
        <span>Your changes have been successfully saved!</span>
      </div>,
      {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      },
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (!links) return;

    const { active, over } = event;

    if (active.id !== over?.id) {
      const newIndex = links.findIndex((link: Link) => link.id === over?.id);
      reorderLinks(active.id as string, newIndex);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Customize your links</h1>
      <p className="text-gray-600 mb-6">
        Add/edit/remove links below and then share all your profiles with the
        world!
      </p>

      <button
        onClick={handleAddLink}
        className="w-full py-3 mb-6 text-[#633CFF] font-bold bg-transparent border-2 border-[#633CFF] rounded-lg hover:bg-[#633CFF] hover:text-white transition-colors duration-200"
      >
        + Add new link
      </button>

      {links && links.length > 0 ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={links.map((link) => link.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="relative pb-20">
              {links.map((link, index) => (
                <SortableLink key={link.id} link={link} index={index} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <NoLinks />
      )}

      <Button
        disabled={!links || links.length === 0}
        onClick={handleSave}
        className="py-3 mt-6 text-white font-bold bg-[#633CFF] rounded-lg hover:bg-[#633CFF] transition-colors duration-200"
      >
        Save
      </Button>

      <ToastContainer />
    </div>
  );
}
