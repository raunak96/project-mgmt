import { projStatus } from "@/utils/constants";
import { type RouterOutputs } from "@/utils/trpc";
import Link from "next/link";
import { type FC } from "react";

type Props = {
  project: RouterOutputs["project"]["getProjects"][number];
};
const ProjectCard: FC<Props> = ({ project }) => {
  return (
    <div className="flex max-w-sm cursor-pointer flex-col justify-between space-y-2 rounded-xl bg-white/10 px-4 py-6 text-gray-400 shadow-sm transition duration-150 ease-in hover:bg-white/20 hover:text-gray-300 hover:shadow-md">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold sm:text-3xl">{project.name}</h1>
        <Link
          href={`/projects/${project.id}`}
          className="pl-4 text-sm hover:text-base hover:text-white"
        >
          View
        </Link>
      </div>
      <p className="text-sm">
        Status:{" "}
        <span className="font-bold capitalize">
          {projStatus.get(project.status)}
        </span>
      </p>
    </div>
  );
};
export default ProjectCard;
