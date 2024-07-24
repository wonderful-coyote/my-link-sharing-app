import { useContext, useEffect, useRef, useState } from "react";
import Button from "@/components/button";
import NoLinks from "./NoLinks";
import EditableLink from "../../../components/editableLink/EditableLink";
import { DataContext } from "@/context/DataContext";
import useForm from "../../../hooks/useForm";
import SavedIcon from "@/assets/platformicons/SavedIcon";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "@/types"; // Import the Link type

export default function Links() {
  const { links, addLink, reorderLinks, saveLinksToDb } =
    useContext(DataContext);

  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [targetLink, setTargetLink] = useState<Link | null>(null);

  const linksRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  const { validateURL, submitForm } = useForm(saveLinksToDb);

  const dragEventListener = (e: MouseEvent) => {
    const mousePosition = e.clientY;

    if (linksRef.current && copyRef.current) {
      const children = Array.from(linksRef.current.children).filter(
        (child) => child.getAttribute("data-copy") !== "true",
      );

      const { top, height } = linksRef.current.getBoundingClientRect();
      const divHeight = copyRef.current.getBoundingClientRect().height;

      const maxHeight = 0;
      const minHeight = height - divHeight;

      const newPosition = mousePosition - top - 30;

      copyRef.current.style.top =
        newPosition < maxHeight
          ? maxHeight + "px"
          : newPosition > minHeight
            ? minHeight + "px"
            : newPosition + "px";

      children.forEach((child, idx) => {
        const childTop = (child as HTMLElement).offsetTop;

        if (
          Math.abs(childTop - newPosition) < 100 &&
          idx !== dragIdx &&
          copyRef.current
        ) {
          reorderLinks(copyRef.current.id, idx);
        }
      });
    }
  };

  const startDrag = (id: string) => {
    const targetLink = links.find((link) => link.id === id);

    if (!targetLink) return;

    const targetIdx = links.indexOf(targetLink);

    setDragIdx(targetIdx);
    setTargetLink(targetLink);

    window.addEventListener("mousemove", dragEventListener as EventListener);
    window.addEventListener("mouseup", endDrag);
  };

  const endDrag = () => {
    if (copyRef.current) {
      if (copyRef.current.parentElement) {
        copyRef.current.style.top = "";

        setTargetLink(null);
        setDragIdx(null);

        window.removeEventListener(
          "mousemove",
          dragEventListener as EventListener,
        );
      }
    }
  };

  const handleSave = () => {
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

  useEffect(() => {
    if (targetLink && copyRef.current && dragIdx != null) {
      const { height } = copyRef.current.getBoundingClientRect();
      const initialTop = dragIdx * height + "px";
      copyRef.current.style.top = initialTop;
    }
  }, [targetLink, dragIdx]);

  return (
    <>
      <section className="relative lg:p-10 lg:w-full lg:max-w-[900px] lg:mx-auto">
        <div className="mb-6">
          <h3 className="text-2xl font-bold">Customize your links</h3>
          <p className="text-gray-600 mt-2">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
          <Button onClick={addLink} className="mt-10 mb-6">
            &#43; Add new link
          </Button>
        </div>

        <div className="relative pb-20" ref={linksRef}>
          {links?.length > 0 ? (
            links.map((link, idx) => (
              <EditableLink
                key={link.id}
                index={idx}
                isDragging={targetLink?.id === link.id}
                startDrag={startDrag}
                {...link}
              />
            ))
          ) : (
            <NoLinks />
          )}

          {targetLink && (
            <EditableLink
              index={dragIdx as number}
              copyRef={copyRef}
              isDragging={false}
              startDrag={startDrag}
              {...targetLink}
            />
          )}
        </div>

        <div className="absolute -bottom-6 -left-6 -right-6 p-4 border-t border-gray-200 lg:left-0 lg:right-0">
          <Button
            disabled={!links || links.length === 0}
            onClick={handleSave}
            className="sm:block sm:w-[91px] sm:ml-auto sm:mr-6"
          >
            Save
          </Button>
        </div>
      </section>

      <ToastContainer />
    </>
  );
}
