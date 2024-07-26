/* eslint-disable react/no-unescaped-entities */
import NoLinksIcon from "@/assets/platformicons/NoLinksIcon";

export default function NoLinks() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 m-5 mt-11">
      <div className="h-auto">
        <NoLinksIcon />
      </div>

      <h3 className="text-xl font-bold">Let's get you started</h3>

      <p className="max-w-[255px] text-sm text-gray-500">
        Use the "Add new link" button to get started. Once you have more than
        one link, you can reorder and edit them. We're here to help you share
        your profiles with everyone!
      </p>
    </div>
  );
}
