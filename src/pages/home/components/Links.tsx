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
    <section className="relative p-10 w-full max-w-[900px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Customize your links</h1>
        <p className="text-gray-600">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
      </div>

      <button
        onClick={handleAddLink}
        className="w-full py-3 mb-6 text-[#633CFF] font-bold bg-transparent border-2 border-[#633CFF] rounded-lg hover:bg-[#633CFF] hover:text-white transition-colors duration-200"
      >
        + Add new link
      </button>

      <div className="mb-24">
        {" "}
        {/* Added margin-bottom for space */}
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
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <div className="max-w-[900px] mx-auto flex justify-end">
          <Button
            disabled={!links || links.length === 0}
            onClick={handleSave}
            className="w-[91px] flex items-center justify-center" // Added flex and justify-center
          >
            Save
          </Button>
        </div>
      </div>

      <ToastContainer />
    </section>
  );
}
