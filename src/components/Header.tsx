import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";
import { AiOutlineLogout } from "react-icons/ai";

const Header: FC = () => {
  const { status } = useSession();
  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex justify-between bg-slate-100 p-4">
      <Link href="/" className="flex items-center space-x-1">
        <Image height={30} width={30} src="/favicon.ico" alt="logo" />
        <span className="text-xl sm:text-2xl">Project MgMt</span>
      </Link>
      {status === "authenticated" && (
        <button
          className="flex items-center space-x-2 rounded-full text-red-500 hover:text-red-600 sm:text-xl"
          title="Log Out"
          onClick={() => signOut()}
        >
          <p className="hidden sm:block">Log Out</p>
          <AiOutlineLogout className="text-xl" />
        </button>
      )}
    </header>
  );
};
export default Header;
