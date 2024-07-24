/* eslint-disable react/no-unescaped-entities */
import NoLinksIcon from "@/assets/platformicons/NoLinksIcon";

export default function NoLinks() {
  return (
    <div className="grid justify-items-center gap-6 m-5 mt-11">
      <div className="w-32 h-auto">
        <NoLinksIcon />
      </div>

      <h3 className="text-xl font-bold">Let's get you started</h3>

      <p className="text-center max-w-[255px] text-sm text-gray-500">
        Use the "Add new link" button to get started. Once you have more than
        one link, you can reorder and edit them. We're here to help you share
        your profiles with everyone!
      </p>
    </div>
  );
}
