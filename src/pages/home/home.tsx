import { useContext, useEffect, useState } from "react";
import { AuthContext, AuthContextType } from "@/context/AuthContext";
import { DataContext } from "@/context/DataContext";
import { DataContextType, UserData } from "@/types";
import { useRouter } from "next/router";
import Header from "@/components/header";
import Links from "./components/Links";
import Profile from "./components/Profile";
import PreviewProfile from "@/components/previewProfile";
import Phone from "@/assets/platformicons/Phone";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";

export default function Home() {
  const { user } = useContext(AuthContext) as AuthContextType;
  const { links, userInfo, slug } = useContext(DataContext) as DataContextType;
  const [activeSection, setActiveSection] = useState("links");
  const router = useRouter();

  useEffect(() => {
    const sessionUser = sessionStorage.getItem("user");
    if (!sessionUser && !user) {
      router.push("/auth/signIn");
    }
  }, [user, router]);

  const userData: UserData = {
    userInfo,
    links,
    slug,
  };

  return (
    <AuthenticatedLayout>
      <Header
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <main className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100">
        <section className="w-full md:w-1/2 p-4">
          <div className="flex justify-center items-center">
            <Phone />
            <PreviewProfile userData={userData} bare />
          </div>
        </section>
        <section className="w-full md:w-1/2 p-4">
          {activeSection === "links" ? <Links /> : <Profile />}
        </section>
      </main>
    </AuthenticatedLayout>
  );
}
