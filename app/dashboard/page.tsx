import { auth, signOut } from "app/auth";
import DashboardUI from "./form/dashboard-ui";

export default async function DashboardPage() {
  let session = await auth();

  return (
    <div className="flex flex-grow bg-black">
      <div className="w-screen flex flex-col space-y-5 justify-center items-center text-white px-3">
        <h3 className="text-[30px] text-center">
          How are you feeling today, {session?.user?.name}?
        </h3>
        <DashboardUI />
        <SignOut />
      </div>
    </div>
  );
}

function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit">Sign out</button>
    </form>
  );
}
