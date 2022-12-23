import { projStatus } from "@/utils/constants";
import { type RouterOutputs, trpc } from "@/utils/trpc";
import { Status } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";

import { type FormEvent, useRef, type FC } from "react";
import Loader from "./Loader";
type Props = {
  closeModal: () => void;
  project: RouterOutputs["project"]["getProject"];
};
const EditProjectForm: FC<Props> = ({ closeModal, project }) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);

  /* Project Mutation and Caching */
  const client = useQueryClient();
  const { mutate, isLoading } = trpc.project.updateProject.useMutation({
    onSuccess: (data) => {
      client.setQueryData(
        [
          ["project", "getProject"],
          {
            input: {
              id: project.id,
            },
            type: "query",
          },
        ],
        () => {
          return data;
        }
      );
      closeModal();
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!descRef.current || !nameRef.current || !statusRef.current) return;

    const description = descRef.current.value;
    const projectName = nameRef.current.value;
    const status = statusRef.current.value as Status;
    if (!description || !projectName)
      return alert("Name and/or Project description cannot be empty!");
    mutate({ name: projectName, description, status, id: project.id });
  };

  if (isLoading)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <Loader message="Updating Project..." />
      </div>
    );
  return (
    <form
      className="mt-4 flex w-full flex-col items-center space-y-5 p-4"
      onSubmit={handleSubmit}
    >
      <input
        placeholder="Project Name"
        type="text"
        ref={nameRef}
        className="form-input"
        defaultValue={project.name}
      />

      <textarea
        placeholder="Description of project"
        ref={descRef}
        rows={3}
        defaultValue={project.description}
        className="form-input"
      ></textarea>
      <select
        defaultValue={project.status}
        ref={statusRef}
        className="form-input"
      >
        <option className="capitalize" value={Status.NotStarted}>
          {projStatus.get(Status.NotStarted)}
        </option>
        <option className="capitalize" value={Status.InProgress}>
          {projStatus.get(Status.InProgress)}
        </option>
        <option className="capitalize" value={Status.Completed}>
          {projStatus.get(Status.Completed)}
        </option>
      </select>
      <button
        type="submit"
        disabled={isLoading}
        className="mr-auto rounded bg-purple-600 py-2 px-3 text-white shadow hover:bg-purple-700 hover:shadow-md disabled:cursor-not-allowed"
      >
        Submit
      </button>
    </form>
  );
};
export default EditProjectForm;
