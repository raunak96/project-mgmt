import Loader from "@/components/Loader";
import Project from "@/components/Project";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const ProjectPage: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") router.replace("api/auth/signin");

  return status === "loading" ? (
    <Loader message="Loading Session..." />
  ) : (
    <Project />
  );
};
export default ProjectPage;
