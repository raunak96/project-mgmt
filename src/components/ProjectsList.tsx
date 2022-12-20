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
  return (
    <div
      className={`grid grid-cols-1 gap-7 sm:grid-cols-${
        projects && projects.length < 2 ? projects.length : "2"
      } lg:grid-cols-${
        projects && projects.length < 3 ? projects.length : "3"
      } xl:grid-cols-${
        projects && projects.length < 4 ? projects.length : "4"
      }`}
    >
      {projects?.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};
export default ProjectsList;
