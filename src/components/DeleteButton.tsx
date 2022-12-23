import { type RouterOutputs, trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import { type FC } from "react";
import { FaTrash } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  projectId: string;
};

const DeleteButton: FC<Props> = ({ projectId }) => {
  const router = useRouter();
  const client = useQueryClient();
  const { mutate, isLoading } = trpc.project.deleteProject.useMutation({
    onSuccess: () => {
      client.setQueryData(
        [
          ["project", "getProject"],
          {
            input: {
              id: "63a5bfc4f6f8c27e78c144c8",
            },
            type: "query",
          },
        ],
        (oldData: RouterOutputs["project"]["getProjects"] | undefined) => {
          const newData = oldData;
          if (!newData) return newData;
          return newData.filter((project) => project.id !== projectId);
        }
      );
      router.replace("/");
    },
  });
  return (
    <button
      disabled={isLoading}
      className="flex items-center space-x-2 rounded bg-red-700 p-2 text-white shadow-md hover:bg-red-800 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
      onClick={() => mutate({ id: projectId })}
    >
      <FaTrash /> <span>Delete Project</span>
    </button>
  );
};
export default DeleteButton;
