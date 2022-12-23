import { trpc } from "@/utils/trpc";
import Loader from "./Loader";
import ProjectCard from "./ProjectCard";

const gridStyle = (projectsLength: number): string => {
  switch (projectsLength) {
    case 1:
      return "";
    case 2:
      return "sm:grid-cols-2";
    default:
      return "lg:grid-cols-3 sm:grid-cols-2";
  }
};

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
      className={`grid flex-1 grid-cols-1 gap-7 ${gridStyle(projects.length)}`}
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};
export default ProjectsList;
