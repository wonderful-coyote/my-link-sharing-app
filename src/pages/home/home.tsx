import { useContext, useEffect, useState } from "react";
import { AuthContext, AuthContextType } from "@/context/AuthContext";
import { DataContext } from "@/context/DataContext";
import { DataContextType, UserData } from "@/types";
import { useRouter } from "next/router";
import Header from "@/components/header";
import Links from "./components/Links";
import Profile from "./components/Profile";
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
      <main className="flex flex-col lg:flex-row items-stretch justify-center min-h-screen bg-gray-100 p-4 lg:gap-4">
        <section className="hidden lg:flex lg:w-1/3 p-4 bg-white items-start justify-center rounded-lg">
          <div className="mt-32 w-full max-w-[308px]">
            <Phone userData={userData} />
          </div>
        </section>
        <section className="w-full lg:w-2/3 p-4 bg-white flex items-center justify-center rounded-lg">
          {activeSection === "links" ? <Links /> : <Profile />}
        </section>
      </main>
    </AuthenticatedLayout>
  );
}
