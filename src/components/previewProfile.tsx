import { useContext } from "react";
import Image from "next/image";
import ImageIcon from "@/assets/platformicons/ImageIcon";
import PreviewLink from "@/components/previewLink";
import { DataContext } from "@/context/DataContext";
import { UserData, Link } from "@/types";

export default function PreviewProfile({
  bare,
  userData,
}: {
  bare?: boolean;
  userData?: UserData | null | undefined;
}) {
  const { userInfo, links, imgPreviewPath } = useContext(DataContext);
  const firstName = userData?.userInfo?.firstName || userInfo?.firstName || "";
  const lastName = userData?.userInfo?.lastName || userInfo?.lastName || "";
  const email = userData?.userInfo?.email || userInfo?.email || "";
  const profileImg =
    userData?.userInfo?.profileImg || userInfo?.profileImg || "";
  const displayLinks = userData?.links || links || [];

  return (
    <section
      className={`grid w-fit mx-auto rounded-3xl text-center ${
        bare
          ? "gap-y-[46px] pt-[113.5px] min-w-[20%]"
          : "gap-y-14 mt-[60px] bg-white sm:p-12 sm:shadow-[0_0_32px_rgba(0,0,0,0.1)]"
      }`}
    >
      <div className={bare ? "" : ""}>
        {imgPreviewPath || profileImg ? (
          <Image
            src={imgPreviewPath || profileImg}
            alt=""
            width={104}
            height={104}
            className={`mx-auto rounded-full border-4 border-purple-600 ${
              bare ? "w-24 h-24 mb-3" : "mb-[25px]"
            }`}
          />
        ) : (
          <div
            className={`flex flex-col items-center justify-center mx-auto rounded-full border-2 border-purple-200 ${
              bare
                ? "w-[100px] h-[100px] mb-3"
                : "w-[104px] h-[104px] mb-[25px] bg-purple-100"
            } ${bare && !imgPreviewPath && !profileImg ? "opacity-0" : ""}`}
          >
            <ImageIcon />
            <span>No image</span>
          </div>
        )}
        <h2
          className={`min-w-[160px] ${bare ? "text-lg" : ""} ${!firstName && !lastName ? "h-[27px] bg-transparent" : "bg-white"}`}
        >
          {firstName + " " + lastName}
        </h2>
        <p
          className={`min-w-[160px] ${bare ? "text-sm" : ""} ${!email ? "h-6 bg-transparent" : "bg-white"}`}
        >
          {email}
        </p>
      </div>
      <div className="grid gap-y-5">
        {displayLinks &&
          displayLinks.length > 0 &&
          displayLinks.map((link: Link, idx: number) => {
            if (!bare || idx < 5) {
              return <PreviewLink link={link} key={link.id} bare />;
            }
            return null;
          })}
      </div>
    </section>
  );
}
