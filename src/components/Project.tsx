import { projStatus } from "@/utils/constants";
import { trpc } from "@/utils/trpc";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import DeleteButton from "./DeleteButton";
import EditProjectForm from "./EditProjectForm";
import Loader from "./Loader";
import Modal from "./Modal";

const Project = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const closeModal = () => setIsOpenModal(false);

  const {
    isLoading,
    data: project,
    error,
  } = trpc.project.getProject.useQuery(
    { id },
    {
      enabled: id !== undefined,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchOnReconnect: false,
    }
  );
  if (isLoading) return <Loader message="Loading Project Details..." />;
  if (!project || error) {
    router.replace("/");
    return null;
  }
  return (
    <>
      <Head>
        <title>{project?.name || "Project"}</title>
      </Head>
      <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
        <span className="capitalize tracking-[0.2em]">{project?.name}</span>
      </h1>
      <div className="flex w-5/6 cursor-pointer flex-col space-y-4 rounded bg-purple-500 p-6 text-white opacity-90 shadow-md transition duration-150 ease-in hover:opacity-100 hover:shadow-lg sm:w-[450px] md:w-[600px]">
        <div className="flex items-center justify-start space-x-2 text-sm text-gray-100 sm:justify-between sm:text-base">
          <h3 className="hidden sm:block">
            Created on:{" "}
            {new Intl.DateTimeFormat("en-IN", { dateStyle: "short" }).format(
              project?.created_at
            )}
          </h3>
          <h3>
            Last Updated:{" "}
            {new Intl.DateTimeFormat("en-IN", {
              dateStyle: "short",
              timeStyle: "short",
            }).format(project?.updated_at)}
          </h3>
        </div>
        <p className="border-t py-2 text-lg">{project?.description}</p>
        <h5 className="text-xl">
          Project Status:{" "}
          <span className="font-bold capitalize">
            {projStatus.get(project?.status as string)}
          </span>
        </h5>
        <div className="ml-auto flex space-x-3">
          <button
            disabled={isLoading}
            className="flex items-center space-x-2 rounded bg-amber-600 p-2 text-white shadow-md hover:bg-amber-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
            onClick={() => setIsOpenModal(true)}
          >
            <FaRegEdit /> <span>Edit Project</span>
          </button>
          <DeleteButton projectId={project.id} />
        </div>
      </div>
      {isOpenModal && (
        <Modal closeModal={closeModal} heading="Edit Project Details">
          <EditProjectForm closeModal={closeModal} project={project} />
        </Modal>
      )}
    </>
  );
};
export default Project;
