import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import ProjectsList from "@/components/ProjectsList";
import Image from "next/image";

const Home: NextPage = () => {
  const { status, data } = useSession();
  const router = useRouter();
  if (status === "unauthenticated") router.replace("api/auth/signin");
  return (
    <>
      <Header isLoggedIn={status === "authenticated"} />
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container mt-7 flex flex-col items-center justify-center gap-12  px-4 py-16 md:mt-12 ">
          {status === "loading" ? (
            <Loader message="Loading Session..." />
          ) : (
            <>
              <div className="flex space-x-2">
                {data?.user?.image && (
                  <Image
                    src={data.user.image}
                    alt="User Image"
                    height={50}
                    width={50}
                    className="rounded-full"
                  />
                )}
                <h1 className="text-xl font-extrabold tracking-tight text-white sm:text-4xl">
                  <span className="capitalize">{data?.user?.name}</span>&apos;s{" "}
                  <span className="text-[hsl(280,100%,70%)]">Proj</span>ects
                </h1>
              </div>
              <ProjectsList />
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
