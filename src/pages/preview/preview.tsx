import React, { useContext } from "react";
import { useRouter } from "next/router";
import PreviewHeader from "@/components/PreviewHeader";
import { DataContext } from "@/context/DataContext";
import { DataContextType, UserData } from "@/types";
import PreviewProfile from "@/components/previewProfile";
import Phone from "@/assets/platformicons/Phone";
import { toast } from "react-toastify";

const PreviewPage: React.FC = () => {
  const router = useRouter();
  const { links, userInfo, slug } = useContext(DataContext) as DataContextType;

  const userData: UserData = {
    userInfo,
    links,
    slug,
  };

  const handleShareLink = () => {
    if (userData?.links && userData.links.length > 0) {
      toast.success("Your links have been copied!");
    } else {
      toast.error("No links available to share.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="bg-blue-600 h-1/3 min-h-[33vh]">
        <div className="p-4">
          <PreviewHeader
            onBackClick={() => router.back()}
            onShareClick={handleShareLink}
          />
        </div>
      </div>
      <div className="bg-white flex-grow" />
      <div className="absolute top-[15vh] left-0 right-0 flex flex-col items-center">
        <Phone userData={userData} />
        <div className="mt-8">
          <PreviewProfile userData={userData} bare />
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
