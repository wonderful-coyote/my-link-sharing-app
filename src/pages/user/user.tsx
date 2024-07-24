import Link from "next/link";
import { GetServerSidePropsContext } from "next";
import DevlinksLogoLg from "@/assets/Group 251.svg";
import PreviewProfile from "@/components/previewProfile";
import Button from "@/components/button";
import { getUserDataBySlug } from "../../lib/getUserDataBySlug";
import { UserData } from "@/types";

export default function User({ userData }: { userData: UserData }) {
  return (
    <>
      <header className="absolute inset-x-3 top-3 flex justify-between p-3 bg-white rounded-xl z-10">
        <DevlinksLogoLg />
        <Link href="/signup">
          <Button className="px-3">Create Your Own!</Button>
        </Link>
      </header>
      <main className="relative flex flex-col items-center justify-between min-h-custom pt-[60px]">
        <div className="absolute top-0 bg-purple-600 h-[357px] w-full -z-10 rounded-b-[32px]"></div>
        <PreviewProfile userData={userData} />
        <section className="my-[60px] text-center">
          <p>Want to show off your own social links?</p>
          <p>
            Create a free account <Link href="/signup">here!</Link>
          </p>
        </section>
      </main>
      <footer className="text-center p-3">&copy; FrontendMentor.io</footer>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { userSlug } = context.params as { userSlug: string };
  const userData = await getUserDataBySlug(userSlug);

  return {
    props: { userData },
  };
}
