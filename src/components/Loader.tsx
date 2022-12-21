import Image from "next/image";
import { type FC } from "react";

type Props = {
  message?: string;
};

const Loader: FC<Props> = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-between space-y-3">
      <Image
        src="/rings.svg"
        width={200}
        height={200}
        alt="Loading User Details..."
        className="flex-1"
      />
      <p className="text-center text-xl text-white">{message}</p>
    </div>
  );
};
export default Loader;
