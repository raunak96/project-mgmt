import { type FormEvent, useRef, type FC } from "react";
type Props = {
  closeModal: () => void;
};
const AddProjectModal: FC<Props> = ({ closeModal }) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!descRef.current || !nameRef.current) return;

    const description = descRef.current.value;
    const projectName = nameRef.current.value;

    if (!description || !projectName)
      return alert("Name and/or Project description cannot be empty!");
    if (btnRef.current) btnRef.current?.setAttribute("disabled", "disabled");

    closeModal();
  };
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
            ref={btnRef}
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
