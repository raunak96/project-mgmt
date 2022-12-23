import { type RouterOutputs, trpc } from "@/utils/trpc";
import { useQueryClient } from "@tanstack/react-query";
import { type FormEvent, useRef, type FC } from "react";

import Loader from "./Loader";
type Props = {
  closeModal: () => void;
};
const AddProjectModal: FC<Props> = ({ closeModal }) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

  /* Project Mutation and Caching */
  const client = useQueryClient();
  const { mutate, isLoading } = trpc.project.addProject.useMutation({
    onSuccess: (data) => {
      client.setQueryData(
        [
          ["project", "getProjects"],
          {
            type: "query",
          },
        ],
        (oldData: RouterOutputs["project"]["getProjects"] | undefined) => {
          return [data, ...(oldData ?? [])];
        }
      );
      closeModal();
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!descRef.current || !nameRef.current) return;

    const description = descRef.current.value;
    const projectName = nameRef.current.value;

    if (!description || !projectName)
      return alert("Name and/or Project description cannot be empty!");
    mutate({ name: projectName, description });
  };

  if (isLoading)
    return (
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70">
        <Loader message="Adding Project" />
      </div>
    );

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/70"
      onClick={closeModal}
    >
      <div
        className="relative mt-7 flex w-5/6 flex-col items-center rounded bg-purple-400 p-4 text-white shadow-lg sm:w-[400px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-2 top-0 p-2 text-3xl font-semibold text-white opacity-70 hover:opacity-100"
          title="Close"
          onClick={closeModal}
        >
          ×
        </button>
        <h1 className="text-3xl font-semibold">Add Project</h1>
        <form
          className="mt-4 flex w-full flex-col items-center space-y-5 p-4"
          onSubmit={handleSubmit}
        >
          <input
            placeholder="Project Name"
            type="text"
            id="name"
            ref={nameRef}
            className="form-input"
          />

          <textarea
            placeholder="Description of project"
            id="description"
            ref={descRef}
            rows={3}
            className="form-input"
          ></textarea>
          <button
            type="submit"
            disabled={isLoading}
            className="mr-auto rounded bg-purple-600 py-2 px-3 text-white shadow hover:bg-purple-700 hover:shadow-md disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddProjectModal;
