import { type ReactNode, type FC } from "react";

type Props = {
  closeModal: () => void;
  children: ReactNode;
  heading: string;
};
const Modal: FC<Props> = ({ closeModal, children, heading }) => {
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
        <h1 className="text-3xl font-semibold">{heading}</h1>
        {children}
      </div>
    </div>
  );
};
export default Modal;
