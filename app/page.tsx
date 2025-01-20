import Link from "next/link";
import SiteLogo from "./ui/layout/site-logo";

export default function Page() {
  return (
    <div className="flex flex-grow w-full bg-black justify-center">
      <div className="flex flex-col justify-center items-center">
        <div className="mb-4">
          <SiteLogo />
        </div>

        <div className="text-center max-w-screen-sm mb-10">
          <h1 className="text-stone-200 font-bold text-2xl">
            Track today, focus forward
          </h1>
          <p className="text-stone-400 mt-5">
            <Link
              href="/login"
              className="flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none bg-blue-500 dark:border-blue-500 dark:text-white hover:dark:bg-blue-600 hover:dark:border-blue-600"
            >
              Login
            </Link>
          </p>
        </div>
        <div className="">
          <Link
            href="/dashboard"
            className="text-stone-400 underline hover:text-stone-200 transition-all"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
