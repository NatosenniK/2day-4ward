import { fetchWeeklyRecap } from "@/app/db";
import { auth, signOut } from "app/auth";
import WeeklyRecaptUI from "./weekly-recap-ui";

export default async function DashboardPage() {
  let session = await auth();

  if (!session || !session.user || !session.user.id) {
    return <></>;
  }

  const prevData = await fetchWeeklyRecap(session.user.id);

  return (
    <div className="flex flex-grow bg-black py-10">
      <div className="w-screen flex flex-col space-y-5 justify-center items-center text-white px-3">
        <WeeklyRecaptUI
          weeklyInfo={prevData}
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
