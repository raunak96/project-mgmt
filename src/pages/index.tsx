import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import ProjectsList from "@/components/ProjectsList";
import Image from "next/image";
import Head from "next/head";

const Home: NextPage = () => {
  const { status, data } = useSession();
  const router = useRouter();
  if (status === "unauthenticated") router.replace("api/auth/signin");
  return (
    <>
      {status === "loading" ? (
        <Loader message="Loading Session..." />
      ) : (
        <>
          <Head>
            <title>{data?.user?.name}&apos;s Projects</title>
          </Head>
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
            <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="capitalize">{data?.user?.name}</span>&apos;s{" "}
              <span className="text-[hsl(280,100%,70%)]">Proj</span>ects
            </h1>
          </div>
          <ProjectsList />
        </>
      )}
    </>
  );
};

export default Home;
