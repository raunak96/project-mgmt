import { trpc } from "@/utils/trpc";
import Loader from "./Loader";
import ProjectCard from "./ProjectCard";

const ProjectsList = () => {
  const { data: projects, isLoading } = trpc.project.getProjects.useQuery(
    undefined,
    {
      refetchOnWindowFocus: false,
    }
  );
  if (isLoading) <Loader message="Loading Projects..." />;
  if (!projects) return null;
  return (
    <div
      className={`grid flex-1 grid-cols-1 gap-7 sm:grid-cols-${
        projects.length < 2 ? projects.length : "2"
      } lg:grid-cols-${
        projects.length < 3 ? projects.length : "3"
      } xl:grid-cols-${projects.length < 4 ? projects.length : "4"}`}
    >
      {projects?.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};
export default ProjectsList;
