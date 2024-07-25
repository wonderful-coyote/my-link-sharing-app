// components/SortableLink.tsx
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import EditableLink from "@/components/editableLink/EditableLink";
import { Link } from "@/types";

interface SortableLinkProps {
  link: Link;
  index: number;
}

export function SortableLink({ link, index }: SortableLinkProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <EditableLink link={link} index={index} />
    </div>
  );
}

export default SortableLink;
