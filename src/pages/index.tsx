import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import ProjectsList from "@/components/ProjectsList";
import Image from "next/image";
import Head from "next/head";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import Modal from "@/components/Modal";
import AddProjectForm from "@/components/AddProjectForm";

const Home: NextPage = () => {
  const { status, data } = useSession();
  const router = useRouter();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  if (status === "unauthenticated") {
    router.replace("/auth/signin");
    return null;
  }

  const closeModal = () => setIsOpenModal(false);
  return (
    <>
      {status === "loading" ? (
        <Loader message="Loading Session..." />
      ) : (
        <>
          <Head>
            <title>
              {data?.user?.name ? `${data.user.name}&apos;s ` : ""}Projects
            </title>
          </Head>

          <div className="flex w-full items-center justify-center space-x-2">
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
          {isOpenModal && (
            <Modal closeModal={closeModal} heading="Add Project">
              <AddProjectForm closeModal={closeModal} />
            </Modal>
          )}
          <button
            className="fixed bottom-12 right-12 z-30 inline rounded-full bg-purple-600 p-4 shadow hover:bg-purple-700 hover:shadow-md sm:right-20"
            title="Add Project"
            onClick={() => setIsOpenModal(true)}
          >
            <IoMdAdd
              className="h-10 w-10 fill-white"
              fill="white"
              color="white"
              stroke="white"
            />
          </button>
        </>
      )}
    </>
  );
};

export default Home;
