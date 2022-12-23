import Loader from "@/components/Loader";
import { type NextPage } from "next";
import { getProviders, signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

type Props = {
  providers: Awaited<ReturnType<typeof getProviders>>;
};
const SignInPage: NextPage<Props> = ({ providers }) => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") return <Loader message="Loading Session..." />;

  if (status === "authenticated") {
    router.replace("/");
    return <div />;
  }
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center space-y-5 bg-gray-300">
      <Image
        src="/signIn.png"
        alt="Google Logo"
        width={300}
        height={300}
        className="mx-2 rounded-full object-cover"
      />
      {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        Object.values(providers!).map((provider) => (
          <button
            key={provider.id}
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: process.env.VERCEL_URL || "http://localhost:3000",
              })
            }
            className="btn btn-primary"
          >
            Sign In with {provider.name}
          </button>
        ))
      }
    </div>
  );
};
export default SignInPage;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
