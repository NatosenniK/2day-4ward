import { auth, signOut } from "app/auth";
import DashboardUI from "./form/dashboard-ui";
import { fetchWeeklyRecap, hasEntryToday } from "../db";

export default async function DashboardPage() {
  let session = await auth();

  if (!session || !session.user || !session.user.id) {
    return <></>;
  }

  let hasUserLoggedToday = await hasEntryToday(session.user.id);

  return (
    <div className="flex flex-grow bg-black py-10">
      <div className="w-screen flex flex-col space-y-5 justify-center items-center text-white px-3">
        <DashboardUI
          hasUserLoggedToday={hasUserLoggedToday}
          name={session.user.name ? session.user.name : "User"}
        />
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
